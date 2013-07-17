var PageView = Backbone.View.extend({
    initialize: function() {
        if (typeof this.model === 'undefined' || typeof this.model.length === 0) {
            return;
        }
        var childInd = 0;
        while (typeof this.model.at(childInd) !== 'undefined') {
            var child = this.model.at(childInd++);
            PageView.build(this.$el, child);
        }
    }
});
PageView.build = function(container, element) {
    var view = PageView.extensions[element.get('type')];
    if (typeof view === 'undefined') {
        view = PageView.extensions.default;
    }
    var a = new view({el: container, model: element}).render();
};
PageView.setTagAttribute = function(node, attributeName, attributeValue) {
    function check(s) {
        return typeof s !== 'undefined' && s.toString().length > 0;
    }
    if (typeof node !== 'undefined' && check(attributeName) && check(attributeValue)) {
        node.setAttribute(attributeName, attributeValue);
    }
};
PageView.template = function(templatetext) {
  return _.template(templatetext);
};
PageView.extensions = {};
PageView.extensions.default = Backbone.View.extend({
    render: function() {
        if (typeof this.model.get('type') !== 'undefined') {
            var tag = document.createElement(this.model.get('type'));
            PageView.setTagAttribute(tag, 'class', this.model.get('classes'));
            PageView.setTagAttribute(tag, 'id', this.model.get('id'));
            if (typeof this.model.get('data') !== 'undefined' && typeof this.model.get('data').innerHTML !== 'undefined') {
                tag.innerHTML = this.model.get('data').innerHTML;
            }
            this.$el.append(tag);
        }
        new PageView({
            el: $(tag || 'body'),
            model: this.model.get('elements')
        });
    }
});