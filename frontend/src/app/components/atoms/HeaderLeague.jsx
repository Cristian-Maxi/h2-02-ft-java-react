import LeagueEmblem from '../../../assets/leagueEmblem.png';

export default function HeaderLeague({ league, competitionShield }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      {/* Liga y logo */}
      <img src={competitionShield || LeagueEmblem} alt="Logo" width={'18px'} />
      <p className="text-regular-12 text-grayWaki">{league}</p>
    </div>
  );
}
