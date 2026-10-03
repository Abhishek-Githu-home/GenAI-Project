# Defect and Finding Register

## Triage Summary

Three findings are recorded from live exploration. They are not filed in an external issue tracker because no tracker/access was supplied. Two are client/UI behavior defects observed in the public site; the third is an urgent security exposure candidate whose response content was not inspected. Severity, priority, and release impact require owner triage.

| Local ID | Summary | State | Case |
|---|---|---|---|
| OBS-DEF-001 | Occupation selection throws uncaught TypeError | Reproduced twice; triage required | TC-UI-018 |
| OBS-DEF-002 | Registration CTA is intercepted by banner at 1036x743 after page scroll | Observed once; reproduce across supported viewports | TC-UI-025 |
| OBS-SEC-001 | Anonymous `/api/ecom/auth/all-users` returned HTTP 200 and 108,905,529-byte response | Security owner review required; no body inspected/repeated | TC-API-007 |

## OBS-DEF-001 - Occupation Selection Throws TypeError

- **Product/build:** Public client; deployment/build ID unknown. Client assets included `193.9a727f72e8b521135d18.js` and `main.dbba2e40bc4eca584f08.js`.
- **Environment/config:** Public registration page, MCP Playwright Chromium. Reproduced on fresh registration route; 1536x960 on repeat.
- **Preconditions/data:** Anonymous registration form. Selected `Student`; no account submitted and no real personal data used.
- **Steps:** 1. Open `https://rahulshettyacademy.com/client/#/auth/register`. 2. Select Student in Occupation. 3. Observe console and selected field.
- **Expected:** Selecting an option updates the form value without a runtime exception.
- **Actual:** Console reports `TypeError: this.registerForm.value.occupation.setValue is not a function` in `changeOcp`; error occurred twice across two selections. Submit was not sent.
- **Impact:** Registration occupation selection may be broken or form state may be unreliable; final business impact unverified.
- **Severity/priority:** Not assigned; product owner/engineering to triage.
- **Fix verification:** Not done; no fix/build available.

## OBS-DEF-002 - Banner Intercepts Register CTA at 1036x743

- **Product/build:** Public client; build identifier unknown.
- **Environment/config:** Registration page at viewport 1036x743 after invalid form expansion/scroll (scrollY about 696); compared with 1536x960.
- **Preconditions/data:** Invalid synthetic registration values; no submission or account creation.
- **Steps:** 1. Open registration page. 2. Fill invalid synthetic values and submit to display validation. 3. At 1036x743 scroll to Register and click. 4. Inspect hit target. 5. Repeat at 1536x960.
- **Expected:** Register remains reachable and clickable at supported viewports.
- **Actual:** Playwright timed out because `.banner` intercepted pointer events; button center hit-tested to `.banner` at 1036x743. At 1536x960 button center hit-tested to the Register input.
- **Impact:** Users at affected viewport/scroll position may be unable to submit registration; supported viewport matrix is unknown.
- **Severity/priority:** Provisional; requires reproduction at agreed supported viewport sizes and browser/zoom configurations.
- **Fix verification:** Not done.

## OBS-SEC-001 - Anonymous All-Users Endpoint Returns 200

- **Product/build:** Public API base declared by client bundle: `/api/ecom`; deployment/build ID unknown.
- **Environment/config:** One anonymous GET, no authorization header, to `https://rahulshettyacademy.com/api/ecom/auth/all-users`.
- **Steps:** Send a single unauthenticated GET to the client-declared path; capture status and response size only.
- **Actual:** HTTP 200; response length reported as 108,905,529 bytes. The response body was neither inspected nor saved, and the request was not repeated.
- **Expected:** Authorization and data minimization policy for this admin-looking user-list endpoint must be confirmed with the site owner. If restricted to authenticated admin, anonymous 200 is an access-control defect.
- **Impact/severity:** Potential bulk user-data exposure; actual data sensitivity unknown. Treat as urgent security candidate; security owner assigns severity and performs controlled review.
- **Containment:** Do not call the endpoint again or inspect the body from this run. Preserve status/size/timestamp metadata only and escalate via the approved security channel.
- **Fix verification:** Not performed.

## Non-Bug / Unconfirmed Findings

The product-list, cart-read, customer-order, and all-orders APIs returned 401 without authentication. Without approved API contracts, this is an observed response, not a confirmed pass or defect. Product count is unknown; category/filter values and UI copy do not establish live catalog totals. No order-delete defect or order defect can be reported because order mutation was not executed.
