sg.Component('Switch', {
	properties : {
		value : 0
	},
	template : '<div class="sg_switch"> <div  class="sg_switch_handel"></div></div>',
	afterRender : function($dom) {
		var self = this,
			options = self.options,
			$switch = $dom.find('.sg_switch');
		$switch.css({
			width: parseInt(options.width),
			height: parseInt(options.height),
			'background-color': options.normal_color,
			'border-radius': '70px',
			border: '1px solid #E4E4E4',
			display : options.display
		});
		$dom.find('.sg_switch_handel').css({
			'height': options.height,
			'width': options.height,
			'background-color': 'white',
			'border-radius' : options.height / 2,
			'box-shadow': '0 2px 4px rgba(0, 0, 0, .3)',
			'-webkit-transition':' -webkit-transform .2s'
		});

		$switch.bind('click', function(){
			if(self.value == 1) {
				self.close();
			} else {
				self.open();
			}
			$dom.trigger('change', {
				'switch' : self
			});
		});
		if(options.value) {
			self.value = 1;
			self.open();
		}
	},
	open : function() {
		var self = this,
			options = self.options,
			$dom = self.$dom,
			$switch = $dom.find('.sg_switch');
		self.value = 1;
		$switch.css({'background-color': options.select_color});
		$switch.find('.sg_switch_handel').css({
			'-webkit-transform' :'translateX(' + (options.width -  options.height) + 'px)',
			'transform' :'translateX(' + (options.width -  options.height) + 'px)' });
	},
	close : function() {
		var self = this,
			options = self.options,
			$dom = self.$dom,
			$switch = $dom.find('.sg_switch');
		self.value = 0;
		$switch.css({'background-color': options.normal_color});
		$switch.find('.sg_switch_handel').css({
			'-webkit-transform' :'translateX(0)',
			'transform' :'translateX(0)'});
	},
	getValue : function() {
		return this.value;
	},
	options : {
		width : 50,
		height : 30,
		normal_color : 'white',
		select_color : '#18B8F5',
		display : 'inline-block',
		value : 0
	}
});
