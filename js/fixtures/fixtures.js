function Fixtures(url, type) {
    this.url = url;
    this.type = type;


    this.getNavbar = function() {
        return [
            {
                type: 'navbar',
                classes: 'navbar-inverse navbar-fixed-top',
                data: {
                    brand: 'Brand',
                    links: [
                        {href: '#last24h', text: 'Last 24 h'},
                        {href: '#last1w', text: 'Last week'},
                        {href: '#last2w', text: 'Last two weeks'},
                        {href: '#realtime', text: 'Realtime'},
                        {href: '#settings', text: 'Settings'}
                    ]
                }
            }
        ];
    }
    this.getLast24hJSON = function() {
        return [
            {
                type: 'div',
                classes: 'row',
//                    id: '',
                elements: [
                    {
                        type: 'graph',
                        classes: 'span4',
//                            id: '',
                        data: {
                            graphOf: ['ICWThingy']
                        }
                    },
                    {
                        type: 'graph',
                        classes: 'span4',
//                            id: '',
                        data: {
                            graphOf: ['TSATCalculator']
                        }
                    },
                    {
                        type: 'graph',
                        classes: 'span4',
//                            id: '',
                        data: {
                            graphOf: ['ICWThingy', 'TSATCalculator']
                        }
                    }
                ]
            },
            {
                type: 'div',
                classes: 'row',
//                    id: '',
                elements: [
                    {
                        type: 'percentileTable',
                        classes: '',
//                            id: '',
                        data: {
                            percentiles: {
                                of: ['ICWThingy', 'TSATCalculator'],
                                values: [100, 90, 80, 0],
                                limits: {
                                    'ICWThingy': [11, 10, 10, 10],
                                    'TSATCalculator': [10, 10, 10, 10]
                                }
                            },
                            tablestyle: 'table table-striped',
                            tableheaderstyle: '',
                            tablerowstyle: '',
                            tablecellstyle: ''
                        }
                    }
                ]
            }
        ];
    };
    this.getLastWeekJSON = function() {
        return [
            {
                type: 'h1',
                data: {
                    innerHTML: 'Loaded after everything else'
                },
                elements: [
                    {
                        type: 'package',
                        data: {
                            createcontainer: true,
                            url: 'last2weeks'
                        }
                    }
                ]
            }
        ];
    }
    this.getLast2WeeksJSON = function() {
        return [
                {
                    type: 'h2',
                    data: {
                        innerHTML: 'SubSub'
                    }
                }
            ];
    }
    this.getICWThingyData = function() {
        return {
            name: 'ICWThingy',
            xkey: 'timestamp',
            ykey: 'duration',
            data: [
                {
                    timestamp: new Date(0).getMilliseconds(),
                    duration: 1
                },
                {
                    timestamp: new Date(1).getMilliseconds(),
                    duration: 2
                },
                {
                    timestamp: new Date(2).getMilliseconds(),
                    duration: 2
                },
                {
                    timestamp: new Date(3).getMilliseconds(),
                    duration: 3
                },
                {
                    timestamp: new Date(4).getMilliseconds(),
                    duration: 5
                },
                {
                    timestamp: new Date(5).getMilliseconds(),
                    duration: 9
                },
                {
                    timestamp: new Date(6).getMilliseconds(),
                    duration: 10
                },
                {
                    timestamp: new Date(7).getMilliseconds(),
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
            data: [
                {
                    timestamp: new Date(0).getMilliseconds(),
                    duration: 1
                },
                {
                    timestamp: new Date(10).getMilliseconds(),
                    duration: 2
                },
                {
                    timestamp: new Date(52).getMilliseconds(),
                    duration: 5
                },
                {
                    timestamp: new Date(32).getMilliseconds(),
                    duration: 9
                },
                {
                    timestamp: new Date(46).getMilliseconds(),
                    duration: 50
                },
                {
                    timestamp: new Date(51).getMilliseconds(),
                    duration: 90
                },
                {
                    timestamp: new Date(6).getMilliseconds(),
                    duration: 10
                },
                {
                    timestamp: new Date(57).getMilliseconds(),
                    duration: 11
                }
            ]
        }
    }
}
Fixtures.prototype.getResponse = function(settings) {
    var json = {};
    switch (this.url) {
        case 'page/navbar':
            json = this.getNavbar();
            break;
        case 'page/last24h':
            json = this.getLast24hJSON();
            break;
        case 'page/lastweek':
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
            delete settings.fixture;
            json = $.ajax(settings);
    }
    return JSON.stringify(json);
}
Fixtures.page = function(settings) {
    return new Fixtures(settings.url, settings.type).getResponse(settings);
}
