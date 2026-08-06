import type MarkdownIt from 'markdown-it';

/**
 * Wrap every rendered table in a `.aas-table-scroll` box, matching what
 * `rehypeTableScroll` (markdown.mjs) does for content collections. A table
 * cannot scroll itself — it needs `display: table` for real column sizing,
 * which makes `overflow-x` on the table a no-op — so without the wrapper a
 * README table wider than its column has no escape but to wrap every cell.
 *
 * Only needed on MarkdownIt instances that RENDER (READMEs, sample
 * descriptions); the ones that merely `parse()` for metadata can skip it.
 */
export function withTableScroll(md: MarkdownIt): MarkdownIt {
  const base = md.renderer.rules.table_open ?? ((t, i, o, _e, s) => s.renderToken(t, i, o));
  md.renderer.rules.table_open = (tokens, idx, opts, env, self) =>
    `<div class="aas-table-scroll">${base(tokens, idx, opts, env, self)}`;
  const baseClose = md.renderer.rules.table_close ?? ((t, i, o, _e, s) => s.renderToken(t, i, o));
  md.renderer.rules.table_close = (tokens, idx, opts, env, self) =>
    `${baseClose(tokens, idx, opts, env, self)}</div>`;
  return md;
}
