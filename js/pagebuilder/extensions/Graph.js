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
        this.placeholder;
        this.containerwidth;
        this.procedureMapping;

        this.getProcedureMapping(function() {
            this.svgcontainer = this.createDOMStructure(this.container, this.json);
            this.createModalIfActivated(this.json);
            this.graphics = this.drawGraph(this.svgcontainer);
            this.startUpdate();
            this.createResizeHandler();
            this.createDestroyHandler();
        }.bind(this));
    },
    getProcedureMapping: function(callback) {
        var that = this;
        $.get({
            url: 'procedure/',
            success: function(resp) {
                that.procedureMapping = JSON.parse(resp);
                callback();
            }
        });
    },
    destroy_view: function() {
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.stopListening();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        if (typeof this.intervalUpdater !== 'undefined') {
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
        var name = this.json.data.graphOf;
        var conf = this.json.data;
        var intervalConf = conf.timeConfig.pt.join('/');
        var interval = new moment().interval(intervalConf);
        var from = interval.start().toISOString();
        var to = interval.end().toISOString();
        var suffix = '?from=' + from + '&to=' + to + '&buckets=' + conf.datapoints;
        for (var i = 0; i < name.length; i++) {
            var url = 'timeMeasurement/' + name[i] + suffix;
            console.debug('url request: ', i, url);
            $.get({
                url: url,
                success: function(resp) {
                    update(i, JSON.parse(resp));
                }
            });
        }
        function update(newdata) {
            var procedureid = -1;
            for (var i = 0; i < newdata.length; i++) {
                if (typeof newdata[i] !== 'undefined') {
                    procedureid = newdata[i].procedure.id;
                    break;
                }
            }
            if (procedureid === -1) {
                return;
            }
            var series = this.series[procedureid].data;
            series.push(newdata);
            while (series.length > this.json.data.datapoints) {
                series.shift();
            }

            this.graphics.setData([series]);
            this.graphics.setupGrid();
            this.graphics.draw();
        }
        ;
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
        if (this.isModal) {
            var c = this.placeholder;
            var nw = c.width();
        } else {
            var c = this.svgcontainer;
            var nw = this.svgcontainer.parent().width() ? this.svgcontainer.parent().width() : this.containerwidth;
        }
        var maxheight = 600;
        this.svgcontainer.height(nw < maxheight ? nw : maxheight);
        this.svgcontainer.width(nw);
        this.graphics.resize();
        this.graphics.setupGrid();
        this.graphics.draw();
    },
    createClickHandler: function() {
        var that = this;
        var modal = $('body>.modal');
        this.placeholder = that.svgcontainer.clone(false, false);
        this.svgcontainer.on('click', 'canvas', function(event) {
            if (that.isModal) {
                event.preventDefault();
                return false;
            }
            that.isModal = true;
            that.placeholder.removeClass().addClass('span12');
            that.placeholder.append(that.svgcontainer.children());
            var modalheader = that.json.data.graphOf.join('/');
            var modalbody = that.placeholder;
            modal.find('.modal-header>h3').html(modalheader);
            modal.find('.modal-body').html(modalbody);
            modal.bigmodal('show');
            modal.on('shown', function() {
                $(document).trigger('resize');
                that.isShown = true;
            });
            modal.on('hide', function(e) {
                if (!that.isShown) {
                    e.preventDefault();
                    return false;
                }
                that.svgcontainer.append(that.placeholder.children());
                that.placeholder.remove();
                that.isModal = false;
                that.isShown = false;
                $(document).trigger('resize');
            });
            modal.on('hidden', function() {
                modal.off();
            });
        });
    },
    createDOMStructure: function(container, json) {
        var out;
        if (typeof this.svgcontainer !== 'undefined') {
            out = this.svgcontainer;
        } else {
            var wrapper = {data: {procedureMapping: this.procedureMapping}};
            var j = $.extend(true, {}, json, wrapper);
            console.debug('mapping', this.procedureMapping);
            console.debug('j', j);

            var DOMString = this.DOMTemplate({json: j});
            container.append(DOMString);
            out = container.find('div:last');
        }
        this.containerwidth = out.width();
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
        console.debug('drawGraphics');
        if (this.svgcontainer.length === 0) {
            throw "No svgcontainer found";
        }
        svgcontainer.html('');

        if (typeof this.graphics !== 'undefined') {
            this.series = this.graphics.series;
        } else {
            var graphOf = this.json.data.graphOf;
            this.series = [];
            for (var i = 0; i < graphOf.length; i++) {
                var serie = {
                    data: [],
                    label: this.getNameFromProcedureId(graphOf[i])
                };
                this.series.push(serie);
            }
        }
        var maxheight = 600;
        svgcontainer.height(svgcontainer.width() < maxheight ? svgcontainer.width() : maxheight);
        var graph = $.plot(svgcontainer[0], this.series, this.json.data.graphOptions);
        return graph;
    },
    getNameFromProcedureId: function(id) {
        for (var i = 0; i < this.procedureMapping.length; i++) {
            if (id === this.procedureMapping[i].id) {
                return createNameFromProcedure(this.procedureMapping[i]);
                break;
            }
        }
        return 'Unknown';

        function createNameFromProcedure(procedure) {
            var name = 'Unknown';
            if (procedure.name) {
                name = procedure.name;
            }
            return name;
        }
    },
    DOMTemplate: PageView.template('\
<div <%= iif_attr("class", json.classes) %> <%= iif_attr("id", json.id) %>>\n\
    <h5 class="muted text-center">\n\
        <%= createHeader(json.data.graphOf, json.data.procedureMapping) %>\n\
    </h5>\n\
    <div class="svgcontainer">\n\
    </div>\n\
</div>'),
    jsonDefaults: {
        type: 'graph',
        classes: '',
        id: '',
        data: {
            modal: false,
            datapoints: 200,
            graphOf: [],
            timeConfig: {
                realtime: false,
                pollInterval: 1000,
                pt: ['PT24H/']
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