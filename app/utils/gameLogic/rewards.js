export const awardReward = (rewardId, userInventory) => {
  if (!userInventory.includes(rewardId)) {
    userInventory.push(rewardId);
  }
  return userInventory;
};

// Exemple d'utilisation
let userInventory = [];
userInventory = awardReward("badge1", userInventory);
console.log(userInventory);
