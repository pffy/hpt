/* addon.gs */

/**
 * name     : addon.gs
 * version  : 81
 * updated  : 2022-05-15
 * git      : https://github.com/pffy/hpt
 * licesne  : https://opensource.org/licenses/MIT
 */

/**
 * @OnlyCurrentDoc Limits the script to only accessing the current spreadsheet.
 */

/**
 * Converts Chinese characters to Hanyu Pinyin with tone numbers.
 *
 * @param {string} text - Chinese character text or range of text to convert.
 * @return {string} Hanyu Pinyin with tone numbers.
 * @customfunction
 */
function HANYUPINYIN(text) {
  switch(typeof text){
    case 'string': 
      return hpt_hp_(text);

    case 'object':
      if(text instanceof Date) {        
        return text;
      }

      if(text instanceof Array) {
        return text.map(HANYUPINYIN);
      }
    
      return '';
  default:
    // pass-through input
    return text;
  }
}

/**
 * Converts Chinese characters to Hanyu Pinyin with backwards-compatible tone marks.
 *
 * @param {string} text - Chinese character text or range of text to convert.
 * @return {string} Hanyu Pinyin with tone marks.
 * @customfunction
 */
function HANYUPINYIN_TONEMARKS(text) {
  switch(typeof text){
    case 'string': 
      return hpt_hpt_(text);

    case 'object':
      if(text instanceof Date) {        
        return text;
      }

      if(text instanceof Array) {
        return text.map(HANYUPINYIN_TONEMARKS);
      }
    
      return '';
  default:
    // pass-through input
    return text;
  }
}

/**
 * Converts Chinese characters to Hanyu Pinyin with ISO compliant tone marks.
 *
 * @param {string} text - Chinese character text or range of text to convert.
 * @return {string} Hanyu Pinyin with tone marks.
 * @customfunction
 */
function HANYUPINYIN_TONEMARKS_ISO(text) {
  switch(typeof text){
    case 'string': 
      return hpt_hpti_(text);

    case 'object':
      if(text instanceof Date) {        
        return text;
      }

      if(text instanceof Array) {
        return text.map(HANYUPINYIN_TONEMARKS_ISO);
      }
    
      return '';
  default:
    // pass-through input
    return text;
  }
}

/**
 * Converts Chinese characters to Hanyu Pinyin with no tones.
 *
 * @param {string} text - Chinese character text or range of text to convert.
 * @return {string} Hanyu Pinyin with no tones.
 * @customfunction
 */
function HANYUPINYIN_TONELESS(text) {
  switch(typeof text){
    case 'string': 
      return hpt_hpn_(text);

    case 'object':
      if(text instanceof Date) {        
        return text;
      }

      if(text instanceof Array) {
        return text.map(HANYUPINYIN_TONELESS);
      }
    
      return '';
  default:
    // pass-through input
    return text;
  }
}  

/**
 * Helper functions
 */

// returns hanyu pinyin with tone numbers
function hpt_hp_(text) {
  for(var h in hpdx) {
    text = text.replace((new RegExp(h, 'g')), ' ' + hpdx[h] + ' ');
  }

  text = finish_(text);
  return text;
}

// returns hanyu pinyin with tone marks
function hpt_hpt_(text) {

  for(var h in hpdx) {
    text = text.replace((new RegExp(h, 'g')), ' ' + hpdx[h] + ' ');
  }

  for(var t in tmdx) {
    text = text.replace((new RegExp(t, 'g')), '' + tmdx[t]);
  }

  for(var f in tfdx) {
    text = text.replace((new RegExp(f, 'g')), '' + tfdx[f]);
  }

  text = finish_(text);
  return text;
}

// returns hanyu pinyin with ISO tone marks
function hpt_hpti_(text) {

  for(var h in hpdx) {
    text = text.replace((new RegExp(h, 'g')), ' ' + hpdx[h] + ' ');
  }

  for(var t in tmidx) {
    text = text.replace((new RegExp(t, 'g')), '' + tmidx[t]);
  }

  for(var f in tfdx) {
    text = text.replace((new RegExp(f, 'g')), '' + tfdx[f]);
  }  

  text = finish_(text);
  return text;
}

// returns hanyu pinyin with no tonemarks
function hpt_hpn_(text) {

  for(var h in hpdx) {
    text = text.replace((new RegExp(h, 'g')), ' ' + hpdx[h] + ' ');
  }

  for(var t in trdx) {
    text = text.replace((new RegExp(t, 'g')), '' + trdx[t]);
  }  

  text = finish_(text);
  return text;
}

// returns cleaned up text after processing
function finish_(str) {
  return str.replace((new RegExp('[^\\S\\n]{2,}', 'g')), ' ').trim();
}
