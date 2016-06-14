var assert = chai.assert;

describe("EclipseScroll", function () {
	beforeEach(function(){
		EclipseScroll.removeAll();
		window.scrollTo(0,0);
	});
	
	it("should create a new instance of EclipseScroll", function () {
		assert.isDefined(EclipseScroll, "EclipseScroll is defined");
	});
	
	// Adding elements to EclipseScroll
	it("should add a single valid element to EclipseScroll", function (){
		EclipseScroll.add(document.querySelector(".single-item"));
		assert.equal(EclipseScroll.elements.length,1);
	});
	it("should add not try to add invalid element to EclipseScroll", function (){
		EclipseScroll.add(document.querySelector(".FOOBAR"));
		assert.equal(EclipseScroll.elements.length,0);
	});
	
	it("should add multiple items to EclipseScroll", function (){
		EclipseScroll.add(document.querySelectorAll(".multiple-item"));
		assert.equal(EclipseScroll.elements.length,4);
	});
	
	
	it("should remove a single valid element to EclipseScroll", function (){
		EclipseScroll.add(document.querySelector(".single-item"));
		EclipseScroll.remove(document.querySelector(".single-item"));
		assert.equal(EclipseScroll.elements.length,0);
	});
	it("should not try to remove invalid element to EclipseScroll", function (){
		EclipseScroll.add(document.querySelector(".single-item"));
		EclipseScroll.remove(document.querySelector(".FOOBAR"));
		assert.equal(EclipseScroll.elements.length,1);
	});
	
	it("should detect if object is visible after scroll", function (){
		var element = document.querySelector(".single-item");
		EclipseScroll.add(element);
		assert.equal(EclipseScroll.getData(element).visible,false);
		window.scrollTo(0,600);
		setTimeout(function(){assert.equal(EclipseScroll.getData(element).visible,true)},50);
	});
});