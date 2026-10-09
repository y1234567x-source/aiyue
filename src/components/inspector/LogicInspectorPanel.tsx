import React from 'react';
import {
  SubPageRoute,
  MainTabType,
  UserRole,
  StatsDisplayConfig
} from '../../types';
import {
  CheckCircle2,
  Sliders,
  Compass,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ExternalLink,
  Code2,
  ShieldCheck,
  Award,
  Settings,
  TrendingUp
} from 'lucide-react';

interface LogicInspectorPanelProps {
  currentTab: MainTabType;
  subPage: SubPageRoute;
  showTeamEntry: boolean;
  onToggleShowTeamEntry: () => void;
  statsDisplayConfig: StatsDisplayConfig;
  onToggleStatsField: (field: keyof StatsDisplayConfig) => void;
  donationPlacement: 'quick_entry' | 'bottom_tab' | 'project_only';
  onChangeDonationPlacement: (val: 'quick_entry' | 'bottom_tab' | 'project_only') => void;
  userRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onQuickNavigate: (tab: MainTabType, sub: SubPageRoute) => void;
  onOpenXiaoETong: () => void;
}

export const LogicInspectorPanel: React.FC<LogicInspectorPanelProps> = ({
  currentTab,
  subPage,
  showTeamEntry,
  onToggleShowTeamEntry,
  statsDisplayConfig,
  onToggleStatsField,
  donationPlacement,
  onChangeDonationPlacement,
  userRole,
  onChangeUserRole,
  onQuickNavigate,
  onOpenXiaoETong
}) => {
  // 当前处于哪个页面名字
  const getCurrentPageName = () => {
    if (subPage.type !== 'none') {
      switch (subPage.type) {
        case 'banner-detail':
          return '【二级页】Banner 资讯/推文详情页';
        case 'activity-detail':
          return '【二级页】活动回顾图文页（顶部文章标题/图文穿插/无统计栏）';
        case 'live-activity-detail':
          return '【二级页】活动大厅·活动详情(含左右分栏&免责条款)';
        case 'team-list':
          return '【二级页】空间站列表（筛选吸顶/省市区联动）';
        case 'team-detail':
          return '【三级页】空间站详情（团队介绍/活动分列）';
        case 'regulation-detail':
          return '【三级页】爱阅制度规范全文办法';
        case 'project-list':
          return '【二级页】了解公益项目列表页';
        case 'project-detail':
          return '【三级页】公益项目详情（纯净图文/背景里程碑）';
        case 'edit-profile':
          return '【二级页】编辑个人信息（含前端不可改字段验证）';
        case 'badge-achievements':
          return '【二级页】时长与成就（6阶勋章待设计）';
        case 'my-activity-history':
          return '【二级页】参与活动记录（志愿活动与家长活动区分）';
        default:
          return '【子页面】';
      }
    }

    switch (currentTab) {
      case 'home':
        return '【一级Tab】爱阅小程序·首页';
      case 'activity':
        return '【一级Tab】活动大厅（含多维筛选与双入口）';
      case 'profile':
        return '【一级Tab】我的中心（家长/志愿者双模式）';
      case 'donation':
        return '【一级Tab】爱心捐赠（外部通道模拟）';
      default:
        return '首页';
    }
  };

  return (
    <div className="bg-white border-l border-neutral-200 flex flex-col h-full overflow-hidden text-xs select-none">
      {/* 面板头部 */}
      <div className="p-3.5 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-rose-400" />
          <span className="font-bold text-sm tracking-tight">产品原型逻辑 & 交互对照台</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
          全业务流已打通
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* 1. 当前所在位置与跳转流向 */}
        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-[11px]">
            <Compass className="w-3.5 h-3.5 text-rose-500" />
            <span>当前原型浏览位置</span>
          </div>
          <div className="font-bold text-neutral-900 text-xs bg-white p-2 rounded border border-neutral-200 shadow-2xs">
            {getCurrentPageName()}
          </div>
          <div className="text-[10px] text-neutral-400 font-mono">
            {subPage.type === 'none'
              ? '处于底栏 Tabbar 顶级页面'
              : '处于子路由堆栈中，支持点击左上角【返回】或微信胶囊【小圆圈】一键回到首页'}
          </div>
        </div>

        {/* 2. 后台控制：志愿数据公示项选择（满足需求：前台无需点击隐藏，后台统一控制选择展示哪些） */}
        <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              后台控制：志愿数据公示选择
            </span>
            <span className="text-[10px] text-emerald-700 font-mono">
              后台管理员配置
            </span>
          </div>

          <div className="text-[11px] text-emerald-800 leading-snug">
            说明：前台小程序界面<strong>不设点击隐藏</strong>交互，由爱阅后台管理员统一选择控制要对公众展示的数据指标：
          </div>

          <div className="space-y-1.5 bg-white p-2.5 rounded-lg border border-emerald-200">
            {/* 卡片总开关 */}
            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
              <span className="text-neutral-700 font-medium">公示卡片总显隐</span>
              <button
                onClick={() => onToggleStatsField('showCard')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                  statsDisplayConfig.showCard
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                {statsDisplayConfig.showCard ? '开启公示' : '隐藏卡片'}
              </button>
            </div>

            {/* 5 个数据字段细项控制 */}
            <div className="grid grid-cols-1 gap-1 text-[11px] pt-1">
              {[
                { key: 'showVolunteerCount' as const, label: '① 志愿者人数' },
                { key: 'showServiceHours' as const, label: '② 服务时长(h)' },
                { key: 'showSpaceStationCount' as const, label: '③ 空间站个数' },
                { key: 'showActivitySessions' as const, label: '④ 公益场次' },
                { key: 'showBeneficiaryFamilies' as const, label: '⑤ 服务家庭数' }
              ].map((f) => {
                const isChecked = statsDisplayConfig[f.key];
                return (
                  <label
                    key={f.key}
                    className="flex items-center justify-between hover:bg-neutral-50 px-1 py-1 rounded cursor-pointer"
                  >
                    <span className="text-neutral-700">{f.label}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleStatsField(f.key)}
                      className="accent-emerald-600 w-3.5 h-3.5 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. 身份切换核心控制器 (测试活动与我的权限区分) */}
        <div className="p-3.5 bg-rose-50/70 rounded-xl border border-rose-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-rose-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              快速模拟身份切换：
            </span>
            <span className="text-[10px] text-rose-600 font-mono">
              {userRole === 'tourist' ? '当前：仅家长身份' : '当前：志愿者身份'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {(['tourist', 'volunteer', 'team_leader', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onChangeUserRole(r)}
                className={`py-1.5 px-1 rounded text-[10px] text-center transition font-semibold ${
                  userRole === r
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-rose-200 text-rose-800 hover:bg-rose-100'
                }`}
              >
                {r === 'tourist'
                  ? '仅家长身份'
                  : r === 'volunteer'
                  ? '注册志愿者'
                  : r === 'team_leader'
                  ? '空间站长'
                  : '管理员'}
              </button>
            ))}
          </div>

          <div className="text-[10px] text-rose-800 leading-snug">
            {userRole === 'tourist' ? (
              <span>★ <strong>仅家长身份：</strong>“我的”页面隐藏服务时长与成就，显示“引导加入志愿者”；活动参与记录以家长活动为主。</span>
            ) : (
              <span>★ <strong>志愿者身份：</strong>默认享有家长所有权限，展示服务时长、成长称号、勋章待设计位、培训中心及“联系爱阅管理员”。</span>
            )}
          </div>
        </div>

        {/* 4. 最新 PRD 需求规格排布清单 */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-neutral-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>最新需求规格落实对照 (PRD Checklist)</span>
          </div>

          <div className="space-y-2 text-[11px] text-neutral-700">
            {/* 活动回顾排序与置顶 */}
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="font-bold text-neutral-900">① 活动回顾按时间与置顶排序：</span>
              默认按发布时间展示，由最近（最新）的开始排列；原“优先推荐”标签与设定统一规范为<strong>“置顶”</strong>，置顶项排序最前。
            </div>

            {/* 志愿数据公示后台控制 */}
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="font-bold text-neutral-900">② 志愿数据公示后台控制：</span>
              前台去除点击隐藏交互，改由后台管理员统一勾选配置需要展示的指标字段。
            </div>

            {/* 活动回顾详情规范 */}
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="font-bold text-neutral-900">③ 活动回顾详情页规范：</span>
              顶部导航栏即为文章标题；不展示志愿者人数、受益数、获赞等大指标；不显示浏览量；承办空间站不设跳转；图文内容采用富文本图文穿插混排；底部去除转发按钮（统一引导右上角微信原生三个点分享）。
            </div>

            {/* 空间站列表筛选吸顶与省市区联动 */}
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="font-bold text-neutral-900">④ 空间站列表吸顶与省市区联动：</span>
              筛选栏吸顶（sticky）；先选择省，再选市；其他省市展示到市即可，仅深圳增加辖区（如南山区、福田区等）筛选。
            </div>

            {/* 空间站详情团队介绍与活动分列 */}
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="font-bold text-neutral-900">⑤ 空间站详情分列规范：</span>
              点进团队详情后，<strong>团队介绍</strong>与<strong>团队活动</strong>分列Tab切换展示；团队介绍包含空间站简介、常设地址开放指引与加入须知；团队活动包含招募中活动与历次回顾；底部操作条对齐。
            </div>

            {/* 志愿者培训直接跳转外部小鹅通 */}
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="font-bold text-neutral-900">⑥ 志愿者培训外部跳转（小鹅通）：</span>
              无需内置二级“培训中心”页面，首页快捷入口、个人中心及激活认证提醒点击后直接唤起微信小程序原生跨端跳转至外部<strong>【小鹅通】</strong>知识店铺。
            </div>

            {/* 了解项目与展示规范 */}
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="font-bold text-neutral-900">⑦ 了解项目与展示规范：</span>
              点击首页“了解项目”展示多个项目图文卡片；卡片缩略图纯净呈现书籍与书房空间，<strong>不体现服务对象内容</strong>；不显示<strong>“转发请使用……”</strong>提示语（小程序右上角微信原生「···」天然支持转发）；明确<strong>不需要支持捐赠（外部链接）</strong>。
            </div>
          </div>
        </div>

        {/* 5. 页面快速直达测试矩阵 */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-neutral-800 font-bold">
            <Code2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>核心页面快速直达测试</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onQuickNavigate('home', { type: 'none' })}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded border border-neutral-200 text-left"
            >
              <div className="font-semibold text-neutral-900">爱阅首页</div>
              <div className="text-[10px] text-neutral-400">数据公示/置顶回顾</div>
            </button>

            <button
              onClick={() => onQuickNavigate('home', { type: 'project-list' })}
              className="p-2 bg-emerald-50 hover:bg-emerald-100/80 rounded border border-emerald-200 text-left"
            >
              <div className="font-semibold text-emerald-900">了解公益项目</div>
              <div className="text-[10px] text-emerald-600">多项目图文卡片</div>
            </button>

            <button
              onClick={onOpenXiaoETong}
              className="p-2 bg-amber-50 hover:bg-amber-100/80 rounded border border-amber-200 text-left"
            >
              <div className="font-semibold text-amber-900 flex items-center justify-between">
                <span>志愿者培训</span>
                <span className="text-[9px] px-1 py-0.2 bg-amber-200 text-amber-800 rounded font-normal">外部</span>
              </div>
              <div className="text-[10px] text-amber-700">直接跳转小鹅通</div>
            </button>

            <button
              onClick={() => onQuickNavigate('home', { type: 'team-detail', id: 't-1' })}
              className="p-2 bg-rose-50 hover:bg-rose-100/80 rounded border border-rose-200 text-left"
            >
              <div className="font-semibold text-rose-900">空间站详情页</div>
              <div className="text-[10px] text-rose-600">团队介绍/活动分列</div>
            </button>

            <button
              onClick={() => onQuickNavigate('home', { type: 'activity-detail', id: 'r-1' })}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded border border-neutral-200 text-left"
            >
              <div className="font-semibold text-neutral-900">活动回顾详情</div>
              <div className="text-[10px] text-neutral-400">文章标题/图文穿插</div>
            </button>

            <button
              onClick={() => onQuickNavigate('home', { type: 'team-list' })}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded border border-neutral-200 text-left"
            >
              <div className="font-semibold text-neutral-900">空间站列表</div>
              <div className="text-[10px] text-neutral-400">吸顶/省市区联动</div>
            </button>

            <button
              onClick={() => onQuickNavigate('activity', { type: 'none' })}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded border border-neutral-200 text-left"
            >
              <div className="font-semibold text-neutral-900">活动大厅</div>
              <div className="text-[10px] text-neutral-400">多维筛选/双入口</div>
            </button>

            <button
              onClick={() => onQuickNavigate('activity', { type: 'live-activity-detail', id: 'act-101' })}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded border border-neutral-200 text-left"
            >
              <div className="font-semibold text-neutral-900">活动详情页</div>
              <div className="text-[10px] text-neutral-400">左右切换/讲师/报名</div>
            </button>

            <button
              onClick={() => onQuickNavigate('profile', { type: 'none' })}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded border border-neutral-200 text-left"
            >
              <div className="font-semibold text-neutral-900">我的中心</div>
              <div className="text-[10px] text-neutral-400">家长/志愿者双视图</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
