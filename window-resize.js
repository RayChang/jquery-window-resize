!function ($) {
  "use strict";

  var _now = new Date(),
      _out = false,
      _delta = 300,
      _fnArray = [];

  $.windowResize = function(fn) {
    _fnArray.push(fn)

    for(var _index in _fnArray) {
      if(typeof _fnArray[_index].start === 'function') {
        $.windowResize.start[_index] = _fnArray[_index].start;
      } else {
        console.error('start attribute "' + _fnArray[_index].start + '" not function');
      }
      if(typeof _fnArray[_index].end === 'function') {
        $.windowResize.end[_index] = _fnArray[_index].end;
      } else {
        console.error('end attribute "' + _fnArray[_index].end + '" not function');
      }
    }
    window.onresize = function() {
      _now = new Date();
      if(_out === false) {
        if($.windowResize.start.length) {
          for(var _index in $.windowResize.start) {
            $.windowResize.start[_index]()
          }
        }
        _out = true;
        setTimeout(resizeend, _delta);
      }
    };
    function resizeend() {
      if (new Date() - _now < _delta) {
        setTimeout(resizeend, _delta);
      } else {
        _out = false;
        if($.windowResize.end.length) {
          for(var _index in $.windowResize.end) {
            $.windowResize.end[_index]()
          }
        }
      }
    }
  };
  $.windowResize.start = [];
  $.windowResize.end = [];
}(window.jQuery);