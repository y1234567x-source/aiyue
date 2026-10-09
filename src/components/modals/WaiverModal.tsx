import React, { useState } from 'react';
import { ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';

interface WaiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  signupType: 'volunteer' | 'participant';
  activityTitle: string;
}

export const WaiverModal: React.FC<WaiverModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  signupType,
  activityTitle
}) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs select-none">
      <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]">
        {/* 头部 */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900">活动报名免责条款</h3>
              <p className="text-[10px] text-neutral-500 font-mono">
                {signupType === 'volunteer' ? '【志愿者服务免责声明】' : '【家长/参与者安全与免责协议】'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 条款滚动区 */}
        <div className="flex-1 overflow-y-auto my-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 space-y-2 leading-relaxed">
          <div className="font-semibold text-neutral-800">
            您即将报名：{activityTitle}
          </div>
          <p>
            1. 本活动由深圳市爱阅公益基金会空间站组织，旨在普及儿童早期亲子阅读。
          </p>
          <p>
            2. <strong>儿童看护责任：</strong>对于家长/参与者，活动期间未成年人全程由其法定监护人承担第一安全照护责任，请勿让儿童脱离家长视线。
          </p>
          <p>
            3. <strong>志愿者行为规范：</strong>志愿者承诺身体健康、无不适宜志愿服务的基础疾病，严格遵守《爱阅志愿者管理办法》及儿童友善保护原则，听从空间站长现场调度。
          </p>
          <p>
            4. <strong>突发意外与免责：</strong>如遇不可抗力、恶劣天气或因自身过错发生人身财产意外，组织方在合理安全防范范围内尽救助义务，不承担超出法律规定范围之连带责任。
          </p>
          <p>
            5. <strong>肖像权与公益宣传：</strong>活动现场拍摄的公益合影与伴读记录照片，爱阅基金会有权用于公益宣传与活动回顾，不作任何商业营利用途。
          </p>
        </div>

        {/* 勾选框 */}
        <label
          onClick={() => setAgreed(!agreed)}
          className="flex items-start gap-2 py-2 px-1 cursor-pointer select-none"
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => {}}
            className="mt-0.5 accent-rose-600 rounded w-4 h-4 cursor-pointer"
          />
          <span className="text-[11px] text-neutral-700 font-medium">
            我已完整阅读并同意《通用公益志愿与活动安全免责声明》
          </span>
        </label>

        {/* 底部按钮 */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            放弃
          </button>
          <button
            disabled={!agreed}
            onClick={() => {
              if (agreed) {
                onConfirm();
              }
            }}
            className={`flex-1 py-2 text-xs font-bold text-white rounded-xl shadow-xs transition ${
              agreed
                ? 'bg-rose-600 hover:bg-rose-700 active:scale-95'
                : 'bg-neutral-300 cursor-not-allowed text-neutral-500'
            }`}
          >
            确认并完成报名
          </button>
        </div>
      </div>
    </div>
  );
};
