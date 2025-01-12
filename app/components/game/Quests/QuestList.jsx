import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { QUESTS } from "../../../data/quests";

const QuestList = ({ userProgress }) => {
  // Fusion avec initialUserProgress si userProgress est vide ou invalide
  const progress = userProgress || {};

  return (
    <div className="quest-list">
      {Object.values(QUESTS).map((quest) => {
        // Vérifier si la quête est complétée en regardant dans completedQuests
        const isCompleted = progress.completedQuests?.includes(quest.id);

        return (
          <div
            key={quest.id}
            className={`quest-item p-4 border rounded-lg mb-4 transition-all duration-300 ${
              isCompleted
                ? "bg-green-100 border-green-500 shadow-lg"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <h3 className="font-bold flex items-center">
              {quest.name}
              {isCompleted && (
                <CheckCircleIcon className="h-5 w-5 text-green-600 ml-2" />
              )}
            </h3>
            <p className="text-gray-600">{quest.description}</p>
            <div className="mt-2 text-sm">
              <p>Table requise : {quest.requiredTable}</p>
              <p>Score minimum : {quest.requiredScore}%</p>
              {isCompleted && (
                <p className="text-green-600 font-bold flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Quête complétée !
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestList;
