// EclipseScroll - by Elliot Geno April 28, 2016

/*     ABOUT EclipseScroll     */
// EclipseScroll allows you to retrieve metrics about the visibility of elements while scrolling. Currently only the vertical scroll is measured.


/*     HOW TO ADD EclipseScroll TO YOUR PROJECT     */
// Simply include EclipseScroll in your HTML document: <script src="EclipseScroll.js"></script>
// This automatically creates a global instance of the class "EclipseScroll", however, no events are added until elements are added to EclipseScroll


/*     EclipseScroll METHODS     */

// ADD ELEMENTS:
// EclipseScroll.add(elements, callback);
// - adds an element or array of elements to EclipseScroll and associates a callback with the scroll event

// REMOVE ELEMENTS:
// EclipseScroll.remove(elements);
// - removes an element or array of elements from EclipseScroll. If no elements are remaining, EclipseScroll removes the event listeners


/*     EclipseScroll PROPERTIES     */
// ELEMENTS
// EclipseScroll.elements is a list of elements currently added to EclipseScroll

// PAGE PROGRESS
// EclipseScroll.pageProgress is a percentage of the total scroll of the page

// IS FORWARD
// EclipseScroll.isForward is a boolean that lets you know if you are scrolling forward (true) or backward (false)


/*     EclipseScroll CALLBACK DATA     */
// The following properties are supplied as an object to your callback via one argument
// {element: HTML_ELEMENT, callback: FUNCTION, visible: BOOLEAN, visibility: NUMBER, outerProgress: NUMBER, innerProgress: NUMBER, overlap: NUMBER}

// element: HTML_ELEMENT -  the current element the data reflects

// callback - FUNCTION: the current callback associated with the element

// visible - BOOLEAN: whether or not the element is within the viewport

// visibility - NUMBER: percentage (0-1) based on how much of the element is visible within the viewport even if the viewport is smaller than the element

// outerProgress - NUMBER: percentage (not constrained to 0-1) 0% - top of element meets bottom of viewport ==> 100% - bottom of element meets top of viewport

// innerProgress - NUMBER: percentage (not constrained to 0-1) 0% - bottom of element meets bottom of viewport ==> 100% - top of element meets top of viewport

// overlap - NUMBER: number in pixels the viewport and element intersect.




var __eScroll = function (type) {
    this.elements = [];
    var scroll = 0;
    var previousScroll = -1;
    this.isForward = true;
    this.pageProgress = 0;

    // event handler for window scrolling or resizing
    function onScroll(e) {
        scroll = window.pageYOffset;
        EclipseScroll.pageProgress = scroll / (document.documentElement.offsetHeight - window.innerHeight);
        EclipseScroll.isForward = scroll - previousScroll > 0;
        previousScroll = scroll;
        for (var i = 0; i < EclipseScroll.elements.length; i++) {
            updateData(EclipseScroll.elements[i]);
        }
    }

    // updates the metrics associated with each element
    function updateData(element) {
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
        data.visble = data.overlap > 0;
        data.visibility = data.overlap / Math.min(windowHeight, height);
        if (data.callback) {
            data.callback(data);
        }
    }

    // add element or list of elements and associating callbacks
    function addElement(element, callback) {
        EclipseScroll.elements.push(element);
        element.__scrollData = {
            element: element,
            callback: callback,
            visible: true,
            visibility: 0,
            outerProgress: 0,
            innerProgress: 0,
            overlap: 0
        }
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);
    }

    // exposed method for adding elements and associating callbacks
    __eScroll.prototype.add = function (elements, callback) {
        if (elements.length) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                addElement(element, callback);
            }
        } else {
            addElement(elements, callback);
        }
    };

    // remove element or list of elements
    function removeElement(element) {
        var index = EclipseScroll.elements.indexOf(element);
        if (index > -1) {
            EclipseScroll.elements.splice(index, 1);
        }
        if (EclipseScroll.elements.length == 0) {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        }
    }

    // exposed method for removing elements
    __eScroll.prototype.remove = function (elements) {
        if (elements.length) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                removeElement(element);
            }
        } else {
            removeElement(elements);
        }
    };
}

var EclipseScroll = new __eScroll();