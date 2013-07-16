PageBuilder.extensions.graph = function(container, json) {
    this.g = undefined;
    this.container = container;
    this.svgcontainer;
    this.json = json;
    this.type = Math.random();
    this.prev = 0;
};
PageBuilder.extensions.graph.prototype.render = function() {
    this.rerender();
    this.startUpdate();
    this.createResizeHandler();
};
PageBuilder.extensions.graph.prototype.rerender = function() {
    this.svgcontainer = this.createDOMStructure(this.container, this.json);
    this.draw = this.drawGraph(this.svgcontainer);
};
PageBuilder.extensions.graph.prototype.createDOMStructure = function(container, json) {
    if (typeof this.svgcontainer !== 'undefined'){
        return this.svgcontainer;
    }
    var newcontainer = document.createElement('div');
    PageBuilder.setAttribute(newcontainer, 'class', json.classes);
    PageBuilder.setAttribute(newcontainer, 'id', json.id);
    container.append(newcontainer);
    return $(newcontainer);
};
PageBuilder.extensions.graph.prototype.drawGraph = function(svgcontainer) {
    if (svgcontainer.length === 0) {
        throw "No svg container found";
    }
    svgcontainer.html('');
    var palette = new Rickshaw.Color.Palette({scheme: 'classic9'});
    var height = width = $(svgcontainer).width();
    var series;
    if (typeof this.draw !== 'undefined') {
        series = this.draw.series;
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
};
PageBuilder.extensions.graph.prototype.startUpdate = function() {
    setInterval(function() {
        this.prev += 1;
        if (this.type < 0.33) {
            var data = {one: Math.floor(Math.random() * 40) + 120};
        } else if (this.type < 0.66) {
            var data = {one: this.prev};
        } else {
            var data = {one: Math.sin(this.prev / Math.PI)};
        }
        this.draw.series.addData(data);
        this.draw.render();
    }.bind(this), 100);
};
PageBuilder.extensions.graph.prototype.createResizeHandler = function() {
    $(window).on('resize', function() {
        if (typeof this.svgcontainer === 'undefined') {
            return;
        } else {
            this.rerender(this.container, this.json);
        }
    }.bind(this));
};
