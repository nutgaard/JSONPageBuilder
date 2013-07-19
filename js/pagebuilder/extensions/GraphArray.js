PageView.extensions.grapharray = Backbone.View.extend({

	render: function(){
		this.container = this.$el;
        this.json = $.extend(true, {}, this.jsonDefaults, this.model.attributes);

		if(this.json.data.graphOf.length === 1 && this.json.data.graphOf[0] === 'all')
		{
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

		for (var i=0; i< graphs.length/(12/this.json.data.span); i++){
			r.push({
            	type: 'div',
                classes: 'row-fluid',
                elements: [
                ]
            });

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
		r = JSON.stringify(r);
		new PageView({model: new PageComponentCollection(JSON.parse(r)), el:$('.applicationcontainer')})
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