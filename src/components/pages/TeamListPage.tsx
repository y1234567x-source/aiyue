import React, { useState, useMemo } from 'react';
import { TeamItem } from '../../types';
import {
  Users,
  Clock,
  MapPin,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface TeamListPageProps {
  teams: TeamItem[];
  onSelectTeam: (teamId: string) => void;
  onOpenExternalReference?: () => void;
}

export const TeamListPage: React.FC<TeamListPageProps> = ({
  teams,
  onSelectTeam
}) => {
  // 1. 省份
  const [selectedProvince, setSelectedProvince] = useState<string>('广东省');

  // 获取当前省份下有哪些城市
  const availableCities = useMemo(() => {
    const citySet = new Set<string>();
    teams
      .filter((t) => t.province === selectedProvince)
      .forEach((t) => citySet.add(t.city));
    return Array.from(citySet);
  }, [teams, selectedProvince]);

  // 2. 城市 (默认选择列表中的第1个城市，如 深圳市、广州市等)
  const [selectedCity, setSelectedCity] = useState<string>('深圳市');

  // 3. 深圳辖区（只有选到深圳市才展开区级筛选，其他城市到市即可）
  const [selectedDistrict, setSelectedDistrict] = useState<string>('全部区');

  const provinces = ['广东省', '江西省', '贵州省'];
  const shenzhenDistricts = ['全部区', '南山区', '福田区', '宝安区', '龙岗区', '罗湖区', '光明区'];

  // 当切换省份时，自动联动更新城市与区域
  const handleSelectProvince = (prov: string) => {
    setSelectedProvince(prov);
    const citiesInProv = Array.from(
      new Set(teams.filter((t) => t.province === prov).map((t) => t.city))
    );
    const nextCity = citiesInProv.length > 0 ? citiesInProv[0] : '';
    setSelectedCity(nextCity);
    setSelectedDistrict('全部区');
  };

  const filteredTeams = useMemo(() => {
    return teams.filter((t) => {
      // 匹配省份
      if (t.province !== selectedProvince) return false;
      // 匹配城市
      if (selectedCity && t.city !== selectedCity) return false;
      // 只有深圳支持区级进一步筛选
      if (selectedProvince === '广东省' && selectedCity === '深圳市') {
        if (selectedDistrict !== '全部区' && t.district !== selectedDistrict) {
          return false;
        }
      }
      return true;
    });
  }, [teams, selectedProvince, selectedCity, selectedDistrict]);

  return (
    <div className="bg-neutral-50 min-h-full pb-16 select-none">
      {/* 筛选控制器：吸顶置顶 (sticky top-0 z-20) */}
      <div className="bg-white border-b border-neutral-200 p-3 sticky top-0 z-20 space-y-2.5 shadow-2xs">
        {/* ① 第一步：先选省份 */}
        <div>
          <div className="text-[10px] font-medium text-neutral-400 mb-1 flex items-center justify-between">
            <span>选择省份</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {provinces.map((prov) => (
              <button
                key={prov}
                onClick={() => handleSelectProvince(prov)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition whitespace-nowrap ${
                  selectedProvince === prov
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        {/* ② 第二步：再选城市 */}
        {availableCities.length > 0 && (
          <div className="pt-2 border-t border-neutral-100">
            <div className="text-[10px] font-medium text-neutral-400 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span>选择城市（{selectedProvince}）</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {availableCities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setSelectedDistrict('全部区');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs transition whitespace-nowrap font-medium ${
                    selectedCity === city
                      ? 'bg-rose-50 border border-rose-300 text-rose-700 font-semibold shadow-2xs'
                      : 'bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ③ 第三步：只有深圳市需要再增加选区，其他城市到市级即可 */}
        {selectedProvince === '广东省' && selectedCity === '深圳市' && (
          <div className="pt-2 border-t border-neutral-100">
            <div className="text-[10px] font-medium text-neutral-400 mb-1 flex items-center gap-1">
              <span>深圳市辖区</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {shenzhenDistricts.map((dist) => (
                <button
                  key={dist}
                  onClick={() => setSelectedDistrict(dist)}
                  className={`px-2 py-0.5 rounded text-[11px] transition whitespace-nowrap ${
                    selectedDistrict === dist
                      ? 'bg-rose-600 text-white font-medium'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 团队统计摘要 */}
      <div className="px-4 py-2 flex items-center justify-between text-[11px] text-neutral-500">
        <span>
          当前地区空间站：<strong className="text-neutral-900">{filteredTeams.length}</strong> 个
        </span>
      </div>

      {/* 团队列表展示 */}
      <div className="px-3 space-y-3">
        {filteredTeams.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-neutral-200 text-neutral-400 text-xs">
            该地区暂无已登记空间站，正在筹建中...
          </div>
        ) : (
          filteredTeams.map((team) => (
            <div
              key={team.id}
              onClick={() => onSelectTeam(team.id)}
              className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs hover:border-neutral-300 active:scale-[0.99] transition cursor-pointer"
            >
              {/* 头部：名称与状态 */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                      {team.city} · {team.district}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        team.status === '运营中'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {team.status}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-neutral-900 mt-1.5 leading-snug">
                    {team.name}
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
              </div>

              {/* 简介 */}
              <p className="text-[11px] text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                {team.intro}
              </p>

              {/* 地址 */}
              <div className="flex items-center gap-1 text-[11px] text-neutral-500 mt-2 truncate">
                <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                <span className="truncate">{team.address}</span>
              </div>

              {/* 核心数据网格：志愿者数、服务时长、站长负责人 */}
              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-neutral-500 text-[11px]">志愿者:</span>
                    <span className="font-semibold text-neutral-900">{team.volunteerCount}人</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-neutral-500 text-[11px]">时长:</span>
                    <span className="font-semibold text-neutral-900">{team.serviceHours}h</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                  <UserCheck className="w-3 h-3 text-emerald-600" />
                  <span>{team.leaderName}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
