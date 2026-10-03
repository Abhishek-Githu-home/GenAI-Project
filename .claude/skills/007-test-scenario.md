---
name: test-scenario-design
description: Create, review, or update risk-based ecommerce test scenarios from approved requirements and evidence, preserving traceability into test cases and reports.
argument-hint: Describe the feature/release scope and provide relevant requirements, evidence, or existing test artifacts.
---

# Ecommerce Test Scenario Design

## Purpose

Create or refine `test scenarios.md` for the Rahul Shetty Academy ecommerce application. Scenarios express meaningful conditions and user/business flows; they are not step-by-step execution scripts. The working journey is:

`sign in -> discover/select products -> add to cart -> review/update cart -> place order -> verify the resulting order`

Treat the URL and storefront description as context, not evidence of detailed behavior. Do not invent requirements, UI behavior, APIs, data rules, or acceptance criteria.

## Workflow

1. Establish feature/release scope, approved requirements, source artifacts, environment limits, dependencies, and available evidence. If requirements or behavior are missing, mark them as assumptions/open questions and give a validation action rather than presenting them as facts.
2. Map each approved requirement to one or more independently understandable scenarios. Use stable IDs such as `TS-AUTH-001`, `TS-CART-001`, and `TS-ORDER-001`; preserve existing IDs when editing.
3. Cover applicable positive, negative, boundary, authorization, state-transition, retry/failure, and recovery conditions. Include a critical end-to-end journey only when it is authorized and its side effects can be controlled.
4. Assign risk/priority from customer impact and likelihood, and recommend a likely test layer. Do not confuse scenario scope with a final automation decision.
5. Review links to requirements, cases, test plan, and evidence. Identify uncovered approved requirements and scenarios without a requirement or explicit risk rationale.

## Required Scenario Record

For every scenario, include:

- Stable scenario ID and concise title.
- Linked requirement ID(s), or `TBD` with the discovery action.
- Objective and risk/priority with brief rationale.
- Preconditions, role/state, and controlled data needs.
- High-level flow and meaningful variants; keep detailed clicks and assertions in test cases.
- Expected business outcome stated observably, without unsupported implementation detail.
- Likely test layer(s): unit/component, integration/API, UI, or end-to-end.
- Assumption, dependency, environment restriction, or open question where relevant.

## Ecommerce Scenario Guidance

Consider authentication/session boundaries; intended product selection; cart add/remove/update and quantity/total consistency; checkout validation and duplicate/retry behavior; order creation and verification; and access isolation. Add scenarios for catalog search/filter, stock, payment, shipping, promotions, or order-state transitions only when supported by approved scope or explicitly labeled for discovery.

For an observed login issue, first distinguish the user-visible scenario from the test case: scenario objective might be successful or safely rejected authentication under a defined condition; detailed credentials/data setup and reproducible actions belong in the case or defect record. Never put secrets or real personal/payment data into artifacts.

## Output and Quality Gate

Use concise tables where they improve scanning. Link related documents with relative Markdown links and keep terminology consistent with the architecture, case, and plan artifacts. Before completion, verify ID uniqueness, requirement coverage, risk alignment, layer plausibility, and assumption labels. Report what is evidence-backed, what remains open, and which requirements have no scenario coverage. Never claim a scenario was executed merely because it was designed.
