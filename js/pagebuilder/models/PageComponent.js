var PageComponent = Backbone.Model.extend({
    idAttribute: '_id',
    initialize: function() {       
        if (Array.isArray(this.get('elements'))) {
            this.set({elements: new PageComponentCollection(this.get('elements'))});
        }
    }
});
var PageComponentCollection = Backbone.Collection.extend({
    model: PageComponent
}); 