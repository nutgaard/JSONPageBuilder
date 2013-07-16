PageView.extensions.navbar = Backbone.View.extend({
    render: function() {
        var ul = this.createDivStructure(this.$el, this.model.attributes);
        this.createNavElements(ul, this.model.attributes);
    },
    createDivStructure: function(container, json) {
        var navbar = document.createElement('div');
        PageView.setTagAttribute(navbar, 'class', 'navbar ' + json.classes);
        PageView.setTagAttribute(navbar, 'id', json.id);
        container.append(navbar);

        var navbarInner = document.createElement('div');
        PageView.setTagAttribute(navbarInner, 'class', 'navbar-inner');
        navbar.appendChild(navbarInner);

        var rowfluid = document.createElement('div');
        PageView.setTagAttribute(rowfluid, 'class', 'row-fluid');
        navbarInner.appendChild(rowfluid);

        var offsetSpan = document.createElement('div');
        PageView.setTagAttribute(offsetSpan, 'class', 'offset1 span10');
        rowfluid.appendChild(offsetSpan);

        var brand = document.createElement('a');
        PageView.setTagAttribute(brand, 'class', 'brand');
        PageView.setTagAttribute(brand, 'href', '#');
        brand.innerHTML = json.data.brand;
        offsetSpan.appendChild(brand);

        var ul = document.createElement('ul');
        PageView.setTagAttribute(ul, 'class', 'nav');
        offsetSpan.appendChild(ul);

        return $(ul);
    },
    createNavElements: function(container, json) {
        for (var i = 0; i < json.data.links.length; i = i + 1) {
            var link = json.data.links[i];
            var li = document.createElement('li');
            if (i === 0) {
                PageView.setTagAttribute(li, 'class', 'active');
            }
            var a = document.createElement('a');
            PageView.setTagAttribute(a, 'href', link.href);
            a.innerHTML = link.text;
            li.appendChild(a);
            container.append(li);
        }
    }
});