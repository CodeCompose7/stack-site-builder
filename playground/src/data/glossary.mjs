// @ts-check
/**
 * Central glossary for [[Term]] wikilinks. One demo entry of each kind; the
 * theme's remarkGlossary plugin resolves markers at build time and an unknown
 * term fails the build.
 */
export const glossary = {
  comfyui: {
    label: 'ComfyUI',
    stack: 'comfyui',
  },
  'agents-course': {
    label: { ko: 'AI 에이전트 입문 강의', en: 'Getting Started with AI Agents', 'zh-CN': 'AI 智能体入门课程' },
    course: 'getting-started-with-agents',
  },
  'attention-paper': {
    label: { ko: '어텐션 논문', en: 'the Attention paper' },
    paper: 'attention-is-all-you-need',
    def: {
      ko: '트랜스포머를 제안한 2017년 논문 「Attention Is All You Need」.',
      en: 'The 2017 paper "Attention Is All You Need" that introduced the Transformer.',
      ja: 'トランスフォーマーを提案した2017年の論文「Attention Is All You Need」。',
      'zh-CN': '提出 Transformer 的 2017 年论文《Attention Is All You Need》。',
    },
  },
  diffusion: {
    label: { ko: '디퓨전 모델', en: 'Diffusion model', ja: '拡散モデル', 'zh-CN': '扩散模型' },
    def: {
      ko: '노이즈에서 이미지를 점진적으로 복원하도록 학습된 생성 모델.',
      en: 'A generative model trained to gradually denoise toward an image.',
      ja: 'ノイズから画像を段階的に復元するよう学習された生成モデル。',
      'zh-CN': '一种学习从噪声逐步还原出图像的生成模型。',
    },
  },
};
