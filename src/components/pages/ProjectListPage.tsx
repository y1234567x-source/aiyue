import React from 'react';
import { ProjectItem } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ProjectListPageProps {
  projects: ProjectItem[];
  onSelectProject: (projectId: string) => void;
}

export const ProjectListPage: React.FC<ProjectListPageProps> = ({
  projects,
  onSelectProject
}) => {
  return (
    <div className="bg-neutral-50 min-h-full pb-8 select-none">
      {/* 头部说明 */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <h1 className="text-base font-bold text-neutral-900">
          了解爱阅公益项目
        </h1>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
          爱阅致力于构建高品质的儿童早期阅读生态，把优质书房建在孩子家门口。点击各项目可查看背景实施与成效规划。
        </p>
      </div>

      {/* 项目图文列表：图文卡片样式，纯净无服务对象内容 */}
      <div className="p-3 space-y-3">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onSelectProject(proj.id)}
            className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs hover:border-neutral-300 active:scale-[0.99] transition cursor-pointer"
          >
            {/* 项目主视觉海报 */}
            <div className="aspect-16/8 w-full bg-neutral-200 overflow-hidden relative">
              <img
                src={proj.coverImage}
                alt={proj.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-full font-mono">
                自 {proj.launchDate} 发起
              </div>
              <div className="absolute bottom-2.5 left-2.5 bg-rose-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                爱阅核心品牌项目
              </div>
            </div>

            {/* 图文内容区：展示项目定位与标语，不展示服务对象 */}
            <div className="p-3.5">
              <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                {proj.title}
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed">
                {proj.subtitle}
              </p>

              {/* 卡片底部操作与状态 */}
              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                  持续开展中
                </span>
                <span className="text-rose-600 font-bold flex items-center gap-0.5 text-xs">
                  查看项目详情 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
