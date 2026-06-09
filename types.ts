
export type Language = 'ja' | 'en' | 'vi' | 'pt' | 'tl' | 'id' | 'ne';

export interface TranslatedString {
  ja: string;
  en: string;
  vi: string;
  pt: string;
  tl: string;
  id: string;
  ne: string;
}

export const t = (s: string | TranslatedString | undefined, lang: Language): string => {
  if (!s) return '';
  if (typeof s === 'string') return s;
  return s[lang] || s['ja'];
};

export interface Step {
  number: number;
  title: string | TranslatedString;
  description: string | TranslatedString;
  image?: string; // 画像のURLまたはパス
  video?: string; // 動画のURLまたはパス
  subSteps?: (string | TranslatedString)[];
  notes?: (string | TranslatedString)[];
}

export interface ManualSection {
  id: string;
  title: string | TranslatedString;
  icon: string;
  pages: ManualPage[];
}

export interface ManualPage {
  id: string;
  title: string | TranslatedString;
  content: string | TranslatedString;
  steps: Step[];
  notes?: (string | TranslatedString)[];
  pdfPage?: number;
}

export interface ManualReference {
  sectionId: string;
  pageId: string;
  title: string;
  pdfPage?: number;
}
export enum SectionType {
  STARTUP = 'startup',
  INJ_PREP = 'inj_prep',
  PREP = 'prep',
  MOLDING = 'molding',
  CHECK = 'check',
  ADMIN = 'admin',
  SETTINGS = 'settings'
}
