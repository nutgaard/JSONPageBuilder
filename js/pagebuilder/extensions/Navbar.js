PageBuilder.extensions.navbar = function(container, json){
    this.container = container;
    this.json = json;
};
PageBuilder.extensions.navbar.prototype.render = function () {
    var ul = this.createDivStructure(this.container);
    this.createNavElements(ul, this.json);
};
PageBuilder.extensions.navbar.prototype.createDivStructure = function(container) {
    var navbar = document.createElement('div');
    PageBuilder.setAttribute(navbar, 'class', 'navbar '+this.json.classes);
    PageBuilder.setAttribute(navbar, 'id', this.json.id);
    container.append(navbar);
    
    var navbarInner = document.createElement('div');
    PageBuilder.setAttribute(navbarInner, 'class', 'navbar-inner');
    navbar.appendChild(navbarInner);
    
    var rowfluid = document.createElement('div');
    PageBuilder.setAttribute(rowfluid, 'class', 'row-fluid');
    navbarInner.appendChild(rowfluid);
    
    var offsetSpan = document.createElement('div');
    PageBuilder.setAttribute(offsetSpan, 'class', 'offset1 span10');
    rowfluid.appendChild(offsetSpan);
    
    var brand = document.createElement('a');
    PageBuilder.setAttribute(brand, 'class', 'brand');
    PageBuilder.setAttribute(brand, 'href', '#');
    brand.innerHTML = this.json.data.brand;
    offsetSpan.appendChild(brand);
    
    var ul = document.createElement('ul');
    PageBuilder.setAttribute(ul, 'class', 'nav');
    offsetSpan.appendChild(ul);
    
    return $(ul);
}
PageBuilder.extensions.navbar.prototype.createNavElements = function(container, json) {
    for (var i = 0; i < this.json.data.links.length; i++) {
        var link = this.json.data.links[i];
        var li = document.createElement('li');
        if (i === 0){
            PageBuilder.setAttribute(li, 'class', 'active');
        }
        var a = document.createElement('a');
        PageBuilder.setAttribute(a, 'href', link.href);
        a.innerHTML = link.text;
        li.appendChild(a);
        container.append(li);
    }
}