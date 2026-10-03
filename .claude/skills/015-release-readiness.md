---
name: test-release-readiness
description: Assess release test evidence and residual risks against approved entry/exit criteria, operational readiness, defect status, and authorized decision ownership.
argument-hint: Provide candidate build, approved release criteria, execution report, open defects/risks, and decision stakeholders.
---

# Test Release Readiness

## Objective

Provide an evidence-based release quality assessment and recommendation. This skill supports, but does not replace, the designated release authority.

## Readiness Review

1. Confirm candidate product/build, deployment environment, release/sprint scope, test plan version, approved criteria, and decision owners.
2. Verify scope and traceability: requirements and risks map to scenarios/cases; planned suites/configurations ran or have explicit exclusions and accepted risks.
3. Review results for P0/critical cases, smoke, impact-based regression, integration, end-to-end, and agreed security, privacy, accessibility, performance, compatibility, resilience, and operational checks.
4. Review defects by severity/status, including unresolved, reopened, deferred, accepted, and cannot-reproduce items. Confirm fix verification and focused regression are on the candidate build.
5. Review blockers, flaky/quarantined coverage, environment/data cleanup, known limitations, monitoring/rollback, support, and contingency plans.
6. Compare each item directly with approved entry/exit criteria; record evidence links, owner, status, and decision. Do not invent thresholds or treat undocumented conventions as approval.
7. State recommendation and residual risks for the authorized decision-maker; record accepted risks, mitigation, approver, timestamp, and conditions.

## Recommendation States

- **Ready for decision:** Required evidence is available and criteria are met; the decision owner may approve or reject.
- **Conditional:** One or more agreed exceptions remain, each with impact, mitigation, owner, deadline, and explicit risk acceptance required.
- **Not ready:** A blocking criterion, critical defect, unsafe environment, or missing essential evidence prevents recommendation.
- **Not assessed:** Scope, criteria, or execution evidence is unavailable; state what is needed.

## Output

Update the test report or create `release-readiness.md` with candidate identity, criteria-by-criteria evidence, run/defect links, untested areas, residual risk, environment/cleanup status, recommendation, and approval record. Never claim a release was approved unless the authorized approver's decision is recorded.
