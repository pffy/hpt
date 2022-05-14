/* obj-tonemarksiso.gs */

/**
 * name     : obj-tonemarksiso.gs
 * version  : 24
 * updated  : 2018-12-17
 * git      : https://github.com/pffy/hpt
 * licesne  : https://opensource.org/licenses/MIT
 */
var ToneMarksIso = function() {

  var _tmdx = IdxToneMarksIso,
      _tfdx = IdxToneFive,
      _input = '',
      _output = '';

  function _setInput(str) {

    str = '' + str;
    str = str.trim();

    if(!str) {
      return; // derp, do nothing
    }

    _input = str;

    if(_input && _isReady()) {
      _convert();
    }
  }

  function _isReady() {
    return (_isTmdxReady() && _isTfdxReady());
  }

  function _convert() {

    _output = _input;

    // convert tone numbers (1 to 4) to tone marks
    for(var m in _tmdx) {
      _output = _output.replace((new RegExp(m, 'g')), '' + _tmdx[m]);
    }

    // careful removal of tone 5 pinyin
    for(var f in _tfdx) {
      _output = _output.replace((new RegExp(f, 'g')), '' + _tfdx[f]);
    }

    _output = _vacuum(_output);
    _output = _output.trim();
  }

  function _vacuum(str) {
    return str.replace((new RegExp('[^\\S\\n]{2,}', 'g')), ' ');
  }

  function _isTmdxReady() {
    return (_tmdx && (typeof _tmdx == 'object'));
  }

  function _isTfdxReady() {
    return (_tfdx && (typeof _tfdx == 'object'));
  }

  return {

    // Returns string representation of this object
    toString: function() {
      return _output;
    },

    // Returns input string
    getInput: function() {
      return _input;
    },

    // Sets input, converts non-empty string; returns this object.
    setInput: function(str) {
      _setInput(str);
      return this;
    },

    // Returns true if object is ready for conversion; false othewise.
    isReady: function() {
      return _isReady();
    }
  };
};