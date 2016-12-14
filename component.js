/**
 * Created by chen_wu on 2016/9/19.
 */
(function(scope) {
	var init_list = [];
	var components = {};

	var instances = {
		id: 1,
		get: function($dom, name) {
			return instances[$dom.data('sg_component_' + name + '_id')];
		},
		put: function($dom, name, component) {
			var id = 'sg_component_' + name + '_' + instances.id++;

			instances[id] = component;
			$dom.data('sg_component_' + name + '_id', id);

			return id;
		},
		remove: function($dom, name) {
			delete instances[$dom.data('sg_component_' + name + '_id')];
		}
	};

	function Component(name, options) {
		if(!scope.isReady) {
			init_list.push({
				name : name,
				options : options
			});
			return;
		}
		if(components[name]) {
			scope.utils.log('component is already existed : ' + name);
			return;
		}
		if(!options.setOption) {
			options.setOption = function(arr_param) {
				var self = this;
				$.extend(self.options, arr_param);
				self.refresh();
			};
		}
		options.needCache = false;
		scope.View.define(name, options);
		components[name] = 1;
		var creator = function($dom, options) {
			var instance;
			if($.isPlainObject($dom)) {
				options = $dom;
				instance = scope.View.require(name);
				options && (instance.options = $.extend({}, instance.options, options));
				instance._render();
				scope.utils.log(instance);
			} else {
				$dom.each(function() {
					var self = $(this);
					instance = instances.get(self, name);
					if(!instance) {
						instance = scope.View.require(name);
						options && (instance.options = $.extend({}, instance.options, options));
						instance.id = instances.put(self, name, instance);
						instance._render(self);
						scope.utils.log(instance);
					}
				});
			}
			return instance;
		};
		// output usage
		creator.toString = function() {
			var opts = options.options, key, value, list = [];
			list.push('sg.Component.' + name + '($dom, {');
			for (key in opts) if ($.hasOwnProperty.call(opts, key)) {
				value = opts[key];
				value = $.type(value) == 'string' ? '"' + value + '"'
					: $.type(value) == 'array' ? '[' + value.join(',') + ']'
					: $.type(value) == 'object' ? JSON.stringify(value)
					: $.type(value) == 'function' ? 'function() {}' : value;
				list.push('\t' + key + ': ' + value + ',');
			}
			value = list.length - 1;
			value > 0 ? list[value] = list[value].slice(0, -1) : 0;
			list.push('});');
			return list.join('\n');
		};
		scope.Component[name] = creator;
	}

	Component.toString = function() {
		var name, list = [];
		for (name in components) {
			list.push('sg.Component.' + name);
		}
		return list.join('\n');
	};

	Component.init = function() {
		for(var i = 0, length = init_list.length; i<length; i++) {
			this(init_list[i]['name'], init_list[i]['options']);
		}
	};

	Component.removeInstance = function($dom, name) {
		instances.remove($dom, name);
	};

	scope.Component = Component;

})(window.sg);
