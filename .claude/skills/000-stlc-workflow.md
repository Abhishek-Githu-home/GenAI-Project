---
name: ecommerce-testing-workflow
description: Orchestrate the complete requirements-to-release testing lifecycle and select the relevant testing skills when given product requirements, a change, or a defect.
argument-hint: Provide the requirement/change, product and release context, available evidence, constraints, and desired deliverables.
---

# Ecommerce Testing Skill Index

Use this file as the entry point when a user provides requirements or asks for end-to-end testing work. Delegate each concern to its focused skill below; preserve a single traceability chain and do not duplicate entire artifacts.

## Lifecycle

1. **Requirement analysis:** Establish evidence-backed functional and quality requirements, acceptance criteria, assumptions, and open questions. See [requirements analysis](001-requirements-analysis.md).
2. **Impact analysis:** Map changed requirements to affected journeys, components, contracts, data, risks, and regression scope. See [impact analysis](002-impact-analysis.md).
3. **Test architecture:** Define test boundaries, quality strategy, ownership, isolation, observability, and proposed technical approach. See [test architecture](003-architecture.md).
4. **Test planning:** Set scope, roles, environments, schedule, entry/exit criteria, and release gates. See [test plan](004-test-plan.md).
5. **Test portfolio:** Allocate coverage across unit/component, integration/API, UI, end-to-end, and specialist checks. See [test pyramid](005-test-pyramid.md).
6. **Test repository:** Define the source of truth, test metadata, traceability, governance, and asset lifecycle. See [test repository](006-test-repository.md).
7. **Scenario design:** Turn requirements and risks into high-level, traceable scenarios. See [test scenarios](007-test-scenario.md).
8. **Case design:** Derive atomic, reproducible test cases from scenarios. See [test cases](008-test-case.md).
9. **Case classification:** Classify cases by layer, purpose, risk, suite, and execution disposition. See [case classification](009-test-case-classification.md).
10. **Data and environment readiness:** Define synthetic data, provisioning, isolation, reset/cleanup, dependencies, access, and environment gates. See [test data and environment](010-test-data-environment.md).
11. **Automation design:** Select automation candidates, layer, cadence, implementation status, and manual/hybrid/deferred work. See [automation strategy](011-automation.md).
12. **Test execution:** Run only authorized, prepared tests; record build/sprint/environment, status, actual result, evidence, and cleanup. See [test execution](012-test-execution.md).
13. **Defect verification:** Triage, reproduce, track, verify fixes, run focused regression, and close/reopen with linked evidence. See [defect verification](013-defect-verification.md).
14. **Test reporting:** Summarize actual run evidence, coverage gaps, defects, and residual risks. See [test reporting](014-test-reporting.md).
15. **Release readiness:** Compare evidence with approved exit criteria and record the authorized decision. See [release readiness](015-release-readiness.md).

These phases are iterative, not a one-way waterfall. Revisit requirements, impact, scenarios, cases, architecture, and plan when execution or defect evidence changes understanding.

## Standard Traceability

Maintain the applicable chain:

`source/evidence -> requirement -> impact/risk -> scenario -> case -> layer/suite/automation -> run/evidence -> defect/fix verification -> release decision`

Use stable IDs, preserve existing IDs, and use the actual project/TMS identifiers when available. Every reported gap needs a reason, owner, and next action or accepted-risk decision. Separate **designed**, **automated**, **executed**, and **passed**; never present one as another.

## Default Deliverables for a Requirement

Create or update only what is needed for the request, normally in `docs/testing/` unless the user specifies otherwise:

- `requirements.md`
- `impact-analysis.md` when requirements are changed or scope/risk needs assessment
- `test scenarios.md`
- `test cases.md`
- `high-level-design.md` and `low-level-design.md` when architecture detail is in scope
- `test-pyramid.md`
- `test-plan.md`
- `test-repository.md` and `automation-strategy.md` when the team needs a maintained inventory/automation approach

Execution reports and defect records require actual run evidence. Do not fabricate them during design-only work. Link existing documents rather than creating duplicate sources of truth.

## Guardrails

- Start from the user-provided requirement and inspect nearby artifacts, source, contracts, tests, and project configuration as available. State the evidence boundary.
- Do not infer unverified product behavior, system architecture, APIs, selectors, test data, supported configurations, or organizational standards.
- Ask only for facts that block safe or meaningful work. Continue with explicit assumptions and validation actions when possible.
- Use synthetic data, authorized environments, secure secret handling, and explicit side-effect controls. Do not perform production mutations or intrusive testing without authorization.
- Make expected results observable and release criteria measurable and agreed. Do not prescribe universal coverage percentages or equate pass rate, code coverage, or pyramid shape with quality.
- Report assumptions, open questions, exclusions, traceability gaps, unrun work, and risks clearly. The release decision belongs to its authorized owner.
