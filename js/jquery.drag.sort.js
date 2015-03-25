$.extend({

	// 拖拽.排序
	dragSort: function( options ){

		return function( options, action, item, tag ){

			// 区域 - 施法者
			options.caster = options.caster || $.dom.document,

			// 区域 - 吸法者
			options.sucker = options.sucker || $.dom.document,

			// 距离
			options.distance = options.distance || 30,

			// 回调 - 开始
			options.onStart = options.onStart || $.noop,

			// 回调 - 结束
			options.onEnd = options.onEnd || $.noop;

			// 回调函数
			options.callback = {

				start: function( e ){

					item = function( item ){

						return tag = item.tagName, $( item ); // .css( item, options.sucker );

					}( e.target );

					options.onStart( item, e );

					// options.caster.css('position', 'relative');

					// options.sucker.append( item );

				},

				end: function( e ){

					if( !item || !tag ){ return }

					options.onEnd( item, e );

				},

				over: function( e ){

					if( !item || !tag ){ return }

					action.move( item, e, options.sucker );

				},

				drop: function( e ){

					if( !item || !tag ){ return }

					// action.sort();

				}

			};

			$.drag( options );

		}(

			// 参数
			options || {},

			// 方法
			{
				// 样式
				css: function( item, container ){

					return function( item ){

						return item.css({

							position: 'absolute',

							left: item.offset().left - container.offset().left,

							top: item.offset().top - container.offset().top,

							margin: 0,

							padding: 0,

							zIndex: item.css('zIndex') || 0 // 2147483584

						});

					}( $(item) );

				},

				// 移动
				move: function( item, e, container ){

					var

						offset = {

							left: container.offset().left,

							top: container.offset().top

						},

						index = Math.floor( ( e.clientY - offset.top + options.distance / 2 ) / options.distance ),

						target = container.find( item.get(0).tagName + ':eq(' + index + ')' );

					index ? item.insertAfter( target ) : item.insertBefore( target );

				},

				// 排序
				sort: function( item, tag, e ){

					if( tag == item.get(0).tagName ){

						// item.insertAfter( e.target );

					}

					if( e.target.tagName == options.sucker.get(0).tagName ){

						// item.prependTo( options.sucker );

					}

				}
			}

		);

	}

});