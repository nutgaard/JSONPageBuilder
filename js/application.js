$(document).ready(function() {
    var nav = new PageBuilder({
        url: 'page/navbar',
        container: $('body')
    });
    var pb = new PageBuilder({
        url: 'page/last24h',
        container: $('.applicationcontainer')
    });
});