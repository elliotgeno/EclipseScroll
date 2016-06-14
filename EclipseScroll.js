(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define(["EclipseScroll"], function (EclipseScroll) {
			return root.EclipseScroll = factory(EclipseScroll);
		});
	} else if (typeof module === "object" && module.exports) {
		module.exports = root.EclipseScroll = factory(require("EclipseScroll"));
	} else {
		root.EclipseScroll = factory(root.EclipseScroll);
	}
})(this, function () {
	var __eScroll = function (type) {
		this.elements = [];
		var scroll = 0;
		var previousScroll = -1;
		this.isForward = true;
		this.pageProgress = 0;

		// event handler for window scrolling or resizing
		function onScroll(e) {
			scroll = window.pageYOffset;
			this.pageProgress = scroll / (document.documentElement.offsetHeight - window.innerHeight);
			this.isForward = scroll - previousScroll > 0;
			previousScroll = scroll;
			for (var i = 0; i < this.elements.length; i++) {
				updateData(this.elements[i]);
			}
		}

		// updates the metrics associated with each element
		function updateData(element) {
			if(element){
				var data = element.__scrollData;
				var windowHeight = window.innerHeight;
				var top = element.getBoundingClientRect().top;
				var height = element.offsetHeight;
				var range = windowHeight + height;
				data.outerProgress = (windowHeight - top) / range;
				data.innerProgress = 1 - (top / (windowHeight - height));
				var min = Math.max(0, top);
				var max = Math.min(windowHeight, top + height);
				data.overlap = Math.max(0, max - min);
				data.visible = data.overlap > 0;
				data.visibility = data.overlap / Math.min(windowHeight, height);
				if (data.callback) {
					data.callback(data);
				}
			}
		}

		// add element or list of elements and associating callbacks
		function addElement(element, callback) {
			this.elements.push(element);
			element.__scrollData = {
				element: element,
				callback: callback,
				visible: true,
				visibility: 0,
				outerProgress: 0,
				innerProgress: 0,
				overlap: 0
			}
			updateData(element);
			window.addEventListener("scroll", onScroll.bind(this));
			window.addEventListener("resize", onScroll.bind(this));
		}

		// exposed method for adding elements and associating callbacks
		__eScroll.prototype.add = function (elements, callback) {
			if (elements) {
				if (elements.length) {
					for (var i = 0; i < elements.length; i++) {
						var element = elements[i];
						addElement.call(this, element, callback);
					}
				} else {
					addElement.call(this, elements, callback);
				}
			}
		};

		// remove element or list of elements
		function removeElement(element) {
			var index = this.elements.indexOf(element);
			if (index > -1) {
				this.elements.splice(index, 1);
			}
			if (this.elements.length == 0) {
				window.removeEventListener("scroll", onScroll.bind(this));
				window.removeEventListener("resize", onScroll.bind(this));
			}
		}

		// exposed method for removing elements
		__eScroll.prototype.remove = function (elements) {
			if (elements) {
				if (elements.length) {
					for (var i = 0; i < elements.length; i++) {
						var element = elements[i];
						removeElement.call(this,element);
					}
				} else {
					removeElement.call(this,elements);
				}
			}
		};
		// exposed method for removing all elements
		__eScroll.prototype.removeAll = function () {
			this.elements = [];
			window.removeEventListener("scroll", onScroll.bind(this));
			window.removeEventListener("resize", onScroll.bind(this));
		};
		__eScroll.prototype.getData = function (element) {
			console.log(element.__scrollData.visible);
			return element.__scrollData;
		};
	}
	if (window.EclipseScroll) {
		console.warn("Only include one script instance of EclipseScroll!");
		return window.EclipseScroll;
	} else {
		return new __eScroll();
	}

});