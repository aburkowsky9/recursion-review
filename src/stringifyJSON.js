// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var JSONstr = "";
  var strArr = [];
  // base case : char.length = 1, wrap in quotation marks
  if (typeof(obj) === 'number' || typeof(obj) === 'boolean' || obj === null) {
    return "" + obj;
  }
  else if ((typeof(obj) === 'string' ) && (typeof(obj) !== 'function' && obj !== undefined)) {
    return '"' + obj + '"';
  }
  else if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      strArr.push(stringifyJSON(obj[i]));
    }
    return '[' + strArr + ']';
  }
  else if (typeof(obj) === 'object' && (typeof(obj) !== null && !Array.isArray(obj))) {
    var keys = Object.keys(obj);
    
    keys.forEach(function(key, index) {
      //var keyStr = key.toString();
      if (obj[key] !== undefined && typeof(obj[key]) !== 'function') {
        var value = stringifyJSON(obj[key]);
        if (index === keys.length - 1) {
          JSONstr = JSONstr + '"' + key + '"' + ':' + value;
        }
        else {
          JSONstr = JSONstr + '"' + key + '"' + ':' + value + ',';
        }
      }
    });

    JSONstr =  "{" + JSONstr;
  }
  
  var strEnd = JSONstr.split('').slice(-1);
  if (strEnd[0] === ',') {
    JSONstr = JSONstr.split('').slice(0, -1).join('');
  }
  
  return JSONstr + "}";
}
// extra quote around numbers
