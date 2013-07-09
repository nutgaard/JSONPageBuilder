function PageBuilder(container, json) {
    this.conainer = container;
    this.json = json;

    this.build = function() {
        for (var rowId = 0; rowId < this.json.rows.length; rowId++){
            container.append('<div class=""></div>');
            var rowJSON = this.json.rows[rowId];
            var rowContainer = container.find('div:last').addClass(rowJSON.style);

            for (var elementId = 0; elementId < rowJSON.elements.length; elementId++){
                rowContainer.append('<div class=""></div>');
                var elementJSON = rowJSON.elements[elementId];
                var elementContainer = rowContainer.find('div:last').addClass(elementJSON.style);

                var renderer = PageBuilder.extensions[elementJSON.type];
                var html = '';
                if (typeof renderer == 'undefined'){
                    html = PageBuilder.extensions.default(json);
                }else {
                    html = renderer(elementJSON);
                }
                elementContainer.html(html);
            }
        }
    }
}
PageBuilder.extensions = {};
PageBuilder.extensions.default = function (json){
    return JSON.stringify(json);
}


