import { REWARDS } from "../../../data/rewards";
import { initialUserProgress } from "../../../utils/gameLogic/progression";

const RewardList = ({ userProgress }) => {
  // Normalisation des données de progression
  const progress =
    !userProgress || Object.keys(userProgress).length === 0
      ? initialUserProgress
      : { ...initialUserProgress, ...userProgress };

  // S'assurer que rewards est un tableau
  const rewards = progress.rewards || [];

  return (
    <div className="rewards-list grid grid-cols-1 md:grid-cols-2 gap-4">
      {rewards.map((rewardId) => {
        const reward = REWARDS[rewardId];

        // Vérification de sécurité
        if (!reward) {
          console.error(`Récompense non trouvée: ${rewardId}`);
          return null;
        }

        return (
          <div
            key={reward.id}
            className="reward-item p-4 border rounded-lg bg-yellow-50"
          >
            <h3 className="font-bold text-lg">{reward.name}</h3>
            <p className="text-gray-600">{reward.description}</p>
            <div className="mt-2">
              <p className="text-sm font-semibold">Type: {reward.type}</p>
              {reward.stats && (
                <div className="stats mt-2">
                  {Object.entries(reward.stats).map(([stat, value]) => (
                    <p key={stat} className="text-sm">
                      {stat}: +{value}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {rewards.length === 0 && (
        <div className="col-span-2 text-center p-4 bg-gray-50 rounded-lg">
          <p>Aucune récompense débloquée pour le moment.</p>
        </div>
      )}
    </div>
  );
};

export default RewardList;
