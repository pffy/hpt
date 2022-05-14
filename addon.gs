/* addon.gs */

/**
 * name     : addon.gs
 * version  : 24
 * updated  : 2018-12-17
 * git      : https://github.com/pffy/hpt
 * licesne  : https://opensource.org/licenses/MIT
 */

/**
 * @OnlyCurrentDoc Limits the script to only accessing the current spreadsheet.
 */


// BEGIN custom functions

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
      text = CLEAN_(text);

      if(!text) {
        return '';
      }

      return HP_(text);
      break;
      
    case 'object':

      if(text instanceof Date) {        
        return text;
      }

      if(text instanceof Array) {
        return text.map(HANYUPINYIN);
      }
      
      break;

    default:
      // pass-through input
      return text;
      break;
  }

  return '';
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
      text = CLEAN_(text);

      if(!text) {
        return '';
      }

      return HPT_(text);
      break;
      
    case 'object':

      if(text instanceof Date) {        
        return text;
      }

      if(text instanceof Array) {
        return text.map(HANYUPINYIN_TONEMARKS);
      }
      
      break;

    default:
      // pass-through input
      return text;
      break;
  }

  return '';
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
      text = CLEAN_(text);

      if(!text) {
        return '';
      }

      return HPTI_(text);
      break;
      
    case 'object':

      if(text instanceof Date) {        
        return text;
      }

      if(text instanceof Array) {
        return text.map(HANYUPINYIN_TONEMARKS_ISO);
      }
      
      break;

    default:
      // pass-through input
      return text;
      break;
  }

  return '';
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
      text = CLEAN_(text);

      if(!text) {
        return '';
      }

      return HPN_(text);
      break;
      
    case 'object':

      if(text instanceof Date) {        
        return text;
      }

      if(text instanceof Array) {
        return text.map(HANYUPINYIN_TONELESS);
      }
      
      break;

    default:
      // pass-through input
      return text;
      break;
  }

  return '';
}

// END custom functions



// returns hanyu pinyin with tone numbers
function HP_(text) {
  var h = new HanyuPinyin();
  return '' + h.setInput(text);
}



// returns hanyu pinyin with backwards-compatible tone marks
function HPT_(text) {
  var h = new HanyuPinyin();
  var str = '' + h.setInput(text);
  var t = new ToneMarks();
  return '' + t.setInput(str);
}



// returns hanyu pinyin with ISO tone marks
function HPTI_(text) {
  var h = new HanyuPinyin();
  var str = '' + h.setInput(text);
  var t = new ToneMarksIso();
  return '' + t.setInput(str);
}



// returns hanyu pinyin with no tones
function HPN_(text) {
  var h = new HanyuPinyin();
  var str = '' + h.setInput(text);
  var t = new TonelessPinyin();
  return '' + t.setInput(str);
}



// returns clean text cast as string text
function CLEAN_(text) {
  text = '' + text;
  text = text.trim();
  return text;  
}




// shows "getting started" dialog box
function showFunctionList_() {

  var html = HtmlService.createHtmlOutputFromFile(product.sidebarfile)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle(product.name);

  SpreadsheetApp.getUi()
      .showSidebar(html);
}



// adds menus to Google Drive Spreadsheets
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
      .addItem(menuItems.helpFunctionList, 'showFunctionList_')
      .addToUi();
}



// automatic start after install
function onInstall(e) {
  onOpen(e);
}



// product items
var product = {
  "name": "HanyuPinyinTools",
  "sidebarfile": "functions",  
  "derp": "derp"
};



// menu items
var menuItems = {
  "helpFunctionList": "Function list",
  "sidebarTitle": product.name + " Help",
  "derp" : "derp"
};