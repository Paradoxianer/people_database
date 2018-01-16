/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var DIALOG_TITLE = 'Settings';
var SIDEBAR_TITLE = 'People';
var SHEET_NAME = "People"
var PEOPLE_DATA = 'PEOPLE_DATA';
var PEOPLE_ENDING = "_Protagonists"
/*
 *
 * Later we will expand the table for a second row... this second row defines if the column is a 
 *    title (formatted as title and always displayed
 *    important (formatted normal but always displayed
 *    "normal" or "" (formatted normal and hidden when the block is not focused
 *
 * var CHARACTERISTIKS = [["Name","Spitzname","Beschreibung","Beruf","Körper","Zitate","links"],["title","","important","","","",""]];
 */
var CHARACTERISTIKS = [["Name","Spitzname","Beschreibung","Beruf","Körper","Zitate","links"]];



/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  DocumentApp.getUi()
      .createAddonMenu()
      .addItem('Show sidebar', 'showSidebar')
      .addItem('Settings', 'showSettings')
      .addToUi();
      getDatabase();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 *
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showSidebar() {
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showSidebar(ui);
}

/**
 * Opens a dialog. The dialog structure is described in the Dialog.html
 * project file.
 */
function showSettings() {
  var ui = HtmlService.createTemplateFromFile('Dialog')
      .evaluate()
      .setWidth(400)
      .setHeight(150)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, DIALOG_TITLE);
}

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
