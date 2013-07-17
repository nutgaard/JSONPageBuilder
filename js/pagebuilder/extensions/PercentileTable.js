PageView.extensions.percentileTable = Backbone.View.extend({
    render: function() {
        var container = this.$el;
        var json = this.model.attributes;
        var that = this;
        var DOMString = this.DOMTemplate({json:json});
        container.append(DOMString);
//        var table = document.createElement('table');
//        PageView.setTagAttribute(table, 'class', json.data.tablestyle);
//
//        //create header
//        var thead = document.createElement('thead');
//        PageView.setTagAttribute(thead, 'class', json.data.tableheaderstyle);
//
//        var tr = document.createElement('tr');
//        PageView.setTagAttribute(tr, 'class', json.data.tablerowstyle);
//
//        var th = document.createElement('th');
//        th.innerHTML = 'Name/Percentiles';
//        PageView.setTagAttribute(th, 'class', json.data.tabledatastyle);
//
//        tr.appendChild(th);
//        thead.appendChild(tr);
//        table.appendChild(thead);

        var thead = container.find('thead>tr');
        for (var i = 0; i < json.data.percentiles.values.length; i++) {
            var th = document.createElement('th');
            th.innerHTML = json.data.percentiles.values[i];
            PageView.setTagAttribute(th, 'class', json.data.tabledatastyle);
            thead.append(th);
        }
//        var tbody = document.createElement('tbody');
//        table.appendChild(tbody);

        //request table data
        var bodyString = this.BodyTemplate({json:json});
        container.find('tbody').html(bodyString);
        var that = this;
        _.each(json.data.percentiles.of, function(procedure){
            $.get({
                url: 'data/' + procedure,
                success: function(resp) {
                    var resp = JSON.parse(resp);
                    var tr = container.find('tr[data-name=' + resp.name + ']');
                    var ydata = that.prepareJSON(resp);
                    for (var i = 0; i < json.data.percentiles.values.length; i++) {
                        var td = tr.find('td[data-percentile="' + json.data.percentiles.values[i] + '"]');
                        var tdData = that.calculatePercentile(ydata, json.data.percentiles.values[i]);
                        td.html(tdData);
                    }
                    that.percentileClass(tr, json.data.percentiles.limits[resp.name]);
                }
            });
        });
//        for (var rowId = 0; rowId < json.data.percentiles.of.length; rowId++) {
//            var rowName = json.data.percentiles.of[rowId];
//            var tr = document.createElement('tr');
//            PageView.setTagAttribute(tr, 'class', json.data.tablerowstyle);
//            PageView.setTagAttribute(tr, 'data-name', rowName);
//            tbody.appendChild(tr);
//
//            var td = document.createElement('td');
//            td.innerHTML = rowName;
//            PageView.setTagAttribute(td, 'class', json.data.tablecellstyle);
//            tr.appendChild(td);
//
//            for (var i = 0; i < json.data.percentiles.values.length; i++) {
//                var td = document.createElement('td');
//                PageView.setTagAttribute(td, 'class', json.data.tablecellstyle);
//                PageView.setTagAttribute(td, 'data-percentile', json.data.percentiles.values[i]);
//                tr.appendChild(td);
//            }
//            
//        }
//        container.html(table.outerHTML);
    },
    prepareJSON: function(d) {
        var ykey = d.ykey;
        var data = [];
        for (var i = 0; i < d.data.length; i++) {
            data.push(d.data[i][ykey]);
        }
        var o = data.sort(function(a, b) {
            return a - b
        });
        return o;
    },
    calculatePercentile: function(ydata, percentile) {
        var realInd = percentile / 100 * (ydata.length - 1);
        var ind = Math.round(realInd);
        var frac = realInd - ind;
        var ans;
        if (ind + 1 < ydata.length) {
            ans = ydata[ind] * (1 - frac) + ydata[ind + 1] * frac;
        } else {
            ans = ydata[ind];
        }
        ans = ans.toFixed(2) + "";
        while (ans.length < 5) {
            ans = "0" + ans;
        }
        return ans;
    },
    percentileClass: function(row, limits) {
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
        <td><%= procedure %></td><%\n\
        _.each(json.data.percentiles.values, function(percentile){\n\
            %><td<%= iif_attr("class", json.tablecellstyle) %> <%= iif_attr("data-percentile", percentile) %>></td><%\n\
        })\n\
        %></tr><%\n\
    }); %>')
});