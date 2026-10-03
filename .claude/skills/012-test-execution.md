---
name: test-execution
description: Prepare, execute, record, and report authorized ecommerce testing with reproducible results, build and sprint context, traceability, evidence, and defect links.
argument-hint: Provide the approved test scope, build/release identifier, sprint, environment, cases, access constraints, and reporting destination.
---

# Ecommerce Test Execution

## Purpose

Turn approved test cases into controlled, traceable execution evidence and a truthful test report. Never imply that tests ran when only a plan or case design exists. The supplied ecommerce URL is not proof that an environment is authorized or safe for mutations.

## Pre-Execution Checks

1. Confirm release/sprint scope, approved cases, acceptance criteria, environment authorization, build/deployment identifier, test window, roles, supported configurations, and escalation contacts.
2. Confirm the environment is appropriate, available, and isolated. Verify synthetic test data, account provisioning, external dependency controls, and cleanup/reconciliation for any created cart/order. Stop before side-effecting tests if safety or authorization is unclear.
3. Inspect the repository's actual runner, scripts, configuration, and test inventory before selecting commands. A declared dependency alone does not confirm an executable suite. Do not invent commands or claim Playwright execution without verification.
4. Select tests by planned suite and change/risk impact. Record exclusions, blocked prerequisites, and expected duration before running.
5. Capture a baseline environment/build identity and establish an evidence location with access and retention controls.

## Execution Record

For each case, record:

- Run ID, test case ID/title, requirement and scenario links, suite, layer, and priority.
- Product/build name or version, sprint/release, environment, date/time/time zone, browser/device/configuration when applicable, and executor or CI job.
- Preconditions and synthetic data identifiers; never record passwords, tokens, payment credentials, or real personal data.
- Actual steps/results, pass/fail/blocked/skipped/not-run status, expected versus actual outcome, and evidence links.
- Defect ID for failures, or a concise blocker/exclusion reason and owner.
- Cleanup/reconciliation result for created or modified data.

Use `Pass` only when all required assertions passed; `Fail` when observed behavior violates an approved expected result; `Blocked` when execution cannot proceed due to a prerequisite/environment issue; `Skipped` when deliberately excluded with rationale; `Not Run` when no attempt occurred. Do not downgrade a failure to pass because a defect was filed.

## Evidence Handling

Capture only evidence needed to reproduce and diagnose: screenshots/video where useful, logs, test traces, relevant redacted request/response metadata, timestamps, and correlation identifiers. Redact secrets, session cookies, personal/payment data, and unrelated user data. Preserve original evidence and link it from the report/defect record; do not paste secrets into markdown or source control.

## Failure and Rerun Rules

- Stop and assess immediately for suspected security/privacy exposure, unintended real transaction, cross-user data exposure, or uncontrolled side effect; notify the designated owner through the approved channel.
- For an ordinary failure, record the first result and evidence before any rerun. Rerun only to establish reproducibility, validate a fix, or follow a documented flaky-test policy; retain each attempt and do not overwrite the original failure.
- Link failures to a defect or explicitly classify them as an environment/test issue with evidence. Keep product defect, automation defect, data issue, and infrastructure failure distinct.
- After a fix, verify on the identified fixed build, run the failed case, perform focused related regression, and update the report with attempt/build linkage.

## Test Report

Produce a concise report with:

1. Product/release, build, sprint, environment, execution window, scope, and report timestamp.
2. Overall result counts by status, layer, suite, and risk, with denominator and exclusions stated.
3. Requirement/scenario traceability and coverage gaps; distinguish designed, executed, and passed coverage.
4. Defects by ID/severity/status, blockers, skipped/not-run cases, flaky attempts, and residual risks/decisions.
5. Evidence and run links, environment/data cleanup state, and release recommendation against agreed exit criteria.

Use only observed execution data. Do not equate pass rate or coverage percentage with product quality, or recommend release without applying the approved exit criteria and authorized decision owner. Align report fields with the defect workflow in `013-defect-verification.md` and the project's agreed reporting template; if an organization-specific standard (including one named by the user) is not defined in the workspace, record it as an unresolved format requirement rather than claiming compliance.
