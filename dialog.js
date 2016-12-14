/**
 * Created by wuchen on 16/9/25.
 */
sg.Component('Dialog', {
	template : '<div class="sg_dialog"> ' +
					'<div class="sg_dialog_mask"></div> ' +
					'<div class="sg_dialog_content_wrapper"> ' +
						'<div class="sg_dialog_content" sg-view="{{template}}">{{#content}}</div>' +
						'{{if closeBtn}}' +
						'<div class="icon_close sg_dialog_btn_close"></div>' +
						'{{/if}}' +
					'</div> ' +
				'</div>',
    render : function(data, $dom) {
        var self = this,
            template = self.template,
            css,
            $dialog,
            options = self.options;
        if($.isPlainObject(template)) {
            css = template.css;
            template = template.html;
        }
        $dialog = $(sg.template.compile(template)({
	        template : options.template || '',
	        content : options.content || '',
	        closeBtn : options.closeBtn
        })).addClass(css);
        sg.Action.init($dialog);
        $(document.body).append($dialog);
        var $dialog_content_wrapper = $dialog.find('.sg_dialog_content_wrapper'),
	        $dialog_content = $dialog.find('.sg_dialog_content'),
            $dialog_mask = $dialog.find('.sg_dialog_mask'),
	        $dialog_btn_close = $dialog.find('.sg_dialog_btn_close');
	    $dialog_btn_close.bind('click', function() {
		    self.hide();
	    });
	    if(options.vm) {
		    options.vm.dialog = self;
		    options.vm._render($dialog_content, options.vm_data);
	    }
	    if(!options.persist) {
		    $dialog_mask.bind('click', function() {
			    self.hide();
		    });
	    }
	    if(options.dialogClass) {
		    $dialog.addClass(options.dialogClass);
	    }
	    if(options.contentClass) {
		    $dialog_content_wrapper.addClass(options.contentClass);
	    }
	    if(options.needOutAnimation) {
		    $dialog_content_wrapper.bind('webkitAnimationEnd', function() {
			    var content_self = $(this);
			    if(content_self.hasClass('out')) {
				    content_self.removeClass('out');
				    $dialog.hide();
			    }
		    });
	    }
	    if($.isPlainObject(options.mobileDefaultTemplate)){
		    options.closeBtn = false;
		    var template = '<div class="sg_dialog_content_inner {{title.css}}">{{=title.text}}</div>' +
			    '<div class="btn_wrapper ib">' +
			    '<div class="dialog_btn {{btn_left.css}} first">{{btn_left.text}}</div>' +
			    '<div class="dialog_btn {{btn_right.css}}">{{btn_right.text}}</div>' +
			    '</div>';
		    $dialog_content.append(sg.template.compile(template)(options.mobileDefaultTemplate));
		    var $close_btn = $dialog_content.find('.close_btn');
		    if($close_btn){
			    $close_btn.bind('click', function() {
				    self.$dom.hide();
			    });
		    }
		    if(options.mobileDefaultTemplate.btn_left && options.mobileDefaultTemplate.btn_left.callback){
			    $($dialog_content.find('.dialog_btn').get(0)).bind('click', function(){
				    options.mobileDefaultTemplate.btn_left.callback(self);
			    });
		    }
		    if(options.mobileDefaultTemplate.btn_right && options.mobileDefaultTemplate.btn_right.callback){
			    $($dialog_content.find('.dialog_btn').get(1)).bind('click', function(){
				    options.mobileDefaultTemplate.btn_right.callback(self);
			    });
		    }
	    }
        self.$dom = $dialog;
	    $dialog.hide();
    },
	resize : function() {
		var self = this,
			$dialog = self.$dom,
			$dialog_content_wrapper = $dialog.find('.sg_dialog_content_wrapper'),
			$dialog_content = $dialog.find('.sg_dialog_content'),
			$dialog_mask = $dialog.find('.sg_dialog_mask'),
			$dialog_btn_close = $dialog.find('.sg_dialog_btn_close'),
			container_height = $(window).height(),
			dialog_height = $dialog_content_wrapper.height(),
			dialog_width = $dialog_content_wrapper.width(),
			diff = container_height - dialog_height,
			top = self.options.verticalMiddle ? (container_height - dialog_height) * 0.5: (diff / dialog_height < 0.618) ? diff / 2 : container_height * 0.382 - dialog_height / 2,
			margin_left = '-' + dialog_width / 2 + 'px';
		$dialog_content_wrapper.css({
			top : top,
			'margin-left' : margin_left
		});
	},
	destroy : function() {
		var self = this;
		self.$dom.remove();
		self.$dom = null;
	},
    show : function(reset) {
        var self = this,
	        options = self.options;
	    if(reset) {
		    self.refresh();
	    }
	    self.$dom.show();
	    if(options.lockScroll) {
		    var $body = $('body'), scroll_bar_width = sg.utils.getScrollBarWidth($body), margin_right;

		    margin_right = $body.get(0).style.marginRight;
		    $body
			    .css('margin-right', scroll_bar_width + (parseFloat($body.css('margin-right')) || 0))
			    .css('overflow-y', 'hidden');
	    }
	    self.resize();
    },
    hide : function() {
        var self = this,
	        options = self.options,
	        $dialog = self.$dom,
	        $dialog_content_wrapper = $dialog.find('.sg_dialog_content_wrapper');
	    if(options.lockScroll) {
		    $('body').css({
			    'margin-right' : 0,
			    'overflow-y' : 'auto'
		    });
	    }
	    if(options.needOutAnimation && $dialog_content_wrapper.hasClass('sg_animate') && $dialog_content_wrapper.hasClass('in') && sg.config.isWebkit) {
		    $dialog_content_wrapper.addClass('out');
	    } else {
		    self.$dom.hide();
	    }
	    options.afterHide.call(self);
    },
    options: {
	    template: '',
	    content: '',
	    vm: '',
	    vm_data: {},
	    dialogClass: '',
	    contentClass: '',
	    persist: false,
	    closeBtn: true,
	    needOutAnimation: false,
	    verticalMiddle: false,
	    mobileDefaultTemplate: '',
	    afterHide: function() {},
	    lockScroll : false
    }
});