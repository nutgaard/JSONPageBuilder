PageView.extensions.graph = Backbone.View.extend({
    render: function() {
        this.container = this.$el;
        this.svgcontainer = undefined;
        this.graphics = undefined;
        this.prev = 0;
        this.type = Math.random();
        this.json = this.model.attributes;
        this.series;
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
            this.graphics = $.plot(this.graphics.getPlaceholder(), this.series, this.graphOptions);
        }.bind(this), 500);
    },
    createResizeHandler: function() {
        var that = this;
        $(window).on('resize', function() {
            if (typeof this.svgcontainer === 'undefined') {
                return;
            } else {
                console.debug('updating');
                this.svgcontainer.height(this.svgcontainer.width());
                //this.rerender();
            }
        }.bind(this));
    },
    createClickHandler: function() {
        var that = this;
        this.container.on('click', '',function() {
            
        });
    },
    createDOMStructure: function(container, json) {
        if (typeof json.data.clickformodal !== 'undefined' && json.data.clickformodal && $('.graphmodal').length === 0) {
            var modalString = this.ModalTemplate();
            $('body').append(modalString);
            this.createClickHandler();
        }
        if (typeof this.svgcontainer !== 'undefined') {
            return this.svgcontainer;
        } else {
            var DOMString = this.DOMTemplate({json: json});
            container.append(DOMString);
            return container.find('div:last');
        }
    },
    drawGraph: function(svgcontainer) {
        if (this.svgcontainer.length === 0) {
            throw "No svgcontainer found";
        }
        svgcontainer.html('');
        var height = width = svgcontainer.width();

        this.series = [{
                data: [],
                label: this.json.data.graphOf[0]
            }];
        $.extend(this.graphOptions, this.json.data.graphOptions);

        if (typeof this.graphics !== 'undefined') {
            series = this.graphics.series;
        }
        svgcontainer.height(svgcontainer.width());
        var graph = $.plot(svgcontainer[0], this.series, this.graphOptions);
        return graph;
    },
    DOMTemplate: PageView.template('<div <%= iif_attr("class", json.classes) %> <%= iif_attr("id", json.id) %>></div>'),
    ModalTemplate: PageView.template('\
    <div class="modal hide fade graphmodal">\n\
        <div class="modal-header">\n\
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n\
            <h3></h3>\n\
        </div>\n\
        <div class="modal-body"></div>\n\
        <div class="modal-footer">\n\
            <a href="#" class="btn">Close</a>\n\
        </div>\n\
    </div>')
});