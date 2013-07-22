PageView.extensions.grapharray = Backbone.View.extend({

	render: function(){
		this.container = this.$el;
        this.json = $.extend(true, {}, this.jsonDefaults, this.model.attributes);

		if(this.json.data.graphOf.length === 1 && this.json.data.graphOf[0] === 'all')
		{
			var that = this;
                        $.get('procedure/', function(r){
                            		that.graphs = r;
					that.createGraphs(that.graphs);
                        });
		}
		else{
			this.graphs = this.json.data.graphOf;
			this.createGraphs(this.graphs);
		}
	},

	createGraphs: function(graphs){
		var r = []
		var offset = Math.floor(12/this.json.data.span);
		var newRowAt = 0;
		for (var i=0; i < graphs.length; i++){
			if(i === newRowAt){
				r.push({
					type: 'div',
					classes: 'row-fluid',
					elements: [
					]
				});
				newRowAt += offset;
			}
			r[r.length-1].elements.push({
				type: 'graph',
				classes: 'span'+this.json.data.span,
				data: {
					modal: true,
					graphOf: [graphs[i]],
					timeConfig: this.json.data.timeConfig
				}
			})
		}
		r = JSON.stringify(r);JSON.parse
		new PageView({model: new PageComponentCollection(r), el:$('.applicationcontainer')})
	},
	jsonDefaults:{
		type: 'grapharray',
		data:{
			graphOf: ['all'],
//Sets the size of each graph and how many graphs there is in each row. e.g: span: 4 = 12/4= 3 graphs in each row.
			span: 4,
			timeConfig:{
				realtime: true,
				pollInterval: 1000,
				pt: ['PT1h']
			}
		}
	}
})