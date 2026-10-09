import React from 'react';
import {
  MainTabType,
  SubPageRoute,
  UserRole
} from '../types';
import { HeaderCapsule } from './common/HeaderCapsule';
import {
  Home,
  CalendarDays,
  User
} from 'lucide-react';

interface MiniProgramFrameProps {
  currentTab: MainTabType;
  onChangeTab: (tab: MainTabType) => void;
  subPage: SubPageRoute;
  pageTitleOverride?: string;
  onBack: () => void;
  onCloseToHome: () => void;
  onOpenMore: () => void;
  donationPlacement?: 'quick_entry' | 'bottom_tab' | 'project_only';
  onOpenDonationModal?: () => void;
  children: React.ReactNode;
}

export const MiniProgramFrame: React.FC<MiniProgramFrameProps> = ({
  currentTab,
  onChangeTab,
  subPage,
  pageTitleOverride,
  onBack,
  onCloseToHome,
  onOpenMore,
  donationPlacement,
  onOpenDonationModal,
  children
}) => {
  // 获取当前页面导航条标题
  const getHeaderTitle = () => {
    if (pageTitleOverride) {
      return pageTitleOverride;
    }

    if (subPage.type !== 'none') {
      switch (subPage.type) {
        case 'banner-detail':
          return '推文资讯';
        case 'activity-detail':
          return '活动回顾';
        case 'team-list':
          return '爱阅空间站';
        case 'team-detail':
          return '空间站详情';
        case 'regulation-detail':
          return '爱阅制度规范全文';
        case 'project-list':
          return '爱阅公益项目库';
        case 'project-detail':
          return '项目成效详情';
        default:
          return '爱阅志愿者';
      }
    }

    switch (currentTab) {
      case 'home':
        return '爱阅志愿者';
      case 'activity':
        return '志愿活动';
      case 'profile':
        return '个人中心';
      case 'donation':
        return '爱心捐赠';
      default:
        return '爱阅志愿者';
    }
  };

  const isSubPage = subPage.type !== 'none';

  return (
    <div
      className="w-full max-w-[390px] h-[820px] bg-white rounded-[38px] shadow-2xl border-8 border-neutral-800 flex flex-col overflow-hidden relative select-none"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* 顶部听筒微型挖孔 (物理刘海/灵动岛模拟) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-800 rounded-full z-50 pointer-events-none flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700 mr-2"></div>
        <div className="w-8 h-1 bg-neutral-700 rounded-full"></div>
      </div>

      {/* 微信导航头与胶囊 */}
      <HeaderCapsule
        title={getHeaderTitle()}
        showBack={isSubPage}
        onBack={onBack}
        onMore={onOpenMore}
        onCloseToHome={onCloseToHome}
      />

      {/* 页面主视图滚动容器 */}
      <div
        className="flex-1 overflow-y-auto relative no-scrollbar bg-neutral-100"
        style={{ transform: 'translateZ(0)' }}
      >
        {children}
      </div>

      {/* 底部 TabBar
          需求指定：底部有三个按钮入口，分别是 首页、活动、我的；
          若在逻辑配置面板中测试“捐赠放在底部菜单”，则动态展示该备选方案 */}
      {!isSubPage && (
        <div className="bg-white/95 backdrop-blur-md border-t border-neutral-200 py-1.5 px-3 flex items-center justify-around sticky bottom-0 z-30 shadow-xs">
          {/* ① 首页 */}
          <button
            onClick={() => onChangeTab('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition active:scale-95 ${
              currentTab === 'home'
                ? 'text-rose-600 font-bold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">首页</span>
          </button>

          {/* ② 活动 */}
          <button
            onClick={() => onChangeTab('activity')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition active:scale-95 ${
              currentTab === 'activity'
                ? 'text-rose-600 font-bold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className="text-[10px]">活动</span>
          </button>

          {/* ③ 我的 */}
          <button
            onClick={() => onChangeTab('profile')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition active:scale-95 ${
              currentTab === 'profile'
                ? 'text-rose-600 font-bold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">我的</span>
          </button>
        </div>
      )}

      {/* 底部 iPhone Home Indicator 横条 */}
      <div className="h-4 bg-white flex items-center justify-center shrink-0">
        <div className="w-28 h-1 bg-neutral-300 rounded-full"></div>
      </div>
    </div>
  );
};
