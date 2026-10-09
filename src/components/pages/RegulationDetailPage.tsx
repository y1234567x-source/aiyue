import React from 'react';
import { RegulationDoc } from '../../types';
import { FileText, Calendar, Tag, ShieldCheck } from 'lucide-react';

interface RegulationDetailPageProps {
  regulation: RegulationDoc;
}

export const RegulationDetailPage: React.FC<RegulationDetailPageProps> = ({
  regulation
}) => {
  return (
    <div className="bg-neutral-50 min-h-full pb-16 select-none">
      {/* 头部标题区 */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
            {regulation.category}
          </span>
          <span className="text-[10px] font-mono text-neutral-400">
            版本：{regulation.version}
          </span>
        </div>

        <h1 className="text-base font-bold text-neutral-900 leading-snug">
          {regulation.title}
        </h1>

        <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-2.5 pt-2 border-t border-neutral-100 font-mono">
          <span>修订生效日期：{regulation.updateDate}</span>
          <span className="text-neutral-700 font-sans font-medium">爱阅基金会发布</span>
        </div>

        <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
          <span className="font-semibold text-neutral-800">【本办法概述】：</span>
          {regulation.summary}
        </div>
      </div>

      {/* 章节条款 */}
      <div className="p-4 space-y-4">
        {regulation.sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-2"
          >
            <h3 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5 pb-2 border-b border-neutral-100">
              <span className="w-1 h-3 bg-rose-500 rounded-full"></span>
              {sec.title}
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-line text-justify">
              {sec.content}
            </p>
          </div>
        ))}
      </div>

      {/* 底部备注 */}
      <div className="px-6 py-4 text-center text-[10px] text-neutral-400 font-mono">
        * 所有在岗爱阅志愿者均需严格遵守上述制度与规范准则
      </div>
    </div>
  );
};
