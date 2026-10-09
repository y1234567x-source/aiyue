import {
  ActivityReviewItem,
  BannerItem,
  ProjectItem,
  RegulationDoc,
  TeamItem,
  TrainingCourse,
  VolunteerStats
} from '../types';

export const INITIAL_STATS: VolunteerStats = {
  volunteerCount: 12856,
  serviceHours: 54680,
  spaceStationCount: 142,
  activitySessions: 2360,
  beneficiaryFamilies: 78500
};

export const MOCK_BANNERS: BannerItem[] = [
  {
    id: 'b-1',
    title: '2026“阅动童心”爱阅志愿者春季招募全面开启',
    category: '公告',
    tag: '招募中',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-03-20',
    summary: '面向社会各界召集热心亲子早期阅读推广的爱心人士，共同走进社区空间站与绘本馆。',
    content: [
      '深圳市爱阅公益基金会致力于推动儿童早期阅读生态建设。2026年春季，我们在全市各区爱阅空间站及流动书箱开展百场阅读伴读服务。',
      '服务内容包括：空间站绘本故事会领读、儿童借阅引导、爱阅童书100书单推广宣讲、社区家庭阅读指导咨询。',
      '参与条件：年满18周岁，热爱儿童公益阅读事业，善于与家长及低幼儿童沟通，每月至少提供4小时志愿服务。',
      '所有入选志愿者将由基金会统一提供专业通识培训与导师带教支持，颁发官方志愿服务证书。'
    ],
    relatedProjectId: 'p-1'
  },
  {
    id: 'b-2',
    title: '【项目介绍】“爱阅童书100”全新年度书单发布与阅读指导行动',
    category: '项目介绍',
    tag: '核心项目',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-03-15',
    summary: '汇聚国内顶尖儿童文学专家、教育学者与一线推广人，精选出适合各年龄段儿童的最佳中文原创与引进绘本。',
    content: [
      '“爱阅童书100”是爱阅公益基金会的年度标志性项目，旨在为0-12岁儿童提供专业、高品质的年度阅读风向标。',
      '在空间站志愿者的协助下，年度入围书目将分批进驻乡村小学图书角、社区爱阅空间站及医院儿童友善阅览室。',
      '项目配套开展“童书共读百校巡讲”与“家庭亲子读书月”，线上线下已覆盖全国超30万儿童。'
    ],
    relatedProjectId: 'p-2'
  },
  {
    id: 'b-3',
    title: '爱阅空间站百站焕新计划：让每个社区都有温暖阅读角',
    category: '推文',
    tag: '社区赋能',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-03-10',
    summary: '探索“基金会资源+站长自治+志愿者轮值”的社区阅读推广新模式。',
    content: [
      '空间站不仅是图书借阅点，更是儿童心灵的栖息所与亲子阅读习惯的培育皿。',
      '本次焕新计划将为首批50家示范空间站补充优质绘本、智能扫码还书硬件、以及儿童专属阅读坐垫与护眼照明。',
      '欢迎各区空间站站长与青年志愿者团队登录小程序提交焕新需求与活动立项。'
    ],
    relatedProjectId: 'p-3'
  },
  {
    id: 'b-4',
    title: '【爱阅资讯】携手流动儿童家庭：绘本点亮深圳城中村周末',
    category: '资讯',
    tag: '公益视界',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-03-05',
    summary: '回顾在宝安、龙岗等城中村社区开展的“流动花朵绘本润心”系列特色活动。',
    content: [
      '在过去的两个月里，32位爱阅持证领读人走进城中村党群服务中心，开展周末绘本伴读与戏剧互动。',
      '活动惠及超过400名流动儿童及其家长，帮助建立日常家庭阅读固定时刻，搭建起温暖的邻里互助桥梁。'
    ],
    relatedProjectId: 'p-4'
  }
];

export const MOCK_REVIEWS: ActivityReviewItem[] = [
  {
    id: 'r-1',
    title: '“绘梦周末”南山红树湾空间站亲子伴读专场',
    publisher: '南山示范空间站',
    serviceTarget: '3-6岁学龄前儿童及家长',
    location: '深圳市南山区深圳湾科技生态园党群服务中心爱阅空间站',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '由金牌领读志愿者张老师带领15组亲子家庭精读《猜猜我有多爱你》，结合手工剪纸与肢体互动，激发幼儿情绪表达能力。',
    detailContent: [
      '本场活动为南山区爱阅空间站常规周末主题伴读。活动开始前，志愿者团队提前布置场地并做图书消杀。',
      '领读环节采用声情并茂的情境引导法，孩子们积极举手回答问题，随后通过手折爱心贺卡表达对家人的感恩。',
      '活动得到社区居民高度评价，现场5组新家庭当场办理了爱阅空间站儿童借书卡。'
    ],
    publishDate: '2026-03-25',
    isPinned: true,
    likeCount: 342,
    viewCount: 2180,
    shareCount: 88,
    volunteerCount: 6,
    beneficiaryCount: 30,
    serviceStationName: '南山红树湾示范空间站'
  },
  {
    id: 'r-2',
    title: '“阅芽同行”福田香蜜湖自然绘本户外探险记',
    publisher: '福田空间站',
    serviceTarget: '4-8岁儿童家庭与环保爱好者',
    location: '深圳市福田区香蜜公园自然书房草坪',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '打破传统室内讲读模式，将绘本情景搬进大自然，引导儿童观察落叶、昆虫与植物生命韵律。',
    detailContent: [
      '志愿者带领孩子们阅读自然科学绘本《一粒种子的旅行》，并在公园导师陪同下捡拾落叶制作标本。',
      '志愿者们严格保障户外活动安全，配备急救药箱与防蚊物资，全程秩序井然。'
    ],
    publishDate: '2026-03-24',
    isPinned: true,
    likeCount: 289,
    viewCount: 1890,
    shareCount: 64,
    volunteerCount: 8,
    beneficiaryCount: 45,
    serviceStationName: '福田香蜜湖绿意空间站'
  },
  {
    id: 'r-3',
    title: '“故事魔法屋”宝安西乡街道城中村流动儿童陪伴',
    publisher: '宝安融益空间站',
    serviceTarget: '外来务工人员子女（5-10岁）',
    location: '深圳市宝安区西乡河东社区第三网格服务点',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '针对周末父母工作忙碌的城中村孩子们，开展趣味童话绘本故事会与课后阅读作业答疑辅导。',
    detailContent: [
      '宝安空间站青年志愿者利用课余时间，走进城中村，为孩子们搭建温馨阅读角，赠送绘本借阅包。'
    ],
    publishDate: '2026-03-22',
    isPinned: false,
    likeCount: 412,
    viewCount: 3010,
    shareCount: 105,
    volunteerCount: 10,
    beneficiaryCount: 52,
    serviceStationName: '宝安西乡融益空间站'
  },
  {
    id: 'r-4',
    title: '“绘声绘色”龙岗大运儿童戏剧绘本即兴工作坊',
    publisher: '龙岗大运空间站',
    serviceTarget: '6-12岁小学生及青少年',
    location: '深圳市龙岗区大运软件小镇爱阅创想工坊',
    coverImage: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '用身体演故事！志愿者导师将中国传统民间故事绘本与儿童即兴戏剧融合，培养儿童自信心。',
    detailContent: [
      '活动中孩子们分角色扮演《小石佛》与《年兽来了》经典场景，寓教于乐。'
    ],
    publishDate: '2026-03-20',
    isPinned: false,
    likeCount: 198,
    viewCount: 1250,
    shareCount: 42,
    volunteerCount: 5,
    beneficiaryCount: 25,
    serviceStationName: '龙岗大运悦读空间站'
  },
  {
    id: 'r-5',
    title: '“暖心微光”罗湖东门社区特殊需要儿童绘本疗愈',
    publisher: '罗湖博爱空间站',
    serviceTarget: '孤独症谱系儿童及家庭',
    location: '深圳市罗湖区东门街道残疾人康复综合服务中心',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '1对1志愿者专业伴读，选用触觉与发声机关布书，为星宝们带来感官舒缓与温馨互动体验。',
    detailContent: [
      '参与志愿者均已完成爱阅特殊需要儿童早期支持通识培训，活动获得了心理咨询师专业督导。'
    ],
    publishDate: '2026-03-18',
    isPinned: false,
    likeCount: 560,
    viewCount: 3600,
    shareCount: 180,
    volunteerCount: 12,
    beneficiaryCount: 18,
    serviceStationName: '罗湖博爱空间站'
  },
  {
    id: 'r-6',
    title: '“书香润苗”光明科学城青年志愿者读书分享汇',
    publisher: '光明智汇空间站',
    serviceTarget: '光明区科技青年与亲子家庭',
    location: '深圳市光明区光明文化艺术中心爱阅阅读阁',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '面向青年志愿者开展领读心得复盘，分享如何将科普绘本讲得生动活泼，提升志愿专业度。',
    detailContent: [
      '邀请了资深儿童读物推广人做现场示范，探讨AI时代的儿童科普阅读方法。'
    ],
    publishDate: '2026-03-15',
    isPinned: false,
    likeCount: 145,
    viewCount: 980,
    shareCount: 29,
    volunteerCount: 20,
    beneficiaryCount: 40,
    serviceStationName: '光明科学城智汇空间站'
  },
  {
    id: 'r-7',
    title: '“阅见未来”龙华民治街道外卖小哥子女绘本托管营',
    publisher: '龙华暖蜂空间站',
    serviceTarget: '新就业形态劳动者（网约车、骑手）子女',
    location: '深圳市龙华区民治街道“暖蜂驿站”爱阅图书角',
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '在配送高峰期为城市骑手子女提供安全有爱的情感托付，开展绘本诵读与拼图创作。',
    detailContent: [
      '解除了前线劳动者的后顾之忧，志愿者们认真记录每个孩子的阅读打卡与兴趣倾向。'
    ],
    publishDate: '2026-03-12',
    isPinned: false,
    likeCount: 388,
    viewCount: 2450,
    shareCount: 92,
    volunteerCount: 7,
    beneficiaryCount: 22,
    serviceStationName: '龙华民治暖蜂空间站'
  },
  {
    id: 'r-8',
    title: '“童心非遗”盐田海山街道皮影戏与绘本融合工坊',
    publisher: '盐田山海空间站',
    serviceTarget: '5-12岁社区儿童',
    location: '深圳市盐田区海山街道文化活动中心空间站',
    coverImage: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '结合国家级非遗民间故事绘本，志愿者带领孩子们自制牛皮纸皮影道具，自编自导自演。',
    detailContent: [
      '传统文化与儿童读物的完美交汇，激发了青少年对非遗民俗的浓厚好奇与传承兴趣。'
    ],
    publishDate: '2026-03-08',
    isPinned: false,
    likeCount: 260,
    viewCount: 1670,
    shareCount: 51,
    volunteerCount: 6,
    beneficiaryCount: 35,
    serviceStationName: '盐田山海阅览空间站'
  },
  {
    id: 'r-9',
    title: '“阅满坪山”坑梓社区低幼早教绘本入户指导',
    publisher: '坪山润童空间站',
    serviceTarget: '0-3岁婴幼儿及初为父母家庭',
    location: '深圳市坪山区坑梓街道秀新社区家庭服务中心',
    coverImage: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '送书上门！志愿者深入家庭指导家长如何与小月龄宝宝开展“抚触+音韵读物”早教互动。',
    detailContent: [
      '赠送爱阅阅芽包，手把手传授绘本亲子伴读技巧，解答家长选书疑惑。'
    ],
    publishDate: '2026-03-02',
    isPinned: false,
    likeCount: 215,
    viewCount: 1420,
    shareCount: 38,
    volunteerCount: 5,
    beneficiaryCount: 15,
    serviceStationName: '坪山坑梓润童空间站'
  },
  {
    id: 'r-10',
    title: '“深蓝梦想”大鹏葵涌海洋科普绘本共读巡游',
    publisher: '大鹏蔚蓝空间站',
    serviceTarget: '全年龄段儿童家庭',
    location: '深圳市大鹏新区葵涌溪涌工人度假村沙滩阅读营',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    summary: '面向深圳海岸线生态，以《珊瑚礁的一天》绘本为蓝本，开展海滩环保清洁与海洋知识竞答。',
    detailContent: [
      '让孩子们在听故事的同时理解海洋保护的紧迫性，播撒环保种子。'
    ],
    publishDate: '2026-02-28',
    isPinned: false,
    likeCount: 310,
    viewCount: 2100,
    shareCount: 77,
    volunteerCount: 9,
    beneficiaryCount: 50,
    serviceStationName: '大鹏山海蔚蓝空间站'
  }
];

export const MOCK_TEAMS: TeamItem[] = [
  {
    id: 't-1',
    name: '爱阅·南山红树湾示范空间站',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    address: '深圳市南山区深圳湾科技生态园9栋党群服务中心2层',
    leaderName: '陈立群（站长）',
    leaderContact: '138****6621',
    intro: '空间站成立于2021年，现有注册志愿者120余人，致力于高新科技园区亲子早期阅读、周末流动绘本讲堂及书目借阅维护。信息由站长定期更新与维护。',
    volunteerCount: 128,
    serviceHours: 3450,
    establishedDate: '2021-06-15',
    status: '运营中',
    activityIds: ['r-1']
  },
  {
    id: 't-2',
    name: '爱阅·福田香蜜湖绿意空间站',
    province: '广东省',
    city: '深圳市',
    district: '福田区',
    address: '深圳市福田区农园路30号香蜜公园自然书房西侧',
    leaderName: '林曼琪（站长）',
    leaderContact: '135****8890',
    intro: '结合香蜜湖生态公园优势，以“大自然与亲子绘本”为核心主题，每周六上午定期举办草坪故事会与自然标本制作。',
    volunteerCount: 86,
    serviceHours: 2180,
    establishedDate: '2022-03-20',
    status: '运营中',
    activityIds: ['r-2']
  },
  {
    id: 't-3',
    name: '爱阅·宝安西乡融益空间站',
    province: '广东省',
    city: '深圳市',
    district: '宝安区',
    address: '深圳市宝安区西乡街道河东社区第三综合服务楼1层',
    leaderName: '黄志强（站长）',
    leaderContact: '139****1123',
    intro: '深耕城中村与工业区流动儿童早期阅读支持，常年开展“四点半阅读课堂”与周末绘本故事汇，守护候鸟儿童成长。',
    volunteerCount: 104,
    serviceHours: 2980,
    establishedDate: '2022-09-10',
    status: '运营中',
    activityIds: ['r-3']
  },
  {
    id: 't-4',
    name: '爱阅·龙岗大运悦读空间站',
    province: '广东省',
    city: '深圳市',
    district: '龙岗区',
    address: '深圳市龙岗区大运软件小镇50栋爱阅空间',
    leaderName: '孙晓雨（站长）',
    leaderContact: '136****5572',
    intro: '以大运片区高校青年志愿者为骨干，结合戏剧表演、科学实验与故事即兴演绎，打造极具活力的青年阅读社群。',
    volunteerCount: 92,
    serviceHours: 2450,
    establishedDate: '2023-04-12',
    status: '运营中',
    activityIds: ['r-4']
  },
  {
    id: 't-5',
    name: '爱阅·罗湖博爱空间站',
    province: '广东省',
    city: '深圳市',
    district: '罗湖区',
    address: '深圳市罗湖区东门街道东门中路残联综合服务楼',
    leaderName: '周淑芬（站长）',
    leaderContact: '137****3341',
    intro: '专注于融合教育与特殊需要儿童（如自闭症、发育迟缓）的绘本陪伴与感统阅读支持，提供专业的爱心一对一领读。',
    volunteerCount: 65,
    serviceHours: 1820,
    establishedDate: '2023-08-01',
    status: '运营中',
    activityIds: ['r-5']
  },
  {
    id: 't-6',
    name: '爱阅·光明科学城智汇空间站',
    province: '广东省',
    city: '深圳市',
    district: '光明区',
    address: '深圳市光明区公明街道光明大道文化中心3层',
    leaderName: '赵柯（站长）',
    leaderContact: '133****9908',
    intro: '光明区新型示范站点正在组建筹备中，目前已有骨干志愿者20余人，将重点服务科学城科研青年及其子女的科普绘本伴读。',
    volunteerCount: 24,
    serviceHours: 420,
    establishedDate: '2025-11-20',
    status: '筹建中',
    activityIds: ['r-6']
  },
  {
    id: 't-7',
    name: '爱阅·广州天河华景新城示范空间站',
    province: '广东省',
    city: '广州市',
    district: '天河区',
    address: '广州市天河区中山大道西华景新城社区综合活动室',
    leaderName: '梁嘉欣（站长）',
    leaderContact: '189****7762',
    intro: '广州首批试点爱阅空间站，为华景社区及周边逾千户家庭提供优质中文原创绘本借阅与每周公益读经领唱。',
    volunteerCount: 78,
    serviceHours: 1950,
    establishedDate: '2023-10-15',
    status: '运营中',
    activityIds: []
  },
  {
    id: 't-8',
    name: '爱阅·东莞松山湖科创空间站',
    province: '广东省',
    city: '东莞市',
    district: '松山湖',
    address: '东莞市松山湖高新技术产业开发区管委会科创书吧',
    leaderName: '许建文（站长）',
    leaderContact: '136****4431',
    intro: '聚焦科创园区双职工家庭亲子阅读与周末绘本借阅，搭建高品质亲子共读基地。',
    volunteerCount: 42,
    serviceHours: 1120,
    establishedDate: '2024-02-18',
    status: '运营中',
    activityIds: []
  },
  {
    id: 't-9',
    name: '爱阅·佛山顺德容桂乡村儿童书屋空间站',
    province: '广东省',
    city: '佛山市',
    district: '顺德区',
    address: '佛山市顺德区容桂街道振兴社区新时代文明实践站',
    leaderName: '何丽芳（站长）',
    leaderContact: '138****9023',
    intro: '常态化开展“童心阅芽”乡村儿童领读辅导，守护岭南水乡儿童快乐成长。',
    volunteerCount: 56,
    serviceHours: 1480,
    establishedDate: '2023-11-05',
    status: '运营中',
    activityIds: []
  },
  {
    id: 't-10',
    name: '爱阅·江西赣州于都红星示范空间站',
    province: '江西省',
    city: '赣州市',
    district: '于都县',
    address: '江西省赣州市于都县长征源小学爱阅图书室',
    leaderName: '李国华（站长）',
    leaderContact: '139****7712',
    intro: '爱阅公益在中西部援建的红色老区儿童早期阅读空间站，覆盖周边3所乡村小学超800名留守儿童。',
    volunteerCount: 38,
    serviceHours: 980,
    establishedDate: '2023-09-01',
    status: '运营中',
    activityIds: []
  },
  {
    id: 't-11',
    name: '爱阅·江西南昌红谷滩阳光少儿空间站',
    province: '江西省',
    city: '南昌市',
    district: '红谷滩区',
    address: '江西省南昌市红谷滩区绿地双子塔社区书房',
    leaderName: '程静（站长）',
    leaderContact: '137****6654',
    intro: '由南昌本地高校青年志愿者联合发起，开展周末故事会与爱阅童书100精选书单巡展。',
    volunteerCount: 45,
    serviceHours: 860,
    establishedDate: '2024-04-10',
    status: '运营中',
    activityIds: []
  },
  {
    id: 't-12',
    name: '爱阅·贵州毕节威宁草海生态书香空间站',
    province: '贵州省',
    city: '毕节市',
    district: '威宁县',
    address: '贵州省毕节市威宁县草海镇中海村爱阅流动阅览中心',
    leaderName: '王文武（站长）',
    leaderContact: '135****3310',
    intro: '扎根乌蒙高原乡村，开展图书流通借阅与彝苗双语亲子领读，陪伴大山深处儿童快乐成长。',
    volunteerCount: 29,
    serviceHours: 720,
    establishedDate: '2024-06-20',
    status: '运营中',
    activityIds: []
  },
  {
    id: 't-13',
    name: '爱阅·贵州贵阳观山湖筑梦绘本空间站',
    province: '贵州省',
    city: '贵阳市',
    district: '观山湖区',
    address: '贵州省贵阳市观山湖区金融城金阳街道爱阅体验馆',
    leaderName: '谭晓月（站长）',
    leaderContact: '186****5521',
    intro: '面向林城家庭普及早期亲子阅读方法，开展绘本手作沙龙与领读志愿者能力通识带教。',
    volunteerCount: 52,
    serviceHours: 1340,
    establishedDate: '2023-12-12',
    status: '运营中',
    activityIds: []
  }
];

export const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 'p-1',
    title: '阅芽计划（0-6岁早期阅读推广）',
    subtitle: '让每一个在深圳出生的孩子都拥有一份优质人生起步读物',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    beneficiarySummary: '0-6岁深圳新生儿家庭及托育机构',
    targetAmount: '1,000,000 元',
    raisedAmount: '782,340 元',
    showDonation: true,
    donationLinkUrl: 'https://www.ireadfoundation.org/donate/yueya',
    launchDate: '2016-04-23',
    content: [
      '“阅芽计划”是深圳市爱阅公益基金会联合各方力量发起的标志性儿童早期阅读项目，旨在倡导早期阅读理念，免费为深圳0-6岁婴幼儿发放“阅芽包”。',
      '每个阅芽包内包含：精选经典适龄图画书2本、专业亲子阅读指南1册、儿童成长阅读卡及涂鸦卡，帮助新手家长开启亲子共读黄金期。',
      '志愿者深度参与：从阅芽包分拣、社区发放核验、到社区新手家长共读沙龙主持，志愿者是阅芽计划生根发芽的关键支撑力量。'
    ],
    progressMilestones: [
      { date: '2026年Q1', title: '春季增发20,000份阅芽包', desc: '新增覆盖龙岗与光明区妇幼保健院发包点。' },
      { date: '2025年Q4', title: '上线适老化与新手奶爸共读专栏', desc: '由爱阅讲师团录制10期短视频。' },
      { date: '2025年Q2', title: '累计服务深圳婴幼儿家庭突破50万', desc: '获得中华慈善奖与深圳市关爱行动十佳创意奖。' }
    ]
  },
  {
    id: 'p-2',
    title: '爱阅童书100年度书单评选与推广',
    subtitle: '凝聚儿童文学界与一线教育专家智慧的专业童书坐标',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    beneficiarySummary: '0-12岁儿童、家长、绘本馆与中小学校',
    targetAmount: '500,000 元',
    raisedAmount: '412,000 元',
    showDonation: true,
    donationLinkUrl: 'https://www.ireadfoundation.org/donate/tongshu100',
    launchDate: '2018-09-01',
    content: [
      '“爱阅童书100”每年从国内出版的上万种儿童图画书及儿童文学中，经专家初评、复评、终评闭门打分，甄选出100本兼具文学性、艺术性与适读性的佳作。',
      '书单每年免费公开向社会发布，成为公立图书馆、社区空间站与家庭选书的权威参考手册。',
      '志愿者不仅参与书单试读评审盲测，更在各空间站带领儿童进行深度共读与读后画展。'
    ],
    progressMilestones: [
      { date: '2026年3月', title: '发布2025年度百佳书单巡展', desc: '在深莞穗三地空间站展开流动巡阅。' },
      { date: '2025年12月', title: '评选工作委员会年度闭门研讨', desc: '30位专家学者历时三个月完成审读。' }
    ]
  },
  {
    id: 'p-3',
    title: '爱阅空间站（社区微型儿童友善阅读站）',
    subtitle: '打通儿童阅读最后一公里，把优质书房建在孩子家门口',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    beneficiarySummary: '社区亲子家庭、流动儿童与周边居民',
    targetAmount: '2,000,000 元',
    raisedAmount: '1,650,000 元',
    showDonation: true,
    donationLinkUrl: 'https://www.ireadfoundation.org/donate/station',
    launchDate: '2020-05-18',
    content: [
      '空间站依托党群服务中心、社区书院、产业园区与公益空间，由爱阅基金会提供书架、首期500-1000册高品质绘本，并配备扫码智能借还系统。',
      '空间站由站长自主维护，实行志愿者轮流值班机制，每周至少举办一场公益伴读或戏剧沙龙。',
      '捐赠支持将直接用于新站点的图书采购、书架定制及志愿服务培训督导包。'
    ],
    progressMilestones: [
      { date: '2026年2月', title: '全国累计建立空间站突破140家', desc: '新增珠三角及粤东粤北乡村示范站15座。' },
      { date: '2025年10月', title: '数字化管理平台升级', desc: '支持借还扫码实时同步与志愿者积分兑换。' }
    ]
  },
  {
    id: 'p-4',
    title: '“乡村儿童阅读暖心工程”流动书箱行动',
    subtitle: '让大山里的孩子们同享阳光下的阅读乐趣',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    beneficiarySummary: '中西部偏远乡村小学师生与留守儿童',
    targetAmount: '800,000 元',
    raisedAmount: '630,000 元',
    showDonation: true,
    donationLinkUrl: 'https://www.ireadfoundation.org/donate/rural',
    launchDate: '2019-11-12',
    content: [
      '向偏远乡村学校及教学点配送坚固、耐用的定制流动书箱。每个书箱装有70本适龄优秀绘本，按学期在各班级之间定期流转。',
      '同时开展“乡村教师领读人远程赋能计划”，由爱阅资深志愿者通过网络直播传授绘本讲读技巧。'
    ],
    progressMilestones: [
      { date: '2026年1月', title: '新配发300个春季流动书箱', desc: '覆盖贵州、云南、江西38所乡村学校。' }
    ]
  }
];

export const MOCK_REGULATIONS: RegulationDoc[] = [
  {
    id: 'reg-1',
    title: '《深圳市爱阅公益基金会志愿者管理办法》（2026修订版）',
    category: '管理办法',
    version: 'V2.4',
    updateDate: '2026-01-10',
    summary: '明确爱阅志愿者的准入标准、权利义务、星级晋升通道、日常行为规范及表彰退出机制。',
    sections: [
      {
        title: '第一章 总则',
        content: '第一条 为规范爱阅公益志愿服务工作，保障志愿者合法权益，推动儿童早期阅读推广事业专业化发展，依据《志愿服务条例》制定本办法。\n第二条 爱阅志愿者是指不以获取物质报酬为目的，自愿利用个人时间与技能为儿童早期阅读普及提供公益服务的人员。'
      },
      {
        title: '第二章 志愿者权利与义务',
        content: '第三条 志愿者享有免费参加专业通识及专项伴读培训、获得志愿服务时长记录与证书证明、参与空间站共建决策与评优表彰等权利。\n第四条 志愿者应当遵守儿童友善原则，守护儿童身心隐私与人身安全，按时到岗并严格履行活动职责。'
      },
      {
        title: '第三章 志愿服务时长与积分',
        content: '第五条 每次服务后由活动管理员或空间站站长于24小时内核实并记录志愿学时。\n第六条 服务时长同步上传至“志愿深圳”及全国志愿服务信息系统，支持跨平台互认。'
      }
    ]
  },
  {
    id: 'reg-2',
    title: '《爱阅空间站日常运营与领读人行为规范》',
    category: '行为规范',
    version: 'V1.8',
    updateDate: '2025-11-15',
    summary: '针对空间站站长、管理员及上岗领读者制定的现场服务指导准则与安全预案。',
    sections: [
      {
        title: '第一条 空间站开放与消杀规范',
        content: '开放日前站长需检查图书整齐度与消防设备，定期使用紫外线消杀机或图书环保喷雾对归还绘本进行消毒。'
      },
      {
        title: '第二条 领读伴读安全防护要求',
        content: '活动现场必须保持通道畅通，严禁儿童攀爬书架，至少安排两名成年志愿者维持现场秩序。对于拍照宣传，须事先征得监护人同意。'
      }
    ]
  },
  {
    id: 'reg-3',
    title: '《爱阅优秀志愿者与示范空间站评选奖励办法》',
    category: '表彰激励',
    version: 'V2.0',
    updateDate: '2025-12-01',
    summary: '年度金牌领读者、杰出贡献站长、五星级志愿者的评选标准与激励措施。',
    sections: [
      {
        title: '第一条 评选周期与奖项设立',
        content: '每年12月由基金会组织评定，设立“年度十佳领读人”、“卓越空间站”、“青年公益先锋”等荣誉，颁发奖杯及专属绘本礼包。'
      }
    ]
  }
];

export const MOCK_TRAININGS: TrainingCourse[] = [
  {
    id: 'tr-1',
    title: '【小鹅通专栏】爱阅早期阅读领读人通识认证课（12讲）',
    category: '小鹅通课程',
    durationMinutes: 360,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    speaker: '李敏 博士',
    speakerTitle: '爱阅公益学术顾问 / 儿童发展心理学副教授',
    type: 'xiaoetong',
    isMandatory: true,
    intro: '当前核心认证培训课程。本课程通过小鹅通系列网课提供，包含低幼儿童认知特点、经典图画书赏析、声音与肢体感染力塑造、空间站突发应对等。',
    externalAppId: 'wx12345678xiaoetong'
  },
  {
    id: 'tr-2',
    title: '【在线培训】如何为0-3岁宝宝讲好第一本触觉布书',
    category: '在线必修',
    durationMinutes: 45,
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    speaker: '苏珊 老师',
    speakerTitle: '爱阅资深金牌领读导师',
    type: 'online_video',
    isMandatory: false,
    intro: '详细拆解小月龄婴幼儿阅读关注点，从翻书互动、感官刺激到亲子依恋关系的建立，全实景操作演示。'
  },
  {
    id: 'tr-3',
    title: '【线下实操活动】2026春季爱阅空间站长与骨干现场实务工坊',
    category: '线下实操',
    durationMinutes: 180,
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    speaker: '基金会社区运营部导师团',
    speakerTitle: '爱阅项目中心专家组',
    type: 'offline_event',
    isMandatory: false,
    intro: '面对面进行空间站借还书系统实机演练、绘本破损快速修补技巧、活动策划与拍照技巧培训。',
    offlineVenue: '深圳市福田区香蜜湖公园自然书房会议室',
    offlineTime: '2026年4月12日 14:00 - 17:00',
    signupDeadline: '2026年4月10日 18:00'
  },
  {
    id: 'tr-4',
    title: '【优秀案例分享】南山红树湾空间站如何打造社区“爆款绘本周末”',
    category: '案例精粹',
    durationMinutes: 30,
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    speaker: '陈立群 站长',
    speakerTitle: '五星级站长 / 优秀志愿团队代表',
    type: 'case_study',
    isMandatory: false,
    intro: '复盘如何通过邻里微信群精准召集亲子家庭，如何让年轻家长自发成为第二批领读志愿者，形成社群自生长机制。'
  }
];

export const MOCK_USER_TRAINING_RECORDS = [
  { courseTitle: '爱阅早期阅读通识必修（第一讲：早期阅读价值）', status: '已学完', score: '100分', date: '2026-03-01' },
  { courseTitle: '爱阅空间站安全与儿童友好准则', status: '已学完', score: '合格', date: '2026-03-05' },
  { courseTitle: '低幼图画书声情并茂领读技巧实战', status: '进行中 (已学60%)', score: '--', date: '2026-03-18' }
];

// ========= 活动大厅与活动详情真实模拟数据 =========
import { LiveActivity, UserProfileData } from '../types';

export const MOCK_LIVE_ACTIVITIES: LiveActivity[] = [
  {
    id: 'act-101',
    title: '“阅芽共读”南山科技园低幼绘本领读与借还指导',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    targetAudience: 'both', // 招募志愿者 + 招募参与者
    status: 'recruiting', // 报名中
    volunteerRequirement: 'all_volunteers', // 所有志愿者
    activityType: 'volunteer_service', // 志愿服务
    activityTypeName: '志愿服务',
    startTime: '2026-04-05 09:30',
    endTime: '2026-04-05 12:00',
    timeDisplay: '2026年4月5日（周六）09:30 - 12:00',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    locationName: '深圳湾科技生态园党群服务中心爱阅空间站',
    locationAddress: '深圳市南山区沙河西路1801号科技生态园9栋B座2层',
    stationName: '南山红树湾示范空间站',
    description: [
      '面向园区及周边0-6岁婴幼儿亲子家庭，由爱阅认证领读人与志愿者共同开展《好饿的毛毛虫》声情并茂故事领读。',
      '协助指导家长使用“爱阅借阅小程序”自主借还绘本，现场为新家庭配发“阅芽包”。',
      '志愿者职责包括：空间站环境整理、儿童绘本消毒复位、签到指引、故事会协助及秩序维护。'
    ],
    requirements: [
      '年满18周岁，有亲和力，热爱低幼儿童阅读陪伴；',
      '已在小程序完成“爱阅早期阅读通识”小鹅通线上课程；',
      '服务期间着爱阅志愿者红马甲，遵守儿童保护准则。'
    ],
    volunteerQuota: 6,
    enrolledVolunteersCount: 4,
    participantQuota: 15,
    enrolledParticipantsCount: 12,
    serviceHoursAward: 3.0,
    lecturer: {
      name: '陈立群',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: '南山示范空间站站长 / 爱阅五星讲师',
      bio: '从事儿童早期阅读推广6年，累计领读故事会超200场，受训领读志愿者超500人次。默认由站长担任，后台可动态配置编辑。'
    },
    contact: {
      name: '陈立群（站长）',
      phone: '138****6621',
      role: '空间站长（后台可编辑）'
    },
    enrolledUsers: [
      { id: 'u-1', name: '张雨晴', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-24 10:20', serviceStationName: '南山红树湾站' },
      { id: 'u-2', name: '李明轩', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-24 11:05', serviceStationName: '福田绿意站' },
      { id: 'u-3', name: '王晓婷', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-24 14:30' },
      { id: 'u-4', name: '周海洋', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-25 08:45' },
      { id: 'p-1', name: '林妈妈（携4岁宝）', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', type: 'parent', enrolledAt: '03-23 18:30', childrenAge: '4岁' },
      { id: 'p-2', name: '陈先生（携3岁半宝）', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', type: 'parent', enrolledAt: '03-24 09:12', childrenAge: '3.5岁' },
      { id: 'p-3', name: '赵雅婷家庭', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', type: 'parent', enrolledAt: '03-24 15:40', childrenAge: '5岁' }
    ]
  },
  {
    id: 'act-102',
    title: '“书香自然”福田香蜜湖亲子草坪绘本共读沙龙',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    targetAudience: 'recruit_participant', // 招募参与者（家长活动）
    status: 'recruiting',
    volunteerRequirement: 'station_only', // 仅限本站志愿者
    activityType: 'parent_reading', // 家长活动
    activityTypeName: '家长活动',
    startTime: '2026-04-06 15:00',
    endTime: '2026-04-06 17:00',
    timeDisplay: '2026年4月6日（周日）15:00 - 17:00',
    province: '广东省',
    city: '深圳市',
    district: '福田区',
    locationName: '香蜜公园自然书房草坪爱阅空间站',
    locationAddress: '深圳市福田区农园路30号香蜜公园内部',
    stationName: '福田香蜜湖绿意空间站',
    description: [
      '以团队开展的阅读公益活动为主，带孩子们在微风绿草间品读经典自然科学图画书《一粒种子的旅行》。',
      '现场设置亲子自然拼贴手作与家庭好书漂流角，享受春日亲子沉浸式阅读时光。'
    ],
    requirements: [
      '面向3-8岁儿童亲子家庭开放报名，每组家庭至多2大1小；',
      '自带户外野餐垫与水壶，活动期间听从空间站导师指引。'
    ],
    volunteerQuota: 4,
    enrolledVolunteersCount: 4,
    participantQuota: 20,
    enrolledParticipantsCount: 16,
    serviceHoursAward: 2.5,
    lecturer: {
      name: '林曼琪',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: '福田香蜜湖绿意空间站队长',
      bio: '自然教育绘本推广实践者，热爱户外自然与儿童早期读物跨界融通教学。'
    },
    contact: {
      name: '林曼琪（队长）',
      phone: '135****8890',
      role: '空间站队长（后台可编辑）'
    },
    enrolledUsers: [
      { id: 'v-10', name: '周志恒', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-24 16:00' },
      { id: 'p-11', name: '黄小燕家庭', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', type: 'parent', enrolledAt: '03-24 17:15', childrenAge: '6岁' }
    ]
  },
  {
    id: 'act-103',
    title: '【领读者学院】2026春季绘本戏剧即兴表达实战工作坊',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    targetAudience: 'recruit_volunteer', // 仅招募志愿者
    status: 'recruiting',
    volunteerRequirement: 'all_volunteers',
    activityType: 'training', // 学习培训
    activityTypeName: '学习培训',
    startTime: '2026-04-12 14:00',
    endTime: '2026-04-12 17:00',
    timeDisplay: '2026年4月12日（周六）14:00 - 17:00',
    province: '广东省',
    city: '深圳市',
    district: '龙岗区',
    locationName: '龙岗大运软件小镇50栋爱阅创想工坊',
    locationAddress: '深圳市龙岗区龙岗大道8288号大运软件小镇50栋2层',
    stationName: '龙岗大运悦读空间站',
    description: [
      '专为爱阅注册志愿者打造的实操技能进阶工坊，重点研磨：肢体戏剧语言、儿童情绪节奏把控、空间站突发提问破冰。',
      '现场分组进行绘本戏剧编排演练，导师逐一提供镜头与台风督导反馈。'
    ],
    requirements: [
      '限爱阅已认证志愿者参加；',
      '自备舒适运动鞋服，便于形体互动；',
      '考核通过者可获赠2本示范领读童书并记入3培训学时。'
    ],
    volunteerQuota: 25,
    enrolledVolunteersCount: 18,
    participantQuota: 0,
    enrolledParticipantsCount: 0,
    serviceHoursAward: 3.0,
    lecturer: {
      name: '孙晓雨',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: '大运空间站队长 / 戏剧教育导师',
      bio: '资深儿童即兴戏剧编剧与领读教练，长期为深圳各区爱阅空间站提供领读者表达赋能。'
    },
    contact: {
      name: '孙晓雨（队长）',
      phone: '136****5572',
      role: '空间站队长（后台可编辑）'
    },
    enrolledUsers: [
      { id: 'v-21', name: '方圆', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-24 12:00' },
      { id: 'v-22', name: '王敏敏', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-25 09:30' }
    ]
  },
  {
    id: 'act-104',
    title: '“暖蜂微光”宝安西乡街道外来务工家庭周末伴读',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    targetAudience: 'both',
    status: 'deadline_reached', // 已截止
    volunteerRequirement: 'station_only', // 仅限本站志愿者
    activityType: 'volunteer_service',
    activityTypeName: '志愿服务',
    startTime: '2026-03-29 14:00',
    endTime: '2026-03-29 16:30',
    timeDisplay: '2026年3月29日 14:00 - 16:30',
    province: '广东省',
    city: '深圳市',
    district: '宝安区',
    locationName: '宝安区西乡河东社区第三综合服务楼爱阅微书房',
    locationAddress: '深圳市宝安区西乡街道河东社区榕树下街12号',
    stationName: '宝安西乡融益空间站',
    description: [
      '走进城中村，为网约车司机、骑手等新就业群体子女开展课后伴读与拼图手工指导，缓解周末照护压力。'
    ],
    requirements: [
      '仅限宝安西乡融益空间站注册志愿者；有耐心，服从现场协调。'
    ],
    volunteerQuota: 8,
    enrolledVolunteersCount: 8,
    participantQuota: 15,
    enrolledParticipantsCount: 15,
    serviceHoursAward: 2.5,
    lecturer: {
      name: '黄志强',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: '宝安融益空间站站长',
      bio: '扎根宝安社区志愿服务8年，推动成立3所城中村微型绘本角。'
    },
    contact: {
      name: '黄志强（站长）',
      phone: '139****1123',
      role: '空间站长（后台可编辑）'
    },
    enrolledUsers: [
      { id: 'v-31', name: '苏志豪', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-22 10:00' }
    ]
  },
  {
    id: 'act-105',
    title: '“爱阅同心”2025年度深圳优秀阅读志愿团队表彰与茶话会',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    targetAudience: 'recruit_volunteer',
    status: 'completed', // 已结束
    volunteerRequirement: 'all_volunteers',
    activityType: 'commendation', // 评优表彰
    activityTypeName: '评优表彰',
    startTime: '2026-03-20 15:00',
    endTime: '2026-03-20 18:00',
    timeDisplay: '2026年3月20日 15:00 - 18:00',
    province: '广东省',
    city: '深圳市',
    district: '罗湖区',
    locationName: '爱阅公益基金会多功能报告厅',
    locationAddress: '深圳市罗湖区笋岗街道桃园路深圳国际公益学院3层',
    stationName: '基金会直属空间站',
    description: [
      '表彰2025年度十佳金牌领读人、五星级示范空间站及志愿服务时长破百小时的爱心志愿者。',
      '开展年度阅读服务案例复盘，交流空间站运营经验与创新伴读模式。'
    ],
    requirements: [
      '受邀年度优秀志愿者及各空间站长代表。'
    ],
    volunteerQuota: 50,
    enrolledVolunteersCount: 48,
    participantQuota: 0,
    enrolledParticipantsCount: 0,
    serviceHoursAward: 3.0,
    lecturer: {
      name: '爱阅项目运营总监',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: '爱阅基金会总会管理员',
      bio: '负责全深圳及全国空间站标准建设与志愿者成长激励体系。'
    },
    contact: {
      name: '基金会秘书处',
      phone: '0755-8888****',
      role: '管理员（后台可编辑）'
    },
    enrolledUsers: [
      { id: 'v-41', name: '陈立群', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-15 11:00' }
    ]
  },
  {
    id: 'act-106',
    title: '“书友夜读”青年领读人沙龙与绘本选品联谊交流会',
    coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    targetAudience: 'recruit_volunteer',
    status: 'recruiting',
    volunteerRequirement: 'all_volunteers',
    activityType: 'exchange', // 联谊交流
    activityTypeName: '联谊交流',
    startTime: '2026-04-18 19:00',
    endTime: '2026-04-18 21:00',
    timeDisplay: '2026年4月18日（周五）19:00 - 21:00',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    locationName: '华侨城创意园旧天堂咖啡馆爱阅流动阅览角',
    locationAddress: '深圳市南山区华侨城OCT-LOFT创意文化园文昌南街5栋',
    stationName: '南山红树湾示范空间站',
    description: [
      '轻松愉悦的青年志愿者夜读聚会，大家自带一本心爱绘本做盲盒互换推荐，结识志同道合的公益伙伴。'
    ],
    requirements: [
      '所有爱阅志愿者均可报名，自带一本适龄童书作盲盒交换。'
    ],
    volunteerQuota: 20,
    enrolledVolunteersCount: 11,
    participantQuota: 0,
    enrolledParticipantsCount: 0,
    serviceHoursAward: 2.0,
    lecturer: {
      name: '陈立群',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: '空间站长（后台可编辑）',
      bio: '五星站长，负责策划本次青年交流沙龙。'
    },
    contact: {
      name: '陈立群（站长）',
      phone: '138****6621',
      role: '空间站长（后台可编辑）'
    },
    enrolledUsers: [
      { id: 'v-51', name: '张雨晴', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', type: 'volunteer', enrolledAt: '03-24 16:30' }
    ]
  }
];

export const INITIAL_USER_PROFILE: UserProfileData = {
  id: 'usr-8899',
  name: '张雨晴',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  phone: '13788992211',
  idCardMasked: '4403011995****3321', // 敏感字段不可修改
  gender: '女',
  emergencyContact: '张建军（父亲）',
  emergencyPhone: '13900112233',
  currentStationId: 't-1',
  currentStationName: '南山红树湾示范空间站',
  joinedDate: '2023-05-12',
  isVolunteerActivated: true, // 已完成激活任务
  volunteerTeamAuditStatus: 'approved', // 已审核通过
  serviceHours: 42.5, // 累计志愿时长 42.5h (介于30h~100h，称号为阅光志愿者)
  activityCount: 14,
  completedTrainingIds: ['tr-1', 'tr-2'],
  childrenInfo: [
    { name: '天天', age: 4, readingInterest: '恐龙与自然科普图画书' }
  ]
};

