/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-08-13 by mytharcher
 * 
 * update:
 * @2011-08-13 by mytharcher
 * 		[m] move all method to sub folder.
 */

///import js.dom.Traversal;
///import js.dom.Stage.get;

/**
 * @class js.dom.Traversal
 */

/**
 * 从一个节点开始向下深度优先遍历(非递归算法，低效)
 * @method js.dom.Traversal.dfs
 * @static
 * 
 * @param {Element/String} element 开始遍历的元素
 * @param {Function} fn 遍历在每一个节点上要执行的操作，如果该函数的执行结果为false，则会中断所有遍历，返回已遍历的节点数。
 * @param {Object} thisp (optional)执行fn操作的scope对象
 * @param {Boolean} includeText (optional)是否包含文本节点，默认：false。
 * 
 * @return {Number} 返回已遍历的节点数量
 */
js.dom.Traversal.dfs = function (element, fn, thisp, includeText) {
	var element = js.dom.Stage.get(element),
		node = element,
		n,
		count = 0;
	while (1) {
		if (node) {
			if (includeText || node.nodeType == 1) {
				if (fn.call(thisp, node, count++) === false) {
					break;
				} else {
					n = node;
					node = node.firstChild;
				}
			} else {
				node = node.nextSibling;
			}
		} else {
			if (n == element) {
				break;
			} else {
				node = n.nextSibling;
				n = n.parentNode;
			}
		}
	}
	return count;
};