# Test Case Classification

## Classification Rules

Layer, purpose, risk, suite, and automation disposition are separate dimensions. An API check may be integration-level; smoke/regression are cross-layer suites, not pyramid tiers. All 61 cases link to the detail in [003 test cases](003-test-cases.md). `Candidate` means not implemented; this repository has no configured test command or verified test suite.

## UI Cases

| Cases | Layer | Purpose / tags | Suite | Automation / reason | Current run |
|---|---|---|---|---|---|
| TC-UI-001 | UI | Page rendering, functional | Smoke | Candidate; stable visible roles/text | Pass |
| TC-UI-002–005 | UI | Required/format validation, negative | PR, regression | Candidate; deterministic client validation; assert no auth call | 002 pass; 003–005 not run |
| TC-UI-006–008 | UI + API boundary | Auth negative/positive, route authorization | Smoke, regression, security | Candidate after approved test identities/session | 008 pass; 006–007 not run |
| TC-UI-009–010 | UI | Registration rendering/required rules | Smoke, regression | Candidate; stable labels and validation feedback | Pass |
| TC-UI-011–017 | UI | Boundary, format, phone, password match, age consent | PR, regression | Candidate; deterministic rules; each boundary should run independently | 011 pass as combined validation case; 013/014/016/017 partial only; 012/015 not run |
| TC-UI-018 | UI | Runtime error / occupation control | Regression | Candidate regression after repair; console assertion | Fail; TypeError reproduced twice |
| TC-UI-019–021 | UI + API | Radio selection, account creation, duplicate | Regression/security | Candidate only with synthetic unique users and cleanup | Not run |
| TC-UI-022–024 | UI | Password-set page, required/format/match | Smoke, regression/security | Candidate; never submit valid reset without authorized test token | 022–023 pass; 024 not run |
| TC-UI-025 | UI | Responsive CTA hit target | Compatibility/regression | Hybrid; automate at supported viewport matrix, human review of layout | Fail candidate at 1036x743; works hit-test at 1536x960 |
| TC-UI-026 | UI | Keyboard/accessibility/responsive | Accessibility/compatibility | Hybrid; automated focus checks plus manual AT review | Not run |
| TC-UI-027 | UI | Product search/filter/pagination/details | Regression | Candidate after auth and catalog fixture | Not run |
| TC-UI-028 | UI | Own order list/view/delete | Regression/release | Hybrid; automate read path; deletion needs manual safety/cleanup review | Not run |

## API Cases

| Case | Method/path | Purpose / tags | Suite | Automation / reason | Current run |
|---|---|---|---|---|---|
| TC-API-001 | POST `/auth/login` | Contract, positive/negative/auth | PR, regression | Candidate with approved synthetic account and response schema | Not run |
| TC-API-002 | POST `/auth/register` | Validation, create, duplicate | Regression | Candidate with unique synthetic identities and cleanup | Not run |
| TC-API-003 | GET `/auth/confirm/{token}` | Token state, expiry, replay | Regression/security | Candidate with controlled generated test tokens | Not run |
| TC-API-004 | POST `/auth/forgot-password` | Privacy, anti-enumeration, side effect | Security/regression | Hybrid; API assertion plus controlled message sink | Not run |
| TC-API-005 | POST `/auth/confirm-forgot-password-otp/{value}` | OTP validation/expiry | Security/regression | Candidate; test-only OTP fixture required | Not run |
| TC-API-006 | POST `/auth/new-password` | Password mutation/session | Security/regression | Candidate only with disposable account/reset flow | Not run |
| TC-API-007 | GET `/auth/all-users` | Admin authorization/data minimization | Security/P0 review | Do not automate/repeat until site owner triages; protect response data | Fail candidate: unauthenticated HTTP 200, body not inspected |
| TC-API-008 | GET `/user/get-cart-count/{userId}` | Ownership/data isolation | Regression/security | Candidate with two synthetic accounts | Not run |
| TC-API-009 | POST `/user/add-to-cart` | Cart mutation/idempotency | Regression | Candidate with seeded product and isolated user | Not run |
| TC-API-010 | GET `/user/get-cart-products/{userId}` | Cart read/ownership | Regression/security | Candidate with owner and cross-user test | Inconclusive: anonymous HTTP 401 |
| TC-API-011 | DELETE `/user/remove-from-cart/{userId}/{productId}` | Cart deletion/idempotency | Regression | Candidate only with disposable cart | Not run |
| TC-API-012 | POST `/product/get-all-products` | Search/filter/schema | Regression | Candidate with stable catalog fixture | Inconclusive: anonymous HTTP 401 |
| TC-API-013 | GET `/product/get-product-detail/{productId}` | Product detail/404 | Regression | Candidate with known product fixtures | Not run |
| TC-API-014 | POST `/order/create-order` | Integrity/duplicate/retry | Release regression | Candidate in isolated QA only; side effects controlled | Not run |
| TC-API-015 | GET `/order/get-orders-for-customer/{userId}` | Ownership/order history | Regression/security | Candidate with users A/B and owned test orders | Inconclusive: anonymous HTTP 401 |
| TC-API-016 | GET `/order/get-orders-details?id={orderId}` | Order detail authorization | Security/regression | Candidate with owned/foreign/invalid IDs | Not run |
| TC-API-017 | GET `/order/get-all-orders` | Admin authorization | Security | Candidate after agreed admin-role contract | Inconclusive: anonymous HTTP 401 |
| TC-API-018 | DELETE `/order/delete-order/{orderId}` | Destructive order state/audit | Release regression | Conditional automation; only seeded disposable QA order and approved cleanup | Not run |

## End-to-End Cases

| Case | Layer / purpose | Suite / automation | Run |
|---|---|---|---|
| TC-E2E-001 | UI+API; register/login/catalog journey | Release smoke; conditional automation; synthetic account | Not run |
| TC-E2E-002 | UI+API; search and combined filters | Regression; automate stable assertions | Not run |
| TC-E2E-003 | UI+API; product detail/add-to-cart | Regression; API setup + UI outcome | Not run |
| TC-E2E-004 | UI+API; empty cart | Smoke/regression; automate | Not run |
| TC-E2E-005 | UI+API; add/remove and count consistency | Regression; automate in isolated QA | Not run |
| TC-E2E-006 | UI+API; totals/coupon | Regression; automate contract, manually review business policy | Not run |
| TC-E2E-007 | UI; missing shipping inputs | Regression; automate after expected validation approved | Not run |
| TC-E2E-008 | UI+external data; country selection | Regression; mock country provider in deterministic tests | Not run |
| TC-E2E-009 | API+UI; single order | Release; conditional automation due transaction side effects | Not run |
| TC-E2E-010 | API+UI; multi-item order | Release regression; conditional automation | Not run |
| TC-E2E-011 | API+UI; confirmation/history/details | Smoke/regression; automate authorized read path | Not run |
| TC-E2E-012 | API+UI; delete owned order | Release regression; conditional and destructive, require cleanup | Not run |
| TC-E2E-013 | API/security; cross-user order access | Security/regression; automate with isolated identities | Not run |
| TC-E2E-014 | Integration; >7 order behavior | Controlled manual or seeded automation; verify retention/audit | Not run; destructive risk |
| TC-E2E-015 | API/integration; duplicate/retry submission | Regression; automate only against idempotency contract/test stub | Not run |

## Automation Summary

Automatable candidates: client-side validation, filters, documented API contracts, route guard, ownership tests, cart state, safe read paths, and selected UI/E2E journeys when deterministic fixtures exist. Manual/hybrid: exploratory usability, visual/accessibility judgment, destructive delete/retention review, and unresolved business rules. Deferred: any authenticated mutation until authorized environment, synthetic data, payment/email isolation, and cleanup are confirmed. No automated tests are implemented or run in this repository.

## Coverage Statement

All 18 client-declared API method/path pairs and the currently discovered UI/ecommerce workflows are mapped to cases. That is complete mapping of the discovered surface, not proven 100% acceptance-requirement coverage: formal requirements and server contracts are unavailable, 42 cases remain not run, and 4 API observations are inconclusive.
