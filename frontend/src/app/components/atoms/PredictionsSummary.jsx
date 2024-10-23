import { useState } from 'react';
import { BodyPredictionsCard } from './BodyPredictionsCard';
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from 'react-icons/md';

export default function PredictionsSummary({
  result,
  team1,
  team2,
  points,
  status,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSummary = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="w-full divide-y pt-5">
      {/* Botón para abrir/cerrar el resumen */}
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-2"
        onClick={toggleSummary}
      >
        {isOpen ? <MdKeyboardDoubleArrowDown /> : <MdKeyboardDoubleArrowUp />}
        Ver Resumen
        {isOpen ? <MdKeyboardDoubleArrowDown /> : <MdKeyboardDoubleArrowUp />}
      </button>

      {/* Contenido oculto que se despliega */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <BodyPredictionsCard
          result={result}
          team1={team1}
          team2={team2}
          points={points}
          status={status}
        />
      </div>

      {/* Puntos totales */}
      <div className="grid grid-cols-[1fr_50px] p-4 text-medium-18 font-medium text-blueWaki">
        <p>Puntos totales</p>
        <p className="text-center">15</p>
      </div>
    </section>
  );
}
