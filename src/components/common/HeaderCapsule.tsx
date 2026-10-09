import React from 'react';
import { ArrowLeft, MoreHorizontal, CircleDot } from 'lucide-react';

interface HeaderCapsuleProps {
  title: string;
  showBack: boolean;
  onBack: () => void;
  onMore: () => void;
  onCloseToHome: () => void;
  categoryTag?: string;
}

export const HeaderCapsule: React.FC<HeaderCapsuleProps> = ({
  title,
  showBack,
  onBack,
  onMore,
  onCloseToHome,
  categoryTag
}) => {
  return (
    <div className="bg-white border-b border-neutral-200 sticky top-0 z-40 select-none">
      {/* 模拟微信小程序顶部状态栏 */}
      <div className="h-6 px-4 flex items-center justify-between text-[11px] font-mono text-neutral-500 bg-neutral-50 border-b border-neutral-100">
        <span>09:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">5G</span>
          <div className="w-4 h-2 border border-neutral-400 rounded-xs flex items-center p-0.5">
            <div className="w-full h-full bg-neutral-600 rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* 模拟微信小程序导航条与胶囊 */}
      <div className="h-11 px-3 flex items-center justify-between relative bg-white">
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-sm font-medium text-neutral-800 hover:text-neutral-900 active:scale-95 transition-transform py-1 px-1.5 -ml-1 rounded hover:bg-neutral-100"
              title="返回上一页"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-800" />
              <span className="text-xs text-neutral-600">返回</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                阅
              </div>
              <span className="text-xs font-semibold tracking-tight text-neutral-900">爱阅志愿者</span>
            </div>
          )}
        </div>

        {/* 标题 */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center max-w-[200px] px-1 truncate">
          <div className="text-xs font-bold text-neutral-900 truncate" title={title}>{title}</div>
          {categoryTag && (
            <div className="text-[9px] text-neutral-500 scale-90 -mt-0.5">{categoryTag}</div>
          )}
        </div>

        {/* 微信原生胶囊按钮 (Capsule) */}
        <div className="flex items-center bg-neutral-100/90 border border-neutral-200/90 rounded-full py-0.5 px-2 gap-1.5 shadow-2xs">
          <button
            onClick={onMore}
            className="p-1 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/50 rounded-full transition-colors"
            title="更多与分享"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-3 bg-neutral-300"></div>
          <button
            onClick={onCloseToHome}
            className="p-1 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/50 rounded-full transition-colors"
            title="回到首页"
          >
            <CircleDot className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
