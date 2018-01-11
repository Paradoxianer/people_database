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
    cleanUpEmpty();
  }
  return ssNew;
}

/**
 * Creates our database which is simply a spreadheet with the given name
 * once created we rename the first Sheet to "People"
 * and add a first column
 *
 * @return {Spreadsheet}   the created Spreadsheet
 * @todo check if the file already exist.... if so.. either change the name
 * or open the existing one ?
 */

function createDatabase(name){
  var documentProperties = PropertiesService.getDocumentProperties();
  var ssNew = SpreadsheetApp.create(name);
  if (ssNew!=null){
    ssNew.setActiveSheet(ssNew.getSheets()[0]);
    documentProperties.setProperty(PEOPLE_DATA, ssNew.getId());
    ssNew.renameActiveSheet(SHEET_NAME);
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
  var sheet = ssNew.getSheetByName(SHEET_NAME);
  if (sheet == null){
    sheet = ssNew.insertSheet(SHEET_NAME)
  }
  sheet.getRange(1, 1, 6, 1).setValues(CHARACTERISTIKS);
  cleanUpEmpty();
  return sheet;
}


/**
 * first load our database 
 * and the sheet which is named "People"
 *
 * @return {Sheet}   the Sheet where the first colum was filled
 */
function getSheet(){
  var spreadsheet = getDatabase();
  if (spreadsheet != null){
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);
    return sheet;
  }
  else{
    return null;
  } 
}


/**
 * search throught our database for the given name
 * and return the caracteristiks + our data column
 *
 * @return multidimensional array whit the first column containing the title and the second the data
 */
function getEntry(name) {
  var data = getSheet().getDataRange().getValues();
  var entries = new Array(CHARACTERISTIKS.length);
  var found = false;
  for (i in data[0]) {
    if(data[0][i] == name) {
      Logger.log("found: ",name);
      for (q=0 ; q<CHARACTERISTIKS.length ;q++){
            entries[q]=new Array(2);
            entries[q][0]=CHARACTERISTIKS[q][0];
            entries[q][1] = data[q][i];
            Logger.log(data[q][i]);
       }
       found = true;
       return entries;
    }
  }
  return null;
}

/**
 * go through all columns and rows of the database
 * and delete every empty row and every empty colum
 * so that we keep our database always clean and tight
 *
 */
function cleanUpEmpty(){
  var sheet = getSheet();
  Logger.log("cleanupEmty from",sheet);
  removeEmptyColumns(sheet);
  removeEmptyRows(sheet);
}


//Remove All Empty Columns in the given Sheet
function removeEmptyColumns(sheet) {
  var maxColumns = sheet.getMaxColumns(); 
  var lastColumn = sheet.getLastColumn();
  if (maxColumns-lastColumn != 0){
      sheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
  }
}

//Remove All Empty Rows in the given Sheet
function removeEmptyRows(sheet) {
  var maxRows = sheet.getMaxRows(); 
  var lastRow = sheet.getLastRow();
  if (maxRows-lastRow != 0){
      sheet.deleteRows(lastRow+1, maxRows-lastRow);
  }
}

function updateEntry(name) {

}

/*
 * returns the list of people stored in the database 
 * + one selected characteristik
 */
function getPeople(){
  var data = getSheet().getDataRange().getValues();
  var people = new Array(data[0].length);
  var i = 1;
  for (i in data[0]) {
    people[i] = new Array(2);
    people[i][0] = data[0][i];
    people[i][1] = data[1][i];
  }
  return people;
}

function getData(){
   var sheet =getSheet();
   var data = null;
   if  (sheet!=NULL){
     data = sheet.getDataRange().getValues();
   }
  return data;
}
// -> implement prefernces https://github.com/googlesamples/apps-script-mobile-addons/blob/master/mobile-translate/Code.gs