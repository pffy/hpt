/* obj-tonelesspinyin.gs */

/**
 * name     : obj-tonelesspinyin.gs
 * version  : 24
 * updated  : 2018-12-17
 * git      : https://github.com/pffy/hpt
 * licesne  : https://opensource.org/licenses/MIT
 */
var TonelessPinyin = function() {

  var _trdx = IdxToneRemoval,
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
    return (_isTrdxReady());
  }

  function _convert() {

    _output = _input;

    // carefully removes tones
    for(var m in _trdx) {
      _output = _output.replace((new RegExp(m, 'g')), '' + _trdx[m]);
    }

    _output = _vacuum(_output);
    _output = _output.trim();
  }

  function _vacuum(str) {
    return str.replace((new RegExp('[^\\S\\n]{2,}', 'g')), ' ');
  }

  function _isTrdxReady() {
    return (_trdx && (typeof _trdx == 'object'));
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