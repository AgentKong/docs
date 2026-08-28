# Master prompt: Historical import (backfill) help documentation

> **Run in the docs repo:** `/Users/kavitha/Public/Development/docs`
> **Reference repo:** `AgentKong_App`, branch `claude/conversion-source-backfill-52ca91`
> (worktree `AgentKong_App/.claude/worktrees/conversion-source-backfill-52ca91`).
> **Sprint doc:** `sprints/cs-machine/07-HISTORICAL-IMPORT.md` (the design source of truth).
> **Ship-gate rule:** `.cursor/rules/new-conversion-source-backfill.mdc`.
>
> Third in the series. Sibling of `PROMPT-chrome-extension-docs.md` and
> `PROMPT-new-integration-doc-update.md`.

You are a senior technical writer documenting the Cortana / AgentKong product on Mintlify
(<https://help.usecortana.ai/>). The standard: a non-technical customer runs a historical import
start to finish without help, **and the text alone can train our support AI**.

---

## RULE 0: CAPTURE FIRST. THE LAST RUN FAILED BECAUSE IT DID NOT.

The previous attempt at this page wrote fluent documentation and **took no screenshots at all**.
It treated capture as a later pass and the later pass never happened. That is the single failure
this revision exists to prevent.

**The order is CAPTURE, then WRITE. Not the reverse, not in parallel.**

* **You may not write a single line of `4-backfill-history.mdx` until the PNG files exist on disk**
  and you have run `ls images/ad-tracking/backfill/` and listed what came back.
* **A page with no images is a failed run.** Do not hand one off. Do not describe it as "pass 1".
  Do not promise images later.
* If a shot in the manifest below genuinely cannot be captured, **say which one and why, in the
  handoff, by name**. Silence is the failure mode. A missing shot that is reported is fine; a
  missing shot that is quietly skipped is not.
* Report the manifest as a ticked checklist at the end: every shot, captured or not, with a reason
  for every gap.

---

## INPUTS (confirmed by the reviewer, 2026-08-27)

| | |
|---|---|
| **Base URL for all captures** | `https://kavitha.usecortana.ai` |
| **Business for captures** | `cf3383a0-55f6-45d8-ab57-484edd63770c` (has real GoHighLevel sources with real submissions) |
| **Subject of the walkthrough** | A **GoHighLevel form** source, trigger `FormSubmitted` |
| **Capture surface** | `https://kavitha.usecortana.ai/business/cf3383a0-55f6-45d8-ab57-484edd63770c/tracking?tab=conversions`, tab **Conversion Setup** |
| **Supporting surface** | `https://kavitha.usecortana.ai/business/cf3383a0-55f6-45d8-ab57-484edd63770c/settings` (to confirm the GoHighLevel connection only) |
| **Schema state** | Live. The feature is reachable. |
| **Production state** | **NOT on production.** `app.usecortana.ai` does not have this branch. |
| **Themes** | **Light AND dark. Both. Every shot is a pair.** Mintlify serves both themes and the house pages already ship pairs. |

The earlier test business `28b8499a…` is **retired for this job**. It has no GoHighLevel form with
real submissions, so it cannot produce a running or completed import, which is exactly what this
page is about. Use `cf3383a0…` only.

**The settings URL is not the feature.** It identifies the business and confirms the connection.
The historical-import offer lives on the **tracking** page under **Conversion Setup**.

---

## THE DELIVERABLE

| | |
|---|---|
| Page | `4-backfill-history.mdx` |
| Title | `4.3) Import your history` |
| Nav | Ad Tracking tab, **A-Z Setup Guide** group, **between `4-conversion-tracking` and `5-url-parameters`** |
| Images | `images/ad-tracking/backfill/`, raw captures in `images/ad-tracking/backfill/raw/` |
| House-style model | **`12-tracking-links.mdx`**. It is the closest match: numbered annotations, light/dark pairs, the same voice. Read it before you write. |

**Do not renumber the existing pages.** The `4.1 / 4.2` precedent already exists, so `4.3` slots in
with no link breakage. Renumbering `5` through `12` would break every inbound link and every
support answer that quotes a page number.

---

## THE SHOT MANIFEST: the end-to-end journey, twelve shots, twenty-four files

The page documents one continuous journey on a GoHighLevel form source: **offer → preview →
confirm → running → finishing → done**, and what the source row looks like during and after. The
running and completed states are **the point of the page**, not optional extras. The last run
shipped without them.

Every shot is captured **twice**, light and dark, at the identical scroll position and DOM state so
one set of coordinates annotates both.

| # | File (light / dark adds `-dark`) | State to reach | Must be visible |
|---|---|---|---|
| 1 | `01-sources-table.png` | Conversion Setup tab, a GoHighLevel form source row | The source row with its trigger, its success count, and the **clock icon** in the row actions |
| 2 | `02-clock-tooltip.png` | Hover the clock icon | The tooltip text, whichever of the five it shows |
| 3 | `03-offer-window.png` | The offer step | Title **Backfill your history**, the step pills, the three window buttons with **90 days** selected, **Skip for now** and **Preview my last 90 days** |
| 4 | `04-preview-running.png` | After pressing preview | The sampling message and the spinner |
| 5 | `05-preview-result.png` | Preview settled | The `≈N resolvable` headline, the records-found line, the rate, **Not now** and **Continue** |
| 6 | `06-confirm.png` | Confirm step | The **Send imported conversions to ad platforms (CAPI)** toggle in its off state, its explanatory copy, and the **Advanced settings** link collapsed |
| 7 | `07-confirm-advanced.png` | Advanced settings expanded | The **Also import conversions we can't attribute** toggle, off, with its untracked warning |
| 8 | `08-importing.png` | Import running | `Importing… N imported so far · M unresolvable discarded`, **Cancel import**, **Run in background** |
| 9 | `09-finishing.png` | Finishing phase | The `All rows are in (…) Finishing: refreshing attribution…` message |
| 10 | `10-done.png` | Import settled | The **Import finished** heading and the three-number result line |
| 11 | `11-row-importing.png` | Sources table while the import runs | The row's progress bar, its percentage, and the status line |
| 12 | `12-row-after.png` | Sources table after completion | The success count with **N unresolvable** beside it |

Shots 8, 9 and 11 are time-boxed: they exist only while the import is live. Plan for them. Start
the import, then capture 8 and 11 immediately, watch for 9, and take 10 and 12 when it settles.
Losing them because you were writing prose is the failure this prompt is guarding against.

---

## STEP 0: PROVE YOU CAN REACH THE RUNNING AND DONE STATES

Run this before anything else. It decides whether the page can be finished today.

### 0a. Find the GoHighLevel form source

Open the Conversion Setup tab on `cf3383a0…` and list every conversion source with its type and
trigger. The clock icon renders only for a source type the historical import supports. Pick a
**GoHighLevel source whose trigger is `FormSubmitted`** and which has a real success count, so the
import has something to walk. Report what you found:

```
Business cf3383a0: GoHighLevel sources
  <name> · <trigger> · clock icon yes/no · success count
CHOSEN: <name> (<trigger>), because <reason>
```

Prefer a **small** form. A form with a few hundred submissions finishes inside one session; one
with twenty thousand does not, and shots 9, 10 and 12 never arrive.

### 0b. Prove slices progress on this host

`kavitha.usecortana.ai` is not the production deployment, and two of the three executors may be
dead here:

* **Vercel crons run on production deployments only.** The ten-minute safety net that drains the
  queue probably does not fire here.
* **The QStash slice chain is pinned to a deployment SHA** and refuses to publish on a
  non-production host unless the QStash base URL resolves to this exact host
  (`src/lib/integration-backfill/slice-chain.ts`).
* **What does work** is the inline kick in the start route, which runs the **first slice only**.

So an import can start, pull some rows, then sit at PENDING with a frozen counter. That is the
environment, not a product bug, and it must never reach the customer page.

**The test.** Start the real import on the source you chose in 0a, then poll:

```
https://kavitha.usecortana.ai/api/integrations/backfill/jobs?businessId=cf3383a0-55f6-45d8-ab57-484edd63770c
```

Watch one job for five minutes. You want `totalInserted` to advance **after** the first slice
settles, or `status` to leave `PENDING` a second time.

* **It advances** → capture shots 8 to 12 live. Proceed.
* **It freezes after one slice** → **stop and tell the reviewer immediately.** Do not write the
  page around the gap and do not invent the states. There is **no driver script in `scripts/`**;
  the one used on 2026-08-27 was a throwaway that was never committed, so do not tell the reviewer
  to "run the driver". Say plainly that either a driver has to be written or the captures wait for
  production.

Report the result in the handoff either way.

---

## GOLDEN RULES

1. **Never assume.** Only document what you observe. Drive the real app, or read the real source.
   Every label, default, toggle and error string matches the live UI verbatim. Unverifiable becomes
   `TODO: verify`, never an invention.
2. **Text stands alone.** This is knowledge-base training data. Assume the reader cannot see the
   images. Never "click the button above". Name the button. Images support the text, they never
   carry it.
3. **Linear, A to Z.** The page reads top to bottom as one journey: offer, preview, confirm,
   running, done.
4. **One app surface, one page.** Sub-functionality goes in accordions.
5. **Every setting documented:** what it does, its default, our recommendation, its caveat.
6. **Use Mintlify properly.** Plain paragraphs are the fallback, not the default.
7. **No em dashes in our own prose.** Quote a UI string verbatim even when the product itself
   contains one (the offer dialog does), but never write one yourself.
8. **Document the product, not this deployment.** Nothing about `kavitha.usecortana.ai`, branch
   names, preview builds, crons, QStash or slices appears on the customer page. A behaviour that is
   an artefact of this host is not a fact about the product.

---

## RULE 1: THE ANTI-HALLUCINATION PROTOCOL

This rule exists because of a real failure. A previous page said *"LinkedIn Ads has no URL
template"* and two lines later referred to *"the LinkedIn Ads URL template"*. Both sentences read
fluently, neither was flagged, and a support AI trained on that page would tell a customer both
things with equal confidence.

The cause is **restating a capability claim from memory instead of from source**, and it is worse
here than anywhere, because backfill has a **registry deliberately wider than the product**.
Nineteen strategies are registered in code. **Eight are offered to customers.** A writer skimming
`strategies/index.ts` will write "backfill supports HubSpot and Salesforce", and it is not true.

### 1a. Keep a claims ledger

Record every capability claim with its evidence before writing:

```
CLAIM: The historical-import offer appears for eight integrations: GoHighLevel, Typeform, Tally,
       ClickFunnels, WooCommerce, Close, Stripe and Shopify.
SOURCE: src/lib/integration-backfill/provider-windows.ts SELF_SERVE_PROVIDERS + SELF_SERVE_INTEGRATION_KEYS

CLAIM: The CAPI toggle is off by default and, when on, sends only conversions from the last 7 days.
SOURCE: prisma/schema.prisma capiEnabled @default(false)
      + src/lib/integration-backfill/gate-and-post.ts (skipCapiOlderThanDays: capiEnabled ? 7 : 0)
```

A capability claim is any sentence containing *supports · does not support · requires · optional ·
automatically · only · never · always · all · imports · sends · resolves · discards.*
**No file:line, no claim.** Write `TODO: verify` instead.

### 1b. State each capability ONCE

Every capability gets one home: a table row, a settings-reference row, or one sentence in the
section that owns it. Everywhere else refers back. Two independent assertions of the same fact are
exactly how they drift apart.

### 1c. Lock the vocabulary

| Concept | The one word | Never |
|---|---|---|
| The whole feature | **historical import** | backfill (in customer copy), sync, replay |
| The dry run that counts before importing | **preview** | estimate, dry run, sample |
| A record with attribution we can use | **resolvable** | trackable, valid, matched |
| A record thrown away because attribution did not resolve | **unresolvable** | failed, rejected, skipped |
| A record already in Cortana | **already present** | duplicate, deduped |
| How far back the import reaches | **window** | range, period, lookback |
| The 50,000-entry ceiling | **limit** | cap (in customer copy), quota |

`backfill` and `cap` are internal words. They do not appear in customer copy except where the live
UI says them, and the dialog title does: **Backfill your history**. Quote that verbatim, then use
"historical import" in your own prose.

### 1d. Contradiction sweep before handoff: MANDATORY

For every feature and provider name on the page: `grep -n -i "<term>" 4-backfill-history.mdx`, read
**all hits together**, confirm they agree. Sweep at minimum:

`preview · resolvable · unresolvable · CAPI · window · 90 · 60 · 30 · limit · cancel · GoHighLevel ·
form · Stripe · Shopify · Close · Typeform · Tally · ClickFunnels · WooCommerce · pixel`

Then sweep the rest of the repo for the same provider names, because `4-conversion-tracking.mdx`
already makes claims about all of them.

Report verbatim: `Contradiction sweep run for: <terms>. N hits reviewed. 0 conflicts.`
A run without that line has not done it.

### 1e. Negative claims need positive evidence

*"X is not supported"* is the highest-risk sentence type on this page. Write one only with code
that enumerates the supported set and excludes X, or an explicit recorded product decision.
Otherwise scope it honestly: *"The offer does not appear for this source type"* is verifiable;
*"Cortana cannot import this"* is not.

### 1f. THE TRAP TABLE: the twelve places this page will lie if you let it

Check the finished page against every row and report the check.

| # | The trap | The truth | Evidence |
|---|---|---|---|
| 1 | "Backfill works for every integration" | **19 strategies registered, 8 offered.** Salesforce, HubSpot, Calendly, iClosed, Fathom, YouTube and the five ad platforms have code and **no customer-facing offer** | `strategies/index.ts` vs `provider-windows.ts` `SELF_SERVE_PROVIDERS` |
| 2 | "Choose 30, 60 or 90 days" | True as buttons, **but clamped per provider**: Close to **30**, Shopify to **60**. GoHighLevel has no ceiling, so 90 really is 90 there | `provider-windows.ts` `PROVIDER_WINDOW_CEILING_DAYS` + `clampWindowDays` |
| 3 | "It imports your history" | **It imports only the resolvable subset and deletes the rest.** Live runs: Tally kept 335 of 419, Close 2,773 of 6,140, Typeform 715 of 20,557 | `resolve-gate.ts`; sprint doc live-test table |
| 4 | "Turn CAPI on to send your history to Meta" | **On still sends only rows from the last 7 days.** The date fan-out is not built | `gate-and-post.ts` header comment |
| 5 | "The preview tells you how many will import" | A **sampled projection, currently wrong in both directions** | Sprint doc, "Preview vs delivered" |
| 6 | "Click Cancel to stop the import" | **Cancel only works while the job is queued.** A running job finishes its current batch and reports `Job is RUNNING — only queued jobs can be cancelled` | `api/integrations/backfill/cancel/route.ts` |
| 7 | "Every conversion source can be backfilled" | **Pixels, CSV, URL parameter and booking form have no API to pull from** and never show the offer | `conversion-source-dialog.tsx` (`noBackfillOffer`) |
| 8 | "Any Shopify source can import" | **Only the `orders/paid` and `orders/create` topics.** Others 422 | `conversion-source-dialog.tsx` Shopify branch |
| 9 | "Edit a source to re-run the import" | **The offer never fires on an edit.** Re-running is the clock icon | `conversion-setup-dialog.tsx` (`!source.isEdit`) |
| 10 | "Unresolvable records are skipped" | The conversion row is **created and then deleted**. The **contact it created is kept**, deliberately | `resolve-gate.ts`, recorded deviation in its header |
| 11 | "Re-running will duplicate my data" | **It cannot.** Dedup is on the provider's own record id against a unique index | each strategy's dedup check; zero duplicates on three live runs |
| 12 | "The import sends webhooks / fires your Zapier" | **Outbound events are suppressed for every backfill write** | `src/server/db.ts` conversionEntry + contact create hooks |

---

## RULE 2: CAPTURE MECHANICS

### Both themes, always

The app is Tailwind `darkMode: ['class']`, so the theme is the `dark` class on `<html>`. Force it in
the page, never through the user's saved preference:

```js
// dark
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('light');
// light
document.documentElement.classList.add('light');
document.documentElement.classList.remove('dark');
```

Capture light first, flip the class, capture dark **without re-navigating, re-scrolling or
re-opening anything**. Same DOM, same scroll, same dialog step. That is what lets one set of
bounding boxes annotate both files, and it is what makes the pair look like the same screenshot in
two skins rather than two different screenshots.

Settings for every capture: Playwright against `https://kavitha.usecortana.ai`, viewport
**1440x900**, `deviceScaleFactor: 2`.

Naming: `NN-name.png` for light, `NN-name-dark.png` for dark, both in
`images/ad-tracking/backfill/`. Raw unannotated originals in `raw/` beside them.

Embed with the house pattern from `12-tracking-links.mdx`, **identical alt text on both**:

```mdx
<Frame caption="…">
  <img className="block dark:hidden" src="/images/ad-tracking/backfill/03-offer-window.png" alt="…" />
  <img className="hidden dark:block" src="/images/ad-tracking/backfill/03-offer-window-dark.png" alt="…" />
</Frame>
```

### Annotations that look clean

Coordinates come from the DOM (`getBoundingClientRect()`, multiplied by `deviceScaleFactor`), drawn
with a Pillow or sharp script. **Never eyeball a coordinate.** The spec, applied identically to
every shot in the set so the page reads as one system:

* **Badge:** filled circle in `#a855f7`, white bold numeral, **56px diameter at 2x** (28 CSS px),
  with a 3px white outer ring so it survives both themes. Same size on every image, whatever the
  element size.
* **Number = the `<Step>` number** the shot illustrates. Numbers never restart mid-page.
* **Placement:** just **outside** the target's box, preferring top-left, then left, then top. The
  badge must never sit on top of text, an icon or a field value. If the target is at the frame
  edge, move the badge inside the nearest empty space and keep the outline.
* **Outline:** 3px rounded rectangle in `#a855f7` around the target, corner radius 6px, with a
  2px translucent white halo outside it so it reads against both light and dark backgrounds.
* **Padding:** 6px between the outline and the element, so the outline never crops a border.
* **Density:** at most **four badges per image**. If a step needs more, split the shot.
* **No arrows unless the badge cannot sit adjacent to its target.** A badge plus an outline is
  cleaner than a badge plus an arrow plus an outline. When an arrow is unavoidable, one straight
  2px line, same colour, no curves and no arrowheads larger than the badge.

**Then verify your own annotation.** Re-open each finished PNG, read it, and confirm the badge sits
on the control the step names, no label is covered, and the light and dark versions carry the badge
in the same place. If not, fix and re-verify. An annotation nobody looked at is the image version
of an unsourced claim.

### Never capture

* **Never an error page or an error state you did not intend to document.** A 500, a stack trace, a
  failed load, a red toast from an unrelated action: retry the capture, do not ship it. The only
  error states that belong on this page are the product's own documented refusals, and only in the
  troubleshooting section.
* **Never a URL bar.** Capture the viewport or the dialog. `kavitha.usecortana.ai` must not appear
  anywhere in the images.
* **Never an empty state captioned as the real thing.**
* **Never a state you reached by editing the database.**
* **Never an image path you have not confirmed with `ls`.**

---

## RULE 3: PII REDACTION: BLUR THE VALUE, NEVER THE LABEL

These captures come from a real business with real leads. A GoHighLevel form import walks real
submissions, so real names, emails and phone numbers will be on screen. Redaction that swallows the
interface is as bad as no redaction, because the reader can no longer tell which field is which.

**The principle: the label stays readable, the value disappears.** If the row reads
`Email    sarah@acme.com`, the word **Email** stays crisp and only `sarah@acme.com` is covered.
Same for `Name`, `Phone`, `Business`, `Account ID`. A reader must still be able to say "the third
field is the email field".

### Redact

Real people's names · email addresses · phone numbers · avatars and profile photos · real customer
business names and logos · contact rows in any list or drill-down · API keys, tokens, secrets,
webhook URLs with an embedded key · GoHighLevel location ids and other account ids · session ids
and record ids · revenue tied to a named person · the browser URL bar.

### Keep readable

Field labels · column headers · placeholder text · button text · tab names · status badges · counts
and percentages · dates · window sizes · error and toast strings the doc names · source names that
are not a person's name · anything the prose refers to.

### Technique

* The redaction rect is the bounding box of the **value node** only. For an input, the rendered
  value and not the wrapper. For a definition list, the `<dd>` and never the `<dt>`. For a table,
  the cell content and never the `<th>`. Take the rect from the DOM the same way you take
  annotation coordinates, so it lands exactly.
* Apply the same rects to the light and dark versions of a pair. They are the same DOM.
* **Blur strength:** Gaussian sigma 8 or higher at 2x. A light blur on short text is reversible.
* **Secrets get a solid fill, never a blur.** Keys, tokens and signed URLs get an opaque rounded
  rect in neutral grey. Blur is for identity, fill is for credentials.
* **Check the result.** Re-read each redacted image and confirm the value is unreadable and its
  label still is.
* Prefer not capturing it at all. If a shot works just as well scrolled past the contact rows,
  scroll past them.

### Alt text never leaks

Alt text describes structure and action, never a redacted value.
Good: *"the Done step showing the imported, unresolvable and already-present counts"*.
Bad: *"the import result for Sarah at Acme"*.

---

## VERIFIED FACTS: use these, do not re-derive

Confirmed by reading source on branch `claude/conversion-source-backfill-52ca91`, 2026-08-27.
Anything not here, verify yourself and add to the ledger.

### GoHighLevel, the subject of this walkthrough

* Provider key `GO_HIGH_LEVEL`, dialog integration key `ghl`.
* **Six backfillable triggers:** `OpportunityStageUpdate` · `OpportunityStatusUpdate` ·
  `AppointmentCreate` · `AppointmentUpdate` · `FormSubmitted` · `SurveySubmitted`
  (`strategies/ghl.ts`, `GHL_EVENT_TYPES`).
* The source stores its trigger in `fieldMappings.ghlEventType`, and a form source also stores its
  `formId`. **One source is one form**, so the import is scoped to that form and not the whole
  location.
* **No window ceiling.** All three window buttons are honoured and 90 days really is 90 days.
* The form preview is a **census**: it reports `sampleSize` equal to the total, so the dialog shows
  `≈N resolvable` with a percentage and does not extrapolate (`strategies/ghl-estimate.ts`).
* The walk runs **newest first**, so the progress bar fills as it reaches older submissions.
* Preview refusal strings you may meet: `This source has no pipeline configured` and
  `This source has no calendar configured` (opportunity and appointment triggers, not forms).

### Where the feature lives

* **Route:** `/business/<businessId>/tracking?tab=conversions`, tab **Conversion Setup**. Tabs on
  that page in order: **Attribution Table · Tracking Pixels · Conversion Setup · AI Ad
  Optimization · URL Builder**.
* **The offer fires** when a **new** conversion source finishes setup. It is a queue: several
  sources created in one save show one offer after another.
* **The way back in** is the **clock icon** in a source row's actions, beside Settings and Delete.
* **Per-source status** renders in the sources table: a progress block, plus `N unresolvable`
  beside the row's success count.
* **`BackfillJobsCard`** mounts only in the admin onboarding cockpit. **Internal surface.** Do not
  document it unless the reviewer asks.

### The eight providers that get the offer

`GoHighLevel · Typeform · Tally · ClickFunnels · WooCommerce · Close · Stripe · Shopify`
(`provider-windows.ts`). Ceilings: **Close 30 days · Shopify 60 days**; the other six have none.
Default window **90 days**.

### The five steps, verbatim

Step pills: **Window · Preview · Confirm · Importing · Done**.

| Step | Verbatim strings |
|---|---|
| Dialog header | Title **Backfill your history**. Description: `Import your last {N} days of {trigger} and resolve their attribution — only what resolves is imported.` |
| Window | Buttons **30 days**, **60 days**, **90 days**, default **90 days**. Footer **Skip for now** and **Preview my last {N} days** |
| Preview, running | `Sampling your last {N} days… for appointment and pipeline triggers this reads up to 50 contacts, so it can take a few minutes.` |
| Preview, result | Headline `≈{N} resolvable`, or `{N} records found` where there is no recovery sample. `At least ` prefixes a bounded count. Footer **Not now** and **Continue** |
| Preview, over limit | `This import would exceed the {limit}-entry limit. Contact support to raise it for this account.` **Continue is disabled.** |
| Confirm | Toggle **Send imported conversions to ad platforms (CAPI)**, default off. Link **Advanced settings** reveals **Also import conversions we can't attribute**, default off, with `These will show as untracked and will raise your untracked %.` Footer **Back** and **Import** |
| Importing | `Importing… {N} imported so far · {M} unresolvable discarded`, then `All rows are in ({N} imported · {M} unresolvable discarded). Finishing: refreshing attribution on related conversions…`. Footer **Cancel import** and **Run in background** |
| Done | Heading **Import finished**, **Import finished with notes**, or **Import stopped**. Line: `{N} conversions imported with attribution · {M} discarded as unresolvable · {K} already present`. Footer **Run again** and **Done** |

Also verbatim: `This runs in the background — you can close this window and the import continues.`
and, on reopening from the clock icon, `Checking this source's import history…`.

### Source-row states

`Previewing history` · `Import queued` · `Importing history` · `Finishing: refreshing attribution` ·
`Import hit an error, retrying (attempt N of 3)` · `Import stopped` · `Stopped at the volume cap` ·
`Finished with notes` · `{N} unresolvable`.

Clock-icon tooltips: `Import history` · `Preview running: view it` · `Import running: view progress` ·
`Import stopped: run again` · `Import history: view or run again`.

### Error strings

| Code | String |
|---|---|
| 422 | `Backfill is not yet available for {sourceType}` |
| 422 | `This source has no form configured — nothing to backfill` |
| 422 | `This source has no trigger configured — nothing to backfill` |
| 422 | `The "{trigger}" trigger is not backfillable yet` |
| 409 | `A backfill for this source is already queued or running` |
| 409 | `Job is {status} — only queued jobs can be cancelled` |
| 404 | `Conversion source not found` |

### Defaults

Window **90 days** · limit **50,000 entries** · CAPI **off** · import-unattributable **off** ·
retries **3 attempts** · re-run dedup on the provider's own record id.

### What "resolvable" means, in customer language

A record is imported when its attribution resolves to something real: a matched ad, campaign or ad
set; a click id; or a genuine traffic source. A record whose only answer is "we found nothing"
(direct or organic with no other signal) is **not** resolvable, and importing it would raise the
customer's untracked percentage rather than lower it. That is the point of the feature and the page
must say it plainly, early.

---

## WHAT THIS FEATURE DOES NOT HAVE: the no-invention list

Do not write a step, setting or FAQ answer for any of these.

* No scheduling and no recurring import. Every run is manual.
* No custom date range. Three buttons only, clamped per provider.
* No per-record selection or approval queue.
* No undo, rollback or "delete what this import created" button.
* No CSV export of the import report.
* No email or in-app notification when an import finishes.
* No stopping a running import. Cancel applies to a queued one.
* No import for pixel, CSV, URL-parameter or booking-form sources.
* No deletion of contacts created by an unresolvable record. The conversion row goes, the contact
  stays.
* No spreading of CAPI events across past dates. On means the last 7 days only.

---

## KNOWN ISSUES: write honestly around them

From the sprint doc's `FINAL A-Z REVIEW — 2026-08-27`.

| # | Issue | What the page must do |
|---|---|---|
| 1 | **The preview is miscalibrated** in both directions | Present it as an estimate from a sample, never a promise. One `<Note>`, plain wording, no internal numbers |
| 2 | **Two runner invocations were killed at 909s and 924s against an 800s ceiling**, so that work is redone | Do not promise a completion time. Do not write "imports typically finish in N minutes" at all |
| 3 | **Payment sources show ad-attributable revenue, not total revenue**, because unresolvable payments are discarded | A `<Warning>` on the Stripe, Shopify and WooCommerce guidance |
| 4 | **Not on production yet** | Golden Rule 8. Flag in the handoff that the page must not publish before the branch reaches `app.usecortana.ai` |

If any is fixed before you write, verify against source and update. **Never assume a fix landed.**

---

## PAGE STRUCTURE

1. **Frontmatter.** `title: "4.3) Import your history"`. `description`: one keyword-rich
   support-answer sentence naming the eight providers.
2. **Loom plus verbatim transcript** in `<Accordion title="Video transcript">`. If none exists,
   leave the house `TODO: verify` comment as `extension/payment-links.mdx` does.
3. **Overview.** What a historical import is, who it is for, where it lives, what you end up with.
   Say within the first three sentences that only resolvable records are imported, and why.
4. **Prerequisites.** A `<Note>` linking `4-conversion-tracking` (a source must exist first) and
   `1-connect-integrations` (the integration must be connected).
5. **Which sources can be imported.** One table of the eight with their window ceilings. Single
   home of that fact, per 1b.
6. **Setup walkthrough.** One `<Steps>` block covering the whole journey in UI order: open the
   offer, choose the window, preview, read the preview honestly, confirm the two toggles, import,
   watch it run, read the result. One action per `<Step>`, each with its light/dark `<Frame>` pair,
   each standing alone without its image.
7. **Sub-functionality** as an `<AccordionGroup>`: re-running from the clock icon · reading the
   source-row status during and after an import · what happens to records that do not resolve ·
   what the import does to conversions you already had · per-provider notes.
8. **Settings reference.** Every setting: what it does · default · recommendation · caveat. Window,
   CAPI toggle, import-unattributable toggle, the 50,000 limit.
9. **Tips and caveats** inline as `<Tip>` / `<Note>` / `<Warning>`.
10. **Troubleshooting** as an `<AccordionGroup>`: the offer did not appear · the clock icon is
    missing · the preview says zero · the preview number did not match what imported · "already
    queued or running" · cancel refused · finished with notes · the numbers do not add up (records
    that produce no conversion, for example a form submission with no email, land in no bucket).
11. **FAQ**, 3 to 8 questions in the customer's voice: *Will this duplicate my data? · Why did it
    only import a fraction of my records? · Will my team get emails or Zapier alerts for imported
    conversions? · Can I go back further than 90 days? · Will this send my old conversions to
    Meta? · Can I undo an import?*
12. **Next step and related** as a `<CardGroup>`: `5-url-parameters` next, `4-conversion-tracking`
    and `1-connect-integrations` related.

**House style:** active voice, second person, sentence case headings, **bold** for UI labels,
`code` for paths and URLs, one idea per sentence, no em dashes.

---

## BEFORE YOU WRITE

1. Run STEP 0 and report 0a and 0b.
2. **Capture the twelve shots, light and dark.** Annotate, redact, verify.
3. `ls images/ad-tracking/backfill/` and paste the listing. Reference only files that exist.
4. Pull labels, defaults and error strings verbatim from:
   * `src/components/tracking/backfill/backfill-offer-dialog.tsx` (the five steps)
   * `src/components/tracking/backfill/backfill-source-cell.tsx` (row states)
   * `src/components/tracking/backfill/backfill-history-button.tsx` (tooltips)
   * `src/app/api/integrations/backfill/start/route.ts` (every refusal)
   * `src/app/api/integrations/backfill/cancel/route.ts` (the cancel refusal)
   * `src/lib/integration-backfill/provider-windows.ts` (roster and ceilings)
   * `src/lib/integration-backfill/strategies/ghl.ts` and `ghl-estimate.ts` (GoHighLevel)
   * `prisma/schema.prisma`, `model IntegrationBackfillJob` (every default)
5. Read `sprints/cs-machine/07-HISTORICAL-IMPORT.md` for intent, decisions H2a, H7, H8 and H10, and
   the final review for what is open.
6. Read `4-conversion-tracking.mdx` end to end. It is the page your reader just came from and
   already describes all eight providers. Do not contradict it.
7. Read `12-tracking-links.mdx` for the annotation and light/dark house style.

## BEFORE YOU HAND OFF

* **The shot manifest, ticked**: all twelve, light and dark, captured or explained by name
* STEP 0 reported: the source survey and the smoke-test result
* Text stands alone with no images and no video
* Every setting covered with default, recommendation and caveat
* Every label, default and error string verified, with file:line in the ledger
* **Contradiction sweep run and reported** (1d)
* **Trap table (1f) checked row by row** and the check reported
* Nothing about this deployment leaked into the customer page (Golden Rule 8)
* Every `<img src>` resolves to a real file, every `<Frame>` carries both themes with the same alt
  text, every annotation re-read and confirmed
* Every image passes RULE 3: values covered, labels readable, no URL bar, no error pages
* `docs.json` updated with `4-backfill-history` between `4-conversion-tracking` and
  `5-url-parameters`, no other page renumbered
* `mint dev` renders and `mint broken-links` is clean

**Handoff summary:** files changed (paths only) · the ticked shot manifest · the STEP 0 findings ·
every section and setting as a bullet list so gaps are visible · the claims ledger · the
contradiction-sweep line · the trap-table check · every `TODO: verify` · 2 to 3 open questions.

## DO NOT COMMIT

Leave everything in the working tree. **No `git add`, no `git commit`, no push, no PR, no merge, no
publish, no deploy.** List the changed paths in the handoff and stop. The reviewer stages and
commits after reading.
