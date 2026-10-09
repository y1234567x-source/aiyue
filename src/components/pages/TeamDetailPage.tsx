import React, { useState } from 'react';
import { TeamItem, ActivityReviewItem, LiveActivity } from '../../types';
import {
  MapPin,
  Users,
  Clock,
  Calendar,
  Building,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  Award,
  Phone,
  Info,
  CalendarDays,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface TeamDetailPageProps {
  team: TeamItem;
  associatedActivities: ActivityReviewItem[];
  liveActivities?: LiveActivity[];
  onSelectActivity: (activityId: string) => void;
  onSelectLiveActivity?: (activityId: string) => void;
  onOpenExternalReference?: () => void;
}

export const TeamDetailPage: React.FC<TeamDetailPageProps> = ({
  team,
  associatedActivities = [],
  liveActivities = [],
  onSelectActivity,
  onSelectLiveActivity
}) => {
  // 分列展示：团队介绍 vs 团队活动
  const [activeTab, setActiveTab] = useState<'intro' | 'activities'>('intro');
  // 团队活动二级筛选：全部、招募中、往期回顾
  const [activityFilter, setActivityFilter] = useState<'all' | 'recruiting' | 'review'>('all');
  // 复制地址反馈状态
  const [copiedAddress, setCopiedAddress] = useState(false);

  const totalActivitiesCount = liveActivities.length + associatedActivities.length;

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(team.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="bg-neutral-50 min-h-full flex flex-col justify-between select-none">
      <div className="flex-1 pb-4">
        {/* 顶部空间站头部卡片 */}
        <div className="bg-white border-b border-neutral-200 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
              {team.province} · {team.city} · {team.district}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                team.status === '运营中'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {team.status}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 font-medium flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-rose-500" />
              示范空间站
            </span>
          </div>

          <h1 className="text-base font-bold text-neutral-900 leading-snug">
            {team.name}
          </h1>

          {/* 空间站长信息卡片 (按要求：不出现“维护团队”，后台逻辑无需在前台展示) */}
          <div className="mt-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0">
                站
              </div>
              <div>
                <div className="text-[11px] font-semibold text-neutral-900 flex items-center gap-1">
                  <span>站长：{team.leaderName}</span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 font-mono">
                  建站时间：{team.establishedDate}
                </div>
              </div>
            </div>
            <div className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              认证空间站
            </div>
          </div>

          {/* 关键数据看板 */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-100 text-center">
            <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-sm font-bold text-neutral-900">{team.volunteerCount} 人</div>
              <div className="text-[10px] text-neutral-500 mt-0.5 flex items-center justify-center gap-1">
                <Users className="w-3 h-3 text-neutral-400" />
                注册志愿者
              </div>
            </div>
            <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-sm font-bold text-neutral-900">{team.serviceHours} 时</div>
              <div className="text-[10px] text-neutral-500 mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-neutral-400" />
                累计时长
              </div>
            </div>
            <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-sm font-bold text-neutral-900">{totalActivitiesCount > 0 ? totalActivitiesCount : 8} 场</div>
              <div className="text-[10px] text-neutral-500 mt-0.5 flex items-center justify-center gap-1">
                <CalendarDays className="w-3 h-3 text-neutral-400" />
                开展活动
              </div>
            </div>
          </div>
        </div>

        {/* 核心分列切换栏：团队介绍 与 团队活动 分列展示 */}
        <div className="bg-white border-b border-neutral-200 sticky top-0 z-20 flex shadow-2xs">
          <button
            onClick={() => setActiveTab('intro')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'intro'
                ? 'border-rose-600 text-rose-600 bg-rose-50/20'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>团队介绍</span>
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'activities'
                ? 'border-rose-600 text-rose-600 bg-rose-50/20'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>团队活动</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === 'activities'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {totalActivitiesCount}
            </span>
          </button>
        </div>

        {/* 分列一：团队介绍 */}
        {activeTab === 'intro' && (
          <div className="p-3 space-y-3">
            {/* 1. 空间站简介与宗旨 */}
            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-2.5">
              <h2 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-rose-500 rounded-full"></span>
                空间站简介与服务宗旨
              </h2>
              <p className="text-xs text-neutral-700 leading-relaxed indent-4">
                {team.intro}
              </p>
              <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-100 text-[11px] text-rose-900 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong>服务理念：</strong>扎根社区儿童友好空间，打通亲子绘本阅读最后一公里，以志愿陪伴守护每个孩子温暖成长。
                </div>
              </div>
            </div>

            {/* 2. 常设地址与开放时间 */}
            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-2.5">
              <h2 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-blue-500 rounded-full"></span>
                常设地址与开放指引
              </h2>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-neutral-900">空间站常设地址</div>
                      <div className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                        {team.address}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="px-2 py-1 bg-white hover:bg-neutral-100 rounded text-[10px] text-neutral-700 border border-neutral-300 shrink-0 flex items-center gap-1 transition"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-neutral-500" />
                        <span>复制</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 border-t border-neutral-200/60 flex items-center gap-2 text-[11px] text-neutral-600">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>日常开放时间：周二至周日 09:30 - 18:00（周一闭馆图书消杀整备）</span>
                </div>
              </div>
            </div>

            {/* 3. 空间站长与核心领读队伍 */}
            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-2.5">
              <h2 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span>
                空间站长与核心领读队伍
              </h2>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0">
                    站
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {team.leaderName}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      认证领读者 · 空间站负责人
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  建站：{team.establishedDate}
                </div>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                “用一本好书，陪伴一颗童心。我们常设领读者、讲读志愿者与图书管理员，欢迎更多爱心人士加入我们的空间站大家庭！”
              </p>
            </div>

            {/* 4. 空间站特色与服务设施 */}
            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-2.5">
              <h2 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-amber-500 rounded-full"></span>
                服务设施与配置
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="font-semibold text-neutral-900 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                    藏书丰富
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">
                    1000+ 册正版精装绘本
                  </div>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="font-semibold text-neutral-900 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    儿童友好
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">
                    防撞软包、防蚊与急救包
                  </div>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="font-semibold text-neutral-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    智能借阅
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">
                    扫码自主借还与通借通还
                  </div>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="font-semibold text-neutral-900 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    学时认证
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">
                    服务时长对接官方志愿系统
                  </div>
                </div>
              </div>
            </div>

            {/* 5. 志愿者招募与入驻须知 */}
            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs space-y-2">
              <h2 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-neutral-900 rounded-full"></span>
                志愿者加入条件与说明
              </h2>
              <ul className="space-y-1.5 text-[11px] text-neutral-600 list-disc pl-4 leading-relaxed">
                <li>年满18周岁，热爱早期阅读推广，具备良好的沟通能力与亲和力；</li>
                <li>热心社区公益，每月能至少保证参与1次空间站伴读或图书整理志愿服务；</li>
                <li>加入后需完成爱阅早期阅读领读人线上通识培训并遵守儿童保护准则。</li>
              </ul>
            </div>
          </div>
        )}

        {/* 分列二：团队活动 */}
        {activeTab === 'activities' && (
          <div className="p-3 space-y-3">
            {/* 活动二级分类筛选 */}
            <div className="flex items-center gap-1.5 bg-neutral-200/70 p-1 rounded-xl text-xs">
              <button
                onClick={() => setActivityFilter('all')}
                className={`flex-1 py-1.5 rounded-lg text-center transition font-semibold ${
                  activityFilter === 'all'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                全部 ({totalActivitiesCount})
              </button>
              <button
                onClick={() => setActivityFilter('recruiting')}
                className={`flex-1 py-1.5 rounded-lg text-center transition font-semibold ${
                  activityFilter === 'recruiting'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                招募中 ({liveActivities.length})
              </button>
              <button
                onClick={() => setActivityFilter('review')}
                className={`flex-1 py-1.5 rounded-lg text-center transition font-semibold ${
                  activityFilter === 'review'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                往期回顾 ({associatedActivities.length})
              </button>
            </div>

            {/* 1. 招募中 / 进行中活动 */}
            {(activityFilter === 'all' || activityFilter === 'recruiting') && (
              <div className="space-y-2.5">
                {liveActivities.length > 0 && (
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-800 px-1">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-500" />
                      招募中与近期活动 ({liveActivities.length})
                    </span>
                  </div>
                )}

                {liveActivities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => onSelectLiveActivity ? onSelectLiveActivity(act.id) : onSelectActivity(act.id)}
                    className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs hover:shadow-xs transition cursor-pointer flex gap-3"
                  >
                    <div className="w-20 h-20 rounded-lg bg-neutral-200 overflow-hidden shrink-0 relative">
                      <img
                        src={act.coverImage}
                        alt={act.title}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute top-1 left-1 text-[8px] font-bold px-1.5 py-0.2 rounded-full text-white ${
                          act.status === 'recruiting'
                            ? 'bg-emerald-600'
                            : act.status === 'deadline_reached'
                            ? 'bg-amber-600'
                            : 'bg-neutral-600'
                        }`}
                      >
                        {act.status === 'recruiting' ? '招募中' : act.status === 'deadline_reached' ? '已截止' : '已结束'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-[9px] px-1.5 py-0.2 bg-neutral-100 text-neutral-700 rounded font-mono">
                            {act.activityTypeName}
                          </span>
                          {act.serviceHoursAward > 0 && (
                            <span className="text-[9px] px-1 py-0.2 bg-rose-50 text-rose-600 rounded font-mono font-bold">
                              +{act.serviceHoursAward}h
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-snug">
                          {act.title}
                        </h3>
                      </div>

                      <div className="space-y-1 mt-1.5 text-[10px] text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-neutral-400 shrink-0" />
                          <span className="truncate">{act.timeDisplay}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-emerald-700 font-medium">
                            志愿者招募：{act.enrolledVolunteersCount}/{act.volunteerQuota}
                          </span>
                          <span className="text-rose-600 font-bold flex items-center">
                            去报名 &gt;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. 历次活动回顾 */}
            {(activityFilter === 'all' || activityFilter === 'review') && (
              <div className="space-y-2.5 pt-1">
                {associatedActivities.length > 0 && (
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-800 px-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      历次活动回顾 ({associatedActivities.length})
                    </span>
                  </div>
                )}

                {associatedActivities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => onSelectActivity(act.id)}
                    className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs hover:shadow-xs transition cursor-pointer flex gap-3"
                  >
                    <div className="w-20 h-20 rounded-lg bg-neutral-200 overflow-hidden shrink-0 relative">
                      <img
                        src={act.coverImage}
                        alt={act.title}
                        className="w-full h-full object-cover"
                      />
                      {act.isPinned && (
                        <span className="absolute top-1 left-1 bg-rose-600 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">
                          置顶
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-snug">
                          {act.title}
                        </h3>
                        <div className="text-[10px] text-neutral-500 truncate mt-1">
                          对象：{act.serviceTarget}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                        <span>{act.publishDate}</span>
                        <span className="text-rose-600 font-sans font-medium flex items-center">
                          查看回顾 &gt;
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 空状态提示 */}
            {((activityFilter === 'recruiting' && liveActivities.length === 0) ||
              (activityFilter === 'review' && associatedActivities.length === 0) ||
              (activityFilter === 'all' && totalActivitiesCount === 0)) && (
              <div className="p-8 bg-white rounded-xl text-center border border-neutral-200 space-y-2 my-2">
                <Calendar className="w-8 h-8 text-neutral-300 mx-auto" />
                <div className="text-xs text-neutral-600 font-medium">该空间站暂无对应活动</div>
                <div className="text-[10px] text-neutral-400">站长正积极策划新活动中，敬请期待</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 底部固定操作条：使用 sticky bottom-0 且 w-full，完美对齐手机容器内 */}
      <div className="sticky bottom-0 left-0 right-0 w-full bg-white border-t border-neutral-200 p-2.5 px-4 flex items-center justify-between z-30 shadow-lg shrink-0">
        <div className="text-[10px] text-neutral-400 font-mono">
          游客及所有状态均可查看
        </div>
        <button
          onClick={() => alert(`【模拟交互】：已提交加入“${team.name}”的申请，站长审核后将短信通知您。`)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-xl shadow-xs active:scale-95 transition flex items-center gap-1.5"
        >
          <Users className="w-3.5 h-3.5" />
          <span>申请加入本空间站</span>
        </button>
      </div>
    </div>
  );
};

