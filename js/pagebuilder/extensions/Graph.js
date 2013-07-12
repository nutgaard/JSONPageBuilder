(function() {
    var graph = function(container, json) {
        graph.render(container, json);
        /*
         {
            type: 'graph',
            classes: 'span4',
            id: '',
            data: {
                graphOf: ['TSATCalculator']
            }
         }
         */
    };
    graph.render = function(container, json){
        var myDiv = document.createElement('div');
        PageBuilder.setAttribute(myDiv, 'class', json.classes);
        PageBuilder.setAttribute(myDiv, 'id', json.id);
        myDiv.innerHTML = 'This is my graph';
        container.append(myDiv);
    };
    PageBuilder.extensions.graph = graph;
})();