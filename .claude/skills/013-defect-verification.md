---
name: defect-verification
description: Triage, reproduce, document, verify, and close ecommerce defects end to end, including non-reproducible reports and behavior that is not a product defect.
argument-hint: Describe the observed issue and provide available build, sprint, environment, steps, expected/actual results, evidence, and linked requirement or case.
---

# Ecommerce Defect Verification

## Purpose

Manage the defect lifecycle from first observation through reproducibility, triage, fix verification, regression, and closure. Produce actionable, evidence-backed records that align with test execution reports and approved team workflow. Severity describes impact; priority describes fix order. Do not infer a team's severity policy or claim compliance with a named organizational standard whose template/rules were not provided.

## Lifecycle

1. **Capture:** Preserve the original observation, timestamp, build, sprint/release, environment, data identifiers, and evidence before changing state or retrying.
2. **Reproduce:** Follow controlled steps in an authorized environment. Record frequency, configuration, preconditions, and differences between attempts. Use synthetic accounts/data; never include credentials or sensitive customer information.
3. **Triage:** Compare actual behavior with approved acceptance criteria, requirement, design, and supported configuration. Classify as product defect, test/automation defect, environment/data issue, duplicate, expected behavior, or needs information. Assign impact/severity, priority, owner, and target/release decision per team policy.
4. **Investigate and fix:** Keep diagnosis, linked change/build, and verification scope connected to the original report. Do not edit away the initial evidence.
5. **Verify:** Re-run the exact reproducible steps on the fixed build; confirm expected behavior and absence of the original failure. Execute focused regression for adjacent risk, permissions, and unintended side effects.
6. **Close or reopen:** Close only with passing verification evidence and required approvals. Reopen if the issue persists, recurs, or regression reveals the same defect; link the new build/run and evidence.

Suggested states are `New -> Triaged -> Accepted/Rejected/Needs Info -> In Progress -> Fixed/Ready for QA -> Verified/Closed`, with `Reopened` returning to triage. Map these to the actual tracking system; do not create duplicate parallel state definitions.

## Required Defect Record

Include the following, using `Unknown` plus an owner/action when unavailable:

- Defect ID, concise title, reporter, date/time/time zone, status, assignee, and linked test run/case/scenario/requirement IDs.
- Product/application, build name/version/deployment identifier, sprint/release, environment, browser/device/OS, and relevant configuration.
- Preconditions, synthetic account/role and data identifiers, and frequency/reproducibility (for example, `3/5 attempts`).
- Numbered, minimal, repeatable steps from a clean or stated starting state.
- Expected result tied to an approved requirement/acceptance criterion and actual observed result; include impact and affected users/data/transactions.
- Evidence links: screenshot/video, relevant logs or trace/correlation ID, and timestamps. Redact secrets, cookies/tokens, payment details, and personal data.
- Severity, priority, rationale, workaround, scope/risk, owner, fix version/build, verification result, regression performed, and closure/reopen reason.

Do not use vague titles such as "login broken" or expected results such as "should work". Make the report useful to another engineer without access to the original tester.

## Login Issue Example Template

Use placeholders until actual evidence is provided; do not assert that this behavior exists:

| Field | Example content |
|---|---|
| Title | `[Auth] Valid test account is rejected on <build>` |
| Build / sprint | `<application build or deployment ID>` / `<sprint or release>` |
| Environment / configuration | `<authorized QA environment>`; `<browser/version, OS, role>` |
| Preconditions / data | `<synthetic test account identifier; account state>`; no password/token in report |
| Steps | 1. Open the approved login page. 2. Enter the authorized synthetic account credentials. 3. Submit once. 4. Record the resulting UI and safe diagnostic identifiers. |
| Expected | `<approved login acceptance criterion, such as authenticated landing state>` |
| Actual | `<precise observed message/state; include timestamp and whether session was created>` |
| Frequency | `<n failures>/<m attempts>; conditions and any successful comparison>` |
| Evidence | `<redacted screenshot/trace/log links and correlation ID>` |
| Impact / severity / priority | `<affected user flow and impact>` / `<team scale>` / `<triage decision>` |
| Trace / follow-up | `<requirement, TS, TC, run ID>`; `<owner, next action, target build>` |

Do not include real credentials, session tokens, or another user's data in screenshots, logs, or examples.

## Non-Bug and Cannot-Reproduce Handling

When an issue is not a product defect, do not silently discard it. Record the observed symptom and evidence, then provide a reasoned disposition:

- **Expected behavior:** Link the relevant approved requirement/design and explain the mismatch in expectation; request requirement clarification if the source is ambiguous.
- **Environment/data/configuration:** Record the failing condition, evidence, owner, corrective action, and whether a product retest is needed.
- **Test/automation issue:** Preserve the product behavior evidence, identify the faulty test assumption/locator/setup, and link the test correction.
- **Duplicate:** Link the canonical defect and compare affected builds/configurations; keep any unique impact documented.
- **Cannot reproduce/intermittent:** List exact attempts, dates, build/configuration, frequency, data state, and diagnostics. Ask for the smallest missing detail, add logging/monitoring or a targeted observation plan, and leave status as needs information/open per team policy rather than declaring fixed.

If new evidence contradicts the disposition, reassess and reopen. Never blame a user or close solely because one rerun passes.

## Verification and Report Alignment

A defect is verified only when the original steps pass on the identified fixed build and evidence is linked to that execution. Record related regression, remaining risk, and any cleanup/reconciliation. Keep defect counts and statuses consistent with the test report; distinguish new failures, retest results, reopened issues, accepted risks, and rejected/non-bug reports. Follow the organization's tracker fields and severity policy when supplied. If a requested standard or template (including "zeroar isotopes") is not available or its meaning is unclear, flag that exact requirement for clarification and use this complete baseline without claiming conformance.
