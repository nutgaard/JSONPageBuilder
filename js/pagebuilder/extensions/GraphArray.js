PageView.extensions.grapharray = Backbone.View.extend({

	render: function(){
		// Get Procedures
		// Create a Graph for every procedure.
		this.container = this.$el;
        this.json = $.extend(true, {}, this.jsonDefaults, this.model.attributes);
		console.log(this)

		var graphs = ['ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator','ICWThingy', 'TSATCalculator'];
		var r = []
		for (var i=0; i< graphs.length/(12/this.json.data.span); i++){
			r.push({
                   			type: 'div',
                   			classes: 'row-fluid',
                   			elements: [
                   			]
                   		})

			for(var j=0; j < 12/this.json.data.span; j++)
			{
				r[r.length-1].elements.push({
					type: 'graph',
					classes: 'span'+this.json.data.span,
					data: {
						modal: true,
						graphOf: [graphs[i]],
						timeConfig: {
							realtime: true,
							pt: ["PT24h"]
						}
					}
				})

			}
//			r[r.length-1].elements[0].classes = 'offset1 ' + r[r.length-1].elements[0].classes;
		}
		r = JSON.stringify(r);
		new PageView({model: new PageComponentCollection(JSON.parse(r)), el:$('body')})

	},
	jsonDefaults:{
		type: 'grapharray',
		data:{
			graphOf: ['all'],
			span: 4
		}
	}
})