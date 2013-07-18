$(document).ready(function() {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'page/:page': 'showpageRoute',
            '*actions': 'defaultRoute',
            '': 'defaultRoute'
        },
        showpageRoute: function(page) {
            loadPage(page, '.applicationcontainer', true);
        },
        defaultRoute: function(actions) {
            loadPage('last24h', '.applicationcontainer', true);
        }
    });
    loadPage('navbar', 'body');
    var router = new AppRouter();
    Backbone.history.start();
    
    $(document).on('navbar.updated', function(event, element) {
        var uri = $(element).children().first().attr('href').slice(1);
        router.navigate('page/'+uri, {trigger: true});
    });
    
    
    function loadPage(page, elementSelector, clear) {
        var clear = clear || false;
        if (clear){
            $(elementSelector).html('');
        }
        $.get({
            url: 'page/' + page,
            success: function(r) {
                $('body').trigger('destroy_view');
                new PageView({model: new PageComponentCollection(JSON.parse(r)), el: elementSelector});
            }
        });
    }
});