# Brand Management Design System

**Version 1.0** • Production-ready design system for B2B SaaS brand management and AI-powered brand governance

---

## Overview

This design system provides a complete, token-based foundation for building professional, enterprise-ready brand management tools. It emphasizes clarity, trust, and scalability with a calm, confident aesthetic.

**Target Users:** Designers, agencies, and enterprise brand teams  
**Philosophy:** Professional, understated, system-driven — "everything is under control"

---

## Color System

### Primary Colors


| Token | Hex (Light) | Hex (Dark) | Usage | Contrast Ratio |
|-------|-------------|------------|-------|----------------|
| `--primary` | #111827 | #ffffff | Primary actions, headers | 18:1 (WCAG AAA) |
| `--primary-accent` | #3b82f6 | #3b82f6 | Highlights, links, interactive elements | 4.5:1 (WCAG AA) |
| `--background` | #f8fafc | #0f172a | Page background | — |
| `--foreground` | #0f172a | #f1f5f9 | Primary text | 18:1 (WCAG AAA) |

### AI Accent Colors

| Token | Hex (Light) | Hex (Dark) | Usage | Notes |
|-------|-------------|------------|-------|-------|
| `--ai-accent` | #7c3aed | #8b5cf6 | AI-powered features only | Use sparingly |
| `--ai-accent-hover` | #6d28d9 | #7c3aed | AI element hover states | — |
| `--ai-accent-light` | #f5f3ff | #2e1065 | AI feature backgrounds | Subtle emphasis |

**Usage Rules:**
- AI accent should only be used for AI-specific features (scans, recommendations, governance)
- Never use AI accent for general UI elements
- Always pair with Sparkles icon to reinforce AI context
- Keep AI UI calm and helpful, never alarming

### Neutral Scale (Slate)


Complete grayscale from 50 (lightest) to 900 (darkest):

| Token | Hex | Usage |
|-------|-----|-------|
| `slate-50` | #f8fafc | Subtle backgrounds |
| `slate-100` | #f1f5f9 | Surface backgrounds |
| `slate-200` | #e2e8f0 | Borders, dividers |
| `slate-300` | #cbd5e1 | Strong borders |
| `slate-400` | #94a3b8 | Disabled text |
| `slate-500` | #64748b | Secondary text |
| `slate-600` | #475569 | Muted text |
| `slate-700` | #334155 | Dark borders |
| `slate-800` | #1e293b | Dark surfaces |
| `slate-900` | #0f172a | Dark backgrounds |

**Usage Guidelines:**
- **50-200:** Backgrounds, surfaces, subtle dividers
- **300-400:** Borders, disabled states
- **500-600:** Secondary text, icons
- `--text-primary` | #0f172a | #f1f5f9 | Primary text |
| `--text-secondary` | #64748b | #94a3b8 | Secondary text |
| `--text-tertiary` | #94a3b8 | #64748b | Tertiary text |
| `--text-disabled` | #cbd5e1 | #475569 | Disabled states |

---

## Typography

### Font Stack


**Sans Serif (Primary):** Inter  
- Clean, highly legible, optimized for long reading sessions
- Use for all UI text, data tables, and body content
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Monospace:** Geist Mono  
- Use for code, technical data, file names, version numbers

### Type Scale

| Name | Size | Line Height | Weight | Letter Spacing | Usage | Class |
|------|------|-------------|--------|----------------|-------|-------|
| Display Large | 60px | 1.1 | 700 | -0.02em | Marketing only | `.text-display-lg` |
| Display Medium | 48px | 1.15 | 700 | -0.02em | Hero sections | `.text-display-md` |
| Heading XL | 36px | 1.2 | 700 | -0.01em | Page titles | `.text-heading-xl` |
| Heading Large | 30px | 1.3 | 600 | -0.01em | Section headers | `.text-heading-lg` |
| Heading Medium | 24px | 1.4 | 600 | — | Card headers | `.text-heading-md` |
| Heading Small | 20px | 1.4 | 600 | — | Subsections | `.text-heading-sm` |
| Body Large | 18px | 1.6 | 400 | — | Introductory text | `.text-body-lg` |
| Body Medium | 16px | 1.6 | 400 | — | Default body text | `.text-body-md` |
| Body Small | 14px | 1.5 | 400 | — | Secondary text | `.text-body-sm` |
| Label Large | 14px | 1.4 | 500 | 0.01em | Form labels | `.text-label-lg` |
| Label Medium | 13px | 1.4 | 500 | 0.01em | Metadata | `.text-label-md` |
| Label Small | 12px | 1.4 | 600 | 0.05em | Uppercase labels | `.text-label-sm` |
| Caption | 12px | 1.5 | 400 | — | Helper text | `.text-caption` |
| Overline | 11px | 1.5 | 700 | 0.08em | Section labels (uppercase) | `.text-overline` |

**Guidelines:**
- Use `text-balance` for headings to prevent orphans
- Use `text-pretty` for body text for optimal readability
- Never use decorative fonts
- Maintain minimum 16px font size for body text (14px acceptable for labels/captions)
- Tighter letter spacing on large headings creates modern, premium feel

---

## Spacing System

**Base Unit:** 8px (with 4px micro-adjustments)

| Token | Value | Tailwind | Common Usage |
|-------|-------|----------|--------------|
| `0.5` | 2px | `gap-0.5`, `p-0.5` | Micro spacing |
| `1` | 4px | `gap-1`, `p-1` | Tight spacing |
| `2` | 8px | `gap-2`, `p-2` | Compact elements |
| `3` | 12px | `gap-3`, `p-3` | Small padding |
| `4` | 16px | `gap-4`, `p-4` | Standard spacing |
| `5` | 20px | `gap-5`, `p-5` | Medium padding |
| `6` | 24px | `gap-6`, `p-6` | Card padding |
| `8` | 32px | `gap-8`, `p-8` | Section spacing |
| `10` | 40px | `gap-10`, `mb-10` | Large spacing |
| `12` | 48px | `gap-12`, `mb-12` | Large gaps |
| `16` | 64px | `gap-16`, `py-16` | Major sections |

**Layout Recommendations:**
- Card padding: `p-4` to `p-6` (16-24px)
- Section margins: `mb-8` or `mb-12` (32-48px)
- Form field gaps: `gap-4` to `gap-6` (16-24px)
- Button gaps: `gap-2` to `gap-3` (8-12px)
- Container max-width: `max-w-7xl` (1280px)

### Border Radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--radius-sm` | 0.375rem | `rounded-sm` | Tags, small badges |
| `--radius-md` | 0.5rem | `rounded-md` | Inputs, small cards |
| `--radius-lg` | 0.75rem | `rounded-lg` | Cards, modals |
| `--radius-xl` | 1rem | `rounded-xl` | Large cards |
| `--radius-full` | 9999px | `rounded-full` | Pills, avatars |

---

## Shadows


| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sleek` | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation |
| `shadow-card` | 0 4px 6px rgba(0,0,0,0.02) | Cards, panels |
| `shadow-float` | 0 10px 15px rgba(0,0,0,0.05) | Elevated elements |

**Guidelines:**
- Use shadows sparingly in light mode
- Disable shadows in dark mode (rely on borders)
- Combine with backdrop-blur for modern glass effect on headers

---

## Components

### Buttons

**Variants:**

1. **Primary** - Main actions (create, save, confirm)
   - Background: `--primary` (#111827 light / #ffffff dark)
   - Hover: Slightly reduced opacity
   - Text: `--primary-foreground`
   - Shadow: `shadow-lg` on hover

2. **Secondary** - Supporting actions
   - Background: `--card`
   - Border: `--border`
   - Text: `--foreground`
   - Hover: `--muted` background

3. **Ghost** - Minimal actions (toolbar, icon buttons)
   - Transparent background
   - Hover: `--muted`
   - No border

4. **Destructive** - Delete, remove actions
   - Background: `--error` (#dc2626)
   - Text: white
   - Hover: Darker shade

**Sizes:**
- Small: `px-3 py-1.5 text-xs` (28px height)
- Default: `px-5 py-2.5 text-sm` (40px height)
- Large: `px-6 py-3 text-base` (48px height)

**States:**
- `:hover` - Opacity 90% or background change
- `:active` - `scale-95` transform
- `:focus` - Ring outline (`ring-2 ring-ring`)
- `:disabled` - Opacity 50%, cursor not-allowed

### Inputs & Forms

- Height: 40px (`h-10`)
- Border: 1px solid `--input`
- Border radius: `rounded-lg`
- Padding: `px-4`
- Focus: `ring-2 ring-ring`
- Placeholder: `text-slate-400`
- Disabled: Background `--muted`, text `--text-disabled`

**Form Layout:**
- Label above input with `mb-2`
- Input groups use `gap-4` to `gap-6`
- Helper text in `text-caption` below input

### Cards

- Background: `--card`
- Border: 1px solid `--border`
- Border radius: `rounded-lg`
- Shadow: `shadow-card`
- Padding: `p-4` to `p-6`
- Hover: `shadow-float` transition

### Navigation

**Top Nav:**
- Height: 64px (`h-16`)
- Background: `--card/80` with `backdrop-blur-md`
- Border bottom: `--border`
- Sticky positioning
- Logo left, actions right

**Side Nav:**
- Width: 256px (`w-64`)
- Background: `--card`
- Border right: `--border`
- Collapsible with details/summary
- Active state: Blue accent border

### Status Badges

Pre-built status indicators with pill shape (`rounded-full`):

| Status | Color | Indicator Dot | Usage |
|--------|-------|---------------|-------|
| Active | Success green | Green dot | Live, operational |
| Pending | Warning orange | Orange dot | Awaiting review |
| Error | Error red | Red dot | Issues, failed |
| Info | Info cyan | Cyan dot | Information |
| Inactive | Neutral gray | No dot | Disabled, archived |

**Structure:** `px-3 py-1 rounded-full flex items-center gap-1.5`

### Data Tables

- Header background: Transparent
- Header text: `text-label-md uppercase`, `text-slate-500`
- Row border: Bottom border only
- Row hover: `bg-slate-50` (light) / `bg-slate-800` (dark)
- Cell padding: `px-4 py-3`
- Zebra striping: Optional, use sparingly

---

## AI-Specific UI

### Confidence Indicators

Show AI analysis confidence with progress bars:

**High Confidence (90%+)**
- Color: Success green
- Label: "High" or percentage
- Message: Affirm quality

**Medium Confidence (60-89%)**
- Color: Warning orange
- Label: "Medium" or percentage
- Message: Suggest review

**Low Confidence (<60%)**
- Color: Error red
- Label: "Low" or percentage
- Message: Recommend verification

**Visual Treatment:**
- Progress bar with colored fill
- Percentage and label on right
- Height: 8px (`h-2`)
- Rounded full

### AI Recommendations

Helpful suggestions with purple AI accent:

**Structure:**
- Light purple background (`--ai-accent-light`)
- Purple border
- Sparkles icon in colored box
- Title: "AI Suggestion"
- Description: Clear explanation
- Actions: "Apply Fix" (primary), "Dismiss" (ghost)

**Tone:**
- Professional, never playful
- "Consider standardizing" not "You should fix"
- "Recommend" not "You need to"
- Helpful, not demanding

### Scan Results

Two primary states:

**All Clear:**
- Success green background
- Large checkmark icon in circle
- Bold "All Clear" title
- Affirmative message

**Issues Found:**
- Warning orange background
- Number badge with count
- Bold "[N] Issues Found" title
- "Review Issues →" link

**Guidelines:**
- Never use red for issues (too alarming)
- Orange suggests attention, not panic
- Provide clear next action

---

## Empty States

Clean, centered layout with generous spacing:

**Structure:**
1. Icon (48x48px, `text-slate-400`)
2. Title (`.text-heading-sm`, centered)
3. Description (`.text-body-sm`, `max-w-md`, centered)
4. Primary action button

**Copy Guidelines:**
- Clear and direct: "No assets yet"
- Explain next step: "Upload your first brand asset to get started"
- Single action: "Upload Asset" button
- No playful language

---

## Accessibility

### Contrast Requirements

All text must meet WCAG AA standards minimum:
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px bold): 3:1 minimum
- UI components: 3:1 minimum
- Aim for AAA (7:1) when possible

### Focus States

- All interactive elements must have visible focus ring
- Use `ring-2 ring-ring ring-offset-2`
- Never remove focus outlines

### Keyboard Navigation

- Logical tab order (left to right, top to bottom)
- Escape to close modals/dropdowns/dialogs
- Enter/Space to activate buttons
- Arrow keys for navigation (tabs, dropdowns, menus)
- Focus trap in modals

### Screen Readers

- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<header>`)
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic updates
- Alt text for all informative images

---

## Microcopy

### Tone & Voice

**Professional and direct:**
- ✅ "Upload asset"
- ❌ "Let's add something cool!"

**Action-driven:**
- ✅ "Review asset"
- ❌ "Take a look"

**No buzzwords or jokes:**
- ✅ "AI-powered brand governance"
- ❌ "Revolutionary AI magic"

**Clear error messages:**
- ✅ "File size must be under 10MB"
- ❌ "Oops! That file is too large"

**Calm AI language:**
- ✅ "3 issues detected. Review recommended."
- ❌ "Uh oh! We found problems!"

### Button Labels

- Use verb + noun: "Upload Asset", "Create Guideline", "Run Scan"
- Avoid vague labels: "Submit", "OK", "Continue"
- Be specific: "Delete Logo" not "Delete"
- Confirm destructive actions: "Yes, Delete Logo"

### Status Messages

- Loading: "Scanning assets..." (with count if possible)
- Success: "Asset uploaded successfully"
- Error: Specific issue + remedy
- Warning: Clear consequence + suggested action

---

## Implementation

### Design Tokens (CSS)

All tokens available as CSS custom properties:

```css
/* Colors */
background-color: var(--primary);
color: var(--ai-accent);
border-color: var(--border);

/* Typography */
font-family: var(--font-sans);
font-family: var(--font-mono);

/* Spacing */
padding: var(--spacing-6);
gap: var(--spacing-4);

/* Radius */
border-radius: var(--radius-lg);
```

### Tailwind Utilities

Prefer Tailwind classes for rapid development:

```jsx
<button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-all active:scale-95">
  Primary Button
</button>
```

### Component Examples

See `/design-system` route for complete interactive examples of all components with variants and states.

---

## Best Practices

### Do's

- ✅ Use token-based system for consistency
- ✅ Maintain generous whitespace
- ✅ Keep AI features calm and helpful
- ✅ Use semantic color meanings
- ✅ Test in both light and dark modes
- ✅ Ensure keyboard accessibility

### Don'ts

- ❌ Create new colors outside the palette
- ❌ Use AI accent for non-AI features
- ❌ Make UI playful or casual
- ❌ Use complex gradients or effects
- ❌ Reduce focus indicators
- ❌ Use vague or buzzword-heavy copy

---

## Checklist for New Features

When building new features:

- [ ] Uses tokens from the system (no hard-coded colors)
- [ ] Works in both light and dark modes
- [ ] Meets WCAG AA contrast requirements
- [ ] Has proper focus states
- [ ] Uses consistent spacing scale
- [ ] Follows typography hierarchy
- [ ] Professional, direct microcopy
- [ ] If AI-powered: uses AI accent + Sparkles icon
- [ ] If AI-powered: shows confidence/certainty
- [ ] If AI-powered: uses calm, helpful language

---

## Support & Updates

For questions or contributions to this design system, please refer to:
- Interactive showcase: `/design-system`
- Component examples in `/components/design-system/`
- Token reference in `/app/globals.css`

**Version:** 1.0  
**Last Updated:** 2025  
**Maintained By:** Design Systems Team
