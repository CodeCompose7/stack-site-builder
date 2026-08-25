import { languages, defaultLang, type Lang } from '../i18n/ui';

/**
 * Helpers for the single `src/pages/[...lang]/` route tree. Every page's
 * getStaticPaths walks {@link allLocales} and emits one path per locale, using
 * {@link langParam} for the `[...lang]` rest param: `undefined` for the default
 * locale (so it renders at the site root) and the code otherwise (so it renders
 * under `/<code>/`). Adding a locale is a site-config change, not a new file.
 */

/** All locale codes the site ships, in switcher order (default first). */
export const allLocales = Object.keys(languages) as Lang[];

/** The `[...lang]` param for a locale: `undefined` for the default, else the code. */
export const langParam = (lang: Lang): string | undefined =>
  lang === defaultLang ? undefined : lang;

/**
 * Content-id helpers. Every collection is locale-partitioned by folder
 * (`stacks/<code>/<slug>.mdx`), so an entry's id carries a `<code>/` prefix
 * that listings filter on and slugs strip.
 *
 * Two details make the prefix worth deriving instead of hardcoding: Astro's
 * glob loader runs every path segment through github-slugger, which
 * LOWERCASES it, so a `zh-CN` folder yields the id `zh-cn/…`; and a locale
 * code isn't necessarily two bare letters (`zh-CN`, `pt-BR`). Both are handled
 * here once, so adding such a locale stays a site-config change.
 */

/** The `<locale>/` prefix an entry id carries for `lang`. */
export const contentPrefix = (lang: Lang): string => `${lang.toLowerCase()}/`;

/** Whether a content id belongs to `lang`. */
export const inLocale = (id: string, lang: Lang): boolean => id.startsWith(contentPrefix(lang));

const escapeRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Longest code first, so `zh` can't shadow `zh-cn` on a site shipping both.
const localePrefixRe = new RegExp(
  `^(?:${allLocales
    .map((l) => escapeRe(l.toLowerCase()))
    .sort((a, b) => b.length - a.length)
    .join('|')})/`,
);

/** An entry id with its `<locale>/` prefix removed — the basis of every slug. */
export const stripLocale = (id: string): string => id.replace(localePrefixRe, '');
