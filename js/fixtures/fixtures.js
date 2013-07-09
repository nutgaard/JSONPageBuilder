function Fixtures(url, type) {
    this.url = url;
    this.type = type;

    this.getLast24hJSON = function() {
        return {
            url: url,
            rows:[
                {
                    style: 'row-fluid',
                    elements:[
                        {
                            type: 'graph',
                            style: 'span4',
                            graphOf: [
                                {
                                    name: 'ICWThingy'
                                }
                            ]
                        },
                        {
                            type: 'graph',
                            style: 'span4',
                            graphOf: [
                                {
                                    name: 'TSATCalculator'
                                }
                            ]
                        },
                        {
                            type: 'graph',
                            style: 'span4',
                            graphOf: [
                                {
                                    name: 'ICWThingy'
                                },
                                {
                                    name: 'TSATCalculator'
                                }
                            ]
                        }
                    ]
                },
                {
                    style: '',
                    innterstyle:'',
                    elements:[
                        {
                            type: 'percentile',
                            style: 'span12',
                            percentileOf: [
                                {
                                    name: 'ICWThingy'
                                },
                                {
                                    name: 'TSATCalculator'
                                }
                            ],
                            percentileValues: [1.0, 0.9, 0.8]
                        }
                    ]
                }
            ]
        };
    }
    this.getLastWeekJSON = function(){
        return {url: url};
    }
    this.getLast2WeeksJSON = function() {
        return {url: url};
    }
}
Fixtures.prototype.getResponse = function(){
    var json = {};
    switch (this.url){
        case 'last24h':
            json = this.getLast24hJSON();
            break;
        case 'lastweek':
            json = this.getLastWeekJSON();
            break;
        case 'last2weeks':
            json = this.getLast2WeeksJSON();
            break;
        default:
            json = {error: '404'};
    }
    return JSON.stringify(json);
}
Fixtures.page = function (settings){
    return new Fixtures(settings.url, settings.type).getResponse();
}
