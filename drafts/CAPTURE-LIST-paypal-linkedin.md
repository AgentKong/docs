# Screenshot capture list — PayPal + LinkedIn Ads

**Status: the two PayPal conversion-source shots are DONE** and embedded in the **PayPal** accordion
in `4-conversion-tracking.mdx`. They were captured from the real app against the business
**Mike Testing Account** (`b3f00990-ca9c-4b80-8658-bc8aca388d8e`), which has a live PayPal account
connected. Everything else below is still outstanding.

Reproduce with `scratchpad/capture5.mjs` from that session: Playwright driving
`localhost:3001` as the superuser, viewport 1440×960 at `deviceScaleFactor: 2`, dark mode forced on
the DOM only (never persisted, so the superuser's saved theme preference is untouched), and every
body child that does not contain the active dialog or an open popover blurred, which is what redacts
the real conversion and client names behind the modal.

Every page in this change still reads correctly with no images at all, so the remaining captures are
an upgrade, not a dependency.

**Capture settings for all of them:** Playwright, 2× DPI, light mode, viewport 1440×900. Annotate
with a numbered badge matching the `<Step>` number in the doc, arrow or box in `#a855f7` with a
light halo, coordinates read from the DOM bounding box (do not eyeball). Raw captures go in a
`raw/` subfolder beside the finals.

---

## PayPal

Prerequisite: a business with PayPal connected and at least one account in **Connected** status.

| # | File | Route / state | What must be visible | Alt text to use |
|---|---|---|---|---|
| 1 | `images/ad-tracking/integrations/paypal/01-connect-dialog.png` | Settings → Integrations → **Connect** on the PayPal card | The **Connect PayPal** dialog with the **Before you start** block, all four numbered steps, the **Required** badge on Transaction Search, and both empty fields | The Connect PayPal dialog showing the four setup steps with a Required badge beside Tick Transaction Search, and empty Client ID and Secret fields below them. |
| 2 | `images/ad-tracking/integrations/paypal/02-accounts-connected.png` | Settings → Integrations → **PayPal Accounts** panel, at least one account connected | The table with **Account Name**, **Account ID**, **Currency**, **Last Synced**, **Primary**, **Status**, and a green **Connected** badge | The PayPal Accounts table listing one connected account with a green Connected status badge, alongside Disconnect, refresh, and connect buttons. |
| 3 | `images/ad-tracking/integrations/paypal/03-enabling-access.png` | Same panel, an account in `pending_permission` | The amber **Enabling access** badge with its clock icon | The PayPal Accounts table showing an account with an amber Enabling access badge, the state that appears while PayPal activates the Transaction Search permission. |
| 4 | ✅ **DONE** `images/ad-tracking/conversion-sources/paypal/01-paypal-form.png` | Create Conversion Source dialog, Integration set to **PayPal**, account chosen, **PayPal Event** dropdown open | All four events with their category badges | *(embedded)* |
| 5 | ✅ **DONE** `images/ad-tracking/conversion-sources/paypal/02-paypal-event-selected.png` | Same dialog, **Payment Captured** selected | Payment Filters, event summary panel, and the timing note | *(embedded)* |

Embed 1 in `1-connect-integrations.mdx` at the **Connecting PayPal** steps, and 2 and 3 in the same
section near the Warning. 4 and 5 are already embedded in the **PayPal** accordion in
`4-conversion-tracking.mdx`.

Captures 1 to 3 need a PayPal **connect dialog** and a **PayPal Accounts** panel. Capture 1 needs no
connected account at all (the dialog opens from the Connect button on the PayPal card), so it is the
cheapest one left. Capture 3 needs an account genuinely stuck in `pending_permission`, which cannot
be staged without a real PayPal app that has Transaction Search switched off.

## LinkedIn Ads

Prerequisite: a business with LinkedIn connected via OAuth, on a LinkedIn user with at least one
Sponsored Account carrying campaign groups.

| # | File | Route / state | What must be visible | Alt text to use |
|---|---|---|---|---|
| 1 | `images/ad-tracking/integrations/linkedin/01-accounts-table.png` | `/business/<id>/settings?tab=integrations&linkedin=open` | The **LinkedIn Ads** modal header, the accounts table with all six columns, the **Sync period** dropdown, and the **Save Changes** button | The LinkedIn Ads settings modal showing the accounts table with Account Name, Account ID, Currency, Campaigns, Last Synced, and Status columns, plus the sync period dropdown and Save Changes button. |
| 2 | `images/ad-tracking/integrations/linkedin/02-sync-period.png` | Same, **Sync period** dropdown open | All five options from Last 7 days to Last 12 months | The open sync period dropdown on the LinkedIn Ads settings modal, listing Last 7 days, Last 30 days, Last 3 months, Last 6 months, and Last 12 months. |
| 3 | `images/ad-tracking/integrations/linkedin/03-campaign-picker.png` | Same, campaign count clicked | The **Select Campaigns** popover with the count badge, search box, Select all / Clear, campaign rows showing name plus ID plus status, and **Save selection** | The Select Campaigns popover open over the LinkedIn accounts table, listing campaign groups with their IDs and status badges above a Save selection button. |

Embed 1 and 2 in the **Connecting LinkedIn Ads** steps in `1-connect-integrations.mdx`. Embed 3
there too, and consider reusing it in the **LinkedIn Ads** accordion in `5.mdx` beside "Where to
find the IDs", since that popover is where the campaign group IDs are read from.

---

## Open `TODO: verify` items that a capture session should also settle

Both are in the **LinkedIn Ads** accordion in `5.mdx` and both concern surfaces outside our app:

1. **LinkedIn Campaign Manager.** The exact name and location of the destination URL field on a
   creative, and where LinkedIn surfaces campaign and creative IDs. Confirm too that LinkedIn still
   offers no dynamic URL macros. Needs a real LinkedIn Campaign Manager account.
2. **The URL Params column on a LinkedIn ad row.** Cortana validates Meta, Google, Bing, and TikTok
   only, so confirm by observation what the column actually renders for LinkedIn: a grey
   "Not applicable" dash, an empty cell, or a red error. If it renders red, that is a product bug
   worth raising rather than a doc to write around.
