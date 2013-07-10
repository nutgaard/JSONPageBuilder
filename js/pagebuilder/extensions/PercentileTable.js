PageBuilder.extensions.percentileTable = function(container, json){
    function calculatePercentile(ydata, percentile){
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
    }
    function prepareJSON(d){
        var ykey = d.ykey;
        var data = [];
        for (var i = 0; i < d.data.length; i++){
            data.push(d.data[i][ykey]);
        }
        var o = data.sort(function(a,b){return a-b});
        return o;
    }
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

    for (var i = 0; i < json.data.percentileValues.length; i++){
        var th = document.createElement('th');
        th.innerHTML = json.data.percentileValues[i];
        PageBuilder.setAttribute(th, 'class', json.data.tabledatastyle);

        tr.appendChild(th);
    }
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    //request table data
    for (var rowId = 0; rowId < json.data.percentileOf.length; rowId++){
        var rowName = json.data.percentileOf[rowId];
        var tr = document.createElement('tr');
        PageBuilder.setAttribute(tr, 'class', json.data.tablerowstyle);
        PageBuilder.setAttribute(tr, 'data-name', rowName);
        tbody.appendChild(tr);

        var td = document.createElement('td');
        td.innerHTML = rowName;
        PageBuilder.setAttribute(td, 'class', json.data.tablecellstyle);
        tr.appendChild(td);

        console.debug('data', json.data.percentileValues)
        for (var i = 0; i < json.data.percentileValues.length; i++){
            var td = document.createElement('td');
            PageBuilder.setAttribute(td, 'class', json.data.tablecellstyle);
            PageBuilder.setAttribute(td, 'data-percentile', json.data.percentileValues[i]);
            tr.appendChild(td);
        }
        $.get({
            url: 'data/'+rowName,
            success: function(resp) {
                var resp = JSON.parse(resp);
                var tr = $('tr[data-name='+resp.name+']');
                var ydata = prepareJSON(resp);
                for (var i = 0; i < json.data.percentileValues.length; i++){
                    var td = tr.find('td[data-percentile="'+json.data.percentileValues[i]+'"]');
                    var tdData = calculatePercentile(ydata, json.data.percentileValues[i]);
                    td.html(tdData);
                }
            },
            fixture:Fixtures.page
        });
    }
    container.html(table.outerHTML);


}
