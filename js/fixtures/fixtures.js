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
                    style: 'row-fluid',
                    elements:[
                        {
                            type: 'percentile',
                            style: '',
                            tablestyle: 'table',
                            tableheaderstyle: '',
                            tablerowstyle: '',
                            tabledatastyle: '',
                            percentileOf: [
                                {
                                    name: 'ICWThingy'
                                },
                                {
                                    name: 'TSATCalculator'
                                }
                            ],
                            percentileValues: [100, 90, 80, 0]
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
    this.getICWThingyData = function() {
        return {
            name: 'ICWThingy',
            xkey: 'timestamp',
            ykey: 'duration',
            data:[
                {
                    timestamp:  new Date(0).getMilliseconds(),
                    duration: 1
                },
                {
                    timestamp:  new Date(1).getMilliseconds(),
                    duration: 2
                },
                {
                    timestamp:  new Date(2).getMilliseconds(),
                    duration: 2
                },
                {
                    timestamp:  new Date(3).getMilliseconds(),
                    duration: 3
                },
                {
                    timestamp:  new Date(4).getMilliseconds(),
                    duration: 5
                },
                {
                    timestamp:  new Date(5).getMilliseconds(),
                    duration: 9
                },
                {
                    timestamp:  new Date(6).getMilliseconds(),
                    duration: 10
                },
                {
                    timestamp:  new Date(7).getMilliseconds(),
                    duration: 1
                }
            ]
        }
    }
    this.getTSATCalculatorData = function() {
        return {
            name: 'TSATCalculator',
            xkey: 'timestamp',
            ykey: 'duration',
            data:[
                {
                    timestamp:  new Date(0).getMilliseconds(),
                    duration: 1
                },
                {
                    timestamp:  new Date(10).getMilliseconds(),
                    duration: 2
                },
                {
                    timestamp:  new Date(52).getMilliseconds(),
                    duration: 5
                },
                {
                    timestamp:  new Date(32).getMilliseconds(),
                    duration: 9
                },
                {
                    timestamp:  new Date(46).getMilliseconds(),
                    duration: 50
                },
                {
                    timestamp:  new Date(51).getMilliseconds(),
                    duration: 90
                },
                {
                    timestamp:  new Date(6).getMilliseconds(),
                    duration: 10
                },
                {
                    timestamp:  new Date(57).getMilliseconds(),
                    duration: 11
                }
            ]
        }
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
        case 'data/ICWThingy':
            json = this.getICWThingyData();
            break;
        case 'data/TSATCalculator':
            json = this.getTSATCalculatorData();
            break;
        default:
            json = {error: '404'};
    }
    return JSON.stringify(json);
}
Fixtures.page = function (settings){
    return new Fixtures(settings.url, settings.type).getResponse(settings);
}
