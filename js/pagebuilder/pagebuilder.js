function PageBuilder(settings) {
    this.settings = {
        url: undefined,
        json: {},
        container: $('body')
    };
    this.settings = $.extend(this.settings, settings);

    this.init = function() {
        if (typeof this.settings.url !== 'undefined') {
            $.get({
                url: this.settings.url,
                success: function(resp) {
                    PageBuilder.build(this.settings.container, JSON.parse(resp));
                }.bind(this)
            });
        } else {
            PageBuilder.build(this.container, this.json);
        }
    };
    this.init();
}
PageBuilder.build = function(container, json) {
    if (typeof json === 'undefined' || typeof json.elements === 'undefined') {
        return;
    }
    for (var childId = 0; childId < json.elements.length; childId++) {
        var child = json.elements[childId];
        PageBuilder.render(container, child);
    }
};
PageBuilder.render = function(container, json) {
    var renderer = PageBuilder.extensions[json.type];
    if (typeof renderer === 'undefined') {
        renderer = PageBuilder.extensions.default;
    }
    new renderer(container, json).render();
};
PageBuilder.setAttribute = function(node, attributeName, attributeValue) {
    function check(s) {
        return typeof s !== 'undefined' && s.toString().length > 0;
    }
    if (typeof node !== 'undefined' && check(attributeName) && check(attributeValue)) {
        node.setAttribute(attributeName, attributeValue);
    }
};
PageBuilder.extensions = {};
PageBuilder.extensions.default = function(container, json) {
    this.container = container;
    this.json = json;
};
PageBuilder.extensions.default.prototype.render = function() {
    var container = this.container;
    var json = this.json;
    var type = document.createElement(json.type);
    PageBuilder.setAttribute(type, 'class', json.classes);
    PageBuilder.setAttribute(type, 'id', json.id);
    if (typeof json.data !== 'undefined' && typeof json.data.innerHTML !== 'undefined') {
        type.innerHTML = json.data.innerHTML;
    }
    container.append(type);
    PageBuilder.build($(type), json);
};