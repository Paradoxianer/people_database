/**
 * Returns the existing footer text (if any).
 *
 * @return {String} existing document footer text (as a plain string).
 */
function getFooterText() {
  // Retrieve and return the information requested by the sidebar.
  return DocumentApp.getActiveDocument().getFooter().getText();
}

/**
 * Replaces the current document footer with the given text.
 *
 * @param {String} footerText text collected from the client-side
 *     sidebar.
 */
function setFooterText(footerText) {
  // Use data collected from sidebar to manipulate the document.
  DocumentApp.getActiveDocument().getFooter().setText(footerText);
}

/**
 * Returns the document title.
 *
 * @return {String} the current document title.
 */
function getDocTitle() {
  // Retrieve and return the information requested by the dialog.
  return DocumentApp.getActiveDocument().getName();
}

/**
 * Changes the document title.
 *
 * @param {String} title the new title to use for the document.
 */
function setDocTitle(title) {
  // Use data collected from dialog to manipulate the document.
  DocumentApp.getActiveDocument().setName(title);
}

// -> implement prefernces https://github.com/googlesamples/apps-script-mobile-addons/blob/master/mobile-translate/Code.gs