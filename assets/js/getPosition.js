/* From javascript.info Coordinate Tutorial (http://javascript.info/tutorial/coordinates)  */
function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();  // get position in viewport
    var body = document.body;
    var docElem = document.documentElement;  // support IE8-

    // find offset of viewport from body
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    // find shift unique to IE
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    // add scroll to viewport offset and subtract IE shift
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

