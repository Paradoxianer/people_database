/**
 * Returns the spreadsheet
 * if there is no spreadsheet stored in the documentsettings 
 * we generate a spreadsheet with the name of the document + "_Protagonist" at the end
 * then we store the id of the generated spreadheet in the documentsettings
 *
 * @return {string}   The word at cursor location. returns null if there is no word selected
 */
function getDatabase(){
  var documentProperties = PropertiesService.getDocumentProperties();
  var id = documentProperties.getProperty(PEOPLE_DATA);
  var ssNew = null;
  if (id == null){
    name = DocumentApp.getActiveDocument().getName();
    name=name+PEOPLE_ENDING;
    ssNew = createDatabase(name)
  }
  else {
    ssNew = SpreadsheetApp.openById(id);
  }
  return ssNew;
}

/**
 * Creates our database which is simply a spreadheet with the given name
 * once created we rename the first Sheet to "People"
 * and add a first column
 *
 * @return {Spreadsheet}   the created Spreadsheet
 */

function createDatabase(name){
  var documentProperties = PropertiesService.getDocumentProperties();
  var ssNew = SpreadsheetApp.create(name);
  if (ssNew!=null){
    ssNew.setActiveSheet(ssNew.getSheets()[0]);
    documentProperties.setProperty(PEOPLE_DATA, ssNew.getId());
    ssNew.renameActiveSheet("People");
    createCharacteristics(ssNew);
  }
  return ssNew;
}


/**
 * gets the sheet which is named "People"
 * and initalize the first colum with our given values 
 * stored in the multidimensinal Array 'CHARACTERISTIKS'
 *
 * @return {Sheet}   the Sheet where the first colum was filled
 * @todo if "People" Sheet was not found.. just create one
 */
function createCharacteristics(ssNew){ 
  var sheet = ssNew.getSheetByName("People");
  Logger.log(sheet);
  if (sheet == null){
    sheet = ssNew.insertSheet("People")
  }
  sheet.getRange(1, 1, 6, 1).setValues(CHARACTERISTIKS);
  return sheet;
}


// -> implement prefernces https://github.com/googlesamples/apps-script-mobile-addons/blob/master/mobile-translate/Code.gs