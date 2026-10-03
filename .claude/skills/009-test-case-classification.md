---
name: test-case-segregation
description: Classify and organize ecommerce test cases by test layer, purpose, risk, execution suite, and automation disposition without conflating these dimensions.
argument-hint: Provide the case inventory or requirements/scenarios to classify, plus any release or execution constraints.
---

# Ecommerce Test Case Segregation

## Purpose

Organize cases so teams can select the right checks for a code change, deployment, regression run, or release. Preserve traceability to `TC-`, `TS-`, and requirement IDs. Classification must explain why a case belongs in a layer or suite; labels alone are not coverage.

## Classify on Separate Axes

Assign each case values for the applicable axes. Do not treat these as mutually interchangeable:

| Axis | Values and intent |
|---|---|
| Test layer | Unit/component, integration, API/contract, UI, end-to-end. API describes an interface and may also be an integration test. |
| Suite membership | Pull request, smoke, regression, exploratory, release, specialist. A case can belong to multiple suites; smoke and regression are not pyramid layers. |
| Test purpose | Functional, negative, boundary, authorization/security, accessibility, performance, compatibility, resilience, data integrity, or exploratory as applicable. |
| Risk/priority | Project-agreed scale such as P0-P3, with impact/risk rationale. Do not silently invent the team's definitions. |
| Execution disposition | Automated, manual, hybrid, or deferred, with rationale, owner, and revisit trigger for non-automated cases. |

## Classification Workflow

1. Confirm the case's objective, linked requirement/scenario, setup, observable result, and side effects. If any are missing, flag the case for refinement rather than guessing.
2. Place deterministic business rules at the lowest reliable layer. Use integration/API checks for contracts, authorization, persistence, and component collaboration. Use UI checks for user-visible behavior and a small end-to-end set for critical integrated outcomes.
3. Select suite membership based on timing and risk: fast relevant checks for pull requests; high-signal readiness checks for smoke; change-impact and risk-based coverage for regression; human-led discovery for exploratory work; specialist checks for specialist risks.
4. Decide automation independently from layer and suite. Automate when repeatability, observability, data isolation, and maintenance cost are acceptable. Keep human judgment where needed; defer when access, contracts, environment, or safe cleanup are unavailable.
5. Check for gaps, duplicate cases, excessive UI/E2E duplication, missing negative/recovery paths, and cases without a requirement or risk rationale.

## Ecommerce Placement Heuristics

- Cart calculations, field rules, and deterministic state transitions: unit/component candidates, subject to confirmed rules and source availability.
- Documented service behavior, authorization, idempotency, and persisted cart/order consistency: API/integration candidates.
- Labels, validation feedback, keyboard behavior, and displayed cart/order details: UI candidates.
- Product-to-order confirmation and lookup: limited end-to-end candidate only in an authorized, isolated environment with controlled order side effects.
- Smoke and regression membership span layers. Prefer broad lower-layer checks and a small, high-value browser suite.

## Output Format

Return or update a classification matrix containing at least: case ID/title, requirement/scenario links, risk, layer, purpose/type, suite tags, automation disposition, execution cadence/selection rationale, data/setup/cleanup needs, and owner for gaps. Preserve case steps and expected results unless asked to revise them.

Do not prescribe universal layer percentages. Explain uncovered requirements, deferred/manual reasons, and residual risk. A case counts as covered only if its assertions test the linked requirement at an appropriate layer.
