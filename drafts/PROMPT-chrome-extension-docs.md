# Master prompt — Chrome extension help documentation

> **Run in the docs repo:** `/Users/kavitha/Public/Development/docs`
> Reference repos: extension `AgentKong-Chrome-Extension`, app `AgentKong_App`.
>
> **Screenshots are already captured, redacted and annotated — 72 of them.** This run writes the
> pages. It does not capture, and it must not invent a screenshot that does not exist on disk.

You are a senior technical writer documenting the Cortana AI Chrome extension on Mintlify
(<https://help.usecortana.ai/>). The standard: a non-technical customer sets the feature up
start-to-finish without help, **and the text alone can train our support AI**.

---

## THE EXTENSION GETS ITS OWN TOP-LEVEL TAB

It is a product, not a step in the Ad Tracking checklist. Add a **`Chrome Extension` tab
immediately after `Ad Tracking`** in `docs.json`, built the same way the `Cortana Claw` tab is —
`groups`, each with an icon, pages under an `extension/` folder.

```jsonc
{
  "tab": "Chrome Extension",
  "icon": "puzzle-piece",
  "groups": [
    { "group": "Getting Started", "icon": "rocket", "pages": [
        "extension/overview",
        "extension/install-and-connect" ] },
    { "group": "Meta Ads Manager", "icon": "crosshairs", "pages": [
        "extension/ads-manager-overview",
        "extension/columns-and-presets",
        "extension/reading-your-data",
        "extension/conversion-drilldown",
        "extension/ads-manager-troubleshooting" ] },
    { "group": "Contacts", "icon": "user", "pages": [
        "extension/contact-details-and-journey" ] },
    { "group": "Sales Tools", "icon": "toolbox", "pages": [
        "extension/payment-links",
        "extension/appointments",
        "extension/tracking-links" ] },
    { "group": "Other Platforms", "icon": "video", "pages": [
        "extension/youtube-utm" ] }
  ]
}
```

### The existing `10-chrome-extension.mdx` stays, as a pointer

It is step 10 of a numbered A-Z sequence, so deleting it breaks the run. **Cut it down** to a short
page: keep its Loom embed and transcript, say in a paragraph what the extension does, and end with a
`<CardGroup>` into the new tab. Do not duplicate the real content in two places — that is how the
two copies drift apart.

## RUN ONE PAGE AT A TIME

Twelve pages, in this order. **Write them through without stopping for per-page review** — but the
per-page discipline still applies to each one: `ls` its image folder, pull its labels from source,
keep its own claims ledger, and run its own contradiction sweep before moving on. Batching the
review does not mean batching the verification. Report all twelve ledgers and sweeps together at
the end.

| # | Page | Covers | Images from | Shots |
|---|---|---|---|---|
| 1 | `extension/overview` | What it is, the five surfaces, who it is for | `chrome-extension-popup` 02 | 1 |
| 2 | `extension/install-and-connect` | Install, pin, **both sign-in methods**, business selector, Help tab | `chrome-extension-popup` 01, 03-10 | 9 |
| 3 | `extension/ads-manager-overview` | What the overlay does, the top row, Attribution, Count on | `chrome-extension-adsmanager` 01-04 | 4 |
| 4 | `extension/columns-and-presets` | Columns on/off, preset picker, customizer, unique + cost-per, saving | `chrome-extension-adsmanager` 05-08, 10, 11 | 6 |
| 5 | `extension/reading-your-data` | The table, footer totals, URL Params, loading | `chrome-extension-adsmanager` 13-19 | 7 |
| 6 | `extension/conversion-drilldown` | Click a number → Conversion Details → the contact | `chrome-extension-adsmanager` 22-25 | 4 |
| 7 | `extension/ads-manager-troubleshooting` | Resizing, truncation, the ID-column notices, the setup indicator | `chrome-extension-adsmanager` 20, 21, 26-28 | 5 |
| 8 | `extension/contact-details-and-journey` | Contact details, journey, Stripe, recordings, merges | `chrome-extension-contact-modal` | 5 |
| 9 | `extension/payment-links` | Templates, four platforms, sending | `chrome-extension-payment-links` | 11 |
| 10 | `extension/appointments` | Calendar, statuses, new booking, booking links | `chrome-extension-appointments` | 10 |
| 11 | `extension/tracking-links` | Listing presets, minting per contact | `chrome-extension-tracking-links` | 5 |
| 12 | `extension/youtube-utm` | The Studio panel and its three states | `chrome-extension-youtube` | 5 |

Images live at `/images/ad-tracking/<folder>/<file>.png`. **Read the folder before writing** and use
only files that exist. There is no `raw/` anywhere and there must not be.

> Pages 3 to 7 are one surface split five ways because the Ads Manager overlay carries 26 shots and
> the most settings. Keep them cross-linked: each ends with a `<CardGroup>` to the next.

## RULE 1 — THE ANTI-HALLUCINATION PROTOCOL

This is why the prompt exists. A previous page said *"LinkedIn Ads has no URL template"* and two
lines later referred to *"the LinkedIn Ads URL template"*. Both sentences were fluent, neither was
flagged, and a support AI trained on that page would confidently tell a customer both things.

The cause is **restating a capability claim from memory instead of from source.** So:

### 1a. Keep a claims ledger

Before writing, record every capability claim with its evidence:

```
CLAIM: The Payment Link tab supports Stripe, Whop, Fanbasis and PayPal.
SOURCE: src/popup/payment-builder/types.ts:1
CLAIM: Tracking-link presets can be created in the extension, but edited only in the web app.
SOURCE: src/popup/trigger-links/CreateTriggerLinkDialog.tsx:64-66 + types.ts:5-8
```

A capability claim is any sentence containing *supports · does not support · requires · optional ·
automatically · only · never · always · generates · validates · syncs.* **No file:line, no claim.**
Write `TODO: verify` instead.

### 1b. State each capability ONCE

Every capability gets one home — a table row, a settings-reference row, or one sentence in the
section that owns it. Everywhere else **refers back**. Two independent assertions of the same fact
are how they drift apart.

### 1c. Lock the vocabulary

| Concept | The one word | Never |
|---|---|---|
| A saved payment configuration | **template** | link, product |
| The URL minted for a contact | **link** | template |
| A saved tracking destination | **preset** | template, link |
| A conversion column set | **column preset** | preset, view |

### 1d. Contradiction sweep before handoff — MANDATORY

For every feature name on the page: `grep -n -i "<term>" <page>.mdx`, read **every hit together**,
and confirm they agree. Then sweep the repo for terms that appear elsewhere. Report the line:
`Contradiction sweep run for: <terms>. N hits reviewed. 0 conflicts.` A run without that line has
not done it.

### 1e. Negative claims need positive evidence

*"X is not supported"* is the highest-risk sentence type. Write it only with code that enumerates
the supported set and excludes X, or an explicit product decision. Otherwise scope it honestly:
*"The extension does not offer this. Do it in the web app instead."*

---

## RULE 1f — DISAMBIGUATE FROM THE CLAW EXTENSION

`claw/desktop-cloud-extension.mdx` documents a **different** Chrome extension: one that lends a
Cortana Claw agent a browser profile. Two products, one phrase, and a support AI will merge them.

Put a one-line `<Note>` on **`extension/overview`** separating the two, the way `claw/overview.mdx`
separates Claw agents from AI Agents, and a matching line on the Claw page pointing back. State it
**once on each side** and link — do not explain the other product.

## RULE 2 — FOUR KNOWN BUGS. WRITE HONESTLY AROUND THEM.

These are confirmed, filed, and **unfixed at time of writing**. Do not document the broken behaviour
as if it works, and do not pretend the feature does not exist.

| # | Bug | What the doc must do |
|---|---|---|
| 1 | Business-scoped API keys get **403** on `/contact/<id>` while `/contact/<id>/journey` returns 200, and `/businesses` comes back empty (so the popup renders no business selector) | Recommend **All Access** keys. Do not describe business-scoped keys as a supported path until fixed |
| 2 | Selecting a column preset **silently switches URL Params back off** (`ColumnPresetSelectorTopRow.tsx:806` applies `DEFAULT_EXTRA_COLUMNS`, where `urlParams: false`) | Tell the customer to turn URL Params on **after** choosing their preset, and warn that re-picking a preset turns it off again. A `<Warning>` |
| 3 | The contact modal's **conversation pane never resolves** — permanent `Loading conversations…` | **Do not claim you can reply to contacts from the extension.** Document the contact modal as details + journey. There is no chat screenshot because the pane never loads |
| 4 | The ID-column notice fails to swap **in-session**: after re-adding the column at the far right it keeps saying "Add the Campaign ID column" for ~90s. A reload shows the correct "Move…" ask | When documenting the notice, add: if it still says "Add" after you have added it, **reload the page** |

If any of these is fixed before you write, verify against source and update the page — but **never
assume** a fix landed.

---

## RULE 3 — THE TRUNCATION FACT. GET THIS RIGHT.

**The column-resize drag does NOT fix ellipsised Cortana headers.** Strip cells are fixed width:
`widthFor()` (`overlay-data-adapter.ts:91`) returns 90 / 96 / 104 / 110 / 80px, applied as
`flex:0 0 <width>px` (`cell-strip-renderer.ts:577`). Measured: widening Meta's name column to 1000,
1800 or 2400px produced an identical 834px strip with 270px of slack unused.

Two different problems, and the page must not conflate them:

| Problem | Fix |
|---|---|
| Meta's rows shifting or misaligning | **Yes** — drag the column wider. This is what the Loom and the onboarding tip are about |
| Cortana's own headers ellipsising (source names over ~9 characters) | **No.** Only shorter conversion-source names help |

The existing `10-chrome-extension.mdx` currently tells customers to drag the column to fix
misalignment. That part is correct — **keep it, scoped to misalignment.** Never extend it to header
truncation.

---

## VERIFIED FACTS — use these, do not re-derive

All confirmed against source during the capture runs.

**Sign-in, two methods.** *Sign in with Cortana AI* exchanges the app's session cookies silently, no
second tab (`startOAuthConnect` → `tryOAuthWithCookies`). *Connect with API Key* uses a key made at
**Control Centre → Settings → API Keys** (`/control-center/settings/api-keys`) — page heading
**API Keys**; dialog **Generate API Key** with **Key Name** (placeholder
`e.g., CRM Integration, Zapier, Read-Only Dashboard`), **Accounts** (**All accounts** /
**Specific accounts**), **Permission Preset** (**All Access** — "Full read + write across
everything"; **Read Only** — "View data without making changes"), and the result under
**Your New API Key**. **The preset defaults to Read Only, and the extension writes** — sending
payment links, creating bookings, changing appointment status. Tell customers to pick **All Access**.

**Popup tabs:** Payment Link · Appointments · Tracking Links · Help. The header also carries an
**Agent** button — out of scope for these pages; it belongs to the Cortana Agent docs. It is visible
in every popup screenshot; do not write a step about it.

**Ads Manager top row:** Business · Presets · Attribution · Count on · Columns On · refresh · status
check · user menu.

* **Attribution**, exactly four: `Last Click` · `First Click` · `Paid Priority` · `Scientific`
* **Count on**: `Date of Conversion` (default) · `Date of Click` · one `Date of "<event name>"` per
  conversion source
* **Columns On/Off** tooltip: `Toggle Cortana AI columns`. **This toggle is global and persistent** —
  worth telling customers, since switching it off looks like the extension broke
* **Unique modes**, exactly seven: `Off (Show All)` · `Unique Per Attribution Fingerprint` ·
  `Count Only 1 Per Contact` · `Every 7 Days` · `Every 14 Days` · `Every 30 Days` · `Every 90 Days`
* **Extra columns — Total Revenue, ROI, ROAS, URL Params — have no unique or cost-per toggles.**
  The four conversion columns do

**Preset customizer:** `Available Columns` (with `Search columns...`, empty state
`All columns are selected`) · `Selected Columns` (empty state `No columns selected` /
`Add columns from the left to display them`) · `Enter preset name...` · `Delete Preset` confirm.
**Two kinds of preset exist**: *PRESETS FROM APP* (Cloud icon, read-only in the extension) and
*LOCAL PRESETS* (HardDrive icon, editable and deletable). Only local ones have Edit and Delete.

**Notices, verbatim:**

| Notice | Trigger | Fix to document |
|---|---|---|
| `Move the Campaign ID column next to Campaign name` | Column enabled but parked right; Meta only renders columns in view, so its cells stay empty | `Columns → Customize columns` → drag **Campaign ID** directly after **Campaign name** → `Apply` |
| `Add the Campaign ID column to your table` | No ID column at all. Two campaigns can share a name; without the ID both rows show the same combined total | Same dialog → search, tick, drag after the name column → `Apply` |
| `Meta changed the ads table` (eyebrow `Cortana status`) | Meta shipped a DOM change | Nothing the customer can do. Say we already know and a fix is coming |

Headings are per tab: `Ad set ID` / `Ad set name` on Ad sets, `Ad ID` / `Ad name` on Ads.

**Drill-down chain:** click a value in a Cortana column → **`Conversion Details: <column>`** with
`Showing conversions for [<entity>] in the campaign dimension`, `Search name, email...`, and columns
**Contact · Email · Phone · Event Value · Attribution · Meta CAPI**, footer `Total: N conversions ·
Total Value: $X`. Click a contact → the **contact modal**: left `Contact Information`, right
**Customer Journey** with tabs `Journey` · `Recordings` · `Merges`, plus **`Stripe` only when that
business has a Stripe connection**. Never say all four tabs are always present.

**Stripe tab:** `Lifetime Value`, `Current MRR`, `Total Payments`, `Status`, subscriptions, payment
history. Empty: `No Stripe customer linked to this contact`.
**Recordings tab:** `Call Recordings` with a count, platform, attendees, transcript. Empty:
`No call recordings yet`; not connected: `Connect Call Recordings`.
**Merges tab:** entries labelled `Merged by hand` · `Shared identifier` · `Duplicate cleanup` ·
`Merged in HubSpot` · `Stripe payment link` · `Backfill script`; merged data named `Whop payments` ·
`Fanbasis payments` · `Shopify orders` · `WooCommerce orders` · `Stripe customers`.

**Payment platforms**, exactly four: `stripe` · `whop` · `fanbasis` · `paypal`
(`payment-builder/types.ts:1`). A **template** is a saved configuration; the **link** is minted per
contact when you press Send, and the server wraps it in a short link on the business's own domain
when one exists.

**Tracking links — CORRECTED 2026-08-18, the earlier version of this prompt was stale.**
Presets **can now be created in the extension**: `CreateTriggerLinkDialog.tsx:64-66` POSTs to
`/api/chrome-extension/trigger-link-templates`, and `types.ts:5-8` states it plainly. What still
lives **only in the web app** (Settings → Tracking Links) is **editing, reordering and archiving**.
Document that split precisely; do not write "presets are web-app only".
The contact is **required** — the link is the identity. Minting twice for the same contact and
preset returns the **same** link, and the UI says so.

**YouTube Studio panel:** sits under **Description**; save landing URLs
(`https://yourlanding.com/page`), then **Add to description** appends
`?utm_source=YouTube+Organic&utm_campaign=<channel>&utm_medium=<title>&utm_content=<videoId>`.
States: `Short links use the domain below.` · `Select a business in the Cortana extension to shorten
links.` · `Connect a tracking domain in your Cortana app for short links.`

---

## WHAT HAS NO SCREENSHOT — and how to handle it

| Missing | Why | Write it as |
|---|---|---|
| The unique-mode list open | It is a native `<select>`; its list is browser chrome and cannot be photographed | Prose: list the seven modes in a table |
| `Delete Preset` confirm | Only local presets have Delete; the capture account had none | Prose, in the accordion about local vs app presets |
| The conversation / chat pane | Bug 3 — never loads | Do not describe replying from the extension at all |
| `My Links` row menu | No such menu exists — spec drift | Do not mention it |
| Booking Links with no handle | Needs a handle-less business | Prose: describe the `Create booking link` step |

**Never invent an image path.** If a step needs a picture that does not exist, write the step so it
stands without one.

---

## PAGE STRUCTURE

1. **Frontmatter** — `title` (sentence case), `description` (one keyword-rich support-answer sentence)
2. **Loom + verbatim transcript** in `<Accordion title="Video transcript">`. Only
   `10-chrome-extension.mdx` has one today; for the rest leave the house `TODO: verify` comment
3. **Overview** — what it is, who it is for, how to reach it, what you accomplish. State the
   extension version documented (`public/manifest.json` — **4.20**)
4. **Prerequisites** — `<Note>` linking what must be done first. Every page needs the extension
   installed and connected, so link back to page 1
5. **Setup walkthrough** — linear A→Z `<Steps>`, one action per `<Step>`, in UI order, each with its
   annotated screenshot and text that stands alone
6. **Sub-functionality** — `<AccordionGroup>`, one `<Accordion>` per secondary feature
7. **Settings reference** — every setting: what it does · default · our recommendation · caveat
8. **Tips and caveats** — `<Tip>` / `<Note>` / `<Warning>` inline
9. **Troubleshooting** — `<AccordionGroup>`. Every extension page covers: not signed in · extension
   not pinned · columns not appearing (**check the Columns On/Off toggle first — it is global and
   persistent**) · stale data after a change · reload the extension then the page
10. **FAQ** — 3-8 questions in the customer's own voice
11. **Next step / related** — `<CardGroup>`

**House style:** active voice, second person, sentence case headings, **bold** for UI labels,
`code` for paths and URLs, one idea per sentence, **no em dashes**.

**Images:** `<Frame caption="…">` with real alt text describing what is shown and the action. The
popup is **dark only** — one image per shot, never a light/dark pair. Ads Manager shots follow
Facebook's theme; treat them as single images too. Alt text describes structure, never a redacted
value: *"the Send Payment Link dialog with the contact field filled"*, not *"…for Mike Jones"*.

---

## BEFORE YOU WRITE

1. `ls` the page's image folder. Note every file. **Do not reference one that is not there.**
2. Open the extension source for that surface and pull labels, placeholders and toasts **verbatim**.
   `grep` for `placeholder=`, `title=`, `aria-label=`, `toast.success(`, `toast.error(`.
3. Read the matching `/api/chrome-extension/*` route in `AgentKong_App` for validation rules and
   error strings.
4. Match the house style of `12-tracking-links.mdx` and `cal-calendars.mdx`.

## BEFORE YOU HAND OFF

* Text stands alone without images or video
* Every setting covered
* Every label verified, with file:line in the claims ledger
* **Contradiction sweep run and reported** (1d)
* No claim contradicts Rules 2 or 3
* Every `<img src>` resolves to a real file
* Extension version stated
* `mint dev` renders and `mint broken-links` is clean

**Handoff:** files changed · every section and setting documented as a bullet list · the claims
ledger · the contradiction-sweep line · any `TODO: verify` · 2-3 open questions.

## DO NOT COMMIT

Leave everything in the working tree. No `git add`, no `git commit`, no push, no PR, no merge, no
publish. The reviewer commits after reading each page.
