(function() {
    var navbar = function(container, json) {
        navbar.render(container, json);
    }
    navbar.render = function(container, json){
        var myDiv = document.createElement('div');
        PageBuilder.setAttribute(myDiv, 'class', json.classes);
        PageBuilder.setAttribute(myDiv, 'id', json.id);
        myDiv.innerHTML = 'This is my graph';
        container.append(myDiv);
    }
    PageBuilder.extensions.navbar = navbar;
})();