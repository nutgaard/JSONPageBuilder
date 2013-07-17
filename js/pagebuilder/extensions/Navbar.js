PageView.extensions.navbar = Backbone.View.extend({
    render: function() {
        this.container = this.$el;
        this.json = this.model.attributes;

        var ul = this.createDivStructure(this.$el, this.model.attributes);
        this.createNavElements(ul, this.model.attributes);
        this.registerHandlers(this.container);
    },
    createDivStructure: function(container, json) {
        var DOMString = this.DOMTemplate({json: json});
        container.append(DOMString);
        return container.find('ul.nav');
    },
    createNavElements: function(container, json) {
        var NAVString = this.NAVTemplate({elements: json.data.links});
        container.append(NAVString);
        container.find('li:first').addClass('active');
    },
    registerHandlers: function(container) {
        var that = this;

        container.on('click', 'li', function() {
            var element = $(this);
            if (!element.hasClass('active')) {
                that.updateView(element);
            }
        });

        container.on('navbar.change', function(event, element) {
            var element = $(element);
            that.updateView(element);
        });
    },
    updateView: function(element) {
        console.debug('update', element);
        this.container.find('li.active').removeClass('active');
        element.addClass('active');
        this.container.trigger('navbar.updated', element);
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