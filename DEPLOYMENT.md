# CMA Admission CRM Deployment

## GitHub Sharing

This app is static, so it can be uploaded to GitHub Pages.

1. Create a GitHub repository, for example `cma-admission-crm`.
2. Upload these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `google-apps-script.gs`
   - `DEPLOYMENT.md`
3. In GitHub, open repository `Settings`.
4. Go to `Pages`.
5. Select branch `main` and folder `/root`.
6. Save.
7. Open the GitHub Pages URL.

## Google Sheet Database

1. Create a Google Sheet.
2. Open `Extensions` -> `Apps Script`.
3. Paste the full content of `google-apps-script.gs`.
4. Save the Apps Script project.
5. Click `Deploy` -> `New deployment`.
6. Select type `Web app`.
7. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
8. Deploy and copy the Web App URL.
9. Open the CRM.
10. Go to `Master Settings` -> `Google Sheet Database`.
11. Paste the Web App URL.
12. Tick `Auto load and auto save`.
13. Click `Save Sync Settings`.
14. Click `Save To Sheet` once to initialize the database.

## Important

Google Sheet sync stores the CRM database JSON in the sheet named `Database`.

Keep periodic backups using `Master Settings` -> `Data Backup` -> `Export Backup`.
