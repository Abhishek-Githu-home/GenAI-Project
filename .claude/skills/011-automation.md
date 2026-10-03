---
name: test-automation-strategy
description: Derive an evidence-based automation strategy and case-by-case automation inventory across unit, integration, API, UI, end-to-end, and quality checks.
argument-hint: Provide requirements/scenarios/cases, current test code and framework configuration, CI constraints, environments, and data controls.
---

# Test Automation Strategy

## Objective

Decide which test conditions should be automated, at what layer, when they run, how they are maintained, and what remains manual, hybrid, or deferred. Derive candidates from approved requirements and cases, not from a desire to automate everything. An automation candidate is not implemented or passing until code and run evidence exist.

## Discovery Before Design

Inspect the actual repository, supported runtime, installed dependencies, scripts, test config, CI workflows, existing helpers/fixtures, test ownership, observability, and safe environments. A package dependency does not prove a working framework or test command. Reuse the established stack and conventions; do not invent endpoints, selectors, contracts, or data hooks.

## Candidate Selection

For every case, score or describe:

- Risk/customer impact and frequency of execution.
- Repeatability, deterministic setup, observable assertions, and data/environment isolation.
- Layer at which the behavior is cheapest and most trustworthy to prove.
- Maintenance cost, flakiness risk, diagnostic value, runtime, and parallel safety.
- Side effects, security/privacy constraints, setup and teardown reliability.
- Human judgment or specialist expertise required.

Assign `Automate`, `Manual`, `Hybrid`, or `Deferred`. For manual/hybrid/deferred items, state why, owner, evidence expectation, and revisit trigger. Avoid opaque scoring and do not use time pressure as a permanent rationale.

## What to Automate

| Candidate category | Good automation targets | Constraints / complementary review |
|---|---|---|
| Unit/component | Deterministic calculations, validation decisions, business-rule boundaries, state transitions, pure transformations, isolated components. | Confirm rules and source availability; do not test implementation details that do not express a contract. |
| Integration | Component/service collaboration, persistence, transaction behavior, event/message flow, dependency error mapping, controlled failure paths. | Use isolated dependencies/test doubles where appropriate; verify contracts and cleanup. |
| API/contract | Documented request/response schemas, auth/authorization, validation, error codes/semantics, idempotency, pagination/filtering, compatibility, data consistency. | Use approved interfaces, synthetic data, test credentials from secret management, and safe non-production targets. API can be an integration layer. |
| UI/component | User-visible validation, navigation, cart/order rendering, accessible names/keyboard mechanics, responsive behavior, browser-specific risks. | Prefer accessible user-facing locators; keep checks robust and assert outcomes, not styling internals. Human accessibility and usability review still matters. |
| End-to-end | Small number of critical customer journeys and high-value cross-system outcomes that cannot be proven below. | Only with authorization, stable environment, isolated data, controlled side effects and cleanup; avoid broad permutations at this layer. |
| Smoke/regression | Fast post-deploy health/readiness; risk/change-selected regression across layers; critical prior-defect checks. | These are suites, not layers. Set selection/cadence from change impact and release needs. |
| Accessibility | Repeatable automated rule scans, semantic/keyboard checks, regression of known accessibility defects. | Automated scans cannot prove full WCAG conformance, screen-reader usability, or human experience; include manual assistive-technology review. |
| Security/privacy | SAST, dependency/secrets scans, approved DAST/API security checks, authorization regression, safe data-exposure assertions. | Obtain explicit scope/authorization for active testing; specialist review and threat modeling remain necessary. |
| Performance/reliability | Repeatable load/smoke baselines, latency/error budgets, controlled timeout/retry/fault scenarios. | Define targets and isolated environment first; no public/production load or fault injection without explicit approval. |
| Compatibility/visual | Supported browser/device critical flows, stable visual baselines where meaningful, responsive breakpoints. | Control fonts, viewport, data, and rendering; visual diffs require review and do not replace functional checks. |
| Data/migration/operations | Migration invariants, seed/reset, backup/restore, deployment health and observability assertions. | Use disposable/synthetic data and approved operational controls; production mutation must be explicitly authorized. |

## Automation Architecture and Lifecycle

- Keep business logic and edge breadth at lower layers; use a small diagnostic UI/E2E portfolio.
- Define deterministic fixtures, builders, unique run IDs, isolated users/cart/orders, cleanup/failure recovery, and parallel execution safety.
- Use stable user-facing selectors and accessible semantics for browser checks; avoid arbitrary sleeps and shared mutable state.
- Make failures diagnosable with clear assertions, logs/traces/screenshots as appropriate, build/run metadata, and secret redaction.
- Run fast relevant checks on pull requests; broaden to integration/regression by change impact; run controlled smoke on deployment/candidate builds; schedule expensive specialist suites according to risk.
- Track flaky tests as defects with owner, cause, containment, expiry/review date, and impact on release gates. Do not silently retry until green or quarantine critical coverage without approval.
- Review automation value, runtime, stability, and coverage after changes and escaped defects. Retire obsolete tests through traceable review.

## Automation Matrix and Output

Produce `automation-strategy.md` or update the test inventory with: case ID/title, requirement/scenario links, layer, automation disposition, rationale/value, framework/component only when verified, data/environment prerequisites, suite and cadence, owner, status (`candidate`, `implemented`, `active`, `quarantined`, `retired`), evidence/run link, and revisit trigger.

Map every in-scope case to a disposition. Do not imply every possible combination is automatable. Identify manual exploratory, visual, usability, security specialist, accessibility, and release checks that need human judgment. Never report automated coverage or pass status without code and run evidence.
