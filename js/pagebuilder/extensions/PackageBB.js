PageView.extensions.package = Backbone.View.extend({
    render: function() {
        var container = this.$el;
        var json = this.model.attributes;
        if (typeof json.data.createcontainer !== 'undefined' && json.data.createcontainer === true) {
            var newcontainer = document.createElement('div');
            PageView.setTagAttribute(newcontainer, 'class', json.classes);
            PageView.setTagAttribute(newcontainer, 'id', json.id);
            container.append(newcontainer);
            container = newcontainer;
        }
        var that = this;
        $.get({
            url: json.data.url,
            success: function(resp) {
                new PageView({el: container, model: new PageComponentCollection(JSON.parse(resp))});
            }
        });
    }
});