# Screenshot capture list — PayPal + LinkedIn Ads

Every page in this change was written to stand alone with **no images**, so nothing is blocked on
this list. These captures are an upgrade, not a dependency.

**Why they were not taken:** the states that matter (a connected PayPal account, a LinkedIn account
list with real ad accounts) need a test business with both integrations genuinely connected. An
empty-state screenshot captioned as the real thing would be worse than no screenshot.

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
| 4 | `images/ad-tracking/conversion-sources/paypal/01-paypal-form.png` | Create Conversion Source dialog, Integration set to **PayPal**, account chosen, **PayPal Event** dropdown open | All four events with their category badges: Payment Captured, First PayPal Purchase, Subscription Payment, Payment Refunded | Create Conversion Source dialog with Integration set to PayPal, showing the required PayPal Account dropdown above the open PayPal Event list with its four events and category badges. |
| 5 | `images/ad-tracking/conversion-sources/paypal/02-timing-note.png` | Same dialog, event selected, scrolled to the bottom | The event summary panel and the clock-icon timing note about 20 minutes to 3 hours | The PayPal source form with an event selected, showing the summary panel and the note explaining that payments taken inside PayPal appear 20 minutes to 3 hours later. |

Embed 1 in `1-connect-integrations.mdx` at the **Connecting PayPal** steps, 2 and 3 in the same
section near the Warning, 4 and 5 in the **PayPal** accordion in `4-conversion-tracking.mdx`.

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
