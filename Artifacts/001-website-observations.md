# Website Observations and Discovered Surface

## Observation Metadata

| Field | Value |
|---|---|
| Site | Rahul Shetty Academy practice ecommerce client |
| Public entry | https://rahulshettyacademy.com/client/#/auth/login |
| Observation date | 2026-10-01 |
| Access | MCP Playwright browser, public/unauthenticated; public client JavaScript bundle inspection |
| Authenticated account | Not provided; no registration, login, cart mutation, order creation, or deletion performed |
| Build/sprint/environment | Unknown; public hostname is not verified as dev, QA, or pre-production |

## Directly Observed UI

| Route / action | Observation | Evidence/status |
|---|---|---|
| `#/auth/login` | Title `Let's Shop`; email and password textboxes; Login; Forgot password?; Register links | Rendered in live browser. |
| Empty Login submit | Inline `*Email is required` and `*Password is required`; page stays on login | Safely executed; no application auth request observed from this action. |
| `#/auth/register` | First Name, Last Name, Email, Phone Number, Occupation, Gender (Male/Female), Password, Confirm Password, age checkbox, Register | Rendered in live browser. |
| Empty Register submit | Required errors observed for first name, email, phone, password, confirmation, age acknowledgment | Safely executed; remains client-side. Last name, occupation, gender were not required by this observation. |
| Invalid registration submit at 1536x960 | First name `Ab` produced minimum-length error; `invalid-email` produced email error; 9-digit phone produced 10-digit error; different password confirmation produced mismatch error; unchecked age produced checkbox error | Safely executed with synthetic strings; no account was created. |
| Occupation select | Options are Doctor, Student, Engineer, Scientist (plus placeholder). Selecting Student produces uncaught `TypeError: this.registerForm.value.occupation.setValue is not a function`; reproduced twice | Client defect candidate with repeatable console evidence; registration not submitted. |
| Register click at 1036x743 | Playwright click timed out; `.banner` intercepted the Register control. At 1536x960 the button center was hit-testable. | Responsive interaction defect candidate; repeat on supported viewport/device matrix before final severity. |
| `#/auth/password-new` | `Enter New Password` page with email, password, confirm-password, Save New Password, Login, Register | Rendered in live browser. This is a password-set page, not evidence of a separate forgot-request screen. |
| Empty Save New Password submit | Required messages for email, password, confirm password; no success/navigation | Safely executed. |
| Unauthenticated `#/dashboard/dash` | Redirects back to `#/auth/login` | Direct route navigation observed. This proves a client route guard behavior, not complete server-side authorization. |

## Client-Declared Commerce Features

The public dashboard bundle declares these UI features; authenticated screens were not reached:

- Product discovery with `productName`, `minPrice`, `maxPrice`, category, subcategory, and product-for (gender) filters.
- Category values in the client: `fashion`, `electronics`, `household` (3); subcategories `t-shirts`, `shirts`, `shoes`, `mobiles`, `laptops` (5); gender values `men`, `women` (2).
- Client page size is 9 products; this is a bundle configuration, not a verified live catalog count.
- Product cards include View and Add To Cart; cart includes Remove, subtotal/total, coupon handling, and Checkout; order flow collects email/country and offers Place Order.
- Order views expose product/order details and Delete actions. Bundle copy states that if orders exceed 7, the last order will be deleted. This behavior is code-declared and needs safe QA verification before exercising it.
- Coupon string `rahulshettyacademy` is present in the client validation logic. Treat it as a practice-site test value, not a business contract, until confirmed.

## Client-Declared API Surface

The production client bundle declares base path `/api/ecom` and the following method/path pairs. These are discovered client calls, not a published API specification; request/response schemas, authorization policy, error semantics, idempotency, and stability remain unverified.

| Method | Path | Use inferred from client |
|---|---|---|
| POST | `/auth/login` | Sign in with `userEmail`, `userPassword` |
| GET | `/user/get-cart-count/{userId}` | Sidebar cart count |
| POST | `/auth/register` | Register form fields |
| GET | `/auth/confirm/{token}` | Account confirmation |
| POST | `/auth/forgot-password` | Forgot-password request |
| POST | `/auth/confirm-forgot-password-otp/{value}` | OTP confirmation/new-password step |
| GET | `/auth/all-users` | User list (admin-facing use likely; authorization contract unverified) |
| POST | `/user/add-to-cart` | Add product to cart |
| GET | `/user/get-cart-products/{userId}` | Read user's cart |
| DELETE | `/user/remove-from-cart/{userId}/{productId}` | Remove cart product |
| POST | `/auth/new-password` | New-password operation |
| POST | `/product/get-all-products` | Product search/filter body |
| GET | `/product/get-product-detail/{productId}` | Product detail |
| POST | `/order/create-order` | Submit order; client passes `{orders:[{country, productOrderedId}]}` |
| GET | `/order/get-orders-for-customer/{userId}` | Customer order history |
| GET | `/order/get-orders-details?id={orderId}` | Order details |
| GET | `/order/get-all-orders` | All orders/admin-facing use likely |
| DELETE | `/order/delete-order/{orderId}` | Delete order |

The client also calls `https://restcountries.com/v3.1/all` for country data. No undocumented routes should be inferred from these entries.

## Safe API Observations (Unauthenticated)

| Request | Observed result | Interpretation |
|---|---|---|
| POST `/api/ecom/product/get-all-products` with `{}` | HTTP 401 | Authentication appears required; exact contract is unknown. No response body recorded. |
| GET `/api/ecom/user/get-cart-products/test-user-id` | HTTP 401 | Unauthorized response observed; no user/cart body recorded. |
| GET `/api/ecom/order/get-orders-for-customer/test-user-id` | HTTP 401 | Unauthorized response observed; no order body recorded. |
| GET `/api/ecom/order/get-all-orders` | HTTP 401 | Unauthorized response observed; no order body recorded. |
| GET `/api/ecom/auth/all-users` | HTTP 200; response length reported as 108,905,529 bytes | Potential unauthorized bulk data exposure. Response body was not inspected or saved, and this endpoint will not be queried again. Escalate to site owner/security for controlled review. No data-content disclosure is asserted. |

## Current Product/Model Count

The bundle declares 3 product categories, 5 subcategories, and 2 gender filter values. It does not reveal a trustworthy live product count. Product listing was not authenticated; therefore no total model/product inventory is known. The promotional homepage counters are not catalog totals.

## Evidence Boundary

These observations support UI and API test design for the public and client-declared surface. No successful authentication, registration, password change, product retrieval, cart mutation, checkout, order placement, order deletion, or production/development/QA environment identification has been performed.
