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
    DOMTemplate: PageView.template('\
        <div class="navbar <%= json.classes %>">\n\
            <div class="navbar-inner">\n\
                <div class="row-fluid">\n\
                    <div class="offset1 span10">\n\
                        <a class="brand" href="#"><%= json.data.brand %></a>\n\
                        <ul class="nav"></ul>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>'),
    NAVTemplate: PageView.template('\
        <% _.each(elements, function(element) { %> \n\
            <li><a href="<%= element.href %>"><%= element.text %></a></li>\n\
         <% }); %>')
});