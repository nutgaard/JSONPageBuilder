PageBuilder.extensions.percentile = function(container, json){
    //TODO: find the bug and fix it, there are some border conditions with percentile == 0 and percentile == 100 that fails.
    function calculatePercentile(ydata, percentile){
        var rank = Math.round((percentile/100)*ydata.length + 0.49);
        var ans = ydata[rank];
        console.debug('percentile', percentile, rank);
        return ans;
    }
    function prepareJSON(d){
        var ykey = d.ykey;
        var data = [];
        for (var i = 0; i < d.data.length; i++){
            data.push(d.data[i][ykey]);
        }
        return data.sort(function(a,b){return a-b});
    }
    var table = document.createElement('table');
    table.setAttribute('class', json.tablestyle);

    //create header
    var th = document.createElement('thead');
    th.setAttribute('class', json.tableheaderstyle);
    var tr = document.createElement('tr');
    tr.setAttribute('class', json.tablerowstyle);

    var tl = document.createElement('th');
    tl.innerHTML = 'Name/Percentiles';
    tl.setAttribute('class', json.tabledatastyle);
    tr.appendChild(tl);
    th.appendChild(tr);

    for (var i = 0; i < json.percentileValues.length; i++){
        var td = document.createElement('th');
        td.innerHTML = json.percentileValues[i];
        td.setAttribute('class', json.tabledatastyle);
        tr.appendChild(td);
    }
    table.appendChild(th);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    //request table data
    for (var rowId = 0; rowId < json.percentileOf.length; rowId++){
        var rowName = json.percentileOf[rowId].name;
        var tr = document.createElement('tr');
        tr.setAttribute('class', json.tablerowstyle);
        tr.setAttribute('data-name', rowName);
        tbody.appendChild(tr);
        var td = document.createElement('td');
        td.innerHTML = rowName;
        td.setAttribute('class', json.tabledatastyle);
        tr.appendChild(td);
        for (var i = 0; i < json.percentileValues.length; i++){
            var td = document.createElement('td');
            td.setAttribute('class', json.tabledatastyle);
            td.setAttribute('data-percentile', json.percentileValues[i]);
            tr.appendChild(td);
        }
        $.get({
            url: 'data/'+rowName,
            success: function(resp) {
                var resp = JSON.parse(resp);
                var tr = $('tr[data-name='+resp.name+']');
                var ydata = prepareJSON(resp);
                for (var i = 0; i < json.percentileValues.length; i++){
                    var td = tr.find('td[data-percentile="'+json.percentileValues[i]+'"]');
                    td.html(calculatePercentile(ydata, json.percentileValues[i]));
                }
            },
            fixture:Fixtures.page
        });
    }
    container.html(table.outerHTML);
//    a = $.get({url: 'data/ICWThingy', success: function(){console.debug(arguments)}, fixture:Fixtures.page})
//    var ydata = prepareJSON(json);


}
