(function() {
    var package = function(container, json) {
        package.render(container, json);
        /*
        {
            type: 'package',
            classes: '',
            id: '',
            data:{
                createcontainer: '',
                url: ''
            }
        }
         */
    };
    package.render = function(container, json){
        var mycontainer = container;
        if (typeof json.data.createcontainer !== 'undefined' && json.data.createcontainer == true){
            var newcontainer = document.createElement('div');
            PageBuilder.setAttribute(newcontainer, 'class', json.classes);
            PageBuilder.setAttribute(newcontainer, 'id', json.id);
            container.append(container);
            container = newcontainer;
        }
        $.get({
            url: json.data.url,
            success: function(resp) {
                PageBuilder.build(mycontainer, JSON.parse(resp));
            }
        });
    };
    package.fetchurl = function(container, json){

    };
    PageBuilder.extensions.package = package;
})();