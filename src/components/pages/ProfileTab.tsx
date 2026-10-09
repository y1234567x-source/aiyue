import React, { useState } from 'react';
import {
  UserProfileData,
  VOLUNTEER_BADGES
} from '../../types';
import {
  User,
  Clock,
  Award,
  BookOpen,
  Settings,
  ChevronRight,
  Shield,
  AlertCircle,
  Building,
  HeartHandshake,
  QrCode,
  GraduationCap,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

interface ProfileTabProps {
  userRole: 'tourist' | 'volunteer' | 'team_leader' | 'admin';
  profile: UserProfileData;
  onChangeRole: (role: 'tourist' | 'volunteer' | 'team_leader' | 'admin') => void;
  // 关键子页面跳转
  onOpenEditProfile: () => void;
  onOpenBadgeAchievements: () => void;
  onOpenMyTrainings: () => void;
  onOpenActivityHistory: () => void;
  onOpenTeamList: () => void;
  onOpenApplyVolunteer: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userRole,
  profile,
  onChangeRole,
  onOpenEditProfile,
  onOpenBadgeAchievements,
  onOpenMyTrainings,
  onOpenActivityHistory,
  onOpenTeamList,
  onOpenApplyVolunteer
}) => {
  // “了解更多”收束折叠状态（收束联系爱阅志愿者管理员）
  const [showLearnMore, setShowLearnMore] = useState(false);

  // 认证提示状态演练开关（测试未激活 vs 已激活审核通过）
  const [testActivated, setTestActivated] = useState(profile.isVolunteerActivated);
  const [testAuditStatus, setTestAuditStatus] = useState(profile.volunteerTeamAuditStatus);

  // 计算当前称号与勋章
  const unlockedBadges = VOLUNTEER_BADGES.filter((b) => profile.serviceHours >= b.minHours);
  const currentBadge = unlockedBadges[unlockedBadges.length - 1] || null;

  // 区分判断：仅家长身份（tourist未认证志愿身份，或仅家长） vs 志愿者身份
  const isVolunteerIdentity = userRole === 'volunteer' || userRole === 'team_leader' || userRole === 'admin';

  return (
    <div className="bg-neutral-50 min-h-full pb-20 select-none">
      {/* 个人基本信息卡片 */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-rose-200 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-neutral-900">{profile.name}</h1>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                    isVolunteerIdentity
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {isVolunteerIdentity ? '注册志愿者' : '爱阅家长'}
                </span>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                {profile.phone}
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">
                归属：{profile.currentStationName || '爱阅公益空间站'}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenEditProfile}
            className="text-[11px] text-neutral-600 hover:text-neutral-900 border border-neutral-200 px-2.5 py-1 rounded-lg hover:bg-neutral-50"
          >
            编辑资料
          </button>
        </div>

        {/* 仅家长身份：引导加入志愿者条幅 */}
        {!isVolunteerIdentity && (
          <div className="mt-4 p-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                成为爱阅早期阅读领读志愿者
              </div>
              <div className="text-[10px] text-rose-100 mt-0.5">
                和孩子一起成长，记录公益志愿学时与荣誉称号
              </div>
            </div>
            <button
              onClick={() => {
                onChangeRole('volunteer');
                alert('【模拟认证成功】：已引导您完成爱阅志愿者认证注册！默认享有家长所有权限，并已解锁时长、勋章与培训中心。');
              }}
              className="px-3 py-1 bg-white text-rose-600 rounded-lg text-xs font-bold active:scale-95 shadow-xs whitespace-nowrap ml-2"
            >
              加入志愿者
            </button>
          </div>
        )}

        {/* 志愿者认证提示（仅志愿者）：
            未完成激活任务（培训或其他任务），申请加入队伍，提示“请完成……”
            已完成激活任务，申请入队，需要队伍管理员（站长/队长）审核 */}
        {isVolunteerIdentity && (
          <div className="mt-3.5 pt-3 border-t border-neutral-100">
            <div className="flex items-center justify-between text-[11px] mb-2">
              <span className="font-bold text-neutral-800">志愿者认证与激活入队状态：</span>
            </div>

            {!testActivated ? (
              /* 未完成激活任务提示 */
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">认证未激活提示</div>
                  <div className="text-[11px] text-amber-700 mt-0.5">
                    请先完成【爱阅早期阅读通识系列认证网课】培训任务后，方可申请加入本空间站。
                  </div>
                  <button
                    onClick={onOpenMyTrainings}
                    className="mt-2 px-2.5 py-1 bg-amber-600 text-white rounded text-[11px] font-bold active:scale-95"
                  >
                    前往小鹅通完成培训任务 &gt;
                  </button>
                </div>
              </div>
            ) : testAuditStatus === 'pending' ? (
              /* 已完成激活任务，申请入站待审核 */
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">入站审核中</div>
                  <div className="text-[11px] text-blue-700 mt-0.5">
                    您已完成通识激活任务，入站申请已提交！需等待空间站管理员（站长）审核通过。
                  </div>
                </div>
              </div>
            ) : testAuditStatus === 'approved' ? (
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  已正式加入：{profile.currentStationName}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-mono">
                  站长已核准
                </span>
              </div>
            ) : (
              <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
                <span>尚未申请加入具体空间站</span>
                <button
                  onClick={() => setTestAuditStatus('pending')}
                  className="px-2 py-0.5 bg-rose-600 text-white text-[10px] rounded"
                >
                  申请加入空间站
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 时长与成就（仅志愿者）：展示累计服务时长、参与场次记录及荣誉勋章（如星级/称号）
          仅家长身份不展示时长和成就 */}
      {isVolunteerIdentity && (
        <div className="mx-3 mt-3 bg-white rounded-2xl p-4 border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-neutral-900">
                志愿时长与成长成就（仅志愿者）
              </span>
            </div>
            <button
              onClick={onOpenBadgeAchievements}
              className="text-[11px] text-rose-600 hover:underline flex items-center gap-0.5"
            >
              <span>查看勋章与晋升规则</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            {/* 累计服务时长 */}
            <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="text-base font-black text-neutral-900 font-mono">
                {profile.serviceHours} <span className="text-[10px] font-normal">h</span>
              </div>
              <div className="text-[10px] text-neutral-500 mt-0.5">累计服务时长</div>
            </div>

            {/* 参与场次记录 */}
            <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="text-base font-black text-neutral-900 font-mono">
                {profile.activityCount} <span className="text-[10px] font-normal">场</span>
              </div>
              <div className="text-[10px] text-neutral-500 mt-0.5">参与活动场次</div>
            </div>

            {/* 称号与荣誉勋章 */}
            <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200">
              <div className="text-xs font-bold text-amber-800 truncate">
                {currentBadge ? currentBadge.title : '阅芽准备中'}
              </div>
              <div className="text-[9px] text-amber-700 mt-0.5 font-mono">
                {currentBadge ? currentBadge.badgeName : '勋章待设计'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 参与活动记录：区分呈现志愿活动和家长活动（包含已报名、已结束不同状态） */}
      <div className="mx-3 mt-3 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div
          onClick={onOpenActivityHistory}
          className="p-3.5 flex items-center justify-between hover:bg-neutral-50 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">
                参与活动记录（志愿活动 & 家长活动）
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">
                {isVolunteerIdentity
                  ? '分类查看志愿服务、家长活动、培训活动及表彰记录'
                  : '查看已报名的亲子阅读活动与往期参与记录'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* 志愿者学习培训（仅志愿者）：直接跳转外部小鹅通 */}
      {isVolunteerIdentity && (
        <div className="mx-3 mt-3 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
          <div
            onClick={onOpenMyTrainings}
            className="p-3.5 flex items-center justify-between hover:bg-neutral-50 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <span>志愿者培训（小鹅通知识店铺）</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-normal">外部</span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  点击直接跳转外部小鹅通，学习领读人通识认证网课
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      )}

      {/* 空间站归属列表入口 */}
      <div className="mx-3 mt-3 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div
          onClick={onOpenTeamList}
          className="p-3.5 flex items-center justify-between hover:bg-neutral-50 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">
                爱阅空间站一览
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">
                以省市区分级呈现，查看各空间站与对应活动
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* 了解更多（收束联系爱阅志愿者管理员，仅志愿者专属）：
          需求指定：联系爱阅志愿者管理员（仅志愿者）：显示二维码或联系信息。收束在“了解更多”中。 */}
      {isVolunteerIdentity && (
        <div className="mx-3 mt-3 bg-white rounded-2xl border border-neutral-200 shadow-2xs overflow-hidden">
          <button
            onClick={() => setShowLearnMore(!showLearnMore)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 text-left transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900">了解更多</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  常见问题、制度规章及联系爱阅志愿者管理员
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 transition-transform ${
                showLearnMore ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* 收束展开区 */}
          {showLearnMore && (
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 space-y-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-2">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-rose-600" />
                  <span>联系爱阅志愿者管理员（微信/二维码）：</span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-18 h-18 bg-neutral-200 rounded-lg flex flex-col items-center justify-center border border-neutral-300 text-neutral-500 font-mono text-[9px]">
                    <QrCode className="w-8 h-8 text-neutral-700" />
                    <span>[企业微信码]</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-neutral-600">
                    <div>微信号：<strong className="text-neutral-900">iread_volunteer_admin</strong></div>
                    <div>工作时间：周一至周五 09:30 - 18:00</div>
                    <div>办公电话：0755-8228****</div>
                    <div className="text-[10px] text-neutral-400">长按识别或保存二维码添加爱阅管理员</div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-neutral-400 leading-relaxed font-mono">
                * 仅对爱阅认证志愿者开放此管理员直联通道，用于学时补录、空间站立项与服务证明开具。
              </div>
            </div>
          )}
        </div>
      )}

      {/* 底部备注说明 */}
      <div className="p-4 text-center text-[10px] text-neutral-400 font-mono">
        * 志愿者身份默认享有家长所有权限；仅家长身份时隐藏服务时长与成就，展示引导加入志愿者入口
      </div>
    </div>
  );
};
