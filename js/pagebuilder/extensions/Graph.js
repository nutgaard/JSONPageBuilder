PageView.extensions.graph = Backbone.View.extend({
    render: function() {
        this.container = this.$el;
        this.json = $.extend(true, {}, this.jsonDefaults, this.model.attributes);
        
        this.svgcontainer = undefined;
        this.graphics = undefined;
        this.series;
        this.intervalUpdater;
        this.isModal = false;
        this.isShown = false;
        
        this.svgcontainer = this.createDOMStructure(this.container, this.json);
        this.createModalIfActivated(this.json);
        this.graphics = this.drawGraph(this.svgcontainer);
        this.startUpdate();
        this.createResizeHandler();
        this.createDestroyHandler();
    },
    destroy_view: function() {
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        if (typeof this.intervalUpdater !== 'undefined'){
            clearInterval(this.intervalUpdater);
        }
    },
    startUpdate: function() {
        var timeconfig = this.json.data.timeConfig;
        if (timeconfig.realtime) {
            this.intervalUpdater = setInterval(function() {
                this.updateGraph();
            }.bind(this), 100);
        } else {
            this.updateGraph();
        }
    },
    updateGraph: function() {
        var last = this.series[0].data;
        if (last.length === 0) {
            var x = 0;
        } else {
            var x = last[last.length - 1][0] + 1000;
        }
        var data = [x, Math.random()];
        this.series[0].data.push(data);
        if (this.series[0].data.length > 200) {
            this.series[0].data.shift();
        }
        this.graphics.setData([this.series[0].data]);
        this.graphics.setupGrid();
        this.graphics.draw();
    },
    createDestroyHandler: function() {
        $('body').on('destroy_view', function() {
            this.destroy_view();
        }.bind(this));
    },
    createResizeHandler: function() {
        var that = this;
        $(window).on('resize', function() {
            if (typeof this.svgcontainer === 'undefined') {
                return;
            } else {
                this.resize();
            }
        }.bind(this));
    },
    resize: function() {
        var maxheight = 600;
        this.svgcontainer.height(this.svgcontainer.width() < maxheight ? this.svgcontainer.width() : maxheight);
        this.graphics.resize();
        this.graphics.setupGrid();
        this.graphics.draw();
    },
    createClickHandler: function() {
        var that = this;
        this.svgcontainer.on('click', 'canvas', function(event) {
            if (that.isModal) {
                event.preventDefault();
                return false;
            }
            that.isModal = true;
            $('body>.modal').bigmodal('show');
            var placeholder = that.svgcontainer.clone(false, false);
            $('body').off('shown').on('shown', function() {
                $('body>.modal>.modal-header>h3').html(that.json.data.graphOf.join('/'));
                placeholder.insertBefore(that.svgcontainer.removeClass(placeholder.attr('class')).addClass("span12"));
                $('body>.modal>.modal-body').html(that.svgcontainer);
                that.isShown = true;
                $(document).trigger('resize');
            });
            $('body').off('hide').on('hide', function(event) {
                if (!that.isShown) {
                    event.preventDefault();
                    return;
                }
                that.svgcontainer.removeClass("span12").addClass(placeholder.attr('class')).insertBefore(placeholder);
                placeholder.remove();
                $(document).trigger('resize');
                that.isModal = false;
                that.isShown = false;
            });
        });
    },
    createDOMStructure: function(container, json) {
        var out;
        if (typeof this.svgcontainer !== 'undefined') {
            out = this.svgcontainer;
        } else {
            var DOMString = this.DOMTemplate({json: json});
            container.append(DOMString);
            out = container.find('div:last');
        }
        return out;
    },
    createModalIfActivated: function(json) {
        if (json.data.modal) {
            if ($('body>.modal').length === 0) {
//No modal handler found, ask to initialize one
                new PageView({model: new PageComponentCollection([{type: 'modal'}]), el: 'body'});
            }
            this.createClickHandler();
        }
    },
    drawGraph: function(svgcontainer) {
        if (this.svgcontainer.length === 0) {
            throw "No svgcontainer found";
        }
        svgcontainer.html('');
        this.series = [{
                data: [],
                label: this.json.data.graphOf[0]
            }];
        if (typeof this.graphics !== 'undefined') {
            series = this.graphics.series;
        }
        var maxheight = 600;
        svgcontainer.height(svgcontainer.width() < maxheight ? svgcontainer.width() : maxheight);
        var graph = $.plot(svgcontainer[0], this.series, this.json.data.graphOptions);
        return graph;
    },
    DOMTemplate: PageView.template('<div <%= iif_attr("class", json.classes) %> <%= iif_attr("id", json.id) %>><h5 class="muted text-center"><%= json.data.graphOf.join("/") %></h5><div class="svgcontainer"></div></div>'),
    jsonDefaults: {
        type: 'graph',
        classes: '',
        id: '',
        data: {
            modal: false,
            graphOf: [],
            timeConfig: {
                realtime: true,
                pollInterval: 1000,
                pt: ['PT1d']
            },
            graphOptions: {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                legend: {
                    show: true
                },
                grid: {
                    hoverable: true
                },
                xaxis: {
                    mode: 'time'
                },
                tooltip: true
            }
        }
    }
});