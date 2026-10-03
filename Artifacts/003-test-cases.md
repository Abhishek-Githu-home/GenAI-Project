# Website Test Case Inventory

## Scope, Data, and Status Semantics

This inventory covers the live-observed public forms, client-declared product/cart/order UI and APIs, plus critical integrated journeys. Client-bundle routes are candidates until the site owner supplies an API contract. No account or order was created. Use isolated synthetic QA identities and unique order IDs only after owner approval; never put credentials, tokens, real PII, or payment details in case files.

`PASS` means the stated case was actually exercised and the expected public behavior observed. `PARTIAL` means only part of a case's distinct conditions was observed, often within a combined run. `FAIL` is an observed product/runtime failure or security candidate, separated in the defect register. `INCONCLUSIVE` means a response was observed but no approved contract establishes its expected result. `NOT RUN` means no attempt was made. Automation status is candidate/disposition, not proof of implementation.

**Inventory total: 61 cases** (28 UI, 18 API, 15 E2E). There are **15 discrete execution records**: 8 pass, 3 fail/candidate, 4 inconclusive; 4 additional UI case IDs have partial evidence from one combined validation submission; 42 are not run. Occupation selection was repeated once, making 16 attempts total. Detailed run evidence is in [005 execution report](005-test-execution-report.md).

## UI Cases (28)

| ID | Preconditions and steps | Expected result / assertion | Automation | Run |
|---|---|---|---|---|
| TC-UI-001 Login page | Open public login URL anonymously. | Title `Let's Shop`; email/password inputs and Login, Forgot password, Register controls visible. | UI candidate | PASS |
| TC-UI-002 Both login fields empty | On login, click Login without input. | Inline `*Email is required` and `*Password is required`; remain unauthenticated. | UI candidate | PASS |
| TC-UI-003 Email missing | Fill valid-format email only; click Login. | Email-required message; no authenticated state. | UI candidate | NOT RUN |
| TC-UI-004 Password missing | Fill password only; click Login. | Password-required message; no authenticated state. | UI candidate | NOT RUN |
| TC-UI-005 Invalid email format | Enter malformed email with a nonempty password; submit. | Approved email-format error and no login request/session. | UI/API candidate | NOT RUN |
| TC-UI-006 Invalid credentials | Use site-owner-approved synthetic invalid account once. | Authentication denied, safe feedback, no token/protected access. | UI/API candidate | NOT RUN |
| TC-UI-007 Valid login | Use approved synthetic account from secure secret store. | Approved dashboard state and correct user session. | UI/E2E candidate | NOT RUN |
| TC-UI-008 Direct protected route | Anonymous, open `#/dashboard/dash`. | Redirect to `#/auth/login`; no dashboard data rendered. | UI/API candidate | PASS |
| TC-UI-009 Registration page | Follow Register link. | Form exposes names, email, phone, occupation, gender radios, password/confirmation, age checkbox, Register. | UI candidate | PASS |
| TC-UI-010 Empty registration | Submit with all fields empty. | Required errors for first name, email, phone, password, confirm password, age checkbox; no user created. | UI candidate | PASS |
| TC-UI-011 Combined invalid registration | Fill first name `Ab`, malformed email, 9-digit phone, mismatched passwords; leave age unchecked; submit at 1536x960. | First-name minimum, valid-email, 10-digit phone, match, and age errors appear; no account created. | UI candidate | PASS (combined; individual cases not independently executed) |
| TC-UI-012 First-name length boundaries | Test 2, 3, 12, 13 characters with all other fields valid; do not submit valid record unless authorized. | Bundle declares accepted length 3–12; values outside are rejected. Validate exact UI feedback. | UI candidate | NOT RUN |
| TC-UI-013 Registration email format | Test valid-format, missing `@`, missing domain, whitespace variants. | Malformed email rejected; accepted format follows approved contract. | UI candidate | PARTIAL: malformed `invalid-email` only, combined case |
| TC-UI-014 Phone digit boundary | Test 9, 10, and 11 digits. | Client declares exactly 10 digits; 9-digit error observed. | UI candidate | PARTIAL: 9-digit error only, combined case |
| TC-UI-015 Phone nonnumeric | Test alphabetic, mixed, leading zero, plus sign, and spaces per approved input contract. | Non-numeric/out-of-contract value rejected; no request sent. | UI candidate | NOT RUN |
| TC-UI-016 Password mismatch | Enter different password/confirmation and submit. | `Password and Confirm Password must match with each other.`; no registration request. | UI candidate | PARTIAL: mismatch error only, combined case |
| TC-UI-017 Age acknowledgment | Leave age checkbox unchecked and otherwise provide valid synthetic fields. | `*Please check above checkbox`; no account created. | UI candidate | PARTIAL: required error only, combined case |
| TC-UI-018 Occupation selection | Choose Student, Doctor, Engineer, Scientist separately; inspect console and selected value. | Selection updates form without uncaught error. Actual Student selection raises `TypeError: ...occupation.setValue is not a function`. | UI candidate + console assertion | FAIL, reproduced twice |
| TC-UI-019 Gender selection | Select Male then Female; verify one choice remains selected and form value follows selection. | Radio group behavior and submitted value match selection. | UI candidate | NOT RUN |
| TC-UI-020 Valid registration | With owner-approved synthetic identity and safe QA verification sink, submit valid form. | One account created, clear success/verification result; no external message outside test sink. | API/UI candidate | NOT RUN; mutation not authorized with available data |
| TC-UI-021 Duplicate registration | Reuse an approved synthetic email after first account exists. | Duplicate rejected safely; no second account; response avoids inappropriate account disclosure. | API/UI candidate | NOT RUN |
| TC-UI-022 Password page | Open `#/auth/password-new`. | `Enter New Password`, email/password/confirm fields, Save New Password, Login/Register links visible. | UI candidate | PASS |
| TC-UI-023 Empty new-password form | Click Save New Password empty. | Required messages for email, password, confirm password; no mutation. | UI candidate | PASS |
| TC-UI-024 New-password invalid values | Test malformed email and mismatched confirmation with synthetic values. | Client-side invalid values rejected; no API call until valid and authorized. | UI/API candidate | NOT RUN |
| TC-UI-025 Register button viewport hit target | At 1036x743, scroll to Register and click; compare 1536x960. | CTA is unobscured/actionable at supported viewport. At 1036x743 `.banner` intercepted click; wide viewport hit-tested button. | UI/manual viewport + automation candidate | FAIL candidate |
| TC-UI-026 Login responsive/keyboard | Use agreed viewport/browser matrix; Tab through login and submit via keyboard. | Focus order, visible focus, labels, and actionability meet approved accessibility criteria. | Hybrid | NOT RUN |
| TC-UI-027 Catalog controls | Authenticated, inspect search, min/max price, category/subcategory/gender filters, result count and pagination. | Controls reflect bundle-declared dimensions; results correspond to approved product data; max page size declared as 9. | UI candidate | NOT RUN; auth required |
| TC-UI-028 Order list controls | Authenticated user opens orders; inspect empty/populated states, View/Delete controls. | Only permitted user's orders display; View/Delete match ownership policy; exact state TBD. | UI candidate + manual deletion review | NOT RUN; auth required |

## API Cases (18)

All paths below are client-declared under `/api/ecom`; verify current API spec before asserting schemas or status codes. Use authorized synthetic data and never dump user/order response bodies. For state changes, use isolated QA only.

| ID | Method/path | Test and expected result | Automation | Run |
|---|---|---|---|---|
| TC-API-001 | POST `/auth/login` | Valid/invalid/missing fields; verify token/session only for valid auth, error contract for invalid. | API candidate | NOT RUN |
| TC-API-002 | POST `/auth/register` | Valid, invalid field, duplicate identity; one account at most, documented response. | API candidate | NOT RUN |
| TC-API-003 | GET `/auth/confirm/{token}` | Valid, expired, malformed, reused token; confirm one-time/expiry semantics. | API candidate | NOT RUN |
| TC-API-004 | POST `/auth/forgot-password` | Existing/nonexistent synthetic email; check privacy-preserving response and test-sink side effect. | API candidate | NOT RUN |
| TC-API-005 | POST `/auth/confirm-forgot-password-otp/{value}` | Valid/invalid/expired OTP; verify rate limits and no unauthorized password change. | API candidate | NOT RUN |
| TC-API-006 | POST `/auth/new-password` | Valid/missing/mismatched password payload per contract; verify token/OTP requirement and session policy. | API candidate | NOT RUN |
| TC-API-007 | GET `/auth/all-users` | Anonymous/non-admin/admin authorization and response minimization. Anonymous request returned 200 and 108,905,529-byte response; body not inspected. Expected access policy requires owner/security confirmation. | Security API candidate; do not repeat until triaged | FAIL candidate |
| TC-API-008 | GET `/user/get-cart-count/{userId}` | Own user, another user, missing/invalid ID, no token; enforce ownership and documented count. | API candidate | NOT RUN |
| TC-API-009 | POST `/user/add-to-cart` | Add valid product, invalid product, duplicate product, another user's identity; ownership and idempotency contract. | API candidate | NOT RUN |
| TC-API-010 | GET `/user/get-cart-products/{userId}` | Own/other/missing user; anonymous request returned 401; verify owner-only cart response. | API candidate | INCONCLUSIVE: 401 observed; policy not approved |
| TC-API-011 | DELETE `/user/remove-from-cart/{userId}/{productId}` | Remove owned item, nonexistent item, another user's item, repeat delete; only permitted item changes. | API candidate | NOT RUN |
| TC-API-012 | POST `/product/get-all-products` | Empty/filter body; verify schema, search, min/max price, categories/subcategories/gender, paging. Anonymous `{}` returned 401. | API candidate | INCONCLUSIVE: 401 observed; contract not approved |
| TC-API-013 | GET `/product/get-product-detail/{productId}` | Existing, missing, malformed, unavailable product; schema/data match listing and access policy. | API candidate | NOT RUN |
| TC-API-014 | POST `/order/create-order` | One/multiple allowed products, invalid IDs, missing country, duplicate/retry; verify one intended order and no partial side effect. | API candidate | NOT RUN; mutation blocked pending environment |
| TC-API-015 | GET `/order/get-orders-for-customer/{userId}` | Own/other/missing user; anonymous request returned 401; verify ownership and fields. | API candidate | INCONCLUSIVE: 401 observed; contract not approved |
| TC-API-016 | GET `/order/get-orders-details?id={orderId}` | Owner/admin/other user, missing/malformed ID; enforce order-level authorization and safe not-found response. | API candidate | NOT RUN |
| TC-API-017 | GET `/order/get-all-orders` | Anonymous/customer/admin authorization. Anonymous request returned 401. | API candidate | INCONCLUSIVE: 401 observed; expected role policy not approved |
| TC-API-018 | DELETE `/order/delete-order/{orderId}` | Delete owned eligible order, repeat, nonexistent ID, unauthorized owner; verify state, audit, idempotency. | API candidate; destructive and QA-only | NOT RUN |

## End-to-End Cases (15)

All require an authorized synthetic account, isolated QA/pre-production environment, approved product data, safe payment/email/shipping integration, and cleanup.

| ID | Flow / expected outcome | Automation / run |
|---|---|---|
| TC-E2E-001 | Register synthetic user, confirm by approved mechanism, login, reach catalog; exactly one account/session. | Conditional UI/API hybrid; NOT RUN |
| TC-E2E-002 | Search then combine price/category/subcategory/gender filters; displayed products satisfy all criteria; reset filters returns baseline. | UI automation candidate; NOT RUN |
| TC-E2E-003 | View known product, Add To Cart, verify matching item and count. | UI plus API assertion candidate; NOT RUN |
| TC-E2E-004 | Open empty cart, observe empty state, verify no unintended order. | UI/API candidate; NOT RUN |
| TC-E2E-005 | Add then remove a product; cart and count return to prior state. | UI/API candidate; NOT RUN |
| TC-E2E-006 | Compare cart subtotal/total with approved prices; exercise empty, valid (`rahulshettyacademy`) and invalid coupon behavior if coupon feature is in release. | Hybrid; NOT RUN; coupon behavior needs requirement confirmation |
| TC-E2E-007 | Attempt checkout without required shipping email/country. | UI candidate; client declares `Please Enter Full Shipping Information`; NOT RUN |
| TC-E2E-008 | Load country options, select allowed country, verify selection survives order review. | UI/API candidate; external countries dependency; NOT RUN |
| TC-E2E-009 | Place one controlled order; confirmation ID/details match submitted product and country; one order created. | API setup + limited UI E2E; NOT RUN |
| TC-E2E-010 | Place multi-item order; each item appears once and totals/confirmation follow contract. | API/integration + E2E; NOT RUN |
| TC-E2E-011 | Open customer order list and detail; owner sees their order and matching product/price/date. | API/UI candidate; NOT RUN |
| TC-E2E-012 | Delete a disposable owned order; list/detail reflect approved deleted/cancelled state; cleanup/audit recorded. | API/UI candidate; destructive; NOT RUN |
| TC-E2E-013 | User A attempts user B order detail/delete; no data exposure or mutation. | API/security plus UI candidate; NOT RUN |
| TC-E2E-014 | With seeded isolated orders, verify client-declared >7 behavior and identify exactly which order is removed; audit and restore data. | Manual/controlled integration; NOT RUN; potentially destructive, owner approval required |
| TC-E2E-015 | Simulate double-click/retry/timeout on Place Order once using safe test stub; exactly-once/idempotency outcome per approved contract. | API/integration candidate; NOT RUN |

## Coverage Rule

Every client-declared route and discovered user-facing workflow has at least one candidate case above. This is **100% mapping of the discovered client surface**, not 100% verified requirement coverage. Authenticated CRUD, API schema, product count, and business acceptance criteria remain open; do not call them passed or complete until the owner supplies contracts and safe test access.
