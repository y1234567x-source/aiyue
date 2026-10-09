import React from 'react';
import { VOLUNTEER_BADGES, VolunteerTitleBadge } from '../../types';
import { Award, Clock, Star, Flame, CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface BadgeAchievementsPageProps {
  serviceHours: number;
}

export const BadgeAchievementsPage: React.FC<BadgeAchievementsPageProps> = ({
  serviceHours
}) => {
  // 当前获得的最高勋章
  const unlockedBadges = VOLUNTEER_BADGES.filter((b) => serviceHours >= b.minHours);
  const currentBadge = unlockedBadges[unlockedBadges.length - 1] || null;

  // 下一个进阶勋章
  const nextBadge = VOLUNTEER_BADGES.find((b) => serviceHours < b.minHours) || null;

  return (
    <div className="bg-neutral-50 min-h-full pb-20 select-none">
      {/* 顶部荣誉徽标卡片 */}
      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white p-6 border-b border-neutral-800 text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <h1 className="text-base font-bold text-white mt-3">
            {currentBadge ? currentBadge.title : '初星志愿者'}
          </h1>
          <div className="text-[11px] text-yellow-300/90 mt-0.5 font-mono">
            {currentBadge ? currentBadge.badgeName : '尚未获得初阶勋章'}
          </div>

          <div className="mt-4 inline-flex items-center gap-4 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/10">
            <div>
              <div className="text-[10px] text-neutral-400">累计志愿服务时长</div>
              <div className="text-base font-black text-white font-mono mt-0.5">
                {serviceHours} <span className="text-[11px] font-normal">小时</span>
              </div>
            </div>
            <div className="w-[1px] h-6 bg-white/20"></div>
            <div>
              <div className="text-[10px] text-neutral-400">已解锁荣誉勋章</div>
              <div className="text-base font-black text-yellow-400 font-mono mt-0.5">
                {unlockedBadges.length} / {VOLUNTEER_BADGES.length}
              </div>
            </div>
          </div>

          {nextBadge && (
            <div className="mt-3 text-[10px] text-neutral-300 font-mono">
              距离下一阶【{nextBadge.title}】还需服务 {(nextBadge.minHours - serviceHours).toFixed(1)} 小时
            </div>
          )}
        </div>
      </div>

      {/* 规则说明条 */}
      <div className="bg-white border-b border-neutral-200 px-4 py-2.5 text-[11px] text-neutral-600 flex items-center justify-between">
        <span className="font-semibold text-neutral-800">
          爱阅志愿者成长晋升阶梯（勋章待设计，称号规则）：
        </span>
        <span className="text-[10px] text-neutral-400 font-mono">共 6 级荣誉体系</span>
      </div>

      {/* 6 大勋章晋升列表 */}
      <div className="p-3 space-y-2.5">
        {VOLUNTEER_BADGES.map((b) => {
          const isUnlocked = serviceHours >= b.minHours;
          return (
            <div
              key={b.level}
              className={`p-3.5 rounded-xl border transition flex items-center gap-3.5 ${
                isUnlocked
                  ? 'bg-white border-neutral-200 shadow-2xs'
                  : 'bg-neutral-100/70 border-neutral-200/60 opacity-60'
              }`}
            >
              {/* 勋章占位图标（勋章待设计） */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isUnlocked
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                    : 'bg-neutral-200 border-neutral-300 text-neutral-400'
                }`}
              >
                {isUnlocked ? (
                  <Award className="w-6 h-6" />
                ) : (
                  <Lock className="w-5 h-5 text-neutral-400" />
                )}
              </div>

              {/* 称号与说明 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-neutral-900">{b.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-700">
                      {b.minHours} 小时
                    </span>
                  </div>
                  {isUnlocked ? (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      已获得
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-400 font-mono">未解锁</span>
                  )}
                </div>

                <div className="text-[10px] text-rose-600 font-medium mt-0.5">
                  【{b.badgeName}】(待UI设计出图)
                </div>

                <div className="text-[11px] text-neutral-500 mt-1 line-clamp-1">
                  {b.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-3 text-center text-[10px] text-neutral-400 font-mono">
        * 勋章图标视觉待设计师提供高保真切图，当前以线框排布呈现晋升规则
      </div>
    </div>
  );
};
