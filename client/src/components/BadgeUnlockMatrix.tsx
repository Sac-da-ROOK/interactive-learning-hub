import React, { useState } from 'react';
import { Award, Lock, Unlock, ShieldAlert, Zap, Layers, BarChart2, Coins } from 'lucide-react';
import { useUserStore } from '../store/useStore';

interface BadgeSchema {
  id: string;
  name: string;
  metricLabel: string;
  targetCount: number;
  coinBonus: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
  icon: React.ReactNode;
}

export default function BadgeUnlockMatrix() {
  // Pull data tracking metrics from our updated user gamification store state loop
  const lessonsFinished = useUserStore((state: any) => state.lessonsFinished) || 0;
  const currencyCoins = useUserStore((state: any) => state.currencyCoins) || 0;

  const [activeTierFilter, setActiveTierFilter] = useState<'All' | 'Bronze' | 'Silver' | 'Gold'>('All');
  const [claimedRewardIds, setClaimedRewardIds] = useState<string[]>([]);

  const badgesInventory: BadgeSchema[] = [
    { id: 'b-inv-1', name: 'Curriculum Initiate', metricLabel: 'Complete 1 lesson module', targetCount: 1, coinBonus: 25, tier: 'Bronze', icon: <Zap size={16} /> },
    { id: 'b-inv-2', name: 'Syllabus Adept', metricLabel: 'Complete 3 lesson modules', targetCount: 3, coinBonus: 75, tier: 'Silver', icon: <Layers size={16} /> },
    { id: 'b-inv-3', name: 'Academic Sentinel', metricLabel: 'Complete 5 lesson modules', targetCount: 5, coinBonus: 200, tier: 'Gold', icon: <BarChart2 size={16} /> },
  ];

  const filteredBadges = activeTierFilter === 'All'
    ? badgesInventory
    : badgesInventory.filter(b => b.tier === activeTierFilter);

  const handleClaimBonusRewardTokens = (badgeId: string, bonusAmount: number) => {
    if (claimedRewardIds.includes(badgeId)) return;
    
    setClaimedRewardIds([...claimedRewardIds, badgeId]);
    
    // Direct notification output warning simulation trigger
    alert(`Successfully claimed +${bonusAmount} credit tokens to your local profile wallet!`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      
      {/* Tier Inventory Tracking Filter Sub-Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Award size={16} className="fill-amber-50" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Leaderboard Trophy Case</h3>
            <p className="text-[10px] text-gray-400 font-medium">Track unlock conditions, claim currency bonuses, and filter milestones.</p>
          </div>
        </div>

        {/* Filter Toggle Controls Block Panel Element */}
        <div className="flex gap-1 bg-slate-50 border border-slate-100 p-1 rounded-xl self-start sm:self-center">
          {['All', 'Bronze', 'Silver', 'Gold'].map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTierFilter(tier as any)}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${
                activeTierFilter === tier ? 'bg-white text-gray-900 shadow-xs border border-gray-100' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tier}
                </button>
          ))}
        </div>
      </div>

      {/* Matrix Mapping Grid Iteration Deck */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBadges.map((badge) => {
          // Dynamic completion criteria evaluation calculation bounds mapping
          const currentCountValue = lessonsFinished;
          const isUnlocked = currentCountValue >= badge.targetCount;
          const completionPercentage = Math.min((currentCountValue / badge.targetCount) * 100, 100);
          const hasBeenClaimed = claimedRewardIds.includes(badge.id);

          return (
            <div 
              key={badge.id}
              className={`p-4 border rounded-2xl flex flex-col justify-between space-y-3 transition group relative overflow-hidden ${
                isUnlocked 
                  ? 'bg-white border-gray-200 shadow-xs hover:border-indigo-200' 
                  : 'bg-gray-50/50 border-gray-100 opacity-70'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className={`p-2 rounded-xl border ${
                    isUnlocked 
                      ? badge.tier === 'Gold' ? 'bg-amber-50 border-amber-200 text-amber-600'
                      : badge.tier === 'Silver' ? 'bg-slate-100 border-slate-300 text-slate-600'
                      : 'bg-orange-50 border-orange-200 text-orange-700'
                      : 'bg-gray-100 border-gray-200 text-gray-400'
                  }`}>
                    {badge.icon}
                  </div>

                  {/* Operational Lock/Unlock Node Badge Tags */}
                  <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded border uppercase ${
                    isUnlocked 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}>
                    {isUnlocked ? <Unlock size={8} className="inline mr-0.5 mb-0.5 text-emerald-600" /> : <Lock size={8} className="inline mr-0.5 mb-0.5" />}
                    {badge.tier}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-gray-900 group-hover:text-indigo-600 transition">{badge.name}</h4>
                  <p className="text-[10px] text-gray-400 font-medium leading-tight">{badge.metricLabel}</p>
                </div>
              </div>

              {/* Fractional Tracking Progress Bar Slider Interface */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-[9px] font-mono font-black text-gray-500">
                  <span>UNIFICATION PROGRESS</span>
                  <span>{currentCountValue} / {badge.targetCount}</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden p-0.5 border border-gray-200/40">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUnlocked ? 'bg-emerald-400' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Financial Reward Extraction Mechanism Actions Footer Toggle */}
              {isUnlocked && (
                <button
                  onClick={() => handleClaimBonusRewardTokens(badge.id, badge.coinBonus)}
                  disabled={hasBeenClaimed}
                  className={`w-full text-[10px] font-black py-1.5 rounded-xl border transition flex items-center justify-center gap-1 ${
                    hasBeenClaimed
                      ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed'
                      : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100/70 shadow-2xs'
                  }`}
                >
                  <Coins size={11} className={hasBeenClaimed ? '' : 'animate-bounce'} />
                  {hasBeenClaimed ? 'Reward Disbursed' : `Claim Bonus +${badge.coinBonus} Credits`}
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}