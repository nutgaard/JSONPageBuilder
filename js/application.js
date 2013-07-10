$(document).ready(function() {
    var pb = new PageBuilder({
        url: 'last24h',
        container: $('.applicationcontainer')
    })



//    $.get({url: 'last24h', dataType: 'json', type: 'get', success: buildPage, fixture:Fixtures.page});
//
//    function buildPage(json) {
//        var json = JSON.parse(json);
//        PageBuilder.build($('.applicationcontainer'), json);
//    }
});