# Website Test Scenarios

## Scope and Coverage Meaning

Scenarios are derived from (1) live public UI interactions on 2026-10-01 and (2) route/feature strings in the public client bundle. The client bundle is implementation evidence, not an approved API contract. Catalog, cart, checkout, and order screens require authentication and were not entered. Mutating flows remain proposed until an authorized synthetic account and safe environment are available.

A claim of “100%” means every approved acceptance criterion and every discovered client-declared endpoint/visible workflow is mapped to one or more scenarios and cases, with exclusions reported. It cannot mean every possible input combination or unobserved server behavior. Current formal approved requirements were not provided, so approval-based coverage is **not measurable yet**.

## Scenarios

| Scenario | Goal / flow | Primary evidence / cases | Risk / layers | State |
|---|---|---|---|---|
| TS-UI-001 Login entry | Open `#/auth/login`; inspect title, credentials, Login, Register, recovery navigation | Live DOM; UI-001–008 | P1, UI | Partially executed |
| TS-AUTH-001 Required login inputs | Submit empty, email-only, and password-only combinations | Inline required messages; UI-002–004 | P0, UI/API | Empty case executed; others not run |
| TS-AUTH-002 Email/login rejection | Invalid email format and invalid credentials are rejected without session | UI-005/006; API-001 | P0, UI/API | Not executed beyond client bundle validation |
| TS-AUTH-003 Valid login | Approved synthetic user authenticates and reaches catalog | UI-007; API-001; E2E-001 | P0, API/UI/E2E | Blocked: no authorized account |
| TS-AUTH-004 Protected session | Direct dashboard, expired token, logout, and cross-user access | UI-008/026; API-008/010/015/016/017 | P0, API/UI | Direct redirect and unauthenticated read responses observed; full session not tested |
| TS-REG-001 Registration form structure | Confirm all fields, select options, radio choices, and age checkbox | Live registration DOM; UI-009/019 | P1, UI | Executed |
| TS-REG-002 Required registration fields | Empty submit reports required first name, email, phone, password, confirmation, age | UI-010 | P1, UI | Executed |
| TS-REG-003 Registration boundary validation | First name 3–12; email format; phone exactly 10 digits/numeric; matching passwords | Bundle validators and UI-011–016 | P1, UI/API | Subset executed with observed inline feedback |
| TS-REG-004 Occupation selection | Choose Doctor/Student/Engineer/Scientist and verify model/form state | UI-018 | P2, UI | Defect reproduced: uncaught TypeError on change |
| TS-REG-005 Account creation lifecycle | Valid registration, confirmation token, duplicate email, age consent | UI-020/021; API-002/003 | P1, API/UI | Blocked: no account mutation performed |
| TS-REC-001 Password recovery/set-new screen | Open reset route, validate fields and links | UI-022/023/024; API-004/005/006 | P1, API/UI | Screen and blank validation executed; no recovery request sent |
| TS-CAT-001 Product catalog discovery | Load products after auth and verify card identity, price, availability, max nine/page | API-012/013; UI-027; E2E-002 | P1, API/UI | Blocked: auth required; declared in bundle |
| TS-CAT-002 Search and filter | Search product; apply price, category, subcategory, gender, and combined filters; empty results | UI-027; API-012; E2E-002 | P1, API/UI | Not executed; filters declared in client |
| TS-CAT-003 Product details | Open View/details and confirm selected product data | API-013; E2E-003 | P1, API/UI | Not executed |
| TS-CART-001 Cart read/count | Load cart and cart count for owner; verify empty state and items | API-008/010; E2E-004 | P0, API/UI | API no-token read returned 401; owner state not tested |
| TS-CART-002 Add/remove cart item | Add product, verify count/cart, remove product, verify absence | API-009/011; E2E-003–005 | P0, API/UI/E2E | Not executed; mutation requires auth |
| TS-CART-003 Cart totals/coupon | Compare listed items to subtotal/total; empty/invalid and client-declared coupon | E2E-006/007 | P1, UI/E2E | Not executed; price/tax rules unknown |
| TS-ORDER-001 Checkout validation | Validate required email/country; load/select country; reject incomplete details | E2E-008/009; API-018 | P0, UI/API | Not executed; client bundle declares validation |
| TS-ORDER-002 Place order | Single and multiple selected products; ensure intended items/order result | API-014; E2E-010/011/015 | P0, API/integration/E2E | Not executed; no safe account/environment |
| TS-ORDER-003 Order verification | Confirmation, customer list, details, ownership, amount/date/product identity | API-015/016; UI-028; E2E-012 | P0, API/UI/E2E | Orders-for-customer API returned 401 without token; positive flow blocked |
| TS-ORDER-004 Delete order | Delete owned order; verify absent; handle duplicate/nonexistent/unauthorized ID safely | API-018; E2E-013 | P0, API/UI/E2E | Not executed; destructive action needs isolated data |
| TS-ORDER-005 Order retention limit | Verify declared “more than 7” behavior using seeded disposable data and audit trail | UI-028; E2E-014 | P1, integration/E2E | Bundle copy observed; semantics and safe fixture unknown |
| TS-SEC-001 Unauthenticated authorization | Compare unauthenticated access to catalog/cart/orders/all-users endpoints | API-007/008/010/012/015/017 | P0, API/security | Cart/order/catalog 401; all-users 200 candidate escalated; no body inspected |
| TS-NFR-001 Responsive registration interaction | Register CTA remains visible/actionable at supported viewports | UI-025/026 | P1/P2, UI | At 1036x743 banner intercepted click; at 1536x960 target was hit-testable |
| TS-NFR-002 Client runtime errors | Exercise public form controls and assert no uncaught console errors | UI-018; E2E check | P1, UI | Occupation selection produces repeatable TypeError |
| TS-NFR-003 Accessibility/privacy | Labels, keyboard/focus, errors, contrast, data minimization and redacted logs | UI-026; API security cases | Risk-based, UI/API/manual | Not comprehensively tested; specialist criteria open |

## Traceability

The detailed 61-case inventory is in [test cases](003-test-cases.md); per-case layer, suite, automation, and execution dispositions are in [classification](004-test-case-classification.md). Observations/API routes are in [001](001-website-observations.md). An unexecuted or open scenario is not evidence of coverage passing.
