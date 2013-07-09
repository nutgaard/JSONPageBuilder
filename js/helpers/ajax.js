$.get = function(request) {
    var req = $.extend({type: 'GET'}, request);
    return $.ajax(req);
}
$.post = function(request) {
    var req = $.extend({type: 'POST'}, request);
    return $.ajax(req);
}