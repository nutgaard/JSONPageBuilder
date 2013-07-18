if (typeof String.prototype.startsWith !== 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) === str;
  };
}
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
    loadPage('navbar', 'body', false, function() {
        var containerpage = Backbone.history.location.hash;
        if (containerpage.length >= 0 && containerpage.startsWith('#page')) {
             containerpage = containerpage.split('/')[1];
        }
        $('.navbar').find('a[href=#'+containerpage+']').parent().click();
        
    });
    var router = new AppRouter();
    Backbone.history.start();

    $(document).on('navbar.updated', function(event, element) {
        var uri = $(element).children().first().attr('href').slice(1);
        router.navigate('page/' + uri, {trigger: true});
    });


    function loadPage(page, elementSelector, clear, callback) {
        var clear = clear || false;
        var callback = callback || function(){};
        if (clear) {
            $(elementSelector).html('');
        }
        $.get({
            url: 'page/' + page,
            success: function(r) {
                console.debug('destroy');
                $('body').trigger('destroy_view');
                new PageView({model: new PageComponentCollection(JSON.parse(r)), el: elementSelector});
                callback();
            }
        });
    }
});