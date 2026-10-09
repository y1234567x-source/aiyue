import React, { useState } from 'react';
import { UserProfileData } from '../../types';
import { User, Phone, Shield, Lock, Save, ArrowLeft, AlertCircle } from 'lucide-react';

interface EditProfilePageProps {
  profile: UserProfileData;
  onSave: (updated: Partial<UserProfileData>) => void;
  isAdmin: boolean;
}

export const EditProfilePage: React.FC<EditProfilePageProps> = ({
  profile,
  onSave,
  isAdmin
}) => {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [gender, setGender] = useState(profile.gender);
  const [emergencyContact, setEmergencyContact] = useState(profile.emergencyContact);
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergencyPhone);
  // 后台特权字段：身份证号 (普通用户只读不可改，后台可配置修改)
  const [idCard, setIdCard] = useState(profile.idCardMasked);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      phone,
      gender,
      emergencyContact,
      emergencyPhone,
      idCardMasked: idCard
    });
    alert('【原型模拟】：个人资料修改已保存。');
  };

  return (
    <div className="bg-neutral-50 min-h-full pb-20 select-none">
      {/* 业务规则提示 */}
      <div className="bg-blue-50 border-b border-blue-200 p-3.5 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 leading-snug">
          <div className="font-bold">个人信息权限规则提示</div>
          <div className="text-[11px] text-blue-700 mt-0.5">
            需求规范：“支持后续增加或者修改填写个人信息。部分字段前端用户不可修改（如证件实名信息、入队审核状态），但后台管理员拥有所有字段修改权限”。
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* 基本信息 */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-neutral-900 pb-2 border-b border-neutral-100">
            基础身份信息
          </h2>

          <div>
            <label className="text-[11px] text-neutral-500 mb-1 block">姓名 / 昵称：</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] text-neutral-500 mb-1 block">联系电话：</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] text-neutral-500 mb-1 block">性别：</label>
            <div className="flex gap-2">
              {(['女', '男'] as const).map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition ${
                    gender === g
                      ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 紧急联系人与安全 */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-neutral-900 pb-2 border-b border-neutral-100">
            志愿服务安全联络
          </h2>

          <div>
            <label className="text-[11px] text-neutral-500 mb-1 block">紧急联系人姓名：</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900"
            />
          </div>

          <div>
            <label className="text-[11px] text-neutral-500 mb-1 block">紧急联系人电话：</label>
            <input
              type="tel"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900"
            />
          </div>
        </div>

        {/* 部分前端用户不可修改字段演示 */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h2 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              受限字段（前端用户不可直接修改）
            </h2>
            <span className="text-[10px] text-neutral-400 font-mono">
              {isAdmin ? '管理员可编辑' : '普通用户只读'}
            </span>
          </div>

          <div>
            <label className="text-[11px] text-neutral-500 mb-1 flex items-center justify-between">
              <span>实名认证证件号：</span>
              {!isAdmin && <span className="text-[10px] text-neutral-400">（需联系管理员变更）</span>}
            </label>
            <input
              type="text"
              disabled={!isAdmin}
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              className={`w-full rounded-lg px-3 py-2 text-xs font-mono ${
                isAdmin
                  ? 'bg-neutral-50 border border-neutral-200 text-neutral-900'
                  : 'bg-neutral-100 border border-neutral-200 text-neutral-500 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="text-[11px] text-neutral-500 mb-1 block">注册归属空间站：</label>
            <input
              type="text"
              disabled
              value={profile.currentStationName || '未归属特定空间站'}
              className="w-full bg-neutral-100 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>保存个人信息修改</span>
          </button>
        </div>
      </form>
    </div>
  );
};
