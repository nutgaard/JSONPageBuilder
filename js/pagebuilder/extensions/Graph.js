PageBuilder.extensions.graph = function(container, json){
    this.g = undefined;
    this.container = container;
    this.json = json;
    this.type = Math.random();
    this.prev = 0;
}
PageBuilder.extensions.graph.prototype.render = function(){
    var json = this.json;
    var container = this.container;
    var newcontainer = document.createElement('div');
    PageBuilder.setAttribute(newcontainer, 'class', json.classes);
    PageBuilder.setAttribute(newcontainer, 'id', json.id);
    container.append(newcontainer);
    var palette = new Rickshaw.Color.Palette( { scheme: 'classic9' } );
    this.draw = new Rickshaw.Graph( {
        element: newcontainer,
        height: 500,
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
    this.draw.render();
    setInterval(function(){
        this.prev += 1;
        if (this.type < 0.33) {
            var data = {one: Math.floor(Math.random() * 40) + 120}
        }else if (this.type < 0.66){
            var data = {one: this.prev };
        }else {
            var data = {one: Math.sin(this.prev/Math.PI)}
        }
        this.draw.series.addData(data);
        this.draw.render();
    }.bind(this), 100);
}
