function PageBuilder() {

}
PageBuilder.build = function(container, json) {
    if (typeof json == 'undefined'){
        return;
    }else if (typeof json.elements == 'undefined') {
        console.debug('leaf', json);
    }
    for (var childId = 0; childId < json.elements.length; childId++){
        var child = json.elements[childId];
        PageBuilder.render(container, child);
    }

}
PageBuilder.render = function(container, json){
    var renderer = PageBuilder.extensions[json.type];
    if (typeof renderer == 'undefined'){
        renderer = PageBuilder.extensions.default;
    }
    renderer(container, json);
}
PageBuilder.setAttribute = function(node, attributeName, attributeValue){
    function check(s){
        return typeof s !== 'undefined' && s.toString().length > 0;
    }
    if (typeof node !== 'undefined' && check(attributeName) && check(attributeValue)){
        node.setAttribute(attributeName, attributeValue);
    }
}
PageBuilder.extensions = {};
PageBuilder.extensions.default = function (container, json){
    console.debug('default', json);
    var type = document.createElement(json.type)
    PageBuilder.setAttribute(type, 'class', json.classes);
    PageBuilder.setAttribute(type, 'id', json.id);
    container.append(type);
    PageBuilder.build($(type), json);
}


