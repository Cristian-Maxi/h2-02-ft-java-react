import { useState } from 'react';
import { useDate } from '../../context/DateContext';
import { adjustDate, formatDate, formatDateNav } from '../../utils/dateUtils';
import PredictionsProgress from '../atoms/PredictionsProgress';

export default function SelectMatchTabs() {
  const { updateSelectedDate } = useDate();
  const today = adjustDate(0);
  const day1 = adjustDate(1);
  const day2 = adjustDate(2);
  const day3 = adjustDate(3);
  const day4 = adjustDate(4);
  const [activeTab, setActiveTab] = useState(formatDateNav(today));

  const tabs = [today, day1, day2, day3, day4];
  // console.log('tabs', tabs);

  const handleTabClick = (tab) => {
    console.log(formatDateNav(tab));
    setActiveTab(formatDateNav(tab));
    updateSelectedDate(tab);
  };

  return (
    <nav className="w-full overflow-x-auto">
      <div className="flex w-full justify-between space-x-4 whitespace-nowrap">
        {tabs.map((tab) => (
          <div className="flex flex-col items-center gap-2" key={tab}>
            {tab !== today ? (
              <PredictionsProgress
                totalPredictions={2}
                date={formatDate(tab)}
                cantCircles={2}
              />
            ) : (
              <PredictionsProgress
                totalPredictions={2}
                date={formatDate(tab)}
                cantCircles={5}
              />
            )}
            <button
              onClick={() => handleTabClick(tab)}
              className={`w-20 px-4 pb-1 text-regularNav-16 transition-colors duration-300 ${
                activeTab === formatDateNav(tab)
                  ? 'border-b-[3px] border-label font-medium text-label'
                  : 'text-grayWaki'
              }`}
            >
              {tab !== today ? `${formatDateNav(tab)}` : 'Hoy'}
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}
