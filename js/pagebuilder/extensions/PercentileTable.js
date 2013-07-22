PageView.extensions.percentileTable = Backbone.View.extend({
    render: function() {
        var container = this.$el;
        var json = this.model.attributes;
        var that = this;
        var DOMString = this.DOMTemplate({json: json});
        this.procedureMapping;

        var that = this;
        this.getProcedureMapping(function() {
            container.append(DOMString);

            var thead = container.find('thead>tr');
            for (var i = 0; i < json.data.percentiles.values.length; i++) {
                var th = document.createElement('th');
                th.innerHTML = json.data.percentiles.values[i];
                PageView.setTagAttribute(th, 'class', json.data.tabledatastyle);
                thead.append(th);
            }

            //request table data
            var wrapper = {data: {procedureMapping: this.procedureMapping}};
            var j = $.extend(true, {}, json, wrapper);
            var bodyString = that.BodyTemplate({json: j});
            container.find('tbody').html(bodyString);

            var conf = json.data.percentiles;
            var intervalConf = conf.timeConfig.pt.join('/');
            var interval = new moment().interval(intervalConf);
            var from = interval.start().toISOString();
            var to = interval.end().toISOString();


            var percentiles = conf.values.join(',');

            var suffix = '?from=' + from + '&to=' + to + '&percentages=' + percentiles;



            _.each(json.data.percentiles.of, function(procedure) {
                var url = 'rest/percentile/' + procedure + suffix;
                (function(url, name) {
                    $.get(url, function(resp) {
                        var resp = resp;
                        var tr = container.find('tr[data-name=' + name + ']');
                        console.debug('percentileResp', resp);
                        for (var i = 0; i < json.data.percentiles.values.length; i++) {
                            var td = tr.find('td[data-percentile="' + json.data.percentiles.values[i] + '"]');
                            console.debug('td, ', td);
                            var tdData = resp[i];
                            td.html(tdData);
                        }
                        that.percentileClass(tr, json.data.percentiles.limits[name]);
                    });
                })(url, procedure);
            });
        }.bind(this));
    },
    getProcedureMapping: function(callback) {
        var that = this;
        $.get('rest/procedure', function(resp) {
            that.procedureMapping = resp;
            callback();
        });
    },
    getNameFromProcedureId: function(id) {
        for (var i = 0; i < this.procedureMapping.length; i++) {
            if (id === this.procedureMapping[i].id) {
                return createNameFromProcedure(this.procedureMapping[i]);
                break;
            }
        }
        return 'Unknown';

        function createNameFromProcedure(procedure) {
            var name = 'Unknown';
            if (procedure.name) {
                name = procedure.name;
            }
            return name;
        }
    },
    percentileClass: function(row, limits) {
        console.debug('class', row, limits);
        var max = -1;
        var ind = 0;
        row.children().slice(1).each(function() {
            var p = parseFloat($(this).text());
            if (p >= limits[ind++]) {
                row.addClass('error');
                return;
            }
        });
        row.addClass('success');
    },
    DOMTemplate: PageView.template('\
<table <%= iif_attr("class", json.data.tablestyle) %>>\n\
    <thead <%= iif_attr("class", json.data.tableheaderstyle) %>>\n\
        <tr <%= iif_attr("class", json.data.tablerowstyle) %>>\n\
            <th>Name/Percentiles</th>\n\
        </tr>\n\
    </thead>\n\
    <tbody></tbody>\n\
</table>\n\
'),
    HeaderTemplate: PageView.template(''),
    BodyTemplate: PageView.template('<% \n\
    _.each(json.data.percentiles.of, function(procedure){\n\
        %><tr<%= iif_attr("class", json.data.tablerowstyle) %> <%= iif_attr("data-name", procedure) %>>\n\
        <td><%= createHeader([procedure], json.data.procedureMapping) %></td><%\n\
        _.each(json.data.percentiles.values, function(percentile){\n\
            %><td<%= iif_attr("class", json.tablecellstyle) %> <%= iif_attr("data-percentile", percentile) %>></td><%\n\
        })\n\
        %></tr><%\n\
    }); %>')
});