/* obj-hanyupinyin.gs */

/**
 * name     : obj-hanyupinyin.gs
 * version  : 24
 * updated  : 2018-12-17
 * git      : https://github.com/pffy/hpt
 * licesne  : https://opensource.org/licenses/MIT
 */
var HanyuPinyin = function() {

  var _hpdx = IdxHanyuPinyin,
      _input = '',
      _output = '';

  function _setInput(str) {
    str = '' + str;
    _input = str ? str : '';
    
    if(_isReady()) {
      _convert();
    }    
  }

  function _convert() {

    _output = _input;

    for(var h in _hpdx) {
      _output = _output.replace((new RegExp(h, 'g')), ' ' + _hpdx[h] + ' ');
    }

    _output = _vacuum(_output);
  }

  function _vacuum(str) {
    return str.replace((new RegExp('[^\\S\\n]{2,}', 'g')), ' ').trim();
  }
  
  function _isReady() {
    return _input && _hpdx && (typeof _hpdx == 'object');
  }

  return {

    toString: function() {
      return _output;
    },

    getInput: function() {
      return _input;
    },

    setInput: function(str) {
      _setInput(str);
      return this;
    }

  };
};
