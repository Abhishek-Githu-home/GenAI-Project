---
name: requirements-analysis
description: Analyze product requirements and evidence into clear, testable functional and quality requirements with acceptance criteria, traceability, risks, and open questions.
argument-hint: Provide product requirements, user stories, designs, contracts, policies, or a description of the requested change.
---

# Requirements Analysis for Testing

## Objective

Establish what the product must do and how well it must do it before deriving tests. Do not turn guesses, test ideas, or proposed implementation into confirmed requirements.

## Analysis Steps

1. Identify product, feature/release boundary, stakeholders, user roles, system boundaries, source documents, and decision authority.
2. Extract functional outcomes and business rules, including preconditions, state transitions, permissions, error behavior, recovery, and side effects.
3. Identify quality requirements: security/privacy, accessibility, performance, reliability/recovery, compatibility, data integrity, observability, localization, and usability as relevant. Require agreed measurable targets where a pass/fail decision depends on them.
4. Identify interfaces, dependencies, data classification/retention, deployment/environment assumptions, rollout/migration, backward compatibility, and operational constraints.
5. Convert each item into a uniquely identified, atomic, testable requirement. Use project ID conventions; absent a convention, suggest `FR-` and `NFR-` identifiers.
6. Write observable acceptance criteria with valid, invalid, boundary, authorization, state, failure, and recovery conditions as appropriate. Use Given/When/Then or concise examples when useful; keep criteria independent of implementation details.
7. Record source/evidence, owner, priority/risk, status (`confirmed`, `assumption`, `open`, `deferred`, or `rejected`), and validation action for every uncertain item.
8. Review for ambiguity, conflict, duplicate intent, missing actors/states, untestable wording, and unbounded scope. Resolve conflicts with the accountable stakeholder or preserve them as open decisions.

## Requirement Record

Include ID, statement, rationale/value, actor or affected system, priority/risk and basis, acceptance criteria, source/version/date, dependencies, status/confidence, owner, and linked scenarios/tests once designed. Keep requirements separate from design choices and test procedures.

## Ecommerce Considerations

For relevant shopping workflows, analyze authentication/session and access isolation; product identity/price/availability; cart mutations and calculations; checkout validation and submission semantics; order confirmation, persistence, lookup, and status; retries/duplicate requests; and cross-user/data consistency. Treat search, inventory policy, promotions, shipping, payment, returns, and external integrations as open unless supported by evidence.

## Output and Gate

Create or update `requirements.md` with scope, terminology, source/evidence, requirement table, assumptions, dependencies, exclusions, and open questions. Readiness requires agreed criteria for critical behavior or visible blockers/accepted risks with owners. Report what is confirmed versus inferred; do not claim completeness while material requirements remain unresolved.
