/**
 * Returns the word at the current cursor location in the document.
 *
 * @return {string}   The word at cursor location. returns null if there is no word selected
 */
function getCursorWord() {
  var cursor = DocumentApp.getActiveDocument().getCursor();
  var word = null;
  if (cursor) {
      Logger.log(cursor);
      var offset = cursor.getSurroundingTextOffset();
      var text = cursor.getSurroundingText().getText();
      word = getWordAt(text,offset);
      if (word == "") word = null;
  }
  return word;
}

/**
 * Returns the word at the index 'pos' in 'str'.
 * From https://stackoverflow.com/questions/5173316/finding-the-word-at-a-position-in-javascript/5174867#5174867
 */
function getWordAt(str, pos) {
  Logger.log("getWordAt()");
  // Perform type conversions.
  str = String(str);
  pos = Number(pos) >>> 0;
  // Search for the word's beginning and end.
  var left = str.slice(0, pos).search(/\S+$/),
      right = str.slice(pos-1).search(/\s/);
  // The last word in the string is a special case.
  if (right < 0) {
    return str.slice(left);
  }
  // Return the word, using the located bounds to extract it from the string.
  return str.slice(left, right + pos);
}




function getDatabase(){
  var documentProperties = PropertiesService.getDocumentProperties();
  var name = documentProperties.getProperty('PEOPLE_DATA');
  if (name == null){
    name = DocumentApp.getActiveDocument().getName();
    name=name+"_Protagonists";
    documentProperties.setProperty('PEOPLE_DATA', name);
  }
  var files = DriveApp.getFilesByName(name);
  var file = null;
  while (files.hasNext()) {
     file = files.next();
  }
  var ssNew = null;
  if (file == null){
    ssNew = createDatabase(name)
  }
  else{
    ssNew = SpreadsheetApp.open(file);
  }
  return ssNew;
}

// -> implement prefernces https://github.com/googlesamples/apps-script-mobile-addons/blob/master/mobile-translate/Code.gs