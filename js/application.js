$(document).ready(function() {
    $.get({url: 'last24h', dataType: 'json', type: 'get', success: buildPage, fixture:Fixtures.page});

    function buildPage(json) {
        var json = JSON.parse(json);
        var pb = new PageBuilder($('.applicationcontainer'), json);
        pb.build();
    }
});