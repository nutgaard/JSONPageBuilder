PageBuilder.extensions.package = function(container, json){
    this.container = container;
    this.json = json;
}
PageBuilder.extensions.package.prototype.render = function () {
    var container = this.container;
    var json = this.json;
    var mycontainer = container;
    if (typeof json.data.createcontainer !== 'undefined' && json.data.createcontainer == true){
        var newcontainer = document.createElement('div');
        PageBuilder.setAttribute(newcontainer, 'class', json.classes);
        PageBuilder.setAttribute(newcontainer, 'id', json.id);
        container.append(container);
        container = newcontainer;
    }
    $.get({
        url: json.data.url,
        success: function(resp) {
            PageBuilder.build(mycontainer, JSON.parse(resp));
        }
    });
}