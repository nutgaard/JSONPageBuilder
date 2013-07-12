PageBuilder.extensions.percentileTable = function(container, json){
    this.container = container;
    this.json = json;
}
PageBuilder.extensions.percentileTable.prototype.render = function() {
    var container = this.container;
    var json = this.json;
    var that = this;
    var table = document.createElement('table');
    PageBuilder.setAttribute(table, 'class', json.data.tablestyle);

    //create header
    var thead = document.createElement('thead');
    PageBuilder.setAttribute(thead, 'class', json.data.tableheaderstyle);

    var tr = document.createElement('tr');
    PageBuilder.setAttribute(tr, 'class', json.data.tablerowstyle);

    var th = document.createElement('th');
    th.innerHTML = 'Name/Percentiles';
    PageBuilder.setAttribute(th, 'class', json.data.tabledatastyle);

    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);

    for (var i = 0; i < json.data.percentiles.values.length; i++){
        var th = document.createElement('th');
        th.innerHTML = json.data.percentiles.values[i];
        PageBuilder.setAttribute(th, 'class', json.data.tabledatastyle);

        tr.appendChild(th);
    }
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    //request table data
    for (var rowId = 0; rowId < json.data.percentiles.of.length; rowId++){
        var rowName = json.data.percentiles.of[rowId];
        var tr = document.createElement('tr');
        PageBuilder.setAttribute(tr, 'class', json.data.tablerowstyle);
        PageBuilder.setAttribute(tr, 'data-name', rowName);
        tbody.appendChild(tr);

        var td = document.createElement('td');
        td.innerHTML = rowName;
        PageBuilder.setAttribute(td, 'class', json.data.tablecellstyle);
        tr.appendChild(td);

        for (var i = 0; i < json.data.percentiles.values.length; i++){
            var td = document.createElement('td');
            PageBuilder.setAttribute(td, 'class', json.data.tablecellstyle);
            PageBuilder.setAttribute(td, 'data-percentile', json.data.percentiles.values[i]);
            tr.appendChild(td);
        }
        $.get({
            url: 'data/'+rowName,
            success: function(resp) {
                var resp = JSON.parse(resp);
                var tr = $('tr[data-name='+resp.name+']');
                var ydata = that.prepareJSON(resp);
                for (var i = 0; i < json.data.percentiles.values.length; i++){
                    var td = tr.find('td[data-percentile="'+json.data.percentiles.values[i]+'"]');
                    var tdData = that.calculatePercentile(ydata, json.data.percentiles.values[i]);
                    td.html(tdData);
                }
                that.percentileClass(tr, json.data.percentiles.limits[resp.name]);
            }
        });
    }
    container.html(table.outerHTML);
}
PageBuilder.extensions.percentileTable.prototype.calculatePercentile = function(ydata, percentile){
    var realInd = percentile/100*(ydata.length-1);
    var ind = Math.round(realInd);
    var frac = realInd-ind;
    var ans;
    if (ind+1 < ydata.length){
        ans = ydata[ind]*(1-frac)+ydata[ind+1]*frac;
    }else {
        ans = ydata[ind];
    }
    ans = ans.toFixed(2)+"";
    while (ans.length < 5){
        ans = "0"+ans;
    }
    return ans;
};
PageBuilder.extensions.percentileTable.prototype.prepareJSON = function(d){
    var ykey = d.ykey;
    var data = [];
    for (var i = 0; i < d.data.length; i++){
        data.push(d.data[i][ykey]);
    }
    var o = data.sort(function(a,b){return a-b});
    return o;
};
PageBuilder.extensions.percentileTable.prototype.percentileClass = function(row, limits) {
    var max = -1;
    var ind = 0;
    row.children().slice(1).each(function(){
        var p = parseFloat($(this).text());
        if (p >= limits[ind++]){
            row.addClass('error');
            return;
        }
    });
    row.addClass('success');
};