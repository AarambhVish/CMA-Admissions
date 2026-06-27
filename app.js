const storeKey = "cmaAdmissionCrm.v2.freshStart";
const resetGeneration = "2026-06-27-clean";
const recoveryAdminPasswordHash = "c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f";
const fixedSheetWebAppUrl = [
  "https://script.google.com/macros/s/",
  "AKfycbzA9esWRGpkxtczOMvjKbHpRux0J2hPc7vQdCcHhgYfl4AYIyM2aCHJtNJoyCpOFzqJ_A",
  "/exec"
].join("");
const fixedCmafcAdmissionWebAppUrl = [
  "https://script.google.com/macros/s/",
  "AKfycbwHH2k9b-HDEGLFBrQyBUuw0JMlDs5DogfUO3gaidDr5Hw-RCwbbkQiRawq0cUt_zTR",
  "/exec"
].join("");
const fixedDatabaseSpreadsheetUrl = "";
const cloudReminderMinutes = 10;
const tabs = [
  ["leads", "Leads"],
  ["admissions", "Admission"],
  ["attendance", "Attendance"],
  ["reports", "Reports"],
  ["users", "User/Admin"],
  ["archive", "Archived"],
  ["settings", "Master Settings"]
];

const defaultRoleTabAccess = {
  "Super Admin": tabs.map(([key]) => key),
  "Lead Manager": ["leads", "admissions", "attendance", "reports", "users", "archive", "settings"],
  "Counsellor / Admin": ["leads", "admissions", "attendance", "reports"]
};

const defaultLeadColumns = [
  { key: "createdAt", label: "Date Added" },
  { key: "leadAge", label: "Age of Lead" },
  { key: "lastEdited", label: "Last Edited" },
  { key: "name", label: "Name" },
  { key: "studentMobile", label: "Mobile No." },
  { key: "course", label: "Course" },
  { key: "attempt", label: "Attempt" },
  { key: "branch", label: "Branch" },
  { key: "followupAt", label: "Next Follow-up" },
  { key: "actions", label: "Actions" }
];

const defaultAttendanceStudentColumns = [
  { key: "firstName", label: "First Name", width: 92 },
  { key: "lastName", label: "Last", width: 26 },
  { key: "admissionDate", label: "Admission Date", width: 86 },
  { key: "batchGroup", label: "Batch", width: 44 },
  { key: "studentId", label: "Student ID", width: 58 }
];

const defaultMasters = {
  courses: ["CMA Foundation", "CMA Intermediate", "CMA Final"],
  branches: ["Andheri", "Borivali", "Dadar", "Thane", "Online"],
  sources: ["Existing students", "Past Students", "Classes Owner", "Advertisement"],
  statuses: ["New Lead", "Contacted", "Interested", "Prospectus Sent", "Demo Attended", "Follow-up Required", "Parent Discussion Pending", "Fees Discussion Pending", "Converted / Admitted", "Not Interested", "Not Reachable", "Lost Lead"],
  roles: ["Super Admin", "Lead Manager", "Counsellor / Admin"],
  batches: ["Morning Batch", "Evening Batch", "Weekend Batch"],
  attendanceBatches: ["CMAF_D26_Borivali", "CMAI_D26_Borivali"],
  professors: ["Pradeep Sir", "Radhika Miss"],
  foundationFaculty: ["Pradeep Sir", "Radhika Miss"],
  interFaculty: ["Pradeep Sir", "Sumit Sir"],
  paperFaculty: {
    "CMA Foundation": {
      P1: ["Prof. Radhika Mane", "Prof. Chirag Jain", "Prof. Rahul Bhuvad"],
      P2: ["Prof. Dilip Vishwakarma", "Prof. Sandesh Gupta", "Prof. Pradeep Yadav", "Prof. Yasin Pradhan", "Prof. Tushar Desai", "Prof. Nishikant Sathe"],
      P3: ["Prof. Sandesh Gupta", "Prof. Sumit Redekar", "Prof. Raina Thakkar", "Prof. Manisha Lath", "Prof. Ravi Patel"],
      P4: ["Prof. Payal Parekh", "Prof. SP Shukla", "Prof. Chirag Jain", "Prof. Rahul Bhuvad", "Prof. Rakesh Aswani", "Prof. Ruchi Chaurasia", "Prof. Sandeep Kanaujiya"]
    },
    "CMA Intermediate": {
      P5: ["Prof. Radhika Mane", "Prof. Chirag Jain"],
      P6: ["Prof. Sandesh Gupta", "Prof. Pradeep Yadav", "Prof. Yasin Pradhan", "Prof. Tushar Desai", "Prof. Nishikant Sathe"],
      P7: ["Prof. Gaorav Tawari", "Prof. Jeet Shah", "Prof. Parag Shah", "Prof. Yash Mundhra"],
      P8: ["Prof. Dilip Vishwakarma", "Prof. Sandesh Gupta", "Prof. Nitin Shrivastav", "Prof. Jignesh Sangani"],
      P9: ["Prof. Sumit Redekar"],
      P10: ["Prof. Sandesh Gupta", "Prof. Gaorav Tawari", "Prof. Nitin Shrivastav", "Prof. Yasin Pradhan", "Prof. Tushar Desai"],
      P11: ["Prof. Dilip Vishwakarma", "Prof. Sandesh Gupta", "Prof. Nitin Shrivastav", "Prof. Jeet Shah", "Prof. Jigar Joshi", "Prof. Yasin Pradhan", "Prof. Tushar Desai"],
      P12: ["Prof. Dilip Vishwakarma", "Prof. Sandesh Gupta", "Prof. Radhika Mane", "Prof. Nitin Shrivastav", "Prof. Jignesh Sangani", "Prof. Rahul Bhuvad"]
    },
    "CMA Final": {
      P13: [],
      P14: [],
      P15: ["Prof. Gaorav Tawari"],
      P16: ["Prof. Dilip Vishwakarma", "Prof. Sumit Redekar", "Prof. Jignesh Sangani"],
      P17: ["Prof. Gaorav Tawari"],
      P18: ["Prof. Dilip Vishwakarma", "Prof. Gaorav Tawari", "Prof. Jignesh Sangani"],
      P19: ["Prof. Jeet Shah"],
      P20: ["Prof. Dilip Vishwakarma"]
    }
  },
  attendanceRemarks: ["Fever / Health Issue", "College / Exam", "Family Reason", "Out of Station", "Not Responding", "Will Attend Next Lecture", "Other"]
};

const providedPlanning = {
  courses: ["CMA Intermediate", "CMA Foundation"],
  branches: ["Borivali", "Mulund", "Online", "Dadar", "Vashi", "Ghatkopar", "Andheri", "Dombivali", "Ullashnagar"],
  batches: ["CMA Inter June 2027", "CMA Foundation Dec 2026", "CMA Foundation June 2027"],
  targets: [
    {
      title: "CMA Target & Promotion Dec 26, June 27",
      course: "CMA Intermediate",
      attempt: "June 2027",
      rows: [
        { branch: "Borivali", currentBase: 0, target: 100 },
        { branch: "Mulund", currentBase: 0, target: 100 },
        { branch: "Online", currentBase: 0, target: 50 },
        { branch: "Dadar", currentBase: 0, target: 50 },
        { branch: "Vashi", currentBase: 0, target: 50 },
        { branch: "Ghatkopar", currentBase: 0, target: 50 },
        { branch: "Andheri", currentBase: 0, target: 50 }
      ]
    },
    {
      title: "CMA Target & Promotion Dec 26, June 27",
      course: "CMA Foundation",
      attempt: "December 2026",
      rows: [
        { branch: "Borivali", currentBase: 99, target: 150 },
        { branch: "Andheri", currentBase: 40, target: 80 },
        { branch: "Dadar", currentBase: 21, target: 50 },
        { branch: "Ghatkopar", currentBase: 39, target: 50 },
        { branch: "Mulund", currentBase: 50, target: 100 },
        { branch: "Vashi", currentBase: 38, target: 50 },
        { branch: "Dombivali", currentBase: 39, target: 50 },
        { branch: "Online", currentBase: 7, target: 25 },
        { branch: "Ullashnagar", currentBase: 20, target: 45 }
      ]
    },
    {
      title: "CMA Target & Promotion Dec 26, June 27",
      course: "CMA Foundation",
      attempt: "June 2027",
      rows: [
        { branch: "Borivali", currentBase: 100, target: 50 },
        { branch: "Andheri", currentBase: 50, target: 50 },
        { branch: "Dadar", currentBase: 50, target: 50 },
        { branch: "Ghatkopar", currentBase: 39, target: 50 },
        { branch: "Mulund", currentBase: 50, target: 70 },
        { branch: "Vashi", currentBase: 38, target: 50 },
        { branch: "Dombivali", currentBase: 39, target: 30 },
        { branch: "Online", currentBase: 7, target: 50 },
        { branch: "Ullashnagar", currentBase: 20, target: 50 }
      ]
    }
  ]
};

const seed = {
  leads: [],
  followups: [],
  admissions: [],
  attendanceStudents: [],
  attendanceSessions: [],
  attendanceRecords: {},
  campaigns: [],
  templates: [],
  targets: [],
  users: [{
    id: "recovery-admin",
    name: "Admin",
    mobile: "",
    email: "",
    role: "Super Admin",
    branch: "Unassigned",
    branchAccess: [],
    tabAccess: tabs.map(([key]) => key),
    passwordHash: recoveryAdminPasswordHash
  }],
  leadColumns: structuredClone(defaultLeadColumns),
  attendanceStudentColumns: structuredClone(defaultAttendanceStudentColumns),
  attendanceLectureColumnWidth: 82,
  roleTabAccess: structuredClone(defaultRoleTabAccess),
  professorDatabaseSeeded: true,
  customAttendanceFields: [],
  customLeadFields: [],
  masters: {
    courses: structuredClone(defaultMasters.courses),
    branches: [],
    sources: structuredClone(defaultMasters.sources),
    statuses: structuredClone(defaultMasters.statuses),
    roles: structuredClone(defaultMasters.roles),
    batches: [],
    attendanceBatches: [],
    professors: [],
    foundationFaculty: [],
    interFaculty: [],
    paperFaculty: structuredClone(defaultMasters.paperFaculty),
    attendanceRemarks: structuredClone(defaultMasters.attendanceRemarks)
  }
};

let state = load();
let masters = state.masters;
let activeTab = "leads";
let parsedBulk = [];
let currentUser = null;
let syncTimer = null;
let periodicSyncTimer = null;
let cloudStatusTimer = null;
let isCloudLoading = false;
let legacySheetPayload = null;
let admissionSheetPayload = null;
let syncAdmissionsAfterLegacy = false;
let admissionSort = { key: "status", direction: "asc" };
let tableSorts = {};

function id() { return Math.random().toString(36).slice(2, 10); }
function todayDate() { return new Date().toISOString().slice(0, 10); }
function futureHours(n) { const d = new Date(); d.setHours(d.getHours() + n); return localInputValue(d); }
function pastHours(n) { const d = new Date(); d.setHours(d.getHours() - n); return localInputValue(d); }
function localInputValue(d) { return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); }
function load() {
  const raw = localStorage.getItem(storeKey);
  if (!raw) {
    const blank = structuredClone(seed);
    normalizeStateDefaults(blank);
    localStorage.setItem(storeKey, JSON.stringify(blank));
    writeLocalSafetyBackupFor(blank, "first app start");
    return blank;
  }
  const loaded = JSON.parse(raw);
  normalizeStateDefaults(loaded);
  localStorage.setItem(storeKey, JSON.stringify(loaded));
  if (!loaded.planningSeeded) {
    ensureProvidedPlanning(loaded);
    loaded.planningSeeded = true;
    localStorage.setItem(storeKey, JSON.stringify(loaded));
  }
  return loaded;
}

function mergeCloudState(localData = {}, cloudData = {}) {
  const merged = structuredClone(localData || {});
  normalizeStateDefaults(merged);
  const incoming = structuredClone(cloudData || {});
  normalizeStateDefaults(incoming);

  [
    "leads",
    "followups",
    "admissions",
    "attendanceStudents",
    "attendanceSessions",
    "campaigns",
    "users",
    "templates",
    "targets",
    "customAttendanceFields",
    "customLeadFields"
  ].forEach(key => {
    merged[key] = mergeRecordList(merged[key], incoming[key], key);
  });

  merged.attendanceRecords = { ...(incoming.attendanceRecords || {}), ...(merged.attendanceRecords || {}) };
  merged.masters = mergeMasters(merged.masters, incoming.masters);
  merged.leadColumns = mergeConfigList(merged.leadColumns, incoming.leadColumns, "key");
  merged.attendanceStudentColumns = mergeConfigList(merged.attendanceStudentColumns, incoming.attendanceStudentColumns, "key");
  merged.roleTabAccess = normalizeRoleTabAccess({ ...(incoming.roleTabAccess || {}), ...(merged.roleTabAccess || {}) }, merged.masters.roles);
  merged.attendanceLectureColumnWidth = Number(merged.attendanceLectureColumnWidth || incoming.attendanceLectureColumnWidth) || 82;
  merged.professorDatabaseSeeded = merged.professorDatabaseSeeded || incoming.professorDatabaseSeeded;
  merged.planningSeeded = merged.planningSeeded || incoming.planningSeeded;
  normalizeStateDefaults(merged);
  return merged;
}

function mergeRecordList(localList = [], cloudList = [], listName = "") {
  if (listName === "customAttendanceFields" || listName === "customLeadFields") {
    return [...new Set([...(cloudList || []), ...(localList || [])].filter(Boolean))];
  }
  const records = new Map();
  [...(cloudList || []), ...(localList || [])].forEach(item => {
    if (!item || typeof item !== "object") return;
    const key = recordMergeKey(item, listName);
    const existing = records.get(key);
    records.set(key, existing ? mergeRecord(existing, item) : structuredClone(item));
  });
  return [...records.values()];
}

function recordMergeKey(item = {}, listName = "") {
  if (item.id) return `id:${item.id}`;
  if (listName === "users") return `user:${normalizePersonName(item.name || item.email || item.mobile || "")}`;
  if (listName === "leads") return `lead:${onlyPhone(item.studentMobile || item.mobile || "") || normalizePersonName(displayLeadName(item) || item.name || "")}`;
  if (listName === "attendanceStudents") return `attendance:${normalizeAttendanceChoice(item.batch || "")}|${normalizeAttendanceChoice(item.branch || "")}|${normalizePersonName([item.firstName, item.lastName || item.lastInitial].filter(Boolean).join(" "))}|${item.studentId || ""}`;
  if (listName === "admissions") return `admission:${item.leadId || onlyPhone(item.studentMobile || "") || normalizePersonName(displayLeadName(item) || item.studentName || "")}`;
  return `${listName}:${JSON.stringify(item)}`;
}

function mergeRecord(base = {}, next = {}) {
  const baseTime = recordTimestamp(base);
  const nextTime = recordTimestamp(next);
  if (nextTime > baseTime) return { ...base, ...next, customFields: { ...(base.customFields || {}), ...(next.customFields || {}) }, tabAccess: next.tabAccess || base.tabAccess, branchAccess: next.branchAccess || base.branchAccess, passwordHash: next.passwordHash || base.passwordHash };
  return { ...next, ...base, customFields: { ...(next.customFields || {}), ...(base.customFields || {}) }, tabAccess: base.tabAccess || next.tabAccess, branchAccess: base.branchAccess || next.branchAccess, passwordHash: base.passwordHash || next.passwordHash };
}

function recordTimestamp(item = {}) {
  const value = item.updatedAt || item.lastTouchedAt || item.archivedAt || item.admissionDate || item.createdAt || item.followupAt || "";
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function mergeConfigList(localList = [], cloudList = [], keyName = "key") {
  const map = new Map();
  [...(cloudList || []), ...(localList || [])].forEach(item => {
    if (!item || typeof item !== "object") return;
    const key = item[keyName] || item.label || JSON.stringify(item);
    map.set(key, { ...(map.get(key) || {}), ...item });
  });
  return [...map.values()];
}

function mergeMasters(localMasters = {}, cloudMasters = {}) {
  const merged = structuredClone(localMasters || {});
  const incoming = structuredClone(cloudMasters || {});
  Object.keys(defaultMasters).forEach(key => {
    if (key === "paperFaculty") {
      merged.paperFaculty = mergePaperFacultyObjects(merged.paperFaculty, incoming.paperFaculty);
      return;
    }
    merged[key] = [...new Set([...(incoming[key] || []), ...(merged[key] || [])].filter(Boolean))];
  });
  return merged;
}

function mergePaperFacultyObjects(localFaculty = {}, cloudFaculty = {}) {
  const merged = structuredClone(cloudFaculty || {});
  Object.entries(localFaculty || {}).forEach(([course, papers]) => {
    merged[course] = merged[course] || {};
    Object.entries(papers || {}).forEach(([paper, names]) => {
      merged[course][paper] = [...new Set([...(merged[course][paper] || []), ...(names || [])].filter(Boolean))];
    });
  });
  return merged;
}

function normalizeStateDefaults(data) {
  data.leads = data.leads || [];
  data.followups = data.followups || [];
  data.admissions = data.admissions || [];
  data.attendanceStudents = data.attendanceStudents || [];
  data.attendanceSessions = data.attendanceSessions || [];
  data.attendanceRecords = data.attendanceRecords || {};
  data.campaigns = data.campaigns || [];
  data.users = data.users || [];
  data.templates = data.templates || [];
  data.targets = data.targets || [];
  data.masters = {
    courses: data.masters?.courses || [],
    branches: data.masters?.branches || [],
    sources: mergeReferenceOptions(data.masters?.sources || []),
    statuses: data.masters?.statuses || [],
    roles: data.masters?.roles || [],
    batches: data.masters?.batches || [],
    attendanceBatches: data.masters?.attendanceBatches || structuredClone(defaultMasters.attendanceBatches),
    professors: data.masters?.professors || structuredClone(defaultMasters.professors),
    foundationFaculty: data.masters?.foundationFaculty || data.masters?.professors || structuredClone(defaultMasters.foundationFaculty),
    interFaculty: data.masters?.interFaculty || data.masters?.professors || structuredClone(defaultMasters.interFaculty),
    paperFaculty: normalizePaperFaculty(data.masters?.paperFaculty, data.masters),
    attendanceRemarks: data.masters?.attendanceRemarks || structuredClone(defaultMasters.attendanceRemarks)
  };
  if (!data.professorDatabaseSeeded) {
    mergePaperFaculty(data.masters.paperFaculty, defaultMasters.paperFaculty);
    data.professorDatabaseSeeded = true;
  }
  data.leadColumns = Array.isArray(data.leadColumns) && data.leadColumns.length ? data.leadColumns : structuredClone(defaultLeadColumns);
  data.attendanceStudentColumns = Array.isArray(data.attendanceStudentColumns) && data.attendanceStudentColumns.length ? data.attendanceStudentColumns : structuredClone(defaultAttendanceStudentColumns);
  data.attendanceLectureColumnWidth = Number(data.attendanceLectureColumnWidth) || 82;
  data.roleTabAccess = normalizeRoleTabAccess(data.roleTabAccess, data.masters.roles);
  data.customAttendanceFields = Array.isArray(data.customAttendanceFields) ? data.customAttendanceFields : [];
  data.customLeadFields = Array.isArray(data.customLeadFields) ? data.customLeadFields : [];
  if (!data.users.length) {
    data.users.push({
      id: "recovery-admin",
      name: "Admin",
      mobile: "",
      email: "",
      role: "Super Admin",
      branch: "Unassigned",
      branchAccess: [],
      tabAccess: tabs.map(([key]) => key),
      passwordHash: recoveryAdminPasswordHash
    });
  }
  const recoveryAdmin = data.users.find(user => user.id === "recovery-admin");
  if (recoveryAdmin) {
    recoveryAdmin.name = recoveryAdmin.name || "Admin";
    recoveryAdmin.role = "Super Admin";
    recoveryAdmin.tabAccess = tabs.map(([key]) => key);
    recoveryAdmin.passwordHash = recoveryAdminPasswordHash;
  } else {
    data.users.push({
      id: "recovery-admin",
      name: "Admin",
      mobile: "",
      email: "",
      role: "Super Admin",
      branch: "Unassigned",
      branchAccess: [],
      tabAccess: tabs.map(([key]) => key),
      passwordHash: recoveryAdminPasswordHash
    });
  }
  data.leads.forEach(lead => {
    if (!lead.customFields) lead.customFields = {};
    Object.keys(lead.customFields).forEach(field => addUnique(data.customLeadFields, field));
  });
  data.attendanceStudents.forEach(student => {
    if (!student.customFields) student.customFields = {};
    Object.keys(student.customFields).forEach(field => addUnique(data.customAttendanceFields, field));
  });
  data.users.forEach(user => {
    delete user.password;
    user.tabAccess = normalizeUserTabAccess(user.tabAccess);
  });
}

function normalizeUserTabAccess(tabAccess) {
  const allTabs = tabs.map(([key]) => key);
  if (!Array.isArray(tabAccess) || !tabAccess.length) return allTabs;
  return tabAccess.filter(key => allTabs.includes(key));
}

function normalizeRoleTabAccess(roleAccess = {}, roleNames = null) {
  const normalized = {};
  mastersRoleNames(roleAccess, roleNames).forEach(role => {
    normalized[role] = normalizeUserTabAccess(roleAccess?.[role] || defaultRoleTabAccess[role] || tabs.map(([key]) => key));
  });
  return normalized;
}

function normalizePaperFaculty(existing = null, oldMasters = {}) {
  const normalized = existing ? structuredClone(existing) : structuredClone(defaultMasters.paperFaculty);
  const legacyFoundation = oldMasters?.foundationFaculty || oldMasters?.professors || [];
  const legacyInter = oldMasters?.interFaculty || oldMasters?.professors || [];
  Object.entries(existing || {}).forEach(([course, papers]) => {
    const courseName = canonicalCourseName(course);
    normalized[courseName] = normalized[courseName] || {};
    Object.entries(papers || {}).forEach(([paper, names]) => {
      normalized[courseName][paper] = [...new Set([...(Array.isArray(names) ? names : [])].filter(Boolean))];
    });
  });
  if (!existing) {
    ["P1", "P2", "P3", "P4"].forEach(paper => normalized["CMA Foundation"][paper] = [...new Set(legacyFoundation)]);
    ["P5", "P6", "P7", "P8"].forEach(paper => normalized["CMA Intermediate"][paper] = [...new Set(legacyInter)]);
  }
  (oldMasters?.courses || defaultMasters.courses).forEach(course => {
    const courseName = canonicalCourseName(course);
    normalized[courseName] = normalized[courseName] || {};
    paperOptionsForCourse(courseName).forEach(paper => normalized[courseName][paper] = normalized[courseName][paper] || []);
  });
  return normalized;
}

function mergePaperFaculty(target = {}, source = {}) {
  Object.entries(source).forEach(([course, papers]) => {
    const courseName = canonicalCourseName(course);
    target[courseName] = target[courseName] || {};
    Object.entries(papers || {}).forEach(([paper, names]) => {
      target[courseName][paper] = target[courseName][paper] || [];
      (names || []).forEach(name => addUnique(target[courseName][paper], name));
    });
  });
  return target;
}

function canonicalCourseName(course = "") {
  const lower = String(course || "").toLowerCase();
  if (lower.includes("inter") || lower.includes("cmai")) return "CMA Intermediate";
  if (lower.includes("final")) return "CMA Final";
  return "CMA Foundation";
}

function mastersRoleNames(roleAccess = {}, roleNames = null) {
  return [...new Set([...(roleNames || masters?.roles || defaultMasters.roles), ...Object.keys(defaultRoleTabAccess), ...Object.keys(roleAccess || {})])].filter(Boolean);
}

function roleTabDefaults(role) {
  const normalized = normalizeRoleTabAccess(state.roleTabAccess || {});
  return normalizeUserTabAccess(normalized[role] || defaultRoleTabAccess[role] || tabs.map(([key]) => key));
}

function stripSensitiveData(data) {
  (data.users || []).forEach(user => {
    delete user.password;
    delete user.pin;
    delete user.secret;
  });
  return data;
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(String(password || ""));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function save() {
  state.masters = masters;
  stripSensitiveData(state);
  writeLocalSafetyBackup("save");
  localStorage.setItem(storeKey, JSON.stringify(state));
  queueCloudSave();
}

function dataScore(data = {}) {
  const mastersCount = Object.values(data.masters || {}).reduce((sum, value) => {
    if (Array.isArray(value)) return sum + value.length;
    if (value && typeof value === "object") return sum + JSON.stringify(value).length / 100;
    return sum;
  }, 0);
  return Math.round(
    (data.users?.length || 0) * 8 +
    (data.leads?.length || 0) * 5 +
    (data.admissions?.length || 0) * 5 +
    (data.followups?.length || 0) * 3 +
    (data.attendanceStudents?.length || 0) * 3 +
    (data.attendanceSessions?.length || 0) * 2 +
    (data.campaigns?.length || 0) * 3 +
    (data.targets?.length || 0) * 2 +
    (data.templates?.length || 0) +
    mastersCount
  );
}

function writeLocalSafetyBackup(reason = "manual") {
  writeLocalSafetyBackupFor(state, reason);
}

function writeLocalSafetyBackupFor(data, reason = "manual") {
  const score = dataScore(data);
  if (score <= 0) return;
  let existingScore = 0;
  try {
    existingScore = JSON.parse(localStorage.getItem(`${storeKey}.backup.latest`) || "{}").score || 0;
  } catch {}
  if (score < existingScore) return;
  localStorage.setItem(`${storeKey}.backup.latest`, JSON.stringify({
    savedAt: new Date().toISOString(),
    reason,
    score,
    data: stripSensitiveData(structuredClone(data))
  }));
}

function backupBeforeReplace(reason = "replace") {
  if (dataScore(state) > 0) {
    localStorage.setItem(`${storeKey}.backup.beforeReplace`, JSON.stringify({
      savedAt: new Date().toISOString(),
      reason,
      score: dataScore(state),
      data: stripSensitiveData(structuredClone(state))
    }));
  }
}

function hasBusinessData(data = state) {
  return Boolean(
    data.users?.length ||
    data.leads?.length ||
    data.admissions?.length ||
    data.followups?.length ||
    data.attendanceStudents?.length ||
    data.attendanceSessions?.length ||
    data.campaigns?.length ||
    data.templates?.length
  );
}

function restoreLocalSafetyBackup() {
  let backup = null;
  try {
    backup = JSON.parse(localStorage.getItem(`${storeKey}.backup.latest`) || localStorage.getItem(`${storeKey}.backup.beforeReplace`) || "null");
  } catch {}
  if (!backup?.data) return alert("No local safety backup found in this browser yet.");
  const when = backup.savedAt ? new Date(backup.savedAt).toLocaleString("en-IN") : "unknown time";
  if (!confirm(`Restore local safety backup from ${when}? Current browser data will be replaced, but a before-restore copy will be kept.`)) return;
  backupBeforeReplace("restore local safety backup");
  state = backup.data;
  normalizeStateDefaults(state);
  masters = state.masters;
  localStorage.setItem(storeKey, JSON.stringify(state));
  localStorage.removeItem(`${storeKey}.currentUserId`);
  currentUser = null;
  loadCurrentUser();
  render();
  alert("Local safety backup restored. Please login again.");
}

function loadCurrentUser() {
  const userId = localStorage.getItem(`${storeKey}.currentUserId`);
  currentUser = state.users.find(user => user.id === userId) || null;
  updateAuthView();
}

async function loginUser(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const loginId = normalizeLogin(data.loginId);
  const password = String(data.password || "");
  let user = state.users.find(u => loginMatchesUser(loginId, u));
  const loginError = document.getElementById("loginError");
  if (!user) {
    const settings = getSheetSyncSettings();
    if (settings.auto && settings.url) {
      loginError.textContent = "Checking cloud database for this user...";
      loginError.classList.remove("hidden");
      await loadFromSheet({ silent: true });
      user = state.users.find(u => loginMatchesUser(loginId, u));
    }
  }
  if (!user) {
    loginError.textContent = "User not found. Use first name, full name, mobile, or email.";
    loginError.classList.remove("hidden");
    return;
  }
  if (password.length < 4) {
    loginError.textContent = "Password must be at least 4 characters.";
    loginError.classList.remove("hidden");
    return;
  }
  const passwordHash = await hashPassword(password);
  if (user.passwordHash && user.passwordHash !== passwordHash) {
    loginError.textContent = "Incorrect password.";
    loginError.classList.remove("hidden");
    return;
  }
  if (!user.passwordHash) {
    user.passwordHash = passwordHash;
    save();
  }
  currentUser = user;
  localStorage.setItem(`${storeKey}.currentUserId`, user.id);
  e.target.reset();
  loginError.classList.add("hidden");
  updateAuthView();
  render();
}

function logoutUser() {
  localStorage.removeItem(`${storeKey}.currentUserId`);
  currentUser = null;
  const loginScreen = document.getElementById("loginScreen");
  if (loginScreen) loginScreen.classList.remove("hidden");
  const badge = document.getElementById("currentUserBadge");
  if (badge) badge.textContent = hasLoginReady() ? "Logged out" : "Setup users";
  document.querySelectorAll("dialog[open]").forEach(dialog => dialog.close());
}

async function saveOwnPassword(e) {
  e.preventDefault();
  if (!currentUser) return;
  const data = Object.fromEntries(new FormData(e.target).entries());
  if (data.newPassword.length < 4) return alert("Password must be at least 4 characters.");
  if (data.newPassword !== data.confirmPassword) return alert("Passwords do not match.");
  const user = state.users.find(item => item.id === currentUser.id);
  if (!user) return;
  user.passwordHash = await hashPassword(data.newPassword);
  currentUser = user;
  save();
  e.target.reset();
  document.getElementById("passwordDialog").close();
  alert("Password updated.");
}

async function resetPasswordFromLogin(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const resetError = document.getElementById("resetPasswordError");
  const loginId = normalizeLogin(data.loginId);
  const user = state.users.find(item => loginMatchesUser(loginId, item));
  if (!user) {
    resetError.textContent = "User not found. Check first name, mobile, or email.";
    resetError.classList.remove("hidden");
    return;
  }
  if (String(data.newPassword || "").length < 4) {
    resetError.textContent = "Password must be at least 4 characters.";
    resetError.classList.remove("hidden");
    return;
  }
  if (data.newPassword !== data.confirmPassword) {
    resetError.textContent = "Passwords do not match.";
    resetError.classList.remove("hidden");
    return;
  }
  user.passwordHash = await hashPassword(data.newPassword);
  save();
  e.target.reset();
  resetError.classList.add("hidden");
  document.getElementById("resetPasswordDialog").close();
  const loginError = document.getElementById("loginError");
  loginError.textContent = "Password reset. Please login with your new password.";
  loginError.classList.remove("hidden");
}

function openResetPasswordDialog() {
  const dialog = document.getElementById("resetPasswordDialog");
  const loginValue = document.querySelector('#loginForm input[name="loginId"]')?.value || "";
  const form = document.getElementById("resetPasswordForm");
  form.reset();
  form.elements.loginId.value = loginValue;
  document.getElementById("resetPasswordError")?.classList.add("hidden");
  dialog.showModal();
}

function updateAuthView() {
  document.getElementById("loginScreen").classList.toggle("hidden", Boolean(currentUser) || !hasLoginReady());
  const badge = document.getElementById("currentUserBadge");
  if (badge) badge.textContent = currentUser ? `${currentUser.name} | ${currentUser.role}` : "Setup users";
  const passwordButton = document.getElementById("changePasswordBtn");
  if (passwordButton) passwordButton.disabled = !currentUser;
}

function normalizedRole(user = currentUser) {
  return String(user?.role || "").trim().toLowerCase();
}

function isSuperAdmin() {
  return normalizedRole() === "super admin";
}

function isLeadManager() {
  return normalizedRole() === "lead manager";
}

function canActOnLead(lead) {
  if (!currentUser) return false;
  if (isSuperAdmin() || isLeadManager()) return true;
  return lead.assignedTo === currentUser.name;
}

function canAssignLead() {
  return isSuperAdmin() || isLeadManager();
}

function canPermanentlyDelete() {
  return isSuperAdmin() || isLeadManager();
}

function canManageAllAttendance() {
  return isSuperAdmin() || isLeadManager();
}

function canSuperAdminEditAttendance() {
  return isSuperAdmin();
}

function attendanceAdminBranch() {
  return userBranchList(currentUser)[0] || "";
}

function userBranchList(user = currentUser) {
  const list = Array.isArray(user?.branchAccess) ? user.branchAccess : [];
  const branches = [...list];
  if (user?.branch && user.branch !== "Unassigned") branches.unshift(user.branch);
  return [...new Set(branches.map(branch => String(branch || "").trim()).filter(branch => branch && branch !== "Unassigned"))];
}

function userBranchLabel(user) {
  const branches = userBranchList(user);
  return branches.length ? branches.join(", ") : user?.branch || "Unassigned";
}

function canManageAttendanceBranch(branch) {
  if (!currentUser) return false;
  if (canSuperAdminEditAttendance() || isLeadManager()) return true;
  const ownBranches = userBranchList(currentUser).map(normalizeAttendanceChoice);
  return ownBranches.includes(normalizeAttendanceChoice(branch));
}

function hasLoginReady() {
  return state.users.length > 0;
}

function mergeReferenceOptions(values) {
  const oldDefaults = ["Walk-in", "Website enquiry", "WhatsApp campaign", "Instagram / Facebook", "YouTube", "Seminar", "Webinar", "School / college tie-up", "Reference", "Raw data calling", "Branch enquiry"];
  const custom = values.filter(value => !oldDefaults.includes(value));
  return [...new Set([...defaultMasters.sources, ...custom])];
}

function ensureProvidedPlanning(data) {
  providedPlanning.courses.forEach(course => addUnique(data.masters.courses, course));
  providedPlanning.branches.forEach(branch => addUnique(data.masters.branches, branch));
  providedPlanning.batches.forEach(batch => addUnique(data.masters.batches, batch));

  providedPlanning.targets.forEach(plan => {
    const exists = data.targets.some(target =>
      target.title === plan.title &&
      target.course === plan.course &&
      target.attempt === plan.attempt
    );
    if (!exists) {
      data.targets.push({
        id: id(),
        ...structuredClone(plan),
        createdAt: todayDate()
      });
    }
  });
}

function addUnique(list, value) {
  if (!list.includes(value)) list.push(value);
}

function isFreshResetPending() {
  return localStorage.getItem(`${storeKey}.resetGeneration`) !== resetGeneration;
}

function markFreshResetDone() {
  localStorage.setItem(`${storeKey}.resetGeneration`, resetGeneration);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabs();
  hydrateSelects();
  bindEvents();
  loadCurrentUser();
  applyTheme(getThemeSetting());
  ensureFixedSheetSync();
  startPeriodicSheetSync();
  if (isFreshResetPending()) {
    markFreshResetDone();
    saveToSheet({ silent: true });
    setSheetStatus("Fresh CRM reset is ready. Old cloud records were not loaded.", "ok");
  } else if (getSheetSyncSettings().auto && getSheetSyncSettings().url) {
    loadFromSheet({ silent: true });
  }
  clearCampaignForm();
  render();
});

function renderTabs() {
  const nav = document.getElementById("tabs");
  nav.innerHTML = accessibleTabs().map(([key, label]) => `<button data-tab="${key}">${label}</button>`).join("");
}

function bindEvents() {
  document.getElementById("tabs").addEventListener("click", e => {
    if (!e.target.dataset.tab) return;
    activeTab = e.target.dataset.tab;
    render();
  });
  document.getElementById("loginForm").addEventListener("submit", loginUser);
  document.getElementById("logoutBtn").addEventListener("click", logoutUser);
  document.getElementById("changePasswordBtn").addEventListener("click", () => document.getElementById("passwordDialog").showModal());
  document.querySelectorAll("[data-close-password]").forEach(b => b.addEventListener("click", () => document.getElementById("passwordDialog").close()));
  document.getElementById("passwordForm").addEventListener("submit", saveOwnPassword);
  document.getElementById("openResetPassword").addEventListener("click", openResetPasswordDialog);
  document.querySelectorAll("[data-close-reset-password]").forEach(b => b.addEventListener("click", () => document.getElementById("resetPasswordDialog").close()));
  document.getElementById("resetPasswordForm").addEventListener("submit", resetPasswordFromLogin);
  document.getElementById("themeSelect").addEventListener("change", e => setTheme(e.target.value));
  document.getElementById("globalSearch").addEventListener("input", render);
  document.getElementById("addLeadTop").addEventListener("click", openLeadForm);
  document.querySelector("[data-open-form]").addEventListener("click", openLeadForm);
  document.querySelector("[data-open-bulk]").addEventListener("click", () => document.getElementById("bulkDialog").showModal());
  document.querySelectorAll("[data-close-modal]").forEach(b => b.addEventListener("click", () => document.getElementById("leadDialog").close()));
  document.querySelectorAll("[data-close-bulk]").forEach(b => b.addEventListener("click", () => document.getElementById("bulkDialog").close()));
  document.querySelectorAll("[data-close-followup]").forEach(b => b.addEventListener("click", () => document.getElementById("followupDialog").close()));
  document.querySelectorAll("[data-close-admission]").forEach(b => b.addEventListener("click", () => document.getElementById("admissionDialog").close()));
  document.querySelectorAll("[data-close-assign-admin]").forEach(b => b.addEventListener("click", () => document.getElementById("assignAdminDialog").close()));
  document.querySelectorAll("[data-close-legacy-sheet]").forEach(b => b.addEventListener("click", () => document.getElementById("legacySheetDialog").close()));
  document.querySelectorAll("[data-close-admission-sheet]").forEach(b => b.addEventListener("click", () => document.getElementById("admissionSheetDialog").close()));
  document.getElementById("leadForm").addEventListener("submit", saveLead);
  document.getElementById("educationLevel").addEventListener("change", updateEducationFields);
  document.getElementById("referenceType").addEventListener("change", updateReferenceFields);
  document.getElementById("followupForm").addEventListener("submit", saveFollowup);
  document.getElementById("admissionForm").addEventListener("submit", saveAdmission);
  document.getElementById("attendanceBatchForm").addEventListener("submit", saveAttendanceBatch);
  document.getElementById("attendanceSessionForm").addEventListener("submit", saveAttendanceSession);
  document.getElementById("assignAdminForm").addEventListener("submit", saveAdminAssignment);
  document.getElementById("targetPlanForm").addEventListener("submit", saveTargetPlan);
  document.getElementById("campaignForm").addEventListener("submit", saveCampaign);
  document.getElementById("templateForm").addEventListener("submit", saveTemplate);
  document.getElementById("userForm").addEventListener("submit", saveUser);
  document.getElementById("parseBulk").addEventListener("click", parseBulk);
  document.getElementById("saveBulk").addEventListener("click", saveBulk);
  document.getElementById("exportLeads")?.addEventListener("click", () => alert("Export is disabled."));
  document.getElementById("exportAdmissions")?.addEventListener("click", () => alert("Export is disabled."));
  document.getElementById("exportCampaigns")?.addEventListener("click", () => alert("Export is disabled."));
  document.body.addEventListener("click", routeActions);
  document.body.addEventListener("submit", routeDynamicForms);
  document.body.addEventListener("change", routeSelectActions);
  document.body.addEventListener("input", routeAttendanceFilterInputs);
  document.body.addEventListener("change", routeAttendanceTextEdits);
  document.body.addEventListener("mousedown", startAttendanceColumnResize);
  document.addEventListener("copy", blockProtectedCopy);
  document.addEventListener("cut", blockProtectedCopy);
  document.addEventListener("contextmenu", blockProtectedContextMenu);
}

function routeDynamicForms(e) {
  if (e.defaultPrevented) return;
  if (e.target?.id === "settingsUserForm") {
    saveUser(e);
  }
}

function isProtectedDataElement(element) {
  return Boolean(element?.closest?.("#leadTable, #archiveTable, #followupTable, #admissionTable, #attendanceGrid, #attendanceReport, #campaignTable, #sourceReport, #branchReport, #adminPerformance, #dashboardFollowups, #untouchedLeads"));
}

function blockProtectedCopy(e) {
  if (!isProtectedDataElement(e.target)) return;
  e.preventDefault();
  alert("Copying main CRM data is disabled.");
}

function blockProtectedContextMenu(e) {
  if (!isProtectedDataElement(e.target)) return;
  e.preventDefault();
}

function hydrateSelects() {
  fillSelects("course", masters.courses);
  fillSelects("branch", masters.branches);
  fillSelects("branchAccess", masters.branches);
  fillSelects("source", masters.sources);
  fillSelects("status", masters.statuses);
  fillSelects("stage", masters.statuses);
  fillSelects("role", masters.roles);
  fillSelects("batch", masters.batches);
  fillSelects("assignedTo", state.users.map(u => u.name));
  fillSelects("counsellor", state.users.map(u => u.name));
}
function fillSelects(name, values) {
  document.querySelectorAll(`[name="${name}"]`).forEach(select => {
    const current = select.value;
    const finalValues = ["branch", "batch"].includes(name) ? ["Unassigned", ...values.filter(v => v !== "Unassigned")] : values;
    select.innerHTML = finalValues.map(v => `<option>${v}</option>`).join("");
    if (finalValues.includes(current)) select.value = current;
  });
}

function render() {
  if (!currentUser && hasLoginReady()) {
    updateAuthView();
    return;
  }
  renderTabs();
  if (!canSeeTab(activeTab)) activeTab = accessibleTabs()[0]?.[0] || "leads";
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === activeTab));
  document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === activeTab));
  document.getElementById("pageTitle").textContent = tabs.find(t => t[0] === activeTab)?.[1] || "Leads";
  document.getElementById("addLeadTop").disabled = !currentUser;
  updateAuthView();
  hydrateSelects();
  renderFilters();
  if (activeTab === "leads") renderLeadTable();
  if (activeTab === "archive") renderArchive();
  if (activeTab === "admissions") renderAdmissions();
  if (activeTab === "attendance") renderAttendance();
  if (activeTab === "reports") renderReports();
  if (activeTab === "users") renderUsers();
  if (activeTab === "settings") renderSettings();
}

function activeLeads() {
  return state.leads.filter(l => !l.archivedAt);
}

function archivedLeads() {
  return state.leads.filter(l => l.archivedAt);
}

function archivedAttendanceStudents() {
  return state.attendanceStudents.filter(student => student.archivedAt);
}

function accessibleTabs(user = currentUser) {
  if (!user || isSuperAdminUser(user)) return tabs;
  const allowed = Array.isArray(user.tabAccess) && user.tabAccess.length ? normalizeUserTabAccess(user.tabAccess) : roleTabDefaults(user.role);
  return tabs.filter(([key]) => allowed.includes(key));
}

function canSeeTab(tabKey, user = currentUser) {
  return accessibleTabs(user).some(([key]) => key === tabKey);
}

function isSuperAdminUser(user) {
  return normalizedRole(user) === "super admin";
}

function filteredLeads(prefix = "lead") {
  const q = document.getElementById("globalSearch").value.trim().toLowerCase();
  return activeLeads().filter(l => {
    const searchOk = !q || [displayLeadName(l), l.studentMobile, l.parentMobile].join(" ").toLowerCase().includes(q);
    return searchOk && ["course", "branch", "source", "status", "assignedTo"].every(key => {
      const el = document.getElementById(`${prefix}-${key}`);
      return !el || !el.value || l[key] === el.value;
    });
  });
}

function renderDashboard() {
  const leads = filteredLeads();
  const converted = leads.filter(l => l.status === "Converted / Admitted").length;
  const overdue = leads.filter(isOverdue).length;
  const pending = leads.filter(l => l.followupAt && l.status !== "Converted / Admitted").length;
  const untouched = untouchedLeads(leads);
  const metrics = [
    ["Total leads", leads.length, "totalLeads"],
    ["New leads", countBy(leads, "status")["New Lead"] || 0, "newLeads"],
    ["Contacted", countBy(leads, "status")["Contacted"] || 0, "contacted"],
    ["Untouched leads", untouched.length, "untouched"],
    ["Campaigns", state.campaigns.length, "campaigns"],
    ["Pending follow-ups", pending, "pendingFollowups"],
    ["Overdue follow-ups", overdue, "overdueFollowups"],
    ["Converted", converted, "converted"],
    ["Conversion ratio", leads.length ? `${Math.round(converted / leads.length * 100)}%` : "0%", "reports"],
    ["Lost leads", (countBy(leads, "status")["Lost Lead"] || 0) + (countBy(leads, "status")["Not Interested"] || 0), "lost"]
  ];
  document.getElementById("metricGrid").innerHTML = metrics.map(m => metric(m[0], m[1], m[2])).join("");
  renderBarList("courseChart", countBy(leads, "course"));
  table("dashboardFollowups", leads.filter(l => dueToday(l) || isOverdue(l)), ["Student", "Mobile", "Course", "Admin", "Follow-up", "Status"], l => [displayLeadName(l), l.studentMobile, l.course, l.assignedTo, formatDate(l.followupAt), statusText(l.status)]);
  table("untouchedLeads", untouched, ["Student", "Mobile", "Course", "Admin", "Untouched Since"], l => [displayLeadName(l), l.studentMobile, l.course, l.assignedTo, untouchedLabel(l)]);
}

function metric(label, value, action = "") {
  return `<button class="metric metric-link" type="button" data-dashboard-metric="${action}" title="Open ${escapeAttr(label)}"><span>${label}</span><strong>${value}</strong></button>`;
}
function countBy(rows, key) { return rows.reduce((a, r) => (a[r[key] || "Blank"] = (a[r[key] || "Blank"] || 0) + 1, a), {}); }
function renderBarList(idName, counts) {
  const max = Math.max(1, ...Object.values(counts));
  document.getElementById(idName).innerHTML = Object.entries(counts).map(([name, value]) => `<div class="bar-row"><span>${name}</span><div class="bar"><span style="width:${value / max * 100}%"></span></div><strong>${value}</strong></div>`).join("") || "<p class='muted'>No data yet.</p>";
}
function renderAdminPerformance() {
  const target = document.getElementById("adminPerformance");
  if (!target) return;
  const admissionRows = admissionViewRows({ applyFilters: false }).filter(admissionRowMatchesReportFilters);
  const rows = state.users.map(user => {
    const rowsForAdmin = admissionRows.filter(row => admissionRowCounsellor(row) === user.name);
    const admitted = rowsForAdmin.filter(row => admissionFilterStatus(row) === "Converted / Admitted").length;
    const pending = rowsForAdmin.filter(row => admissionFilterStatus(row) !== "Converted / Admitted").length;
    const followups = rowsForAdmin.filter(row => row.followupAt && admissionFilterStatus(row) !== "Converted / Admitted").length;
    return {
      name: user.name,
      admissions: rowsForAdmin.length,
      admitted,
      pending,
      followups,
      ratio: rowsForAdmin.length ? `${Math.round(admitted / rowsForAdmin.length * 100)}%` : "0%"
    };
  }).filter(row => row.admissions || row.followups || row.admitted || row.pending);
  table("adminPerformance", rows, ["Admin", "Admission Records", "Admitted", "Yet to Admit", "Follow-ups", "Admission Ratio"], r => [r.name, r.admissions, r.admitted, r.pending, r.followups, r.ratio]);
}

function openDashboardMetric(action) {
  const routes = {
    totalLeads: { tab: "leads", prefix: "lead", filters: {} },
    newLeads: { tab: "leads", prefix: "lead", filters: { status: "New Lead" } },
    contacted: { tab: "leads", prefix: "lead", filters: { status: "Contacted" } },
    untouched: { tab: "dashboard", scrollTo: "untouchedLeads" },
    campaigns: { tab: "campaigns" },
    pendingFollowups: { tab: "followups", prefix: "followup", filters: {} },
    overdueFollowups: { tab: "followups", prefix: "followup", filters: {} },
    converted: { tab: "admissions" },
    reports: { tab: "reports" },
    lost: { tab: "leads", prefix: "lead", filters: { status: "Lost Lead" } }
  };
  const route = routes[action];
  if (!route) return;
  if (!canSeeTab(route.tab)) {
    alert("This tab is not available for your login.");
    return;
  }
  activeTab = route.tab;
  render();
  if (route.prefix) {
    clearFilterValues(route.prefix);
    Object.entries(route.filters || {}).forEach(([key, value]) => setFilterValue(route.prefix, key, value));
    render();
  }
  if (route.scrollTo) {
    document.getElementById(route.scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function clearFilterValues(prefix) {
  document.querySelectorAll(`[id^="${prefix}-"]`).forEach(el => { el.value = ""; });
}

function setFilterValue(prefix, key, value) {
  const el = document.getElementById(`${prefix}-${key}`);
  if (el && [...el.options].some(option => option.value === value)) el.value = value;
}

function renderFilters() {
  buildFilters("leadFilters", "lead");
  buildFilters("followupFilters", "followup");
  buildFilters("admissionFilters", "admission");
  buildFilters("reportFilters", "report");
}
function buildFilters(containerId, prefix) {
  const currentValues = {};
  ["course", "branch", "source", "status", "assignedTo", "followupDate"].forEach(key => {
    const el = document.getElementById(`${prefix}-${key}`);
    if (el) currentValues[key] = el.value;
  });
  const html = [
    selectFilter(prefix, "course", "Course", masters.courses),
    selectFilter(prefix, "branch", "Branch", masters.branches),
    selectFilter(prefix, "source", "Reference", masters.sources),
    selectFilter(prefix, "status", "Lead status", prefix === "admission" ? [...new Set([...masters.statuses, "Yet to Take Admission"])] : masters.statuses),
    selectFilter(prefix, "assignedTo", "Admin", state.users.map(u => u.name)),
    prefix === "admission" ? `<label class="inline-date-filter">Follow-up <input id="${prefix}-followupDate" type="date"></label>` : "",
    `<button data-clear-filters="${prefix}">Clear</button>`
  ].filter(Boolean).join("");
  const el = document.getElementById(containerId);
  if (el) {
    el.innerHTML = html;
    Object.entries(currentValues).forEach(([key, value]) => {
      const input = document.getElementById(`${prefix}-${key}`);
      if (input && [...input.options].some(option => option.value === value)) input.value = value;
    });
    if (!el.dataset.ready) {
      el.dataset.ready = "1";
      el.addEventListener("change", render);
    }
  }
}
function selectFilter(prefix, key, label, values) {
  return `<select id="${prefix}-${key}"><option value="">${label}</option>${values.map(v => `<option>${v}</option>`).join("")}</select>`;
}

function renderLeadTable() {
  const leads = filteredLeads("lead");
  const columns = activeLeadColumns();
  table("leadTable", leads, columns.map(column => column.label), lead => columns.map(column => leadColumnValue(lead, column.key)));
}

function activeLeadColumns() {
  return (state.leadColumns && state.leadColumns.length ? state.leadColumns : defaultLeadColumns)
    .filter(column => column?.key)
    .map(column => ({ key: column.key, label: column.label || leadColumnLabel(column.key) }));
}

function leadColumnValue(lead, key) {
  const standard = {
    createdAt: leadCreatedStamp(lead),
    leadAge: leadAge(lead),
    lastEdited: untouchedLabel(lead),
    name: displayLeadName(lead),
    firstName: lead.firstName || firstNameOf(displayLeadName(lead)),
    lastName: lead.lastName || "",
    studentMobile: lead.studentMobile,
    parentMobile: lead.parentMobile,
    email: lead.email,
    location: lead.location,
    course: lead.course,
    attempt: lead.attempt || "",
    branch: lead.branch,
    batch: lead.batch,
    leadSource: lead.leadSource || "",
    source: lead.source || "",
    referenceDetails: referenceDetails(lead),
    status: statusText(lead.status || ""),
    assignedTo: lead.assignedTo,
    followupAt: dueLabel(lead),
    remarks: escapeHtml(lead.remarks || "").replaceAll("\n", "<br>"),
    actions: actionButtons(lead)
  };
  if (Object.prototype.hasOwnProperty.call(standard, key)) return standard[key];
  return escapeHtml(lead.customFields?.[key] || "");
}

function renderArchive() {
  table("archiveTable", archivedLeads(), ["Name", "Mobile", "Course", "Archived on", "Archived by", "Actions"], l => [
    displayLeadName(l),
    l.studentMobile,
    l.course,
    formatDate(l.archivedAt),
    l.archivedBy || "Admin",
    `<button data-restore-lead="${l.id}">Restore</button> <button data-permanent-delete="${l.id}" class="danger-btn">Permanent Delete</button>`
  ]);
  renderAttendanceArchive();
}

function renderAttendanceArchive() {
  const target = document.getElementById("attendanceArchiveTable");
  if (!target) return;
  table("attendanceArchiveTable", archivedAttendanceStudents(), ["Student", "Batch", "Branch", "Archived on", "Archived by", "Actions"], student => [
    `${escapeHtml(student.firstName || "")} ${escapeHtml(student.lastName || student.lastInitial || "")}`,
    escapeHtml(student.batch || ""),
    escapeHtml(student.branch || ""),
    formatDate(student.archivedAt),
    escapeHtml(student.archivedBy || ""),
    `<button data-restore-attendance-student="${student.id}">Restore</button> ${isSuperAdmin() ? `<button data-permanent-delete-attendance-student="${student.id}" class="danger-btn">Permanent Delete</button>` : "<span class='locked-action'>Super Admin only</span>"}`
  ]);
}

function renderFollowups() {
  const leads = filteredLeads("followup").filter(l => l.followupAt);
  table("followupTable", leads, ["Student", "Mobile", "Course", "Branch", "Admin", "Follow-up", "Status", "Latest remark", "Actions"], l => [
    displayLeadName(l), l.studentMobile, l.course, l.branch, l.assignedTo, dueLabel(l), statusText(l.status), l.remarks || "", `<button data-followup="${l.id}">Update</button> <button data-wa="${l.id}">WhatsApp</button>`
  ]);
}

function admissionViewRows({ applyFilters = true } = {}) {
  const statusFilter = document.getElementById("admission-status")?.value || "";
  const rows = [];
  const seen = new Set();
  const pushUnique = row => {
    if (applyFilters && !admissionRowMatchesFilters(row)) return;
    const key = admissionViewKey(row);
    if (seen.has(key)) return;
    seen.add(key);
    rows.push(row);
  };

  admissionsWithLead().forEach(row => pushUnique({
    ...row,
    course: row.course || attendanceCourseFromBatch(row.batch || ""),
    branch: row.branch || attendanceBatchLocation(row.batch || "") || "",
    recordSource: "Admission",
    leadStatus: row.status || "Converted / Admitted",
    admissionDisplayStatus: "Converted / Admitted",
    counsellor: admissionRowCounsellor(row),
    assignedTo: admissionRowCounsellor(row)
  }));

  attendanceRoster()
    .filter(student => canAccessAttendanceBatch(student.batch, student.branch))
    .filter(student => admissionAttendanceMatchesStatus(student, statusFilter))
    .forEach(student => pushUnique(attendanceStudentToAdmissionView(student, statusFilter)));

  activeLeads()
    .filter(lead => !lead.archivedAt)
    .filter(lead => canViewAdmissionLead(lead))
    .filter(lead => !hasAdmissionForLead(lead))
    .filter(lead => !hasAttendanceAdmissionViewForLead(lead))
    .filter(lead => lead.status !== "Converted / Admitted")
    .forEach(lead => pushUnique({
      ...lead,
      batch: lead.batch || "Unassigned",
      counsellor: admissionRowCounsellor(lead),
      assignedTo: admissionRowCounsellor(lead),
      recordSource: "Lead",
      leadStatus: lead.status || "New Lead",
      admissionDisplayStatus: statusFilter ? lead.status || "New Lead" : "Yet to Take Admission",
      balance: ""
    }));

  return sortAdmissionRows(rows);
}

function admissionStatusSort(row) {
  return row.admissionDisplayStatus === "Converted / Admitted" ? "0" : "1";
}

function sortAdmissionRows(rows) {
  const factor = admissionSort.direction === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => {
    const left = admissionSortValue(a, admissionSort.key);
    const right = admissionSortValue(b, admissionSort.key);
    if (left === right) {
      return `${admissionStatusSort(a)}|${a.batch || ""}|${a.admissionDate || ""}|${displayLeadName(a)}`.localeCompare(`${admissionStatusSort(b)}|${b.batch || ""}|${b.admissionDate || ""}|${displayLeadName(b)}`, undefined, { numeric: true, sensitivity: "base" });
    }
    return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }) * factor;
  });
}

function admissionSortValue(row, key) {
  const values = {
    name: displayLeadName(row) || row.studentName || "",
    mobile: row.studentMobile || "",
    course: row.course || "",
    batch: row.batch || "",
    branch: row.branch || "",
    studentId: row.studentId || row.receiptNumber || "",
    status: admissionFilterStatus(row),
    leadStatus: row.leadStatus || "",
    admissionDate: row.admissionDate || "",
    followupAt: row.followupAt || "",
    counsellor: admissionRowCounsellor(row),
    source: row.recordSource || ""
  };
  return String(values[key] ?? "").toLowerCase();
}

function hasAdmissionForLead(lead) {
  return state.admissions.some(admission => admission.leadId === lead.id && !admission.archivedAt);
}

function hasAttendanceAdmissionViewForLead(lead) {
  return attendanceRoster().some(student => attendanceStudentMatchesLead(student, lead));
}

function attendanceStudentMatchesLead(student, lead) {
  if (student.leadId && student.leadId === lead.id) return true;
  const leadPhone = onlyPhone(lead.studentMobile || "");
  const studentPhone = onlyPhone(student.studentMobile || student.mobile || "");
  if (leadPhone && studentPhone && leadPhone === studentPhone) return true;
  const leadName = normalizePersonName(displayLeadName(lead));
  const studentName = normalizePersonName([student.firstName, student.lastName || student.lastInitial].filter(Boolean).join(" "));
  if (!leadName || !studentName || leadName !== studentName) return false;
  const leadBatch = normalizeAttendanceChoice(lead.batch || "");
  const studentBatch = normalizeAttendanceChoice(student.batch || "");
  if (leadBatch && studentBatch && leadBatch !== studentBatch) return false;
  const leadBranch = normalizeAttendanceChoice(lead.branch || "");
  const studentBranch = normalizeAttendanceChoice(student.branch || "");
  if (leadBranch && studentBranch && leadBranch !== studentBranch) return false;
  return true;
}

function leadForAttendanceStudent(student) {
  return activeLeads().find(lead => !lead.archivedAt && attendanceStudentMatchesLead(student, lead)) || null;
}

function branchInchargeName(branch = "") {
  const normalizedBranch = normalizeAttendanceChoice(branch);
  if (!normalizedBranch) return "";
  const primary = state.users.find(user => !isSuperAdminUser(user) && normalizeAttendanceChoice(user.branch || "") === normalizedBranch);
  if (primary) return primary.name;
  const accessUser = state.users.find(user => !isSuperAdminUser(user) && userBranchList(user).map(normalizeAttendanceChoice).includes(normalizedBranch));
  return accessUser?.name || "";
}

function effectiveCounsellorForBranch(branch = "", saved = "") {
  const branchHandler = branchInchargeName(branch);
  if (branchHandler && shouldUseBranchCounsellor(saved)) return branchHandler;
  return saved || branchHandler || "";
}

function admissionRowBranch(row = {}) {
  return row.branch || attendanceBatchLocation(row.batch || "") || "";
}

function admissionRowCounsellor(row = {}) {
  return effectiveCounsellorForBranch(admissionRowBranch(row), row.counsellor || row.assignedTo || row.createdBy || "");
}

function defaultCounsellorForBranch(branch = "", fallback = "") {
  return branchInchargeName(branch) || fallback || state.users.find(user => !isSuperAdminUser(user))?.name || state.users[0]?.name || "";
}

function shouldUseBranchCounsellor(assignedTo = "") {
  if (!assignedTo) return true;
  const user = state.users.find(item => item.name === assignedTo);
  return Boolean(user && isSuperAdminUser(user));
}

function applyBranchCounsellor(lead) {
  const branchHandler = branchInchargeName(lead.branch || "");
  if (branchHandler && shouldUseBranchCounsellor(lead.assignedTo)) lead.assignedTo = branchHandler;
  return lead;
}

function canViewAdmissionLead(lead) {
  if (!currentUser || canManageAllAttendance()) return true;
  const userName = normalizePersonName(currentUser.name || "");
  if (normalizePersonName(admissionRowCounsellor(lead)) === userName) return true;
  if (normalizePersonName(lead.assignedTo || "") === userName) return true;
  const allowedBranches = userBranchList(currentUser).map(normalizeAttendanceChoice);
  return allowedBranches.includes(normalizeAttendanceChoice(lead.branch || ""));
}

function admissionRowMatchesFilters(row) {
  return ["course", "branch", "source", "status", "assignedTo", "followupDate"].every(key => {
    const selected = document.getElementById(`admission-${key}`)?.value || "";
    if (!selected) return true;
    if (key === "status") return admissionFilterStatus(row) === selected;
    if (key === "followupDate") return String(row.followupAt || "").slice(0, 10) === selected;
    if (key === "assignedTo") return admissionRowCounsellor(row) === selected;
    if (key === "source") return String(row.source || row.leadSource || row.recordSource || "") === selected;
    return String(row[key] || "") === selected;
  });
}

function admissionRowMatchesReportFilters(row) {
  return ["course", "branch", "source", "status", "assignedTo"].every(key => {
    const selected = document.getElementById(`report-${key}`)?.value || "";
    if (!selected) return true;
    if (key === "status") return admissionFilterStatus(row) === selected;
    if (key === "assignedTo") return admissionRowCounsellor(row) === selected;
    if (key === "source") return String(row.source || row.leadSource || row.recordSource || "") === selected;
    return String(row[key] || "") === selected;
  });
}

function admissionFilterStatus(row) {
  if (row.recordSource === "Admission") return "Converted / Admitted";
  if (row.recordSource === "Attendance" && hasAttendanceAdmissionDetails(row)) return "Converted / Admitted";
  return row.leadStatus || row.status || row.studentType || "";
}

function hasAttendanceAdmissionDetails(student) {
  const studentId = String(student.studentId || "").trim();
  return Boolean(studentId && !/demo/i.test(studentId) && String(student.admissionDate || "").trim());
}

function admissionViewKey(row) {
  if (row.leadId) return `lead:${row.leadId}`;
  if (row.recordSource === "Lead" && row.id) return `lead:${row.id}`;
  const phone = onlyPhone(row.studentMobile || row.mobile || "");
  if (phone) return `phone:${phone}`;
  const name = normalizePersonName(displayLeadName(row) || row.studentName || "");
  return `name:${name}|${normalizeAttendanceChoice(row.batch || "")}|${normalizeAttendanceChoice(row.branch || "")}`;
}

function admissionAttendanceMatchesStatus(student, statusFilter) {
  if (!statusFilter) return true;
  const linkedLead = leadForAttendanceStudent(student);
  const status = hasAttendanceAdmissionDetails(student) ? "Converted / Admitted" : linkedLead?.status || student.leadStatus || "Yet to Take Admission";
  return status === statusFilter;
}

function attendanceStudentToAdmissionView(student, statusFilter) {
  const linkedLead = leadForAttendanceStudent(student);
  const isAdmitted = hasAttendanceAdmissionDetails(student);
  const leadStatus = isAdmitted ? "Converted / Admitted" : linkedLead?.status || student.leadStatus || "Yet to Take Admission";
  const displayStatus = isAdmitted ? "Converted / Admitted" : statusFilter ? leadStatus : "Yet to Take Admission";
  const branch = student.branch || attendanceBatchLocation(student.batch || "") || "";
  const counsellor = effectiveCounsellorForBranch(branch, student.counsellor || linkedLead?.assignedTo || student.createdBy || "");
  return {
    id: `attendance-view-${student.id}`,
    leadId: student.leadId || linkedLead?.id || "",
    admissionId: student.admissionId || "",
    attendanceStudentId: student.id,
    firstName: student.firstName || "",
    lastName: student.lastName || student.lastInitial || "",
    studentName: [student.firstName, student.lastName || student.lastInitial].filter(Boolean).join(" "),
    studentMobile: student.studentMobile || student.mobile || linkedLead?.studentMobile || "",
    course: linkedLead?.course || attendanceCourseFromBatch(student.batch || ""),
    batch: student.batch || "Unassigned",
    branch,
    admissionDate: student.admissionDate || "",
    feesAgreed: "",
    feesPaid: "",
    balance: "",
    paymentMode: "",
    receiptNumber: student.studentId || "",
    studentId: student.studentId || "",
    counsellor,
    assignedTo: counsellor,
    followupAt: linkedLead?.followupAt || "",
    source: linkedLead?.source || "Attendance",
    recordSource: "Attendance",
    studentType: student.studentType || "",
    leadStatus,
    admissionDisplayStatus: displayStatus
  };
}

function renderAdmissions() {
  const target = document.getElementById("admissionTable");
  const rows = admissionViewRows();
  const columns = [
    ["name", "Student"],
    ["mobile", "Mobile"],
    ["course", "Course"],
    ["batch", "Batch"],
    ["branch", "Branch"],
    ["studentId", "Student ID"],
    ["status", "Admission Status"],
    ["leadStatus", "Lead Status"],
    ["admissionDate", "Admission Date"],
    ["followupAt", "Next Follow-up"],
    ["counsellor", "Counsellor"],
    ["source", "Source"]
  ];
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = "<p class='muted'>No records found.</p>";
    return;
  }
  target.innerHTML = `<table>
    <thead><tr>${columns.map(([key, label]) => `<th><button class="table-sort" type="button" data-admission-sort="${key}">${escapeHtml(label)}${admissionSort.key === key ? ` ${admissionSort.direction === "asc" ? "▲" : "▼"}` : ""}</button></th>`).join("")}</tr></thead>
    <tbody>${rows.map(row => `<tr>
      <td>${escapeHtml(displayLeadName(row) || row.studentName || "Student")}</td>
      <td>${escapeHtml(row.studentMobile || "")}</td>
      <td>${escapeHtml(row.course || "")}</td>
      <td>${escapeHtml(row.batch || "")}</td>
      <td>${escapeHtml(row.branch || "")}</td>
      <td>${escapeHtml(row.studentId || row.receiptNumber || "")}</td>
      <td>${statusText(row.admissionDisplayStatus || "")}</td>
      <td>${admissionLeadStatusCell(row)}</td>
      <td>${admissionDateCell(row)}</td>
      <td>${dueLabel(row)}</td>
      <td>${admissionCounsellorCell(row)}</td>
      <td>${escapeHtml(row.recordSource || "")}</td>
    </tr>`).join("")}</tbody>
  </table>`;
}

function admissionLeadStatusCell(row) {
  if (admissionFilterStatus(row) === "Converted / Admitted") return statusText(row.leadStatus || "Converted / Admitted");
  const options = [...new Set(["Yet to Take Admission", ...masters.statuses.filter(status => status !== "Converted / Admitted")])];
  const value = row.leadStatus || "Yet to Take Admission";
  const recordKey = admissionRecordKey(row);
  return `<select class="compact-select" data-admission-lead-status="${escapeAttr(recordKey)}">
    ${options.map(status => `<option value="${escapeAttr(status)}" ${status === value ? "selected" : ""}>${escapeHtml(status)}</option>`).join("")}
  </select>`;
}

function admissionDateCell(row) {
  if (row.recordSource === "Attendance") {
    return `<input class="compact-date" type="date" data-admission-date="${escapeAttr(admissionRecordKey(row))}" value="${escapeAttr(normalizeDateInput(row.admissionDate || "") || row.admissionDate || "")}">`;
  }
  return escapeHtml(row.admissionDate || "");
}

function admissionRecordKey(row) {
  if (row.recordSource === "Attendance") return `attendance:${row.attendanceStudentId || row.id.replace(/^attendance-view-/, "")}`;
  if (row.recordSource === "Lead") return `lead:${row.id}`;
  if (row.recordSource === "Admission") return `admission:${row.id || row.admissionId || ""}`;
  return `${row.recordSource || "row"}:${row.id || ""}`;
}

function renderAdmissions() {
  const target = document.getElementById("admissionTable");
  const rows = admissionViewRows();
  const columns = [
    ["delete", ""],
    ["name", "Student"],
    ["mobile", "Mobile"],
    ["course", "Course"],
    ["batch", "Batch"],
    ["branch", "Branch"],
    ["studentId", "Student ID"],
    ["status", "Admission Status"],
    ["leadStatus", "Lead Status"],
    ["admissionDate", "Admission Date"],
    ["followupAt", "Next Follow-up"],
    ["counsellor", "Counsellor"],
    ["source", "Source"]
  ];
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = "<p class='muted'>No records found.</p>";
    return;
  }
  target.innerHTML = `<table>
    <thead><tr>${columns.map(([key, label]) => key === "delete" ? `<th class="delete-col"></th>` : `<th><button class="table-sort" type="button" data-admission-sort="${key}">${escapeHtml(label)}${admissionSort.key === key ? ` ${admissionSort.direction === "asc" ? "^" : "v"}` : ""}</button></th>`).join("")}</tr></thead>
    <tbody>${rows.map(row => `<tr>
      <td class="delete-col">${admissionDeleteCell(row)}</td>
      <td>${escapeHtml(displayLeadName(row) || row.studentName || "Student")}</td>
      <td>${escapeHtml(row.studentMobile || "")}</td>
      <td>${escapeHtml(row.course || "")}</td>
      <td>${escapeHtml(row.batch || "")}</td>
      <td>${escapeHtml(row.branch || "")}</td>
      <td>${escapeHtml(row.studentId || row.receiptNumber || "")}</td>
      <td>${statusText(row.admissionDisplayStatus || "")}</td>
      <td>${admissionLeadStatusCell(row)}</td>
      <td>${admissionDateCell(row)}</td>
      <td>${dueLabel(row)}</td>
      <td>${admissionCounsellorCell(row)}</td>
      <td>${escapeHtml(row.recordSource || "")}</td>
    </tr>`).join("")}</tbody>
  </table>`;
}

function admissionDeleteCell(row) {
  return `<button class="pill-remove admission-delete" data-admission-delete="${escapeAttr(admissionRecordKey(row))}" type="button" title="Archive">x</button>`;
}

function admissionCounsellorCell(row) {
  const value = admissionRowCounsellor(row);
  const recordKey = admissionRecordKey(row);
  const names = [...new Set([value, ...state.users.map(user => user.name)].filter(Boolean))];
  return `<select class="compact-select" data-admission-counsellor="${escapeAttr(recordKey)}">
    ${names.map(name => `<option value="${escapeAttr(name)}" ${name === value ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
  </select>`;
}

function renderAttendance() {
  prepareAttendanceForms();
  const filters = currentAttendanceFilters();
  renderAttendanceFilters(filters);
  const selectedBatch = filters.batch;
  const selectedBranch = filters.branch;
  const statusFilter = selectedAttendanceStatusFilter();
  const batchGroupFilter = selectedAttendanceBatchGroupFilter();
  const sortField = selectedAttendanceSortField();
  const sortDirection = selectedAttendanceSortDirection();
  const batches = selectedBatch ? [selectedBatch] : attendanceBatchChoices();
  const sections = (batches.length ? batches : ["Unassigned"]).filter(batch => {
    if (!selectedBranch || selectedBatch) return true;
    return sameAttendanceChoice(attendanceBatchLocation(batch) || "Unassigned", selectedBranch);
  }).map(batch => {
    const branch = attendanceBatchLocation(batch) || selectedBranch || "";
    const sessions = attendanceRangeSessions(batch, branch);
    const students = sortAttendanceStudents(attendanceRoster()
      .filter(student => !batch || student.batch === batch)
      .filter(student => !branch || sameAttendanceChoice(student.branch || "Unassigned", branch))
      .filter(student => !batchGroupFilter || student.batchGroup === batchGroupFilter)
      .filter(student => attendanceStudentMatchesStatus(student, sessions, statusFilter)), sortField, sortDirection);
    return { batch, branch, students, sessions };
  });
  renderAttendanceGrid(sections);
}

function currentAttendanceFilters() {
  const batch = document.getElementById("attendance-batch")?.value || "";
  const branch = document.getElementById("attendance-branch")?.value || "";
  const fromDate = document.getElementById("attendance-from-date")?.value || attendanceDefaultStartDate(batch);
  const toDate = document.getElementById("attendance-to-date")?.value || addDaysISO(fromDate, 6);
  return { batch, branch, fromDate, toDate };
}

function renderAttendanceFilters(values = currentAttendanceFilters()) {
  const el = document.getElementById("attendanceFilters");
  if (!el) return;
  const currentBatch = values.batch || "";
  const fallbackStartDate = attendanceDefaultStartDate(currentBatch);
  const currentStartDate = values.fromDate || fallbackStartDate;
  const currentEndDate = values.toDate || addDaysISO(currentStartDate, 6);
  const branchOptions = [...new Set([...attendanceBranchChoices(), attendanceBatchLocation(currentBatch)].filter(Boolean))];
  const adminBranch = attendanceAdminBranch();
  const currentBranch = canManageAllAttendance()
    ? attendanceBatchLocation(currentBatch) || values.branch || ""
    : adminBranch;
  const batchChoices = attendanceBatchChoices();
  const batchSelect = `<select id="attendance-batch"><option value="">All batches</option>${batchChoices.map(v => `<option ${v === currentBatch ? "selected" : ""}>${escapeHtml(v)}</option>`).join("")}</select>`;
  const branchSelect = `<select id="attendance-branch" ${canManageAllAttendance() ? "" : "disabled"}>${canManageAllAttendance() ? `<option value="">All branches</option>` : ""}${branchOptions.map(v => `<option ${v === currentBranch ? "selected" : ""}>${escapeHtml(v)}</option>`).join("")}</select>`;
  const fromInput = `<label class="attendance-start-label">From Date <input id="attendance-from-date" type="date" value="${escapeAttr(currentStartDate)}"></label>`;
  const toInput = `<label class="attendance-start-label">To Date <input id="attendance-to-date" type="date" value="${escapeAttr(currentEndDate)}"></label>`;
  el.innerHTML = [batchSelect, branchSelect, fromInput, toInput].join("");
}

function selectedAttendanceStatusFilter() {
  return document.getElementById("attendance-status-filter")?.value || "";
}

function selectedAttendanceBatchGroupFilter() {
  return document.getElementById("attendance-batch-group-filter")?.value || "";
}

function selectedAttendanceSortField() {
  return document.getElementById("attendance-sort")?.value || "firstName";
}

function selectedAttendanceSortDirection() {
  return document.getElementById("attendance-sort-dir")?.value || "asc";
}

function attendanceSortOptions() {
  const options = activeAttendanceStudentColumns().map(column => ({ key: column.key, label: column.label }));
  const required = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "admissionDate", label: "Admission Date" },
    { key: "batchGroup", label: "Batch A/B" },
    { key: "studentId", label: "Student ID" }
  ];
  required.forEach(option => {
    if (!options.some(item => item.key === option.key)) options.push(option);
  });
  return options;
}

function sortAttendanceStudents(students, field, direction) {
  const factor = direction === "desc" ? -1 : 1;
  return [...students].sort((a, b) => {
    const left = attendanceSortValue(a, field);
    const right = attendanceSortValue(b, field);
    return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }) * factor;
  });
}

function attendanceSortValue(student, field) {
  if (field === "admissionDate") return attendanceDateValue(student.admissionDate) || "99999999";
  return String(attendanceStudentFieldValue(student, field) || "").trim();
}

function selectedAttendanceStartDate(batch = selectedAttendanceBatch()) {
  return document.getElementById("attendance-from-date")?.value || attendanceDefaultStartDate(batch);
}

function selectedAttendanceEndDate(batch = selectedAttendanceBatch()) {
  return document.getElementById("attendance-to-date")?.value || addDaysISO(selectedAttendanceStartDate(batch), 6);
}

function attendanceDefaultStartDate(batch = "") {
  const saved = attendanceSessionsForBatch(batch, attendanceBatchLocation(batch));
  return fridayOfWeek(saved[0]?.date || todayDate());
}

function fridayOfWeek(value) {
  const date = new Date(`${value || todayDate()}T00:00:00`);
  if (Number.isNaN(date.getTime())) return todayDate();
  const day = date.getDay();
  const diff = (day - 5 + 7) % 7;
  date.setDate(date.getDate() - diff);
  return date.toISOString().slice(0, 10);
}

function shiftAttendanceWeek(direction) {
  const input = document.getElementById("attendance-start-date");
  if (!input) return;
  const current = new Date(`${selectedAttendanceStartDate()}T00:00:00`);
  current.setDate(current.getDate() + (direction === "next" ? 7 : -7));
  input.value = current.toISOString().slice(0, 10);
  renderAttendance();
}

function attendanceStudentMatchesStatus(student, sessions, statusFilter) {
  if (!statusFilter || !sessions.length) return true;
  return sessions.some(session => {
    const record = attendanceRecord(student.id, session.id);
    const isAbsent = record.present === false;
    return statusFilter === "absent" ? isAbsent : !isAbsent;
  });
}

function attendanceBatchLocation(batchName = "") {
  const existing = state.attendanceSessions.find(session => session.batch === batchName && session.branch)?.branch
    || state.attendanceStudents.find(student => student.batch === batchName && student.branch)?.branch
    || admissionRowsForAttendance().find(admission => admission.batch === batchName && admission.branch)?.branch;
  if (existing) return existing;
  const parts = String(batchName || "").split("_").filter(Boolean);
  return parts.length >= 3 ? parts.slice(2).join(" ") : "";
}

function normalizeAttendanceChoice(value = "") {
  return String(value || "").trim().toLowerCase();
}

function sameAttendanceChoice(left = "", right = "") {
  return normalizeAttendanceChoice(left) === normalizeAttendanceChoice(right);
}

function attendanceBranchChoices() {
  if (!canManageAllAttendance()) return userBranchList(currentUser).length ? userBranchList(currentUser) : ["Unassigned"];
  const batchBranches = attendanceBatchChoices().map(batch => attendanceBatchLocation(batch));
  const savedBranches = [
    ...state.attendanceStudents.map(student => student.branch),
    ...state.attendanceSessions.map(session => session.branch),
    ...admissionRowsForAttendance().map(admission => admission.branch)
  ];
  const all = withUnassigned([...masters.branches, ...batchBranches, ...savedBranches].filter(Boolean));
  return all.filter((branch, index) => all.findIndex(item => sameAttendanceChoice(item, branch)) === index);
}

function prepareAttendanceForms() {
  const batchForm = document.getElementById("attendanceBatchForm");
  const studentForm = document.getElementById("attendanceStudentForm");
  const sessionForm = document.getElementById("attendanceSessionForm");
  const adminBranch = attendanceAdminBranch();
  if (batchForm) {
    batchForm.querySelectorAll("input, select, button").forEach(input => input.disabled = !isSuperAdmin());
    if (batchForm.elements.location) batchForm.elements.location.innerHTML = masters.branches.map(branch => `<option>${escapeHtml(branch)}</option>`).join("");
  }
  const batchOptions = attendanceBatchChoices().map(batch => `<option>${escapeHtml(batch)}</option>`).join("");
  if (studentForm?.elements.batch) {
    studentForm.elements.batch.innerHTML = batchOptions;
  }
  const bulkBatch = document.getElementById("attendanceBulkBatch");
  if (bulkBatch) {
    const current = bulkBatch.value;
    bulkBatch.innerHTML = `<option value="">Select attendance batch</option>${attendanceBatchChoices().map(batch => `<option>${escapeHtml(batch)}</option>`).join("")}`;
    if (current && [...bulkBatch.options].some(option => option.value === current)) bulkBatch.value = current;
  }
  if (sessionForm) {
    if (sessionForm.elements.batch) sessionForm.elements.batch.innerHTML = batchOptions;
    if (sessionForm.elements.subject) sessionForm.elements.subject.innerHTML = attendancePaperOptions(selectedAttendanceBatch() || sessionForm.elements.batch?.value || "").map(paper => `<option>${escapeHtml(paper)}</option>`).join("");
    if (sessionForm.elements.prof) {
      const batch = selectedAttendanceBatch() || sessionForm.elements.batch?.value || "";
      const paper = sessionForm.elements.subject?.value || "";
      const faculty = attendanceFacultyOptions(batch, paper);
      sessionForm.elements.prof.innerHTML = `<option value="">${paper ? "Select Professor" : "Select paper first"}</option>${faculty.map(prof => `<option>${escapeHtml(prof)}</option>`).join("")}`;
    }
    const helper = sessionForm.querySelector("[data-attendance-branch-note]");
    if (helper) helper.textContent = canManageAllAttendance() ? "Lecture column applies to the selected attendance batch." : `Lecture column will be managed for ${adminBranch || "your branch"}.`;
  }
}

function attendanceBatchChoices() {
  const choices = [...new Set([...(masters.attendanceBatches || []), ...state.attendanceSessions.map(s => s.batch), ...state.attendanceStudents.map(s => s.batch), ...admissionRowsForAttendance().map(row => row.batch)].filter(Boolean))];
  return choices;
}

function attendancePaperOptions(batchName = "") {
  return paperOptionsForCourse(attendanceCourseFromBatch(batchName));
}

function paperOptionsForCourse(course = "") {
  const lower = String(course || "").toLowerCase();
  if (lower.includes("inter") || lower.includes("cmai")) return ["P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12"];
  if (lower.includes("final")) return ["P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20"];
  return ["P1", "P2", "P3", "P4"];
}

function attendanceCourseFromBatch(batchName = "") {
  const lower = String(batchName || "").toLowerCase();
  if (lower.includes("cmai") || lower.includes("inter")) return "CMA Intermediate";
  if (lower.includes("final")) return "CMA Final";
  return "CMA Foundation";
}

function attendanceFacultyOptions(batchName = "", paper = "") {
  if (!paper) return [];
  const course = attendanceCourseFromBatch(batchName);
  return [...new Set([...(masters.paperFaculty?.[course]?.[paper] || [])].filter(Boolean))];
}

function selectedAttendanceBatch() {
  return document.getElementById("attendance-batch")?.value || "";
}

function attendanceSessionsForBatch(batch, branch = "") {
  return state.attendanceSessions
    .filter(session => !batch || session.batch === batch)
    .filter(session => !branch || !session.branch || session.branch === branch)
    .sort((a, b) => `${a.date} ${a.subject}`.localeCompare(`${b.date} ${b.subject}`));
}

function attendanceRangeSessions(batch, branch = "") {
  const start = selectedAttendanceStartDate(batch);
  const end = selectedAttendanceEndDate(batch);
  const saved = attendanceSessionsForBatch(batch, branch)
    .filter(session => !start || session.date >= start)
    .filter(session => !end || session.date <= end);
  const sessions = [...saved];
  dateRangeList(start, end).forEach(date => {
    if (!sessions.some(session => session.date === date)) {
      sessions.push({
        id: `draft|${encodeURIComponent(batch)}|${date}`,
        draft: true,
        batch,
        branch,
        date,
        subject: "",
        prof: ""
      });
    }
  });
  return sessions.sort((a, b) => `${a.date} ${a.subject || ""} ${a.prof || ""}`.localeCompare(`${b.date} ${b.subject || ""} ${b.prof || ""}`));
}

function dateRangeList(start, end) {
  const from = new Date(`${start || todayDate()}T00:00:00`);
  const to = new Date(`${end || start || todayDate()}T00:00:00`);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || to < from) return [];
  const days = [];
  const current = new Date(from);
  while (current <= to && days.length < 45) {
    days.push(localDateISO(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
}

function localDateISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function attendanceRoster() {
  const manual = state.attendanceStudents.filter(student => !student.archivedAt).map(student => ({ ...student, lastName: student.lastName || student.lastInitial || "", lastInitial: (student.lastName || student.lastInitial || "").slice(0, 1).toUpperCase(), source: "Manual" }));
  const admissions = admissionRowsForAttendance().map(admissionToAttendanceStudent).filter(Boolean);
  const byKey = new Map();
  manual.forEach(student => {
    const key = `${student.batch}|${student.branch}|${student.firstName}|${student.lastInitial}`.toLowerCase();
    if (!byKey.has(key)) byKey.set(key, student);
  });
  admissions.forEach(student => {
    const key = `${student.batch}|${student.branch}|${student.firstName}|${student.lastInitial}`.toLowerCase();
    if (!byKey.has(key)) byKey.set(key, student);
  });
  return [...byKey.values()].sort((a, b) => `${a.firstName} ${a.lastInitial}`.localeCompare(`${b.firstName} ${b.lastInitial}`));
}

function admissionRowsForAttendance() {
  return admissionsWithLead().filter(row => {
    const batch = normalizeAttendanceBatch(row.batch || row.assignedBatch || row.assignBatch || "");
    return batch && batch !== "Unassigned";
  });
}

function admissionToAttendanceStudent(row) {
  const name = displayLeadName(row) || row.studentName || row.name || "Student";
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const firstName = titleCase(row.firstName || parts[0] || "Student");
  const lastName = lastInitialOnly(row.lastName || parts.slice(1).join(" ") || "");
  const batch = normalizeAttendanceBatch(row.batch || row.assignedBatch || row.assignBatch || "");
  if (!batch) return null;
  const branch = row.branch || attendanceBatchLocation(batch) || "Unassigned";
  const counsellor = effectiveCounsellorForBranch(branch, row.counsellor || row.assignedTo || "");
  return {
    id: `admission-${row.id}`,
    admissionId: row.id,
    leadId: row.leadId,
    firstName,
    lastName,
    lastInitial: lastName.slice(0, 1).toUpperCase(),
    admissionDate: row.admissionDate || "",
    batchGroup: row.batchGroup || "",
    studentId: row.studentId || row.receiptNumber || "",
    customFields: row.customFields || {},
    batch,
    branch,
    counsellor,
    studentType: "Admitted",
    createdAt: row.admissionDate || row.createdAt || "",
    createdBy: counsellor,
    source: "Admission"
  };
}

function normalizeAttendanceBatch(batch = "") {
  return String(batch || "").trim() || "Unassigned";
}

function canAccessAttendanceBatch(batch = "", branch = "") {
  if (canManageAllAttendance()) return true;
  const normalizedBatch = normalizeAttendanceChoice(batch);
  const normalizedBranch = normalizeAttendanceChoice(branch || attendanceBatchLocation(batch));
  const userName = normalizePersonName(currentUser?.name || "");
  const ownBranches = userBranchList(currentUser).map(normalizeAttendanceChoice);
  const hasOwnAdmission = admissionsWithLead().some(row =>
    normalizeAttendanceChoice(row.batch || "") === normalizedBatch &&
    (normalizePersonName(admissionRowCounsellor(row)) === userName || normalizePersonName(row.counsellor || "") === userName || normalizePersonName(row.assignedTo || "") === userName)
  );
  const batchHasAdmissions = state.admissions.some(admission => normalizeAttendanceChoice(admission.batch || "") === normalizedBatch);
  const hasOwnManualStudent = state.attendanceStudents.some(student =>
    !student.archivedAt &&
    normalizeAttendanceChoice(student.batch || "") === normalizedBatch &&
    normalizePersonName(student.createdBy || "") === userName
  );
  const hasBranchAccess = normalizedBranch && ownBranches.includes(normalizedBranch);
  return hasOwnAdmission || hasOwnManualStudent || (!batchHasAdmissions && hasBranchAccess);
}

function attendanceStudentName(student) {
  return `${escapeHtml(student.firstName || "")} ${escapeHtml(student.lastInitial || "")}.`;
}

function attendanceSessionTitle(session) {
  const papers = attendancePaperOptions(session.batch || selectedAttendanceBatch());
  const subject = session.subject || "";
  const prof = session.prof || "";
  const paperOptions = subject && !papers.includes(subject) ? [subject, ...papers] : papers;
  const facultyOptions = attendanceFacultyOptions(session.batch || selectedAttendanceBatch(), subject);
  return `<select class="attendance-header-select" data-attendance-session-field="${attendancePayload({ sessionId: session.id, field: "subject", date: session.date, batch: session.batch, branch: session.branch })}">
      <option value="">Paper</option>
      ${paperOptions.map(paper => `<option ${paper === subject ? "selected" : ""}>${escapeHtml(paper)}</option>`).join("")}
    </select>
    <select class="attendance-header-select" data-attendance-session-field="${attendancePayload({ sessionId: session.id, field: "prof", date: session.date, batch: session.batch, branch: session.branch })}">
      <option value="">${subject ? "Professor" : "Select paper first"}</option>
      ${facultyOptions.map(name => `<option value="${escapeAttr(name)}" ${name === prof ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
    </select>`;
}

function attendanceSessionDateTitle(session) {
  const date = new Date(`${session.date}T00:00:00`);
  const day = Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-IN", { weekday: "short" });
  const shortDate = Number.isNaN(date.getTime()) ? session.date : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }).replaceAll(" ", "-");
  return `<span class="attendance-date-label"><span>${escapeHtml(shortDate)}</span><span>${escapeHtml(day)}</span></span>`;
}

function attendanceRecordKey(studentId, sessionId) {
  return `${sessionId}:${studentId}`;
}

function attendanceRecord(studentId, sessionId) {
  return state.attendanceRecords[attendanceRecordKey(studentId, sessionId)] || { present: true, remark: "" };
}

function attendancePayload(data) {
  return encodeURIComponent(JSON.stringify(data));
}

function parseAttendancePayload(value) {
  try {
    return JSON.parse(decodeURIComponent(value || ""));
  } catch {
    const [studentId, sessionId] = String(value || "").split(":");
    return { studentId, sessionId };
  }
}

function draftSessionFromId(sessionId) {
  if (!String(sessionId || "").startsWith("draft")) return null;
  const parts = String(sessionId || "").split("|");
  const batch = parts[1] ? decodeURIComponent(parts[1]) : selectedAttendanceBatch();
  const date = parts[2] || String(sessionId || "").replace("draft:", "");
  return {
    id: sessionId,
    draft: true,
    batch,
    branch: attendanceBatchLocation(batch) || document.getElementById("attendance-branch")?.value || "",
    date,
    subject: "",
    prof: ""
  };
}

function ensureAttendanceSession(sessionId, overrides = {}) {
  overrides = Object.fromEntries(Object.entries(overrides).filter(([, value]) => value !== undefined && value !== ""));
  const existing = state.attendanceSessions.find(item => item.id === sessionId);
  if (existing) {
    Object.assign(existing, overrides);
    return existing;
  }
  const draft = draftSessionFromId(sessionId);
  if (!draft) return null;
  const session = { ...draft, ...overrides, id: id(), createdAt: new Date().toISOString(), createdBy: currentUser?.name || "" };
  state.attendanceSessions.push(session);
  remapAttendanceSessionId(sessionId, session.id);
  return session;
}

function remapAttendanceSessionId(oldId, newId) {
  Object.keys(state.attendanceRecords).forEach(key => {
    if (!key.startsWith(`${oldId}:`)) return;
    const nextKey = key.replace(`${oldId}:`, `${newId}:`);
    state.attendanceRecords[nextKey] = state.attendanceRecords[key];
    delete state.attendanceRecords[key];
  });
}

function renderAttendanceGrid(sections) {
  const target = document.getElementById("attendanceGrid");
  if (!target) return;
  target.innerHTML = sections.map(section => renderAttendanceTable(section)).join("");
}

function renderAttendanceTable({ batch, branch, students, sessions }) {
  const batchTitle = batch || "Unassigned";
  const branchTitle = branch || attendanceBatchLocation(batch) || "All Branches";
  const infoColumns = activeAttendanceStudentColumns();
  const infoWidth = infoColumns.reduce((sum, column) => sum + attendanceColumnWidth(column), 0);
  const deleteWidth = attendanceDeleteColumnWidth();
  const lectureStyle = attendanceLectureColumnStyle();
  const subjectHeaders = sessions.length
    ? sessions.map(session => `<th class="lecture-col" style="${lectureStyle}">${attendanceSessionTitle(session)}</th>`).join("")
    : `<th class="lecture-col empty-lecture" style="${lectureStyle}">&lt;Add lecture&gt;</th>`;
  const dateHeaders = sessions.length
    ? sessions.map((session, index) => `<th class="lecture-col attendance-resizable-col" style="${lectureStyle}">${attendanceSessionDateTitle(session)}${attendanceResizeHandle("lecture", "date", `Attendance Date ${index + 1}`)}</th>`).join("")
    : `<th class="lecture-col empty-lecture attendance-resizable-col" style="${lectureStyle}">Date + Day${attendanceResizeHandle("lecture", "date", "Attendance Date")}</th>`;
  const manualRows = Array.from({ length: Math.max(3, 7 - students.length) }, (_, index) => renderManualAttendanceRow(index, sessions, batchTitle, branchTitle));
  return `<div class="attendance-batch-section">
  <table class="attendance-table">
    <thead>
      <tr>
        <th class="attendance-delete-col attendance-batch-head" style="min-width:${deleteWidth}px;width:${deleteWidth}px;left:0;"></th>
        <th class="attendance-batch-head" colspan="${infoColumns.length}" style="min-width:${infoWidth}px;width:${infoWidth}px;left:${deleteWidth}px;">${escapeHtml(batchTitle)}<br>${escapeHtml(branchTitle)}</th>
        ${subjectHeaders}
      </tr>
      <tr>
        <th class="attendance-delete-col" style="left:0;"></th>
        ${infoColumns.map((column, index) => attendanceInfoHeaderCell(column, index, infoColumns)).join("")}
        ${dateHeaders}
      </tr>
    </thead>
    <tbody>${students.map(student => `<tr>
      <td class="attendance-delete-col" style="left:0;">${student.source === "Manual" ? `<button class="attendance-row-delete" data-archive-attendance-student="${student.id}" type="button" title="Archive student">x</button>` : ""}</td>
      ${infoColumns.map((column, index) => attendanceInfoDataCell(column, index, infoColumns, attendanceStudentFieldCell(student, column.key))).join("")}
      ${sessions.length ? sessions.map(session => attendanceCell(student, session)).join("") : `<td class="attendance-cell empty-lecture" style="${lectureStyle}"></td>`}
    </tr>`).join("")}${manualRows.join("")}</tbody>
  </table>
  </div>`;
}

function renderManualAttendanceRow(index, sessions, batch, branch) {
  const infoColumns = activeAttendanceStudentColumns();
  const lectureStyle = attendanceLectureColumnStyle();
  return `<tr>
    <td class="attendance-delete-col" style="left:0;"></td>
    ${infoColumns.map((column, columnIndex) => attendanceInfoDataCell(column, columnIndex, infoColumns, manualAttendanceFieldControl(index, column, batch, branch))).join("")}
    ${sessions.map(() => `<td class="attendance-cell empty-lecture" style="${lectureStyle}">${disabledAttendanceSelect()}</td>`).join("")}
  </tr>`;
}

function attendanceInfoHeaderCell(column, index, columns) {
  return `<th class="attendance-info-col attendance-resizable-col" style="${attendanceInfoColumnStyle(column, index, columns)}">${escapeHtml(column.label)}${attendanceResizeHandle("info", column.key, column.label)}</th>`;
}

function attendanceInfoDataCell(column, index, columns, content) {
  return `<td class="attendance-info-col" style="${attendanceInfoColumnStyle(column, index, columns)}">${content}</td>`;
}

function attendanceInfoColumnStyle(column, index, columns) {
  const left = attendanceDeleteColumnWidth() + columns.slice(0, index).reduce((sum, item) => sum + attendanceColumnWidth(item), 0);
  const width = attendanceColumnWidth(column);
  return `min-width:${width}px;width:${width}px;left:${left}px;`;
}

function attendanceDeleteColumnWidth() {
  return 22;
}

function attendanceResizeHandle(type, key, label = "") {
  if (!canResizeAttendanceColumns()) return "";
  return `<span class="attendance-resize-handle" data-attendance-resize="${type}" data-attendance-resize-key="${escapeAttr(key)}" title="Drag to resize ${escapeAttr(label || key)}"></span>`;
}

function canResizeAttendanceColumns() {
  return Boolean(currentUser);
}

function attendanceLectureColumnWidth() {
  return Math.max(52, Math.min(180, Number(state.attendanceLectureColumnWidth) || 82));
}

function attendanceLectureColumnStyle() {
  const width = attendanceLectureColumnWidth();
  return `min-width:${width}px;width:${width}px;`;
}

function attendanceColumnWidth(column) {
  if (column.key === "lastName") return Math.max(24, Math.min(60, Number(column.width) || 26));
  if (column.key === "batchGroup") return Math.max(34, Math.min(90, Number(column.width) || 44));
  if (column.key === "studentId") return Math.max(44, Math.min(140, Number(column.width) || 58));
  if (column.key === "firstName") return Math.max(60, Math.min(180, Number(column.width) || 92));
  if (column.key === "admissionDate") return Math.max(68, Math.min(140, Number(column.width) || 86));
  const fallback = defaultAttendanceStudentColumns.find(item => item.key === column.key)?.width || 84;
  return Math.max(34, Math.min(180, Number(column.width) || fallback));
}

function activeAttendanceStudentColumns() {
  const saved = Array.isArray(state.attendanceStudentColumns) && state.attendanceStudentColumns.length ? state.attendanceStudentColumns : defaultAttendanceStudentColumns;
  return saved.map(column => ({
    key: column.key,
    label: column.label || attendanceColumnLabel(column.key),
    width: attendanceColumnWidth(column)
  })).filter(column => column.key);
}

function manualAttendanceFieldControl(index, column, batch, branch) {
  const payload = attendancePayload({ rowIndex: index, field: column.key, batch, branch });
  const placeholder = column.key === "firstName" ? "<Add Manually>" : column.key === "lastName" ? "<Add>" : column.label;
  if (column.key === "admissionDate") return `<input class="attendance-name-input" type="date" data-attendance-new-student="${payload}">`;
  if (column.key === "batchGroup") return `<select class="attendance-name-input" data-attendance-new-student="${payload}"><option></option><option>A</option><option>B</option></select>`;
  if (column.key === "studentType") return `<select class="attendance-name-input" data-attendance-new-student="${payload}"><option>Demo</option><option>Admitted</option></select>`;
  return `<input class="attendance-name-input" data-attendance-new-student="${payload}" placeholder="${escapeAttr(placeholder)}">`;
}

function attendanceStudentFieldCell(student, field) {
  const value = attendanceStudentFieldValue(student, field);
  if (student.source !== "Manual") return escapeHtml(value || "");
  if (field === "admissionDate") return `<input class="attendance-name-input" data-attendance-student-name="${escapeAttr(student.id)}:${field}" value="${escapeAttr(formatAttendanceDate(value))}" placeholder="DD-MMM-YYYY">`;
  if (field === "batchGroup") return `<select class="attendance-name-input" data-attendance-student-name="${escapeAttr(student.id)}:${field}"><option></option><option ${value === "A" ? "selected" : ""}>A</option><option ${value === "B" ? "selected" : ""}>B</option></select>`;
  if (field === "studentType") return `<select class="attendance-name-input" data-attendance-student-name="${escapeAttr(student.id)}:${field}"><option ${value === "Demo" ? "selected" : ""}>Demo</option><option ${value === "Admitted" ? "selected" : ""}>Admitted</option></select>`;
  return `<input class="attendance-name-input" data-attendance-student-name="${escapeAttr(student.id)}:${field}" value="${escapeAttr(value || "")}">`;
}

function attendanceStudentFieldValue(student, field) {
  if (field === "lastName") return lastInitialOnly(student.lastName || student.lastInitial || "");
  if (field === "admissionDate") return student.admissionDate || "";
  if (field === "batchGroup") return student.batchGroup || "";
  if (field === "studentId") return student.studentId || "";
  if (field === "studentType") return student.studentType || "";
  if (field.startsWith("custom:")) return student.customFields?.[field.slice(7)] || "";
  return student.firstName || "";
}

function formatAttendanceDate(value) {
  const normalized = normalizeDateInput(value);
  if (!normalized) return value || "";
  const [year, month, day] = normalized.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day}-${monthNames[Number(month) - 1] || month}-${year}`;
}

function lastInitialOnly(value) {
  const match = String(value || "").trim().match(/[A-Za-z]/);
  return match ? match[0].toUpperCase() : "";
}

function attendanceCell(student, session) {
  const lectureStyle = attendanceLectureColumnStyle();
  if (isBeforeStudentAdmission(student, session)) {
    return `<td class="attendance-cell not-applicable" style="${lectureStyle}" title="Student was not in batch on this date">NA</td>`;
  }
  const record = attendanceRecord(student.id, session.id);
  const status = record.present === false ? "absent" : "present";
  const selected = record.present === false ? "absent" : "present";
  const markKey = attendancePayload({ studentId: student.id, sessionId: session.id, batch: session.batch, branch: session.branch, date: session.date });
  return `<td class="attendance-cell ${status}" style="${lectureStyle}">
    <select class="attendance-status-select active-attendance-control" data-attendance-status="${markKey}">
      <option value="present" ${selected === "present" ? "selected" : ""}>P</option>
      <option value="absent" ${selected === "absent" ? "selected" : ""}>A</option>
    </select>
    ${record.present === false ? `<select class="attendance-reason" data-attendance-remark="${markKey}">
        <option value="">Reason</option>
        ${masters.attendanceRemarks.map(remark => `<option ${remark === record.remark ? "selected" : ""}>${escapeHtml(remark)}</option>`).join("")}
      </select>` : ""}
  </td>`;
}

function isBeforeStudentAdmission(student, session) {
  if (!student?.admissionDate || !session?.date) return false;
  const admissionDate = attendanceDateValue(student.admissionDate);
  const lectureDate = attendanceDateValue(session.date);
  return Boolean(admissionDate && lectureDate && lectureDate < admissionDate);
}

function attendanceDateValue(value) {
  const normalized = normalizeDateInput(value);
  if (!normalized) return "";
  return normalized.replace(/-/g, "");
}

function disabledAttendanceSelect() {
  return `<select class="attendance-status-select" disabled title="Add student name first">
    <option>P / A</option>
  </select>`;
}

function renderAttendanceReport(students, sessions) {
  const target = document.getElementById("attendanceReport");
  if (!target) return;
  const absentRows = [];
  let presentCount = 0;
  sessions.forEach(session => {
    students.forEach(student => {
      if (isBeforeStudentAdmission(student, session)) return;
      const record = attendanceRecord(student.id, session.id);
      if (record.present === false) absentRows.push({ student, session, remark: record.remark || "No remark" });
      else if (record.present === true) presentCount++;
    });
  });
  target.innerHTML = `
    <h2>Attendance Report</h2>
    <div class="metric-grid compact">
      <div class="metric"><span>Students</span><strong>${students.length}</strong></div>
      <div class="metric"><span>Lectures</span><strong>${sessions.length}</strong></div>
      <div class="metric"><span>Present Marks</span><strong>${presentCount}</strong></div>
      <div class="metric"><span>Absent Marks</span><strong>${absentRows.length}</strong></div>
    </div>
    ${absentRows.length ? `<h2>Absent Students</h2>
      <table><thead><tr><th>Date</th><th>Student</th><th>Batch</th><th>Subject</th><th>Prof</th><th>Remark</th></tr></thead>
      <tbody>${absentRows.map(row => `<tr><td>${formatDate(row.session.date)}</td><td>${attendanceStudentName(row.student)}</td><td>${escapeHtml(row.student.batch)}</td><td>${escapeHtml(row.session.subject)}</td><td>${escapeHtml(row.session.prof)}</td><td>${escapeHtml(row.remark)}</td></tr>`).join("")}</tbody></table>`
      : "<p class='muted'>No absent students for selected filters.</p>"}
  `;
}

function renderCampaigns() {
  const canManage = canManageCampaigns();
  const form = document.getElementById("campaignForm");
  if (form) {
    form.querySelectorAll("input, select, textarea, button").forEach(input => {
      if (input.dataset.clearCampaignForm !== undefined) return;
      input.disabled = !canManage;
    });
    const help = document.querySelector("#campaigns .bulk-help");
    if (help && !canManage) help.textContent = "Campaigns are managed by Lead Manager / Super Admin. Counsellors can view campaign progress here.";
  }
  const rows = state.campaigns.map(campaign => campaignStats(campaign));
  table("campaignTable", rows, ["Date", "Campaign", "Type", "Course", "Attempt", "Sent", "Responses", "Attended", "Leads", "Converted", "Next Follow-up", "Owner", "Actions"], row => [
    formatDate(row.campaignDate),
    `<strong>${escapeHtml(row.title)}</strong><br><span class="muted">${escapeHtml(row.flyer || "No flyer added")}</span>`,
    row.type,
    row.course,
    row.attempt,
    row.sentCount,
    row.responseCount,
    row.attendedCount,
    row.leadCount,
    row.convertedCount,
    formatDate(row.followupAt),
    row.assignedTo,
    campaignActions(row)
  ]);
}

function campaignActions(row) {
  if (!canManageCampaigns()) return "<span class='locked-action'>View only</span>";
  return `<select data-campaign-action="${row.id}">
    <option value="">Action</option>
    <option value="edit">Edit</option>
    <option value="responseLeads">Create Leads From Responses</option>
    <option value="attendeeLeads">Create Leads From Attendees</option>
    <option value="openWa">Open WhatsApp Message</option>
    <option value="delete">Delete</option>
  </select>`;
}

function campaignStats(campaign) {
  const linkedLeads = activeLeads().filter(lead => lead.campaignId === campaign.id);
  const converted = linkedLeads.filter(lead => lead.status === "Converted / Admitted").length;
  return {
    ...campaign,
    sentCount: countCampaignPeople(campaign.sentData),
    responseCount: countCampaignPeople(campaign.responseData),
    attendedCount: countCampaignPeople(campaign.attendedData),
    leadCount: linkedLeads.length,
    convertedCount: converted
  };
}
function admissionsWithLead() {
  return state.admissions
    .map(a => ({ ...state.leads.find(l => l.id === a.leadId), ...a, balance: Number(a.feesAgreed || 0) - Number(a.feesPaid || 0) }))
    .filter(row => !row.archivedAt)
    .filter(row => canViewAdmissionRow(row))
    .sort((a, b) => `${a.batch || ""}|${a.admissionDate || ""}|${displayLeadName(a)}`.localeCompare(`${b.batch || ""}|${b.admissionDate || ""}|${displayLeadName(b)}`, undefined, { numeric: true, sensitivity: "base" }));
}

function canViewAdmissionRow(row) {
  if (!currentUser || canManageAllAttendance()) return true;
  const userName = normalizePersonName(currentUser.name || "");
  if (normalizePersonName(admissionRowCounsellor(row)) === userName) return true;
  if (normalizePersonName(row.counsellor || "") === userName) return true;
  if (normalizePersonName(row.assignedTo || "") === userName) return true;
  const allowedBranches = userBranchList(currentUser).map(normalizeAttendanceChoice);
  if (allowedBranches.includes(normalizeAttendanceChoice(admissionRowBranch(row)))) return true;
  return false;
}

function renderTemplates() {
  document.getElementById("templateList").innerHTML = state.templates.map(t => `<div class="panel"><strong>${t.name}</strong><p class="muted">${t.course} | ${t.stage}</p><p>${t.message}</p></div>`).join("");
}

function renderReports() {
  const leads = filteredLeads("report");
  const converted = leads.filter(l => l.status === "Converted / Admitted").length;
  document.getElementById("reportSummary").innerHTML = [
    metric("Total lead count", leads.length),
    metric("Conversion count", converted),
    metric("Conversion ratio", leads.length ? `${Math.round(converted / leads.length * 100)}%` : "0%"),
    metric("Follow-up count", state.followups.filter(f => leads.some(l => l.id === f.leadId)).length)
  ].join("");
  renderGroupReport("sourceReport", leads, "source");
  renderGroupReport("branchReport", leads, "branch");
  renderAdminPerformance();
}
function renderGroupReport(idName, leads, key) {
  const rows = Object.entries(countBy(leads, key)).map(([name, total]) => {
    const group = leads.filter(l => (l[key] || "Blank") === name);
    const converted = group.filter(l => l.status === "Converted / Admitted").length;
    return { name, total, converted, ratio: total ? `${Math.round(converted / total * 100)}%` : "0%" };
  });
  table(idName, rows, ["Name", "Leads", "Converted", "Ratio"], r => [r.name, r.total, r.converted, r.ratio]);
}

function renderUsers() {
  renderUserTabAccess("userTabAccess");
  table("userList", state.users, ["Name", "Mobile", "Email", "Role", "Locations", "Tabs", "Login", "Actions"], u => [
    u.name,
    u.mobile,
    u.email,
    u.role,
    userBranchLabel(u),
    userAccessLabel(u),
    "First name / mobile / email",
    isSuperAdmin() ? `<div class="row-actions"><button data-edit-user="${u.id}">Edit</button><button data-delete-user="${u.id}" type="button">Delete</button></div>` : "<span class='locked-action'>Super Admin only</span>"
  ]);
}

function renderSettingsUsers() {
  table("settingsUserList", state.users, ["Name", "Role", "Locations", "Tabs", "Login", "Actions"], u => [
    u.name,
    u.role,
    userBranchLabel(u),
    userAccessLabel(u),
    "First name / mobile / email",
    isSuperAdmin() ? `<div class="row-actions"><button data-edit-settings-user="${u.id}">Edit</button><button data-delete-user="${u.id}" type="button">Delete</button></div>` : "<span class='locked-action'>Super Admin only</span>"
  ]);
}

function renderSettings() {
  const groups = [
    ["courses", "Courses"],
    ["branches", "Locations / Branches"],
    ["statuses", "Lead Status Options"],
    ["roles", "Roles"],
    ["batches", "Batches"],
    ["attendanceBatches", "Attendance Batches"],
    ["attendanceRemarks", "Attendance Absent Remarks"]
  ];
  document.getElementById("settingsGrid").innerHTML = `
    ${groups.map(([key, title]) => renderMasterEditor(key, title)).join("")}
    ${renderPaperFacultyDesigner()}
    ${renderLeadColumnDesigner()}
    ${renderAttendanceColumnDesigner()}
    ${renderAttendanceStudentMasterPanel()}
    ${renderWhatsAppTemplateSettings()}
    <section class="panel">
      <h2>Add Admin / User</h2>
      <form id="settingsUserForm" class="form-grid">
        <input type="hidden" name="id">
        <input name="name" placeholder="Admin name" required>
        <input name="mobile" placeholder="Mobile">
        <input name="email" placeholder="Email">
        <input name="password" type="password" placeholder="Password (blank = first name for new user)">
        <select name="role">${masters.roles.map(v => `<option>${escapeHtml(v)}</option>`).join("")}</select>
        <label>Primary Branch<select name="branch">${withUnassigned(masters.branches).map(v => `<option>${escapeHtml(v)}</option>`).join("")}</select></label>
        <label>Allowed Locations<select name="branchAccess" multiple size="5">${masters.branches.map(v => `<option>${escapeHtml(v)}</option>`).join("")}</select></label>
        <div id="settingsUserTabAccess" class="access-list"></div>
        <p class="bulk-help">For a new user, blank password becomes their first name. While editing, blank keeps the old password.</p>
        <button class="primary">Save Admin</button>
        <button type="button" data-clear-user-form="settingsUserForm">Add New Admin</button>
      </form>
      <div id="settingsUserList" class="table-wrap"></div>
    </section>
    <section class="panel">
      <h2>Data Backup</h2>
      <p class="bulk-help">Restore a CRM backup only when Super Admin approves replacing the current browser data.</p>
      <div class="toolbar">
        <button data-restore-local-backup type="button">Restore Last Local Backup</button>
        <button data-restore-data type="button">Restore Backup</button>
        <input id="restoreDataFile" class="hidden" type="file" accept="application/json,.json">
      </div>
    </section>
    <p id="sheetSyncStatus" class="bulk-help hidden"></p>`;

  bindSettingsForms();
  prepareAttendanceForms();
  renderUserTabAccess("settingsUserTabAccess");
  renderSettingsUsers();
  renderSheetSyncSettings();
}

function renderWhatsAppTemplateSettings() {
  return `<section class="panel">
    <h2>WhatsApp Message Templates</h2>
    <p class="bulk-help">Create standard messages for prospectus, fee details, demo reminders, and follow-ups. Leads use the matching course template first.</p>
    <div id="settingsTemplateList" class="template-list">
      ${state.templates.map(template => `<div class="template-card">
        <strong>${escapeHtml(template.name || "Template")}</strong>
        <span class="muted">${escapeHtml(template.course || "Any course")} | ${escapeHtml(template.stage || "Any stage")}</span>
        <p>${escapeHtml(template.message || "")}</p>
      </div>`).join("") || "<p class='muted'>No templates yet. Add your standard message below.</p>"}
    </div>
    <form id="settingsTemplateForm" class="form-grid">
      <input name="name" placeholder="Template name e.g. Prospectus Message" required>
      <select name="course">${masters.courses.map(course => `<option>${escapeHtml(course)}</option>`).join("")}</select>
      <select name="stage">${masters.statuses.map(status => `<option>${escapeHtml(status)}</option>`).join("")}</select>
      <textarea name="message" rows="5" placeholder="Use {{student_name}}, {{course_name}}, {{attempt}}, {{branch_name}}, {{counsellor_name}}" required></textarea>
      <button class="primary">Save Template</button>
    </form>
  </section>`;
}

function renderAttendanceStudentMasterPanel() {
  return `<section class="panel">
    <h2>Attendance Students</h2>
    <p class="bulk-help">Add students here. Attendance Register remains only for marking attendance and viewing date-wise records.</p>
    <form id="attendanceStudentForm" class="form-grid">
      <strong>Add Attendance Student</strong>
      <input name="firstName" placeholder="First name" required>
      <input name="lastName" placeholder="Last name" required>
      <input name="admissionDate" type="date" placeholder="Admission date">
      <select name="batchGroup">
        <option value="">Batch A/B</option>
        <option>A</option>
        <option>B</option>
      </select>
      <input name="studentId" placeholder="Student ID">
      <select name="batch" required></select>
      <select name="studentType">
        <option>Demo</option>
        <option>Admitted</option>
      </select>
      <button class="primary">Add Student</button>
    </form>
    <div class="attendance-bulk-box">
      <select id="attendanceBulkBatch"></select>
      <textarea id="attendanceBulkNames" rows="4" placeholder="Paste from Excel with headers, or one student per line. Example:&#10;First Name	Last	Admission Date	Batch	Student ID&#10;Aman	R	14-06-2026	A	STU001"></textarea>
      <button type="button" class="primary" id="addAttendanceBulk">Add Students to Selected Batch</button>
    </div>
  </section>`;
}

function renderRoleTabAccessDesigner() {
  const disabled = !isSuperAdmin() ? "disabled" : "";
  const roleAccess = normalizeRoleTabAccess(state.roleTabAccess || {}, masters.roles);
  return `<div class="role-access-inline">
    <h3>What Each Role Can See</h3>
    ${!isSuperAdmin() ? "<p class='warning'>Login as Super Admin to edit role access.</p>" : ""}
    <p class="bulk-help">Set default tabs for each role. When you select a role while adding/editing a user, these tabs are applied automatically and can still be edited user-wise.</p>
    <div class="role-access-list">
      ${mastersRoleNames(roleAccess, masters.roles).map(role => {
        const selected = roleAccess[role] || roleTabDefaults(role);
        return `<div class="role-access-card" data-role-access="${escapeAttr(role)}">
          <strong>${escapeHtml(role)}</strong>
          <div class="access-grid compact">
            ${tabs.map(([key, label]) => `<label><input type="checkbox" value="${key}" ${selected.includes(key) ? "checked" : ""} ${disabled}> ${escapeHtml(label)}</label>`).join("")}
          </div>
        </div>`;
      }).join("")}
    </div>
    <button class="primary" data-save-role-access type="button" ${disabled}>Save Role Access</button>
  </div>`;
}

function renderPaperFacultyDesigner() {
  const disabled = !isSuperAdmin() ? "disabled" : "";
  const courses = [...new Set([...(masters.courses || []), ...defaultMasters.courses])].map(canonicalCourseName);
  return `<section class="panel paper-faculty-panel">
    <h2>Paper-wise Professors</h2>
    ${!isSuperAdmin() ? "<p class='warning'>Login as Super Admin to add or remove professors.</p>" : ""}
    <p class="bulk-help">Add professor names under each course and paper. Attendance will show professor options only after that paper is selected.</p>
    <div class="paper-faculty-grid">
      ${[...new Set(courses)].map(course => `<div class="paper-faculty-course">
        <h3>${escapeHtml(course)}</h3>
        ${paperOptionsForCourse(course).map(paper => {
          const names = masters.paperFaculty?.[course]?.[paper] || [];
          return `<div class="paper-faculty-row">
            <strong>${escapeHtml(paper)}</strong>
            <div class="setting-list compact">
              ${names.map((name, index) => `<span class="pill">${escapeHtml(name)}<button class="pill-remove" data-delete-paper-faculty="${escapeAttr(course)}|${escapeAttr(paper)}|${index}" type="button" title="Remove" ${disabled}>x</button></span>`).join("") || "<span class='muted'>No professor added</span>"}
            </div>
            <form class="paper-faculty-form" data-paper-faculty-form="${escapeAttr(course)}|${escapeAttr(paper)}">
              <input name="value" placeholder="Add professor for ${escapeAttr(paper)}" ${disabled}>
              <button class="primary" type="button" data-add-paper-faculty="${escapeAttr(course)}|${escapeAttr(paper)}" ${disabled}>Add</button>
            </form>
          </div>`;
        }).join("")}
      </div>`).join("")}
    </div>
  </section>`;
}

function renderLeadColumnDesigner() {
  const disabled = !isSuperAdmin() ? "disabled" : "";
  const options = leadColumnOptions();
  const columns = activeLeadColumns();
  return `<section class="panel lead-column-panel">
    <h2>Lead Table Columns</h2>
    <p class="bulk-help">Super Admin can decide which columns appear in Leads. Custom fields imported from old Google Sheet can be shown as separate columns.</p>
    <div class="lead-column-list">
      ${columns.map((column, index) => `<div class="lead-column-row" data-lead-column-row="${index}">
        <select data-column-key ${disabled}>
          ${options.map(option => `<option value="${escapeAttr(option.key)}" ${option.key === column.key ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
        </select>
        <input data-column-label value="${escapeAttr(column.label)}" placeholder="Column heading" ${disabled}>
        <button class="pill-remove" data-remove-lead-column="${index}" type="button" title="Remove" ${disabled}>x</button>
      </div>`).join("")}
    </div>
    <div class="toolbar">
      <button data-add-lead-column type="button" ${disabled}>Add Column</button>
      <button data-save-lead-columns class="primary" type="button" ${disabled}>Save Columns</button>
    </div>
    <div class="form-grid">
      <input id="newCustomLeadField" placeholder="Add new custom field column e.g. Enquiry Given By" ${disabled}>
      <button data-add-custom-lead-field type="button" ${disabled}>Add Custom Field</button>
    </div>
  </section>`;
}

function leadColumnOptions() {
  const standard = [
    ["createdAt", "Date Added"],
    ["leadAge", "Age of Lead"],
    ["lastEdited", "Last Edited"],
    ["name", "Name"],
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
    ["studentMobile", "Mobile No."],
    ["parentMobile", "Parent Mobile"],
    ["email", "Email"],
    ["location", "Location"],
    ["course", "Course"],
    ["attempt", "Attempt"],
    ["branch", "Branch"],
    ["batch", "Batch"],
    ["leadSource", "Lead Source"],
    ["source", "Reference"],
    ["referenceDetails", "Reference Details"],
    ["status", "Status"],
    ["assignedTo", "Admin"],
    ["followupAt", "Next Follow-up"],
    ["remarks", "Remarks"],
    ["actions", "Actions"]
  ].map(([key, label]) => ({ key, label }));
  return [...standard, ...customLeadFieldNames().map(name => ({ key: name, label: `Custom: ${name}` }))];
}

function renderAttendanceColumnDesigner() {
  const disabled = !isSuperAdmin() ? "disabled" : "";
  const options = attendanceColumnOptions();
  const columns = activeAttendanceStudentColumns();
  return `<section class="panel lead-column-panel">
    <h2>Attendance Register Designer</h2>
    <p class="bulk-help">Super Admin can choose the left-side student information columns for Attendance. Marks against lecture dates are kept separately and will not be deleted.</p>
    <div class="lead-column-list">
      ${columns.map((column, index) => `<div class="lead-column-row" data-attendance-column-row="${index}">
        <select data-attendance-column-key ${disabled}>
          ${options.map(option => `<option value="${escapeAttr(option.key)}" ${option.key === column.key ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
        </select>
        <input data-attendance-column-label value="${escapeAttr(column.label)}" placeholder="Column heading" ${disabled}>
        <input data-attendance-column-width type="number" min="34" max="180" value="${escapeAttr(attendanceColumnWidth(column))}" placeholder="Width" ${column.key === "lastName" ? "disabled" : disabled}>
        <button class="pill-remove" data-remove-attendance-column="${index}" type="button" title="Remove" ${disabled}>x</button>
      </div>`).join("")}
    </div>
    <div class="toolbar">
      <button data-add-attendance-column type="button" ${disabled}>Add Column</button>
      <button data-save-attendance-columns class="primary" type="button" ${disabled}>Save Attendance Layout</button>
    </div>
    <div class="form-grid">
      <input id="newCustomAttendanceField" placeholder="Add custom attendance field e.g. Student ID, Roll No., Fees Status" ${disabled}>
      <button data-add-custom-attendance-field type="button" ${disabled}>Add Attendance Field</button>
    </div>
  </section>`;
}

function attendanceColumnOptions() {
  const standard = [
    ["firstName", "First Name"],
    ["lastName", "Last Name First Letter"],
    ["admissionDate", "Admission Date"],
    ["batchGroup", "Batch A/B"],
    ["studentId", "Student ID"],
    ["studentType", "Student Type"]
  ].map(([key, label]) => ({ key, label }));
  return [...standard, ...customAttendanceFieldNames().map(name => ({ key: `custom:${name}`, label: `Custom: ${name}` }))];
}

function customAttendanceFieldNames() {
  const fromStudents = state.attendanceStudents.flatMap(student => Object.keys(student.customFields || {}));
  return [...new Set([...(state.customAttendanceFields || []), ...fromStudents])].filter(Boolean).sort();
}

function attendanceColumnLabel(key) {
  return attendanceColumnOptions().find(option => option.key === key)?.label?.replace(/^Custom: /, "") || key.replace(/^custom:/, "");
}

function addAttendanceColumn() {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit attendance columns.");
  const options = attendanceColumnOptions();
  const currentKeys = activeAttendanceStudentColumns().map(column => column.key);
  const next = options.find(option => !currentKeys.includes(option.key)) || options[0];
  state.attendanceStudentColumns = [...activeAttendanceStudentColumns(), { key: next.key, label: next.label.replace(/^Custom: /, ""), width: defaultAttendanceWidth(next.key) }];
  save();
  render();
}

function addCustomAttendanceField() {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit attendance columns.");
  const input = document.getElementById("newCustomAttendanceField");
  const fieldName = input?.value.trim();
  if (!fieldName) return;
  addUnique(state.customAttendanceFields, fieldName);
  const key = `custom:${fieldName}`;
  if (!activeAttendanceStudentColumns().some(column => column.key === key)) {
    state.attendanceStudentColumns = [...activeAttendanceStudentColumns(), { key, label: fieldName, width: 96 }];
  }
  save();
  render();
}

function removeAttendanceColumn(index) {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit attendance columns.");
  if (!confirm("Remove this column from the Attendance register view? Data will not be deleted.")) return;
  state.attendanceStudentColumns = activeAttendanceStudentColumns().filter((_, i) => i !== index);
  if (!state.attendanceStudentColumns.length) state.attendanceStudentColumns = structuredClone(defaultAttendanceStudentColumns);
  save();
  render();
}

function saveAttendanceColumnsFromDesigner() {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit attendance columns.");
  const rows = [...document.querySelectorAll("[data-attendance-column-row]")];
  state.attendanceStudentColumns = rows.map(row => {
    const key = row.querySelector("[data-attendance-column-key]")?.value;
    const label = row.querySelector("[data-attendance-column-label]")?.value.trim() || attendanceColumnLabel(key);
    const width = Number(row.querySelector("[data-attendance-column-width]")?.value) || defaultAttendanceWidth(key);
    return { key, label, width };
  }).filter(column => column.key);
  save();
  render();
}

function resetAttendanceColumns() {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit attendance columns.");
  if (!confirm("Reset Attendance register columns to the default view?")) return;
  state.attendanceStudentColumns = structuredClone(defaultAttendanceStudentColumns);
  save();
  render();
}

function defaultAttendanceWidth(key) {
  return defaultAttendanceStudentColumns.find(column => column.key === key)?.width || 96;
}

function customLeadFieldNames() {
  const fromLeads = state.leads.flatMap(lead => Object.keys(lead.customFields || {}));
  return [...new Set([...(state.customLeadFields || []), ...fromLeads])].filter(Boolean).sort();
}

function leadColumnLabel(key) {
  return leadColumnOptions().find(option => option.key === key)?.label?.replace(/^Custom: /, "") || key;
}

function addLeadColumn() {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit lead columns.");
  const options = leadColumnOptions();
  const currentKeys = activeLeadColumns().map(column => column.key);
  const next = options.find(option => !currentKeys.includes(option.key)) || options[0];
  state.leadColumns = [...activeLeadColumns(), { key: next.key, label: next.label.replace(/^Custom: /, "") }];
  save();
  render();
}

function addCustomLeadField() {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit lead columns.");
  const input = document.getElementById("newCustomLeadField");
  const fieldName = input?.value.trim();
  if (!fieldName) return;
  addUnique(state.customLeadFields, fieldName);
  if (!activeLeadColumns().some(column => column.key === fieldName)) {
    state.leadColumns = [...activeLeadColumns(), { key: fieldName, label: fieldName }];
  }
  save();
  render();
}

function removeLeadColumn(index) {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit lead columns.");
  if (!confirm("Remove this column from the Leads table view? Data will not be deleted.")) return;
  state.leadColumns = activeLeadColumns().filter((_, i) => i !== index);
  if (!state.leadColumns.length) state.leadColumns = structuredClone(defaultLeadColumns);
  save();
  render();
}

function saveLeadColumnsFromDesigner() {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit lead columns.");
  const rows = [...document.querySelectorAll("[data-lead-column-row]")];
  state.leadColumns = rows.map(row => {
    const key = row.querySelector("[data-column-key]")?.value;
    const label = row.querySelector("[data-column-label]")?.value.trim() || leadColumnLabel(key);
    return { key, label };
  }).filter(column => column.key);
  save();
  render();
}

function resetLeadColumns() {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit lead columns.");
  if (!confirm("Reset Leads table columns to the default view?")) return;
  state.leadColumns = structuredClone(defaultLeadColumns);
  save();
  render();
}

function renderMasterEditor(key, title) {
  return `<section class="panel">
    <h2>${title}</h2>
    <div class="setting-list">
      ${masters[key].map((value, index) => `
        <span class="pill">
          ${escapeHtml(value)}
          <button class="pill-remove" data-delete-master="${key}:${index}" type="button" title="Remove">x</button>
        </span>`).join("")}
    </div>
    <div class="setting-list">
      ${defaultMasters[key].filter(value => !masters[key].includes(value)).map(value => `<button data-add-suggestion="${key}:${escapeAttr(value)}" type="button">${escapeHtml(value)}</button>`).join("")}
    </div>
    <form class="form-grid" data-master-form="${key}">
      <input name="value" placeholder="Add ${title.toLowerCase()}" required>
      <button class="primary">Add</button>
    </form>
    ${key === "roles" ? renderRoleTabAccessDesigner() : ""}
  </section>`;
}

function withUnassigned(values) {
  return ["Unassigned", ...values.filter(v => v !== "Unassigned")];
}

function renderUserTabAccess(containerId, user = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const role = user?.role || container.closest("form")?.elements.role?.value || "";
  const selected = user?.tabAccessMode === "custom" && Array.isArray(user?.tabAccess) && user.tabAccess.length ? normalizeUserTabAccess(user.tabAccess) : roleTabDefaults(role);
  const disabled = !isSuperAdmin() ? "disabled" : "";
  container.innerHTML = `
    <label class="access-title">Tabs visible to this user <span class="muted">(role default can be edited here)</span></label>
    <div class="access-grid">
      ${tabs.map(([key, label]) => `<label><input type="checkbox" name="tabAccess" value="${key}" ${selected.includes(key) ? "checked" : ""} ${disabled}> ${escapeHtml(label)}</label>`).join("")}
    </div>`;
}

function collectTabAccess(form) {
  const checked = [...form.querySelectorAll('input[name="tabAccess"]:checked')].map(input => input.value);
  return checked.length ? checked : tabs.map(([key]) => key);
}

function sameTabAccess(left = [], right = []) {
  const a = normalizeUserTabAccess(left).sort().join("|");
  const b = normalizeUserTabAccess(right).sort().join("|");
  return a === b;
}

function userAccessLabel(user) {
  if (isSuperAdminUser(user)) return "All tabs";
  const allowed = user?.tabAccessMode === "custom" && Array.isArray(user.tabAccess) && user.tabAccess.length ? normalizeUserTabAccess(user.tabAccess) : roleTabDefaults(user.role);
  if (allowed.length === tabs.length) return "All tabs";
  return allowed.map(key => tabs.find(tab => tab[0] === key)?.[1] || key).join(", ");
}

function saveRoleTabAccess() {
  if (!isSuperAdmin()) return alert("Only Super Admin can save role access.");
  const next = {};
  document.querySelectorAll("[data-role-access]").forEach(card => {
    const role = card.dataset.roleAccess;
    next[role] = [...card.querySelectorAll("input[type='checkbox']:checked")].map(input => input.value);
    if (!next[role].length) next[role] = ["dashboard"];
  });
  state.roleTabAccess = normalizeRoleTabAccess(next, masters.roles);
  save();
  render();
}

function applyRoleDefaultsToUserForm(form) {
  if (!form || !isSuperAdmin()) return;
  const role = form.elements.role?.value || "";
  const selected = roleTabDefaults(role);
  form.dataset.roleChanged = "1";
  form.querySelectorAll('input[name="tabAccess"]').forEach(input => {
    input.checked = selected.includes(input.value);
  });
}

function getSheetSyncSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(`${storeKey}.sheetSync`) || "{}");
    return {
      url: normalizeSheetUrl(saved.url) || fixedSheetWebAppUrl,
      token: String(saved.token || ""),
      auto: true
    };
  } catch {
    return { url: fixedSheetWebAppUrl, token: "", auto: true };
  }
}

function setSheetSyncSettings(settings = {}) {
  const existing = getSheetSyncSettings();
  const url = normalizeSheetUrl(settings.url) || fixedSheetWebAppUrl || existing.url;
  localStorage.setItem(`${storeKey}.sheetSync`, JSON.stringify({
    url,
    token: settings.token || existing.token || "",
    auto: true
  }));
}

function ensureFixedSheetSync() {
  setSheetSyncSettings(getSheetSyncSettings());
}

function normalizeSheetUrl(url) {
  const value = String(url || "").trim();
  const match = value.match(/https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec/);
  return match ? match[0] : "";
}

function renderSheetSyncSettings() {
  const settings = getSheetSyncSettings();
  setSheetStatus(settings.url ? `Auto sync is ON. App loads from cloud on start and reminds/saves every ${cloudReminderMinutes} minutes.` : "Cloud sync is hidden and not configured on this device.", settings.url ? "ok" : "info");
}

function saveSheetSyncSettings() {
  setSheetSyncSettings({ auto: true });
  startPeriodicSheetSync();
  setSheetStatus(getSheetSyncSettings().url ? `Auto sync is ON. Your work saves automatically and every ${cloudReminderMinutes} minutes.` : "Cloud sync is hidden and not configured on this device.", getSheetSyncSettings().url ? "ok" : "info");
}

function setSheetStatus(message, type = "info") {
  const status = document.getElementById("sheetSyncStatus");
  if (status) status.textContent = message || "";
  setCloudBadge(message, type);
}

function showCloudReminderPopup(message) {
  let popup = document.getElementById("cloudReminderPopup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "cloudReminderPopup";
    popup.className = "cloud-reminder-popup";
    document.body.appendChild(popup);
  }
  popup.textContent = message;
  popup.classList.add("show");
  clearTimeout(showCloudReminderPopup.timer);
  showCloudReminderPopup.timer = setTimeout(() => popup.classList.remove("show"), 6500);
}

function setCloudBadge(message, type = "info") {
  const badge = document.getElementById("cloudStatusBadge");
  if (!badge) return;
  badge.textContent = compactCloudMessage(message);
  badge.dataset.status = type;
  updateCloudTimeLabel();
  clearTimeout(cloudStatusTimer);
  if (type !== "busy") {
    cloudStatusTimer = setTimeout(updateCloudBadgeFromLastSave, 8000);
  }
}

function compactCloudMessage(message = "") {
  if (/load/i.test(message) && !/loaded/i.test(message)) return "Cloud: loading";
  if (/loaded/i.test(message)) return "Cloud: loaded";
  if (/saving/i.test(message)) return "Cloud: saving";
  if (/saved/i.test(message)) return "Cloud: saved";
  if (/failed|could not|check/i.test(message)) return "Cloud: check";
  return "Cloud: auto on";
}

function updateCloudBadgeFromLastSave() {
  const badge = document.getElementById("cloudStatusBadge");
  if (!badge) return;
  const savedAt = localStorage.getItem(`${storeKey}.lastCloudSave`);
  const loadedAt = localStorage.getItem(`${storeKey}.lastCloudLoad`);
  const lastAt = savedAt || loadedAt;
  if (!lastAt) {
    badge.textContent = "Cloud: auto on";
    badge.dataset.status = "info";
    return;
  }
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(lastAt).getTime()) / 60000));
  badge.textContent = minutes < 1 ? "Cloud: just now" : `Cloud: ${minutes} min ago`;
  badge.dataset.status = "ok";
  updateCloudTimeLabel();
}

function formatCloudTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function updateCloudTimeLabel() {
  const label = document.getElementById("cloudLastSaved");
  if (!label) return;
  const savedAt = localStorage.getItem(`${storeKey}.lastCloudSave`);
  const loadedAt = localStorage.getItem(`${storeKey}.lastCloudLoad`);
  if (savedAt) {
    label.textContent = `Last saved: ${formatCloudTime(savedAt)}`;
  } else if (loadedAt) {
    label.textContent = `Last loaded: ${formatCloudTime(loadedAt)}`;
  } else {
    label.textContent = "Last saved: not yet";
  }
}

function setCloudButtonBusy(action, busy) {
  const button = document.getElementById(action === "save" ? "saveWorkBtn" : "loadWorkBtn");
  if (!button) return;
  if (busy) {
    button.dataset.busy = "true";
    button.dataset.originalText = button.dataset.originalText || button.textContent;
    button.textContent = action === "save" ? "Saving..." : "Loading...";
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || (action === "save" ? "Cloud Save" : "Cloud Load");
    button.disabled = false;
    delete button.dataset.busy;
  }
}

function queueCloudSave() {
  const settings = getSheetSyncSettings();
  if (!settings.auto || !settings.url || isCloudLoading) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => syncCloudNow({ silent: true }), 600);
}

function startPeriodicSheetSync() {
  clearInterval(periodicSyncTimer);
  updateCloudBadgeFromLastSave();
  periodicSyncTimer = setInterval(() => {
    const settings = getSheetSyncSettings();
    if (settings.auto && settings.url && !isCloudLoading) {
      setSheetStatus(`${cloudReminderMinutes}-minute auto sync: loading others' work and saving latest CRM data...`, "busy");
      syncCloudNow({ silent: false, reminder: true });
    }
  }, cloudReminderMinutes * 60 * 1000);
}

async function syncCloudNow({ silent = false, reminder = false } = {}) {
  if (!silent) setCloudButtonBusy("save", true);
  if (!silent) setSheetStatus(reminder ? `${cloudReminderMinutes}-minute auto sync running...` : "Syncing cloud: loading others' work, then saving yours...", "busy");
  if (reminder) showCloudReminderPopup("Auto sync running: loading others' work and saving yours.");
  try {
    await loadFromSheet({ silent: true });
    const saved = await saveToSheet({ silent: true });
    if (!silent) setSheetStatus(saved ? "Work synced: others' work loaded and your work saved." : "Sync could not complete. Check cloud access.", saved ? "ok" : "error");
    if (reminder) showCloudReminderPopup(saved ? "Auto sync complete. Work is saved on cloud." : "Auto sync needs attention. Please check cloud access.");
    return saved;
  } finally {
    if (!silent) setCloudButtonBusy("save", false);
  }
}

function saveToSheet({ silent = false, reminder = false } = {}) {
  const settings = getSheetSyncSettings();
  if (!settings.url) {
    if (!silent) setSheetStatus("Cloud sync is not configured on this device.", "error");
    return Promise.resolve(false);
  }
  if (!hasBusinessData()) {
    if (silent || reminder) {
      setCloudBadge("Cloud save skipped: current browser data is empty.", "error");
      return Promise.resolve(false);
    }
    if (!confirm("Current browser data has no users/leads/admissions. Saving now may overwrite cloud data with an empty database. Save anyway?")) return Promise.resolve(false);
  }
  if (!silent) setCloudButtonBusy("save", true);
  if (!silent) setSheetStatus(reminder ? `${cloudReminderMinutes}-minute cloud reminder: saving latest CRM data...` : "Saving to Google Sheet...", "busy");
  const body = new URLSearchParams();
  body.set("mode", "save");
  if (settings.token) body.set("token", settings.token);
  body.set("payload", JSON.stringify(stripSensitiveData(structuredClone(state))));
  return fetch(settings.url, { method: "POST", mode: "no-cors", body })
    .then(() => {
      localStorage.setItem(`${storeKey}.lastCloudSave`, new Date().toISOString());
      if (!silent) setSheetStatus(reminder ? `Cloud saved. Next reminder/save will run in ${cloudReminderMinutes} minutes.` : "Saved to Google Sheet.", "ok");
      if (silent) updateCloudBadgeFromLastSave();
      return true;
    })
    .catch(() => {
      if (!silent) setSheetStatus("Save failed. Check Web App URL and sharing permissions.", "error");
      if (silent) setCloudBadge("Save failed. Check Web App URL and sharing permissions.", "error");
      return false;
    })
    .finally(() => {
      if (!silent) setCloudButtonBusy("save", false);
    });
}

function loadFromSheet({ silent = false } = {}) {
  const settings = getSheetSyncSettings();
  if (!settings.url) {
    if (!silent) setSheetStatus("Cloud sync is not configured on this device.", "error");
    return Promise.resolve(false);
  }
  return new Promise(resolve => {
    const callbackName = `crmSheetLoad_${Date.now()}`;
    if (!silent) setCloudButtonBusy("load", true);
    setSheetStatus(silent ? "Auto-loading latest CRM data from cloud..." : "Loading from Google Sheet...", "busy");
    const finish = result => {
      isCloudLoading = false;
      if (!silent) setCloudButtonBusy("load", false);
      delete window[callbackName];
      document.getElementById(callbackName)?.remove();
      resolve(result);
    };
    window[callbackName] = payload => {
      try {
        if (payload?.data) {
          const incoming = payload.data;
          normalizeStateDefaults(incoming);
          const localScore = dataScore(state);
          const incomingScore = dataScore(incoming);
          if (localScore > 0 && incomingScore < Math.max(5, Math.floor(localScore * 0.35))) {
            const message = `Cloud load blocked because cloud data looks empty/older. Local score ${localScore}, cloud score ${incomingScore}.`;
            setSheetStatus(message, "error");
            finish(false);
            return;
          }
          isCloudLoading = true;
          backupBeforeReplace(silent ? "auto cloud load" : "manual cloud load");
          const merged = mergeCloudState(state, incoming);
          const mergedScore = dataScore(merged);
          state = merged;
          masters = state.masters || masters;
          localStorage.setItem(storeKey, JSON.stringify(state));
          writeLocalSafetyBackup("cloud merge");
          isCloudLoading = false;
          loadCurrentUser();
          render();
          localStorage.setItem(`${storeKey}.lastCloudLoad`, new Date().toISOString());
          setSheetStatus(silent ? "Latest cloud data merged on app start." : "Loaded and merged from Google Sheet.", "ok");
          if (mergedScore > incomingScore) setTimeout(() => saveToSheet({ silent: true }), 1500);
          finish(true);
        } else if (!silent) {
          setSheetStatus("Google Sheet is empty. Save current data to initialize it.", "info");
          finish(false);
        } else {
          setSheetStatus("Cloud database is empty. Use Save your work to initialize it.", "info");
          finish(false);
        }
      } catch {
        setSheetStatus("Could not load Google Sheet data.", "error");
        finish(false);
      }
    };
    const script = document.createElement("script");
    script.id = callbackName;
    const loadParams = new URLSearchParams({ mode: "load", callback: callbackName, t: String(Date.now()) });
    if (settings.token) loadParams.set("token", settings.token);
    script.src = `${settings.url}${settings.url.includes("?") ? "&" : "?"}${loadParams.toString()}`;
    script.onerror = () => {
      setSheetStatus("Load failed. Check Web App URL deployment access.", "error");
      finish(false);
    };
    document.body.appendChild(script);
  });
}

function updateFromOldGoogleSheet({ skipConfirm = false } = {}) {
  alert("Old data import is hidden/disabled in this software.");
  return;
  if (!isSuperAdmin() && !isLeadManager()) {
    alert("Only Super Admin or Lead Manager can update leads from the old Google Sheet.");
    return;
  }
  if (!skipConfirm && !confirm("Load old Google Sheet columns for mapping before import? No CRM data will change until you confirm the final import.")) return;
  const settings = getSheetSyncSettings();
  const callbackName = `crmLegacySheet_${Date.now()}`;
  setSheetStatus("Reading old Google Sheet...");
  window[callbackName] = payload => {
    try {
      if (!payload?.ok) throw new Error(payload?.error || "Could not read old Google Sheet.");
      legacySheetPayload = { rows: payload.rows || [], headers: payload.headers || [] };
      renderLegacySheetMapping();
      document.getElementById("legacySheetDialog").showModal();
      setSheetStatus(`Old Google Sheet loaded: ${legacySheetPayload.rows.length} rows. Map columns before importing.`);
    } catch (error) {
      setSheetStatus("Old Google Sheet update failed. Check Apps Script deployment and sheet access.");
      alert(`Old Google Sheet update failed: ${error.message}`);
    } finally {
      delete window[callbackName];
      document.getElementById(callbackName)?.remove();
    }
  };
  const script = document.createElement("script");
  script.id = callbackName;
  script.src = `${settings.url}${settings.url.includes("?") ? "&" : "?"}mode=legacy&callback=${callbackName}&t=${Date.now()}`;
  script.onerror = () => {
    setSheetStatus("Old Google Sheet update failed. Check Apps Script access.");
    delete window[callbackName];
    script.remove();
  };
  document.body.appendChild(script);
}

function syncLeadsAndAdmissions() {
  alert("Google Sheet import/sync is hidden/disabled in this software.");
  return;
  if (!isSuperAdmin() && !isLeadManager()) {
    alert("Only Super Admin or Lead Manager can sync leads and admissions.");
    return;
  }
  if (!confirm("Sync old leads and admissions together? You will map leads first, then admissions. CRM data changes only after each final import confirmation.")) return;
  syncAdmissionsAfterLegacy = true;
  setSheetStatus("Loading old leads and admission sheets...");
  loadAdmissionSheetPayload({ silent: true, afterLoad: () => updateFromOldGoogleSheet({ skipConfirm: true }) });
}

function renderLegacySheetMapping() {
  const headers = legacySheetPayload?.headers || [];
  const rows = legacySheetPayload?.rows || [];
  const options = legacyMappingOptions();
  const mappingHtml = `
    <table class="legacy-map-table">
      <thead><tr><th>Old Google Sheet Column</th><th>Use In CRM As</th><th>Custom Field Name</th><th>Sample Value</th></tr></thead>
      <tbody>
        ${headers.map(header => `<tr>
          <td><strong>${escapeHtml(header)}</strong></td>
          <td><select data-legacy-map="${escapeAttr(header)}">${options.map(([value, label]) => `<option value="${value}" ${value === guessLegacyField(header) ? "selected" : ""}>${label}</option>`).join("")}</select></td>
          <td><input data-legacy-custom="${escapeAttr(header)}" placeholder="e.g. Webinar ID, Old Batch" value="${escapeAttr(header)}"></td>
          <td>${escapeHtml(firstNonBlank(rows, header))}</td>
        </tr>`).join("")}
      </tbody>
    </table>`;
  document.getElementById("legacyMapping").innerHTML = mappingHtml;
  renderLegacyPreview();
  document.querySelectorAll("[data-legacy-map]").forEach(select => {
    select.addEventListener("change", () => {
      updateLegacyCustomInputs();
      renderLegacyPreview();
    });
  });
  document.querySelectorAll("[data-legacy-custom]").forEach(input => input.addEventListener("input", renderLegacyPreview));
  updateLegacyCustomInputs();
}

function renderLegacyPreview() {
  const headers = legacySheetPayload?.headers || [];
  const rows = (legacySheetPayload?.rows || []).slice(0, 5);
  const mapping = collectLegacyMapping();
  const customNames = collectLegacyCustomNames();
  const preview = rows.map(row => legacyRowToLead(row, headers, "Old Google Sheet - Form Responses 1", mapping, customNames));
  table("legacyPreview", preview, ["Preview Name", "Mobile", "Course", "Attempt", "Branch", "Admin", "Custom Fields", "Remarks From"], lead => [
    displayLeadName(lead),
    lead.studentMobile,
    lead.course,
    lead.attempt,
    lead.branch,
    lead.assignedTo,
    formatCustomFields(lead.customFields),
    lead._remarkFields || ""
  ]);
}

function legacyMappingOptions() {
  return [
    ["", "Ignore"],
    ["studentName", "Student Name"],
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
    ["studentMobile", "Student Mobile"],
    ["parentMobile", "Parent Mobile"],
    ["email", "Email"],
    ["location", "Location / Area"],
    ["branch", "Branch"],
    ["course", "Course"],
    ["attempt", "Attempt"],
    ["academicBackground", "Academic / Qualification"],
    ["college", "College / School"],
    ["assignedTo", "Admin Assigned"],
    ["legacyCategory", "Admission / Follow-up Category"],
    ["status", "Lead Status"],
    ["leadSource", "Lead Source"],
    ["remarks", "Remarks"],
    ["createdAt", "Date Added"],
    ["custom", "Custom Field"]
  ];
}

function guessLegacyField(header) {
  const label = normalizeHeader(header);
  if (/enquiry.*given|given.*by|counsellor|admin|assigned/.test(label)) return "assignedTo";
  if (/category|stage|calling.*status|response.*status|final.*status/.test(label)) return "legacyCategory";
  if (/first.*name/.test(label)) return "firstName";
  if (/last.*name|surname/.test(label)) return "lastName";
  if (/student.*name|full.*name|candidate.*name|^name$/.test(label)) return "studentName";
  if (/parent|father|mother|guardian/.test(label)) return "parentMobile";
  if (/mobile|phone|contact|whatsapp/.test(label)) return "studentMobile";
  if (/mail/.test(label)) return "email";
  if (/course|cma|foundation|inter|final/.test(label)) return "course";
  if (/attempt|exam|month|june|dec/.test(label)) return "attempt";
  if (/student.*location|student.*area|where.*stay|stay|city/.test(label)) return "location";
  if (/branch|preferred.*location|location|address/.test(label)) return "branch";
  if (/qualification|education|class|graduation|academic/.test(label)) return "academicBackground";
  if (/college|school|institution/.test(label)) return "college";
  if (/source|reference/.test(label)) return "leadSource";
  if (/remark|note|comment|query|doubt/.test(label)) return "remarks";
  if (/timestamp|date|submitted|created/.test(label)) return "createdAt";
  return "";
}

function firstNonBlank(rows, header) {
  return (rows.find(row => row[header]) || {})[header] || "";
}

function collectLegacyMapping() {
  const mapping = {};
  document.querySelectorAll("[data-legacy-map]").forEach(select => {
    if (select.value) mapping[select.dataset.legacyMap] = select.value;
  });
  return mapping;
}

function collectLegacyCustomNames() {
  const customNames = {};
  document.querySelectorAll("[data-legacy-custom]").forEach(input => {
    const header = input.dataset.legacyCustom;
    const mappedAs = document.querySelector(`[data-legacy-map="${cssEscape(header)}"]`)?.value;
    if (mappedAs === "custom") customNames[header] = input.value.trim() || header;
  });
  return customNames;
}

function updateLegacyCustomInputs() {
  document.querySelectorAll("[data-legacy-custom]").forEach(input => {
    const header = input.dataset.legacyCustom;
    const mappedAs = document.querySelector(`[data-legacy-map="${cssEscape(header)}"]`)?.value;
    input.disabled = mappedAs !== "custom";
  });
}

function confirmImportLegacySheet() {
  if (!legacySheetPayload) return;
  const mapping = collectLegacyMapping();
  const customNames = collectLegacyCustomNames();
  if (!Object.values(mapping).includes("studentMobile")) {
    alert("Please tag one Google Sheet column as Student Mobile before importing.");
    return;
  }
  const overwrite = Boolean(document.getElementById("legacyOverwrite")?.checked);
  if (!confirm(`Import/update ${legacySheetPayload.rows.length} rows using this mapping?`)) return;
  const result = importLegacySheetRows(legacySheetPayload.rows, legacySheetPayload.headers, mapping, { overwrite, customNames });
  save();
  render();
  document.getElementById("legacySheetDialog").close();
  setSheetStatus(`Old Google Sheet updated: ${result.created} new, ${result.updated} updated, ${result.admitted} admissions, ${result.skipped} skipped.`);
  if (syncAdmissionsAfterLegacy && admissionSheetPayload) {
    alert(`Leads updated.\nNew leads: ${result.created}\nUpdated leads: ${result.updated}\nAdmissions from lead categories: ${result.admitted}\nSkipped rows: ${result.skipped}\n\nNext: map the admissions sheet.`);
    renderAdmissionSheetMapping();
    document.getElementById("admissionSheetDialog").showModal();
    setSheetStatus("Leads updated. Now map and import admissions.");
    return;
  }
  alert(`Updated from Google Sheet.\nNew leads: ${result.created}\nUpdated leads: ${result.updated}\nAdmissions created: ${result.admitted}\nSkipped rows: ${result.skipped}`);
}

function importLegacySheetRows(rows, headers, mapping = {}, options = {}) {
  const stamp = new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  const sourceName = "Old Google Sheet - Form Responses 1";
  addUnique(masters.sources, sourceName);
  let created = 0;
  let updated = 0;
  let admitted = 0;
  let skipped = 0;

  rows.forEach(row => {
    const lead = legacyRowToLead(row, headers, sourceName, mapping, options.customNames || {});
    if (!lead.studentMobile) {
      skipped += 1;
      return;
    }
    Object.keys(lead.customFields || {}).forEach(field => addUnique(state.customLeadFields, field));
    const existing = state.leads.find(item => item.studentMobile === lead.studentMobile);
    const categoryRemark = lead.legacyCategory ? `Old Category: ${lead.legacyCategory}` : "";
    const importRemark = `[${stamp}] Imported/updated from ${sourceName}, row ${row._rowNumber || ""}\n${[categoryRemark, legacyRowRemark(row, headers, mapping, options.customNames || {})].filter(Boolean).join("\n")}`;
    let finalLead = lead;
    if (existing) {
      mergeLegacyLead(existing, lead, options);
      existing.remarks = appendRemark(existing.remarks, importRemark);
      existing.oldSheetRowNumber = row._rowNumber || existing.oldSheetRowNumber || "";
      finalLead = existing;
      updated += 1;
    } else {
      finalLead = {
        ...lead,
        id: id(),
        remarks: importRemark,
        createdAt: lead.createdAt || new Date().toISOString(),
        lastTouchedAt: "",
        lastTouchType: "",
        oldSheetRowNumber: row._rowNumber || ""
      };
      state.leads.unshift(finalLead);
      created += 1;
    }
    if (isAdmissionDoneCategory(lead.legacyCategory) && ensureLegacyAdmission(finalLead, lead)) admitted += 1;
  });
  return { created, updated, admitted, skipped };
}

function legacyRowToLead(row, headers, sourceName, mapping = {}, customNames = {}) {
  const rowText = headers.map(header => row[header]).filter(Boolean).join("\n");
  const phones = rowText.match(/\b[6-9]\d{9}\b/g) || [];
  const mapped = mappedLegacyValues(row, headers, mapping);
  const customFields = mappedLegacyCustomFields(row, headers, mapping, customNames);
  const name = mapped.studentName || legacyField(row, headers, ["student name", "name", "full name", "candidate name"]) || inferName(rowText);
  const mobile = onlyPhone(mapped.studentMobile) || onlyPhone(legacyField(row, headers, ["mobile", "phone", "contact", "whatsapp", "student mobile"])) || phones[0] || "";
  const parentMobile = onlyPhone(mapped.parentMobile) || onlyPhone(legacyField(row, headers, ["parent", "father", "mother", "guardian"])) || phones.find(phone => phone !== mobile) || "";
  const email = mapped.email || legacyField(row, headers, ["email", "mail"]) || (rowText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [""])[0];
  const timestamp = mapped.createdAt || legacyField(row, headers, ["timestamp", "date", "created", "submitted"]);
  const location = mapped.location || "";
  const courseText = mapped.course || legacyField(row, headers, ["course", "enquiry", "interested"]);
  const attempt = mapped.attempt || legacyField(row, headers, ["attempt", "exam", "month"]);
  const qualification = mapped.academicBackground || legacyField(row, headers, ["qualification", "education", "class", "graduation", "college", "academic"]);
  const college = mapped.college || legacyField(row, headers, ["college", "school", "institution"]);
  const branch = mapped.branch || legacyField(row, headers, ["branch", "location", "address", "location preferred", "preferred branch"]);
  const assignedTo = matchAdminName(mapped.assignedTo) || currentUser?.name || state.users[0]?.name || "";
  const legacyCategory = detectLegacyCategory(row, headers, mapped);
  const status = legacyStatusFromCategory(legacyCategory, mapped.status);
  const mappedRemarkFields = headers.filter(header => mapping[header] === "remarks");
  const firstName = mapped.firstName || firstNameOf(name || "Unknown Student");
  const lastName = mapped.lastName || String(name || "").trim().split(/\s+/).slice(1).join(" ");
  const lead = {
    studentName: titleCase([firstName, lastName].filter(Boolean).join(" ") || name || "Unknown Student"),
    firstName: titleCase(firstName),
    lastName: titleCase(lastName),
    studentMobile: mobile,
    parentMobile,
    email,
    location: smartTitleCase(location),
    branch: detectBranch(branch || rowText, branch) || "Unassigned",
    course: courseText ? detectCourse(courseText) : detectCourse(rowText),
    attempt: attempt || "",
    academicBackground: qualification || "",
    currentQualification: qualification || "",
    college,
    source: sourceName,
    leadSource: mapped.leadSource || sourceName,
    assignedTo,
    status,
    legacyCategory,
    followupAt: nextDayInputValue(),
    createdAt: parseDateOrNow(timestamp),
    oldSheetSource: sourceName,
    customFields: addCourseGroupCustomField(customFields, courseText || rowText),
    _remarkFields: mappedRemarkFields.map(header => `${header}: ${row[header]}`).filter(Boolean).join("<br>")
  };
  return lead;
}

function mappedLegacyValues(row, headers, mapping) {
  const values = {};
  headers.forEach(header => {
    const target = mapping[header];
    if (!target) return;
    const value = String(row[header] || "").trim();
    if (!value) return;
    values[target] = values[target] ? `${values[target]} ${value}`.trim() : value;
  });
  return values;
}

function mappedLegacyCustomFields(row, headers, mapping, customNames = {}) {
  const fields = {};
  headers.forEach(header => {
    if (mapping[header] !== "custom") return;
    const value = String(row[header] || "").trim();
    if (!value) return;
    const name = customNames[header] || header;
    fields[name] = value;
  });
  return fields;
}

function normalizeLegacyCategory(value) {
  return String(value || "").trim().replace(/[–—]/g, "-").replace(/\s+/g, " ");
}

function legacyCategories() {
  return [
    "Admission Done",
    "Admission in Process",
    "Will Visit Branch",
    "Will Attend Demo",
    "Follow Up Again",
    "Will Let Us Know in 1-2 Days",
    "Will Let Us Know in 1–2 Days",
    "After Result",
    "Not Connected",
    "Not Connected Called Many Times",
    "Joined Other CMA Classes",
    "Joined Other Course in JKSC",
    "Not Interested to Join JKSC",
    "Drop CMA",
    "Fees Issue at JKSC",
    "Out of Station",
    "Wrong Number",
    "Duplicate",
    "Others"
  ];
}

function detectLegacyCategory(row, headers, mapped = {}) {
  const direct = normalizeLegacyCategory(mapped.legacyCategory || legacyField(row, headers, ["category", "stage", "calling status", "response status", "final status"]));
  const text = [direct, ...headers.map(header => row[header] || "")].join("\n").toLowerCase();
  const categories = legacyCategories();
  const admissionDone = categories[0];
  if (text.includes(admissionDone.toLowerCase())) return admissionDone;
  return categories.find(category => text.includes(category.toLowerCase())) || direct;
}

function isAdmissionDoneCategory(category) {
  return normalizeLegacyCategory(category).toLowerCase() === "admission done";
}

function legacyStatusFromCategory(category, mappedStatus) {
  if (mappedStatus && masters.statuses.includes(mappedStatus)) return mappedStatus;
  const normalized = normalizeLegacyCategory(category).toLowerCase();
  const statusByCategory = {
    "admission done": "Converted / Admitted",
    "admission in process": "Fees Discussion Pending",
    "will visit branch": "Interested",
    "will attend demo": "Demo Attended",
    "follow up again": "Follow-up Required",
    "will let us know in 1-2 days": "Follow-up Required",
    "will let us know in 1–2 days": "Follow-up Required",
    "after result": "Follow-up Required",
    "not connected": "Not Reachable",
    "not connected called many times": "Not Reachable",
    "joined other cma classes": "Lost Lead",
    "joined other course in jksc": "Lost Lead",
    "not interested to join jksc": "Not Interested",
    "drop cma": "Lost Lead",
    "fees issue at jksc": "Lost Lead",
    "out of station": "Follow-up Required",
    "wrong number": "Not Reachable",
    "duplicate": "Lost Lead",
    "others": "Follow-up Required"
  };
  const mapped = statusByCategory[normalized];
  if (mapped && masters.statuses.includes(mapped)) return mapped;
  return masters.statuses.includes("New Lead") ? "New Lead" : masters.statuses[0] || "";
}

function ensureLegacyAdmission(lead, importedLead) {
  if (!lead?.id) return false;
  if (state.admissions.some(admission => admission.leadId === lead.id)) return false;
  lead.status = "Converted / Admitted";
  lead.lastTouchedAt = lead.lastTouchedAt || new Date().toISOString();
  lead.lastTouchType = lead.lastTouchType || "Admission";
  state.admissions.unshift({
    id: id(),
    leadId: lead.id,
    admissionDate: (lead.createdAt || importedLead.createdAt || todayDate()).slice(0, 10),
    course: lead.course || importedLead.course || "",
    batch: lead.batch || "Unassigned",
    feesAgreed: "",
    feesPaid: "",
    paymentMode: "",
    receiptNumber: "",
    counsellor: lead.assignedTo || importedLead.assignedTo || "",
    remarks: `Created from old Google Sheet category: ${importedLead.legacyCategory || "Admission Done"}`
  });
  return true;
}

function addCourseGroupCustomField(customFields, courseText) {
  const group = detectCourseGroup(courseText);
  if (!group) return customFields;
  addUnique(state.customLeadFields, "Course Group");
  return { ...customFields, "Course Group": group };
}

function detectCourseGroup(text) {
  const upper = String(text || "").toUpperCase();
  if (/\bBG\b/.test(upper)) return "Both Groups";
  const group = upper.match(/\bG\s*([1-4])\b/);
  return group ? `Group ${group[1]}` : "";
}

function matchAdminName(value) {
  const normalized = normalizeLogin(value);
  if (!normalized) return "";
  return state.users.find(user =>
    normalizeLogin(user.name) === normalized ||
    normalizeLogin(firstNameOf(user.name)) === normalized ||
    normalizeLogin(user.name).startsWith(normalized)
  )?.name || String(value || "").trim();
}

function parseDateOrNow(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function legacyField(row, headers, keywords) {
  const normalized = headers.map(header => ({ header, label: normalizeHeader(header) }));
  const found = normalized.find(item => keywords.some(keyword => item.label.includes(normalizeHeader(keyword))));
  return found ? String(row[found.header] || "").trim() : "";
}

function normalizeHeader(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function onlyPhone(value) {
  return extractPhoneNumbers(value)[0] || "";
}

function extractPhoneNumbers(value) {
  const text = String(value || "");
  const matches = text.match(/(?:\+?91[\s.-]*)?[6-9](?:[\s.-]*\d){9}\b/g) || [];
  return [...new Set(matches.map(match => match.replace(/\D/g, "").slice(-10)).filter(phone => /^[6-9]\d{9}$/.test(phone)))];
}

function containsPhone(value) {
  return extractPhoneNumbers(value).length > 0;
}

function mergeLegacyLead(existing, imported, options = {}) {
  ["studentName", "firstName", "lastName", "parentMobile", "email", "location", "branch", "course", "attempt", "academicBackground", "currentQualification", "college", "source", "leadSource"].forEach(key => {
    if ((options.overwrite || !existing[key]) && imported[key]) existing[key] = imported[key];
  });
  if (options.overwrite && imported.oldSheetSource && !imported.location) existing.location = "";
  if ((options.overwrite || !existing.assignedTo) && imported.assignedTo) existing.assignedTo = imported.assignedTo;
  if ((options.overwrite || !existing.status) && imported.status) existing.status = imported.status;
  if (imported.customFields && Object.keys(imported.customFields).length) {
    existing.customFields = { ...(existing.customFields || {}), ...imported.customFields };
  }
  if (!existing.followupAt && imported.followupAt) existing.followupAt = imported.followupAt;
}

function legacyRowRemark(row, headers, mapping = {}, customNames = {}) {
  return headers
    .filter(header => header && row[header])
    .map(header => `${header}: ${row[header]}`)
    .join("\n");
}

function appendRemark(existing, remark) {
  return [existing, remark].filter(Boolean).join("\n\n");
}

function formatCustomFields(fields = {}) {
  const entries = Object.entries(fields || {});
  if (!entries.length) return "";
  return entries.map(([key, value]) => `<strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}`).join("<br>");
}

function cssEscape(value) {
  if (window.CSS?.escape) return window.CSS.escape(value);
  return String(value || "").replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function updateFromAdmissionGoogleSheet() {
  alert("Admission sheet import is hidden/disabled in this software.");
  return;
  if (!isSuperAdmin() && !isLeadManager()) {
    alert("Only Super Admin or Lead Manager can update admissions from Google Sheet.");
    return;
  }
  if (!confirm("Load admission sheet tabs CMAFC D6 and Inter D26 for mapping? No CRM data will change until final import.")) return;
  loadAdmissionSheetPayload({ silent: false, afterLoad: () => {
    renderAdmissionSheetMapping();
    document.getElementById("admissionSheetDialog").showModal();
  }});
}

function loadAdmissionSheetPayload({ silent = false, afterLoad = null } = {}) {
  const settings = getSheetSyncSettings();
  const callbackName = `crmAdmissionSheet_${Date.now()}`;
  if (!silent) setSheetStatus("Reading admission Google Sheet...");
  window[callbackName] = payload => {
    try {
      if (!payload?.ok) throw new Error(payload?.error || "Could not read admission Google Sheet.");
      if (!Array.isArray(payload.rows) && payload.data !== undefined) {
        throw new Error("Apps Script is still running the old deployment. Redeploy a new version of google-apps-script.gs, then try again.");
      }
      admissionSheetPayload = { rows: payload.rows || [], headers: payload.headers || [], tabs: payload.tabs || [] };
      if (!admissionSheetPayload.rows.length) {
        setSheetStatus(`Admission sheet loaded but no rows were found. Check tabs: ${admissionSheetPayload.tabs.join(", ") || "CMAFC D6, Inter D26"}.`);
      }
      if (afterLoad) afterLoad();
      if (!silent && admissionSheetPayload.rows.length) setSheetStatus(`Admission sheet loaded: ${admissionSheetPayload.rows.length} rows from ${admissionSheetPayload.tabs.join(", ")}.`);
    } catch (error) {
      setSheetStatus("Admission sheet update failed. Check Apps Script deployment and sheet access.");
      alert(`Admission sheet update failed: ${error.message}`);
    } finally {
      delete window[callbackName];
      document.getElementById(callbackName)?.remove();
    }
  };
  const script = document.createElement("script");
  script.id = callbackName;
  script.src = `${settings.url}${settings.url.includes("?") ? "&" : "?"}mode=admissions&callback=${callbackName}&t=${Date.now()}`;
  script.onerror = () => {
    setSheetStatus("Admission sheet update failed. Check Apps Script access.");
    delete window[callbackName];
    script.remove();
  };
  document.body.appendChild(script);
}

function renderAdmissionSheetMapping() {
  const headers = admissionSheetPayload?.headers || [];
  const rows = admissionSheetPayload?.rows || [];
  const options = admissionMappingOptions();
  if (!headers.length || !rows.length) {
    document.getElementById("admissionMapping").innerHTML = "<p class='warning'>No admission rows were found. Please redeploy the updated Apps Script, and confirm the admission file has tabs named CMAFC D6 and Inter D26 with data rows.</p>";
    document.getElementById("admissionPreview").innerHTML = "";
    return;
  }
  const html = `
    <table class="legacy-map-table">
      <thead><tr><th>Admission Sheet Column</th><th>Use In CRM As</th><th>Custom Field Name</th><th>Sample Value</th></tr></thead>
      <tbody>
        ${headers.map(header => `<tr>
          <td><strong>${escapeHtml(header)}</strong></td>
          <td><select data-admission-map="${escapeAttr(header)}">${options.map(([value, label]) => `<option value="${value}" ${value === guessAdmissionField(header) ? "selected" : ""}>${label}</option>`).join("")}</select></td>
          <td><input data-admission-custom="${escapeAttr(header)}" placeholder="e.g. Admission Roll No." value="${escapeAttr(header)}"></td>
          <td>${escapeHtml(firstNonBlank(rows, header))}</td>
        </tr>`).join("")}
      </tbody>
    </table>`;
  document.getElementById("admissionMapping").innerHTML = html;
  renderAdmissionPreview();
  document.querySelectorAll("[data-admission-map]").forEach(select => {
    select.addEventListener("change", () => {
      updateAdmissionCustomInputs();
      renderAdmissionPreview();
    });
  });
  document.querySelectorAll("[data-admission-custom]").forEach(input => input.addEventListener("input", renderAdmissionPreview));
  updateAdmissionCustomInputs();
}

function renderAdmissionPreview() {
  const rows = (admissionSheetPayload?.rows || []).slice(0, 5);
  const mapping = collectAdmissionMapping();
  const customNames = collectAdmissionCustomNames();
  const preview = rows.map(row => admissionRowToData(row, admissionSheetPayload.headers || [], mapping, customNames));
  table("admissionPreview", preview, ["Preview Name", "Mobile", "Course", "Batch", "Branch", "Admission Date", "Sheet Tab", "Match"], data => [
    data.name,
    data.mobile,
    data.course,
    data.batch,
    data.branch,
    data.admissionDate,
    data.sheetName,
    findAdmissionLeadMatch(data) ? "Existing lead" : "New admitted lead"
  ]);
}

function admissionMappingOptions() {
  return [
    ["", "Ignore"],
    ["studentName", "Student Name"],
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
    ["studentMobile", "Student Mobile"],
    ["parentMobile", "Parent Mobile"],
    ["email", "Email"],
    ["course", "Course"],
    ["batch", "Batch"],
    ["branch", "Branch / Location"],
    ["admissionDate", "Admission Date"],
    ["feesAgreed", "Fees Agreed"],
    ["feesPaid", "Fees Paid"],
    ["paymentMode", "Payment Mode"],
    ["receiptNumber", "Receipt Number"],
    ["counsellor", "Admission Counsellor"],
    ["remarks", "Remarks"],
    ["custom", "Custom Field"]
  ];
}

function guessAdmissionField(header) {
  const label = normalizeHeader(header);
  if (/first.*name/.test(label)) return "firstName";
  if (/last.*name|surname/.test(label)) return "lastName";
  if (/student.*name|full.*name|candidate.*name|^name$/.test(label)) return "studentName";
  if (/mobile|phone|contact|whatsapp/.test(label)) return "studentMobile";
  if (/parent|father|mother|guardian/.test(label)) return "parentMobile";
  if (/mail/.test(label)) return "email";
  if (/course|cma|foundation|inter|final/.test(label)) return "course";
  if (/batch/.test(label)) return "batch";
  if (/branch|location|centre|center|address/.test(label)) return "branch";
  if (/admission.*date|date.*admission|joined.*date|date/.test(label)) return "admissionDate";
  if (/agreed|total.*fees|fees/.test(label)) return "feesAgreed";
  if (/paid|received|amount/.test(label)) return "feesPaid";
  if (/mode|payment/.test(label)) return "paymentMode";
  if (/receipt|invoice|bill/.test(label)) return "receiptNumber";
  if (/counsellor|counselor|admin|admission.*by/.test(label)) return "counsellor";
  if (/remark|note|comment/.test(label)) return "remarks";
  return "";
}

function collectAdmissionMapping() {
  const mapping = {};
  document.querySelectorAll("[data-admission-map]").forEach(select => {
    if (select.value) mapping[select.dataset.admissionMap] = select.value;
  });
  return mapping;
}

function collectAdmissionCustomNames() {
  const customNames = {};
  document.querySelectorAll("[data-admission-custom]").forEach(input => {
    const header = input.dataset.admissionCustom;
    const mappedAs = document.querySelector(`[data-admission-map="${cssEscape(header)}"]`)?.value;
    if (mappedAs === "custom") customNames[header] = input.value.trim() || header;
  });
  return customNames;
}

function updateAdmissionCustomInputs() {
  document.querySelectorAll("[data-admission-custom]").forEach(input => {
    const header = input.dataset.admissionCustom;
    const mappedAs = document.querySelector(`[data-admission-map="${cssEscape(header)}"]`)?.value;
    input.disabled = mappedAs !== "custom";
  });
}

function confirmImportAdmissionSheet() {
  if (!admissionSheetPayload) return;
  const mapping = collectAdmissionMapping();
  if (!Object.values(mapping).includes("studentMobile") && !Object.values(mapping).includes("studentName")) {
    alert("Please tag Student Mobile or Student Name before importing admissions.");
    return;
  }
  const overwrite = Boolean(document.getElementById("admissionOverwrite")?.checked);
  if (!confirm(`Import/update ${admissionSheetPayload.rows.length} admission rows?`)) return;
  const result = importAdmissionSheetRows(admissionSheetPayload.rows, admissionSheetPayload.headers, mapping, {
    overwrite,
    customNames: collectAdmissionCustomNames()
  });
  save();
  render();
  document.getElementById("admissionSheetDialog").close();
  syncAdmissionsAfterLegacy = false;
  setSheetStatus(`Admission sheet updated: ${result.matched} matched, ${result.created} new leads, ${result.admissions} admissions, ${result.skipped} skipped.`);
  alert(`Admissions updated.\nMatched leads: ${result.matched}\nNew admitted leads: ${result.created}\nAdmission records created/updated: ${result.admissions}\nSkipped rows: ${result.skipped}`);
}

function fetchCmafcD26Admissions({ token = null, retried = false } = {}) {
  if (!isSuperAdmin() && !isLeadManager()) {
    alert("Only Super Admin or Lead Manager can fetch admission sheet data.");
    return;
  }
  const callbackName = `crmCmafcD26_${Date.now()}`;
  setSheetStatus("Fetching CMAFC D26 admission data...", "busy");
  window[callbackName] = payload => {
    try {
      delete window[callbackName];
      document.getElementById(callbackName)?.remove();
      if (!payload?.ok) {
        if (!retried && /unauthor/i.test(payload?.error || "")) {
          localStorage.removeItem(`${storeKey}.cmafcAdmissionToken`);
          const nextToken = prompt("Enter CMAFC D26 admission sheet secret token:");
          if (nextToken) {
            localStorage.setItem(`${storeKey}.cmafcAdmissionToken`, nextToken.trim());
            fetchCmafcD26Admissions({ token: nextToken.trim(), retried: true });
            return;
          }
        }
        throw new Error(payload?.error || "Could not fetch CMAFC D26.");
      }
      const result = importCmafcD26AdmissionRows(payload.rows || []);
      save();
      renderAdmissions();
      setSheetStatus(`CMAFC D26 imported: ${result.created} new, ${result.updated} updated, ${result.skipped} skipped.`, "ok");
      alert(`CMAFC D26 admissions fetched.\nNew records: ${result.created}\nUpdated records: ${result.updated}\nSkipped rows: ${result.skipped}`);
    } catch (error) {
      setSheetStatus(`CMAFC D26 fetch failed: ${error.message}`, "error");
      alert(`CMAFC D26 fetch failed: ${error.message}`);
    }
  };
  const script = document.createElement("script");
  script.id = callbackName;
  const params = new URLSearchParams({
    mode: "cmafcD26",
    callback: callbackName,
    t: String(Date.now())
  });
  const savedToken = token ?? (localStorage.getItem(`${storeKey}.cmafcAdmissionToken`) || "");
  if (savedToken) params.set("token", savedToken);
  script.src = `${fixedCmafcAdmissionWebAppUrl}?${params.toString()}`;
  script.onerror = () => {
    delete window[callbackName];
    document.getElementById(callbackName)?.remove();
    setSheetStatus("CMAFC D26 fetch failed. Check Apps Script deployment and /exec access.", "error");
    alert("CMAFC D26 fetch failed. Confirm Apps Script is deployed as Web App: Execute as Me, Who has access Anyone, and URL ends with /exec.");
  };
  document.body.appendChild(script);
}

function importCmafcD26AdmissionRows(rows = []) {
  let created = 0;
  let updated = 0;
  let skipped = 0;
  rows.forEach((row, index) => {
    const data = cmafcD26RowToAdmissionData(row, index + 2);
    if (!data.firstName && !data.studentId) {
      skipped += 1;
      return;
    }
    const lead = upsertCmafcD26Lead(data);
    const admission = upsertCmafcD26Admission(lead, data);
    if (admission.created) created += 1;
    else updated += 1;
  });
  return { created, updated, skipped };
}

function cmafcD26RowToAdmissionData(row = {}, rowNumber = "") {
  const get = (...aliases) => pickSheetValue(row, aliases);
  const fullName = get("student name", "name", "full name", "student", "first name");
  const firstName = titleCase(get("first name", "firstname") || firstNameOf(fullName));
  const lastRaw = get("last name", "lastname", "last", "surname") || String(fullName || "").trim().split(/\s+/).slice(1).join(" ");
  const lastName = lastInitialOnly(lastRaw);
  const branch = get("branch location", "branch", "location", "center", "centre") || detectBranch(Object.values(row).join(" "), Object.values(row).join(" ")) || "Unassigned";
  const admissionDate = parseDateForInput(get("admission date", "date of admission", "joining date", "join date", "adm date", "date")) || "";
  const studentId = get("student id", "studentid", "id", "roll no", "roll number", "registration no", "reg no");
  const rowText = Object.entries(row)
    .filter(([key, value]) => value && !isAdmissionPrivateContactHeader(key))
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  return {
    firstName,
    lastName,
    name: [firstName, lastName].filter(Boolean).join(" "),
    branch,
    admissionDate,
    studentId,
    mobile: "",
    course: "CMA Foundation",
    batch: "CMAFC D26",
    sheetName: "CMAFC D26",
    remarks: `Fetched from CMAFC D26${rowNumber ? ` row ${rowNumber}` : ""}\n${rowText}`
  };
}

function isAdmissionPrivateContactHeader(header = "") {
  return /mobile|phone|contact|whatsapp|email/i.test(String(header || ""));
}

function pickSheetValue(row = {}, aliases = []) {
  const entries = Object.entries(row);
  const normalized = aliases.map(normalizeHeader);
  const exact = entries.find(([key]) => normalized.includes(normalizeHeader(key)));
  if (exact) return String(exact[1] || "").trim();
  const loose = entries.find(([key]) => normalized.some(alias => normalizeHeader(key).includes(alias) || alias.includes(normalizeHeader(key))));
  return String(loose?.[1] || "").trim();
}

function upsertCmafcD26Lead(data) {
  let lead = null;
  if (!lead && data.studentId) lead = state.leads.find(item => item.customFields?.studentId === data.studentId || item.studentId === data.studentId);
  if (!lead && data.firstName) {
    const nameKey = normalizePersonName([data.firstName, data.lastName].filter(Boolean).join(" "));
    lead = state.leads.find(item => normalizePersonName(displayLeadName(item)) === nameKey && normalizeAttendanceChoice(item.batch || "") === normalizeAttendanceChoice(data.batch));
  }
  if (!lead) {
    lead = createLeadFromAdmissionData({
      ...data,
      parentMobile: "",
      email: "",
      receiptNumber: data.studentId,
      counsellor: defaultCounsellorForBranch(data.branch, currentUser?.name || "Admin"),
      customFields: { studentId: data.studentId }
    }, data.remarks);
    state.leads.unshift(lead);
  } else {
    mergeAdmissionDataIntoLead(lead, {
      ...data,
      receiptNumber: data.studentId,
      counsellor: defaultCounsellorForBranch(data.branch, lead.assignedTo),
      customFields: { ...(lead.customFields || {}), studentId: data.studentId }
    }, { overwrite: true });
    lead.remarks = appendRemark(lead.remarks, data.remarks);
  }
  lead.studentId = data.studentId || lead.studentId || "";
  lead.customFields = { ...(lead.customFields || {}), studentId: data.studentId || lead.customFields?.studentId || "" };
  if (data.branch && data.branch !== "Unassigned") addUnique(masters.branches, data.branch);
  addUnique(masters.batches, data.batch);
  addUnique(masters.attendanceBatches, data.batch);
  return lead;
}

function upsertCmafcD26Admission(lead, data) {
  const existing = state.admissions.find(item => item.leadId === lead.id || (data.studentId && item.receiptNumber === data.studentId));
  const payload = {
    leadId: lead.id,
    admissionDate: data.admissionDate || todayDate(),
    course: data.course,
    batch: data.batch,
    feesAgreed: "",
    feesPaid: "",
    paymentMode: "",
    receiptNumber: data.studentId || "",
    counsellor: defaultCounsellorForBranch(data.branch, lead.assignedTo),
    remarks: appendRemark("Fetched from CMAFC D26 admission sheet.", data.remarks)
  };
  if (existing) {
    Object.assign(existing, { ...payload, id: existing.id });
    return { created: false, admission: existing };
  }
  const admission = { id: id(), ...payload };
  state.admissions.unshift(admission);
  return { created: true, admission };
}

function importAdmissionSheetRows(rows, headers, mapping, options = {}) {
  const stamp = new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  let matched = 0;
  let created = 0;
  let admissions = 0;
  let skipped = 0;
  rows.forEach(row => {
    const data = admissionRowToData(row, headers, mapping, options.customNames || {});
    if (!data.mobile && !data.name) {
      skipped += 1;
      return;
    }
    let lead = findAdmissionLeadMatch(data);
    const remark = `[${stamp}] Admission sheet match from ${data.sheetName}, row ${row._rowNumber || ""}\n${admissionRowRemark(row, headers)}`;
    if (lead) {
      matched += 1;
      mergeAdmissionDataIntoLead(lead, data, options);
      lead.remarks = appendRemark(lead.remarks, remark);
    } else {
      lead = createLeadFromAdmissionData(data, remark);
      state.leads.unshift(lead);
      created += 1;
    }
    if (upsertAdmissionFromSheet(lead, data)) admissions += 1;
  });
  return { matched, created, admissions, skipped };
}

function admissionRowToData(row, headers, mapping, customNames = {}) {
  const values = mappedLegacyValues(row, headers, mapping);
  const customFields = mappedLegacyCustomFields(row, headers, mapping, customNames);
  const sheetName = row._sheetName || "";
  const rowText = headers.map(header => row[header]).filter(Boolean).join("\n");
  const name = values.studentName || [values.firstName, values.lastName].filter(Boolean).join(" ") || inferName(rowText);
  const courseText = values.course || sheetName;
  const batch = values.batch || sheetName || "";
  const branch = values.branch || detectBranch(rowText, rowText) || "Unassigned";
  const mobile = onlyPhone(values.studentMobile) || onlyPhone(rowText);
  Object.keys(customFields).forEach(field => addUnique(state.customLeadFields, field));
  return {
    name: titleCase(name || "Unknown Student"),
    firstName: titleCase(values.firstName || firstNameOf(name || "Unknown Student")),
    lastName: titleCase(values.lastName || String(name || "").trim().split(/\s+/).slice(1).join(" ")),
    mobile,
    parentMobile: onlyPhone(values.parentMobile),
    email: values.email || "",
    course: detectCourse(courseText),
    batch,
    branch,
    admissionDate: parseDateForInput(values.admissionDate) || todayDate(),
    feesAgreed: values.feesAgreed || "",
    feesPaid: values.feesPaid || "",
    paymentMode: values.paymentMode || "",
    receiptNumber: values.receiptNumber || "",
    counsellor: matchAdminName(values.counsellor) || currentUser?.name || state.users[0]?.name || "",
    remarks: values.remarks || "",
    customFields,
    sheetName
  };
}

function findAdmissionLeadMatch(data) {
  if (data.mobile) {
    const byMobile = state.leads.find(lead => lead.studentMobile === data.mobile || lead.parentMobile === data.mobile);
    if (byMobile) return byMobile;
  }
  const normalizedName = normalizePersonName(data.name);
  if (!normalizedName) return null;
  return state.leads.find(lead => normalizePersonName(displayLeadName(lead)) === normalizedName) || null;
}

function mergeAdmissionDataIntoLead(lead, data, options = {}) {
  const overwrite = options.overwrite;
  const updates = {
    firstName: data.firstName,
    lastName: data.lastName,
    studentName: data.name,
    studentMobile: data.mobile,
    parentMobile: data.parentMobile,
    email: data.email,
    course: data.course,
    branch: data.branch,
    batch: data.batch
  };
  Object.entries(updates).forEach(([key, value]) => {
    if ((overwrite || !lead[key]) && value) lead[key] = value;
  });
  lead.status = "Converted / Admitted";
  lead.lastTouchedAt = new Date().toISOString();
  lead.lastTouchType = "Admission";
  lead.customFields = { ...(lead.customFields || {}), ...(data.customFields || {}) };
}

function createLeadFromAdmissionData(data, remark) {
  return {
    id: id(),
    firstName: data.firstName,
    lastName: data.lastName,
    studentName: data.name,
    studentMobile: data.mobile,
    parentMobile: data.parentMobile,
    email: data.email,
    location: "",
    branch: data.branch,
    course: data.course,
    attempt: "",
    academicBackground: "",
    currentQualification: "",
    college: "",
    source: "Admission Sheet",
    leadSource: "Admission Sheet",
    assignedTo: data.counsellor,
    status: "Converted / Admitted",
    followupAt: "",
    createdAt: new Date().toISOString(),
    lastTouchedAt: new Date().toISOString(),
    lastTouchType: "Admission",
    batch: data.batch,
    customFields: data.customFields || {},
    remarks: appendRemark(remark, data.remarks)
  };
}

function upsertAdmissionFromSheet(lead, data) {
  const existing = state.admissions.find(admission => admission.leadId === lead.id);
  const payload = {
    leadId: lead.id,
    admissionDate: data.admissionDate || todayDate(),
    course: data.course || lead.course || "",
    batch: data.batch || lead.batch || "Unassigned",
    feesAgreed: data.feesAgreed || "",
    feesPaid: data.feesPaid || "",
    paymentMode: data.paymentMode || "",
    receiptNumber: data.receiptNumber || "",
    counsellor: data.counsellor || lead.assignedTo || "",
    remarks: appendRemark(`Imported from admission sheet: ${data.sheetName}`, data.remarks)
  };
  if (payload.batch && payload.batch !== "Unassigned") {
    addUnique(masters.batches, payload.batch);
    addUnique(masters.attendanceBatches, payload.batch);
  }
  if (data.branch && data.branch !== "Unassigned") addUnique(masters.branches, data.branch);
  if (existing) {
    Object.assign(existing, { ...payload, id: existing.id });
  } else {
    state.admissions.unshift({ id: id(), ...payload });
  }
  lead.status = "Converted / Admitted";
  lead.batch = payload.batch;
  lead.branch = data.branch || lead.branch;
  return true;
}

function admissionRowRemark(row, headers) {
  return headers.filter(header => header && row[header]).map(header => `${header}: ${row[header]}`).join("\n");
}

function normalizePersonName(name) {
  return String(name || "").toLowerCase().replace(/[^a-z]/g, "").trim();
}

function parseDateForInput(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  const parts = String(value).match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
  if (!parts) return "";
  const year = parts[3].length === 2 ? `20${parts[3]}` : parts[3];
  const date = new Date(`${year}-${parts[2].padStart(2, "0")}-${parts[1].padStart(2, "0")}`);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function getThemeSetting() {
  return localStorage.getItem(`${storeKey}.theme`) || "system";
}

function setTheme(theme) {
  localStorage.setItem(`${storeKey}.theme`, theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  const select = document.getElementById("themeSelect");
  if (select) select.value = theme;
  document.body.dataset.theme = theme;
}

function bindSettingsForms() {
  document.querySelectorAll("[data-master-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const key = form.dataset.masterForm;
      const value = new FormData(form).get("value").trim();
      if (!value || masters[key].includes(value)) return;
      masters[key].push(value);
      save();
      render();
    });
  });
  document.querySelectorAll("[data-paper-faculty-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      savePaperFacultyFromForm(form);
    });
  });
  document.getElementById("settingsUserForm")?.addEventListener("submit", saveUser);
  document.getElementById("settingsTemplateForm")?.addEventListener("submit", saveTemplate);
  document.getElementById("attendanceStudentForm")?.addEventListener("submit", saveAttendanceStudent);
  document.getElementById("addAttendanceBulk")?.addEventListener("click", addBulkAttendanceStudents);
  document.getElementById("targetForm")?.addEventListener("submit", saveTarget);
}

function editMasterValue(key, index) {
  const oldValue = masters[key][index];
  const value = prompt(`Edit ${oldValue}`, oldValue);
  if (!value || value === oldValue) return;
  masters[key][index] = value.trim();
  updateExistingRecordsForMaster(key, oldValue, value.trim());
  save();
  render();
}

function deleteMasterValue(key, index) {
  const value = masters[key][index];
  if (!confirm(`Delete "${value}" from master settings? Existing records will keep their current text.`)) return;
  masters[key].splice(index, 1);
  save();
  render();
}

function addPaperFaculty(course, paper, name) {
  if (!course || !paper || !name) return;
  const courseName = canonicalCourseName(course);
  masters.paperFaculty = masters.paperFaculty || {};
  masters.paperFaculty[courseName] = masters.paperFaculty[courseName] || {};
  masters.paperFaculty[courseName][paper] = masters.paperFaculty[courseName][paper] || [];
  addUnique(masters.paperFaculty[courseName][paper], name);
}

function savePaperFacultyFromForm(form) {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit paper-wise professors.");
  if (!form) return;
  const [course, paper] = form.dataset.paperFacultyForm.split("|");
  const input = form.elements.value || form.querySelector("input");
  const value = titleCase(input?.value || "");
  if (!value) {
    input?.focus();
    return;
  }
  addPaperFaculty(course, paper, value);
  save();
  render();
}

function deletePaperFaculty(payload) {
  if (!isSuperAdmin()) return alert("Only Super Admin can edit paper-wise professors.");
  const [course, paper, indexText] = String(payload || "").split("|");
  const courseName = canonicalCourseName(course);
  const index = Number(indexText);
  const list = masters.paperFaculty?.[courseName]?.[paper] || [];
  const name = list[index];
  if (!name) return;
  list.splice(index, 1);
  save();
  render();
}

function updateExistingRecordsForMaster(key, oldValue, newValue) {
  const leadField = { courses: "course", branches: "branch", sources: "source", statuses: "status", roles: "role" }[key];
  if (leadField) state.leads.forEach(lead => { if (lead[leadField] === oldValue) lead[leadField] = newValue; });
  if (key === "branches") state.users.forEach(user => { if (user.branch === oldValue) user.branch = newValue; });
  if (key === "roles") {
    state.users.forEach(user => { if (user.role === oldValue) user.role = newValue; });
    if (state.roleTabAccess?.[oldValue]) {
      state.roleTabAccess[newValue] = state.roleTabAccess[oldValue];
      delete state.roleTabAccess[oldValue];
    }
  }
  if (key === "courses") {
    state.templates.forEach(template => { if (template.course === oldValue) template.course = newValue; });
    state.admissions.forEach(admission => { if (admission.course === oldValue) admission.course = newValue; });
  }
  if (key === "statuses") state.templates.forEach(template => { if (template.stage === oldValue) template.stage = newValue; });
  state.targets.forEach(target => {
    if (key === "courses" && target.course === oldValue) target.course = newValue;
    if (key === "branches" && target.branch === oldValue) target.branch = newValue;
  });
}

function saveTarget(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  state.targets.unshift({ id: id(), ...data, target: Number(data.target), createdAt: todayDate() });
  save();
  e.target.reset();
  render();
}

function renderTargetSettings() {
  table("targetSettingsTable", state.targets, ["Branch", "Course", "Attempt", "Period", "Target", "Actions"], t => [
    t.branch,
    t.course,
    t.attempt,
    t.period,
    t.target,
    `<button data-delete-target="${t.id}" type="button">Delete</button>`
  ]);
}

function renderTargetProgress(containerId) {
  const rows = state.targets.map(target => {
    const actual = admissionsForTarget(target).length;
    const ratio = target.target ? Math.round(actual / Number(target.target) * 100) : 0;
    return { ...target, actual, balance: Math.max(0, Number(target.target) - actual), ratio: `${ratio}%` };
  });
  table(containerId, rows, ["Branch", "Course", "Attempt", "Period", "Target", "Actual", "Balance", "Progress"], r => [
    r.branch, r.course, r.attempt, r.period, r.target, r.actual, r.balance, r.ratio
  ]);
}

function admissionsForTarget(target) {
  const now = new Date();
  return admissionsWithLead().filter(row => {
    const admittedAt = row.admissionDate ? new Date(row.admissionDate) : null;
    return row.branch === target.branch
      && row.course === target.course
      && (row.attempt || "").toLowerCase() === target.attempt.toLowerCase()
      && admittedAt
      && isWithinTargetPeriod(admittedAt, now, target.period);
  });
}

function isWithinTargetPeriod(date, now, period) {
  if (period === "Monthly") return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  start.setHours(0, 0, 0, 0);
  return date >= start && date <= now;
}

function saveTargetPlan(e) {
  e.preventDefault();
  if (!isSuperAdmin()) {
    alert("Only Super Admin can create or edit target plans.");
    return;
  }
  const data = Object.fromEntries(new FormData(e.target).entries());
  const rows = data.branchTargets.split(/\n+/).map(line => {
    const parts = line.split(/,|\t/).map(part => part.trim()).filter(Boolean);
    if (parts.length < 2) return null;
    if (parts.length >= 3) return { branch: parts[0], currentBase: Number(parts[1]) || 0, target: Number(parts[2]) || 0 };
    return { branch: parts[0], currentBase: 0, target: Number(parts[1]) || 0 };
  }).filter(row => row && row.branch && row.target);

  const targetPlan = {
    id: data.id || id(),
    title: data.title,
    course: data.course,
    attempt: data.attempt,
    rows,
    createdAt: data.id ? state.targets.find(plan => plan.id === data.id)?.createdAt || todayDate() : todayDate(),
    updatedAt: new Date().toISOString()
  };
  if (data.id) {
    state.targets = state.targets.map(plan => plan.id === data.id ? targetPlan : plan);
  } else {
    state.targets.unshift(targetPlan);
  }
  save();
  clearTargetForm();
  render();
}

function renderTargetPlans() {
  const container = document.getElementById("targetPlans");
  if (!container) return;
  updateTargetFormAccess();
  if (!state.targets.length) {
    container.innerHTML = "<section class='panel'><p class='muted'>No target plans yet. Create a plan using branch targets.</p></section>";
    return;
  }
  container.innerHTML = state.targets.map(plan => renderTargetPlan(plan)).join("");
}

function renderTargetPlan(plan) {
  const rows = plan.rows.map(row => {
    const crmCurrent = currentAdmissionsFor(row.branch, plan.course, plan.attempt);
    const current = Number(row.currentBase || 0) + crmCurrent;
    const achieved = row.target ? Math.round(current / row.target * 100) : 0;
    const balance = Math.max(0, Number(row.target || 0) - current);
    return { ...row, crmCurrent, current, achieved, balance };
  }).sort((a, b) => b.achieved - a.achieved || b.current - a.current);
  const totals = rows.reduce((acc, row) => {
    acc.current += row.current;
    acc.target += row.target;
    acc.crmCurrent += row.crmCurrent;
    return acc;
  }, { current: 0, target: 0, crmCurrent: 0 });

  return `<section class="panel">
    <div class="target-head">
      <div>
        <h2>${escapeHtml(plan.title)}</h2>
        <p class="muted">${escapeHtml(plan.course)} | ${escapeHtml(plan.attempt)}</p>
      </div>
      <div class="toolbar">
        ${isSuperAdmin() ? `<button data-edit-target="${plan.id}" type="button">Edit Plan</button><button data-delete-target="${plan.id}" class="danger-btn" type="button">Delete Plan</button>` : "<span class='locked-action'>Only Super Admin can edit targets</span>"}
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Branch</th><th>Current</th><th>CRM Adds</th><th>Target</th><th>Balance</th><th>% Achieved</th><th>Progress</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => `<tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(row.branch)}</td>
            <td>${row.current}</td>
            <td>${row.crmCurrent}</td>
            <td>${row.target}</td>
            <td>${row.balance}</td>
            <td>${row.achieved}%</td>
            <td>${targetProgressBar(row.achieved)}</td>
          </tr>`).join("")}
          <tr>
            <th>Total</th><th></th><th>${totals.current}</th><th>${totals.crmCurrent}</th><th>${totals.target}</th><th>${Math.max(0, totals.target - totals.current)}</th><th>${totals.target ? Math.round(totals.current / totals.target * 100) : 0}%</th><th>${targetProgressBar(totals.target ? Math.round(totals.current / totals.target * 100) : 0)}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </section>`;
}

function targetProgressBar(percent) {
  const width = Math.min(100, Math.max(0, percent));
  return `<div class="target-progress"><span style="width:${width}%"></span></div>`;
}

function currentAdmissionsFor(branch, course, attempt) {
  return admissionsWithLead().filter(row =>
    row.branch === branch &&
    normalizeCourseName(row.course || "") === normalizeCourseName(course || "") &&
    (row.attempt || "").toLowerCase() === (attempt || "").toLowerCase()
  ).length;
}

function updateTargetFormAccess() {
  const form = document.getElementById("targetPlanForm");
  const title = document.getElementById("targetPlanTitle");
  if (!form) return;
  form.querySelectorAll("input, select, textarea, button").forEach(input => input.disabled = !isSuperAdmin());
  if (title) title.textContent = isSuperAdmin() ? (form.elements.id.value ? "Edit Target Plan" : "Create Target Plan") : "Target Plans";
}

function editTargetPlan(targetId) {
  if (!isSuperAdmin()) {
    alert("Only Super Admin can edit target plans.");
    return;
  }
  const plan = state.targets.find(target => target.id === targetId);
  const form = document.getElementById("targetPlanForm");
  if (!plan || !form) return;
  form.elements.id.value = plan.id;
  form.elements.title.value = plan.title || "";
  form.elements.course.value = plan.course || "";
  form.elements.attempt.value = plan.attempt || "";
  form.elements.branchTargets.value = targetRowsToText(plan.rows);
  updateTargetFormAccess();
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function clearTargetForm() {
  const form = document.getElementById("targetPlanForm");
  if (!form) return;
  form.reset();
  form.elements.id.value = "";
  updateTargetFormAccess();
}

function targetRowsToText(rows = []) {
  return rows.map(row => `${row.branch}, ${Number(row.currentBase || 0)}, ${Number(row.target || 0)}`).join("\n");
}

function saveCampaign(e) {
  e.preventDefault();
  if (!canManageCampaigns()) {
    alert("Only Lead Manager or Super Admin can create or edit campaigns.");
    return;
  }
  const data = Object.fromEntries(new FormData(e.target).entries());
  const existing = data.id ? state.campaigns.find(c => c.id === data.id) : null;
  data.title = data.title.trim();
  data.createdBy = existing?.createdBy || currentUser?.name || "";
  data.createdAt = existing?.createdAt || new Date().toISOString();
  data.updatedAt = new Date().toISOString();
  ensureCampaignMasters(data);
  if (data.id) {
    state.campaigns = state.campaigns.map(campaign => campaign.id === data.id ? { ...campaign, ...data } : campaign);
  } else {
    delete data.id;
    state.campaigns.unshift({ id: id(), ...data });
  }
  save();
  clearCampaignForm();
  render();
}

function clearCampaignForm() {
  const form = document.getElementById("campaignForm");
  if (!form) return;
  form.reset();
  form.elements.campaignDate.value = todayDate();
  form.elements.followupAt.value = nextDayInputValue();
  if (masters.courses[0]) form.elements.course.value = masters.courses[0];
  if (withUnassigned(masters.branches)[0]) form.elements.branch.value = withUnassigned(masters.branches)[0];
  if (state.users[0]) form.elements.assignedTo.value = state.users[0].name;
}

function editCampaign(campaignId) {
  const campaign = state.campaigns.find(c => c.id === campaignId);
  const form = document.getElementById("campaignForm");
  if (!campaign || !form) return;
  activeTab = "campaigns";
  render();
  Object.entries(campaign).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value || "";
  });
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function handleCampaignAction(campaignId, action) {
  if (!canManageCampaigns()) {
    alert("Only Lead Manager or Super Admin can manage campaigns.");
    return;
  }
  if (action === "edit") editCampaign(campaignId);
  if (action === "responseLeads") createLeadsFromCampaign(campaignId, "responseData");
  if (action === "attendeeLeads") createLeadsFromCampaign(campaignId, "attendedData");
  if (action === "openWa") openCampaignWhatsApp(campaignId);
  if (action === "delete") deleteCampaign(campaignId);
}

function createLeadsFromCampaign(campaignId, dataKey) {
  const campaign = state.campaigns.find(c => c.id === campaignId);
  if (!campaign) return;
  const blocks = splitCampaignLeadBlocks(campaign[dataKey] || "");
  if (!blocks.length) {
    alert("No student/mobile data found in this campaign section.");
    return;
  }
  ensureCampaignMasters(campaign);
  const newLeads = blocks
    .map(block => campaignLeadFromBlock(block, campaign, dataKey))
    .filter(lead => !lead.duplicate);
  const duplicateCount = blocks.length - newLeads.length;
  if (!newLeads.length) {
    alert("All detected campaign leads are already present by mobile number.");
    return;
  }
  state.leads.unshift(...newLeads.map(({ duplicate, rawText, ...lead }) => lead));
  campaign.lastLeadCreatedAt = new Date().toISOString();
  save();
  render();
  alert(`${newLeads.length} campaign lead(s) created.${duplicateCount ? ` ${duplicateCount} duplicate(s) skipped.` : ""}`);
}

function campaignLeadFromBlock(block, campaign, dataKey) {
  const lead = parseLeadBlock(block);
  addUnique(masters.sources, "WhatsApp campaign");
  lead.campaignId = campaign.id;
  lead.campaignTitle = campaign.title;
  lead.leadSource = `Campaign: ${campaign.title}`;
  lead.source = "WhatsApp campaign";
  lead.course = campaign.course || lead.course;
  lead.attempt = campaign.attempt || lead.attempt;
  lead.branch = campaign.branch || lead.branch || "Unassigned";
  lead.assignedTo = campaign.assignedTo || lead.assignedTo;
  lead.followupAt = campaign.followupAt || nextDayInputValue();
  lead.status = dataKey === "attendedData" ? "Demo Attended" : "Interested";
  lead.remarks = [
    `Campaign: ${campaign.title}`,
    dataKey === "attendedData" ? "Marked from webinar/seminar attended data." : "Marked from campaign response data.",
    block
  ].join("\n");
  lead.createdAt = new Date().toISOString();
  lead.lastTouchedAt = "";
  lead.lastTouchType = "";
  lead.duplicate = Boolean(lead.studentMobile && state.leads.some(l => l.studentMobile === lead.studentMobile));
  return lead;
}

function openCampaignWhatsApp(campaignId) {
  const campaign = state.campaigns.find(c => c.id === campaignId);
  if (!campaign) return;
  const numbers = uniquePhones(campaign.sentData || campaign.responseData || campaign.attendedData);
  if (!numbers.length) {
    alert("Add mobile numbers in campaign data first.");
    return;
  }
  window.open(`https://wa.me/91${numbers[0]}?text=${encodeURIComponent(campaign.message || "")}`, "_blank");
}

function deleteCampaign(campaignId) {
  const campaign = state.campaigns.find(c => c.id === campaignId);
  if (!campaign || !confirm(`Delete campaign "${campaign.title}"? Leads already created from it will remain.`)) return;
  state.campaigns = state.campaigns.filter(c => c.id !== campaignId);
  save();
  render();
}

function ensureCampaignMasters(campaign) {
  if (campaign.course) addUnique(masters.courses, campaign.course);
  if (campaign.branch && campaign.branch !== "Unassigned") addUnique(masters.branches, campaign.branch);
  addUnique(masters.sources, "WhatsApp campaign");
}

function canManageCampaigns() {
  return isSuperAdmin() || isLeadManager();
}

function countCampaignPeople(text) {
  const phones = uniquePhones(text);
  if (phones.length) return phones.length;
  return splitCampaignLeadBlocks(text || "").length;
}

function uniquePhones(text) {
  return [...new Set(String(text || "").match(/\b[6-9]\d{9}\b/g) || [])];
}

function splitCampaignLeadBlocks(text) {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized) return [];
  const lines = normalized.split("\n").map(line => line.trim()).filter(Boolean);
  const phoneLines = lines.filter(line => /\b[6-9]\d{9}\b/.test(line));
  if (phoneLines.length > 1) return phoneLines;
  return splitLeadBlocks(normalized);
}

function campaignExportRows() {
  return state.campaigns.map(campaign => {
    const stats = campaignStats(campaign);
    return {
      title: stats.title,
      campaignDate: stats.campaignDate,
      type: stats.type,
      course: stats.course,
      attempt: stats.attempt,
      branch: stats.branch,
      flyer: stats.flyer,
      sentCount: stats.sentCount,
      responseCount: stats.responseCount,
      attendedCount: stats.attendedCount,
      leadCount: stats.leadCount,
      convertedCount: stats.convertedCount,
      assignedTo: stats.assignedTo,
      followupAt: stats.followupAt,
      notes: stats.notes
    };
  });
}

function table(idName, rows, headings, mapRow) {
  const target = document.getElementById(idName);
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = "<p class='muted'>No records found.</p>";
    return;
  }
  const mappedRows = rows.map(row => ({ row, cells: mapRow(row) }));
  const sort = tableSorts[idName];
  if (sort) {
    const factor = sort.direction === "desc" ? -1 : 1;
    mappedRows.sort((a, b) => cellSortText(a.cells[sort.index]).localeCompare(cellSortText(b.cells[sort.index]), undefined, { numeric: true, sensitivity: "base" }) * factor);
  }
  target.innerHTML = `<table><thead><tr>${headings.map((h, index) => `<th><button class="table-sort" type="button" data-table-sort="${idName}:${index}">${h}${sort?.index === index ? ` ${sort.direction === "asc" ? "^" : "v"}` : ""}</button></th>`).join("")}</tr></thead><tbody>${mappedRows.map(r => `<tr>${r.cells.map(v => `<td>${v ?? ""}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function cellSortText(value) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = String(value ?? "");
  const formValue = wrapper.querySelector("select, input, textarea")?.value || "";
  return (formValue || wrapper.textContent || "").trim().toLowerCase();
}

function updateTableSort(payload) {
  const [idName, indexValue] = String(payload || "").split(":");
  const index = Number(indexValue);
  if (!idName || Number.isNaN(index)) return;
  const current = tableSorts[idName];
  tableSorts[idName] = current?.index === index
    ? { index, direction: current.direction === "asc" ? "desc" : "asc" }
    : { index, direction: "asc" };
  render();
}

function openLeadForm(lead) {
  const form = document.getElementById("leadForm");
  form.reset();
  document.getElementById("duplicateWarning").classList.add("hidden");
  document.getElementById("leadFormTitle").textContent = lead?.id ? "Edit Lead" : "Add Lead";
  if (lead?.id) {
    const prepared = prepareLeadForForm(lead);
    Object.entries(prepared).forEach(([k, v]) => form.elements[k] && (form.elements[k].value = v || ""));
  } else {
    form.elements.enquiryDate.value = todayDate();
    form.elements.followupAt.value = nextDayInputValue();
    if (masters.statuses.includes("New Lead")) form.elements.status.value = "New Lead";
  }
  renderLeadCustomFields(lead || {});
  updateEducationFields();
  updateReferenceFields();
  document.getElementById("leadDialog").showModal();
}

function saveLead(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.studentMobile = onlyPhone(data.studentMobile) || data.studentMobile.replace(/\D/g, "");
  data.parentMobile = onlyPhone(data.parentMobile) || data.parentMobile.replace(/\D/g, "");
  data.firstName = titleCase(data.firstName || "");
  data.lastName = titleCase(data.lastName || "");
  data.studentName = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
  data.source = data.newReference?.trim() || data.source || "";
  if (data.newReference && !masters.sources.includes(data.newReference.trim())) {
    masters.sources.push(data.newReference.trim());
  }
  data.createdAt = data.id ? data.createdAt || new Date().toISOString() : new Date().toISOString();
  if (!data.id) data.createdBy = currentUser?.name || "";
  data.lastTouchedAt = data.id ? new Date().toISOString() : "";
  data.lastTouchType = data.id ? "Edited" : "";
  data.customFields = collectLeadCustomFields(e.target);
  data.academicBackground = buildAcademicSummary(data);
  data.currentQualification = data.educationLevel || "";
  data.pastPerformance = [data.tenthPercent && `10th: ${data.tenthPercent}`, data.twelfthPercent && `12th: ${data.twelfthPercent}`, data.graduationPercent && `Graduation: ${data.graduationPercent}`].filter(Boolean).join(", ");
  applyBranchCounsellor(data);
  const duplicate = state.leads.find(l => l.studentMobile === data.studentMobile && l.id !== data.id);
  if (duplicate && !confirm(`Duplicate mobile found for ${displayLeadName(duplicate)}. Save anyway?`)) return;
  if (data.id) state.leads = state.leads.map(l => l.id === data.id ? { ...l, ...data } : l);
  else state.leads.unshift({ ...data, id: id(), createdAt: new Date().toISOString(), lastTouchedAt: "", lastTouchType: "" });
  save();
  document.getElementById("leadDialog").close();
  render();
}

function saveAttendanceBatch(e) {
  e.preventDefault();
  if (!isSuperAdmin()) return alert("Only Super Admin can create attendance batches.");
  const data = Object.fromEntries(new FormData(e.target).entries());
  const batch = [data.level, data.attempt, data.location].map(part => String(part || "").trim().replace(/\s+/g, "")).filter(Boolean).join("_");
  if (!batch) return;
  addUnique(masters.attendanceBatches, batch);
  save();
  e.target.reset();
  render();
}

function saveAttendanceStudent(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.branch = attendanceBatchLocation(data.batch) || attendanceAdminBranch() || "Unassigned";
  if (!canManageAttendanceBranch(data.branch || "Unassigned")) return alert("You can add attendance students only for your branch.");
  const firstName = titleCase(data.firstName || "");
  const lastName = lastInitialOnly(data.lastName || "");
  const lastInitial = String(lastName || "").slice(0, 1).toUpperCase();
  if (!firstName || !lastName) return alert("Enter first name and last name.");
  if (data.batch && data.batch !== "Unassigned") addUnique(masters.attendanceBatches, data.batch);
  if (data.branch && data.branch !== "Unassigned") addUnique(masters.branches, data.branch);
  const exists = state.attendanceStudents.some(student =>
    !student.archivedAt &&
    student.firstName.toLowerCase() === firstName.toLowerCase() &&
    (student.lastName || student.lastInitial || "").toLowerCase() === lastName.toLowerCase() &&
    student.batch === data.batch &&
    student.branch === data.branch
  );
  if (exists && !confirm("This student short name already exists in this batch/branch. Add anyway?")) return;
  state.attendanceStudents.push({
    id: id(),
    firstName,
    lastName,
    lastInitial,
    admissionDate: data.admissionDate || "",
    batchGroup: data.batchGroup || "",
    studentId: data.studentId || "",
    customFields: {},
    batch: data.batch || "Unassigned",
    branch: data.branch || "Unassigned",
    studentType: data.studentType || "Demo",
    createdAt: new Date().toISOString(),
    createdBy: currentUser?.name || ""
  });
  save();
  e.target.reset();
  render();
}

function saveAttendanceSession(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  if (!data.batch || !data.date || !data.subject || !data.prof) return alert("Add batch, date, paper, and professor.");
  const selectedBranch = attendanceBatchLocation(data.batch) || attendanceAdminBranch() || "Unassigned";
  if (!canAccessAttendanceBatch(data.batch, selectedBranch)) return alert("You can add lecture columns only for your batch.");
  state.attendanceSessions.push({
    id: id(),
    batch: data.batch,
    branch: selectedBranch,
    date: data.date,
    subject: titleCase(data.subject || ""),
    prof: titleCase(data.prof || ""),
    createdAt: new Date().toISOString(),
    createdBy: currentUser?.name || ""
  });
  addPaperFaculty(attendanceCourseFromBatch(data.batch), data.subject, titleCase(data.prof || ""));
  save();
  e.target.reset();
  render();
}

function addDaysISO(value, days) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function archiveAttendanceStudent(studentId) {
  const student = state.attendanceStudents.find(item => item.id === studentId);
  if (!student) return;
  if (!canManageAttendanceBranch(student.branch || "Unassigned")) return alert("You can archive attendance students only for your branch.");
  if (!confirm(`Delete/archive ${student.firstName} ${student.lastName || student.lastInitial || ""} from attendance register? It can be restored from Archive.`)) return;
  student.archivedAt = new Date().toISOString();
  student.archivedBy = currentUser?.name || "";
  save();
  render();
}

function restoreAttendanceStudent(studentId) {
  const student = state.attendanceStudents.find(item => item.id === studentId);
  if (!student) return;
  if (!canManageAttendanceBranch(student.branch || "Unassigned")) return alert("You can restore attendance students only for your branch.");
  delete student.archivedAt;
  delete student.archivedBy;
  save();
  render();
}

function permanentlyDeleteAttendanceStudent(studentId) {
  if (!isSuperAdmin()) return alert("Only Super Admin can permanently delete attendance students.");
  const student = state.attendanceStudents.find(item => item.id === studentId);
  if (!student) return;
  if (!confirm(`Permanently delete ${student.firstName} ${student.lastName || student.lastInitial || ""} from attendance? This cannot be undone.`)) return;
  state.attendanceStudents = state.attendanceStudents.filter(item => item.id !== studentId);
  Object.keys(state.attendanceRecords || {}).forEach(key => {
    if (key.endsWith(`:${studentId}`)) delete state.attendanceRecords[key];
  });
  save();
  render();
}

function updateAttendanceStatus(value, status) {
  const payload = parseAttendancePayload(value);
  const { studentId, sessionId } = payload;
  if (!canManageAttendanceCell(studentId, sessionId)) return alert("You can mark attendance only for your branch.");
  const session = ensureAttendanceSession(sessionId, { batch: payload.batch, branch: payload.branch, date: payload.date });
  const realSessionId = session?.id || sessionId;
  const key = attendanceRecordKey(studentId, realSessionId);
  const record = state.attendanceRecords[key] || { present: true, remark: "" };
  record.present = status === "absent" ? false : true;
  if (record.present !== false) record.remark = "";
  state.attendanceRecords[key] = record;
  save();
  renderAttendance();
}

function updateAttendanceRemark(value, remark) {
  const payload = parseAttendancePayload(value);
  const { studentId, sessionId } = payload;
  if (!canManageAttendanceCell(studentId, sessionId)) return alert("You can update attendance remarks only for your branch.");
  const session = ensureAttendanceSession(sessionId, { batch: payload.batch, branch: payload.branch, date: payload.date });
  const realSessionId = session?.id || sessionId;
  const key = attendanceRecordKey(studentId, realSessionId);
  const record = state.attendanceRecords[key] || { present: false, remark: "" };
  record.present = false;
  record.remark = remark;
  state.attendanceRecords[key] = record;
  save();
  renderAttendance();
}

function canManageAttendanceCell(studentId, sessionId) {
  if (canManageAllAttendance()) return true;
  const student = attendanceRoster().find(item => item.id === studentId);
  const session = state.attendanceSessions.find(item => item.id === sessionId);
  const draft = draftSessionFromId(sessionId);
  const branch = student?.branch || session?.branch || draft?.branch || attendanceBatchLocation(draft?.batch) || attendanceAdminBranch();
  const batch = student?.batch || session?.batch || draft?.batch || "";
  return canAccessAttendanceBatch(batch, branch);
}

function renderLeadCustomFields(lead = {}) {
  const fields = customLeadFieldNames();
  const section = document.getElementById("leadCustomFieldsSection");
  const container = document.getElementById("leadCustomFields");
  if (!section || !container) return;
  section.classList.toggle("hidden", !fields.length);
  container.innerHTML = fields.map(field => `<label>${escapeHtml(field)}<input name="custom_${escapeAttr(field)}" data-custom-lead-field="${escapeAttr(field)}" value="${escapeAttr(lead.customFields?.[field] || "")}"></label>`).join("");
}

function collectLeadCustomFields(form) {
  const fields = {};
  form.querySelectorAll("[data-custom-lead-field]").forEach(input => {
    if (input.value.trim()) fields[input.dataset.customLeadField] = input.value.trim();
  });
  return fields;
}

function prepareLeadForForm(lead) {
  const parts = displayLeadName(lead).split(" ");
  return {
    ...lead,
    firstName: lead.firstName || parts.shift() || "",
    lastName: lead.lastName || parts.join(" "),
    enquiryDate: lead.enquiryDate || lead.createdAt || todayDate(),
    followupAt: lead.followupAt || nextDayInputValue()
  };
}

function updateEducationFields() {
  const level = document.getElementById("educationLevel")?.value || "";
  document.querySelectorAll(".edu-field").forEach(field => {
    const allowed = field.dataset.edu.split(" ");
    field.classList.toggle("hidden", !level || !allowed.includes(level));
  });
}

function updateReferenceFields() {
  const reference = document.getElementById("referenceType")?.value || "";
  document.querySelectorAll(".reference-extra").forEach(field => {
    const allowed = field.dataset.reference.split("|");
    field.classList.toggle("hidden", !reference || !allowed.includes(reference));
  });
}

function nextDayInputValue() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(11, 0, 0, 0);
  return localInputValue(d);
}

function buildAcademicSummary(data) {
  if (data.educationLevel === "10th") return `10th: ${data.tenthPercent || ""}${data.schoolName ? `, School: ${data.schoolName}` : ""}`.trim();
  if (data.educationLevel === "12th") return `10th: ${data.tenthPercent || ""}, 12th: ${data.twelfthPercent || ""}${data.college ? `, College: ${data.college}` : ""}`.trim();
  if (data.educationLevel === "Graduate") return `Graduate${data.graduationIn ? ` in ${data.graduationIn}` : ""}: ${data.graduationPercent || ""}${data.college ? `, College: ${data.college}` : ""}`.trim();
  return "";
}

function openFollowup(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  const form = document.getElementById("followupForm");
  form.reset();
  form.elements.leadId.value = leadId;
  form.elements.status.value = lead.status;
  form.elements.nextFollowup.value = lead.followupAt || "";
  document.getElementById("followupDialog").showModal();
}
function saveFollowup(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const lead = state.leads.find(l => l.id === data.leadId);
  lead.status = data.status;
  lead.followupAt = data.nextFollowup;
  lead.remarks = data.remarks;
  markLeadTouched(lead, "Follow-up");
  state.followups.unshift({ id: id(), leadId: lead.id, at: data.nextFollowup, status: data.status, remarks: data.remarks, createdBy: lead.assignedTo, createdAt: new Date().toISOString() });
  save();
  document.getElementById("followupDialog").close();
  render();
}

function openAdmission(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  const form = document.getElementById("admissionForm");
  form.reset();
  form.elements.leadId.value = leadId;
  form.elements.admissionDate.value = todayDate();
  form.elements.course.value = lead.course;
  form.elements.counsellor.value = defaultCounsellorForBranch(lead.branch || "", lead.assignedTo);
  document.getElementById("admissionDialog").showModal();
}
function saveAdmission(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const lead = state.leads.find(l => l.id === data.leadId);
  lead.status = "Converted / Admitted";
  lead.batch = data.batch || lead.batch || "Unassigned";
  lead.branch = lead.branch || "Unassigned";
  data.counsellor = defaultCounsellorForBranch(lead.branch || data.branch || "", data.counsellor || lead.assignedTo);
  lead.assignedTo = data.counsellor || lead.assignedTo;
  markLeadTouched(lead, "Admission");
  if (data.batch && data.batch !== "Unassigned") addUnique(masters.attendanceBatches, data.batch);
  state.admissions.unshift({ ...data, id: id() });
  save();
  document.getElementById("admissionDialog").close();
  render();
}

function saveTemplate(e) {
  e.preventDefault();
  state.templates.unshift({ id: id(), ...Object.fromEntries(new FormData(e.target).entries()) });
  save();
  e.target.reset();
  render();
}
async function saveUser(e) {
  e.preventDefault();
  if (state.users.length && !isSuperAdmin()) {
    alert("Only Super Admin can add or edit users and tab access.");
    return;
  }
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const editingId = e.target.dataset.editingUser || "";
  if (data.id && data.id !== editingId) data.id = "";
  const existingUser = data.id && editingId ? state.users.find(user => user.id === data.id) : null;
  data.branchAccess = formData.getAll("branchAccess").filter(Boolean);
  if (data.branch && data.branch !== "Unassigned" && !data.branchAccess.includes(data.branch)) {
    data.branchAccess.unshift(data.branch);
  }
  const newPassword = String(data.password || "");
  data.id = data.id || "";
  delete data.password;
  if (newPassword) {
    if (newPassword.length < 4) return alert("Password must be at least 4 characters.");
    data.passwordHash = await hashPassword(newPassword);
  } else if (existingUser?.passwordHash) {
    data.passwordHash = existingUser.passwordHash;
  } else if (!data.id) {
    const defaultPassword = firstNameOf(data.name || "").trim() || data.name || "1234";
    data.passwordHash = await hashPassword(defaultPassword);
  }
  if (!state.users.length && !data.id) data.role = "Super Admin";
  const roleChanged = Boolean(existingUser && existingUser.role !== data.role) || e.target.dataset.roleChanged === "1";
  data.tabAccess = isSuperAdmin() ? collectTabAccess(e.target) : existingUser?.tabAccess || roleTabDefaults(data.role);
  data.tabAccessMode = roleChanged || sameTabAccess(data.tabAccess, roleTabDefaults(data.role)) ? "role" : existingUser?.tabAccessMode || "custom";
  data.updatedAt = new Date().toISOString();
  data.updatedBy = currentUser?.name || "System";
  if (data.id) {
    state.users = state.users.map(user => user.id === data.id ? { ...user, ...data, createdAt: user.createdAt || data.createdAt || data.updatedAt } : user);
  } else {
    delete data.id;
    state.users.push({ id: id(), createdAt: data.updatedAt, ...data });
  }
  save();
  setSheetStatus("User saved. Syncing to cloud for other PC/mobile login...", "busy");
  showCloudReminderPopup("User saved. Cloud sync is running.");
  clearUserForm(e.target.id);
  const title = document.getElementById("userFormTitle");
  if (title) title.textContent = "Add User";
  delete e.target.dataset.roleChanged;
  render();
}

function editUser(userId) {
  const user = state.users.find(u => u.id === userId);
  const form = document.getElementById("userForm");
  if (!user || !form) return;
  activeTab = "users";
  render();
  form.dataset.editingUser = user.id;
  document.getElementById("userFormTitle").textContent = "Edit User";
  Object.entries(user).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value || "";
  });
  setMultiSelectValues(form.elements.branchAccess, userBranchList(user));
  renderUserTabAccess("userTabAccess", user);
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function editSettingsUser(userId) {
  const user = state.users.find(u => u.id === userId);
  const form = document.getElementById("settingsUserForm");
  if (!user || !form) return;
  form.dataset.editingUser = user.id;
  Object.entries(user).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value || "";
  });
  setMultiSelectValues(form.elements.branchAccess, userBranchList(user));
  renderUserTabAccess("settingsUserTabAccess", user);
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function deleteUser(userId) {
  if (!isSuperAdmin()) return alert("Only Super Admin can delete users.");
  const user = state.users.find(u => u.id === userId);
  if (!user) return;
  if (currentUser?.id === userId) return alert("You cannot delete the user you are currently logged in as.");
  const superAdmins = state.users.filter(item => isSuperAdminUser(item));
  if (isSuperAdminUser(user) && superAdmins.length <= 1) return alert("At least one Super Admin must remain.");
  if (!confirm(`Delete user "${user.name}"? Existing leads and admission records will keep their history.`)) return;
  state.users = state.users.filter(item => item.id !== userId);
  save();
  clearUserForm("userForm");
  clearUserForm("settingsUserForm");
  render();
}

function clearUserForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.reset();
  delete form.dataset.editingUser;
  if (form.elements.id) form.elements.id.value = "";
  setMultiSelectValues(form.elements.branchAccess, []);
  if (formId === "userForm") {
    const title = document.getElementById("userFormTitle");
    if (title) title.textContent = "Add User";
    renderUserTabAccess("userTabAccess");
  }
  if (formId === "settingsUserForm") {
    renderUserTabAccess("settingsUserTabAccess");
  }
}

function setMultiSelectValues(select, values = []) {
  if (!select) return;
  [...select.options].forEach(option => {
    option.selected = values.includes(option.value);
  });
}

function parseBulk() {
  const text = document.getElementById("bulkText").value;
  parsedBulk = splitLeadBlocks(text).map(parseLeadBlock);
  renderBulkPreview();
}
function saveBulk() {
  collectBulkPreviewEdits();
  state.leads.unshift(...parsedBulk.filter(r => !r.skip).map(({ duplicate, skip, rawText, ...lead }) => {
    if (lead.branch && lead.branch !== "Unassigned") addUnique(masters.branches, lead.branch);
    if (lead.course) addUnique(masters.courses, lead.course);
    if (lead.source) addUnique(masters.sources, lead.source);
    const nameParts = String(lead.studentName || "").trim().split(/\s+/);
    applyBranchCounsellor(lead);
    return {
      ...lead,
      firstName: lead.firstName || titleCase(nameParts.shift() || ""),
      lastName: lead.lastName || titleCase(nameParts.join(" ")),
      studentName: titleCase(lead.studentName || ""),
      createdBy: lead.createdBy || currentUser?.name || "",
      lastTouchedAt: "",
      lastTouchType: ""
    };
  }));
  save();
  document.getElementById("bulkDialog").close();
  document.getElementById("bulkText").value = "";
  document.getElementById("bulkPreview").innerHTML = "";
  parsedBulk = [];
  render();
}

function splitLeadBlocks(text) {
  const normalized = text.replace(/\r/g, "").trim();
  if (!normalized) return [];
  const paragraphBlocks = normalized.split(/\n\s*\n+/).map(b => b.trim()).filter(Boolean);
  if (paragraphBlocks.length > 1) return paragraphBlocks;

  const lines = normalized.split("\n").map(l => l.trim()).filter(Boolean);
  const blocks = [];
  let current = [];
  lines.forEach(line => {
    if (current.length && containsPhone(current.join(" ")) && looksLikeName(line)) {
      blocks.push(current.join("\n"));
      current = [line];
    } else {
      current.push(line);
    }
  });
  if (current.length) blocks.push(current.join("\n"));
  return blocks.filter(block => containsPhone(block) || looksLikeName(block));
}

function parseLeadBlock(block) {
  const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
  const joined = lines.join(" ");
  const email = (joined.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [""])[0];
  const phones = extractPhoneNumbers(joined);
  const studentMobile = phones[0] || "";
  const nameLine = lines.find(line => looksLikeName(line)) || "";
  const studentName = titleCase(nameLine || inferName(joined));
  const nameParts = studentName.split(/\s+/);
  const locationLine = lines.find(line => /(?:stay|stays|staying|live|lives|location|area|from|resident|resides)\s+(?:in|at)?/i.test(line)) || "";
  const educationLine = lines.find(line => /(?:graduated|graduate|studying|class|qualification|baf|bcom|b\.com|hsc|ssc|commerce|college|school|ty|fy|sy)/i.test(line)) || "";
  const course = detectCourse(joined);
  const source = detectSource(joined);
  const branch = detectBranch(joined, locationLine);
  const attemptMatch = joined.match(/\b(June|December|Jun|Dec|J|D)\s*'?(\d{2}|20\d{2})\b/i);
  const attempt = attemptMatch ? normalizeAttempt(attemptMatch[1], attemptMatch[2]) : "";
  const location = cleanTaggedLine(locationLine, ["stay in", "stays in", "staying in", "live in", "lives in", "location", "area", "from", "resident of", "resides in"]);
  const academicBackground = cleanTaggedLine(educationLine, ["graduated in", "graduate in", "studying", "qualification", "current education"]);

  return {
    id: id(),
    studentName,
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" "),
    studentMobile,
    parentMobile: phones[1] || "",
    email,
    location: titleCase(location),
    branch,
    course,
    attempt,
    academicBackground: academicBackground || "",
    pastPerformance: "",
    currentQualification: academicBackground || "",
    college: "",
    source,
    assignedTo: defaultCounsellorForBranch(branch),
    status: "New Lead",
    followupAt: "",
    createdAt: new Date().toISOString(),
    lastTouchedAt: "",
    lastTouchType: "",
    remarks: block,
    createdAt: todayDate(),
    createdBy: currentUser?.name || "",
    rawText: block,
    duplicate: Boolean(studentMobile && state.leads.some(l => l.studentMobile === studentMobile))
  };
}

function renderBulkPreview() {
  const target = document.getElementById("bulkPreview");
  if (!parsedBulk.length) {
    target.innerHTML = "<p class='muted'>No student records detected. Keep each student in a separate paragraph or include one mobile number per student.</p>";
    return;
  }
  target.innerHTML = `
    <p class="bulk-help">Review and tag the detected information before saving. You can edit any field here.</p>
    <table class="bulk-preview">
      <thead>
        <tr>
          <th>Save</th><th>Name</th><th>Mobile</th><th>Location</th><th>Education</th><th>Course</th><th>Attempt</th><th>Branch</th><th>Source</th><th>Admin</th><th>Status</th><th>Tag message lines</th>
        </tr>
      </thead>
      <tbody>
        ${parsedBulk.map((lead, index) => `
          <tr data-bulk-row="${index}">
            <td>
              <input data-field="skip" type="checkbox" ${lead.duplicate ? "" : "checked"}>
              <div>${lead.duplicate ? "<span class='danger'>Duplicate</span>" : "<span class='ok'>New</span>"}</div>
            </td>
            <td><input data-field="studentName" value="${escapeAttr(lead.studentName)}"></td>
            <td><input data-field="studentMobile" value="${escapeAttr(lead.studentMobile)}"></td>
            <td><input data-field="location" value="${escapeAttr(lead.location)}"></td>
            <td><input data-field="academicBackground" value="${escapeAttr(lead.academicBackground)}"></td>
            <td>${bulkSelect("course", masters.courses, lead.course)}</td>
            <td><input data-field="attempt" value="${escapeAttr(lead.attempt)}" placeholder="June 2027"></td>
            <td>${bulkSelect("branch", masters.branches, lead.branch)}</td>
            <td>${bulkSelect("source", masters.sources, lead.source)}</td>
            <td>${bulkSelect("assignedTo", state.users.map(u => u.name), lead.assignedTo)}</td>
            <td>${bulkSelect("status", masters.statuses, lead.status)}</td>
            <td class="raw-cell">
              ${renderLineTagger(lead, index)}
              <button data-apply-tags="${index}" type="button">Apply Tags</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>`;
}

function collectBulkPreviewEdits() {
  document.querySelectorAll("[data-bulk-row]").forEach(row => {
    const lead = parsedBulk[Number(row.dataset.bulkRow)];
    row.querySelectorAll("[data-field]").forEach(input => {
      if (input.dataset.field === "skip") {
        lead.skip = !input.checked;
      } else {
        lead[input.dataset.field] = input.value.trim();
      }
    });
    lead.studentMobile = onlyPhone(lead.studentMobile) || lead.studentMobile.replace(/\D/g, "");
    lead.parentMobile = onlyPhone(lead.parentMobile) || lead.parentMobile.replace(/\D/g, "");
    lead.currentQualification = lead.academicBackground;
    lead.remarks = lead.rawText;
    lead.duplicate = Boolean(lead.studentMobile && state.leads.some(l => l.studentMobile === lead.studentMobile));
    applyBranchCounsellor(lead);
  });
}

function renderLineTagger(lead, index) {
  const options = [
    ["", "Ignore"],
    ["studentName", "Student name"],
    ["studentMobile", "Student mobile"],
    ["parentMobile", "Parent mobile"],
    ["email", "Email"],
    ["location", "Location / area"],
    ["academicBackground", "Education"],
    ["currentQualification", "Qualification"],
    ["college", "College / school"],
    ["course", "Course"],
    ["attempt", "Attempt"],
    ["branch", "Branch"],
    ["source", "Lead source"],
    ["remarks", "Remarks"]
  ];
  return `<div class="line-tagger">
    ${lead.rawText.split("\n").map((line, lineIndex) => {
      const guessed = guessFieldForLine(line, lead);
      return `<label class="tag-line">
        <span>${escapeHtml(line)}</span>
        <select data-line-tag="${index}-${lineIndex}">
          ${options.map(([value, label]) => `<option value="${value}" ${value === guessed ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </label>`;
    }).join("")}
  </div>`;
}

function guessFieldForLine(line, lead) {
  const clean = line.trim();
  if (!clean) return "";
  if (clean === lead.studentName) return "studentName";
  if (extractPhoneNumbers(clean).includes(lead.studentMobile)) return "studentMobile";
  if (lead.parentMobile && extractPhoneNumbers(clean).includes(lead.parentMobile)) return "parentMobile";
  if (lead.email && clean.includes(lead.email)) return "email";
  if (/stay|stays|staying|live|lives|location|area|from|resident|resides/i.test(clean)) return "location";
  if (/graduated|graduate|studying|class|qualification|baf|bcom|b\.com|hsc|ssc|commerce|college|school|ty|fy|sy/i.test(clean)) return "academicBackground";
  if (/\b(cmai|cmaf|cma\s*i|cma\s*f|foundation|inter|intermediate|final)\b/i.test(clean)) return "course";
  if (/\b(June|December|Jun|Dec|J|D)\s*'?(\d{2}|20\d{2})\b/i.test(clean)) return "attempt";
  if (masters.sources.some(s => clean.toLowerCase().includes(s.split(" ")[0].toLowerCase()))) return "source";
  if (masters.branches.some(b => clean.toLowerCase().includes(b.toLowerCase()))) return "branch";
  if (looksLikeName(clean)) return "studentName";
  return "remarks";
}

function applyLineTags(index) {
  const lead = parsedBulk[index];
  if (!lead) return;
  const fieldsFromTags = {};
  const remarks = [];
  lead.rawText.split("\n").forEach((line, lineIndex) => {
    const field = document.querySelector(`[data-line-tag="${index}-${lineIndex}"]`)?.value;
    if (!field) return;
    const value = normalizeTaggedValue(field, line);
    if (field === "remarks") {
      remarks.push(line.trim());
    } else if (fieldsFromTags[field]) {
      fieldsFromTags[field] = `${fieldsFromTags[field]} ${value}`.trim();
    } else {
      fieldsFromTags[field] = value;
    }
  });

  Object.entries(fieldsFromTags).forEach(([field, value]) => {
    const input = document.querySelector(`[data-bulk-row="${index}"] [data-field="${field}"]`);
    if (input) input.value = value;
    lead[field] = value;
  });
  if (remarks.length) lead.remarks = remarks.join("\n");
}

function normalizeTaggedValue(field, line) {
  const clean = line.trim();
  if (field === "studentMobile" || field === "parentMobile") return onlyPhone(clean) || clean.replace(/\D/g, "");
  if (field === "email") return (clean.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [clean])[0];
  if (field === "location") return cleanTaggedLine(clean, ["stay in", "stays in", "staying in", "live in", "lives in", "location", "area", "from", "resident of", "resides in"]);
  if (field === "academicBackground" || field === "currentQualification") return cleanTaggedLine(clean, ["graduated in", "graduate in", "studying", "qualification", "current education"]);
  if (field === "course") return detectCourse(clean);
  if (field === "branch") return detectBranch(clean, clean);
  if (field === "source") return detectSource(clean);
  const attemptMatch = clean.match(/\b(June|December|Jun|Dec|J|D)\s*'?(\d{2}|20\d{2})\b/i);
  if (field === "attempt" && attemptMatch) return normalizeAttempt(attemptMatch[1], attemptMatch[2]);
  return field === "studentName" ? titleCase(clean) : clean;
}

function bulkSelect(field, options, selected) {
  const values = selected && !options.includes(selected) ? [selected, ...options] : options;
  return `<select data-field="${field}">${values.map(v => `<option ${v === selected ? "selected" : ""}>${escapeHtml(v)}</option>`).join("")}</select>`;
}

function looksLikeName(line) {
  const clean = line.replace(/(?:\+?91[\s.-]*)?[6-9](?:[\s.-]*\d){9}\b/g, "").trim();
  if (!clean || clean.length > 45) return false;
  if (/@|enquiry|details|explained|desk|\bcma\b|cmai|cmaf|course|fees|prospectus/i.test(clean)) return false;
  if (/stay|graduated|studying|class|location|area|mobile|phone|number|branch|needed/i.test(clean)) return false;
  return /^[a-z .'-]{3,}$/i.test(clean) && clean.split(/\s+/).length <= 4;
}

function inferName(text) {
  return text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig, "")
    .replace(/(?:\+?91[\s.-]*)?[6-9](?:[\s.-]*\d){9}\b/g, "")
    .split(/\n|,|\|/)
    .map(l => l.trim())
    .find(looksLikeName) || "Unknown Student";
}

function cleanTaggedLine(line, prefixes) {
  if (!line) return "";
  let value = line;
  prefixes.forEach(prefix => {
    value = value.replace(new RegExp(`^${prefix}\\s*`, "i"), "");
  });
  return smartTitleCase(value.replace(/^in\s+/i, "").trim());
}

function detectCourse(text) {
  const lower = text.toLowerCase();
  const compact = lower.replace(/[^a-z0-9]/g, "");
  if (/\bcmafc\b/.test(lower) || compact.includes("cmafc")) return preferredCourseName("CMA Foundation");
  if (/\bcmai\b|\bcma\s*i\b|\bcmai\s*(g[12]|bg)\b|\binter\b|\bintermediate\b/.test(lower) || compact.startsWith("cmai")) return preferredCourseName("CMA Intermediate");
  if (/\bcma\s*final\b|\bcmafinal\b|\bfinal\s*(g[1-4]|bg)?\b|\bfinal\b/.test(lower) || compact.includes("cmafinal")) return preferredCourseName("CMA Final");
  if (/\bcmaf\b|\bcma\s*f\b|\bfoundation\b|\bfoun\b/.test(lower) || compact.includes("cmaf")) return preferredCourseName("CMA Foundation");
  return masters.courses[0] || "";
}

function preferredCourseName(defaultName) {
  const normalizedDefault = normalizeCourseName(defaultName);
  return masters.courses.find(course => normalizeCourseName(course) === normalizedDefault) || defaultName;
}

function normalizeCourseName(name) {
  const lower = name.toLowerCase();
  if (lower.includes("inter")) return "cma intermediate";
  if (lower.includes("foundation")) return "cma foundation";
  if (lower.includes("final")) return "cma final";
  return lower.trim();
}

function detectSource(text) {
  const lower = text.toLowerCase();
  if (/desk/.test(lower)) return "Walk-in";
  return masters.sources.find(s => lower.includes(s.split(" ")[0].toLowerCase())) || "Raw data calling";
}

function detectBranch(text, locationLine) {
  const combined = `${locationLine} ${text}`.toLowerCase();
  const compact = combined.replace(/[^a-z0-9]/g, "");
  const exact = masters.branches.find(b => compact.includes(branchKey(b)));
  if (exact) return exact;
  const aliases = [
    ["dombivli", ["dombivli", "dombivali", "dombivali"]],
    ["borivali", ["borivali", "borivli"]],
    ["ghatkopar", ["ghatkopar", "ghatkoper"]],
    ["mulund", ["mulund"]],
    ["andheri", ["andheri"]],
    ["dadar", ["dadar"]],
    ["vashi", ["vashi"]],
    ["online", ["online"]]
  ];
  const alias = aliases.find(([, words]) => words.some(word => compact.includes(word)));
  if (alias) {
    const [canonical] = alias;
    return masters.branches.find(branch => {
      const key = branchKey(branch);
      return key.includes(canonical) || canonical.includes(key) || looseBranchKey(key).includes(looseBranchKey(canonical));
    }) || smartTitleCase(canonical);
  }
  return /branch|centre|center/i.test(combined) ? "Unassigned" : "Online";
}

function branchKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function looseBranchKey(value) {
  return branchKey(value).replace(/[aeiou]/g, "");
}

function normalizeAttempt(month, year) {
  const fullMonth = /^d/i.test(month) ? "December" : "June";
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullMonth} ${fullYear}`;
}

function routeActions(e) {
  const button = e.target.closest("button");
  if (!button) return;
  if (button.dataset.edit) openLeadForm(state.leads.find(l => l.id === button.dataset.edit));
  if (button.dataset.dashboardMetric) openDashboardMetric(button.dataset.dashboardMetric);
  if (button.dataset.attendanceWeek) shiftAttendanceWeek(button.dataset.attendanceWeek);
  if (button.dataset.followup) openFollowup(button.dataset.followup);
  if (button.dataset.admit) openAdmission(button.dataset.admit);
  if (button.dataset.wa) sendWhatsApp(button.dataset.wa);
  if (button.dataset.archiveLead) archiveLead(button.dataset.archiveLead);
  if (button.dataset.archiveAttendanceStudent) archiveAttendanceStudent(button.dataset.archiveAttendanceStudent);
  if (button.dataset.admissionDelete) archiveAdmissionRow(button.dataset.admissionDelete);
  if (button.dataset.restoreAttendanceStudent) restoreAttendanceStudent(button.dataset.restoreAttendanceStudent);
  if (button.dataset.permanentDeleteAttendanceStudent) permanentlyDeleteAttendanceStudent(button.dataset.permanentDeleteAttendanceStudent);
  if (button.dataset.attendanceMark) updateAttendanceStatus(button.dataset.attendanceMark, button.dataset.mark);
  if (button.dataset.restoreLead) restoreLead(button.dataset.restoreLead);
  if (button.dataset.permanentDelete) permanentlyDeleteLead(button.dataset.permanentDelete);
  if (button.dataset.clearUserForm) clearUserForm(button.dataset.clearUserForm);
  if (button.dataset.editUser) editUser(button.dataset.editUser);
  if (button.dataset.editSettingsUser) editSettingsUser(button.dataset.editSettingsUser);
  if (button.dataset.deleteUser) deleteUser(button.dataset.deleteUser);
  if (button.dataset.applyTags) applyLineTags(Number(button.dataset.applyTags));
  if (button.dataset.applyAttendanceFilters !== undefined) renderAttendance();
  if (button.dataset.editMaster) {
    const [key, index] = button.dataset.editMaster.split(":");
    editMasterValue(key, Number(index));
  }
  if (button.dataset.deleteMaster) {
    const [key, index] = button.dataset.deleteMaster.split(":");
    deleteMasterValue(key, Number(index));
  }
  if (button.dataset.deletePaperFaculty) deletePaperFaculty(button.dataset.deletePaperFaculty);
  if (button.dataset.addPaperFaculty) savePaperFacultyFromForm(button.closest("[data-paper-faculty-form]"));
  if (button.dataset.addSuggestion) {
    const separator = button.dataset.addSuggestion.indexOf(":");
    const key = button.dataset.addSuggestion.slice(0, separator);
    const value = button.dataset.addSuggestion.slice(separator + 1);
    if (value && !masters[key].includes(value)) {
      masters[key].push(value);
      save();
      render();
    }
  }
  if (button.dataset.saveRoleAccess !== undefined) saveRoleTabAccess();
  if (button.dataset.backupData !== undefined) downloadDataBackup();
  if (button.dataset.restoreData !== undefined) document.getElementById("restoreDataFile")?.click();
  if (button.dataset.addLeadColumn !== undefined) addLeadColumn();
  if (button.dataset.addCustomLeadField !== undefined) addCustomLeadField();
  if (button.dataset.saveLeadColumns !== undefined) saveLeadColumnsFromDesigner();
  if (button.dataset.resetLeadColumns !== undefined) resetLeadColumns();
  if (button.dataset.removeLeadColumn !== undefined) removeLeadColumn(Number(button.dataset.removeLeadColumn));
  if (button.dataset.addAttendanceColumn !== undefined) addAttendanceColumn();
  if (button.dataset.addCustomAttendanceField !== undefined) addCustomAttendanceField();
  if (button.dataset.saveAttendanceColumns !== undefined) saveAttendanceColumnsFromDesigner();
  if (button.dataset.resetAttendanceColumns !== undefined) resetAttendanceColumns();
  if (button.dataset.removeAttendanceColumn !== undefined) removeAttendanceColumn(Number(button.dataset.removeAttendanceColumn));
  if (button.dataset.saveSheetSettings !== undefined) saveSheetSyncSettings();
  if (button.dataset.loadFromSheet !== undefined) loadFromSheet();
  if (button.dataset.saveToSheet !== undefined) syncCloudNow();
  if (button.dataset.restoreLocalBackup !== undefined) restoreLocalSafetyBackup();
  if (button.dataset.updateOldSheet !== undefined) updateFromOldGoogleSheet();
  if (button.dataset.updateAdmissionSheet !== undefined) updateFromAdmissionGoogleSheet();
  if (button.dataset.fetchCmafcAdmissions !== undefined) fetchCmafcD26Admissions();
  if (button.dataset.syncLeadsAdmissions !== undefined) syncLeadsAndAdmissions();
  if (button.dataset.importLegacySheet !== undefined) confirmImportLegacySheet();
  if (button.dataset.importAdmissionSheet !== undefined) confirmImportAdmissionSheet();
  if (button.dataset.clearTargetForm !== undefined) {
    if (!confirm("Clear the target plan form? Unsaved entries in this form will be removed.")) return;
    clearTargetForm();
  }
  if (button.dataset.clearCampaignForm !== undefined) {
    if (!confirm("Clear the campaign form? Unsaved campaign details in this form will be removed.")) return;
    clearCampaignForm();
  }
  if (button.dataset.editTarget) editTargetPlan(button.dataset.editTarget);
  if (button.dataset.deleteTarget) {
    if (!isSuperAdmin()) {
      alert("Only Super Admin can delete target plans.");
      return;
    }
    const target = state.targets.find(t => t.id === button.dataset.deleteTarget);
    if (!target || !confirm(`Delete target plan "${target.title}"? This cannot be undone.`)) return;
    state.targets = state.targets.filter(t => t.id !== button.dataset.deleteTarget);
    save();
    render();
  }
  if (button.dataset.clearFilters) {
    if (!confirm("Clear all selected filters?")) return;
    document.querySelectorAll(`[id^="${button.dataset.clearFilters}-"]`).forEach(el => el.value = "");
    render();
  }
  if (button.dataset.clearAttendanceFilters !== undefined) {
    document.querySelectorAll("#attendanceFilters select").forEach(el => { el.value = ""; });
    document.querySelectorAll("#attendanceFilters input").forEach(el => { el.value = ""; });
    renderAttendance();
  }
  if (button.dataset.admissionSort) {
    updateAdmissionSort(button.dataset.admissionSort);
  }
  if (button.dataset.tableSort) {
    updateTableSort(button.dataset.tableSort);
  }
}

function routeSelectActions(e) {
  if (["attendance-batch", "attendance-branch", "attendance-from-date", "attendance-to-date"].includes(e.target.id)) {
    renderAttendance();
    return;
  }
  const userRoleSelect = e.target.closest("#userForm [name='role'], #settingsUserForm [name='role']");
  if (userRoleSelect) {
    applyRoleDefaultsToUserForm(userRoleSelect.form);
    return;
  }
  const headerField = e.target.closest("[data-attendance-session-field]");
  if (headerField) {
    updateAttendanceSessionField(headerField.dataset.attendanceSessionField, headerField.value);
    return;
  }
  if (e.target.closest('#attendanceSessionForm [name="batch"], #attendanceSessionForm [name="subject"]')) {
    prepareAttendanceForms();
    return;
  }
  const attendanceStatus = e.target.closest("[data-attendance-status]");
  if (attendanceStatus) {
    updateAttendanceStatus(attendanceStatus.dataset.attendanceStatus, attendanceStatus.value);
    return;
  }
  const attendanceRemark = e.target.closest("[data-attendance-remark]");
  if (attendanceRemark) {
    updateAttendanceRemark(attendanceRemark.dataset.attendanceRemark, attendanceRemark.value);
    return;
  }
  const admissionDate = e.target.closest("[data-admission-date]");
  if (admissionDate) {
    updateAdmissionDate(admissionDate.dataset.admissionDate, admissionDate.value);
    return;
  }
  const admissionLeadStatus = e.target.closest("[data-admission-lead-status]");
  if (admissionLeadStatus) {
    updateAdmissionLeadStatus(admissionLeadStatus.dataset.admissionLeadStatus, admissionLeadStatus.value);
    return;
  }
  const admissionCounsellor = e.target.closest("[data-admission-counsellor]");
  if (admissionCounsellor) {
    updateAdmissionCounsellor(admissionCounsellor.dataset.admissionCounsellor, admissionCounsellor.value);
    return;
  }
  if (e.target.id === "restoreDataFile") {
    restoreDataBackup(e.target.files?.[0]);
    e.target.value = "";
    return;
  }
  const select = e.target.closest("[data-row-action]");
  const campaignSelect = e.target.closest("[data-campaign-action]");
  if (campaignSelect && campaignSelect.value) {
    const campaignId = campaignSelect.dataset.campaignAction;
    const action = campaignSelect.value;
    campaignSelect.value = "";
    handleCampaignAction(campaignId, action);
    return;
  }
  if (!select || !select.value) return;
  const leadId = select.dataset.rowAction;
  const action = select.value;
  const lead = state.leads.find(l => l.id === leadId);
  select.value = "";
  if (!lead) return;
  if (action === "assignBranch" && !canAssignLead()) {
    alert("Only Lead Manager or Super Admin can assign leads.");
    return;
  }
  if (action !== "assignBranch" && !canActOnLead(lead)) {
    alert("You can view this lead, but you can act only after Lead Manager assigns it to you.");
    return;
  }
  if (action === "edit") openLeadForm(lead);
  if (action === "followup") openFollowup(leadId);
  if (action === "wa") sendWhatsApp(leadId);
  if (action === "admit") openAdmission(leadId);
  if (action === "assignBranch") assignLeadBranch(leadId);
  if (action === "assignAdmin") assignLeadAdmin(leadId);
  if (action === "archive") archiveLead(leadId);
}

function updateAdmissionSort(key) {
  if (admissionSort.key === key) {
    admissionSort.direction = admissionSort.direction === "asc" ? "desc" : "asc";
  } else {
    admissionSort = { key, direction: "asc" };
  }
  renderAdmissions();
}

function updateAdmissionDate(recordKey, value) {
  const [type, recordId] = String(recordKey || "").split(":");
  const normalizedDate = normalizeDateInput(value) || value || "";
  if (type === "attendance") {
    const student = state.attendanceStudents.find(item => item.id === recordId);
    if (!student) return;
    student.admissionDate = normalizedDate;
    save();
    renderAdmissions();
  }
}

function updateAdmissionLeadStatus(recordKey, value) {
  const [type, recordId] = String(recordKey || "").split(":");
  if (type === "lead") {
    const lead = state.leads.find(item => item.id === recordId);
    if (!lead) return;
    lead.status = value;
    markLeadTouched(lead, "Admission Status");
    save();
    renderAdmissions();
    return;
  }
  if (type === "attendance") {
    const student = state.attendanceStudents.find(item => item.id === recordId);
    if (!student) return;
    const linkedLead = leadForAttendanceStudent(student);
    if (linkedLead) {
      linkedLead.status = value;
      markLeadTouched(linkedLead, "Admission Status");
    } else {
      student.leadStatus = value;
    }
    save();
    renderAdmissions();
  }
}

function updateAdmissionCounsellor(recordKey, value) {
  const [type, recordId] = String(recordKey || "").split(":");
  if (!value) return;
  if (type === "lead") {
    const lead = state.leads.find(item => item.id === recordId);
    if (!lead) return;
    lead.assignedTo = value;
    markLeadTouched(lead, "Counsellor Changed");
    save();
    renderAdmissions();
    return;
  }
  if (type === "attendance") {
    const student = state.attendanceStudents.find(item => item.id === recordId);
    if (!student) return;
    student.counsellor = value;
    const linkedLead = leadForAttendanceStudent(student);
    if (linkedLead) {
      linkedLead.assignedTo = value;
      markLeadTouched(linkedLead, "Counsellor Changed");
    }
    save();
    renderAdmissions();
    return;
  }
  if (type === "admission") {
    const admission = state.admissions.find(item => item.id === recordId);
    if (!admission) return;
    admission.counsellor = value;
    const lead = state.leads.find(item => item.id === admission.leadId);
    if (lead) {
      lead.assignedTo = value;
      markLeadTouched(lead, "Counsellor Changed");
    }
    save();
    renderAdmissions();
  }
}

function archiveAdmissionRow(recordKey) {
  const [type, recordId] = String(recordKey || "").split(":");
  if (type === "attendance") {
    archiveAttendanceStudent(recordId);
    return;
  }
  if (type === "lead") {
    archiveLead(recordId);
    return;
  }
  if (type !== "admission") return;
  const admission = state.admissions.find(item => item.id === recordId);
  const row = admissionsWithLead().find(item => item.id === recordId || item.admissionId === recordId);
  if (!admission || !row) return;
  if (!canViewAdmissionRow(row)) return alert("You can archive only admission records available to your login.");
  const name = displayLeadName(row) || "this admission record";
  if (!confirm(`Move ${name} from Admissions to archive? It will not be permanently deleted.`)) return;
  admission.archivedAt = new Date().toISOString();
  admission.archivedBy = currentUser?.name || "";
  save();
  render();
}

function routeAttendanceFilterInputs(e) {
  if (["attendance-from-date", "attendance-to-date"].includes(e.target.id)) {
    renderAttendance();
  }
}

function startAttendanceColumnResize(e) {
  const handle = e.target.closest("[data-attendance-resize]");
  if (!handle || !canResizeAttendanceColumns()) return;
  e.preventDefault();
  const type = handle.dataset.attendanceResize;
  const key = handle.dataset.attendanceResizeKey;
  const startX = e.clientX;
  const startWidth = type === "lecture"
    ? attendanceLectureColumnWidth()
    : attendanceColumnWidth(activeAttendanceStudentColumns().find(column => column.key === key) || { key });
  let pendingWidth = startWidth;
  document.body.classList.add("attendance-resizing");
  const onMove = event => {
    const delta = event.clientX - startX;
    pendingWidth = clampAttendanceColumnWidth(type, key, startWidth + delta);
    applyAttendanceColumnWidth(type, key, pendingWidth, { saveNow: false });
    renderAttendance();
  };
  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.body.classList.remove("attendance-resizing");
    applyAttendanceColumnWidth(type, key, pendingWidth, { saveNow: true });
    renderAttendance();
  };
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
}

function clampAttendanceColumnWidth(type, key, width) {
  const value = Math.round(Number(width) || 0);
  if (type === "lecture") return Math.max(52, Math.min(180, value));
  if (key === "lastName") return Math.max(24, Math.min(60, value));
  if (key === "batchGroup") return Math.max(34, Math.min(90, value));
  if (key === "studentId") return Math.max(44, Math.min(140, value));
  if (key === "firstName") return Math.max(60, Math.min(180, value));
  if (key === "admissionDate") return Math.max(68, Math.min(140, value));
  return Math.max(34, Math.min(180, value));
}

function applyAttendanceColumnWidth(type, key, width, { saveNow = false } = {}) {
  const nextWidth = clampAttendanceColumnWidth(type, key, width);
  if (type === "lecture") {
    state.attendanceLectureColumnWidth = nextWidth;
  } else {
    const columns = activeAttendanceStudentColumns();
    state.attendanceStudentColumns = columns.map(column => column.key === key ? { ...column, width: nextWidth } : column);
  }
  if (saveNow) save();
}

function routeAttendanceTextEdits(e) {
  const newStudentInput = e.target.closest("[data-attendance-new-student]");
  if (newStudentInput) {
    createAttendanceStudentFromGrid(newStudentInput.dataset.attendanceNewStudent);
    return;
  }
  const input = e.target.closest("[data-attendance-student-name]");
  if (!input) return;
  const [studentId, field] = input.dataset.attendanceStudentName.split(":");
  const student = state.attendanceStudents.find(item => item.id === studentId);
  if (!student) return;
  if (!canManageAttendanceBranch(student.branch || "Unassigned")) return alert("You can edit attendance students only for your branch.");
  if (field === "firstName") student.firstName = titleCase(input.value || "");
  if (field === "lastName") {
    student.lastName = lastInitialOnly(input.value || "");
    student.lastInitial = student.lastName.slice(0, 1).toUpperCase();
  }
  if (field === "admissionDate") student.admissionDate = normalizeDateInput(input.value) || input.value || "";
  if (field === "batchGroup") student.batchGroup = input.value || "";
  if (field === "studentId") student.studentId = input.value || "";
  if (field === "studentType") student.studentType = input.value || "Demo";
  if (field.startsWith("custom:")) {
    student.customFields = student.customFields || {};
    student.customFields[field.slice(7)] = input.value || "";
  }
  save();
  renderAttendance();
}

function updateAttendanceSessionField(encoded, value) {
  const payload = parseAttendancePayload(encoded);
  const { sessionId, field, date } = payload;
  const batch = payload.batch || selectedAttendanceBatch();
  const branch = payload.branch || attendanceBatchLocation(batch) || document.getElementById("attendance-branch")?.value || attendanceAdminBranch() || "Unassigned";
  if (!canAccessAttendanceBatch(batch, branch)) return alert("You can edit lecture details only for your batch.");
  const existing = state.attendanceSessions.find(item => item.id === sessionId);
  const current = existing || draftSessionFromId(sessionId) || {};
  const updates = {
    batch,
    branch,
    date: date || current.date,
    subject: current.subject || "",
    prof: current.prof || ""
  };
  updates[field] = field === "prof" ? titleCase(value || "") : value;
  if (field === "subject" && updates.prof && !attendanceFacultyOptions(batch, updates.subject).includes(updates.prof)) updates.prof = "";
  if (field === "prof" && updates[field]) addPaperFaculty(attendanceCourseFromBatch(batch), updates.subject, updates[field]);
  ensureAttendanceSession(sessionId, updates);
  save();
  renderAttendance();
}

function createAttendanceStudentFromGrid(encoded) {
  const payload = parseAttendancePayload(encoded);
  const rowInputs = [...document.querySelectorAll("[data-attendance-new-student]")].filter(input => {
    const candidate = parseAttendancePayload(input.dataset.attendanceNewStudent);
    return candidate.rowIndex === payload.rowIndex && candidate.batch === payload.batch && candidate.branch === payload.branch;
  });
  const first = rowInputs.find(input => parseAttendancePayload(input.dataset.attendanceNewStudent).field === "firstName")?.value.trim();
  const last = rowInputs.find(input => parseAttendancePayload(input.dataset.attendanceNewStudent).field === "lastName")?.value.trim();
  const admissionDate = rowInputs.find(input => parseAttendancePayload(input.dataset.attendanceNewStudent).field === "admissionDate")?.value || "";
  const batchGroup = rowInputs.find(input => parseAttendancePayload(input.dataset.attendanceNewStudent).field === "batchGroup")?.value || "";
  const studentId = rowInputs.find(input => parseAttendancePayload(input.dataset.attendanceNewStudent).field === "studentId")?.value.trim() || "";
  const studentType = rowInputs.find(input => parseAttendancePayload(input.dataset.attendanceNewStudent).field === "studentType")?.value || "Demo";
  const customFields = {};
  rowInputs.forEach(input => {
    const field = parseAttendancePayload(input.dataset.attendanceNewStudent).field || "";
    if (field.startsWith("custom:") && input.value.trim()) customFields[field.slice(7)] = input.value.trim();
  });
  if (!first || !last) return;
  const batch = payload.batch || selectedAttendanceBatch();
  if (!batch) return alert("Select attendance batch first.");
  const branch = payload.branch || attendanceBatchLocation(batch) || attendanceAdminBranch() || "Unassigned";
  if (!canManageAttendanceBranch(branch)) return alert("You can add attendance students only for your branch.");
  const exists = state.attendanceStudents.some(student =>
    !student.archivedAt &&
    student.batch === batch &&
    student.branch === branch &&
    student.firstName.toLowerCase() === first.toLowerCase() &&
    (student.lastName || student.lastInitial || "").toLowerCase() === last.toLowerCase()
  );
  if (exists) return;
  state.attendanceStudents.push({
    id: id(),
    firstName: titleCase(first),
    lastName: lastInitialOnly(last),
    lastInitial: lastInitialOnly(last),
    admissionDate,
    batchGroup,
    studentId,
    customFields,
    batch,
    branch,
    studentType,
    createdAt: new Date().toISOString(),
    createdBy: currentUser?.name || ""
  });
  save();
  renderAttendance();
}

function addBulkAttendanceStudents() {
  const textarea = document.getElementById("attendanceBulkNames");
  const text = textarea?.value || "";
  const batch = document.getElementById("attendanceBulkBatch")?.value || selectedAttendanceBatch();
  if (!batch) return alert("Select one attendance batch first, then paste student names.");
  const branch = attendanceBatchLocation(batch) || document.getElementById("attendance-branch")?.value || attendanceAdminBranch() || "Unassigned";
  if (!canManageAttendanceBranch(branch)) return alert("You can add attendance students only for your branch.");
  const students = parseAttendanceNames(text);
  if (!students.length) return alert("Paste at least one student name.");
  let added = 0;
  let skipped = 0;
  students.forEach(student => {
    const exists = state.attendanceStudents.some(item =>
      !item.archivedAt &&
      item.batch === batch &&
      item.branch === branch &&
      item.firstName.toLowerCase() === student.firstName.toLowerCase() &&
      (item.lastName || item.lastInitial || "").toLowerCase() === student.lastName.toLowerCase()
    );
    if (exists) {
      skipped++;
      return;
    }
    state.attendanceStudents.push({
      id: id(),
      firstName: student.firstName,
      lastName: student.lastName,
      lastInitial: student.lastName.slice(0, 1).toUpperCase(),
      admissionDate: student.admissionDate || "",
      batchGroup: student.batchGroup || "",
      studentId: student.studentId || "",
      customFields: student.customFields || {},
      batch,
      branch,
      studentType: student.studentType || "Demo",
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.name || ""
    });
    added++;
  });
  save();
  if (textarea) textarea.value = "";
  renderAttendance();
  alert(`Added ${added} student${added === 1 ? "" : "s"}.${skipped ? ` Skipped ${skipped} duplicate${skipped === 1 ? "" : "s"}.` : ""}`);
}

function parseAttendanceNames(text) {
  const lines = String(text || "").split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (!lines.length) return [];
  const firstCells = splitAttendanceCells(lines[0]);
  const headerMap = buildAttendanceHeaderMap(firstCells);
  if (headerMap.some(Boolean) && lines.length > 1) {
    return lines.slice(1).map(line => parseAttendanceHeaderRow(splitAttendanceCells(line), headerMap)).filter(Boolean);
  }
  return lines.map(parseAttendanceFreeTextLine).filter(Boolean);
}

function splitAttendanceCells(line) {
  const value = String(line || "").trim();
  if (value.includes("\t")) return value.split("\t").map(cell => cell.trim());
  if (value.includes("|")) return value.split("|").map(cell => cell.trim()).filter(Boolean);
  if (value.includes(",")) return value.split(",").map(cell => cell.trim());
  return [value];
}

function buildAttendanceHeaderMap(cells) {
  return cells.map(cell => attendanceHeaderField(cell));
}

function attendanceHeaderField(label) {
  const clean = normalizeHeader(label);
  const aliases = {
    firstName: ["firstname", "first", "givenname"],
    lastName: ["lastname", "last", "surname", "initial", "lastinitial", "lastnamefirstletter"],
    admissionDate: ["admissiondate", "dateofadmission", "admdate", "doa", "joiningdate", "joindate"],
    batchGroup: ["batch", "batchab", "group", "division", "batchgroup"],
    studentId: ["studentid", "studentcode", "rollno", "rollnumber", "id", "sid", "enrollmentno", "registrationno"],
    fullName: ["fullname", "studentfullname", "studentname", "student", "name"],
    studentType: ["type", "studenttype", "status"]
  };
  const standard = Object.entries(aliases).find(([, names]) => names.includes(clean));
  if (standard) return standard[0];
  const custom = activeAttendanceStudentColumns().find(column => normalizeHeader(column.label) === clean || normalizeHeader(column.key.replace(/^custom:/, "")) === clean);
  if (custom) return custom.key;
  return "";
}

function normalizeHeader(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseAttendanceHeaderRow(cells, headerMap) {
  const student = { customFields: {} };
  headerMap.forEach((field, index) => {
    if (!field) return;
    const value = String(cells[index] || "").trim();
    if (!value) return;
    if (field === "firstName") student.firstName = titleCase(value.split(/\s+/)[0] || value);
    if (field === "fullName") {
      const parsedName = parseAttendanceNameOnly(value);
      student.firstName = parsedName.firstName || student.firstName;
      student.lastName = student.lastName || parsedName.lastName;
    }
    if (field === "lastName") student.lastName = lastInitialOnly(value);
    if (field === "admissionDate") student.admissionDate = normalizeDateInput(value);
    if (field === "batchGroup") student.batchGroup = /^[AB]$/i.test(value) ? value.toUpperCase() : value;
    if (field === "studentId") student.studentId = value.replace(/^(?:id|sid|studentid)[:#-]?/i, "");
    if (field === "studentType") student.studentType = titleCase(value);
    if (field.startsWith("custom:")) student.customFields[field.slice(7)] = value;
  });
  if (!student.firstName && cells.length) {
    const parsedName = parseAttendanceFreeTextLine(cells[0]);
    if (parsedName) {
      student.firstName = parsedName.firstName;
      student.lastName = student.lastName || parsedName.lastName;
    }
  }
  student.lastName = lastInitialOnly(student.lastName);
  return student.firstName ? student : null;
}

function parseAttendanceNameOnly(value) {
  const clean = String(value || "").replace(/^\d+[\). -]*/, "").replace(/[|,;]+/g, " ").replace(/\s+/g, " ").trim();
  const parts = clean.split(" ").filter(Boolean);
  return {
    firstName: titleCase(parts[0] || ""),
    lastName: lastInitialOnly(parts.slice(1).find(part => /^[A-Za-z]/.test(part)) || "")
  };
}

function parseAttendanceFreeTextLine(line) {
  const clean = String(line || "").replace(/^\d+[\). -]*/, "").replace(/[|,;]+/g, " ").replace(/\s+/g, " ").trim();
  const parts = clean.split(" ").filter(Boolean);
  if (!parts.length || /^first\s*name|^last\s*name/i.test(clean)) return null;
  const batchGroupIndex = parts.findIndex(part => /^[AB]$/i.test(part));
  const batchGroup = batchGroupIndex >= 0 ? parts.splice(batchGroupIndex, 1)[0].toUpperCase() : "";
  const dateIndex = parts.findIndex(part => /^\d{4}-\d{2}-\d{2}$/.test(part) || /^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}$/.test(part) || /^\d{1,2}-[A-Za-z]{3}-\d{2,4}$/.test(part));
  const admissionDate = dateIndex >= 0 ? normalizeDateInput(parts.splice(dateIndex, 1)[0]) : "";
  const studentIdIndex = parts.findIndex(part => /^(?:id|sid|studentid)[:#-]?[a-z0-9-]+$/i.test(part) || /^[a-z]{1,6}\d{2,}[a-z0-9-]*$/i.test(part) || /^\d{3,}$/.test(part));
  const studentId = studentIdIndex >= 0 ? parts.splice(studentIdIndex, 1)[0].replace(/^(?:id|sid|studentid)[:#-]?/i, "") : "";
  const firstName = titleCase(parts[0]);
  const lastToken = parts.slice(1).find(part => /^[A-Za-z]/.test(part)) || "";
  const lastName = lastInitialOnly(lastToken);
  return firstName ? { firstName, lastName, admissionDate, batchGroup, studentId, customFields: {} } : null;
}

function normalizeDateInput(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const monthNames = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
  const monthText = String(value || "").match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$/);
  if (monthText) {
    const year = monthText[3].length === 2 ? `20${monthText[3]}` : monthText[3];
    const month = monthNames[monthText[2].toLowerCase()];
    return month ? `${year}-${month}-${monthText[1].padStart(2, "0")}` : "";
  }
  const match = String(value || "").match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})$/);
  if (!match) return "";
  const [, day, month, year] = match;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function assignLeadBranch(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  if (!lead) return;
  const choices = withUnassigned(masters.branches);
  const branch = prompt(`Assign branch for ${displayLeadName(lead)}:\n${choices.join(", ")}`, lead.branch || "Unassigned");
  if (!branch) return;
  const cleanBranch = branch.trim();
  if (!masters.branches.includes(cleanBranch) && cleanBranch !== "Unassigned") {
    masters.branches.push(cleanBranch);
  }
  lead.branch = cleanBranch;
  markLeadTouched(lead, "Branch Assigned");
  save();
  render();
}

function assignLeadAdmin(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  if (!lead) return;
  if (!state.users.length) {
    alert("Please add admins/counsellors in Users / Admins first.");
    return;
  }
  const form = document.getElementById("assignAdminForm");
  form.reset();
  fillSelects("assignedTo", state.users.map(user => user.name));
  form.elements.leadId.value = leadId;
  form.elements.assignedTo.value = lead.assignedTo || state.users[0]?.name || "";
  document.getElementById("assignAdminDialog").showModal();
}

function saveAdminAssignment(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const lead = state.leads.find(l => l.id === data.leadId);
  if (!lead) return;
  lead.assignedTo = data.assignedTo;
  if (data.assignmentComment) {
    const stamp = new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
    lead.remarks = [lead.remarks, `[${stamp}] Assigned to ${data.assignedTo}: ${data.assignmentComment}`].filter(Boolean).join("\n");
  }
  markLeadTouched(lead, "Admin Assigned");
  save();
  document.getElementById("assignAdminDialog").close();
  render();
}

function downloadDataBackup() {
  alert("Export is disabled.");
  return;
  const backup = {
    exportedAt: new Date().toISOString(),
    app: "CMA Admission CRM",
    version: 1,
    data: state
  };
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
  a.download = `cma-crm-backup-${stamp}.json`;
  a.click();
}

function restoreDataBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const data = parsed.data || parsed;
      if (!data || !Array.isArray(data.leads) || !data.masters) throw new Error("Invalid backup file");
      if (!confirm("Restore this backup? Current browser CRM data will be replaced.")) return;
      state = data;
      normalizeStateDefaults(state);
      masters = state.masters;
      save();
      currentUser = null;
      localStorage.removeItem(`${storeKey}.currentUserId`);
      loadCurrentUser();
      render();
      alert("Backup restored successfully.");
    } catch (error) {
      alert("Could not restore backup. Please choose a valid CMA CRM backup file.");
    }
  };
  reader.readAsText(file);
}

function whatsappPhone(value) {
  let digits = onlyPhone(value);
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits.length >= 10 ? digits : "";
}

function bestWhatsAppTemplate(lead) {
  return state.templates.find(t => t.course === lead.course && t.stage === lead.status)
    || state.templates.find(t => t.course === lead.course)
    || state.templates[0];
}

function buildWhatsAppMessage(lead) {
  const template = bestWhatsAppTemplate(lead);
  const user = state.users.find(u => u.name === lead.assignedTo);
  const message = template?.message || [
    "Hello {{student_name}},",
    "",
    "Thank you for your interest in {{course_name}} {{attempt}} at {{branch_name}}.",
    "Our counsellor {{counsellor_name}} will guide you with course details and admission next steps."
  ].join("\n");
  return message
    .replaceAll("{{student_name}}", displayLeadName(lead))
    .replaceAll("{{course_name}}", lead.course || "CMA")
    .replaceAll("{{attempt}}", lead.attempt || "")
    .replaceAll("{{branch_name}}", lead.branch || "")
    .replaceAll("{{lead_status}}", lead.status || "")
    .replaceAll("{{counsellor_name}}", user?.name || lead.assignedTo || "");
}

function sendWhatsApp(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  if (!lead) return;
  const phone = whatsappPhone(lead.studentMobile);
  if (!phone) {
    alert("Please add a valid student mobile number before opening WhatsApp.");
    return;
  }
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildWhatsAppMessage(lead))}`;
  const popup = window.open("about:blank", "_blank");
  markLeadTouched(lead, "WhatsApp");
  save();
  render();
  if (popup) {
    popup.location.href = url;
  } else {
    window.location.href = url;
  }
}

function actionButtons(l) {
  const allowed = canActOnLead(l);
  const assignAllowed = canAssignLead();
  if (!allowed && !assignAllowed) return "<span class='locked-action'>View only</span>";
  return `<select data-row-action="${l.id}">
    <option value="">Action</option>
    ${allowed ? `<option value="edit">Edit</option>
    <option value="followup">Follow-up</option>
    <option value="wa">WhatsApp</option>
    <option value="admit">Admit</option>
    <option value="archive">Delete</option>` : ""}
    ${assignAllowed ? `<option value="assignAdmin">Assign Admin</option><option value="assignBranch">Assign Branch</option>` : ""}
  </select>`;
}

function archiveLead(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  if (!canActOnLead(lead)) {
    alert("You can delete/archive only assigned leads.");
    return;
  }
  if (!lead || !confirm(`Move ${displayLeadName(lead)} to archive?`)) return;
  lead.archivedAt = new Date().toISOString();
  lead.archivedBy = "Admin";
  save();
  render();
}

function restoreLead(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  if (!canPermanentlyDelete()) {
    alert("Only Lead Manager or Super Admin can restore archived leads.");
    return;
  }
  if (!lead) return;
  delete lead.archivedAt;
  delete lead.archivedBy;
  save();
  render();
}

function permanentlyDeleteLead(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  if (!canPermanentlyDelete()) {
    alert("Only Lead Manager or Super Admin can permanently delete leads.");
    return;
  }
  if (!lead || !confirm(`Permanently delete ${displayLeadName(lead)}? This cannot be undone.`)) return;
  state.leads = state.leads.filter(l => l.id !== leadId);
  state.followups = state.followups.filter(f => f.leadId !== leadId);
  state.admissions = state.admissions.filter(a => a.leadId !== leadId);
  save();
  render();
}
function statusText(status) {
  const cls = status === "Converted / Admitted" ? "ok" : status.includes("Lost") || status.includes("Not") ? "danger" : status.includes("Pending") || status.includes("Required") ? "warn" : "";
  return `<span class="${cls}">${status}</span>`;
}
function isOverdue(l) { return l.followupAt && new Date(l.followupAt) < new Date() && l.status !== "Converted / Admitted"; }
function dueToday(l) { return l.followupAt && l.followupAt.slice(0, 10) === todayDate(); }
function dueLabel(l) {
  if (!l.followupAt) return "";
  const cls = isOverdue(l) ? "danger" : dueToday(l) ? "warn" : "";
  return `<span class="${cls}">${formatDate(l.followupAt)}</span>`;
}
function formatDate(v) { return v ? new Date(v).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : ""; }
function money(v) { return v ? Number(v).toLocaleString("en-IN") : "0"; }
function leadCreatedStamp(lead) {
  return formatDate(lead.createdAt || lead.enquiryDate);
}
function referenceDetails(lead) {
  if (lead.source === "Past Students" || lead.source === "Existing students") {
    return [lead.referenceStudentName, lead.referenceStudentId && `ID: ${lead.referenceStudentId}`].filter(Boolean).join("<br>");
  }
  if (lead.source === "Classes Owner") {
    return [lead.referenceClassName, lead.referenceClassLocation].filter(Boolean).join("<br>");
  }
  return "";
}
function markLeadTouched(lead, type) {
  lead.lastTouchedAt = new Date().toISOString();
  lead.lastTouchType = type;
}

function untouchedLeads(leads = activeLeads()) {
  return leads
    .filter(lead => lead.status !== "Converted / Admitted")
    .filter(lead => !lead.lastTouchedAt || daysSince(lead.lastTouchedAt) >= 1)
    .sort((a, b) => lastTouchTime(a) - lastTouchTime(b));
}

function untouchedLabel(lead) {
  if (lead.status === "Converted / Admitted") return "<span class='ok'>Admitted</span>";
  if (!lead.lastTouchedAt) return `<span class="danger">Never touched</span>`;
  const days = daysSince(lead.lastTouchedAt);
  const text = days === 0 ? "Today" : days === 1 ? "1 day ago" : `${days} days ago`;
  const cls = days >= 3 ? "danger" : days >= 1 ? "warn" : "ok";
  return `<span class="${cls}">${lead.lastTouchType || "Touched"}: ${text}</span>`;
}

function daysSince(value) {
  const start = new Date(value);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((now - start) / 86400000));
}

function lastTouchTime(lead) {
  return new Date(lead.lastTouchedAt || lead.enquiryDate || lead.createdAt || 0).getTime();
}

function leadAge(lead) {
  const dateValue = lead.enquiryDate || lead.createdAt;
  if (!dateValue) return "";
  const start = new Date(dateValue);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const days = Math.max(0, Math.floor((now - start) / 86400000));
  if (days === 0) return "<span class='pill'>Today</span>";
  if (days === 1) return "<span class='pill'>1 day</span>";
  return `<span class='pill'>${days} days</span>`;
}
function displayLeadName(lead) {
  return [lead?.firstName, lead?.lastName].filter(Boolean).join(" ").trim() || lead?.studentName || "";
}
function firstNameOf(name) {
  return String(name || "").trim().split(/\s+/)[0] || "";
}
function loginMatchesUser(loginId, user) {
  const candidates = [
    user.name,
    firstNameOf(user.name),
    user.mobile,
    user.email
  ].map(normalizeLogin).filter(Boolean);
  if (candidates.some(candidate => candidate === loginId)) return true;
  return candidates.some(candidate => loginId.length >= 4 && candidate.startsWith(loginId));
}
function normalizeLogin(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/(.)\1+/g, "$1");
}
function titleCase(s) { return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); }
function smartTitleCase(s) {
  const acronyms = new Set(["BAF", "BCOM", "B.COM", "BMS", "HSC", "SSC", "CA", "CS", "CMA"]);
  return String(s || "").split(/\s+/).map(word => {
    const cleaned = word.replace(/[^\w.]/g, "").toUpperCase();
    if (acronyms.has(cleaned)) return cleaned === "BCOM" ? "B.Com" : cleaned;
    return titleCase(word);
  }).join(" ");
}
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(value) { return escapeHtml(value); }
function exportCsv(filename, rows) {
  alert("Export is disabled.");
  return;
  if (!rows.length) return alert("No data to export.");
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => `"${String(r[h] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = filename;
  a.click();
}

