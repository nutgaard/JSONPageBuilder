PageView.extensions.modal = Backbone.View.extend({
    render: function() {
        if ($('body>.modal').length !== 0) {
            return;
        }

        this.container = $('body'); //Modals should allways be at toplevel in DOM for easy access. 
        this.json = this.model.attributes;

        this.modal = this.createStructure(this.container, this.json);
        this.head = this.modal.find('.modal-header>h3');
        this.body = this.modal.find('.modal-body');
        this.injectJSON = undefined;
        this.registerEventListener();
    },
    createStructure: function(container, json) {
        var DOMString = this.ModalTemplate({json: json});
        this.container.append(DOMString);
        return this.container.find('.modal');
    },
    registerEventListener: function() {
        var that = this;
        $(document).on('modal_show', function(evt, json) {
            if(typeof json.style !== 'undefined') {
                that.modal.addClass(json.style);
            }
            that.head.html(json.header);
            that.modal.modal('show');
            that.injectJSON = json;
        });
    },
    ModalTemplate: PageView.template('\
    <div class="modal hide fade">\n\
        <div class="modal-header">\n\
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n\
            <h3></h3>\n\
        </div>\n\
        <div class="modal-body row-fluid"></div>\n\
    </div>')
});