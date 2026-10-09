import React, { useState, useMemo } from 'react';
import {
  LiveActivity,
  ActivityTargetAudience,
  ActivityStatus,
  ActivityVolunteerRequirement,
  ActivityType,
  ActivityReviewItem
} from '../../types';
import {
  Calendar,
  Filter,
  MapPin,
  Users,
  Clock,
  Sparkles,
  ChevronDown,
  Building,
  RotateCcw,
  BookOpen,
  Award,
  HeartHandshake
} from 'lucide-react';

interface ActivitiesTabProps {
  liveActivities: LiveActivity[];
  activityReviews: ActivityReviewItem[];
  userRole: 'tourist' | 'volunteer' | 'team_leader' | 'admin';
  userStationId?: string;
  onSelectLiveActivity: (id: string) => void;
  onSelectReviewActivity: (id: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({
  liveActivities,
  activityReviews,
  userRole,
  userStationId,
  onSelectLiveActivity,
  onSelectReviewActivity
}) => {
  // 顶部大区分类：活动大厅 (最新招募) vs 往期活动回顾
  const [mainSection, setMainSection] = useState<'hall' | 'reviews'>('hall');

  // 待评估讨论双入口：服务对象（家长活动）vs 志愿者（所有注册类型）
  const [entryMode, setEntryMode] = useState<'all' | 'volunteer' | 'parent'>('all');

  // 多维筛选状态
  const [selectedTargetAudience, setSelectedTargetAudience] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRequirement, setSelectedRequirement] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // 下拉筛选框常量定义
  const districts = ['全部区', '南山区', '福田区', '宝安区', '龙岗区', '罗湖区', '光明区'];

  // 重置筛选
  const handleResetFilters = () => {
    setSelectedTargetAudience('all');
    setSelectedStatus('all');
    setSelectedRequirement('all');
    setSelectedType('all');
    setSelectedDistrict('all');
    setEntryMode('all');
  };

  // 根据筛选条件过滤活动
  const filteredActivities = useMemo(() => {
    return liveActivities.filter((act) => {
      // 1. 双入口快速筛选
      if (entryMode === 'parent' && act.activityType !== 'parent_reading' && act.targetAudience === 'recruit_volunteer') {
        return false;
      }
      if (entryMode === 'volunteer' && act.targetAudience === 'recruit_participant' && act.activityType === 'parent_reading') {
        return false;
      }

      // 2. 按招募对象筛选
      if (selectedTargetAudience === 'recruit_volunteer' && act.targetAudience === 'recruit_participant') {
        return false;
      }
      if (selectedTargetAudience === 'recruit_participant' && act.targetAudience === 'recruit_volunteer') {
        return false;
      }

      // 3. 按状态筛选
      if (selectedStatus !== 'all' && act.status !== selectedStatus) {
        return false;
      }

      // 4. 按要求筛选 (所有志愿者、仅限本站志愿者)
      if (selectedRequirement !== 'all' && act.volunteerRequirement !== selectedRequirement) {
        return false;
      }

      // 5. 按类型筛选 (志愿服务、学习培训、联谊交流、评优表彰、家长活动)
      if (selectedType !== 'all' && act.activityType !== selectedType) {
        return false;
      }

      // 6. 按地点（筛选到区）
      if (selectedDistrict !== 'all' && act.district !== selectedDistrict) {
        return false;
      }

      return true;
    });
  }, [liveActivities, entryMode, selectedTargetAudience, selectedStatus, selectedRequirement, selectedType, selectedDistrict]);

  return (
    <div className="bg-neutral-50 min-h-full pb-20 select-none">
      {/* 顶部主切换：活动大厅最新招募 vs 活动回顾宣传 */}
      <div className="bg-white border-b border-neutral-200 p-2 flex items-center justify-center gap-2 sticky top-17 z-20">
        <button
          onClick={() => setMainSection('hall')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            mainSection === 'hall'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          活动大厅 · 最新招募
        </button>
        <button
          onClick={() => setMainSection('reviews')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            mainSection === 'reviews'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          已结束活动回顾宣传
        </button>
      </div>

      {mainSection === 'hall' ? (
        <div>
          {/* 待评估讨论区域：服务对象和志愿者双入口 */}
          <div className="bg-rose-50/70 border-b border-rose-200 p-3">
            <div className="text-[11px] font-bold text-rose-900 mb-1.5 flex items-center justify-between">
              <span>【待评估讨论】服务对象与志愿者双入口快速分流：</span>
              <button
                onClick={handleResetFilters}
                className="text-[10px] text-rose-600 underline flex items-center gap-0.5"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                重置筛选
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setEntryMode('all')}
                className={`py-1.5 rounded-lg text-xs font-semibold text-center transition ${
                  entryMode === 'all'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-rose-200 text-neutral-700 hover:bg-rose-100/50'
                }`}
              >
                全部活动
              </button>
              <button
                onClick={() => setEntryMode('volunteer')}
                className={`py-1.5 rounded-lg text-xs font-semibold text-center transition ${
                  entryMode === 'volunteer'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-rose-200 text-neutral-700 hover:bg-rose-100/50'
                }`}
              >
                志愿者专属入口
              </button>
              <button
                onClick={() => setEntryMode('parent')}
                className={`py-1.5 rounded-lg text-xs font-semibold text-center transition ${
                  entryMode === 'parent'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-rose-200 text-neutral-700 hover:bg-rose-100/50'
                }`}
              >
                家长/服务对象入口
              </button>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1.5 leading-snug">
              {entryMode === 'volunteer' && (
                <span className="text-rose-700">
                  ★ 注册志愿者可参与：志愿服务、学习培训、联谊交流、评优表彰等
                </span>
              )}
              {entryMode === 'parent' && (
                <span className="text-blue-700">
                  ★ 家长活动入口：以团队开展的阅读公益活动为主，带娃报名参与
                </span>
              )}
              {entryMode === 'all' && (
                <span>展示所有对公众开放与志愿者报名的爱阅公益活动</span>
              )}
            </div>
          </div>

          {/* 多维筛选控制器（下拉框与按钮排布） */}
          <div className="bg-white border-b border-neutral-200 p-3 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span className="flex items-center gap-1 font-bold text-neutral-800">
                <Filter className="w-3.5 h-3.5 text-neutral-400" />
                多维综合筛选
              </span>
              <span>筛选到区 / 对象 / 状态 / 要求 / 类型</span>
            </div>

            {/* 筛选行1：地点（下拉框，筛选到区）+ 状态（报名中、已截止、已结束） */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-neutral-400 mb-0.5 block font-mono">
                  活动地点（筛选到区）：
                </label>
                <div className="relative">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-1 px-2 text-xs text-neutral-800 appearance-none font-medium pr-6"
                  >
                    <option value="all">深圳市 (全部区)</option>
                    {districts.filter(d => d !== '全部区').map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 mb-0.5 block font-mono">
                  活动状态：
                </label>
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-1 px-2 text-xs text-neutral-800 appearance-none font-medium pr-6"
                  >
                    <option value="all">全部状态</option>
                    <option value="recruiting">报名中</option>
                    <option value="deadline_reached">已截止</option>
                    <option value="completed">已结束</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 筛选行2：招募对象 + 志愿者要求 */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-neutral-400 mb-0.5 block font-mono">
                  按招募对象：
                </label>
                <div className="relative">
                  <select
                    value={selectedTargetAudience}
                    onChange={(e) => setSelectedTargetAudience(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-1 px-2 text-xs text-neutral-800 appearance-none font-medium pr-6"
                  >
                    <option value="all">不限对象</option>
                    <option value="recruit_volunteer">招募志愿者</option>
                    <option value="recruit_participant">招募参与者(家长/儿童)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 mb-0.5 block font-mono">
                  按招募要求：
                </label>
                <div className="relative">
                  <select
                    value={selectedRequirement}
                    onChange={(e) => setSelectedRequirement(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-1 px-2 text-xs text-neutral-800 appearance-none font-medium pr-6"
                  >
                    <option value="all">不限要求</option>
                    <option value="all_volunteers">所有志愿者可报</option>
                    <option value="station_only">仅限本站志愿者</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 筛选行3：活动类型横滑胶囊（志愿活动、学习培训、联谊交流、评优表彰、家长活动） */}
            <div className="pt-1 border-t border-neutral-100">
              <label className="text-[10px] text-neutral-400 mb-1 block font-mono">
                按活动类型筛选（支持后台扩展增加）：
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                {[
                  { key: 'all', label: '全部类型' },
                  { key: 'volunteer_service', label: '志愿服务' },
                  { key: 'parent_reading', label: '家长活动' },
                  { key: 'training', label: '学习培训' },
                  { key: 'exchange', label: '联谊交流' },
                  { key: 'commendation', label: '评优表彰' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedType(item.key)}
                    className={`px-2.5 py-0.5 rounded-full whitespace-nowrap transition ${
                      selectedType === item.key
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 筛选结果统计 */}
          <div className="px-4 py-2 flex items-center justify-between text-[11px] text-neutral-500">
            <span>
              已为您匹配 <strong className="text-neutral-900">{filteredActivities.length}</strong> 场活动
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">点击卡片查看详情与报名</span>
          </div>

          {/* 最新志愿服务活动列表 */}
          <div className="px-3 space-y-3">
            {filteredActivities.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-neutral-200 text-neutral-400 text-xs">
                没有符合条件的活动，请尝试放宽筛选条件
              </div>
            ) : (
              filteredActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => onSelectLiveActivity(act.id)}
                  className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-2xs hover:border-neutral-300 active:scale-[0.99] transition cursor-pointer"
                >
                  {/* 状态与类型头标 */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700">
                        {act.district}
                      </span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        {act.activityTypeName}
                      </span>
                      {act.volunteerRequirement === 'station_only' && (
                        <span className="text-[9px] bg-amber-50 text-amber-700 px-1 rounded border border-amber-200">
                          仅限本站
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        act.status === 'recruiting'
                          ? 'bg-emerald-100 text-emerald-800'
                          : act.status === 'deadline_reached'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {act.status === 'recruiting'
                        ? '报名中'
                        : act.status === 'deadline_reached'
                        ? '已截止'
                        : '已结束'}
                    </span>
                  </div>

                  {/* 活动标题 */}
                  <h3 className="text-xs font-bold text-neutral-900 mt-2 leading-snug line-clamp-2">
                    {act.title}
                  </h3>

                  {/* 时间与地点 */}
                  <div className="mt-2 text-[11px] text-neutral-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{act.timeDisplay}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{act.locationName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <Building className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>空间站：{act.stationName}</span>
                    </div>
                  </div>

                  {/* 招募名额与已报头像剪影 */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {act.enrolledUsers.slice(0, 3).map((u, i) => (
                          <img
                            key={i}
                            src={u.avatar}
                            alt={u.name}
                            className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-neutral-500">
                        已报 {act.enrolledUsers.length} 人
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {act.serviceHoursAward > 0 && (
                        <span className="text-[10px] text-rose-600 font-mono font-medium">
                          时长 +{act.serviceHoursAward}h
                        </span>
                      )}
                      <button className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-medium rounded-lg shadow-2xs">
                        查看详情 / 报名 &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* 已结束活动回顾板块 */
        <div className="p-3 space-y-3">
          <div className="text-[11px] text-neutral-500 px-1 font-mono">
            以下为管理员发布的历次活动回顾与宣传成效记录：
          </div>
          {/* 历次活动回顾列表：默认发布时间展示由最近开始，置顶项排在最前 */}
          {[...activityReviews]
            .sort((a, b) => {
              if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
              return b.publishDate.localeCompare(a.publishDate);
            })
            .map((act) => (
            <div
              key={act.id}
              onClick={() => onSelectReviewActivity(act.id)}
              className="bg-white rounded-xl p-3 border border-neutral-200 flex gap-3 cursor-pointer hover:border-neutral-300"
            >
              <div className="relative w-20 h-16 shrink-0">
                <img
                  src={act.coverImage}
                  alt={act.title}
                  className="w-full h-full rounded-lg object-cover"
                />
                {act.isPinned && (
                  <span className="absolute top-1 left-1 bg-rose-600/90 text-white text-[8px] font-bold px-1 py-0.5 rounded shadow-xs">
                    置顶
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-neutral-900 truncate flex items-center gap-1">
                  {act.isPinned && (
                    <span className="text-[9px] text-rose-600 border border-rose-200 bg-rose-50 px-1 rounded font-semibold shrink-0">
                      置顶
                    </span>
                  )}
                  <span className="truncate">{act.title}</span>
                </div>
                <div className="text-[11px] text-neutral-500 truncate mt-1">
                  对象：{act.serviceTarget}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 flex justify-between">
                  <span>{act.publishDate}</span>
                  <span className="text-rose-600">回顾详情 &gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
