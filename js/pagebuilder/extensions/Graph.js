PageView.extensions.graph = Backbone.View.extend({
    render: function() {
        this.svgcontainer = undefined;
        this.graphics = undefined;
        this.prev = 0;
        this.type = Math.random();
        this.rerender();
        this.startUpdate();
        this.createResizeHandler();
    },
    rerender: function() {
        this.svgcontainer = this.createDOMStructure(this.$el, this.model.attributes);
        this.graphics = this.drawGraph(this.svgcontainer);
    },
    startUpdate: function() {
        setInterval(function() {
            this.prev += 1;
            if (this.type < 0.33) {
                var data = {one: Math.floor(Math.random() * 40) + 120};
            } else if (this.type < 0.66) {
                var data = {one: this.prev};
            } else {
                var data = {one: Math.sin(this.prev / Math.PI)};
            }
            this.graphics.series.addData(data);
            this.graphics.render();
        }.bind(this), 100);
    },
    createResizeHandler: function() {
        var that = this;
        $(window).on('resize', function() {
            if (typeof this.svgcontainer === 'undefined') {
                return;
            } else {
                this.rerender();
            }
        }.bind(this));
    },
    createDOMStructure: function(container, json) {
        if (typeof this.svgcontainer !== 'undefined') {
            return this.svgcontainer;
        }
        var newcontainer = document.createElement('div');
        PageView.setTagAttribute(newcontainer, 'class', json.classes);
        PageView.setTagAttribute(newcontainer, 'id', json.id);
        container.append(newcontainer);
        return $(newcontainer);
    },
    drawGraph: function(svgcontainer) {
        if (this.svgcontainer.length === 0) {
            throw "No svgcontainer found";
        }
        svgcontainer.html('');
        var palette = new Rickshaw.Color.Palette({scheme: 'classic9'});
        var height = width = svgcontainer.width();
        var series;
        if (typeof this.graphics !== 'undefined') {
            series = this.graphics.series;
        }
        var graphconfig = {
            element: svgcontainer[0],
            height: height,
            width: width,
            renderer: 'area',
            stroke: true,
            preserve: true,
            series: series || new Rickshaw.Series.FixedDuration([{name: 'one'}], undefined, {
                timeInterval: 1000,
                maxDataPoints: 100,
                timeBase: new Date().getTime() / 1000,
                color: palette.color(2)
            })
        };
        var graph = new Rickshaw.Graph(graphconfig);
        graph.render();
        return graph;
    }
});