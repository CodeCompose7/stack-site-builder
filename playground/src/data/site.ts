import type { SectionKey } from 'stack-site-builder';

/**
 * The playground's identity, consumed by the theme via the `@aas-data/site`
 * alias. UI string overrides use the same keys as the theme's src/i18n/ui.ts.
 */
export const site = {
  /** Shown in the header and as the homepage title. Either one string for every
   *  locale, or a per-locale record like this one — a locale it omits falls back
   *  to the default locale, so only the locales that need their own name list it. */
  name: {
    en: 'stack-site-builder playground',
    ko: 'stack-site-builder 놀이터',
    'zh-CN': 'stack-site-builder 试验场',
  } as string | Record<string, string>,
  /** The repo that hosts this site's content — sample folder links point here. */
  repoUrl: 'https://github.com/CodeCompose7/stack-site-builder',
  /** User-Agent for build-time GitHub API calls (stars/latest release). */
  buildUserAgent: 'stack-site-builder-playground',
  /**
   * The locales this site ships, in language-switcher order. The FIRST entry is
   * the default locale and must match `i18n.defaultLocale` in astro.config; every
   * `code` must also appear in `i18n.locales` there and have a matching content
   * folder (`src/content/stacks/<code>/…`). Omit this to accept the theme's
   * en/ko default. `dateLocale` is the BCP-47 tag used for date formatting.
   */
  locales: [
    { code: 'en', label: 'English', dateLocale: 'en-US' },
    { code: 'ko', label: '한국어', dateLocale: 'ko-KR' },
    { code: 'ja', label: '日本語', dateLocale: 'ja-JP' },
    // A code that is NOT two bare letters, on purpose: content ids and slugs
    // are derived from the code (Astro lowercases the folder segment, so this
    // locale's content lives at id `zh-cn/…` whichever way the folder is
    // cased), which regressed on such codes before 1.24.0.
    { code: 'zh-CN', label: '简体中文', dateLocale: 'zh-CN' },
  ] as { code: string; label: string; dateLocale?: string }[],
  /** Optional content sections to toggle. All are on by default except
   *  `courses`, which is opt-IN (it needs src/data/course-categories.ts). A
   *  disabled section loses both its routes and its header-nav item; the value
   *  is forwarded to the theme integration in astro.config for route skipping.
   *  Keys: 'concepts' | 'articles' | 'courses' | 'samples' | 'slides' |
   *  'glossary' | 'pages'.
   *  Example — hide the slides and glossary sections:
   *      sections: { slides: false, glossary: false },
   */
  sections: { courses: true, products: true, papers: true } satisfies Partial<Record<SectionKey, boolean>>,
  /** Per-locale overrides for the theme's UI strings; empty = theme defaults.
   *  A locale beyond the theme's en/ko (add it to `locales` above) supplies its
   *  whole string table here; any key it omits falls back to the default locale.
   *  `ja` below shows a partial table — the rest of the chrome falls back to en. */
  ui: {
    ja: {
      'site.tagline':
        'AIシステムの構築に実際に使うツールとサービスのキュレーション — 各項目に詳細ページと実行可能なサンプルコード付き。',
      'nav.browse': '一覧',
      'nav.concepts': 'コンセプト',
      'nav.courses': 'コース',
      'nav.products': '製品',
      'nav.papers': '論文',
      'nav.blog': '記事',
      'nav.samples': 'サンプル',
      'nav.slides': 'スライド',
      'nav.glossary': '用語集',
      'nav.language': '言語',
      'nav.menu': 'メニュー',
      'code.copy': 'コードをコピー',
      'code.copied': 'コピーしました',
    },
    'zh-CN': {
      'site.tagline':
        '构建 AI 系统时真正会用到的工具与服务精选 —— 每一项都有详情页和可运行的示例代码。',
      'nav.browse': '浏览',
      'nav.concepts': '概念',
      'nav.courses': '课程',
      'nav.products': '产品',
      'nav.papers': '论文',
      'nav.blog': '文章',
      'nav.samples': '示例',
      'nav.slides': '幻灯片',
      'nav.glossary': '术语表',
      'nav.language': '语言',
      'nav.menu': '菜单',
      'code.copy': '复制代码',
      'code.copied': '已复制',
    },
  } as Record<string, Record<string, string>>,
  /** Per-locale labels for the `pricing` frontmatter enum. The theme ships
   *  en/ko; a locale beyond those supplies its own here (any key it omits falls
   *  back to the default locale). Same shape for `difficultyLabels` (course
   *  `level` 1–5) and `licenseLabels` (descriptive licenses only). */
  pricingLabels: {
    'zh-CN': {
      'completely-free': '完全免费',
      'open-source': '开源',
      'free-tier': '免费额度',
      paid: '付费',
      free: '免费',
    },
  } as Record<string, Record<string, string>>,
  difficultyLabels: {
    'zh-CN': { '1': '入门', '2': '初级', '3': '中级', '4': '高级', '5': '专家' },
  } as Record<string, Record<string, string>>,
  licenseLabels: {
    'zh-CN': { proprietary: '专有' },
  } as Record<string, Record<string, string>>,
};

export type SiteConfig = typeof site;
