# Prompt — Update existing docs for a NEW integration

> Sibling of the "one app page → one doc page" prompt. Use **that** one when a feature gets a brand
> new page. Use **this** one when a new integration lands and the truth is now wrong in several
> pages that already exist. The failure mode here is not a missing page, it is a **stale count, a
> stale list, and a stale table** scattered across pages nobody thinks to open.
>
> Filled-in example below: PayPal (conversion source) + LinkedIn Ads (ad platform), Aug 2026.

You are a senior technical writer documenting the Cortana / AgentKong product on Mintlify
(<https://help.usecortana.ai/>, repo `AgentKong/docs`).

Your job for this run is to fold ONE OR MORE new integrations into the EXISTING documentation, to a
standard good enough that (a) a non-technical customer can set the integration up start-to-finish
without help, and (b) the text alone can train our support AI.

---

## INPUTS (fill in before running)

* **Integration(s) and type:**
  * `PayPal` — conversion source (payments / refunds)
  * `LinkedIn Ads` — ad platform (spend + attribution)
* **App routes touched:**
  * `/dashboard/integrations` — Settings → Integrations, the connect cards
  * `/business/<id>/settings?tab=integrations` — same, business-scoped
  * Tracking → **Conversion Setup** → gear on a conversion → **Add Source** → Integration dropdown
  * Business Settings → LinkedIn modal (`?linkedin=open`)
* **Docs repo:** `/Users/kavitha/Public/Development/docs` (Mintlify, config `docs.json`)
* **Login / test account:** superuser `matei@superuser.ai` on `http://localhost:3000` (`yarn dev`).
  SUPERUSER can open any business by URL.
  **A test business with the integration actually CONNECTED is required for the screenshots that
  matter.** If you do not have one, do not fake it — see STEP 2.
* **Source-of-truth context:**
  * `sprints/paypal-integration/*` (00-OVERVIEW.md is the architecture decision)
  * `sprints/linkedin-ads/*` and `sprints/linkedin-ads-remediation/*`
  * the route/component in `AgentKong_App-dev` — always the final word over any sprint doc
* **Dark mode relevant?:** no (help docs use light captures)

If anything needed to do the job well is missing (esp. login or exact route), STOP and ask.
Never guess.

---

## GOLDEN RULES

1. **Never assume.** Only document what you observe — drive the real app and/or read the real
   source. Every label, default, toggle, and error string must match the live UI verbatim.
   Unverifiable → mark `TODO: verify`, never invent.
2. **Text must stand alone** (this is for an AI knowledge base). Assume the reader has NO access to
   the screenshots or Loom video. If a step's meaning depends on an image, rewrite it. Never
   "click the button above" — name the button.
3. **Linear, A→Z.** Anything you add reads top-to-bottom as one setup journey.
4. **Match the page you are editing.** A new accordion in an existing catalog copies that catalog's
   shape exactly: same sub-headings, same order, same voice. You are not redesigning the page.
5. **Document usage AND setup, completely.** Every setting: what it does, default, our
   recommendation, caveats.
6. **Leverage Mintlify fully.** Plain paragraphs are the fallback, not the default.
7. **No em dashes** in any customer-facing copy.

### Rule 8 — the one this prompt exists for: HUNT THE STALE FACTS

A new integration silently falsifies sentences on pages you were not asked to touch. Before writing
a word, grep the whole docs repo for every one of these and fix each hit:

| Stale-fact class | How to find it | Example that broke |
|---|---|---|
| **Hard-coded counts** | `grep -rnE "all [0-9]+ source\|[0-9]+ (source types\|integrations)"` | "all 23 source types" → 24 |
| **Split counts** | the sentence right after the total | "The other 19 require…" → 20 |
| **Inline lists of platforms** | `grep -rn "Stripe, Whop, and Fanbasis"` | Payment Filters availability |
| **Capability tables** | refunds table, polled-vs-instant table | PayPal missing a row |
| **Alt text with counts** | `grep -rn "alt=.*[0-9]\+ conversion sources"` | said 22, page said 23 |
| **Frontmatter `description`** | it lists integrations for SEO/retrieval | new name missing |
| **"we support" prose** | `grep -rn "We support\|Payments &\|E-commerce &"` | connect-integrations bullets |

If a count appears in **alt text**, do not bump the number unless you re-captured the screenshot.
Rewrite the alt text to be countless instead — the alt text describes an image you did not change.

---

## STEP 1 — Understand before writing

* Read the route/component in `AgentKong_App-dev` for real field names, defaults, validation,
  edge cases, and **exact toast/error strings**. Grep for the integration name across
  `src/components`, `src/app/api`, `src/lib`, `src/constants`.
* Confirm what actually SHIPPED vs what a sprint doc merely planned. Sprint docs describe intent;
  `prisma/schema.prisma` and the live route describe reality. A code comment can be stale — check
  the schema before believing "this column is not live yet".
* Establish the **cadence** for anything polled: `vercel.json` `crons` is the source of truth.
* Log in and click through everything: tabs, toggles, modals, empty/success/error states, and the
  exact order the UI requires.
* Match the house style of the specific page you are editing, not the site average.

---

## STEP 2 — Screenshots

* Capture with Playwright at 2× DPI: the connect dialog, the source form, each sub-section, empty
  state, success state.
* For each element referenced in a step, read its bounding box from the DOM and draw a numbered
  badge (number = step number) + arrow/box in brand purple `#a855f7` with a light halo. Use a
  Pillow/sharp script — do not eyeball coordinates.
* Store finals in `images/<area>/<page-slug>/`, raw captures in a `raw/` subfolder, descriptive
  filenames (`01-add-source.png`).
* Embed with `<Frame caption="…">` and ALWAYS write real alt text describing what's shown + the
  action.
* **If you cannot reach the connected state** (no test business has the integration live), do NOT
  capture a misleading empty-state shot and caption it as the real thing, and do NOT skip silently.
  Write the prose so it stands alone with no image, and hand back a **capture list**: exact route,
  exact dialog, the filename to use, and the alt text already written. That list is the deliverable.

---

## STEP 3 — Write

For each integration, work out which of these it needs, then write only those:

**A. The connect step** → `1-connect-integrations.mdx`
Add it to the right category bullet list, then a full connect walkthrough if the flow is unusual
(pasted API credentials, a permission that propagates on a delay, an account picker after OAuth).
OAuth-and-done needs a bullet, not a section.

**B. Conversion source** → `4-conversion-tracking.mdx`
* A new `<Accordion>` in the **Source catalog**, in strict A-Z position.
* Shape it exactly like its nearest sibling (PayPal copies Stripe): **What it tracks** ·
  **Refunds** · **Prerequisite integration** + verbatim lock error · `<Steps>` · warnings/tips.
* Then Rule 8: source counts, refunds table, Payment Filters list, revenue-carrying list, polled
  sources table, troubleshooting, FAQ, frontmatter description.

**C. Ad platform** → `5.mdx` (URL Parameters)
* A new `<Accordion>` matching the Meta/Google/TikTok/Bing shape.
* Be honest about the tier of support. If Cortana does not generate or validate a template for this
  platform, say so plainly and explain what the customer must do by hand and what they get if they
  do nothing. A platform whose click ID gives source-level attribution but not ad-level attribution
  must say **exactly that**, because "it works" and "it works at ad level" are different products
  to a media buyer.
* State whether the **URL Params** column in the tracking table covers this platform. If validation
  does not run for it, a customer staring at a blank column needs to be told that is expected.

**D. Anything else the grep in Rule 8 turned up.**

---

## STEP 4 — Navigation

Only touch `docs.json` if you added a **page**. Folding an integration into existing pages needs no
navigation change. Say so explicitly in the handoff rather than leaving it unmentioned.

---

## STEP 5 — Self-review, then hand off (do NOT merge)

Run the QA checklist (`help-doc-standards.md`). Key gates:

* text stands alone without images/video
* every setting covered
* every label, event name, error string, and toast verified against real source or real UI
* A-Z / linear order preserved in every list you touched
* **every stale-fact class in Rule 8 re-grepped after editing**
* screenshots annotated with step-matching numbers + alt text, or a capture list handed back
* `mint dev` renders and `mint broken-links` is clean

Then produce a handoff summary: files changed, a bullet list of every section/setting documented
(so gaps are visible), any `TODO: verify` items, and 2-3 open questions. Commit to the working
branch but DO NOT merge or publish — every draft is reviewed first.
