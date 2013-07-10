(function() {
    var graph = function(container, json) {
        graph.render(container, json);
    }
    graph.render = function(container, json){
        var myDiv = document.createElement('div');
        PageBuilder.setAttribute(myDiv, 'class', json.classes);
        PageBuilder.setAttribute(myDiv, 'id', json.id);
        myDiv.innerHTML = 'This is my graph';
        container.append(myDiv);
    }
    PageBuilder.extensions.graph = graph;
})();