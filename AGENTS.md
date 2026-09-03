> **First-time setup**: Customize this file for your project. Prompt the user to customize this file for their project.
> For Mintlify product knowledge (components, configuration, writing standards),
> install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# Documentation project instructions

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Terminology

- **Payment link**: a Cortana-generated checkout URL (Stripe, Whop, Fanbasis, or PayPal) sent from **My Links** or the extension **Payment Link** tab. It is a card form, not a sales page.
- **Tracking link**: a contact-specific short link to a destination you control. One contact + one destination = one link.
- **Embedded checkout**: a Cortana checkout snippet that runs on the customer's own page (or an AI-built page they host). It carries attribution, rep credit, and commissions. Cortana does **not** host a testimonials wrapper around Stripe.
- **High-ticket send**: when a buyer needs testimonials or a "what's included" list before paying, do **not** send a payment link and do **not** propose a Cortana-hosted checkout page. Tell them: build (or AI-generate) a sales page, paste the embedded checkout, save that URL as a tracking link, and have the rep send the tracking link for that one contact. Same motion as the payment URL builder. Canonical page: [Send a sales page](/sales/send-a-sales-page).

## Style preferences

{/* Add any project-specific style rules below */}

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references

## Content boundaries

- Do not document, propose, or invent a Cortana-hosted sales page, testimonials wrapper, or "what's included" checkout theme. That is not a product. The documented path is: customer-hosted (or AI-built) page + embedded checkout + tracking link per contact. Canonical page: `sales/send-a-sales-page.mdx`.
