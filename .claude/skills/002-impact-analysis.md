---
name: test-impact-analysis
description: Assess the testing impact of a product, requirement, code, API, data, infrastructure, or configuration change and produce a risk-based regression scope.
argument-hint: Describe the change and provide linked requirements, design/source changes, dependencies, prior defects, and target release/build.
---

# Test Impact Analysis

## Objective

Determine what may be affected by a change, which evidence and tests are needed, and what should be rerun. Impact analysis selects tests; it does not replace requirement analysis, exploratory discovery, or execution.

## Workflow

1. Record change ID, scope, rationale, source/version, target build/release/sprint, known implementation files/services/contracts/data/configuration, and change owner.
2. Map changed requirements to user journeys, roles, business rules, interfaces, components, data stores, external dependencies, quality attributes, and operational behavior. Distinguish confirmed dependency edges from inferred ones.
3. Review linked scenarios, cases, automation, previous defects/escapes, changed code/contracts/schema/configuration, and observability. Identify direct impact, indirect/blast-radius risk, compatibility and migration concerns, and untouched-but-related areas.
4. Assess severity of failure, likelihood/exposure, detectability, change complexity, and uncertainty using the team's agreed model. State rationale and evidence, not just a score.
5. Select tests by requirement and risk: focused unit/component and contract checks, impacted integration/API checks, relevant UI journeys, regression around prior defects, and a small end-to-end check where cross-system outcomes matter. Include non-functional/specialist checks when affected.
6. Define a run matrix: test/case ID, reason selected, layer/configuration, suite, priority, prerequisites, data/environment, owner, and whether it is mandatory, conditional, or deferred.
7. Identify tests not selected and why, residual risk, missing coverage, safe execution limits, required reviewers, and decisions needed before release.
8. Update trace links and feed new findings back to requirements, scenarios, test cases, test plan, repository metadata, and automation selection.

## Coverage Rules

- A narrow code diff does not prove a narrow behavioral impact; trace shared interfaces, data, permissions, and downstream consumers.
- Test changed behavior and adjacent invariants, not every suite indiscriminately.
- Prior incidents/defects and high-impact order, identity, money, privacy, and data-integrity flows raise regression priority.
- Unknown dependencies increase uncertainty; do not mark them unaffected without evidence.
- A selected test is not executed until a run result/evidence exists.

## Output

Create or update `impact-analysis.md` or the team's change record. Include change summary, evidence/map, risk assessment, selected regression scope, configuration/data needs, exclusions, residual risks, owners, and approval/decision. Keep stable requirement/scenario/case IDs intact.
