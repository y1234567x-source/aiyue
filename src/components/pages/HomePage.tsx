import React, { useState, useEffect, useMemo } from 'react';
import {
  BannerItem,
  ActivityReviewItem,
  VolunteerStats,
  StatsDisplayConfig,
  UserRole
} from '../../types';
import {
  Users,
  Clock,
  Building2,
  CalendarDays,
  Home,
  Users2,
  GraduationCap,
  BookOpen,
  FileText,
  Plus,
  Sparkles,
  Heart,
  Share2,
  MapPin,
  ChevronRight,
  TrendingUp,
  Flame,
  Award
} from 'lucide-react';

interface HomePageProps {
  banners: BannerItem[];
  stats: VolunteerStats;
  statsDisplayConfig?: StatsDisplayConfig; // 后台控制选择哪些展示
  activityReviews: ActivityReviewItem[];
  showTeamEntry: boolean; // 空间站入口显隐（空间站尚在组建，可先隐藏）
  showStatsCard: boolean; // 志愿数据卡片全局显隐
  donationPlacement?: 'quick_entry' | 'bottom_tab' | 'project_only';
  userRole: UserRole;
  onNavigateToBanner: (bannerId: string) => void;
  onNavigateToActivity: (activityId: string) => void;
  onNavigateToTeamList: () => void;
  onNavigateToTraining: () => void;
  onNavigateToProjects: () => void;
  onNavigateToRegulation?: () => void;
  onOpenDonationModal?: () => void;
  onOpenShareModal: (title: string, desc: string) => void;
  onToggleLikeReview: (activityId: string) => void;
  likedReviewIds: Set<string>;
}

export const HomePage: React.FC<HomePageProps> = ({
  banners,
  stats,
  statsDisplayConfig,
  activityReviews,
  showTeamEntry,
  showStatsCard,
  donationPlacement,
  userRole,
  onNavigateToBanner,
  onNavigateToActivity,
  onNavigateToTeamList,
  onNavigateToTraining,
  onNavigateToProjects,
  onNavigateToRegulation,
  onOpenDonationModal,
  onOpenShareModal,
  onToggleLikeReview,
  likedReviewIds
}) => {
  // Banner 自动轮播状态
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 后台控制志愿数据公示项过滤：前台不设点击隐藏，由后台统一控制选择展示哪些数据指标
  const isCardVisible = statsDisplayConfig ? statsDisplayConfig.showCard : showStatsCard;

  const visibleStatsItems = useMemo(() => {
    const cfg = statsDisplayConfig || {
      showCard: true,
      showVolunteerCount: true,
      showServiceHours: true,
      showSpaceStationCount: true,
      showActivitySessions: true,
      showBeneficiaryFamilies: true
    };

    const list = [];
    if (cfg.showVolunteerCount) {
      list.push({
        key: 'volunteerCount',
        label: '志愿者人数',
        value: stats.volunteerCount.toLocaleString()
      });
    }
    if (cfg.showServiceHours) {
      list.push({
        key: 'serviceHours',
        label: '服务时长(h)',
        value: `${(stats.serviceHours / 1000).toFixed(1)}k`
      });
    }
    if (cfg.showSpaceStationCount) {
      list.push({
        key: 'spaceStationCount',
        label: '空间站个数',
        value: stats.spaceStationCount.toString()
      });
    }
    if (cfg.showActivitySessions) {
      list.push({
        key: 'activitySessions',
        label: '公益场次',
        value: stats.activitySessions.toLocaleString()
      });
    }
    if (cfg.showBeneficiaryFamilies) {
      list.push({
        key: 'beneficiaryFamilies',
        label: '服务家庭数',
        value: `${(stats.beneficiaryFamilies / 1000).toFixed(1)}k`
      });
    }
    return list;
  }, [stats, statsDisplayConfig]);

  // 活动回顾：默认发布时间展示，由最近开始的；置顶项优先排在最前（“优先推荐”已调整为“置顶”）
  const sortedReviews = useMemo(() => {
    return [...activityReviews].sort((a, b) => {
      // 置顶优先展示
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }
      // 默认发布时间展示，由最近开始的 (从近到远倒序)
      return b.publishDate.localeCompare(a.publishDate);
    });
  }, [activityReviews]);

  // Banner 自动定时轮播
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, banners.length]);

  return (
    <div className="bg-neutral-100 min-h-full pb-20 select-none">
      {/* 1. 志愿者Logo（首屏展示：爱阅提供） */}
      <div className="bg-white px-4 py-3 border-b border-neutral-200">
        <div className="flex items-center gap-2.5">
          {/* 爱阅志愿者Logo 标志区 */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white flex flex-col items-center justify-center shadow-xs border border-rose-400">
            <span className="text-xs font-black tracking-tighter">爱阅</span>
            <span className="text-[7px] font-bold scale-90 -mt-0.5">VOLUNTEER</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-neutral-900 tracking-tight">
                深圳市爱阅公益基金会
              </span>
              <span className="text-[9px] bg-rose-50 text-rose-600 px-1 py-0.2 rounded font-mono border border-rose-200">
                官方认证
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
              <span>爱阅志愿者协会</span>
              <span>·</span>
              <span className="text-neutral-400">阅读照亮童年</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Banner（首屏展示）：只有标题和副标题，无推文/资讯等标签，自动轮转，点进有详情页 */}
      <div
        className="relative bg-neutral-900 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          onClick={() => onNavigateToBanner(banners[currentBannerIndex]?.id)}
          className="relative aspect-16/8 w-full cursor-pointer group"
        >
          <img
            src={banners[currentBannerIndex]?.coverImage}
            alt={banners[currentBannerIndex]?.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* 蒙层与文字（仅标题与副标题） */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3.5 text-white">
            <h3 className="text-xs font-bold leading-snug line-clamp-1 group-hover:text-rose-200 transition-colors">
              {banners[currentBannerIndex]?.title}
            </h3>
            <p className="text-[10px] text-neutral-300 line-clamp-1 mt-0.5">
              {banners[currentBannerIndex]?.summary}
            </p>
          </div>
        </div>

        {/* 轮播点指示器 */}
        <div className="absolute bottom-2 right-3 flex items-center gap-1 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentBannerIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                currentBannerIndex === i
                  ? 'w-4 bg-white'
                  : 'w-1.5 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. 志愿数据公示（首屏展示）：不需要点击隐藏，由后台控制选择哪些展示 */}
      {isCardVisible && visibleStatsItems.length > 0 && (
        <div className="mx-3 mt-3 bg-white rounded-2xl p-3.5 border border-neutral-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-2.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-xs font-bold text-neutral-900">爱阅志愿数据公示</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">
              公开数据
            </span>
          </div>

          <div
            className="grid gap-1 text-center"
            style={{
              gridTemplateColumns: `repeat(${visibleStatsItems.length}, minmax(0, 1fr))`
            }}
          >
            {visibleStatsItems.map((item, index) => (
              <div
                key={item.key}
                className={`p-1 rounded-lg ${
                  index > 0 ? 'border-l border-neutral-100' : ''
                }`}
              >
                <div className="text-xs font-bold text-neutral-900 font-mono">
                  {item.value}
                </div>
                <div className="text-[9px] text-neutral-500 scale-95 mt-0.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 快捷功能入口：以图标作为快捷入口，保留扩展可能性 */}
      <div className="mx-3 mt-3 bg-white rounded-2xl p-3 border border-neutral-200/90 shadow-2xs">
        <div className="grid grid-cols-4 gap-2 text-center">
          {/* ① 空间站：空间站尚在组建，可先隐藏 (受 showTeamEntry 控制) */}
          {showTeamEntry ? (
            <button
              onClick={onNavigateToTeamList}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 active:scale-95 transition group"
            >
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs border border-blue-100 group-hover:bg-blue-100 transition">
                <Users2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-neutral-800">空间站</span>
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-50/80 border border-dashed border-neutral-200 opacity-60">
              <div className="w-9 h-9 rounded-xl bg-neutral-200 text-neutral-400 flex items-center justify-center text-[10px]">
                筹建中
              </div>
              <span className="text-[10px] text-neutral-400 mt-1">空间站</span>
            </div>
          )}

          {/* ② 志愿者培训：小鹅通跳转 + 培训中心 */}
          <button
            onClick={onNavigateToTraining}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 active:scale-95 transition group"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs border border-amber-100 group-hover:bg-amber-100 transition">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-800">志愿者培训</span>
          </button>

          {/* ③ 了解项目：展示多个公益项目图文卡片 */}
          <button
            onClick={onNavigateToProjects}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 active:scale-95 transition group"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs border border-emerald-100 group-hover:bg-emerald-100 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-800">了解项目</span>
          </button>

          {/* ④ 爱阅规范：查看空间站运营规范与志愿者服务制度 */}
          <button
            onClick={onNavigateToRegulation}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 active:scale-95 transition group"
          >
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs border border-indigo-100 group-hover:bg-indigo-100 transition">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-800">爱阅规范</span>
          </button>
        </div>
      </div>

      {/* 5. 活动回顾：默认发布时间展示，由最近开始的；优先推荐改为“置顶” */}
      <div className="mx-3 mt-4">
        {/* 区域标题栏 */}
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-rose-500 rounded-full"></span>
            <h2 className="text-xs font-bold text-neutral-900 tracking-tight">
              活动回顾
            </h2>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono">
            按最新发布排序
          </span>
        </div>

        {/* 瀑布流 / 2列卡片排布 (以图片吸引为主的样式) */}
        <div className="grid grid-cols-2 gap-2.5">
          {sortedReviews.slice(0, 16).map((item) => {
            const isLiked = likedReviewIds.has(item.id);
            const publisherDisplay = item.publisher || item.serviceStationName || '爱阅公益';

            return (
              <div
                key={item.id}
                onClick={() => onNavigateToActivity(item.id)}
                className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-2xs hover:border-neutral-300 active:scale-[0.99] transition cursor-pointer flex flex-col justify-between"
              >
                {/* 封面图片 */}
                <div className="relative aspect-4/3 w-full bg-neutral-200 overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* 置顶推荐标记（“优先推荐”已调整为“置顶”） */}
                  {item.isPinned && (
                    <div className="absolute top-1.5 left-1.5 bg-rose-600/95 text-white backdrop-blur-xs text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      置顶
                    </div>
                  )}

                  {/* 默认发布时间展示（由最近开始的） */}
                  <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[8px] font-mono px-1 rounded">
                    {item.publishDate}
                  </div>
                </div>

                {/* 图文回顾内容：只需要标题、发布人、点赞 */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* ① 标题 */}
                    <h3 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* 底部信息栏：发布人 + 点赞 */}
                  <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                    {/* ② 发布人 */}
                    <span className="text-neutral-500 truncate max-w-[90px]" title={publisherDisplay}>
                      {publisherDisplay}
                    </span>

                    {/* ③ 点赞按钮 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLikeReview(item.id);
                      }}
                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
                        isLiked
                          ? 'text-rose-600 font-bold bg-rose-50'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                      title="点赞"
                    >
                      <Heart
                        className={`w-3 h-3 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                      <span>{item.likeCount + (isLiked ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部没有更多提示 */}
        <div className="text-center py-5 text-[10px] text-neutral-400 font-mono">
          - 暂无更多活动回顾 -
        </div>
      </div>
    </div>
  );
};
