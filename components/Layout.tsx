
import React, { useState } from 'react';
import { MANUAL_DATA } from '../constants';
import { ManualSection, ManualPage, Language, t } from '../types';
import { FuriganaText } from './FuriganaText';

interface LayoutProps {
  children: React.ReactNode;
  activePageId: string;
  onSelectPage: (pageId: string) => void;
  currentLanguage: Language;
  onChangeLanguage: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activePageId, 
  onSelectPage, 
  currentLanguage, 
  onChangeLanguage 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // ページ切り替え時にスクロールをトップに戻す
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activePageId]);

  const languages: { code: Language; label: string }[] = [
    { code: 'ja', label: '日本語' },
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'pt', label: 'Português' },
    { code: 'tl', label: 'Tagalog' },
    { code: 'id', label: 'Bahasa' },
    { code: 'ne', label: 'नेपाली' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-30 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h1 className="text-xl font-bold text-blue-700 flex items-center">
              <span className="mr-2">📏</span>
              <span>{currentLanguage === 'ja' ? (
                <FuriganaText text="OKProCon [マニュアル]{まにゅある}" />
              ) : (
                t({
                  ja: 'OKProCon マニュアル',
                  en: 'OKProCon Manual',
                  vi: 'Hướng dẫn OKProCon',
                  pt: 'Manual OKProCon',
                  tl: 'Manual ng OKProCon',
                  id: 'Panduan OKProCon',
                  ne: 'OKProCon म्यानुअल'
                }, currentLanguage)
              )}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Ver 3.1</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {MANUAL_DATA.map((section: ManualSection) => (
              <div key={section.id} className="mb-8">
                <div className="flex flex-col text-slate-400 font-bold text-xs mb-3 px-2 uppercase tracking-widest">
                  <div className="flex items-center">
                    <span className="mr-2">{section.icon}</span>
                    {t(section.title, currentLanguage)}
                  </div>
                  {currentLanguage !== 'ja' && (
                    <div className="text-[9px] opacity-60 ml-6">
                      <FuriganaText text={t(section.title, 'ja')} />
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  {section.pages.map((page: ManualPage) => (
                    <button
                      key={page.id}
                      onClick={() => {
                        onSelectPage(page.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full text-left px-3 py-3 rounded-lg transition-colors flex flex-col
                        ${activePageId === page.id 
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                          : 'text-slate-600 hover:bg-slate-50'}
                      `}
                    >
                      <span className="text-sm font-medium">
                        {currentLanguage === 'ja' ? (
                          <FuriganaText text={t(page.title, 'ja')} />
                        ) : (
                          t(page.title, currentLanguage)
                        )}
                      </span>
                      {currentLanguage !== 'ja' && (
                        <span className="text-[10px] opacity-60 font-bold">
                          <FuriganaText text={t(page.title, 'ja')} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              {t({
                ja: 'オンライン',
                en: 'Online',
                vi: 'Trực tuyến',
                pt: 'On-line',
                tl: 'Online',
                id: 'Daring',
                ne: 'अनलाइन'
              }, currentLanguage)}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-4 sm:px-8 justify-between">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onChangeLanguage(lang.code)}
                className={`text-xs px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  currentLanguage === lang.code
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </header>

        {/* Dynamic Content */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar"
        >
          <div className="max-w-3xl mx-auto">
            {children}
            
            {/* Footer inside scroll container */}
            <footer className="mt-20 py-8 flex justify-between border-t border-slate-200">
              <div className="text-sm text-slate-400 font-medium">
                OKProCon Tablet Manual &copy; 2024
              </div>
              <button 
                onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-blue-600 font-bold text-sm hover:underline"
              >
                {t({
                  ja: '一番上にもどる ↑',
                  en: 'Back to Top ↑',
                  vi: 'Quay lại đầu trang ↑',
                  pt: 'Voltar ao topo ↑',
                  tl: 'Bumalik sa Itaas ↑',
                  id: 'Kembali ke Atas ↑',
                  ne: 'माथि जानुहोस् ↑'
                }, currentLanguage)}
              </button>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};
