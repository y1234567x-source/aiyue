import React from 'react';
import { ProjectItem } from '../../types';

interface ProjectDetailPageProps {
  project: ProjectItem;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project
}) => {
  return (
    <div className="bg-neutral-50 min-h-full pb-10 select-none">
      {/* 封面海报 */}
      <div className="relative aspect-video w-full bg-neutral-200 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
          启动日期：{project.launchDate}
        </div>
      </div>

      {/* 头部信息 */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-50 text-rose-700 rounded border border-rose-200">
            爱阅品牌公益项目
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
            持续运营中
          </span>
        </div>

        <h1 className="text-base font-bold text-neutral-900 leading-snug">
          {project.title}
        </h1>

        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
          {project.subtitle}
        </p>
      </div>

      {/* 项目详情图文介绍 */}
      <div className="p-4 bg-white mt-2 border-y border-neutral-200">
        <h2 className="text-xs font-bold text-neutral-900 mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 bg-rose-500 rounded-full"></span>
          项目背景与实施规划
        </h2>
        <div className="space-y-2.5 text-xs text-neutral-700 leading-relaxed">
          {project.content.map((p, idx) => (
            <p key={idx} className="indent-4 text-justify">
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* 进展里程碑 */}
      {project.progressMilestones && (
        <div className="p-4 bg-white mt-2 border-y border-neutral-200">
          <h2 className="text-xs font-bold text-neutral-900 mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-neutral-900 rounded-full"></span>
            项目执行里程碑
          </h2>
          <div className="space-y-3 relative pl-3 border-l-2 border-neutral-200 ml-1">
            {project.progressMilestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white"></div>
                <div className="text-[10px] font-mono text-neutral-400">{m.date}</div>
                <div className="text-xs font-bold text-neutral-900 mt-0.5">{m.title}</div>
                <div className="text-[11px] text-neutral-600 mt-0.5">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 底部自然留白与爱阅标识 */}
      <div className="text-center py-6 text-[10px] text-neutral-400 font-mono">
        —— 爱阅公益 · 伴读共成长 ——
      </div>
    </div>
  );
};
