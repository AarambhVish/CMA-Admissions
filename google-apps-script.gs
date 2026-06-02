const SHEET_NAME = "Database";
const OLD_LEADS_SPREADSHEET_ID = "1yB27fwVWdLY0jzpf6CTwtFQchrVUQHIAMgcw0OILu6s";
const OLD_LEADS_SHEET_NAME = "Form Responses 1";
const ADMISSION_SPREADSHEET_ID = "1TfBPncD41S0xCxX7uPOQVJJxltPFET5V8Ez3meJ6hlI";
const ADMISSION_SHEET_NAMES = ["CMAFC D6", "Inter D26"];

function doGet(e) {
  const callback = (e.parameter.callback || "callback").replace(/[^\w$.]/g, "");
  const mode = e.parameter.mode || "load";
  const payload = mode === "legacy"
    ? readOldLeadResponses_()
    : mode === "admissions"
      ? readAdmissionSheets_()
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
  return readRowsFromSheet_(sheet, OLD_LEADS_SHEET_NAME);
}

function readAdmissionSheets_() {
  const spreadsheet = SpreadsheetApp.openById(ADMISSION_SPREADSHEET_ID);
  const tabs = ADMISSION_SHEET_NAMES.map(name => {
    const sheet = findSheetByName_(spreadsheet, name);
    if (!sheet) throw new Error(`Sheet not found: ${name}`);
    return readRowsFromSheet_(sheet, name);
  });
  const headers = Array.from(new Set(tabs.flatMap(tab => tab.headers)));
  const rows = tabs.flatMap(tab => tab.rows.map(row => ({ ...row, _sheetName: tab.source })));
  return { ok: true, source: "Admission Sheets", tabs: tabs.map(tab => tab.source), headers, rows };
}

function readRowsFromSheet_(sheet, sourceName) {
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return { ok: true, source: sourceName, headers: values[0] || [], rows: [] };
  const headerIndex = findHeaderRowIndex_(values);
  const headers = values[headerIndex].map((header, index) => String(header || `Column ${index + 1}`).trim());
  const rows = values.slice(headerIndex + 1)
    .filter(row => row.some(cell => String(cell || "").trim()))
    .map((row, index) => {
      const record = { _rowNumber: headerIndex + index + 2, _sheetName: sourceName };
      headers.forEach((header, colIndex) => {
        record[header || `Column ${colIndex + 1}`] = row[colIndex] || "";
      });
      return record;
    });
  return { ok: true, source: sourceName, headerRow: headerIndex + 1, headers, rows };
}

function findHeaderRowIndex_(values) {
  let bestIndex = 0;
  let bestScore = -1;
  values.slice(0, Math.min(values.length, 25)).forEach((row, index) => {
    const cells = row.map(cell => String(cell || "").trim()).filter(Boolean);
    const joined = cells.join(" ").toLowerCase();
    const keywordScore = [
      "name", "mobile", "phone", "course", "batch", "branch", "admission", "fees", "receipt"
    ].filter(word => joined.includes(word)).length * 5;
    const score = cells.length + keywordScore;
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function findSheetByName_(spreadsheet, expectedName) {
  const exact = spreadsheet.getSheetByName(expectedName);
  if (exact) return exact;
  const normalizedExpected = normalizeSheetName_(expectedName);
  return spreadsheet.getSheets().find(sheet => normalizeSheetName_(sheet.getName()) === normalizedExpected) || null;
}

function normalizeSheetName_(name) {
  return String(name || "").toLowerCase().replace(/\s+/g, " ").trim();
}
