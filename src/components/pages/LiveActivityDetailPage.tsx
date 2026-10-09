import React, { useState } from 'react';
import { LiveActivity, EnrolledUser } from '../../types';
import {
  Calendar,
  MapPin,
  Building,
  Users,
  Clock,
  Share2,
  Heart,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  UserCheck
} from 'lucide-react';

interface LiveActivityDetailPageProps {
  activity: LiveActivity;
  userRole: 'tourist' | 'volunteer' | 'team_leader' | 'admin';
  userStationId?: string;
  isVolunteerActivated?: boolean;
  onOpenShare: (title: string, desc: string) => void;
  onOpenSignupWaiver: (type: 'volunteer' | 'participant') => void;
  isEnrolledAsVolunteer: boolean;
  isEnrolledAsParticipant: boolean;
}

export const LiveActivityDetailPage: React.FC<LiveActivityDetailPageProps> = ({
  activity,
  userRole,
  userStationId,
  isVolunteerActivated = true,
  onOpenShare,
  onOpenSignupWaiver,
  isEnrolledAsVolunteer,
  isEnrolledAsParticipant
}) => {
  // 需求设计建议：考虑活动内容和报名人员左右切换样式
  const [activeTab, setActiveTab] = useState<'content' | 'enrolled'>('content');
  // 报名人员二级分类筛选：全部、已报名（家长）、已报名（志愿者）
  const [enrolledFilter, setEnrolledFilter] = useState<'all' | 'volunteer' | 'parent'>('all');

  const filteredEnrolledUsers = activity.enrolledUsers.filter((u) => {
    if (enrolledFilter === 'all') return true;
    return u.type === enrolledFilter;
  });

  const volunteerCount = activity.enrolledUsers.filter((u) => u.type === 'volunteer').length;
  const parentCount = activity.enrolledUsers.filter((u) => u.type === 'parent').length;

  // 报名权限判断
  const isStationOnly = activity.volunteerRequirement === 'station_only';
  // 需求：未完成激活任务提示
  const canSignupVolunteer = userRole !== 'tourist';

  return (
    <div className="bg-neutral-50 min-h-full flex flex-col justify-between select-none">
      <div className="flex-1 pb-4">
        {/* 顶部主视觉海报 */}
        <div className="relative aspect-16/9 w-full bg-neutral-900 overflow-hidden">
        <img
          src={activity.coverImage}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            {activity.activityTypeName}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs shadow-xs ${
              activity.status === 'recruiting'
                ? 'bg-emerald-500 text-white'
                : activity.status === 'deadline_reached'
                ? 'bg-amber-500 text-white'
                : 'bg-neutral-500 text-white'
            }`}
          >
            {activity.status === 'recruiting'
              ? '报名中'
              : activity.status === 'deadline_reached'
              ? '已截止'
              : '已结束'}
          </span>
        </div>

        <div className="absolute bottom-2 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono">
          {activity.stationName}
        </div>
      </div>

      {/* 标题与核心信息 */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-neutral-500 font-mono">
          <span className="px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-600">
            {activity.district}
          </span>
          <span>·</span>
          <span>{activity.volunteerRequirement === 'station_only' ? '仅限本站志愿者' : '所有志愿者可报'}</span>
        </div>

        <h1 className="text-base font-bold text-neutral-900 leading-snug">
          {activity.title}
        </h1>

        {/* 关键时间与地点卡片 */}
        <div className="mt-3 space-y-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
          <div className="flex items-start gap-2">
            <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-neutral-500 text-[11px]">活动时间：</span>
              <span className="font-semibold text-neutral-900">{activity.timeDisplay}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-neutral-500 text-[11px]">活动地点：</span>
              <span className="font-semibold text-neutral-900">{activity.locationName}</span>
              <div className="text-[10px] text-neutral-500 mt-0.5">{activity.locationAddress}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-neutral-200/60">
            <Building className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="flex-1 flex items-center justify-between">
              <div>
                <span className="text-neutral-500 text-[11px]">归属空间站：</span>
                <span className="font-medium text-neutral-800">{activity.stationName}</span>
              </div>
              {activity.serviceHoursAward > 0 && (
                <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-mono font-bold">
                  时长奖励 +{activity.serviceHoursAward}h
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 名额概况 */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-2 text-center text-xs">
          <div className="p-2 bg-rose-50/60 rounded-xl border border-rose-100">
            <div className="text-sm font-bold text-rose-700">
              {activity.enrolledVolunteersCount} / {activity.volunteerQuota}
            </div>
            <div className="text-[10px] text-rose-600 mt-0.5">志愿者招募名额</div>
          </div>
          <div className="p-2 bg-blue-50/60 rounded-xl border border-blue-100">
            <div className="text-sm font-bold text-blue-700">
              {activity.enrolledParticipantsCount} / {activity.participantQuota}
            </div>
            <div className="text-[10px] text-blue-600 mt-0.5">家长/儿童参与名额</div>
          </div>
        </div>
      </div>

      {/* 左右分栏切换器（需求点：建议考虑活动内容和报名人员左右切换样式） */}
      <div className="bg-white border-b border-neutral-200 sticky top-17 z-20 flex">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition ${
            activeTab === 'content'
              ? 'border-rose-600 text-rose-600 bg-rose-50/20'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          活动内容与详情
        </button>
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition relative ${
            activeTab === 'enrolled'
              ? 'border-rose-600 text-rose-600 bg-rose-50/20'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <span>已成功报名人员</span>
          <span className="ml-1 text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.2 rounded-full font-mono">
            {activity.enrolledUsers.length}
          </span>
        </button>
      </div>

      {/* 选项卡1：活动内容与讲师/联系人信息（展示顺序：活动详情在前，讲师信息在后） */}
      {activeTab === 'content' && (
        <div className="p-3 space-y-3">
          {/* 1. 活动详情在前 */}
          <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-3">
            <h2 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 bg-rose-500 rounded-full"></span>
              活动背景与主要环节
            </h2>
            <div className="space-y-2 text-xs text-neutral-700 leading-relaxed">
              {activity.description.map((p, idx) => (
                <p key={idx} className="indent-4">
                  {p}
                </p>
              ))}
            </div>

            {/* 招募要求 */}
            <div className="pt-2 border-t border-neutral-100">
              <div className="text-[11px] font-bold text-neutral-800 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                招募与参与要求：
              </div>
              <ul className="space-y-1 text-[11px] text-neutral-600 list-disc pl-4">
                {activity.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. 讲师信息在后 (呈现头像、姓名、个人简介，默认站长，后台可编辑) */}
          <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-amber-500 rounded-full"></span>
                活动带教讲师信息
              </h2>
            </div>

            <div className="flex items-start gap-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200">
              <img
                src={activity.lecturer.avatar}
                alt={activity.lecturer.name}
                className="w-12 h-12 rounded-full object-cover shrink-0 border border-neutral-300"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">{activity.lecturer.name}</span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded border border-amber-200">
                    {activity.lecturer.role}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                  {activity.lecturer.bio}
                </p>
              </div>
            </div>
          </div>

          {/* 3. 联系人（默认站长，后台可编辑） */}
          <div className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-2xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <span>活动咨询联系人：{activity.contact.name}</span>
                  <span className="text-[9px] text-neutral-400 font-mono">({activity.contact.role})</span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  联系电话：{activity.contact.phone}
                </div>
              </div>
            </div>
            <button
              onClick={() => alert(`【模拟呼叫/微信】：联系电话 ${activity.contact.phone}`)}
              className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-medium rounded-lg"
            >
              拨号联系
            </button>
          </div>
        </div>
      )}

      {/* 选项卡2：已成功报名人员（呈现已成功报名头像及名称，区分已报名家长/已报名志愿者） */}
      {activeTab === 'enrolled' && (
        <div className="p-3 space-y-3">
          {/* 分类子标签 */}
          <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-neutral-200 text-xs">
            <button
              onClick={() => setEnrolledFilter('all')}
              className={`flex-1 py-1 text-[11px] font-medium rounded-lg transition ${
                enrolledFilter === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              全部已成功报名 ({activity.enrolledUsers.length})
            </button>
            <button
              onClick={() => setEnrolledFilter('volunteer')}
              className={`flex-1 py-1 text-[11px] font-medium rounded-lg transition ${
                enrolledFilter === 'volunteer'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              志愿者 ({volunteerCount})
            </button>
            <button
              onClick={() => setEnrolledFilter('parent')}
              className={`flex-1 py-1 text-[11px] font-medium rounded-lg transition ${
                enrolledFilter === 'parent'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              家长/参与者 ({parentCount})
            </button>
          </div>

          {/* 报名人员卡片列表 */}
          <div className="space-y-2">
            {filteredEnrolledUsers.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-neutral-200 text-xs text-neutral-400">
                暂无此类报名记录
              </div>
            ) : (
              filteredEnrolledUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-xl p-3 border border-neutral-200 shadow-2xs flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-neutral-900">{user.name}</span>
                        {/* 明确区分已报名（家长）与已报名（志愿者） */}
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                            user.type === 'volunteer'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {user.type === 'volunteer' ? '已报名志愿者' : '已报名家长'}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 font-mono">
                        报名时间：{user.enrolledAt}
                        {user.childrenAge && ` · 儿童年龄: ${user.childrenAge}`}
                        {user.serviceStationName && ` · ${user.serviceStationName}`}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    报名成功
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      </div>

      {/* 底部固定操作栏：使用 sticky bottom-0 且 w-full，完美对齐手机容器内 */}
      <div className="sticky bottom-0 left-0 right-0 w-full bg-white border-t border-neutral-200 p-2.5 px-4 flex items-center justify-between z-30 shadow-lg shrink-0">
        {/* 页面可分享按钮 */}
        <button
          onClick={() => onOpenShare(activity.title, `时间：${activity.timeDisplay} | 地点：${activity.locationName}`)}
          className="flex flex-col items-center gap-0.5 text-neutral-600 hover:text-neutral-900 px-2 active:scale-95 transition"
          title="分享此活动"
        >
          <Share2 className="w-4 h-4 text-neutral-500" />
          <span className="text-[10px]">转发分享</span>
        </button>

        {/* 报名双按钮入口（需求：可点击按钮报名志愿者，报名参加活动） */}
        <div className="flex items-center gap-2 flex-1 justify-end ml-3">
          {/* 入口1：报名参加活动（家长/参与者入口） */}
          {activity.participantQuota > 0 && (
            <button
              onClick={() => onOpenSignupWaiver('participant')}
              disabled={isEnrolledAsParticipant || activity.status !== 'recruiting'}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition active:scale-95 ${
                isEnrolledAsParticipant
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : activity.status === 'recruiting'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {isEnrolledAsParticipant ? '已报名参与者' : '报名参加活动(家长)'}
            </button>
          )}

          {/* 入口2：报名志愿者 */}
          {activity.volunteerQuota > 0 && (
            <button
              onClick={() => onOpenSignupWaiver('volunteer')}
              disabled={isEnrolledAsVolunteer || activity.status !== 'recruiting'}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 shadow-xs ${
                isEnrolledAsVolunteer
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : activity.status === 'recruiting'
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {isEnrolledAsVolunteer ? '已报名志愿者' : '报名志愿者'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
