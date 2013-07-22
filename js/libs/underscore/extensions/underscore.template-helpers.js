(function() {
    var originalUnderscoreTemplateFunction = _.template;
    var templateHelpers = {};

    _.mixin({
        addTemplateHelpers: function(newHelpers) {
            _.extend(templateHelpers, newHelpers);
        },
        template: function(text, data, settings) {
            // replace the built in _.template function with one that supports the addTemplateHelpers
            // function above. Basically the combo of the addTemplateHelpers function and this new
            // template function allows us to mix in global "helpers" to the data objects passed
            // to all our templates when they render. This replacement template function just wraps
            // the original _.template function, so it sould be pretty break-resistent moving forward.
            if (data)
            {

                // if data is supplied, the original _.template function just returns the raw value of the
                // render function (the final rentered html/text). So in this case we just extend
                // the data param with our templateHelpers and return raw value as well.

                _.defaults(data, templateHelpers); // extend data with our helper functions
                return originalUnderscoreTemplateFunction.apply(this, arguments); // pass the buck to the original _.template function
            }

            var template = originalUnderscoreTemplateFunction.apply(this, arguments);

            var wrappedTemplate = function(data) {
                if (data)
                    _.defaults(data, templateHelpers);
                return template.apply(this, arguments);
            };

            return wrappedTemplate;
        }
    });
})();
_.addTemplateHelpers({
    iif_attr: function(attribute, value) {
        if (typeof value !== 'undefined') {
            if (typeof value !== 'string' || (typeof value === 'string' && value.length > 0)) {
                return attribute + '="' + value + '"';
            }
        }
    }
});
_.addTemplateHelpers({
    createHeader: function(graphOf, procedureMapping) {
        console.debug('graphOf', graphOf, procedureMapping);
        
        var names = [];
        for (var i = 0; i < graphOf.length; i++) {
            names.push(findNameForId(graphOf[i], procedureMapping));
        }
        return names.join('/');
        
        function findNameForId(id, procedureMapping) {
            for (var i = 0; i < procedureMapping.length; i++) {
                if (id === procedureMapping[i].id){
                    return createNameFromProcedure(procedureMapping[i]);
                    break;
                }
            }
            return 'Unknown';
        }
        function createNameFromProcedure(procedure) {
            var name = 'Unknown';
            if (procedure.name){
                name = procedure.name;
            }else if(procedure.className || procedure.method) {
               name = procedure.className+(procedure.method ? '.'+procedure.method : ''); 
            }
            return name;
        }
    }
});