// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getChildNodes = function(nodeEl) {
  var childArr = [];
  var nodeChildNodes = nodeEl.childNodes;

  childArr.push(nodeEl);

  if (nodeChildNodes.length > 0) {
    nodeChildNodes.forEach(function(childEl, index) {
      if (childEl.childNodes.length === 0) {
        childArr.push(childEl);
      }
      else {
        var grandChildNodes = childEl.childNodes;
        childArr.push(childEl);
        
        for(var i = 0; i < grandChildNodes.length; i++) {
          if (grandChildNodes[i].childNodes.length === 0) {
            childArr.push(grandChildNodes[i]);
          } else {
            childArr = childArr.concat(getChildNodes(grandChildNodes[i]));
          }
        }
      }
    });
  }
  return childArr;
};

var getElementsByClassName = function(className) {
  // document.body, element.childNodes, and element.classList
  var bodyNodes = getChildNodes(document.body);
  var classNameElems = [];

  bodyNodes.forEach(function(elem, index) {
    if(elem.classList !== undefined) {
      var classes = Array.from(elem.classList);
      if (classes.indexOf(className) !== -1) {
        classNameElems.push(elem);
      }
    }
  });

  return classNameElems;
};
