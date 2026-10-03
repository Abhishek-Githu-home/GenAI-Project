# Test Execution Report

## Run Identity

| Field | Value |
|---|---|
| Run ID | OBS-20261001-MCP-01 |
| Product | Rahul Shetty Academy practice ecommerce client |
| Date | 2026-10-01 |
| Browser/access | Private MCP Playwright browser; Chromium-based; public unauthenticated session |
| Viewports | 1536x960 for invalid registration and wide hit test; 1036x743 for CTA interception |
| Build/sprint | Not exposed/provided; hashed public JS assets observed, no release identifier |
| Environment | Public site; not classified as dev, QA, or pre-production |
| Scope | Public login/register/password pages, unauthenticated route/API access, public bundle observation |
| Out of execution | Successful authentication, account creation, authenticated catalog/cart, order placement/deletion, destructive tests |

## Results

| Status | Unique cases | Case IDs / meaning |
|---|---:|---|
| PASS | 8 | TC-UI-001, 002, 008, 009, 010, 011, 022, 023. |
| PARTIAL | 4 | TC-UI-013, 014, 016, 017: their respective invalid-value messages appeared in the same combined TC-UI-011 submission; no standalone case run. |
| FAIL / candidate | 3 | TC-UI-018 occupation selection TypeError; TC-UI-025 register CTA intercepted at 1036x743; TC-API-007 unauthenticated `/auth/all-users` returned HTTP 200. See defect register; security impact pending owner review. |
| INCONCLUSIVE | 4 | TC-API-010 cart read, TC-API-012 product list, TC-API-015 customer order list, TC-API-017 all orders returned 401 without credentials; contract/role expectation not approved. |
| NOT RUN | 42 | Remaining inventory cases require authorized accounts, API contracts, environment, safe data, or specialist criteria. |
| **Total designed** | **61** | 28 UI + 18 API + 15 E2E. |
| **Discrete execution records** | **15** | 8 pass + 3 fail/candidate + 4 inconclusive. |
| **Cases with any observed evidence** | **19** | 15 discrete execution records plus 4 partial UI case IDs from the combined validation submission. |
| **Attempts** | **16** | Occupation selection reproduced a second time; counts above use unique execution records. |

Discrete execution-record progress: 15/61 inventory cases (24.6%); 19/61 cases have at least partial evidence. Neither is an approved-requirement coverage or product quality score. No formal approved requirement baseline exists yet.

## Evidence Notes

- Login page rendered; empty login showed email/password required messages.
- Registration page rendered; empty submission showed six required messages. Combined invalid values produced first-name minimum, email-format, 10-digit phone, password mismatch, and age-checkbox messages.
- Selecting Student on the occupation dropdown caused an uncaught `TypeError`; repeated on a fresh page. No registration request was submitted.
- Register click timed out at 1036x743 because `.banner` intercepted the button. At 1536x960 `elementFromPoint` hit the submit input. This needs supported viewport confirmation.
- Password set page rendered; empty submit showed required errors for email/password/confirmation.
- Direct unauthenticated `#/dashboard/dash` navigation returned to login.
- Four unauthenticated read calls returned 401. The all-users endpoint returned 200 with reported content length 108,905,529 bytes. Its body was not inspected or saved; no further request was made.
- No login credentials or user/order data were created; no order/cart mutations were performed.

## Recommendation

Not assessed for release. Escalate the all-users endpoint candidate through the site owner's security channel before further probing. Obtain an authorized synthetic account and designated QA environment before executing the remaining catalog/cart/order cases. Build/sprint, CI, supported browser matrix, and exit criteria are unavailable.
