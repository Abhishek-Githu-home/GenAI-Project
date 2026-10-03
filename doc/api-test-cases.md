# API Test Cases

Every path below was declared by the public client under `/api/ecom`; none is a published or approved API contract. Confirm the current schema, status/error semantics, and role policy with the service owner. Use synthetic QA fixtures only. Do not inspect or repeat the previously observed all-users response without explicit security-owner direction.

| ID | Method and path | Coverage / expected outcome | Safety, automation, run |
|---|---|---|---|
| TC-API-001 | POST `/auth/login` | Valid/invalid/missing payloads; only valid approved credentials establish a session/token; errors follow documented contract. | Candidate; approved synthetic account required; NOT RUN |
| TC-API-002 | POST `/auth/register` | Valid, invalid, duplicate identities; at most one account created and response follows contract. | Candidate; unique synthetic identities/cleanup; NOT RUN |
| TC-API-003 | GET `/auth/confirm/{token}` | Valid, expired, malformed, and reused confirmation tokens; verify expiry and one-time behavior. | Candidate; controlled generated tokens; NOT RUN |
| TC-API-004 | POST `/auth/forgot-password` | Existing/nonexistent synthetic identities; privacy-preserving response and only safe test-sink side effect. | Candidate; test message sink; NOT RUN |
| TC-API-005 | POST `/auth/confirm-forgot-password-otp/{value}` | Valid, invalid, expired OTP and rate-limit behavior; invalid proof never changes password. | Candidate; OTP fixture and rate policy; NOT RUN |
| TC-API-006 | POST `/auth/new-password` | Valid/missing/mismatched payload and required reset proof; authorized account changes according to session policy only. | Candidate; disposable account/reset flow; NOT RUN |
| TC-API-007 | GET `/auth/all-users` | Anonymous/customer/admin authorization and response minimization. | Security review; anonymous HTTP 200 and very large response already observed. Do not repeat; escalated candidate |
| TC-API-008 | GET `/user/get-cart-count/{userId}` | Own, other, missing/invalid user ID and anonymous access; enforce ownership and documented count. | Candidate; two synthetic users; NOT RUN |
| TC-API-009 | POST `/user/add-to-cart` | Valid/invalid product, duplicate add, and wrong-owner identity; cart mutation follows authorization/idempotency contract. | Candidate; isolated QA cart/product; NOT RUN |
| TC-API-010 | GET `/user/get-cart-products/{userId}` | Own/other/missing user and anonymous read; owner-only cart data. | Candidate; anonymous HTTP 401 observed, policy/positive behavior inconclusive |
| TC-API-011 | DELETE `/user/remove-from-cart/{userId}/{productId}` | Remove owned item, missing item, wrong-owner item, repeat delete; only allowed state changes. | Candidate; disposable cart; NOT RUN |
| TC-API-012 | POST `/product/get-all-products` | Empty/filter requests; schema, search, price, category/subcategory/gender, and paging behavior. | Candidate; anonymous `{}` returned 401; contract/positive behavior inconclusive |
| TC-API-013 | GET `/product/get-product-detail/{productId}` | Existing, missing, malformed, unavailable product; detail matches listing and access policy. | Candidate; known product fixtures; NOT RUN |
| TC-API-014 | POST `/order/create-order` | Single/multiple products, invalid IDs, missing country, duplicate/retry; intended order only, no partial unintended side effects. | Candidate; isolated QA/sandbox only; NOT RUN |
| TC-API-015 | GET `/order/get-orders-for-customer/{userId}` | Own/other/missing user; enforce ownership and documented fields. | Candidate; anonymous HTTP 401 observed; positive behavior inconclusive |
| TC-API-016 | GET `/order/get-orders-details?id={orderId}` | Owner/admin/other user and malformed/missing ID; enforce order-level access and safe not-found response. | Candidate; seeded owned/foreign IDs; NOT RUN |
| TC-API-017 | GET `/order/get-all-orders` | Anonymous/customer/admin authorization; only permitted role receives minimized data. | Candidate; anonymous HTTP 401 observed; exact role contract inconclusive |
| TC-API-018 | DELETE `/order/delete-order/{orderId}` | Delete owned eligible order, repeat, nonexistent and unauthorized IDs; enforce state, audit, and idempotency contract. | Conditional/destructive; disposable QA order and approval required; NOT RUN |

`HTTP 401` observations do not by themselves establish the intended contract. The `/auth/all-users` observation is a security candidate based on status and response size only; response content was not inspected or saved. See [source observations](../Artifacts/001-website-observations.md) and [environment/data safety plan](../Artifacts/007-test-environment-and-data.md).
