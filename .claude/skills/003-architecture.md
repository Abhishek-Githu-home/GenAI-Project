---
name: ecommerce-test-architecture
description: "Create or improve a complete, risk-based testing strategy and documentation for the Rahul Shetty Academy ecommerce web application. Use for requirements, test scenarios, test cases, high-level or low-level test design, test pyramid, and test plan work covering product discovery, cart, checkout, orders, and order verification."
argument-hint: "Describe the requested testing scope, available access, and any constraints."
---

# Ecommerce Test Architecture

Develop a coherent, reviewable testing document set for the ecommerce application at `https://rahulshettyacademy.com/client/#/auth/login`. Treat the application as a Flipkart-like storefront. The primary business journey is:

`sign in -> discover/select products -> add to cart -> review/update cart -> place order -> verify the resulting order`

The deliverables must be useful to product, engineering, QA, and release stakeholders. Be evidence-led: do not invent application behavior, APIs, architecture, business rules, or test data. Mark unknowns as assumptions or open questions and give each a validation owner or next action when feasible.

## When to Use

- Create a complete testing strategy for this ecommerce application.
- Produce or update requirements, test scenarios, test cases, test designs, test pyramid, or test plan documents.
- Review coverage and traceability across the ecommerce purchase and order lifecycle.
- Adapt the testing approach to a changed feature, release, environment, or risk profile.

## Operating Principles

1. Start from the requested scope and the user's evidence. Inspect available requirements, source, API contracts, environment notes, existing tests, and the site only as access permits.
2. Treat the supplied login URL and Flipkart-like description as context, not proof of detailed behavior. Do not bypass authentication, defeat controls, or use real payment or personal data. Ask for authorized test credentials only through an appropriate secure channel; never request or record secrets in generated documents.
3. Separate confirmed facts, assumptions, dependencies, and unresolved questions. If live access is unavailable, proceed with a clearly labeled baseline and include a discovery checklist rather than claiming observations.
4. Design from business risk and user impact. Prioritize authentication/session handling, product selection, price/stock consistency, cart integrity, checkout/order creation, duplicate submission, and order confirmation/history.
5. Keep the artifacts consistent and traceable. Use stable IDs and link each requirement to scenarios, cases, test layers, and risks.
6. Prefer deterministic, isolated automated checks at lower layers. Reserve browser end-to-end coverage for critical customer journeys and cross-system behavior that cannot be proven more cheaply below the UI.
7. Write actionable expected results, measurable exit criteria, and explicit test data/environment needs. Avoid vague outcomes such as "works correctly" or arbitrary coverage percentages presented as universal standards.

## Workflow

### 1. Establish scope and evidence

- Identify the feature/release boundary, supported browsers/devices, environments, dependencies, roles, and available artifacts.
- Explore the application only when permitted and accessible. Record the date, environment, and limits of any observations; do not infer hidden backend behavior from the UI.
- Map the end-to-end journey and its alternate, negative, and recovery paths: unauthenticated access, invalid credentials, empty results, unavailable/out-of-stock items, quantity changes, cart persistence, invalid checkout input, canceled/failed submission, successful order placement, and order lookup. Include only behaviors supported by evidence or label them as validation questions.
- Capture business-critical rules and quality attributes that affect the release: authorization/privacy, accessibility, performance, reliability, compatibility, observability, and data integrity as applicable.
- State scope, out-of-scope items, assumptions, constraints, dependencies, and open questions before detailed design.

### 2. Create the documentation set

Save design artifacts in `docs/testing/` unless the user specifies another location. Analyze requirements and change impact before deriving scenarios. Create or update the artifacts relevant to the request:

1. `requirements.md`
2. `impact-analysis.md` when change scope, dependencies, or regression selection need recording
3. `test scenarios.md`
4. `test cases.md`
5. `high-level-design.md`
6. `low-level-design.md`
7. `test-pyramid.md`
8. `test-plan.md`
9. `test-repository.md` when a shared inventory/repository strategy is in scope
10. `automation-strategy.md` when automation candidates and ownership/cadence are in scope
11. `test-data-environment.md` when data or environment readiness requires a standalone record

Use consistent headings, concise tables where they improve scanning, and stable IDs. Keep each document focused on its purpose; do not duplicate entire sections across files. Link related documents with relative Markdown links. Test reports, execution records, defect records, and release decisions must be based on actual execution evidence and should not be fabricated during design-only work.

### 3. Requirements (`requirements.md`)

- Define a brief product/system scope and terminology.
- Convert evidence into uniquely identified, testable functional and non-functional requirements. Suggested prefixes: `FR-` for functional and `NFR-` for quality attributes.
- Cover the relevant journey from authentication through order verification, including authorization, product/catalog behavior, cart calculations and updates, checkout/order creation, and order visibility.
- For each requirement include: ID, statement, rationale/business value, priority or risk, acceptance criteria, source/evidence, and status (confirmed, assumption, or open).
- Record dependencies, exclusions, and unresolved decisions. Avoid treating a test idea or implementation choice as a product requirement.

### 4. Test scenarios (`test scenarios.md`)

- Describe logical conditions and user/business flows, not step-by-step scripts.
- Give each scenario a stable ID (`TS-`), linked requirement IDs, objective, preconditions, flow/variants, expected outcome, risk/priority, and likely test level.
- Include positive, negative, boundary, state-transition, recovery, and relevant cross-cutting scenarios. Ensure the core purchase-to-order verification journey is represented end to end, alongside focused component behaviors.
- Include scenarios for duplicate/retried actions, stale or changed product/cart data, session expiration, and order status/history where requirements or assumptions warrant investigation.

### 5. Test cases (`test cases.md`)

- Derive cases from scenarios and requirements; use stable IDs (`TC-`) and preserve trace links.
- Each case must have a concise title, priority, test level/type, preconditions, controlled test data, numbered action steps, specific expected results per important step, cleanup/reset needs, and automation suitability.
- Cover positive, negative, boundary, validation, authorization, state, and failure/retry paths at the appropriate layer.
- Make assertions observable: displayed product/price/quantity, cart totals, submission result, order identifier/status, and persisted order visibility only where supported by the product contract.
- Keep cases independent where practical. Do not place real credentials, payment details, or personal data in the document.

### 6. High-level design (`high-level-design.md`)

- Describe the test architecture, quality goals, major test levels, and boundaries between browser UI, service/API, data/persistence, and external dependencies.
- Show the purchase journey and major validation points. A Mermaid diagram is appropriate when it clarifies flow or ownership.
- Define the environments, test data strategy, dependency isolation/stubbing approach, execution pipeline, reporting, and defect feedback at a conceptual level.
- Label all architecture inferred without code/contracts as a proposed model, not a description of confirmed implementation.

### 7. Low-level design (`low-level-design.md`)

- Translate the high-level approach into concrete test components and contracts: fixtures, page/service clients if applicable, data builders, API helpers, mocks, assertions, cleanup, and test ownership.
- Specify representative case flows and boundary/error handling for login/session, catalog/product selection, cart, order submission, and order verification.
- Describe deterministic data setup, unique test identities/orders, state reset, idempotency/retry checks, and safe handling of external services.
- Keep implementation choices conditional on the actual stack. Do not invent endpoint paths, selectors, schemas, or source module names; mark them for discovery until verified.

### 8. Test pyramid (`test-pyramid.md`)

- Explain what belongs at unit/component, service/API/integration, and browser end-to-end levels for this application, with examples mapped to requirement/scenario IDs.
- Put business rules and edge cases at the lowest reliable layer; use integration tests for contracts and persistence; use a small, high-value set of UI journeys for critical customer outcomes.
- Include contract, accessibility, compatibility, performance, and security checks in the layer or pipeline where they are most effective, noting specialist tooling/dependencies.
- Recommend a portfolio based on risk, runtime, and diagnostic value. Do not prescribe an unexplained fixed percentage or imply that a pyramid shape alone proves quality.
- State what each layer cannot prove and how cross-layer gaps are covered.

### 9. Test plan (`test-plan.md`)

- Define objectives, scope/out-of-scope, approach, roles/ownership, environments, supported configurations, test data, tools/dependencies, and schedule/release checkpoints.
- Include test types and execution order, entry/exit criteria, smoke/regression strategy, defect severity/triage expectations, reporting/metrics, risks with mitigations, and contingency plans.
- Make release criteria measurable and agreed with stakeholders; include unresolved product decisions as blockers or explicit accepted risks rather than silently assuming them away.
- Cover accessibility, security/privacy, performance, and compatibility in proportion to release risk and available evidence. Identify specialist review or testing needed where the team cannot perform it.

### 10. Repository, automation, and execution readiness
- Define the test repository's source of truth, metadata, stable IDs, ownership, review, lifecycle, evidence links, and validation checks when repository governance is requested.
- Map every in-scope case to an automation disposition and rationale. Distinguish candidate, implemented, executed, and passing automation; retain manual/hybrid work for exploratory, visual, usability, and specialist judgment.
- Define synthetic data, environment authorization, isolation, dependency controls, setup/reset/cleanup, evidence access, and side-effect safeguards before execution.
- During execution, record build, sprint/release, environment/configuration, case result, evidence, defects, and cleanup. Report actual counts and traceability gaps; preserve failed attempts and reruns.
- Verify defects from original reproducible steps on the fixed build, run focused regression, and align defect status/evidence with the test report. Assess release readiness only against approved exit criteria and the authorized decision owner.

### 11. Cross-document traceability and review

- Include a compact traceability matrix in `test-plan.md` or `requirements.md`: requirement -> scenario -> case -> test layer. Identify requirements with no coverage and tests with no requirement/risk rationale.
- Check that IDs and links resolve, priorities align with risk, acceptance criteria are testable, and the core journey has both focused lower-layer checks and a critical end-to-end check.
- Check that each test is feasible with stated access, environment, and data; identify nondeterministic dependencies and cleanup risks.
- Review consistency of terminology, assumptions, scope, trace links, and release gates across all selected artifacts.
- Report what was created, what evidence informed it, key assumptions/open questions, and any coverage gaps. Do not claim execution or validation of tests unless actually performed.

## Completion Criteria

The requested work is complete when each in-scope phase has an artifact or an explicit reason to be omitted; the core product-to-cart-to-order-to-order-verification flow is covered; requirements, impact, scenarios, cases, layers, automation, and evidence are traceable as applicable; high- and low-level designs agree with the test pyramid; the plan defines actionable entry/exit and release criteria; and unknowns are clearly distinguished from confirmed behavior. Execution reports and release decisions require real run evidence and the authorized decision-maker.
*** End Patch