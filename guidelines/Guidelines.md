<!-- make-kit-guidelines -->
## Design System Setup — MANDATORY

This project depends on `@make-kits/core-brand-assets` packages. Before writing
any code:

1. Read guidelines/setup.md and guidelines/Guidelines.md by their exact
   path (e.g. node_modules/<scope>/<package>/guidelines/setup.md).
   This project uses pnpm, which symlinks packages — do NOT use
   `find`, `glob`, or `file_search` to discover files as they silently
   fail on symlinks. Instead use: reading files by exact path,
   `ls` (follows symlinks), `find -L` (`-L` follows symlinks), or `cat`.
2. Execute all setup instructions (install dependencies, config changes) against THIS project — not the package itself.
3. Do not skip, modify, or improvise any setup steps.
4. Read ALL other required .md files specified in guidelines/Guidelines.md.
5. Verify that all packages specified in setup.md appear in this project's package.json and that all required .md files have been read before proceeding.
<!-- /make-kit-guidelines -->

# CoreBrandAssets Guidelines

## Fonts

Three typefaces. Load via Adobe Fonts (Typekit) — add the embed `@import` to `src/styles/fonts.css`.

| Token | Family | Weight | Use |
|---|---|---|---|
| `--font-display` | Chapman | 700 | H1 / TitleBig |
| `--font-serif` | Meno Text | 400 | H2, H3, Subheading |
| `--font-body` | Adelle Sans | 400 | Body, labels, buttons |

### Type scale
| Name | Size | Family | Weight |
|---|---|---|---|
| TitleBig | 96px | Chapman | 700 |
| H1 | 48px | Chapman | 700 |
| H2 | 48px | Meno Text | 400 |
| H3 | 36px | Meno Text | 400 |
| Subheading | 12px | Meno Text | 400 |
| BiggerBodyText | 24px | Adelle Sans | 400 |
| Body | 16px / 14px | Adelle Sans | 400 |

## Colors

Use the CSS custom properties below (defined in `theme.css`). Never hardcode hex values.

| Token | Hex | Role |
|---|---|---|
| `--brand-white` | #ffffff | White |
| `--background` (`--brand-cream`) | #f9f6e7 | Page background |
| `--muted` (`--brand-gold-light`) | #ead596 | Muted surfaces |
| `--secondary` (`--brand-gold`) | #cba62a | Secondary buttons |
| `--accent` (`--brand-teal-light`) | #bedbd8 | Accent surfaces |
| `--brand-teal` | #6ec2c4 | Teal accent |
| `--brand-blue` | #4e739f | Blue accent |
| `--muted-foreground` (`--brand-navy`) | #465566 | Muted text |
| `--destructive` (`--brand-red`) | #833337 | Error / destructive |
| `--foreground` (`--brand-primary`) | #1d2758 | Default body text |
| `--brand-charcoal` | #2f2f30 | Dark surfaces |
| `--primary` | #1d2758 | Primary buttons / headings |
