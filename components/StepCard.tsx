
import React from 'react';
import { Step, Language, t } from '../types';
import { FuriganaText } from './FuriganaText';

interface StepCardProps {
  step: Step;
  currentLanguage: Language;
}

export const StepCard: React.FC<StepCardProps> = ({ step, currentLanguage }) => {
  const renderMedia = () => {
    // 動画がある場合
    if (step.video) {
      const isIframe = step.video.includes('drive.google.com') || step.video.startsWith('<iframe');
      
      if (isIframe) {
        const src = step.video.startsWith('<iframe') 
          ? step.video.match(/src="([^"]+)"/)?.[1] || ''
          : step.video;
          
        return (
          <div className="w-full aspect-video rounded-b-xl overflow-hidden bg-black">
            <iframe 
              src={src}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        );
      }

      return (
        <video 
          className="w-full h-auto max-h-80 object-contain bg-black rounded-b-xl"
          src={step.video}
          autoPlay 
          loop 
          muted 
          playsInline
        />
      );
    }
    
    // 画像がある場合
    if (step.image) {
      return (
        <img 
          className="w-full h-auto max-h-80 object-contain bg-slate-50 border-t border-slate-100 rounded-b-xl"
          src={step.image} 
          alt={t(step.title, currentLanguage)}
          loading="lazy"
        />
      );
    }

    // どちらもない場合はプレースホルダー
    return (
      <div className="bg-slate-100 h-48 w-full flex items-center justify-center border-t border-slate-100 italic text-slate-400 rounded-b-xl">
        <div className="flex flex-col items-center px-6 text-center">
          <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">ここに操作画面の画像や動画が表示されます</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="flex items-start p-4 sm:p-6">
        <div className="flex-shrink-0 flex flex-col items-center justify-center mr-4">
          <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 opacity-80">Step</div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center rounded-2xl font-black text-2xl shadow-md ring-4 ring-blue-50">
            {step.number}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight">
            {currentLanguage === 'ja' ? (
              <FuriganaText text={t(step.title, 'ja')} />
            ) : (
              t(step.title, currentLanguage)
            )}
          </h3>
          {currentLanguage !== 'ja' && (
            <div className="text-xs text-slate-400 font-bold mb-2">
              <FuriganaText text={t(step.title, 'ja')} />
            </div>
          )}
          <p className="text-slate-600 text-lg leading-relaxed">
            {currentLanguage === 'ja' ? (
              <FuriganaText text={t(step.description, 'ja')} />
            ) : (
              t(step.description, currentLanguage)
            )}
          </p>
          {currentLanguage !== 'ja' && (
            <p className="text-xs text-slate-400 font-medium mt-1">
              <FuriganaText text={t(step.description, 'ja')} />
            </p>
          )}
          
          {step.subSteps && (
            <ul className="mt-3 space-y-2 bg-slate-50 p-3 rounded-lg border-l-4 border-blue-400">
              {step.subSteps.map((sub, idx) => (
                <li key={idx} className="flex flex-col text-slate-700 font-medium">
                  <div className="flex items-start">
                    <span className="mr-2 mt-1.5 text-blue-500 flex-shrink-0">●</span>
                    <div className="flex-1">
                      {currentLanguage === 'ja' ? (
                        <FuriganaText text={t(sub, 'ja')} />
                      ) : (
                        t(sub, currentLanguage)
                      )}
                      {currentLanguage !== 'ja' && (
                        <div className="text-[10px] text-slate-400 opacity-60 font-bold">
                          <FuriganaText text={t(sub, 'ja')} />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {step.notes && (
            <div className="mt-4 space-y-2 bg-amber-50 p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="flex items-center text-amber-800 font-bold text-sm mb-1 uppercase tracking-wider">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Note / 注意
              </div>
              {step.notes.map((note, idx) => (
                <div key={idx} className="flex flex-col text-amber-900 font-medium text-base">
                  <div className="flex items-start">
                    <span className="mr-2 mt-1.5 text-amber-500 text-xs flex-shrink-0">◆</span>
                    <div className="flex-1">
                      {currentLanguage === 'ja' ? (
                        <FuriganaText text={t(note, 'ja')} />
                      ) : (
                        t(note, currentLanguage)
                      )}
                      {currentLanguage !== 'ja' && (
                        <div className="text-[11px] text-amber-700/60 font-bold italic">
                          <FuriganaText text={t(note, 'ja')} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {renderMedia()}
    </div>
  );
};
