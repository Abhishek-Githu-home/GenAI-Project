---
name: test-reporting
description: Produce accurate test execution summaries, traceability and quality evidence, defect status, residual risks, and release-facing reports from actual runs.
argument-hint: Provide test run results, build/sprint/environment details, defect records, exit criteria, and reporting audience/template.
---

# Test Reporting

## Objective

Communicate test evidence and release risk clearly to engineering, product, QA, and release decision-makers. A report summarizes actual runs; it must not turn design artifacts into execution claims.

## Required Context

Identify product/feature/release, build/deployment ID, sprint, environment, execution window and timezone, report author/date, scope, plan/exit criteria version, supported configuration, data cleanup state, and known limitations. If a standard report template is supplied, follow it; do not claim compliance with an undefined organizational standard.

## Results and Traceability

Report planned, executed, passed, failed, blocked, skipped, and not-run counts with a defined denominator, by risk, test layer, and suite when useful. Keep retries/attempts visible and retain the first result. Distinguish requirement/scenario/case design coverage from automation implementation, execution coverage, and pass evidence. Link run artifacts, defect IDs, and evidence in access-controlled storage.

Include requirement-to-scenario-to-case coverage, uncovered/assumption/open requirements, changed-scope regression selection, untested configuration, and exclusions. Defect summaries should include ID, agreed severity/priority, status, affected build, age/owner when available, verification state, and release impact. Align counts to the source tracker and defect workflow.

## Interpretation

Explain trends and context. Pass rate, test count, code coverage, and automation percentage are signals, not a quality verdict. State flaky tests, reruns, environment/data failures, false positives, known limitations, escaped defects, and residual risk. Do not hide failures by reporting only the final retry.

## Release Recommendation

Compare evidence against the approved entry/exit criteria. State `recommend release`, `recommend with accepted risk`, or `do not recommend` only when evidence supports that conclusion; list conditions, decision owner, accepted risks, and follow-up actions. The assistant/test author does not assume release authority.

## Output

Create a concise `test-report.md` or the team's release report using actual run data. Provide an executive summary, scope/build/sprint/environment, result metrics and denominators, traceability/gaps, defects/blockers, evidence links, cleanup state, residual risks, and recommendation/approval. If the request is design-only or no results exist, create a report template or state that execution reporting is pending; never fabricate values.
