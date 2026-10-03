# Functional Test Cases

These 15 cases preserve the existing end-to-end case IDs and exercise observable business journeys across screens/services. They are proposed checks; all require approved QA fixtures unless noted. No authenticated journey was run in the 2026-10-03 public-readonly execution.

| ID | Journey and preconditions | Expected business outcome | Layer / status |
|---|---|---|---|
| TC-E2E-001 | Register synthetic user, confirm through approved mechanism, then sign in. Requires isolated account and test confirmation sink. | One account is created/confirmed and the user reaches the authorized catalog session. | UI + API; NOT RUN |
| TC-E2E-002 | Search catalog, combine price/category/subcategory/gender filters, then clear filters with known product fixtures. | Every result matches selected criteria; reset returns baseline results. | UI + API; NOT RUN |
| TC-E2E-003 | Open known product detail and add that product to an isolated user's cart. | Detail matches selected product; cart contains that product once and count updates. | UI + API; NOT RUN |
| TC-E2E-004 | Open cart for a user with no items. | Clear empty-cart state; no unintended order or cart mutation. | UI + API; NOT RUN |
| TC-E2E-005 | Add then remove a disposable product from an isolated cart. | Item disappears and count returns to its original value. | UI + API; NOT RUN |
| TC-E2E-006 | Compare cart amount with approved prices; if promotion is in scope, test empty, valid `rahulshettyacademy`, and invalid coupon. | Amount and promotion outcome follow approved pricing/rounding rules. | UI + API; NOT RUN; coupon contract open |
| TC-E2E-007 | Attempt checkout with missing required shipping email/country. | Checkout blocks submission and clearly identifies required shipping information; no order is created. | UI; NOT RUN |
| TC-E2E-008 | Load countries and select an allowed country using deterministic external-data fixture. | Country selection persists through order review and matches the selected value. | UI + integration; NOT RUN |
| TC-E2E-009 | Place one controlled order with sandbox/stub effects and a disposable cart. | Exactly one order is created; confirmation matches submitted product and country. | API + UI; NOT RUN |
| TC-E2E-010 | Place a multi-item order with known products in isolated QA. | Each intended item appears once and totals/confirmation follow the approved contract. | API + UI; NOT RUN |
| TC-E2E-011 | Open customer order history and a seeded order's detail as its owner. | Owner sees matching product, price, date, and order data. | API + UI; NOT RUN |
| TC-E2E-012 | Delete a disposable owned order after owner-approved semantics and cleanup are established. | List/detail reflect the documented deletion/cancellation state; audit/cleanup is recorded. | API + UI; destructive, NOT RUN |
| TC-E2E-013 | User A attempts to view/delete User B's seeded order. | No unauthorized data exposure or mutation occurs. | API + security UI; NOT RUN |
| TC-E2E-014 | Seed controlled isolated order history beyond seven only if retention policy is confirmed. | Exactly the contractually retained orders remain; any removal is identified and auditable. | Integration/manual; NOT RUN; behavior unconfirmed and destructive |
| TC-E2E-015 | Simulate one double-click/retry/timeout against safe test stub and approved idempotency contract. | Exactly-once or documented retry behavior occurs; no unintended duplicate order. | API + integration; NOT RUN |

## Safety gates

Do not execute account/order mutations on the public site. Use QA/pre-production only after environment owner approval, synthetic identities, external-effect sandboxing, isolated data, and cleanup are confirmed. The >7-order behavior and order deletion require explicit product-owner approval.
