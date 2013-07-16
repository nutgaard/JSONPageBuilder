$(document).ready(function() {
    $.get({
        url: 'page/navbar',
        success: function(r) {
            new PageView({model: new PageComponentCollection(JSON.parse(r)), el: 'body'})
        }
    });
    $.get({
        url: 'page/last24h',
        success: function(r) {
            new PageView({model: new PageComponentCollection(JSON.parse(r)), el: '.applicationcontainer'})
        }
    });
});