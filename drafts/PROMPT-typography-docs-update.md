# Update prompt: text size, font and space above (calendar and forms)

Paste everything below the line into a fresh session. It is self-contained. Written 2026-09-09
from the source on branch `new-form-feature` of the app repo, every fact below read from a file
and line, and cross-checked by a second pass.

---

You are a senior technical writer updating the Cortana / AgentKong help documentation on
Mintlify. You are NOT writing new pages. You are updating existing pages so they stop saying
things that are no longer true, and so they explain one new feature that lives on two products.

## THE ONE RULE THAT MATTERS MOST

**Everything you write must be something you have seen.** Open the app, click the control, read
its label, read its hint, drag it and watch what the preview does. Section 3 of this prompt gives
you every label, number and sentence from the source so you know what to look for, but the
screenshot and the sentence come from the screen, not from this prompt.

If something in this prompt and something on the screen disagree, the screen wins. Write
`TODO: verify: <what you saw>` and move on. A gap is fine. An invention is not.

## INPUTS

- **Feature:** a form-wide **Font** and text **Size**, plus a per-question **Text size** and
  **Space above**. It exists on the booking calendar builder and on the forms builder, with the
  same controls, the same numbers and the same words, on purpose.
- **App repo, the source of truth for labels and behaviour:**
  `/Users/kavitha/Public/Development/AgentKong_App` (branch `new-form-feature`)
- **Docs repo, where you write:** `/Users/kavitha/Public/Development/docs`
- **Pages to change:** `cal-calendars.mdx`, `forms-design.mdx`, `forms-build.mdx`, and one line
  each in `forms-overview.mdx`, `forms-create.mdx`, `forms-share.mdx`. No new page. No change to
  `docs.json`.
- **House style:** the existing `cal-*.mdx` and `forms-*.mdx` pages. Match them exactly.
- **App and login:** the same preview deployment and login used by the earlier Forms and
  Calendar docs prompts in this folder. Business: **kavitha/testing**. If the login fails or the
  builders are missing the Typography block, STOP and ask.
- **Dark mode screenshots:** required on the forms pages (they use light and dark pairs). The
  calendar page uses one image per Frame with no dark pair. Follow each page's own convention.

## 1. What changed, in one paragraph each

**Calendar.** In the calendar builder's **Questions** tab, the right column's **Calendar** view
now has a **Typography** block for BOTH calendar types (Calendar Combo and Application + Cal).
Before this, only Application + Cal had a font, and neither had a size. The block has a **Font**
select, a **Size** slider from 12 to 24px (default 16), and a **Reset theme and typography**
link. In **Field settings**, every question now has a **Text size** slider and a **Space above**
slider. Both read **Match form** until you move them.

**Forms.** The forms builder's **Form** tab now has the same **Typography** block, between
**Colors** and **Behaviour**. Before this, forms had no font and no size at all, and the docs say
so in three places. **Field settings** has the same two sliders, between the question's
type-specific settings and the **Logic** box.

**Public pages.** Everything the visitor reads scales with the size: question titles, help text,
choices, buttons, page titles, error lines, the boxes people type in. The boxes never go below
16px, so phones do not zoom in when someone taps one. The progress band at the top does not
scale. A question's own Text size changes only that question. Space above replaces the normal
gap above that question, it does not add to it, and 0 pulls the question flush against the one
above.

## 2. Reading level and style: a hard gate

Match the pages you are editing. The Calendar pages average under ten words a sentence. Second
person. One idea per sentence. Bold for every on-screen label exactly as it appears
(**Text size**, **Match form**). Italic for a hint quoted from the screen. Backticks for values
(`16px`). Numbers as words in prose (twelve, five), digits in tables and quoted UI. Steps
components with short imperative titles. No em dashes anywhere, use commas and full stops.

Explain the feature the way you would to a shop owner who has never heard the word
"typography". Say "make the writing bigger", not "adjust the type scale". The word
"Typography" appears in the docs only because it is the heading on the screen.

## 3. Verified facts (labels, numbers, sentences)

Every item was read from the working tree. File paths are for your own checking, never for the
docs.

### 3.1 The Typography block (identical on both builders)

Source: `src/components/calendar/design-panel-typography.tsx`, `src/lib/form-kit/fonts.ts`,
`src/lib/form-kit/theme.ts`.

- Heading on screen: **Typography** (rendered in capitals, like **Colors**).
- **Font**: a select. Options, in this order: **Inter**, **Roboto**, **Open Sans**, **Lato**,
  **Poppins**, **Montserrat**, **System**. It shows **Inter** when nothing has ever been chosen.
  **System** means the visitor's own device font (the one their phone or computer uses for
  everything). Inter is the app's own font.
- **Size**: a slider. Range 12 to 24, one step at a time, default 16. The readout to the right
  shows the number and `px`, for example `16px`.
- Hint under the slider, verbatim: *Sets the base size for the whole form. Default is 16px.
  Inputs never go below 16px, so phones do not zoom on them.*
- The middle column repaints while you drag, not only when you let go.
- Link under the block: **Reset theme and typography**. It puts back the shipped theme for the
  mode you are in (Sage if you are on a light theme, Midnight if dark), all five colours, the
  font (back to Inter) and the size (back to 16). It does NOT touch the calendar type, the
  header switches, Transition, Sticky Contact, the logo, the progress band, or any per-question
  Text size or Space above.
- After the reset a toast reads **Theme and typography reset** with an **Undo** button. It stays
  for ten seconds. Undo puts every value back.
- Clicking a theme tile changes the colours only. It never changes the font or the size.

### 3.2 Field settings: the two sliders (identical on both builders except one word)

Source: `src/components/calendar/field-settings-typography.tsx`.

- Row one: **Text size**. Range 12 to 24, step 1. Readout: **Match form** until you move it,
  then the number, for example `18px`. Once set, a link **Match the form's size** appears; click
  it to go back to following the form.
- Its info button (the small i) shows, on the calendar: *Makes just this question bigger or
  smaller. Every other question keeps the form's size, which you set under Calendar. Inputs
  never go below 16px so phones do not zoom on them.* On forms the same sentence says
  *under Form*.
- Row two: **Space above**. Range 0 to 96, step 1. Readout: **Match form** or the number. Once
  set, a link **Match the form's spacing** appears.
- Its info button shows: *Pushes just this question down, so it reads as the start of a new
  section. Every other question keeps the form's spacing. Set it to 0 to pull it up against the
  question above it.*
- Moving a handle is what turns the override on. There is no switch.
- When a row reads **Match form**, the handle sits where the form really is: Text size at the
  form's Size, Space above at the gap the form actually draws. At the default size that gap is
  20px. For the first question on a page it reads 0, because there is nothing above it. The
  space grows with the size (15px at 12, 30px at 24).
- The two rows have no heading of their own. Describe them by their labels.
- Where they sit. Calendar: after **Required** and **Hide field till ready**, before **Opt-in
  consent** (Name and Email questions only) and the **Lead score** box. Forms: after
  **Placeholder** / **Options** / the question's own settings, before **Logic**. On forms they
  appear on every kind of question, including display-only blocks.

### 3.3 Saving

- Calendar: the sliders make the page dirty. The **Save** button at the top enables, then reads
  **Saving...** and **Saved**. Nothing reaches the live page until you save.
- Forms: no save button. The chip at the top right reads **Saving** and then **Saved** shortly
  after you stop dragging (about half a second). A live form shows the change on its next load.
  Nothing to republish.
- Duplicate copies the font, the size and every per-question setting, on both products. A form
  imported from another tool starts at Inter, 16, with no per-question settings.
- **Change type** on a question keeps its Text size and Space above.

### 3.4 What the visitor sees

- Bigger size: bigger question titles, help text, choices, buttons, page titles, error lines,
  and the boxes people type in. Smaller size: the same, except the boxes never go below 16px.
- Not affected: the progress band at the top (the form name and the "% done" line) and the
  small business name line on the booking page. Do not promise they change.
- Space above replaces the gap. Setting 40 gives 40px above that question, not 40 plus the
  usual 20. Setting 0 puts the question right against the one above, which is how two short
  fields read as one group.
- Embedded calendars and forms get the same font, size and per-question settings. The booking
  page's cancel and reschedule page gets the font only.
- On the forms builder, the card payment box (Stripe) also follows the size.

### 3.5 Things that DO NOT EXIST (never document these)

- No corner radius, line height, letter spacing, or per-page size.
- No per-question font. The font is for the whole form.
- No logo or background picture on forms (still true).
- No named sizes such as Small / Medium / Large. It is a number.
- No undo on the per-question sliders beyond the **Match the form's ...** links. Only the reset
  link has an Undo toast.
- The calendar builder has an old, hidden "Font Family" select reachable only by hand-editing
  the address bar. Do not document it or its "Default (System)" option.

## 4. Page by page: exactly what to change

Line numbers were true on 2026-09-09. Re-find each sentence with a search before editing; they
move.

### 4.1 `cal-calendars.mdx`

1. Section **3. Build the Booking Form**, step **Style the booking page** (around line 205).
   The sentence *Under **Calendar** you can set five things.* is wrong. Rewrite the whole
   bullet list so it matches the panel top to bottom: **Calendar type**; the **Booking page
   header** switches (**Hide title**, **Hide business name**, and **Hide duration** on
   Application + Cal only); **Transition** and **Sticky Contact**; **Theme**; **Colors**
   (five: **Background**, **Text**, **Accent**, **Button**, **Button Text**, the current text
   lists four); **Typography** (**Font**, **Size**, and the **Reset theme and typography**
   link); **Logo**. Drop the count, or make it right.
2. Same step: add one sentence that the preview moves as you drag **Size**, and that the
   **Desktop** and **Mobile** buttons show the size on both.
3. Add a new Step to the same Steps block, titled something like **Pick a font and a text
   size**, with a Frame. Cover: where the block is, the seven fonts, the slider and its range,
   the hint, what Reset does and its Undo. One Frame, one image.
4. Section **4. Score Your Leads**, step **Open a question's field settings** (around line
   232): *Then scroll down to the **Lead score** box at the bottom* is still true, but the alt
   text of `15-lead-scoring.png` (around line 251) lists the panel's rows and is now wrong.
   Either retake that image or fix the alt text to include **Text size** and **Space above**.
5. Add a short Step, or a `<Note>`, in section 3 for the per-question sliders: **Text size**
   and **Space above**, **Match form**, the two reset links, the first-question 0 rule. Keep it
   to five or six sentences and one Frame.
6. **Settings Reference**, table **Booking page** (around lines 505 to 512): add rows for
   **Font** (default Inter), **Size** (default `16px`, range 12 to 24), **Text size** and
   **Space above** (default Match form, ranges 12 to 24 and 0 to 96), and **Reset theme and
   typography**. Fix the **Colors** row to five colours. Keep the existing column shape.
7. Do not touch `cal-events.mdx`, `cal-overview.mdx`, `cal-business-cal.mdx` or
   `cal-schedule.mdx` beyond, optionally, one clause on the overview's Calendars row saying
   the tab also sets the look of the page.

### 4.2 `forms-design.mdx`

1. Frontmatter `description` (line 3) and the Overview sentence *The **Form** tab on the right
   sets the look. Colours, how pages move, and whether a progress bar shows.* (line 14): add
   the font and the text size.
2. Section **1. Pick A Look**, step **Open the Form tab**: *Three sections appear: **Theme**,
   **Colors** and **Behaviour**.* (line 36) becomes four, in this order: **Theme**, **Colors**,
   **Typography**, **Behaviour**. Fix the alt text of `01-form-tab.png` (lines 39 to 40), which
   lists three sections. Retake that image.
3. Insert a new numbered section between **2. Set Your Own Colours** and **3. Set How It
   Behaves**, titled in the page's own style (for example **3. Pick A Font And A Text Size**).
   Renumber the sections after it. Fix the cross-reference *Section 5 covers that.* (around
   line 156) to the new number. Cover the font list, the slider, the hint, that the preview
   repaints as you drag, the reset link and its Undo, and that clicking a theme tile does not
   change font or size.
4. The `<Note>` at lines 125 to 127: *There is no font, corner, logo or background picture
   setting.* and *The **Form** tab holds exactly what is listed above and nothing else.* Both
   are now wrong on the font. Rewrite: no corner, logo or background picture setting; the font
   and the text size are under **Typography**.
5. Section **3. Set How It Behaves** (now 4): the Frame `04-behaviour.png` (caption line 117)
   was taken before the Typography block existed. Retake it, because the block now sits
   between Colors and Behaviour.
6. **Settings Reference**, table **The Form tab** (lines 241 to 250): add rows **Font**,
   **Size** and **Reset theme and typography** between **Button Text** and **Transition**. Fix
   the **Theme** row (*Clicking one fills in all five colours.*) to say it fills the colours
   only, not the font or size.
7. **Troubleshooting**, accordion *My theme tile is no longer ringed* (lines 280 to 283): the
   fix line *Click the tile again to put all five back.* is still right for colours; add that
   font and size are separate, and that **Reset theme and typography** puts everything back
   with an Undo.
8. **FAQ**, accordion *Can I change the font?* (lines 338 to 340): the answer is now yes.
   Rewrite it: where, the seven fonts, and that the preview repaints. Leave the logo and
   background picture accordions as they are; they are still true.
9. Add FAQs, in the page's voice: *Can I make the writing bigger?* (Size, 12 to 24, default
   16, boxes never below 16px); *Can one question be bigger than the rest?* (Field settings,
   Text size); *Why does the slider say Match form?* (no setting on that question yet).

### 4.3 `forms-build.mdx`

1. Section **3. Change One Question's Settings**, step **Open Field settings** (around line
   140): *Under that come three boxes every question has.* Placeholder is not on every kind,
   and every question now also has the two sliders. Rewrite the count out, or list what really
   is on every kind.
2. Add a Step between **Open Field settings** and **Decide whether people must answer**, in
   the panel's own order, for **Text size** and **Space above**: what each does, **Match form**,
   the info buttons, the two **Match the form's ...** links, the first-question 0 rule, and that
   the middle column moves as you drag. One Frame.
3. Step **Decide whether people must answer** (around line 153): *Scroll down to the three
   switches at the bottom.* Still three switches; add that you pass the two sliders and the
   Logic box on the way.
4. Retake `05-field-settings.png`, `06-required.png`, `09-logic.png` and
   `01-builder-columns.png` (with their dark pairs). Each shows the right column without the
   sliders. Their captions can stay.
5. **Settings Reference**, table **Every question** (lines 426 to 437): add rows **Text size**
   and **Space above** between **Options** and **Logic**. Defaults: *Match form*. Watch out for:
   the first question on a page shows 0 for Space above. Do NOT add them to the **Only on some
   kinds** table; they are on every kind.
6. **FAQ**, accordion *Can I undo something?* (around line 528): *No. There is no undo, no redo
   and no version history.* Add the one exception: **Reset theme and typography** on the Form
   tab shows an **Undo** for ten seconds.
7. Add Troubleshooting entries in the page's voice: *One question is bigger than the others*
   (it has its own Text size; open Field settings and click **Match the form's size**); *There
   is a big gap above one question* (Space above; click **Match the form's spacing**); *Space
   above says Match form but shows 0* (it is the first question on its page).

### 4.4 One-line touches

- `forms-overview.mdx` card for Design And Endings (around line 73): add the font and the
  text size to the blurb.
- `forms-create.mdx` card (around line 405): same.
- `forms-share.mdx` line 213 (*with the form name and a progress line above the questions*):
  add *in your chosen font*. The page's own TODO says every image there is retaken when Forms
  ships; the public form shot will then show the font.
- `forms-answers.mdx`: nothing.

## 5. Screenshots

Conventions: the forms pages use a light and dark pair per Frame, `className="block dark:hidden"`
and `className="hidden dark:block"`, under `/images/forms/<page>/NN-name.png` and
`NN-name-dark.png`, 2880 by 1800, a purple box with a numbered badge on the thing the caption
talks about. The calendar page uses one image per Frame under `/images/appointments/calendars/`.

New images:
- Forms design: the Typography block with **Font**, **Size** and its readout, the hint, and the
  **Reset theme and typography** link. Name it to sort between 03 and 04 (for example
  `03b-typography.png`) or renumber 04 to 08.
- Forms build: the two slider rows in Field settings, one reading **Match form** and the other
  a number with its **Match the form's ...** link. Name it to sort after 05.
- Calendar: one image of the Calendar view with the Typography block, and one of Field settings
  with the two sliders.

Retakes: `forms/design/01-form-tab`, `forms/design/04-behaviour`, `forms/build/01-builder-columns`,
`forms/build/05-field-settings`, `forms/build/06-required`, `forms/build/09-logic`, and
`appointments/calendars/15-lead-scoring` (or fix its alt text).

Take every forms screenshot in light and in dark. Use the kavitha/testing business. Put a real
value on one slider (for example Text size 14, Space above 60 on the Email question) so the
readout and the reset link are visible, then put it back to **Match form** when you are done.

## 6. Acceptance checklist

- [ ] No page says there is no font setting on forms.
- [ ] Every enumeration of the Form tab or the Calendar view lists **Typography**.
- [ ] Every enumeration of Field settings lists **Text size** and **Space above**.
- [ ] Every number matches section 3: 12 to 24, default 16, 0 to 96, 20px, ten seconds.
- [ ] Every label is bold and spelled exactly as on screen, including **Match form**,
      **Match the form's size**, **Match the form's spacing**, **Reset theme and typography**.
- [ ] Nothing from section 3.5 is documented.
- [ ] The renumbered sections and the *Section N covers that* cross-references agree.
- [ ] `mint broken-links` is clean.
- [ ] No em dashes anywhere in the changed files.
- [ ] Every new or retaken image exists in light and, on the forms pages, in dark.
- [ ] Work is on a `docs/typography` branch, never merged. Matei reviews.
