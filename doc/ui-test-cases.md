# UI Test Cases

UI cases check browser-visible behavior. `Candidate` means suitable for future automation, not currently implemented unless explicitly stated. Runs in this execution report are limited to an anonymous public-readonly Chromium session.

| ID | Test and setup | Steps / expected result | Automation | Run |
|---|---|---|---|---|
| TC-UI-001 | Login page; anonymous | Open login route. `Let's Shop`, email/password inputs, Login, Forgot password, and Register are visible. | Implemented | PASS (2026-10-03) |
| TC-UI-002 | Empty login | Submit blank form. Required email/password messages appear; remain anonymous; no login POST. | Implemented | PASS (2026-10-03) |
| TC-UI-003 | Email missing | Fill valid-format email only and submit. Required validation appears for missing password; no authenticated state. | Implemented | PASS (2026-10-03) |
| TC-UI-004 | Password missing | Fill password only and submit. Required validation appears for missing email; no authenticated state. | Implemented | PASS (2026-10-03) |
| TC-UI-005 | Malformed email | Submit malformed email with a synthetic non-secret password placeholder. Approved format feedback appears and no login request/session is created. | Candidate | NOT RUN; exact feedback needs confirmation |
| TC-UI-006 | Invalid credentials | Attempt one owner-approved synthetic invalid identity. Access is denied, feedback is safe, and no session/protected access is granted. | Candidate | NOT RUN; no approved identity |
| TC-UI-007 | Valid login | Use authorized synthetic QA account. Reach approved authenticated destination with correct session. | Candidate | NOT RUN; credentials/environment unavailable |
| TC-UI-008 | Direct protected route | Open dashboard anonymously. Redirect to login and render no protected data. | Candidate | PASS (prior observation; not rerun) |
| TC-UI-009 | Registration form | Follow Register. Names, email, phone, occupation, gender, password/confirmation, age checkbox, and Register are available. | Candidate | PASS (prior observation) |
| TC-UI-010 | Empty registration | Submit blank form. Required first name, email, phone, password, confirmation, and age errors show; no account is created. | Candidate | PASS (prior observation) |
| TC-UI-011 | Combined invalid registration | Use short first name, malformed email, 9-digit phone, mismatched passwords, and unchecked age. Relevant errors appear; do not create an account. | Candidate | PASS (combined prior run; not independent boundaries) |
| TC-UI-012 | First-name boundary | With other fields valid, check 2, 3, 12, and 13 characters against approved rule; invalid lengths reject. | Candidate | NOT RUN; valid submission requires authorization |
| TC-UI-013 | Registration email | Check valid-format, missing `@`, missing domain, and whitespace cases; reject malformed forms per approved contract. | Candidate | PARTIAL (malformed input observed in combined run) |
| TC-UI-014 | Phone length | Check 9, 10, and 11 digits; enforce approved length rule. | Candidate | PARTIAL (9-digit error observed) |
| TC-UI-015 | Phone characters | Check alphabetic, mixed, leading zero, plus sign, and spaces against approved input contract. | Candidate | NOT RUN |
| TC-UI-016 | Password mismatch | Submit differing password and confirmation. Mismatch error appears; no registration request. | Candidate | PARTIAL (mismatch observed in combined run) |
| TC-UI-017 | Age acknowledgment | Submit otherwise valid synthetic registration data without checking age. Consent error appears; no account created. | Candidate | PARTIAL (required error observed in combined run) |
| TC-UI-018 | Occupation selection | Select Doctor, Student, Engineer, Scientist separately. Selected value updates without uncaught runtime error. | Candidate + console assertion | FAIL (Student selection TypeError reproduced twice) |
| TC-UI-019 | Gender radio group | Select Male then Female. Only one option is selected and form state follows the selection. | Candidate | NOT RUN |
| TC-UI-020 | Valid registration | In authorized QA with safe verification sink, submit valid synthetic identity. Exactly one account is created with clear outcome. | Candidate | NOT RUN; mutation not authorized |
| TC-UI-021 | Duplicate registration | Reuse approved synthetic email after account exists. Duplicate is handled per contract without second account. | Candidate | NOT RUN |
| TC-UI-022 | New-password page | Open password-set route. Heading, email/password/confirmation inputs, Save New Password, Login, and Register are visible. | Candidate | PASS (prior observation) |
| TC-UI-023 | Empty new-password form | Submit blank form. Required email/password/confirmation feedback appears; no mutation. | Candidate | PASS (prior observation) |
| TC-UI-024 | New-password invalid values | Use malformed email and mismatched confirmation with synthetic data. Invalid values are rejected before mutation. | Candidate | NOT RUN |
| TC-UI-025 | Register CTA viewport | At supported viewport sizes, Register is visible and hit-testable without overlay interception. | Hybrid | FAIL candidate at 1036x743; wide desktop worked |
| TC-UI-026 | Login keyboard/responsive | Tab through login at supported viewports; verify visible focus, labels, keyboard submission, and actionability. | Hybrid | NOT RUN |
| TC-UI-027 | Catalog controls | Authenticated, inspect search, price/category/subcategory/gender filters, result count, and paging against fixture. | Candidate | NOT RUN; authentication required |
| TC-UI-028 | Order list controls | Authenticated user sees only permitted orders; View/Delete controls match approved policy. Deletion requires disposable fixture. | Hybrid | NOT RUN; authentication required |

## Execution interpretation

The latest 2026-10-03 public-readonly run executed TC-UI-001 through TC-UI-004. Previous observations are explicitly labeled and are not part of that run. Full evidence and limits: [login execution report](auth-login-execution-report.md).
