---
name: test-data-environment
description: Plan safe, repeatable test environments and synthetic data provisioning, isolation, reset, cleanup, access, and dependency controls.
argument-hint: Describe environments, roles, data classes, dependencies, test scope, and permitted side effects.
---

# Test Data and Environment Readiness

## Objective

Make test setup safe, deterministic, privacy-aware, and repeatable before execution. Environment readiness is a release dependency, not an afterthought.

## Environment Assessment

For each local, CI, QA, staging, or production context, record owner, purpose, URL/region where appropriate, build/deployment identity, configuration, access method, supported integrations, health/availability, data boundaries, observability, refresh cadence, and permitted test activities. Do not assume a supplied URL is a sandbox or that production is safe for mutation.

Confirm authorization, roles/permissions, feature flags, network access, dependency versions, third-party sandbox behavior, time/locale/currency, browser/device matrix, and environment-specific differences. Identify shared resources and parallel-run collision risks.

## Test Data Plan

For each scenario/case, define data purpose, synthetic source, state/setup, uniqueness, ownership, permissions, expected values, lifetime/retention, cleanup, and recovery when teardown fails. Use builders/fixtures or approved seed mechanisms where available. Prefer isolated data per test/run and immutable shared reference data only when proven safe.

- Never commit secrets, session tokens, real payment credentials, or personal data.
- Use approved secret management and synthetic/non-production identities.
- Use unique run identifiers for created carts/orders and prevent cross-test contamination.
- Define idempotent setup and cleanup; ensure failed test teardown can be detected and reconciled.
- Cover relevant equivalence classes/boundaries after rules are confirmed, not arbitrary data permutations.

## Dependency and Side-Effect Controls

Identify service dependencies, queues, email/SMS, payment, inventory, shipping, analytics, and other external effects as evidence allows. For each, choose a documented contract, sandbox, controlled test double, or explicitly approved real integration. Define isolation, reset, observability, and failure behavior. Never create real external transactions or mutate a shared/production environment without explicit written authorization and controls.

## Readiness Gate

Execution can begin only when scope/build, access/permissions, health, data provisioning, dependency control, cleanup/reconciliation, evidence location, and stop/escalation path are understood. Mark unmet items blocked with owner and due date. A test needing unsafe or unavailable data is deferred, not silently run with substitute assumptions.

## Output

Create or update `test-data-environment.md` or the relevant test plan section. Include environment matrix, authorization and constraints, synthetic data catalog, provisioning/reset/cleanup, dependencies, parallel-safety rules, evidence/log handling, readiness status, risks, and owners. Record observed differences; do not claim production parity without evidence.
