


$.extend({
	
	// 事件集
	evt: function( evts ){
		var json = {};
		return $.each( evts, function(i, e){ json[ e ] = e }), json;
	}(
		(
			'blur focus focusin focusout load resize scroll unload click dblclick ' +
			'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
			'change select submit keydown keypress keyup error contextmenu'
		).split(' ')
	),

	// 对象集
	dom: {
		window:   $(window)
	  ,	document: $(window.document)
	  ,	body:     $(window.document.body)
	  , head:     $('head')
	},

	// 拖拽
	drag: function( options ){

		return function( options ){

			// 区域 - 施法者
			options.caster = options.caster || $.dom.document,

			// 区域 - 吸法者
			options.sucker = options.sucker || $.dom.document,

			// 对象集
			options.items = options.caster.find( options.items || '[data-drag-item]' ),

			// 启动事件
			options.event = function( event ){

				// 开始
				event.start = event.start || 'dragstart',
				// 结束
				event.end   = event.end   || 'dragend',
				// 之上
				event.enter = event.enter || 'dragenter',
				// 移动
				event.over  = event.over  || 'dragover',
				// 释放
				event.drop  = event.drop  || 'drop';

				return event;

			}( options.event || {} ),

			// 回调函数
			options.callback = function( event, callback ){

				return function( json ){

					$.each( event, function( hand ){

						json[ hand ] = callback[ hand ] || $.noop;

					});

					return json;

				}({});

			}( options.event, options.callback ),

			// 阻止默认行为
			options.clear = function( stop ){

				options.caster.on({

					dragleave: stop,

					drop: stop,

					dragenter: stop,

					dragover: stop

				});

				return arguments.callee;

			}( function(e){ e.preventDefault() } ),

			// Listen On
			options.on = function( item, callback ){

				/* !!
				 * Callback: {
				 * 		start: dragstart,
				 * 		end: dragend,
				 * 		enter: dragenter,
				 * 		over: dragover,
				 * 		drop: drop
				 * }
				 * ----- ----- ----- ----- -----
				 */

				$.each( options.event, function( hand, event ){

					!function( mode, hand ){

						mode ? item.addEventListener( event, hand ) : options.sucker.get(0).addEventListener( event, hand );

					}( ~$.inArray( hand, ['start', 'end'] ), callback[ hand ] || $.noop );

				});

			},

			// Listen Off
			options.off = function( item, callback ){

				$.each( options.event, function( hand, event ){

					!function( mode, hand ){

						mode ? item.removEeventListener( event, hand ) : options.sucker.get(0).removEeventListener( event, hand );

					}( ~$.inArray( hand, ['start', 'end'] ), callback[ hand ] || $.noop );

				});

			},

			// 初始化
			options.init = function(){

				// 每个对象添加监听事件
				$.each( options.items, function( index, item ){

					options.on( ( item.setAttribute('draggable', true), item ), options.callback );

				});

				return arguments.callee;

			}();

		}( options || {} );

	}
});