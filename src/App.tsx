import React, { useState } from 'react';
import {
  MainTabType,
  SubPageRoute,
  UserRole,
  UserProfileData,
  StatsDisplayConfig
} from './types';
import {
  MOCK_BANNERS,
  MOCK_REVIEWS,
  INITIAL_STATS,
  MOCK_TEAMS,
  MOCK_PROJECTS,
  MOCK_REGULATIONS,
  MOCK_LIVE_ACTIVITIES,
  INITIAL_USER_PROFILE
} from './data/mockData';
import { MiniProgramFrame } from './components/MiniProgramFrame';
import { HomePage } from './components/pages/HomePage';
import { ActivitiesTab } from './components/pages/ActivitiesTab';
import { ProfileTab } from './components/pages/ProfileTab';
import { BannerDetailPage } from './components/pages/BannerDetailPage';
import { ActivityReviewDetailPage } from './components/pages/ActivityReviewDetailPage';
import { LiveActivityDetailPage } from './components/pages/LiveActivityDetailPage';
import { TeamListPage } from './components/pages/TeamListPage';
import { TeamDetailPage } from './components/pages/TeamDetailPage';
import { RegulationDetailPage } from './components/pages/RegulationDetailPage';
import { ProjectListPage } from './components/pages/ProjectListPage';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';
import { EditProfilePage } from './components/pages/EditProfilePage';
import { BadgeAchievementsPage } from './components/pages/BadgeAchievementsPage';
import { MyActivityHistoryPage } from './components/pages/MyActivityHistoryPage';
import { ShareModal } from './components/modals/ShareModal';
import { ExternalJumpModal } from './components/modals/ExternalJumpModal';
import { WaiverModal } from './components/modals/WaiverModal';
import { LogicInspectorPanel } from './components/inspector/LogicInspectorPanel';
import { Smartphone, BookOpen, Layers, RotateCcw } from 'lucide-react';

export default function App() {
  // 底部一级 Tab 状态
  const [currentTab, setCurrentTab] = useState<MainTabType>('home');

  // 子页面路由与返回堆栈
  const [subPage, setSubPage] = useState<SubPageRoute>({ type: 'none' });
  const [historyStack, setHistoryStack] = useState<SubPageRoute[]>([]);

  // 原型业务逻辑可配置项
  const [showTeamEntry, setShowTeamEntry] = useState<boolean>(true); // 团队列表入口显隐
  const [donationPlacement, setDonationPlacement] = useState<'quick_entry' | 'bottom_tab' | 'project_only'>('quick_entry'); // 捐赠入口待定位置
  const [userRole, setUserRole] = useState<UserRole>('tourist'); // 用户身份模拟 (tourist=仅家长身份, volunteer=注册志愿者, team_leader=站长, admin=管理员)

  // 后台控制：志愿数据公示项选择（前台无需点击隐藏，由后台统一控制选择展示哪些数据指标）
  const [statsDisplayConfig, setStatsDisplayConfig] = useState<StatsDisplayConfig>({
    showCard: true,
    showVolunteerCount: true,
    showServiceHours: true,
    showSpaceStationCount: true,
    showActivitySessions: true,
    showBeneficiaryFamilies: true
  });

  const handleToggleStatsField = (field: keyof StatsDisplayConfig) => {
    setStatsDisplayConfig((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // 个人资料状态
  const [userProfile, setUserProfile] = useState<UserProfileData>(INITIAL_USER_PROFILE);

  // 用户已报名的活动映射 (activityId -> { asVolunteer: boolean, asParticipant: boolean })
  const [userEnrollments, setUserEnrollments] = useState<Record<string, { asVolunteer: boolean; asParticipant: boolean }>>({
    'act-101': { asVolunteer: true, asParticipant: false },
    'act-102': { asVolunteer: false, asParticipant: true }
  });

  // 活动点赞状态集合
  const [likedReviewIds, setLikedReviewIds] = useState<Set<string>>(new Set(['r-1']));

  // 分享弹窗状态
  const [shareModalState, setShareModalState] = useState<{
    isOpen: boolean;
    title: string;
    desc: string;
  }>({
    isOpen: false,
    title: '',
    desc: ''
  });

  // 免责声明弹窗状态
  const [waiverModalState, setWaiverModalState] = useState<{
    isOpen: boolean;
    activityId: string;
    activityTitle: string;
    signupType: 'volunteer' | 'participant';
  }>({
    isOpen: false,
    activityId: '',
    activityTitle: '',
    signupType: 'participant'
  });

  // 外部跳转弹窗状态 (小鹅通、外部捐赠、参考随心益等)
  const [externalJumpState, setExternalJumpState] = useState<{
    isOpen: boolean;
    title: string;
    targetType: 'xiaoetong' | 'donation' | 'external_mp' | 'web_link';
    targetName: string;
    targetUrlOrAppId: string;
    notes?: string;
  }>({
    isOpen: false,
    title: '',
    targetType: 'xiaoetong',
    targetName: '',
    targetUrlOrAppId: ''
  });

  // 控制右侧逻辑说明面板在移动端/大屏的展示
  const [showSidePanel, setShowSidePanel] = useState<boolean>(true);

  // 路由入栈跳转辅助函数
  const pushRoute = (nextRoute: SubPageRoute) => {
    setHistoryStack((prev) => [...prev, subPage]);
    setSubPage(nextRoute);
  };

  // 路由后退处理
  const handleBack = () => {
    if (historyStack.length > 0) {
      const prevRoute = historyStack[historyStack.length - 1];
      setHistoryStack((prev) => prev.slice(0, prev.length - 1));
      setSubPage(prevRoute);
    } else {
      setSubPage({ type: 'none' });
    }
  };

  // 一键回到首页
  const handleCloseToHome = () => {
    setSubPage({ type: 'none' });
    setHistoryStack([]);
    setCurrentTab('home');
  };

  // 点赞切换
  const handleToggleLike = (activityId: string) => {
    setLikedReviewIds((prev) => {
      const next = new Set(prev);
      if (next.has(activityId)) {
        next.delete(activityId);
      } else {
        next.add(activityId);
      }
      return next;
    });
  };

  // 打开分享
  const handleOpenShare = (title: string, desc: string) => {
    setShareModalState({
      isOpen: true,
      title,
      desc
    });
  };

  // 打开免责协议并报名
  const handleOpenSignupWaiver = (activityId: string, activityTitle: string, type: 'volunteer' | 'participant') => {
    // 若报名志愿者且当前是游客/仅家长身份，则提示规则
    if (type === 'volunteer' && userRole === 'tourist') {
      alert('【提示】：报名志愿者需具备爱阅注册志愿者资质。现在为您模拟切换为志愿者身份，并继续报名！');
      setUserRole('volunteer');
    }

    setWaiverModalState({
      isOpen: true,
      activityId,
      activityTitle,
      signupType: type
    });
  };

  // 确认免责条款并完成报名
  const handleConfirmSignup = () => {
    const { activityId, signupType } = waiverModalState;
    setUserEnrollments((prev) => {
      const current = prev[activityId] || { asVolunteer: false, asParticipant: false };
      return {
        ...prev,
        [activityId]: {
          asVolunteer: signupType === 'volunteer' ? true : current.asVolunteer,
          asParticipant: signupType === 'participant' ? true : current.asParticipant
        }
      };
    });

    setWaiverModalState({ isOpen: false, activityId: '', activityTitle: '', signupType: 'participant' });
    alert(`【报名成功】：您已同意通用免责协议，并成功完成【${signupType === 'volunteer' ? '志愿者' : '家长/参与者'}】报名！`);
  };

  // 打开捐赠外部链接弹窗
  const handleOpenDonationExternal = (projectTitle = '爱阅公益项目捐赠', url = 'https://www.ireadfoundation.org/donate') => {
    setExternalJumpState({
      isOpen: true,
      title: '跳转爱阅官方爱心捐赠外链',
      targetType: 'donation',
      targetName: '爱阅公益基金会公募捐赠平台 / 腾讯公益',
      targetUrlOrAppId: url,
      notes: '依据《慈善法》规范，小程序内通过符合微信规范的跳转流程导流至爱阅基金会公募认证页面。入口位置可测试在首页快捷入口、底部菜单或项目详情内。'
    });
  };

  // 打开小鹅通系列课程跳转
  const handleOpenXiaoETong = () => {
    setExternalJumpState({
      isOpen: true,
      title: '跳转小鹅通知识店铺',
      targetType: 'xiaoetong',
      targetName: '爱阅志愿者学院·小鹅通专栏',
      targetUrlOrAppId: '#小程序://小鹅通/xiaoetong_iread_volunteer',
      notes: '需求明确：“当前展示小鹅通系列课程跳转”。用户点击后调用微信小程序跨端跳转 API，直接进入小鹅通领读人通识训练营。'
    });
  };

  // 打开外部参考：随心益团队活动模式
  const handleOpenSuiXinYiRef = () => {
    setExternalJumpState({
      isOpen: true,
      title: '产品参考对照：随心益团队模式',
      targetType: 'external_mp',
      targetName: '#小程序://随心益/0PN3ZqPY5NfW0Yz',
      targetUrlOrAppId: 'gh_suixinyi_appid / pages/team/index',
      notes: '需求参考：“空间站以省为单位筛选，深圳市按区呈现逐层展示，团队信息由站长维护，活动情况参考随心益”。'
    });
  };

  // 打开外部参考：志愿深圳-志愿者学院
  const handleOpenZhiYuanShenZhenRef = () => {
    setExternalJumpState({
      isOpen: true,
      title: '产品参考对照：志愿深圳志愿者学院',
      targetType: 'external_mp',
      targetName: '#小程序://志愿深圳/HG5PeuuP4K8w0wc',
      targetUrlOrAppId: 'gh_zhiyuanshenzhen_appid / pages/academy/index',
      notes: '需求参考：“志愿者培训体系规划，包括规章办法、在线与线下培训活动入口，参考志愿深圳志愿者学院”。'
    });
  };

  // 快捷从右侧面板一键导航
  const handleQuickNavigate = (tab: MainTabType, sub: SubPageRoute) => {
    setCurrentTab(tab);
    setSubPage(sub);
    setHistoryStack([]);
  };

  // 重置原型演示状态
  const handleResetPrototype = () => {
    setCurrentTab('home');
    setSubPage({ type: 'none' });
    setHistoryStack([]);
    setShowTeamEntry(true);
    setStatsDisplayConfig({
      showCard: true,
      showVolunteerCount: true,
      showServiceHours: true,
      showSpaceStationCount: true,
      showActivitySessions: true,
      showBeneficiaryFamilies: true
    });
    setDonationPlacement('quick_entry');
    setUserRole('tourist');
    setUserProfile(INITIAL_USER_PROFILE);
  };

  // 保存资料更新
  const handleUpdateProfile = (updated: Partial<UserProfileData>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
    handleBack();
  };

  // 根据当前 subPage 匹配对应的子页面组件
  const renderCurrentView = () => {
    if (subPage.type !== 'none') {
      switch (subPage.type) {
        case 'banner-detail': {
          const banner = MOCK_BANNERS.find((b) => b.id === subPage.id) || MOCK_BANNERS[0];
          return (
            <BannerDetailPage
              banner={banner}
              onNavigateToProject={(projId) => pushRoute({ type: 'project-detail', id: projId })}
              onOpenShare={handleOpenShare}
            />
          );
        }
        case 'activity-detail': {
          const activity = MOCK_REVIEWS.find((r) => r.id === subPage.id) || MOCK_REVIEWS[0];
          return (
            <ActivityReviewDetailPage
              activity={activity}
              onOpenShare={handleOpenShare}
              onNavigateToTeam={() => pushRoute({ type: 'team-list' })}
            />
          );
        }
        case 'live-activity-detail': {
          const act = MOCK_LIVE_ACTIVITIES.find((a) => a.id === subPage.id) || MOCK_LIVE_ACTIVITIES[0];
          const enrollment = userEnrollments[act.id] || { asVolunteer: false, asParticipant: false };
          return (
            <LiveActivityDetailPage
              activity={act}
              userRole={userRole}
              userStationId={userProfile.currentStationId}
              isVolunteerActivated={userProfile.isVolunteerActivated}
              onOpenShare={handleOpenShare}
              onOpenSignupWaiver={(type) => handleOpenSignupWaiver(act.id, act.title, type)}
              isEnrolledAsVolunteer={enrollment.asVolunteer}
              isEnrolledAsParticipant={enrollment.asParticipant}
            />
          );
        }
        case 'team-list': {
          return (
            <TeamListPage
              teams={MOCK_TEAMS}
              onSelectTeam={(teamId) => pushRoute({ type: 'team-detail', id: teamId })}
              onOpenExternalReference={handleOpenSuiXinYiRef}
            />
          );
        }
        case 'team-detail': {
          const team = MOCK_TEAMS.find((t) => t.id === subPage.id) || MOCK_TEAMS[0];
          const associatedActs = MOCK_REVIEWS.filter(
            (r) =>
              team.activityIds.includes(r.id) ||
              r.serviceStationName?.includes(team.district) ||
              r.location?.includes(team.district) ||
              team.name.includes(r.serviceStationName || '')
          );
          const associatedLiveActs = MOCK_LIVE_ACTIVITIES.filter(
            (a) =>
              a.district === team.district ||
              a.stationName.includes(team.name.replace('爱阅·', '')) ||
              team.name.includes(a.district)
          );
          return (
            <TeamDetailPage
              team={team}
              associatedActivities={associatedActs}
              liveActivities={associatedLiveActs}
              onSelectActivity={(actId) => pushRoute({ type: 'activity-detail', id: actId })}
              onSelectLiveActivity={(actId) => pushRoute({ type: 'live-activity-detail', id: actId })}
              onOpenExternalReference={handleOpenSuiXinYiRef}
            />
          );
        }
        case 'regulation-detail': {
          const regulation = MOCK_REGULATIONS.find((r) => r.id === subPage.id) || MOCK_REGULATIONS[0];
          return <RegulationDetailPage regulation={regulation} />;
        }
        case 'project-list': {
          return (
            <ProjectListPage
              projects={MOCK_PROJECTS}
              onSelectProject={(projId) => pushRoute({ type: 'project-detail', id: projId })}
            />
          );
        }
        case 'project-detail': {
          const project = MOCK_PROJECTS.find((p) => p.id === subPage.id) || MOCK_PROJECTS[0];
          return (
            <ProjectDetailPage
              project={project}
            />
          );
        }
        case 'edit-profile': {
          return (
            <EditProfilePage
              profile={userProfile}
              onSave={handleUpdateProfile}
              isAdmin={userRole === 'admin'}
            />
          );
        }
        case 'badge-achievements': {
          return <BadgeAchievementsPage serviceHours={userProfile.serviceHours} />;
        }
        case 'my-activity-history': {
          return (
            <MyActivityHistoryPage
              identity={userRole === 'tourist' ? 'parent' : 'volunteer'}
              onSelectActivity={(actId) => {
                if (actId.startsWith('act-')) {
                  pushRoute({ type: 'live-activity-detail', id: actId });
                } else {
                  pushRoute({ type: 'activity-detail', id: actId });
                }
              }}
            />
          );
        }
        default:
          break;
      }
    }

    // 默认展示底部三大 Tab
    switch (currentTab) {
      case 'home':
        return (
          <HomePage
            banners={MOCK_BANNERS}
            stats={INITIAL_STATS}
            statsDisplayConfig={statsDisplayConfig}
            activityReviews={MOCK_REVIEWS}
            showTeamEntry={showTeamEntry}
            showStatsCard={statsDisplayConfig.showCard}
            donationPlacement={donationPlacement}
            userRole={userRole}
            onNavigateToBanner={(bannerId) => pushRoute({ type: 'banner-detail', id: bannerId })}
            onNavigateToActivity={(actId) => pushRoute({ type: 'activity-detail', id: actId })}
            onNavigateToTeamList={() => pushRoute({ type: 'team-list' })}
            onNavigateToTraining={handleOpenXiaoETong}
            onNavigateToProjects={() => pushRoute({ type: 'project-list' })}
            onNavigateToRegulation={() => pushRoute({ type: 'regulation-detail', id: 'reg-station-2026' })}
            onOpenDonationModal={() => handleOpenDonationExternal()}
            onOpenShareModal={handleOpenShare}
            onToggleLikeReview={handleToggleLike}
            likedReviewIds={likedReviewIds}
          />
        );
      case 'activity':
        return (
          <ActivitiesTab
            liveActivities={MOCK_LIVE_ACTIVITIES}
            activityReviews={MOCK_REVIEWS}
            userRole={userRole}
            userStationId={userProfile.currentStationId}
            onSelectLiveActivity={(actId) => pushRoute({ type: 'live-activity-detail', id: actId })}
            onSelectReviewActivity={(actId) => pushRoute({ type: 'activity-detail', id: actId })}
          />
        );
      case 'profile':
        return (
          <ProfileTab
            userRole={userRole}
            profile={userProfile}
            onChangeRole={setUserRole}
            onOpenEditProfile={() => pushRoute({ type: 'edit-profile' })}
            onOpenBadgeAchievements={() => pushRoute({ type: 'badge-achievements' })}
            onOpenMyTrainings={handleOpenXiaoETong}
            onOpenActivityHistory={() => pushRoute({ type: 'my-activity-history' })}
            onOpenTeamList={() => pushRoute({ type: 'team-list' })}
            onOpenApplyVolunteer={() => {
              setUserRole('volunteer');
              alert('【模拟认证】：已完成注册志愿者认证！');
            }}
          />
        );
      case 'donation':
        return (
          <div className="p-6 bg-white min-h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-sm font-bold text-neutral-900">外部捐赠通道 (备选底栏入口)</h2>
            <p className="text-xs text-neutral-500 mt-2 max-w-xs leading-relaxed">
              此入口根据“捐赠位置待定，可能放在首页或者底部菜单”的备选测试排布。
            </p>
            <button
              onClick={() => handleOpenDonationExternal()}
              className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              打开外部捐赠链接
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // 动态获取详情页面顶部标题覆盖 (例如：活动回顾详情顶部标题就是文章标题，而不是活动回顾纪实)
  const getCurrentPageTitleOverride = (): string | undefined => {
    if (subPage.type === 'activity-detail') {
      const activity = MOCK_REVIEWS.find((r) => r.id === subPage.id) || MOCK_REVIEWS[0];
      return activity.title;
    }
    if (subPage.type === 'banner-detail') {
      const banner = MOCK_BANNERS.find((b) => b.id === subPage.id) || MOCK_BANNERS[0];
      return banner.title;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-800 flex flex-col font-sans">
      {/* 顶部控制栏 */}
      <header className="bg-neutral-950 border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            阅
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">
                爱阅志愿者小程序 · 交互逻辑与排布原型
              </h1>
              <span className="text-[10px] font-mono bg-neutral-800 text-rose-300 px-2 py-0.5 rounded border border-neutral-700">
                首页+活动大厅+我的
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              专注展示首页架构、活动大厅多维筛选、左右分栏详情、家长/志愿者双模式与6阶勋章晋升
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetPrototype}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 transition active:scale-95"
            title="还原所有初始设置"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
            <span>重置原型</span>
          </button>

          <button
            onClick={() => setShowSidePanel(!showSidePanel)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-medium shadow-xs transition active:scale-95"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showSidePanel ? '收起逻辑面板' : '展开逻辑面板'}</span>
          </button>
        </div>
      </header>

      {/* 主工作区：居中手机原型 + 右侧产品逻辑说明面板 */}
      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-stretch justify-center overflow-hidden">
        {/* 左侧/居中：微信小程序手机外壳与交互 */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-6 overflow-y-auto w-full">
          <MiniProgramFrame
            currentTab={currentTab}
            onChangeTab={(tab) => {
              setCurrentTab(tab);
              setSubPage({ type: 'none' });
              setHistoryStack([]);
            }}
            subPage={subPage}
            pageTitleOverride={getCurrentPageTitleOverride()}
            onBack={handleBack}
            onCloseToHome={handleCloseToHome}
            onOpenMore={() => {
              if (subPage.type === 'activity-detail') {
                const currentReview = MOCK_REVIEWS.find((r) => r.id === subPage.id);
                if (currentReview) {
                  handleOpenShare(currentReview.title, `爱阅活动精彩回顾 · ${currentReview.publisher || '爱阅公益'}`);
                  return;
                }
              }
              if (subPage.type === 'project-detail') {
                const currentProj = MOCK_PROJECTS.find((p) => p.id === subPage.id);
                if (currentProj) {
                  handleOpenShare(currentProj.title, currentProj.subtitle);
                  return;
                }
              }
              if (subPage.type === 'project-list') {
                handleOpenShare('了解爱阅公益项目', '爱阅致力于构建高品质的儿童早期阅读生态，把优质书房建在孩子家门口。欢迎了解与支持爱阅公益项目。');
                return;
              }
              handleOpenShare('爱阅公益志愿者小程序', '陪伴儿童早期阅读，共创温暖书香空间');
            }}
            donationPlacement={donationPlacement}
            onOpenDonationModal={() => handleOpenDonationExternal()}
          >
            {renderCurrentView()}
          </MiniProgramFrame>
        </div>

        {/* 右侧：原型逻辑与 PRD 需求对照面板 */}
        {showSidePanel && (
          <div className="w-full lg:w-[420px] xl:w-[460px] h-[550px] lg:h-auto shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-800">
            <LogicInspectorPanel
              currentTab={currentTab}
              subPage={subPage}
              showTeamEntry={showTeamEntry}
              onToggleShowTeamEntry={() => setShowTeamEntry(!showTeamEntry)}
              statsDisplayConfig={statsDisplayConfig}
              onToggleStatsField={handleToggleStatsField}
              donationPlacement={donationPlacement}
              onChangeDonationPlacement={setDonationPlacement}
              userRole={userRole}
              onChangeUserRole={setUserRole}
              onQuickNavigate={handleQuickNavigate}
              onOpenXiaoETong={handleOpenXiaoETong}
            />
          </div>
        )}
      </div>

      {/* 转发与分享模拟弹窗 */}
      <ShareModal
        isOpen={shareModalState.isOpen}
        onClose={() => setShareModalState({ isOpen: false, title: '', desc: '' })}
        title={shareModalState.title}
        desc={shareModalState.desc}
      />

      {/* 通用报名免责条款弹窗 */}
      <WaiverModal
        isOpen={waiverModalState.isOpen}
        onClose={() => setWaiverModalState({ isOpen: false, activityId: '', activityTitle: '', signupType: 'participant' })}
        onConfirm={handleConfirmSignup}
        activityTitle={waiverModalState.activityTitle}
        signupType={waiverModalState.signupType}
      />

      {/* 外部应用与外链跳转模拟弹窗 (小鹅通 / 捐赠 / 随心益 / 志愿深圳) */}
      <ExternalJumpModal
        isOpen={externalJumpState.isOpen}
        onClose={() => setExternalJumpState((prev) => ({ ...prev, isOpen: false }))}
        title={externalJumpState.title}
        targetType={externalJumpState.targetType}
        targetName={externalJumpState.targetName}
        targetUrlOrAppId={externalJumpState.targetUrlOrAppId}
        notes={externalJumpState.notes}
      />
    </div>
  );
}
