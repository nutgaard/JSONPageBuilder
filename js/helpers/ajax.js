$.get = function(request) {
    var req = $.extend({type: 'GET',fixture:Fixtures.page}, request);
    return $.ajax(req);
}
$.post = function(request) {
    var req = $.extend({type: 'POST',fixture:Fixtures.page}, request);
    return $.ajax(req);
}