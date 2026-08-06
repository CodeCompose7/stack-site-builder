# Content authoring notes

Gotchas worth knowing when writing collection bodies (`.md` / `.mdx`). The
markdown pipeline is CommonMark (remark/micromark) plus the theme's remark/rehype
plugins in `markdown.mjs` — so content renders the same here as it does on GitHub
and in most editor previews. A few CommonMark rules bite often enough to call out.

## Nested lists: indent to the parent marker width

A child list nests under its parent item only when it is indented **at least as
far as the parent item's content starts** — i.e. past the marker. An ordered
marker like `2. ` is three columns wide, so a sub-list needs **≥ 3 spaces**;
under-indenting drops it to the outer level instead. **Use 4 spaces (or a tab)**
as the habit — it clears every marker width and reads unambiguously.

Two spaces is *not* enough under an ordered item:

```md
1. first
2. second
  - child        <!-- only 2 spaces -->
3. third
```

renders as a **separate** bullet list wedged between two ordered lists, and the
numbering even restarts:

```html
<ol><li>first</li><li>second</li></ol>
<ul><li>child</li></ul>
<ol start="3"><li>third</li></ol>
```

Four spaces nests it correctly:

```md
1. first
2. second
    - child      <!-- 4 spaces -->
3. third
```

```html
<ol>
  <li>first</li>
  <li>second<ul><li>child</li></ul></li>
  <li>third</li>
</ol>
```

This is standard CommonMark, not a theme quirk — the same source renders the same
way on GitHub. The theme deliberately does not loosen it, so content stays
portable across every markdown tool. (Under an unordered `- ` marker the content
starts at column 2, so 2 spaces already nests — the 4-space habit just always
works.)

## Blockquotes

`>` blockquotes render with a left accent rail and a faint fill (see the
`.prose blockquote` rule in `src/styles/global.css`), so a pulled-out passage is
visually distinct from the running text. Nothing special to author:

```md
> A pulled-out passage. Blank-line-free lines wrap into one paragraph;
> end a line with two trailing spaces  
> to force a hard line break inside the quote.
```

## Hard line breaks

Two trailing spaces at the end of a line produce a `<br>` (a hard break) without
starting a new paragraph — the usual CommonMark rule, and it works inside
blockquotes too. A blank line still starts a new paragraph.

## Tables

A GFM pipe table renders inside a horizontal scroll box, so a table too wide for
its column slides sideways rather than wrapping every cell into a stack of lines.
Nothing to author — the wrapper is added by the pipeline (`rehypeTableScroll` in
`markdown.mjs` for collection bodies, `withTableScroll` in `src/lib/md-tables.ts`
for READMEs and sample descriptions) — but it means **wide is fine**: a column
holding a code sample or a long path keeps it on one line instead of breaking it
mid-token. In reading content a table narrower than the column keeps its own
width and centers, so short tables don't get stretched.

The one case that falls back to the old behavior is a raw `<table>` written as
HTML in an `.mdx` body: it never passes through the wrapper, so it scrolls as a
block-level element and its columns collapse to fit. Prefer pipe tables.

## Wikilinks

`[[Term]]` resolves against the site's `src/data/glossary.mjs`; see the glossary
row in the README's "What a site supplies" table for the target kinds
(`stack` / `concept` / `article` / `course` / `paper` / `href` / `def`). An
unknown term fails the build, so a typo can't silently degrade to plain text.
