/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-15 by mytharcher
 * 
 * update:
 * 
 */

///import js.util.Global.guid;
///import js.dom;
///import js.dom.Event;



/**
 * @class js.dom.MouseTracker
 * 鼠标轨迹跟踪类
 * @singleton
 */
js.dom.MouseTracker = {
	/**
	 * @property js.dom.MouseTracker.x 当前鼠标x坐标
	 * @type {Number}
	 */
	x: 0,
	
	/**
	 * @property js.dom.MouseTracker.y 当前鼠标y坐标
	 * @type {Number}
	 */
	y: 0,
	
	/**
	 * @ignore
	 */
	dragging: {},
	
	/**
	 * @private
	 */
	noDragging: function () {
		var has = true,
			i;
		for (i in js.dom.MouseTracker.dragging) {
			has = false;
			break;
		}
		return has;
	},
	
	/**
	 * @private
	 * @param {Event} ev
	 */
	move: function  (ev) {
		var MT = js.dom.MouseTracker;
		MT.x = ev.clientX;
		MT.y = ev.clientY;
		
		var dragging = MT.dragging;
		for (var i in dragging) {
			var option = dragging[i];
			option.ondrag && option.ondrag(ev);
		}
	},
	
	/**
	 * 启动追踪
	 * @method js.dom.MouseTracker.start
	 * 
	 * @param {Function} ondrag 检测到拖动时要做的处理
	 * 
	 * @return {String} 返回当前追踪的id，用于停止追踪
	 */
	start: function(ondrag){
		var MT = js.dom.MouseTracker,
			id = js.util.Global.guid();
		if (MT.noDragging()) {
			js.dom.Event.add(document, 'mousemove', MT.move);
		}
		
		MT.dragging[id] = {
			ondrag: ondrag,
			startX: MT.x,
			startY: MT.y
		};
		
		return id;
	},
	
	/**
	 * 停止追踪
	 * @method js.dom.MouseTracker.stop
	 * 
	 * @param {String} id 要停止追踪的id
	 */
	stop: function (id) {
		var MT = js.dom.MouseTracker;
		if (id) {
			var option = MT.dragging[id];
			if (option) {
				delete MT.dragging[id];
			}
			
			if (MT.noDragging()) {
				js.dom.Event.remove(document, 'mousemove', MT.move);
			}
		}
	}
};
