/**
 * Created by wuchen on 16/7/23.
 */

(function(scope) {

	var init_list = [];
	var views = {};
	var templates = {};

	function init() {
		initTemplate($('[type=\"text/template\"]'));
		for(var i = 0, length = init_list.length; i<length; i++) {
			define(init_list[i]['name'], init_list[i]['options']);
		}
	}

	function initTemplate($dom) {
		$dom.each(function() {
			var self = $(this), id = self.attr('id'), css = self.attr('css'), js = self.attr('js'), title = self.attr('title'), template;
			if(!id || views[id]) {
				return;
			}
			template = {
				html : self.html(),
				css : self.attr('class')
			};
			var resource = {};
			css && (resource['css'] = css.split(','));
			js && (resource['js'] = js.split(','));
			title && (resource['title'] = title);
			scope.config.resource[id] = $.extend({}, scope.config.resource[id], resource);
			templates[id] = template;
		});
		$dom.remove();
	}

	function initViewModel(vm_name, config) {
		var vm_constructor = scope.utils.createFunc(vm_name);
		scope.utils.inherits(vm_constructor, ViewModel);
		$.extend(vm_constructor.prototype, config);
		views[vm_name] = vm_constructor;
		return vm_constructor;
	}

	function loadTemplate(template, callback) {
		$.ajax({
			url : scope.config.templateApi ? scope.config.templateApi + '?view_id=' + template : scope.config.baseUrl + template,
			type : 'GET',
			dataType : 'html',
			timeout : scope.config.timeOut,
			success : function(data) {
				if(data.indexOf('<script') != -1) {
					initTemplate($(data));
				}
				callback && callback();
			},
			error : function() {
				scope.utils.log('load page error : ' + template);
			}
		});
	}

	function getInstance(vm_name) {
		var vm = views[vm_name];
		var instance= new vm();
		instance.vm_name = vm_name;
		if(vm.prototype.properties) {
			$.extend(instance, vm.prototype.properties);
		}
		return instance;
	}

	function requireViewModel(vm_name, callback) {

		if(!vm_name) {
			vm_name = scope.config.error['404'];
			if(!vm_name) {
				scope.utils.log('error 404 not define');
				return;
			}
		}

		var vm;

		if(views[vm_name]) {
			vm = getInstance(vm_name);
			callback && callback(vm);
			return vm;
		}

		var resource = scope.config.resource[vm_name] || {},
			i,
			length,
			arr_js = resource.js || [],
			arr_css = resource.css || [],
			temlpate = resource.template,
			arr_resource = [];

		if(arr_js && arr_js.length) {
			for(i= 0, length = arr_js.length; i<length; i++) {
				arr_resource.push(scope.config.baseUrl + arr_js[i]);
			}
		}

		if(arr_css && arr_css.length) {
			for(i= 0, length = arr_css.length; i<length; i++) {
				arr_resource.push('require_css!' + scope.config.baseUrl + arr_css[i]);
			}
		}

		if(!arr_resource.length) {
			var vm_constructor = define(vm_name);
			vm = getInstance(vm_name);
			callback && callback(vm);
			return vm;
		}

		if(templates[vm_name]) {
			require(arr_resource, function() {
				define(vm_name);
				if(callback && views[vm_name]) {
					vm = getInstance(vm_name);
					callback(vm);
				}
			});
		} else {
			loadTemplate(temlpate, function() {
				require(arr_resource, function() {
					define(vm_name);
					if(callback && views[vm_name]) {
						vm = getInstance(vm_name);
						callback(vm);
					}
				});
			});
		}
	}

	function ViewModel() {}

	ViewModel.prototype = {
		needCache : true,
		_render : function($dom, params, callback, direction) {
			var self = this;
			if(self.beforeRender) {
				self.beforeRender(function(data, direction2) {
					self.render(data, $dom, callback, direction || direction2);
				}, params);
			} else {
				self.render(params, $dom, callback, direction);
			}
		},
		render : function(data, $dom, callback, direction) {
			var self = this,
				template = self.template,
				css;
			if($.isPlainObject(template)) {
				css = template.css;
				template = template.html;
			}
			data = data || {};
			var template_str = scope.template.compile(template)(data);
			if(!$dom || !$dom.length) {
				return template_str;
			}
			$dom.addClass(css);
			switch(direction) {
				case -1:
					$dom.prepend(template_str);
					break;
				case 1:
					$dom.append(template_str);
					break;
				default:
					$dom.html(template_str);
					break;
			}
			scope.Action.init($dom);
			self.$dom = $dom;
			self.afterRender && self.afterRender($dom, data);
			callback && callback();
			return $dom;
		},
		restart : function() {
			scope.utils.log(this.constructor.name + ' restart')
		},
		_destroy : function() {
			var self = this,
				$dom = self.$dom;
			if(scope.config.needCache && self.needCache) {
				self.destroy && self.destroy();
				return;
			}
			sg.utils.log(this.constructor.name + '_destroy');
			if($dom) {
				scope.Action.destroy($dom);
				$dom.html('');
			}
			self.destroy && self.destroy();
		},
		destroy : function() {
			scope.utils.log(this.constructor.name + ' destroy')
		},
		refresh : function(data) {
			var self = this,
				$dom = self.$dom;
			self._destroy();
			if(data) {
				self.render(data, $dom);
			} else {
				self._render($dom);
			}
		},
		apply : null
	};

	function define(vm_name, config) {
		if(!scope.isReady) {
			init_list.push({
				name : vm_name,
				options : config
			});
			return;
		}
		if(views[vm_name]) {
			return views[vm_name];
		}
		config = config || {};
		var vm_constructor,
			resource = scope.config.resource[vm_name] || {},
			template = config.template || templates[vm_name];
		if(!template) {
			scope.utils.log('template not found : ' + vm_name);
			return;
		}
		config.template = template;
		vm_constructor = initViewModel(vm_name, config);
		return vm_constructor;
	}

	scope.View = {
		require : requireViewModel,
		init : init,
		define : define
	};

})(window.sg);
