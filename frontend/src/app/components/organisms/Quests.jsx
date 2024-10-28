
export default function Quests({ divisionData }) {
  const { division, points } = divisionData;
  const necessaryPoints = 300;

  const progressPercentage = (points / necessaryPoints) * 100;

  const nextDivisionTitles = {
    bronce: 'Plata',
    plata: 'Oro',
    oro: '',
  };

  const nextDivisionTitle = nextDivisionTitles[division];

  return (
    <main className="flex w-full flex-col overflow-hidden sm:min-w-[570px]">
      <div className="m-5 flex h-[198.22px] flex-col items-center justify-center rounded-lg bg-gradient-to-r from-[#317EF4] to-[#8E2BFF] p-5 text-white">
        <div className="flex items-center pb-5 text-[18px]">
          Tus puntos
        </div>
        <div className="text-[48px]">{points}</div>
        <div className="self-start pt-5 text-[16px]">
          {points} de {necessaryPoints} puntos
        </div>
        <div className="relative mt-2 h-[44.74px] w-full overflow-hidden rounded-full bg-[#D4D4D4]">
          <div
            className={`absolute left-0 top-0 h-full rounded-full ${progressPercentage === 0 ? 'bg-[#D4D4D4]' : 'bg-[#FFFFFF]'}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
          {nextDivisionTitle && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-start pl-4 text-[16px] text-[#181818]">
              {nextDivisionTitle}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
