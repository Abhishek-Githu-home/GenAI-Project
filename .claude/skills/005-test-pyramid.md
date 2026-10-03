---
name: test-pyramid
description: Design or review a risk-based ecommerce test portfolio across unit, integration/API, UI, and end-to-end levels, with clear suite boundaries and coverage rationale.
argument-hint: Describe the product scope, known architecture/contracts, current tests, risks, and CI or release constraints.
---

# Ecommerce Test Pyramid

## Purpose

Recommend a balanced, diagnosable test portfolio for the ecommerce journey, grounded in confirmed requirements, code/contracts, risks, runtime, and environment capabilities. Treat the pyramid as a decision aid, not a target shape or universal percentage rule.

## Operating Rules

- Start with the approved requirements and scenario IDs; distinguish verified architecture from a proposed model.
- Put the greatest breadth of deterministic business-rule checks at the lowest reliable layer. Add tests at higher layers only for risks those lower checks cannot prove.
- Keep tests isolated, repeatable, observable, and safe. Control external dependencies and order/payment side effects.
- API tests are a test interface/category and can be integration-level; smoke and regression are cross-layer suites, not extra pyramid tiers.
- Do not invent endpoints, schemas, frameworks, tools, test counts, performance thresholds, or target percentages. Mark unknowns and discovery steps.

## Layer Allocation

| Layer | Ecommerce focus | Cannot prove by itself |
|---|---|---|
| Unit/component | Cart arithmetic and rounding per approved rules, input validation decisions, state transitions, formatting rules with business impact, isolated UI component behavior. | Service wiring, persisted data, real browser behavior, or the full user outcome. |
| Integration/API/contract | Authentication/authorization contracts, cart/order persistence and consistency, documented validation/errors, retry/idempotency, interactions between components, controlled dependency failures. | Complete usability, browser rendering/accessibility, or every production integration unless exercised. |
| UI | User-visible product/cart/order details, interaction and validation feedback, keyboard/focus behavior, responsive behavior, and supported browser-specific risks. | All backend states, broad input combinations, or a complete external dependency chain. |
| End-to-end | A small set of critical customer outcomes, especially authorized sign-in through controlled order creation and verification; selected high-risk cross-system failure paths where safe. | Fast diagnosis, exhaustive edge coverage, or reliability when data/environment/side effects are uncontrolled. |

## Design Workflow

1. Map each critical requirement/scenario to the cheapest layer that can provide trustworthy evidence.
2. Add complementary higher-layer checks only where the risk crosses a boundary or is user-visible and cannot be adequately proven below.
3. Select smoke checks for fast, high-signal deployment confidence. Select regression checks by changed code/contracts, dependency impact, prior defects, and business risk. These suites may contain multiple layers.
4. Place accessibility, security/privacy, compatibility, performance, reliability, and resilience checks at suitable layers with specialist ownership and explicit scope/authorization where needed.
5. Identify deterministic setup, test doubles/sandboxes, synthetic data, unique order identifiers, reset/cleanup, and parallel isolation needs.
6. Report what each layer proves and does not prove, traceability gaps, flaky or expensive tests, and the evidence needed to adjust the portfolio.

## Ecommerce Portfolio Review

Check that authentication and access boundaries, product selection, cart integrity, checkout/order creation, and order verification have risk-appropriate coverage. Critical business rules should have focused low-level tests; contracts and persistence should have integration evidence; the customer outcome should have a controlled end-to-end check where feasible. If a safe environment or contract is missing, document the gap and owner rather than simulating confidence.

## Deliverable

Produce or update `test-pyramid.md` with objectives, layer responsibilities and examples linked to requirement/scenario IDs, suite selection, automation and data strategy, CI/release placement, constraints, known gaps, and review triggers. Avoid arbitrary percentages; justify portfolio balance by risk, runtime, feedback quality, and system evidence. Never claim tests ran unless execution evidence exists.
