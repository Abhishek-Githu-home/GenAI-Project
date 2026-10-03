# Test Environment and Data Plan

## Actual Access Versus Requested Environments

| Environment | Supplied/verified URL | Access/result | Readiness |
|---|---|---|---|
| Development | None | No environment provided or accessed | Not ready |
| QA | None | No environment provided or accessed | Not ready for authenticated/mutating tests |
| Pre-production | None | No environment provided or accessed | Not ready; written authorization required |
| Public website | `https://rahulshettyacademy.com/client/#/auth/login` | Unauthenticated UI and client bundle inspected through MCP browser; a few blank/invalid UI checks and read-only API probes performed | Not classified as a test environment; do not assume safe for mutations |

The public practice-site description does not establish dev/QA/pre-production status or permission for account/order mutation. Obtain environment owner confirmation for URL, deployment ID, data isolation, acceptable request volume, and permitted actions.

## Data Used in Current Run

- No registered user, credential, token, real personal data, cart item, product record, or order was created/read.
- UI validation used synthetic invalid strings (short name, malformed email, 9-digit phone, mismatched non-secret password placeholders) only; form was not successfully submitted.
- API probes were unauthenticated. Cart/order read responses were 401. The all-users response body was not inspected or stored.
- No payment, email, shipment, notification, or deletion side effect was triggered intentionally.

## Proposed Synthetic Fixtures

| Fixture | Use | Control/cleanup |
|---|---|---|
| `qa-customer-A-<runId>` and `qa-customer-B-<runId>` | Login, ownership isolation, order visibility | Provision in approved identity system; credentials retrieved only via secret store; delete/reset through owner-approved process. |
| Stable available product IDs | Product/cart/order tests | Seed/identify by QA owner; store non-sensitive ID and approved price expectation. |
| Unique cart/order run IDs | Avoid collisions and reconcile mutations | Isolate per worker/run; cleanup after test; record owner/order ID without PII. |
| OTP/recovery sink | Password recovery | Dedicated test sink or stub; do not send real messages. |
| Payment/country dependencies | Checkout | Use approved sandbox/stub; no real transactions. Country list may be mocked for deterministic tests. |

## Dev / QA / Pre-Production Strategy

- **Dev:** fast unit/component, local API contract, disposable fixtures, stubs for external effects.
- **QA:** primary integration and UI regression with isolated synthetic users/products/orders, stable reset and cleanup, request tracing.
- **Pre-production:** approved release-candidate smoke and limited E2E only after payment/email/order deletion safeguards and data reconciliation are proven.
- Keep accounts and orders isolated across parallel tests. Test delete behavior only with disposable owned orders; never delete another user's or production data.
- Confirm exactly what “Delete” means (hard delete, soft delete, cancellation, or list removal), audit expectations, and recoverability before testing.

## Readiness Gate and Owners

Environment owner must provide names/URLs, build IDs, deployment schedule, roles, credentials via secure channel, fixture/reset APIs, logs/correlation IDs, allowed side effects, and escalation contacts. Product/security owners must approve the all-users endpoint review. Until then, authenticated API, add-to-cart, order placement, order deletion, and cross-user mutations remain blocked.
