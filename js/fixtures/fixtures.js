function Fixtures(url, type) {
    this.url = url;
    this.type = type;


    this.getNavbar = function() {
        return [
            {
                type: 'navbar',
                classes: 'navbar-inverse navbar-fixed-top',
                data: {
                    brand: 'CDMS-Profile',
                    links: [
                        {href: '#last24h', text: 'Last 24 h'},
                        {href: '#last72h', text: 'Last 72 h'},
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
                            modal: true,
                            graphOf: ['ICWThingy'],
                            timeConfig: {
                                realtime: true,
                                pt: ["PT24H"]
                            }
                        }
                    },
                    {
                        type: 'graph',
                        classes: 'span4',
//                            id: '',
                        data: {
                            modal: true,
                            graphOf: ['TSATCalculator'],
                            timeConfig: {
                                realtime: true,
                                pt: ["PT24H"]
                            }
                        }
                    },
                    {
                        type: 'graph',
                        classes: 'span4',
//                            id: '',
                        data: {
                            modal: true,
                            graphOf: ['ICWThingy', 'TSATCalculator'],
                            timeConfig: {
                                realtime: true,
                                pt: ["PT24H"]
                            }
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
                                },
                                timeConfig: {
                                    realtime: false,
                                    pt: ["PT24H"]
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
    this.getLast72hJSON = function() {
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
                            modal: true,
                            graphOf: ['ICWThingy'],
                            timeConfig: {
                                realtime: true,
                                pt: ["PT72H"]
                            }
                        }
                    },
                    {
                        type: 'graph',
                        classes: 'span4',
//                            id: '',
                        data: {
                            modal: true,
                            graphOf: ['TSATCalculator'],
                            timeConfig: {
                                realtime: true,
                                pt: ["PT72H"]
                            }
                        }
                    },
                    {
                        type: 'graph',
                        classes: 'span4',
//                            id: '',
                        data: {
                            modal: true,
                            graphOf: ['ICWThingy', 'TSATCalculator'],
                            timeConfig: {
                                realtime: true,
                                pt: ["PT72H"]
                            }
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
                                },
                                timeConfig: {
                                    realtime: false,
                                    pt: ["PT72H"]
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
				type: 'div',
				classes: 'row',
				elements: [
					{
						type: 'graph',
						classes: 'span4',
						data: {
							modal: true,
							graphOf: ['ICWThingy'],
							timeConfig: {
								realtime: true,
								pt: ["PT1W"]
							}
						}
					},
					{
						type: 'graph',
						classes: 'span4',
						data: {
							modal: true,
							graphOf: ['TSATCalculator'],
							timeConfig: {
								realtime: true,
								pt: ["PT1W"]
							}
						}
					},
					{
						type: 'graph',
						classes: 'span4',
						data: {
							modal: true,
							graphOf: ['ICWThingy', 'TSATCalculator'],
							timeConfig: {
								realtime: true,
								pt: ["PT1W"]
							}
						}
					}
				]
			},
			{
				type: 'div',
				classes: 'row',
				elements: [
					{
						type: 'percentileTable',
						classes: '',
						data: {
							percentiles: {
								of: ['ICWThingy', 'TSATCalculator'],
								values: [100, 90, 80, 0],
								limits: {
									'ICWThingy': [11, 10, 10, 10],
									'TSATCalculator': [10, 10, 10, 10]
								},
								timeConfig: {
									realtime: false,
									pt: ["PT1W"]
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
	}
    this.getLast2WeeksJSON = function() {
		return [
			{
				type: 'div',
				classes: 'row',
				elements: [
					{
						type: 'graph',
						classes: 'span4',
						data: {
							modal: true,
							graphOf: ['ICWThingy'],
							timeConfig: {
								realtime: true,
								pt: ["PT2W"]
							}
						}
					},
					{
						type: 'graph',
						classes: 'span4',
						data: {
							modal: true,
							graphOf: ['TSATCalculator'],
							timeConfig: {
								realtime: true,
								pt: ["PT2W"]
							}
						}
					},
					{
						type: 'graph',
						classes: 'span4',
						data: {
							modal: true,
							graphOf: ['ICWThingy', 'TSATCalculator'],
							timeConfig: {
								realtime: true,
								pt: ["PT2W"]
							}
						}
					}
				]
			},
			{
				type: 'div',
				classes: 'row',
				elements: [
					{
						type: 'percentileTable',
						classes: '',
						data: {
							percentiles: {
								of: ['ICWThingy', 'TSATCalculator'],
								values: [100, 90, 80, 0],
								limits: {
									'ICWThingy': [11, 10, 10, 10],
									'TSATCalculator': [10, 10, 10, 10]
								},
								timeConfig: {
									realtime: false,
									pt: ["PT2W"]
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
	}
    this.getRealtimeJSON = function () {
    	return [
    		{
    			type: 'grapharray',
    			data: {
    				graphOf: ['all'],
    				span: 4,
    				timeConfig: {
    					realtime: true,

    					pt : ['PT1H']
    				}
    			}
    		}
    	]
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
    this.getAllProcedures = function()
    {
    	return ['ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy',
    	 		'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator',
    	 		'ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy',
    	 		'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator',
    	 		'ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy',
    	 		 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator',
    	 		 'ICWThingy', 'TSATCalculator'];
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
        case 'page/last72h':
            json = this.getLast72hJSON();
            break;
        case 'page/last1w':
            json = this.getLastWeekJSON();
            break;
        case 'page/last2w':
            json = this.getLast2WeeksJSON();
            break;
        case 'page/realtime':
        	json = this.getRealtimeJSON();
        	break;
        case 'data/ICWThingy':
            json = this.getICWThingyData();
            break;
        case 'data/TSATCalculator':
            json = this.getTSATCalculatorData();
            break;
        case 'procedure/all':
        	json = this.getAllProcedures();
        	console.log('procedure/all');
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
