
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Layout } from './components/Layout';
import { StepCard } from './components/StepCard';
import { FuriganaText } from './components/FuriganaText';
import { MANUAL_DATA } from './constants';
import { askAIAboutManual, AIResponse } from './services/geminiService';
import { Language, TranslatedString, t, ManualReference } from './types';

const App: React.FC = () => {
  const [activePageId, setActivePageId] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ja');
  const scrollRef = useRef<HTMLDivElement>(null);

  const activePage = useMemo(() => {
    for (const section of MANUAL_DATA) {
      const page = section.pages.find(p => p.id === activePageId);
      if (page) return page;
    }
    return MANUAL_DATA[0].pages[0];
  }, [activePageId]);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setAiResponse(null);
    try {
      const result = await askAIAboutManual(searchQuery, currentLanguage);
      setAiResponse(result);
      // 回答エリアへスクロール
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      setAiResponse({
        text: t({
          ja: 'すみません。もう[一度]{いちど} [聞]{き}いてください。',
          en: 'Sorry, please try asking again.',
          vi: 'Xin lỗi, vui lòng thử hỏi lại.',
          pt: 'Desculpe, por favor tente perguntar novamente.',
          tl: 'Paumanhin, pakisubukang magtanong muli.',
          id: 'Maaf, silakan coba bertanya lagi.',
          ne: 'माफ गर्नुहोस्, कृपया फेरि सोध्ने प्रयास गर्नुहोस्।'
        }, currentLanguage),
        references: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout 
      activePageId={activePageId} 
      onSelectPage={setActivePageId} 
      currentLanguage={currentLanguage} 
      onChangeLanguage={setCurrentLanguage}
    >
      {/* ページタイトル */}
      <div className="mb-8 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 tracking-tight">
          {currentLanguage === 'ja' ? (
            <FuriganaText text={t(activePage.title, 'ja')} />
          ) : (
            t(activePage.title, currentLanguage)
          )}
        </h2>
        {currentLanguage !== 'ja' && (
          <div className="text-sm text-slate-400 font-bold mb-4">
            <FuriganaText text={t(activePage.title, 'ja')} />
          </div>
        )}
        <div className="bg-blue-600 w-16 h-1.5 rounded-full mb-4"></div>
        <p className="text-xl text-slate-600 font-medium leading-relaxed">
          {currentLanguage === 'ja' ? (
            <FuriganaText text={t(activePage.content, 'ja')} />
          ) : (
            t(activePage.content, currentLanguage)
          )}
        </p>
        {currentLanguage !== 'ja' && (
          <p className="text-sm text-slate-400 font-medium mt-1">
            <FuriganaText text={t(activePage.content, 'ja')} />
          </p>
        )}
      </div>

      {/* 手順リスト */}
      <div className="space-y-4">
        {activePage.steps.map((step) => (
          <StepCard key={step.number} step={step} currentLanguage={currentLanguage} />
        ))}
      </div>

      {/* 注意事項 */}
      {activePage.notes && activePage.notes.length > 0 && (
        <div className="mt-12 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center text-amber-800 font-bold mb-4 text-lg">
            <svg className="w-6 h-6 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap flex-shrink-0">{currentLanguage === 'ja' ? (
              <FuriganaText text="[気]{き}をつけてください（[注意]{ちゅうい}）" />
            ) : (
              t({
                ja: '気をつけてください（注意）',
                en: 'Caution / Notes',
                vi: 'Chú ý / Ghi chú',
                pt: 'Cuidado / Notas',
                tl: 'Pag-iingat / Mga Paalala',
                id: 'Perhatian / Catatan',
                ne: 'सावधानी / नोटहरू'
              }, currentLanguage)
            )}</span>
          </div>
          <ul className="space-y-3">
            {activePage.notes.map((note, idx) => (
              <li key={idx} className="text-amber-900 text-lg font-bold flex items-start">
                <span className="mr-3 mt-1.5 block w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></span>
                <div className="flex-1">
                  {currentLanguage === 'ja' ? (
                    <FuriganaText text={t(note, 'ja')} />
                  ) : (
                    t(note, currentLanguage)
                  )}
                  {currentLanguage !== 'ja' && (
                    <div className="block text-xs opacity-60 mt-0.5">
                      <FuriganaText text={t(note, 'ja')} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AIサポートエリア */}
      <div className="mt-20 border-t-2 border-slate-200 pt-12 pb-20">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          {/* 背景の装飾 */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-3 rounded-2xl mr-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black">{currentLanguage === 'ja' ? (
                  <FuriganaText text="AIに [聞]{き}いてください" />
                ) : (
                  t({
                    ja: 'AIに きいてください',
                    en: 'Ask AI',
                    vi: 'Hỏi AI',
                    pt: 'Pergunte ao AI',
                    tl: 'Magtanong sa AI',
                    id: 'Tanya AI',
                    ne: 'AI लाई सोध्नुहोस्'
                  }, currentLanguage)
                )}</h3>
                <p className="text-blue-100 font-medium">{currentLanguage === 'ja' ? (
                  <FuriganaText text="わからないことを [書]{か}くと、AIが [教]{おし}えてくれます" />
                ) : (
                  t({
                    ja: 'わからないことを 書くと、AIが おしえてくれます',
                    en: 'Write what you don\'t understand, and AI will tell you.',
                    vi: 'Viết những gì bạn không hiểu, và AI sẽ cho bạn biết.',
                    pt: 'Escreva o que você não entende, e o AI lhe dirá.',
                    tl: 'Isulat ang hindi mo naiintindihan, at sasabihin sa iyo ng AI.',
                    id: 'Tulis apa yang tidak Anda mengerti, dan AI akan memberi tahu Anda.',
                    ne: 'तपाईले नबुझेको कुरा लेख्नुहोस्, र AI ले तपाईलाई बताउनेछ।'
                  }, currentLanguage)
                )}</p>
              </div>
            </div>

            <form onSubmit={handleAISearch} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t({
                  ja: '[例]{れい}：[不良品]{ふりょうひん}の[入]{い}れかた、[交代]{こうたい}のやりかた',
                  en: 'Ex: How to input defects, how to change operators',
                  vi: 'Ví dụ: Cách nhập sản phẩm lỗi, cách thay đổi người vận hành',
                  pt: 'Ex: Como inserir defeitos, como mudar de operador',
                  tl: 'Hal: Paano mag-input ng mga depekto, paano magpalit ng mga operator',
                  id: 'Contoh: Cara memasukkan cacat, cara mengganti operator',
                  ne: 'उदाहरण: दोषहरू कसरी इनपुट गर्ने, अपरेटरहरू कसरी परिवर्तन गर्ने'
                }, currentLanguage)}
                className="flex-1 bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-4 focus:ring-white/20 text-lg font-medium"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center justify-center shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  currentLanguage === 'ja' ? (
                    <FuriganaText text="[質問]{しつもん}する" />
                  ) : (
                    t({
                      ja: 'しつもんする',
                      en: 'Ask Question',
                      vi: 'Đặt câu hỏi',
                      pt: 'Fazer pergunta',
                      tl: 'Magtanong',
                      id: 'Ajukan Pertanyaan',
                      ne: 'प्रश्न सोध्नुहोस्'
                    }, currentLanguage)
                  )
                )}
              </button>
            </form>

            {aiResponse && (
              <div 
                ref={scrollRef}
                className="mt-8 bg-white/95 text-slate-800 rounded-2xl p-6 shadow-2xl animate-fade-in"
              >
                <div className="flex items-center mb-4 text-blue-700">
                  <span className="font-black text-lg">{currentLanguage === 'ja' ? (
                    <FuriganaText text="AIの [答]{こた}え" />
                  ) : (
                    t({
                      ja: 'AIの こたえ',
                      en: 'AI Answer',
                      vi: 'Câu trả lời của AI',
                      pt: 'Resposta do AI',
                      tl: 'Sagot ng AI',
                      id: 'Jawaban AI',
                      ne: 'AI जवाफ'
                    }, currentLanguage)
                  )}</span>
                </div>
                <div className="prose prose-blue max-w-none text-lg font-medium leading-relaxed whitespace-pre-wrap mb-6">
                  {aiResponse.text}
                </div>

                {aiResponse.references.length > 0 && (
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                      {t({
                        ja: '[関連]{かんれん}するマニュアル',
                        en: 'Related Manual Pages',
                        vi: 'Các trang hướng dẫn liên quan',
                        pt: 'Páginas do manual relacionadas',
                        tl: 'Mga Kaugnay na Pahina ng Manual',
                        id: 'Halaman Manual Terkait',
                        ne: 'सम्बन्धित म्यानुअल पृष्ठहरू'
                      }, currentLanguage)}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {aiResponse.references.map((ref, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePageId(ref.pageId)}
                          className="flex flex-col items-start bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl px-4 py-3 transition-all group text-left"
                        >
                          <span className="text-blue-600 font-bold group-hover:text-blue-700">
                            {ref.title}
                          </span>
                          {ref.pdfPage && (
                            <span className="text-xs text-slate-400 font-medium mt-1">
                              PDF Page: {ref.pdfPage}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setAiResponse(null)}
                  className="mt-8 text-sm text-slate-400 font-bold hover:text-slate-600"
                >
                  ✕ {currentLanguage === 'ja' ? (
                    <FuriganaText text="[閉]{と}じる" />
                  ) : (
                    t({
                      ja: 'とじる',
                      en: 'Close',
                      vi: 'Đóng',
                      pt: 'Fechar',
                      tl: 'Isara',
                      id: 'Tutup',
                      ne: 'बन्द गर्नुहोस्'
                    }, currentLanguage)
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
