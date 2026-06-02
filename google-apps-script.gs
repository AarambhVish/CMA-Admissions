const SHEET_NAME = "Database";
const OLD_LEADS_SPREADSHEET_ID = "1yB27fwVWdLY0jzpf6CTwtFQchrVUQHIAMgcw0OILu6s";
const OLD_LEADS_SHEET_NAME = "Form Responses 1";

function doGet(e) {
  const callback = (e.parameter.callback || "callback").replace(/[^\w$.]/g, "");
  const mode = e.parameter.mode || "load";
  const payload = mode === "legacy"
    ? readOldLeadResponses_()
    : { ok: true, data: readDatabase_() };
  const output = `${callback}(${JSON.stringify(payload)});`;
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

function readOldLeadResponses_() {
  const spreadsheet = SpreadsheetApp.openById(OLD_LEADS_SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(OLD_LEADS_SHEET_NAME);
  if (!sheet) throw new Error(`Sheet not found: ${OLD_LEADS_SHEET_NAME}`);
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return { ok: true, headers: values[0] || [], rows: [] };
  const headers = values[0].map(header => String(header || "").trim());
  const rows = values.slice(1)
    .filter(row => row.some(cell => String(cell || "").trim()))
    .map((row, index) => {
      const record = { _rowNumber: index + 2 };
      headers.forEach((header, colIndex) => {
        record[header || `Column ${colIndex + 1}`] = row[colIndex] || "";
      });
      return record;
    });
  return { ok: true, source: OLD_LEADS_SHEET_NAME, headers, rows };
}
