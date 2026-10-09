import React, { useState } from 'react';
import { LiveActivity, ActivityReviewItem } from '../../types';
import { Calendar, CheckCircle2, Clock, MapPin, Users, HeartHandshake } from 'lucide-react';

interface MyActivityHistoryPageProps {
  identity: 'volunteer' | 'parent';
  onSelectActivity: (id: string) => void;
}

export const MyActivityHistoryPage: React.FC<MyActivityHistoryPageProps> = ({
  identity,
  onSelectActivity
}) => {
  // 需求规范：参与活动记录区分呈现志愿活动和家长活动（以及所有其他活动类型，如培训、交流、评优等），包含已报名、已结束的不同状态活动
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'volunteer' | 'parent' | 'training' | 'exchange'>(
    identity === 'parent' ? 'parent' : 'all'
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'enrolled' | 'completed'>('all');

  const mockUserActivities = [
    {
      id: 'act-101',
      title: '“阅芽共读”南山科技园低幼绘本领读与借还指导',
      type: 'volunteer',
      typeName: '志愿活动',
      roleInActivity: '领读跟岗志愿者',
      status: 'enrolled',
      statusName: '已报名待参加',
      time: '2026年4月5日 09:30 - 12:00',
      location: '南山示范空间站',
      hours: 3.0
    },
    {
      id: 'act-102',
      title: '“书香自然”福田香蜜湖亲子草坪绘本共读沙龙',
      type: 'parent',
      typeName: '家长活动',
      roleInActivity: '带娃参与家庭',
      status: 'enrolled',
      statusName: '已报名待参加',
      time: '2026年4月6日 15:00 - 17:00',
      location: '香蜜湖绿意空间站',
      hours: 0
    },
    {
      id: 'act-103',
      title: '【领读者学院】2026春季绘本戏剧即兴表达实战工作坊',
      type: 'training',
      typeName: '培训活动',
      roleInActivity: '受训学员',
      status: 'enrolled',
      statusName: '已报名待参加',
      time: '2026年4月12日 14:00 - 17:00',
      location: '龙岗大运空间站',
      hours: 3.0
    },
    {
      id: 'r-1',
      title: '“绘梦周末”南山红树湾空间站亲子伴读专场',
      type: 'volunteer',
      typeName: '志愿活动',
      roleInActivity: '主讲领读者',
      status: 'completed',
      statusName: '已结束已打卡',
      time: '2026年3月25日 10:00 - 12:00',
      location: '南山示范空间站',
      hours: 2.5
    },
    {
      id: 'act-105',
      title: '“爱阅同心”2025年度深圳优秀阅读志愿团队表彰与茶话会',
      type: 'exchange',
      typeName: '评优表彰',
      roleInActivity: '受邀表彰代表',
      status: 'completed',
      statusName: '已结束',
      time: '2026年3月20日 15:00 - 18:00',
      location: '爱阅基金会多功能报告厅',
      hours: 3.0
    }
  ];

  const filtered = mockUserActivities.filter((item) => {
    if (selectedCategory !== 'all' && item.type !== selectedCategory) {
      return false;
    }
    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-neutral-50 min-h-full pb-20 select-none">
      {/* 顶部说明条 */}
      <div className="bg-white border-b border-neutral-200 p-3">
        <div className="text-[10px] text-neutral-400 font-mono mb-1">
          活动类型区分呈现：志愿服务、家长活动、培训进阶、评优交流
        </div>
        {/* 分类切换胶囊 */}
        <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { key: 'all', label: '全部记录' },
            { key: 'volunteer', label: '志愿服务' },
            { key: 'parent', label: '家长活动' },
            { key: 'training', label: '培训活动' },
            { key: 'exchange', label: '表彰交流' }
          ].map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key as any)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition ${
                selectedCategory === c.key
                  ? 'bg-neutral-900 text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 状态筛选二级选项：全部、已报名、已结束 */}
        <div className="flex gap-2 mt-2 pt-2 border-t border-neutral-100 text-[11px]">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2 py-0.5 rounded ${
              statusFilter === 'all'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            全部状态
          </button>
          <button
            onClick={() => setStatusFilter('enrolled')}
            className={`px-2 py-0.5 rounded ${
              statusFilter === 'enrolled'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            已报名待参加
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-2 py-0.5 rounded ${
              statusFilter === 'completed'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            已结束服务
          </button>
        </div>
      </div>

      {/* 列表区 */}
      <div className="p-3 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-neutral-200 text-neutral-400 text-xs">
            暂无对应的活动参与记录
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectActivity(item.id)}
              className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-2xs hover:border-neutral-300 transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                      item.type === 'volunteer'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : item.type === 'parent'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {item.typeName}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    角色: {item.roleInActivity}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-semibold ${
                    item.status === 'enrolled' ? 'text-blue-600' : 'text-emerald-600'
                  }`}
                >
                  {item.statusName}
                </span>
              </div>

              <h3 className="text-xs font-bold text-neutral-900 mt-1.5 leading-snug">
                {item.title}
              </h3>

              <div className="mt-2 text-[11px] text-neutral-500 space-y-0.5">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400 shrink-0" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>

              {item.hours > 0 && (
                <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500">记入志愿时长</span>
                  <span className="font-bold text-rose-600 font-mono">+{item.hours} 小时</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
