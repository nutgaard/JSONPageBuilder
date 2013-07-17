PageView.extensions.graph = Backbone.View.extend({
    render: function() {
        this.container = this.$el;
        this.svgcontainer = undefined;
        this.graphics = undefined;
        this.prev = 0;
        this.type = Math.random();
        this.json = this.model.attributes;
        this.series;
        this.isModal = false;
        this.graphOptions = {
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
                show: true,
            },
            grid: {
                hoverable: true
            },
            xaxis: {
                mode: 'time'
            },
            tooltip: true
        };
        this.svgcontainer = this.createDOMStructure(this.container, this.json);
        this.createModalIfActivated(this.json);

        this.graphics = this.drawGraph(this.svgcontainer);
        this.startUpdate();
        this.createResizeHandler();
    },
    startUpdate: function() {
        setInterval(function() {
            this.prev += 1;
            if (this.type < 0.33) {
                var data = [this.prev, Math.floor(Math.random() * 40) + 120];
            } else if (this.type < 0.66) {
                var data = [this.prev, Math.floor(Math.random() * 40) + 120];
            } else {
                var data = [this.prev, Math.sin(this.prev / Math.PI)];
            }
            this.series[0].data.push(data);
            if (this.series[0].data.length > 50) {
                this.series[0].data.shift();
            }
            this.graphics.setData([this.series[0].data]);
            this.graphics.setupGrid();
            this.graphics.draw();
        }.bind(this), 50);
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
        this.svgcontainer.on('click', 'canvas', function() {
            $('body>.modal').bigmodal('show');
            var placeholder = that.svgcontainer.clone(false, false);
            $('body').off('shown').on('shown', function() {
                $('body>.modal>.modal-header>h3').html(that.json.data.graphOf.join('/'));
                placeholder.insertBefore(that.svgcontainer.removeClass(placeholder.attr('class')).addClass("span12"));
                $('body>.modal>.modal-body').html(that.svgcontainer);
                $(document).trigger('resize');
            });
            $('body').off('hide').on('hide', function() {
                that.svgcontainer.removeClass("span12").addClass(placeholder.attr('class')).insertBefore(placeholder);
                placeholder.remove();
                $(document).trigger('resize');
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
        if (typeof json.data.modal !== 'undefined' && json.data.modal) {
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
        $.extend(this.graphOptions, this.json.data.graphOptions);
        if (typeof this.graphics !== 'undefined') {
            series = this.graphics.series;
        }
        var maxheight = 600;
        svgcontainer.height(svgcontainer.width() < maxheight ? svgcontainer.width() : maxheight);
        var graph = $.plot(svgcontainer[0], this.series, this.graphOptions);
        return graph;
    },
    DOMTemplate: PageView.template('<div <%= iif_attr("class", json.classes) %> <%= iif_attr("id", json.id) %>></div>')
});