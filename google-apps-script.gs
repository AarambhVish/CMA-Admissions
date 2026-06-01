const SHEET_NAME = "Database";

function doGet(e) {
  const callback = (e.parameter.callback || "callback").replace(/[^\w$.]/g, "");
  const data = readDatabase_();
  const output = `${callback}(${JSON.stringify({ ok: true, data })});`;
  return ContentService
    .createTextOutput(output)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e) {
  try {
    const payload = e.parameter.payload || (e.postData && e.postData.contents) || "";
    if (!payload) throw new Error("Missing payload");
    writeDatabase_(JSON.parse(payload));
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, savedAt: new Date().toISOString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function readDatabase_() {
  const sheet = getSheet_();
  const raw = sheet.getRange("A2").getValue();
  if (!raw) return null;
  return JSON.parse(raw);
}

function writeDatabase_(data) {
  const sheet = getSheet_();
  sheet.getRange("A1").setValue("CMA CRM Database JSON");
  sheet.getRange("B1").setValue("Last Saved");
  sheet.getRange("A2").setValue(JSON.stringify(data));
  sheet.getRange("B2").setValue(new Date());
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  return sheet;
}
