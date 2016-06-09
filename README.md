# EclipseScroll
EclipseScroll allows you to retrieve metrics about the visibility of elements while scrolling. Currently only the vertical scroll is measured.

---


### Adding EclipseScroll To Your Project
By adding the following script to your project, EclipseScroll automatically creates a global instance of the class `EclipseScroll`. No events will be added until elements are added to EclipseScroll using `EclipseScroll.add()`.


```
<script src="EclipseScroll.min.js"></script>
```
---


### Methods

`EclipseScroll.add(elements)`
 — adds an element or array of elements to EclipseScroll and associates a callback with the scroll event

`EclipseScroll.remove(elements)` — removes an element or array of elements from EclipseScroll. If no elements are remaining, EclipseScroll removes the event listeners

---

### Properties
`EclipseScroll.elements` — is a list of elements currently added to EclipseScroll


`EclipseScroll.pageProgress` — is a percentage of the total scroll of the page

`EclipseScroll.isForward` — is a boolean that lets you know if you are scrolling forward (true) or backward (false)

---
### Callback Data
The following properties are supplied as an object to your callback via one argument




`element:` *HTML_ELEMENT* — The current element the data reflects.

`callback:` *FUNCTION* — The current callback associated with the element.

`visible:` *BOOLEAN* — Whether or not the element is within the viewport.

`visibility:` *NUMBER* — *(constrained 0-1)* — Percentage based on how much of
the element is visible within the viewport even if the viewport is smaller
than the element.

`outerProgress:` *NUMBER* — *(not constrained to 0-1)* — Percentage based on 0% being top of element meets bottom of viewport → 100% being bottom of element meets top of viewport.

`innerProgress:` *NUMBER* — *(not constrained to 0-1)* — Percentage based on 0% being bottom of element meets bottom of viewport → 100% being top of element meets top of viewport.

`overlap:` *NUMBER* — number in pixels the viewport and element intersect.
