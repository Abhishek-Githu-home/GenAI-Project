# Ecommerce Test Case Plan and Skeleton

## 1. Document Control

| Field | Value |
|---|---|
| Product | Rahul Shetty Academy ecommerce client |
| Entry point | https://rahulshettyacademy.com/client/#/auth/login |
| Version | 0.1 - proposed case-design baseline |
| Status | Draft; requirements, behavior, and test access require confirmation |
| Owner | QA/Test Lead (TBD) |
| Related plan | [Ecommerce application test plan](004-test-plan.md) |

## 2. Purpose and Coverage Commitment

This document defines how test cases will be derived, classified, automated, executed, and traced for the customer journey:

`Sign in -> discover/select product(s) -> add to cart -> review/update cart -> submit checkout/order -> verify order`

The stated goal of **100% test case coverage** means:

- Every approved, in-scope requirement has at least one linked case at an appropriate test level.
- Every P0 risk has one or more explicit cases and release evidence.
- Each requested testing category in this plan has cases or a documented reason it is not applicable.
- Every uncovered requirement, blocked case, exclusion, and manual/deferred decision is visible and has an owner or next action.

It does **not** mean every possible input combination, browser/OS combination, or defect can be exhaustively tested. Achieve meaningful breadth with equivalence partitioning, boundary-value analysis, decision tables, state-transition coverage, pairwise/configuration selection where suitable, and risk-based exploratory testing. Report coverage with a clear denominator and exclusions; never report 100% unless all approved in-scope requirements are mapped.

## 3. Evidence and Constraints

The companion test plan and ecommerce test architecture establish the supplied URL and the product-to-order journey as context. Detailed product behavior, acceptance criteria, APIs, selectors, roles, supported browsers, payment behavior, inventory rules, order state model, and environment permissions are not confirmed in the available artifacts.

The project manifest lists `@playwright/test`, but no configured test command or existing suite has been confirmed. Treat Playwright as an available dependency candidate, not a proven framework setup. Validate repository configuration before creating executable automation.

Use synthetic data and authorized non-production environments. Do not store credentials, personal information, payment details, or secrets in the plan or cases. Do not create real external transactions or perform intrusive testing without explicit authorization.

## 4. Classification Model and Pyramid

Classify each case on separate axes. One case may, for example, be an API-level regression test or a UI-level smoke test.

| Layer / category | Purpose and ecommerce allocation | Typical automation posture |
|---|---|---|
| Unit | Fast isolated business rules: cart quantity/total calculations, validation decisions, state transitions, formatting where business-critical. | Automate by default when source and deterministic dependencies are available. |
| Integration | Verify collaboration and persistence across components/services, including cart/order consistency, transaction boundaries, and dependency failures. | Automate stable contracts and controlled test environments; use test doubles for unavailable external systems. |
| API | Verify documented service contracts, authorization, validation, errors, idempotency/retry semantics, and order/cart data consistency. | Automate with approved interfaces, synthetic data, and safe isolated environments. API is a test interface/category; it may be an integration-level test. |
| UI | Verify rendered and interactive behavior, accessible controls, validation feedback, responsive layout, and user-visible totals/status. | Automate stable critical behavior; supplement with manual accessibility, exploratory, and visual judgment. |
| End-to-end | Verify a small number of critical journeys across integrated layers, especially product-to-order confirmation/lookup. | Automate only when the environment, data reset, dependencies, and side effects are controlled; retain manual exploratory confirmation where needed. |
| Smoke suite | Fast build/environment confidence checks. Include health plus a minimal authenticated critical path where safe. This is a suite tag, not a layer. | Automate repeatable checks; keep execution fast and diagnostic. |
| Regression suite | Re-run selected cases for changed and high-risk behavior. It spans all layers and can include manual tests. | Automate stable, repeatable high-value checks; retain manual judgment-based coverage. |

The portfolio should be broadest at the unit/component layer, narrower at integration/API, and smallest at browser end-to-end. Do not set universal layer percentages without repository size, risks, and runtime evidence. Smoke and regression are cross-layer suites, not additional pyramid tiers.

## 5. Coverage Areas and Proposed Case Inventory

These are **proposed coverage themes**, not confirmed product requirements. Convert each theme into cases only after validating the corresponding behavior and acceptance criteria.

| Area | Coverage themes | Candidate layers / suite tags | Priority |
|---|---|---|---|
| Authentication and session | Valid/invalid credentials; required fields; unauthorized/protected access; logout; session expiry and recovery; user/order isolation. | Unit, API/integration, UI, selected E2E; smoke/regression. | P0/P1 |
| Product discovery and selection | Product identity/details; search/filter/sort only if confirmed; empty/error results; price/availability presentation; selecting the intended item. | Unit/component, API, integration, UI; regression. | P1 |
| Cart | Add/remove/update; duplicate add semantics; quantity boundaries; subtotal/total calculation; empty cart; persistence; stale price/availability; multi-item behavior. | Unit, API/integration, UI; smoke/regression. | P0/P1 |
| Checkout and order submission | Required/invalid fields; accepted/rejected input; single submission; duplicate click/retry; timeout/ambiguous response; partial failure; recovery. | Unit, API/integration, UI, limited E2E; regression. | P0 |
| Order confirmation and verification | Confirmation outcome; identifier/details; persisted order visibility; status consistency; authorized access; duplicate/missing order handling. | API/integration, UI, critical E2E; smoke/regression. | P0 |
| Cross-cutting quality | Keyboard/focus/labels; responsive/browser support; privacy/security; performance; reliability; safe logs/errors; localization only if in scope. | Unit/component, API/integration, UI, specialist/manual, selected E2E. | Risk-based |

## 6. Case Design Template

Use one record per independently executable test condition. The following fields are mandatory unless explicitly marked not applicable with a reason.

| Field | Required content |
|---|---|
| Case ID / title | Stable unique identifier and concise behavior under test. |
| Requirement / scenario links | Approved IDs; use `TBD` until source artifacts exist. |
| Risk / priority | Business impact and probability/exposure rationale; P0-P3 only after stakeholder agreement. |
| Layer | Unit, integration, API, UI, or end-to-end. |
| Suite/type tags | Smoke, regression, positive, negative, boundary, security, accessibility, performance, exploratory, etc. |
| Objective | Specific rule, contract, or user outcome proven. |
| Preconditions | Environment/build, user state, product/cart/order state, permissions, and dependency state. |
| Test data | Synthetic inputs and expected values; no secrets or live personal/payment data. |
| Steps | Numbered, atomic, repeatable actions. State interface used when relevant. |
| Expected results | Observable assertion for every important action, including no-side-effect expectations on failure. |
| Cleanup | Order/cart/account data reset, teardown, and safe external side-effect controls. |
| Automation | Automated, Manual, Hybrid, or Deferred; include reason, owner, and revisit condition if not automated. |
| Execution/evidence | Frequency, CI stage or manual session, result/evidence location, and defect link. |

### Example Skeleton (Proposed, Pending Contract Validation)

| Field | TC-CART-UNIT-001 - Recalculate cart total after quantity change |
|---|---|
| Requirement / scenario | TBD - cart quantity/total acceptance criterion |
| Risk / priority | P1 proposed; incorrect totals can flow into order submission |
| Layer / tags | Unit; regression |
| Objective | Verify the approved cart calculation rule for a valid quantity change. |
| Preconditions / data | Calculation unit available; synthetic product price and quantity values from the approved rules. |
| Steps | 1. Invoke calculation with the initial quantity. 2. Change quantity to another approved valid value. |
| Expected | Returned line and cart totals match the documented currency/rounding/tax rules. Exact rule is TBD until product contract is confirmed. |
| Cleanup | None if pure/deterministic; otherwise reset fixture state. |
| Automation | Automated candidate: deterministic business rule. Confirm source module and currency/tax contract before implementation. |

| Field | TC-ORDER-E2E-001 - Complete controlled purchase and verify order |
|---|---|
| Requirement / scenario | TBD - approved end-to-end purchase and order-verification requirements |
| Risk / priority | P0 proposed; validates critical customer outcome |
| Layer / tags | End-to-end UI; smoke, regression |
| Objective | Demonstrate the authorized customer can submit a controlled order and verify its resulting state. |
| Preconditions / data | Approved non-production environment, synthetic account/product, safe order side effects, unique run data, and cleanup path. |
| Steps | 1. Sign in. 2. Select an approved product. 3. Add/review cart. 4. Complete permitted checkout. 5. Locate and verify the created order. |
| Expected | Each transition shows the expected product/quantity/total; one order is created; confirmation and lookup agree per approved contract. Exact assertions TBD. |
| Cleanup | Reconcile and remove/archive test order only through approved mechanism. |
| Automation | Conditional candidate: automate only if environment/data/dependencies are isolated and repeatable. Otherwise run controlled manual validation and record why. |

## 7. Automation Decision Framework

Use these dispositions for each case:

- **Automated:** Stable, repeatable, observable, deterministic, and economical to run; dependencies and data can be controlled.
- **Manual:** Requires human observation/judgment, exploratory adaptation, or a specialist device/assistive-technology assessment that current automation cannot reliably represent.
- **Hybrid:** Automation checks objective mechanics/assertions; a human completes or reviews the qualitative/specialist portion.
- **Deferred:** Automation may be valuable, but is blocked by missing requirements, access, test hooks, stable data, environment, or safe integration controls. Include an owner and revisit trigger.

| Case type | Automate when | Keep manual/hybrid/defer when and why |
|---|---|---|
| Unit | Rule is deterministic and isolated; inputs and expected outcomes are specified. | Manual review only for exploratory investigation or when behavior itself is still undefined; turn confirmed rules into automated examples. |
| Integration | Contracts and test environment are stable; data can be provisioned/reset and external dependencies controlled. | Defer when no safe environment or contract exists; executing against unknown shared/production state risks pollution and nondeterminism. |
| API | Authorized documented API, stable authentication, synthetic data, and cleanup exist. | Defer if API access/contract is unavailable or testing could create uncontrolled real orders/side effects. Do not fabricate endpoints. |
| Smoke | A small set of repeatable high-signal checks can run after deployment. | Keep a short manual readiness check only if access or environment state makes automation unsafe; document limitation and owner. |
| Regression | Case is stable, repeatable, and high-value with clear assertions. | Manual exploratory regression remains useful for changed/ambiguous behavior; automation cannot replace discovery or human judgment. |
| UI | User-visible behavior is stable and has accessible, resilient locators; environment and test data are reliable. | Manual/hybrid for visual nuance, exploratory usability, assistive technology combinations, or intermittent third-party behavior not safely controllable. Automated accessibility scans do not replace manual accessibility review. |
| End-to-end | Critical journey is deterministic in isolated non-production; setup/cleanup and external services are controlled. | Manual/deferred when order/payment/email/inventory side effects cannot be isolated, test data cannot be reset, or failures are too opaque/flaky. Keep a minimal controlled manual release check and track the infrastructure gap. |

Do not cite "not enough time" as the only permanent reason. If cost exceeds value, document run frequency, maintenance burden, risk mitigated, and a reevaluation trigger. A manual case must still have reproducible steps, expected results, evidence, owner, and execution cadence.

## 8. Suite Membership and Execution

| Suite | Selection rule | Example cadence (confirm with CI/release owners) |
|---|---|---|
| Pull request | Fast unit/component and relevant contract checks for touched behavior. | Every change. |
| Smoke | Deployment health and minimum high-risk flow checks; avoid broad permutations. | After deploy and before wider execution/release. |
| Regression | Cases selected by changed requirements, dependencies, risk, and prior defects; include stable automated coverage across layers. | On candidate builds and agreed scheduled runs. |
| Exploratory | Time-boxed investigation of new, changed, ambiguous, or high-risk behavior. | During feature validation and risk review. |
| Specialist | Approved security, accessibility, compatibility, performance, and resilience checks with suitable expertise and environment. | Per release/risk trigger or agreed cadence. |

Smoke and regression membership are orthogonal to layer. Avoid running every end-to-end case on every commit; use lower-layer checks for breadth and UI E2E for critical integrated proof.

## 9. Coverage and Traceability Accounting

Maintain a matrix with at least these columns:

| Requirement ID | Requirement status | Scenario ID | Case ID(s) | Risk | Layer | Suite(s) | Automation disposition/reason | Execution result/evidence | Gap owner |
|---|---|---|---|---|---|---|---|---|---|
| TBD | Open/confirmed | TBD | TBD | TBD | TBD | TBD | TBD | Not run | TBD |

Calculate requirement traceability as:

`covered approved in-scope requirements / total approved in-scope requirements x 100`

Report separately: P0 risk coverage, cases designed/executed/passed/blocked, and untested or excluded scope. Requirements marked open/assumption do not count as approved covered requirements; list them as discovery gaps. A requirement is covered only when linked cases have suitable assertions at appropriate layers, not merely because a case ID exists. Any 0%/partial coverage is a gap to resolve or an explicitly accepted risk.

## 10. Review and Readiness Checklist

- Every approved in-scope requirement maps to one or more cases, and all P0 risks have appropriate coverage.
- The case inventory includes unit, integration, smoke, regression, UI, API, and end-to-end categories or explicitly explains why a category is not applicable.
- The pyramid has most behavioral detail at fast lower layers and a small critical E2E set; smoke/regression are suite tags, not extra layers.
- Positive, negative, boundary, state, authorization, retry/failure, and recovery conditions are derived from actual rules or clearly marked as proposed.
- Expected results are precise and observable, with negative paths checking that unintended cart/order side effects do not occur.
- Every manual/hybrid/deferred case has a reason, owner, evidence expectation, and revisit condition where appropriate.
- Test data is synthetic; environment access, setup, isolation, cleanup, and external side effects are controlled.
- IDs and references are unique and valid; tests are independent where practical; unsupported APIs/selectors/business rules are not presented as fact.
- Execution status and release implications are reported without treating coverage percentage as proof of quality.