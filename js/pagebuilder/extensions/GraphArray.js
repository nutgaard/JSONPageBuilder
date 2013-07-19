PageView.extensions.grapharray = Backbone.View.extend({

	render: function(){
		// Get Procedures
		// Create a Graph for every procedure.
		this.container = this.$el;
        this.json = $.extend(true, {}, this.jsonDefaults, this.model.attributes);

		if(this.json.data.graphOf.length === 1 && this.json.data.graphOf[0] === 'all')
		{
			// get Procedures
			var that = this;
			$.get({
				url: 'procedure/all',
				success: function(r){
					that.graphs = JSON.parse(r);
					that.createGraphs(that.graphs);
				}
			});
		}
		else{
			this.graphs = this.json.data.graphOf;
			this.createGraphs(this.graphs);
		}
	},

	createGraphs: function(graphs){
		var r = []
		console.log(graphs.length)
		for (var i=0; i< graphs.length/(12/this.json.data.span); i++){
			r.push({
                   			type: 'div',
                   			classes: 'row-fluid',
                   			elements: [
                   			]
                   		})

			for(var j=0; j < (12/this.json.data.span); j++)
			{
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
		}
		console.log("after for")
		r = JSON.stringify(r);
		console.log(JSON.parse(r).length);
		new PageView({model: new PageComponentCollection(JSON.parse(r)), el:$('.applicationcontainer')})
		console.log('after pageview');
	},
	jsonDefaults:{
		type: 'grapharray',
		data:{
			graphOf: ['all'],
			span: 3, //Sets the size of each graph and how many graphs there is in each row. e.g: span: 3 = 12/3= 4 graphs in each row.
			timeConfig:{
				realtime: true,
				pollInterval: 1000,
				pt: ['PT1h']
			}
		}
	}
})