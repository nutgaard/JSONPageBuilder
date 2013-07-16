PageBuilder.extensions.graph = function(container, json){
    this.g = undefined;
    this.container = container;
    this.svgcontainer;
    this.json = json;
    this.type = Math.random();
    this.prev = 0;
}
PageBuilder.extensions.graph.prototype.render = function(){
    var that = this;
    
    this.svgcontainer = this.createDOMStructure(this.container, this.json);
    this.draw = this.drawGraph(this.svgcontainer);
    this.draw.render();
    setInterval(function(){
        that.prev += 1;
        if (this.type < 0.33) {
            var data = {one: Math.floor(Math.random() * 40) + 120}
        }else if (this.type < 0.66){
            var data = {one: that.prev };
        }else {
            var data = {one: Math.sin(that.prev/Math.PI)}
        }
        that.draw.series.addData(data);
        that.draw.render();
    }.bind(this), 100);
    $(window).on('resize', function() {
       if (typeof that.svgcontainer === 'undefined') {
           return;
       }else {
           
       }
    });
};
PageBuilder.extensions.graph.prototype.createDOMStructure = function(container, json){
    var newcontainer = document.createElement('div');
    PageBuilder.setAttribute(newcontainer, 'class', json.classes);
    PageBuilder.setAttribute(newcontainer, 'id', json.id);
    container.append(newcontainer);
    return $(newcontainer);
}
PageBuilder.extensions.graph.prototype.drawGraph = function(svgcontainer) {
    if (svgcontainer.length === 0) {
        throw "No svg container found";
    }
    var palette = new Rickshaw.Color.Palette( { scheme: 'classic9' } );
    var height = width = $(svgcontainer).width();
    return new Rickshaw.Graph( {
        element: svgcontainer[0],
        height: height,
        width: width,
        renderer: 'area',
        stroke: true,
        preserve: true,
        series: new Rickshaw.Series.FixedDuration([{ name: 'one' }], undefined, {
            timeInterval: 1000,
            maxDataPoints: 100,
            timeBase: new Date().getTime() / 1000,
            color: palette.color(2)
        })
    });
}
