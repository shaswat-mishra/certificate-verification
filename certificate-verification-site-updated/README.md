# Certificate Verification Website (3-page demo)

## Included
- `index.html` — welcome page, certificate search page, and result page
- `styles.css` — responsive desktop/mobile styling
- `script.js` — demo certificate lookup and invalid-code handling

## Run locally
Open `index.html` in a modern browser. For testing with a local server, run from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Demo certificate record
The demo includes certificate code `83610f2`, with the details supplied for the sample page. Edit the `certificates` object in `script.js` to add or change authorized records.

## Publish online for QR scanning
1. Upload these three files (`index.html`, `styles.css`, `script.js`) to a static hosting service such as GitHub Pages, Netlify, or Cloudflare Pages.
2. Confirm the deployed HTTPS website works on a phone using mobile data.
3. Create a QR code pointing to the deployed website URL, for example `https://YOUR-DOMAIN/#verify` to open the code search page.
4. To open a specific demo result directly, use `https://YOUR-DOMAIN/#verify?code=83610f2`.

## Important production note
This is a front-end demonstration. Certificate data in `script.js` is public to anyone who views the website source, and the sample lookup is not secure verification. Before production use, connect the form to an authorized backend/API or database, validate records server-side, publish only approved information, and use HTTPS. Do not enter real private student data into a public demo.
