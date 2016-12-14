/**
 * Created by chen_wu on 2016/11/10.
 */
sg.Component('ActionSheet', {
	template : '<div class="sg_actionsheet">' +
				'<div class="sg_actionsheet_content_wrapper">' +
				'<div class="sg_actionsheet_content">' +
				'<div class="sg_actionsheet_group">' +
				'{{if title}}' +
				'<div class="sg_actionsheet_title">{{title}}</div>' +
					'{{/if}}' +
				'{{each actionList as action}}' +
					'<div class="sg_actionsheet_btn">{{action.text}}</div>' +
				'{{/each}}' +
				'</div>' +
				'<div class="sg_actionsheet_group sg_actionsheet_group_cancel">' +
				'<div class="sg_actionsheet_btn sg_actionsheet_btn_cancel">{{cancelText}}</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>',
	render : function(data) {
		var self = this,
			template = self.template,
			options = self.options,
			$dom,
			transitionend = sg.config.isWebkit ? 'webkitTransitionEnd' : 'transitionend';
		if($.isPlainObject(template)) {
			template = template.html;
		}
		$dom = $(sg.template.compile(template)({
			actionList : options.actionList,
			title : options.title,
			cancelText : options.cancelText || '取消'
		}));
		$dom.bind(transitionend, function() {
			var $cur_dom = $(this);
			if($cur_dom.hasClass('active')) {
				return;
			}
			$dom.remove();
		});
		$dom.bind('click', function(e) {
			var $target = $(e.target).closest('.sg_actionsheet_content_wrapper');
			if($target.length) {
				return;
			}
			self.close();
		});
		$dom.find('.sg_actionsheet_btn').bind('click', function() {
			var $cur_btn = $(this),
				index = $cur_btn.index('.sg_actionsheet_btn');
			if($cur_btn.hasClass('sg_actionsheet_btn_cancel')) {
				options.onCancel && options.onCancel();
			} else {
				options.actionList[index].callback && options.actionList[index].callback();
			}
			self.close();
		});
		sg.Action.init($dom);
		$(document.body).append($dom);
		self.$dom = $dom;
		setTimeout(function() {
			$dom.addClass('active');
		}, 50);
	},
	close : function() {
		var self = this,
			$dom = self.$dom;
		$dom.removeClass('active');
	},
	options : {
		actionList : [],
		title : '',
		cancelText : '',
		onCancel : function() {}
	}
});