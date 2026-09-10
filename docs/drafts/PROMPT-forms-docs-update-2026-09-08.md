# Correction prompt: update the Forms help docs for the 2026-09-08 changes

You already wrote the Forms help documentation for Cortana (help.usecortana.ai) following
`PROMPT-forms-docs.md`. Since then the Forms feature changed. Update the existing pages so they
describe what the product does NOW. Do not rewrite pages that are still correct. Keep every rule
from the master prompt: 10-year-old English, short sentences, one idea per paragraph, screenshots
in light AND dark, blur every email, phone number, person name and business name in screenshots,
never show real customer data, no em dashes anywhere, British spelling as in the existing pages.
Draft on the same docs branch. Do not publish.

Only document what a customer can see or do. Never mention internal things: ids, cookies,
sessions, routes, webhooks, resolvers, databases, "lead rows", or code names.

## 1. Where answers go (update the page about submissions / contacts)

Say clearly:
- Every answer a visitor gives is saved on that person's contact record, under **Custom Fields**
  in the contact window (the same window you open from Contacts).
- Each question becomes a field named after the question. If you rename the question, the field
  name follows.
- Name, Email, Phone and Website questions fill the contact's own Name, Email, Phone and Website.
- If the same person fills in two different forms, both forms' answers appear on that one contact.
- Choice questions (radio, checkbox, dropdown, picture choice) show as selectable values; multi
  choice shows as chips; a matrix shows as "Row: choice" lines; a date range shows as
  "start to end"; ranking shows the order the visitor chose.
- Answers are also sent to connected CRMs (GoHighLevel, HubSpot) as custom fields when those
  fields are linked.
- Screenshot: a contact window with the Custom Fields section showing a few form answers
  (blur the name, email and phone).

## 2. How Cortana knows who submitted (update the same page, or the "Contacts and forms" section)

- A form recognises a person by their email or phone number. If a contact with that email or
  phone already exists (including a second email or phone saved on the contact, and phone numbers
  written in a different format), the submission goes onto that contact. A new contact is created
  only when nothing matches. New contacts created this way show the source "Form".
- An email or phone is used to identify the person only once the visitor has finished typing it
  (they moved to the next field or the next page). A half-typed email never creates a contact.
- **Partial submissions**: a visitor who starts a form and gives their email or phone, but never
  sends it, still appears as a partial submission on their contact and in the funnel, once they
  finished typing their email or phone.

## 3. Tracking, attribution and the journey (update the tracking / attribution page)

- Every form has its own tracking pixel. It is created automatically. You do not set it up and it
  does not appear in the Tracking > Pixels list (same as Booking calendars and Shopify). Remove
  any sentence that says the form's pixel can be seen or edited in that list.
- Each visit to a form is recorded on the person's Customer Journey with the page, the device,
  the country and any UTM values and ad click ids on the link they clicked (utm_source,
  utm_medium, utm_campaign, utm_content, utm_term, and Meta, Google, TikTok, Microsoft click ids).
  The same values are kept on the submission, so attribution works even when the visitor's
  browser blocks tracking.
- Forms embedded on your own website keep the visitor's identity from your website's pixel, so
  the journey continues from the page they came from.
- A/B tests: a view is counted once per visit, and bot visits are not counted.
- If you delete a tracking pixel that a form was using, the form gets a new one by itself.

## 4. What the visitor sees (update the "sharing a form" / "how the form works for visitors" page)

- The phone question opens on the visitor's own country flag (from their location), so most
  visitors do not have to pick a country.
- Required questions are checked when the form is sent as well as on the page. A visitor cannot
  send a form with a required question left empty. The message shown is:
  "Please answer every required question before sending."
- Sending the same form twice by accident (for example, pressing the button again after a slow
  connection) does not create two submissions.

## 5. Payments (update the payments page)

- Hosted checkout (Whop and similar): after paying, the visitor comes back to the form with
  everything they had typed still filled in, on the page they left from. If they go back from the
  checkout without paying, their answers are also kept.
- A required payment step cannot be skipped. The form is sent only once the payment is confirmed.
  If a visitor tries to send before paying, they see: "Please complete the payment step before
  sending."
- Card payments inside the form (Stripe) confirm right away; the visitor does not have to wait.
- Embedded forms stay inside your page during and after a hosted checkout.

## 6. The DOES NOT EXIST list (update section 12 of the docs)

Keep every item from the master prompt's list, and change the pixel item to this:
- "The form's tracking pixel exists but is automatic and hidden. There is nothing to configure,
  and it is not shown in Tracking > Pixels." Do not describe a pixel settings screen for forms.

Do not add pages for: lead scoring on forms, returning-visitor prefill on forms, or a submissions
list page. They do not exist for forms yet. If a page already claims one of these, remove the
claim.

## 7. Output

For each page you change, list: the page, what you changed, and which screenshots you replaced.
Flag anything you could not verify on the preview site instead of guessing.
