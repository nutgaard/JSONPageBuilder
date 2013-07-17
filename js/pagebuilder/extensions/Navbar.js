PageView.extensions.navbar = Backbone.View.extend({
    render: function() {
        var ul = this.createDivStructure(this.$el, this.model.attributes);
        this.createNavElements(ul, this.model.attributes);
    },
    createDivStructure: function(container, json) {
        var DOMString = this.DOMTemplate({json:json});
        container.append(DOMString);
        return container.find('ul.nav');
    },
    createNavElements: function(container, json) {
        var NAVString = this.NAVTemplate({elements: json.data.links});
        container.append(NAVString);
        container.find('li:first').addClass('active');
    },
    DOMTemplate: PageView.template('<div class="navbar <%= json.classes %>"><div class="navbar-inner"><div class="row-fluid"><div class="offset1 span10"><a class="brand" href="#"><%= json.data.brand %></a><ul class="nav"></ul></div></div></div></div>'),
    NAVTemplate: PageView.template('<% _.each(elements, function(element) { %> <li><a href="<%= element.href %>"><%= element.text %></a></li> <% }); %>')
});