import React from 'react';
import { ExternalLink, X, Smartphone, ShieldCheck } from 'lucide-react';

interface ExternalJumpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  targetType: 'xiaoetong' | 'donation' | 'external_mp' | 'web_link';
  targetName: string;
  targetUrlOrAppId: string;
  notes?: string;
}

export const ExternalJumpModal: React.FC<ExternalJumpModalProps> = ({
  isOpen,
  onClose,
  title,
  targetType,
  targetName,
  targetUrlOrAppId,
  notes
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs select-none">
      <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-neutral-200">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900">{title}</h3>
              <p className="text-[10px] text-neutral-500 font-mono">小程序外部跳转交互原型</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 space-y-3">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5 mb-1">
              <Smartphone className="w-3.5 h-3.5 text-neutral-500" />
              即将离开“爱阅志愿者”小程序
            </div>
            <p className="text-[11px] text-neutral-600">
              目标应用/服务：<span className="font-semibold text-neutral-900">{targetName}</span>
            </p>
            <div className="mt-2 p-2 bg-white rounded border border-neutral-200 font-mono text-[10px] text-neutral-600 break-all">
              {targetType === 'xiaoetong' || targetType === 'external_mp' ? (
                <>AppID / 路径: {targetUrlOrAppId}</>
              ) : (
                <>目标外链: {targetUrlOrAppId}</>
              )}
            </div>
          </div>

          {notes && (
            <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-[11px] text-amber-800 leading-relaxed">
              <div className="font-bold flex items-center gap-1 text-[10px] uppercase text-amber-900 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 原型逻辑说明
              </div>
              {notes}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            取消
          </button>
          <button
            onClick={() => {
              alert(`【原型模拟提示】：在微信环境中将调用 wx.navigateToMiniProgram() 跳转至【${targetName}】`);
              onClose();
            }}
            className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition"
          >
            允许并打开
          </button>
        </div>
      </div>
    </div>
  );
};
