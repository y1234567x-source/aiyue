import React, { useState } from 'react';
import { X, Send, Image as ImageIcon, Link2, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc?: string;
  sourceType?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  desc,
  sourceType = '活动回顾'
}) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateShare = (platform: string) => {
    setShareSuccess(`已模拟转发至微信【${platform}】`);
    setTimeout(() => {
      setShareSuccess(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-2xl p-5 shadow-2xl border-t border-neutral-200 select-none">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-neutral-800">分享与转发原型模拟</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 预览卡片 */}
        <div className="my-3.5 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
          <div className="text-[11px] font-mono text-neutral-500 mb-1 flex items-center justify-between">
            <span>微信小程序分享卡片预览</span>
            <span className="bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0.5 rounded">
              {sourceType}
            </span>
          </div>
          <div className="text-xs font-semibold text-neutral-900 line-clamp-1">{title}</div>
          {desc && (
            <div className="text-[11px] text-neutral-600 line-clamp-2 mt-1">{desc}</div>
          )}
          <div className="text-[10px] text-neutral-400 mt-2 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 text-white flex items-center justify-center text-[8px] font-bold">
              阅
            </span>
            深圳市爱阅公益基金会志愿者协会
          </div>
        </div>

        {shareSuccess ? (
          <div className="py-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              {shareSuccess}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 pt-2 text-center">
            <button
              onClick={() => handleSimulateShare('微信好友与群聊')}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 active:scale-95 transition"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <Send className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-neutral-700">发送给朋友</span>
            </button>

            <button
              onClick={() => handleSimulateShare('朋友圈与动态')}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 active:scale-95 transition"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-neutral-700">朋友圈海报</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 active:scale-95 transition"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
                {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
              </div>
              <span className="text-[11px] text-neutral-700">
                {copied ? '已复制' : '复制小程序码'}
              </span>
            </button>

            <button
              onClick={() => handleSimulateShare('爱阅空间站群')}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 active:scale-95 transition"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-neutral-700">站长群转发</span>
            </button>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center text-[10px] text-neutral-400 font-mono">
          <span>* 原型逻辑：支持配置自定义页面路径与分享卡片封面图</span>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700 text-xs">
            取消
          </button>
        </div>
      </div>
    </div>
  );
};
