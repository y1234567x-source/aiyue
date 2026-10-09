export interface BannerItem {
  id: string;
  title: string;
  category: '推文' | '公告' | '项目介绍' | '资讯';
  tag: string;
  coverImage: string;
  publishDate: string;
  summary: string;
  content: string[];
  externalUrl?: string;
  relatedProjectId?: string;
}

export interface ActivityReviewItem {
  id: string;
  title: string; // 活动主题
  publisher?: string; // 发布人（如：爱阅管理员、空间站站长等）
  serviceTarget: string; // 服务对象 (如：0-6岁低幼儿童家庭、流动留守儿童)
  location: string; // 活动地点
  coverImage: string;
  galleryImages: string[];
  summary: string; // 简要文字介绍
  detailContent: string[];
  publishDate: string;
  isPinned: boolean; // 是否优先/置顶展示
  likeCount: number;
  viewCount: number;
  shareCount: number;
  volunteerCount: number;
  beneficiaryCount: number; // 收益儿童人数
  serviceStationName?: string;
}

export interface VolunteerStats {
  volunteerCount: number; // 志愿者人数
  serviceHours: number; // 服务时长(小时)
  spaceStationCount: number; // 爱阅空间站个数
  activitySessions: number; // 公益活动场次
  beneficiaryFamilies: number; // 服务儿童家庭数
}

export interface StatsDisplayConfig {
  showCard: boolean; // 是否公示志愿数据卡片（后台总控）
  showVolunteerCount: boolean; // 志愿者人数
  showServiceHours: boolean; // 服务时长
  showSpaceStationCount: boolean; // 空间站个数
  showActivitySessions: boolean; // 公益活动场次
  showBeneficiaryFamilies: boolean; // 服务家庭数
}

export interface TeamItem {
  id: string;
  name: string;
  province: string;
  city: string;
  district: string; // 深圳市各区 (南山区, 福田区, 宝安区...)
  address: string;
  leaderName: string; // 站长/队长
  leaderContact: string;
  intro: string;
  volunteerCount: number;
  serviceHours: number;
  establishedDate: string;
  status: '运营中' | '筹建中';
  activityIds: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  beneficiarySummary: string; // 受益群体
  targetAmount?: string;
  raisedAmount?: string;
  showDonation: boolean; // 是否显示捐赠入口
  donationLinkUrl?: string;
  content: string[];
  launchDate: string;
  progressMilestones: { date: string; title: string; desc: string }[];
}

export interface RegulationDoc {
  id: string;
  title: string;
  category: '管理办法' | '行为规范' | '空间站运营指南' | '表彰激励';
  version: string;
  updateDate: string;
  summary: string;
  sections: { title: string; content: string }[];
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: '小鹅通课程' | '在线必修' | '线下实操' | '案例精粹';
  durationMinutes: number;
  coverImage: string;
  speaker: string;
  speakerTitle: string;
  type: 'xiaoetong' | 'online_video' | 'offline_event' | 'case_study';
  isMandatory: boolean;
  intro: string;
  externalAppId?: string; // 小鹅通小程序appId
  offlineVenue?: string;
  offlineTime?: string;
  signupDeadline?: string;
}

// ========= 活动大厅与活动详情数据模型 =========
export type ActivityTargetAudience = 'recruit_volunteer' | 'recruit_participant' | 'both';
// 招募对象：招募志愿者、招募参与者（家长/儿童）
export type ActivityStatus = 'recruiting' | 'deadline_reached' | 'completed';
// 状态：报名中、已截止、已结束
export type ActivityVolunteerRequirement = 'all_volunteers' | 'station_only';
// 要求：所有志愿者、仅限本站志愿者
export type ActivityType = 'volunteer_service' | 'training' | 'exchange' | 'commendation' | 'parent_reading';
// 类型：志愿服务、学习培训、联谊交流、评优表彰、家长活动（团队开展的阅读公益活动为主）

export interface EnrolledUser {
  id: string;
  name: string;
  avatar: string;
  type: 'volunteer' | 'parent'; // 区分已报名（家长），已报名（志愿者）
  enrolledAt: string;
  serviceStationName?: string;
  childrenAge?: string;
}

export interface LecturerInfo {
  name: string;
  avatar: string;
  role: string; // 默认站长，后台可编辑
  bio: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
  role: string; // 默认站长，后台可编辑
}

export interface LiveActivity {
  id: string;
  title: string;
  coverImage: string;
  targetAudience: ActivityTargetAudience; // 招募对象
  status: ActivityStatus; // 状态
  volunteerRequirement: ActivityVolunteerRequirement; // 要求
  activityType: ActivityType; // 类型
  activityTypeName: string;
  startTime: string;
  endTime: string;
  timeDisplay: string;
  province: string;
  city: string;
  district: string; // 筛选到区 (南山区, 福田区...)
  locationName: string;
  locationAddress: string;
  stationName: string; // 空间站名称
  description: string[];
  requirements: string[]; // 招募要求
  volunteerQuota: number;
  enrolledVolunteersCount: number;
  participantQuota: number;
  enrolledParticipantsCount: number;
  serviceHoursAward: number; // 志愿者服务时长奖励
  lecturer: LecturerInfo; // 讲师信息 (头像、姓名、个人简介，默认站长，后台可编辑)
  contact: ContactPerson; // 联系人 (默认站长，后台可编辑)
  enrolledUsers: EnrolledUser[]; // 已成功报名的家长与志愿者
}

// ========= 志愿称号与勋章等级体系 =========
export interface VolunteerTitleBadge {
  level: number;
  minHours: number;
  title: string;
  badgeName: string;
  description: string;
  badgeColor: string;
  badgeIcon: string;
}

export const VOLUNTEER_BADGES: VolunteerTitleBadge[] = [
  { level: 1, minHours: 5, title: '阅芽志愿者', badgeName: '阅芽勋章', description: '初启童书微光，完成首次社区伴读', badgeColor: '#10b981', badgeIcon: 'Sprout' },
  { level: 2, minHours: 30, title: '阅光志愿者', badgeName: '阅光勋章', description: '微光成炬，为数十个家庭点亮亲子夜读', badgeColor: '#3b82f6', badgeIcon: 'Sun' },
  { level: 3, minHours: 100, title: '阅行志愿者', badgeName: '阅行勋章', description: '笃行不怠，空间站骨干领读力量', badgeColor: '#8b5cf6', badgeIcon: 'Compass' },
  { level: 4, minHours: 300, title: '阅研志愿者', badgeName: '阅研勋章', description: '研磨精品绘本课程，助力新手领读者', badgeColor: '#f59e0b', badgeIcon: 'Award' },
  { level: 5, minHours: 600, title: '阅导志愿者', badgeName: '阅导勋章', description: '卓越导师，赋能社区阅读生态建设', badgeColor: '#ec4899', badgeIcon: 'Crown' },
  { level: 6, minHours: 1500, title: '阅承志愿者', badgeName: '阅承勋章', description: '公益薪火长承，爱阅终身荣誉志愿者', badgeColor: '#e11d48', badgeIcon: 'Flame' },
];

// ========= 用户画像与身份定义 =========
export type IdentityMode = 'parent' | 'volunteer' | 'team_leader' | 'admin';

export interface UserProfileData {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  idCardMasked: string; // 仅后台可编辑不可前端用户随意修改
  gender: '男' | '女';
  emergencyContact: string; // 紧急联系人
  emergencyPhone: string;
  currentStationId?: string;
  currentStationName?: string;
  joinedDate: string;
  // 志愿者专有属性
  isVolunteerActivated: boolean; // 是否已完成激活任务（培训或其他任务）
  volunteerTeamAuditStatus: 'not_applied' | 'pending' | 'approved' | 'rejected'; // 入队审核状态
  serviceHours: number; // 累计服务时长
  activityCount: number; // 参与场次
  completedTrainingIds: string[]; // 学过的对应培训内容列表
  // 家长专有属性
  childrenInfo?: { name: string; age: number; readingInterest: string }[];
}

export type MainTabType = 'home' | 'activity' | 'profile' | 'donation';

export type SubPageRoute = 
  | { type: 'none' }
  | { type: 'banner-detail'; id: string }
  | { type: 'activity-detail'; id: string } // 活动回顾详情
  | { type: 'live-activity-detail'; id: string } // 活动大厅新活动详情
  | { type: 'team-list' }
  | { type: 'team-detail'; id: string }
  | { type: 'regulation-detail'; id: string }
  | { type: 'project-list' }
  | { type: 'project-detail'; id: string }
  | { type: 'edit-profile' } // 编辑个人信息
  | { type: 'badge-achievements' } // 时长与成就勋章
  | { type: 'my-activity-history' } // 参与活动记录 (区分志愿活动与家长活动)
  | { type: 'external-jump'; title: string; target: string; targetUrl: string };

export type UserRole = 'tourist' | 'volunteer' | 'team_leader' | 'admin';
