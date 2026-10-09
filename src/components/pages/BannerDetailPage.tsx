import React from 'react';
import { BannerItem } from '../../types';
import { Calendar, Tag, Share2, ArrowRight, Heart } from 'lucide-react';

interface BannerDetailPageProps {
  banner: BannerItem;
  onNavigateToProject: (projectId: string) => void;
  onOpenShare: (title: string, desc: string) => void;
}

export const BannerDetailPage: React.FC<BannerDetailPageProps> = ({
  banner,
  onNavigateToProject,
  onOpenShare
}) => {
  return (
    <div className="bg-neutral-50 min-h-full flex flex-col justify-between select-none">
      <div className="flex-1 pb-4">
        {/* 顶部头图 */}
        <div className="relative aspect-video w-full bg-neutral-200 overflow-hidden">
          <img
            src={banner.coverImage}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-neutral-900/75 text-white backdrop-blur-xs text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Tag className="w-2.5 h-2.5" />
            {banner.category} · {banner.tag}
          </div>
        </div>

        {/* 核心内容区 */}
        <div className="p-4 bg-white border-b border-neutral-200">
          <h1 className="text-base font-bold text-neutral-900 leading-snug">
            {banner.title}
          </h1>

          <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-2.5 pt-2 border-t border-neutral-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              发布日期：{banner.publishDate}
            </span>
            <span className="text-rose-600 font-medium">爱阅官方发布</span>
          </div>

          {/* 摘要导语 */}
          <div className="mt-3 p-3 bg-neutral-50 rounded-lg border-l-2 border-rose-500 text-xs text-neutral-600 leading-relaxed font-sans">
            <span className="font-semibold text-neutral-800">【导读】：</span>
            {banner.summary}
          </div>
        </div>

        {/* 正文段落 */}
        <div className="p-4 bg-white mt-2 space-y-3 border-y border-neutral-200">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            资讯/推文/公告详情正文
          </div>
          {banner.content.map((paragraph, idx) => (
            <p key={idx} className="text-xs text-neutral-700 leading-relaxed indent-5 text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 关联项目跳转入口 (资讯推文可关联公益项目介绍) */}
        {banner.relatedProjectId && (
          <div className="p-4 bg-white mt-2 border-y border-neutral-200">
            <div className="text-xs font-bold text-neutral-900 mb-2">关联公益项目</div>
            <button
              onClick={() => onNavigateToProject(banner.relatedProjectId!)}
              className="w-full flex items-center justify-between p-3 bg-rose-50/60 border border-rose-200 rounded-xl hover:bg-rose-100/60 transition group text-left"
            >
              <div>
                <div className="text-xs font-semibold text-rose-900 group-hover:text-rose-800">
                  查看关联项目详情
                </div>
                <div className="text-[10px] text-rose-600 mt-0.5">
                  了解项目背景与实施规划
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* 底部固定操作条：使用 sticky w-full 完美对齐 */}
      <div className="sticky bottom-0 left-0 right-0 w-full bg-white border-t border-neutral-200 p-2.5 px-4 flex items-center justify-between z-30 shadow-lg shrink-0">
        <div className="text-[10px] text-neutral-400 font-mono">
          爱阅公益推文
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('模拟点赞成功！+1')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-700 hover:bg-neutral-50 active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>点赞</span>
          </button>
          <button
            onClick={() => onOpenShare(banner.title, banner.summary)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 active:scale-95 shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>分享此推文</span>
          </button>
        </div>
      </div>
    </div>
  );
};
