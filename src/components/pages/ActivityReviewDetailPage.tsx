import React, { useState } from 'react';
import { ActivityReviewItem } from '../../types';
import { Heart } from 'lucide-react';

interface ActivityReviewDetailPageProps {
  activity: ActivityReviewItem;
  onOpenShare: (title: string, desc: string) => void;
  onNavigateToTeam?: (stationName: string) => void;
}

export const ActivityReviewDetailPage: React.FC<ActivityReviewDetailPageProps> = ({
  activity
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(activity.likeCount);

  const handleToggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  // 整理富文本图文穿插展示列表
  // 结合 detailContent 段落与 galleryImages 图集，实现自然图文混排编辑效果
  const paragraphs = activity.detailContent || [];
  const gallery = activity.galleryImages || [];

  return (
    <div className="bg-white min-h-full flex flex-col justify-between select-none">
      <div className="flex-1 pb-4">
        {/* 顶部主视觉封面图 */}
        <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
        <img
          src={activity.coverImage}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        {activity.isPinned && (
          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            置顶
          </div>
        )}
      </div>

      {/* 文章头部信息：文章标题、发布人、发布时间 */}
      <div className="p-4 bg-white border-b border-neutral-100">
        <h1 className="text-base font-bold text-neutral-900 leading-snug">
          {activity.title}
        </h1>

        <div className="flex items-center justify-between text-xs text-neutral-400 mt-2.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-700">
              {activity.publisher || activity.serviceStationName || '爱阅公益'}
            </span>
            <span>·</span>
            <span>{activity.publishDate}</span>
          </div>
        </div>
      </div>

      {/* 富文本编辑效果：图文穿插 */}
      <div className="p-4 bg-white space-y-4">
        {/* 摘要导读 */}
        {activity.summary && (
          <div className="p-3 bg-neutral-50 rounded-xl border-l-4 border-rose-500 text-xs text-neutral-700 leading-relaxed italic">
            {activity.summary}
          </div>
        )}

        {/* 第 1 段文字 */}
        {paragraphs[0] && (
          <p className="text-xs text-neutral-800 leading-relaxed text-justify">
            {paragraphs[0]}
          </p>
        )}

        {/* 穿插第 1 张现场高清配图 */}
        {gallery[0] && (
          <div className="my-3 overflow-hidden rounded-xl bg-neutral-100 shadow-2xs">
            <img
              src={gallery[0]}
              alt="活动现场照片"
              className="w-full h-auto object-cover max-h-56"
            />
          </div>
        )}

        {/* 第 2 段文字 */}
        {paragraphs[1] && (
          <p className="text-xs text-neutral-800 leading-relaxed text-justify">
            {paragraphs[1]}
          </p>
        )}

        {/* 穿插第 2 张现场特写配图 */}
        {gallery[1] && (
          <div className="my-3 overflow-hidden rounded-xl bg-neutral-100 shadow-2xs">
            <img
              src={gallery[1]}
              alt="活动现场精彩瞬间"
              className="w-full h-auto object-cover max-h-56"
            />
          </div>
        )}

        {/* 剩余段落文字（若有） */}
        {paragraphs.slice(2).map((para, index) => (
          <p key={index} className="text-xs text-neutral-800 leading-relaxed text-justify">
            {para}
          </p>
        ))}

        {/* 剩余图片（若有多张） */}
        {gallery.slice(2).map((imgUrl, index) => (
          <div key={index} className="my-3 overflow-hidden rounded-xl bg-neutral-100 shadow-2xs">
            <img
              src={imgUrl}
              alt="活动剪影"
              className="w-full h-auto object-cover max-h-56"
            />
          </div>
        ))}
      </div>
      </div>

      {/* 底部固定操作条：使用 sticky bottom-0 且 w-full，完美对齐手机容器内 */}
      <div className="sticky bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-neutral-200 p-2.5 px-4 flex items-center justify-between z-30 shadow-lg shrink-0">
        <div className="text-[11px] text-neutral-400 font-medium">
          爱阅公益 · 活动回顾
        </div>

        <div>
          {/* 点赞按钮 */}
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs active:scale-95 ${
              liked
                ? 'bg-rose-50 border-rose-300 text-rose-600 font-semibold shadow-xs'
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{liked ? '已点赞' : '点赞'}</span>
            <span className="font-mono text-[11px] font-bold">({likeCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
