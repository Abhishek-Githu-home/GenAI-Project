---
name: test-repository
description: Design and govern a maintainable test repository/catalog that keeps test assets discoverable, traceable, versioned, reviewable, and usable across manual and automated execution.
argument-hint: Describe the team's test tools, repository/TMS, product boundaries, contributors, and traceability/reporting needs.
---

# Test Repository Strategy

## Objective

Define how the team stores, finds, reviews, executes, and retires test assets. A test repository may be source-controlled Markdown/code, a test-management system, or a governed combination; choose one authoritative source per field to avoid duplicate drift.

## Repository Design

1. Discover the current source-control layout, test framework, CI, test-management/reporting tools, access model, and team conventions before proposing structure.
2. Separate durable assets by purpose: requirements/traceability, scenarios, manual cases, automation code/fixtures, data builders, environment configuration, reusable procedures, run evidence, and reports. Keep secrets and sensitive data out of version control.
3. Define naming, stable ID prefixes, metadata schema, ownership, review rules, lifecycle/status, tagging, and deprecation policy. Do not renumber IDs when titles or folders change.
4. Make links navigable and validate them. Use repository-relative links, meaningful headings, and explicit links between requirement, scenario, case, automation, execution, defect, and release records.
5. Define how cases are searched/filtered by product area, requirement, risk, layer, suite, purpose, platform/configuration, automation status, owner, and lifecycle state.
6. Establish change control: peer review for behavior/assertion/data changes, trace impact on linked artifacts, keep history, and periodically review stale, duplicate, flaky, orphaned, and low-value assets.
7. Define evidence retention/access and report references. Store large traces/video in approved artifact storage and link with access control rather than committing generated outputs indiscriminately.
8. Provide onboarding and contribution guidance: how to create IDs, add a case, link evidence, run validation, label assumptions, and request review.

## Minimum Test Asset Metadata

Use the fields supported by the chosen tool: stable ID/title, objective, source requirement and scenario links, product area, priority/risk rationale, layer, purpose, suite tags, preconditions, synthetic data/setup, steps/assertions, cleanup, automation status/owner, supported configuration, execution cadence, evidence/defect links, status, and review date. Avoid storing credential values or personal data; refer to approved secret/data provisioning mechanisms.

## Example Logical Layout

This is illustrative only; adapt to the actual repository and avoid moving existing assets without need:

```text
docs/testing/
  requirements.md
  impact-analysis.md
  test scenarios.md
  test cases.md
  high-level-design.md
  low-level-design.md
  test-pyramid.md
  test-plan.md
  test-repository.md
  automation-strategy.md
tests/
  unit/
  integration/
  api/
  ui/
  e2e/
  fixtures/
  data/
```

Do not create empty directories or duplicate test catalogs just to match this example. Keep manual test procedures and executable automation linked by stable IDs.

## Quality Controls

Recommend lightweight validation for unique IDs, required metadata, valid links, orphan detection, test naming, secret scanning, lint/type/build checks, and test discovery/execution. Match checks to actual tooling and avoid pretending a markdown file is a test management system. Define owners and resolution workflow for broken links, flaky tests, and expired deferrals.

## Output

Produce `test-repository.md` describing the chosen source of truth, structure, metadata, traceability, access/evidence, review/lifecycle, validation, ownership, and migration needs. Label proposals until adopted. Preserve existing user assets and repository conventions.
