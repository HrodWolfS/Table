import Image from "next/image";
import { useState } from "react";

const StoryIntroduction = ({ onStartGame }) => {
  const [step, setStep] = useState(0);

  const storySteps = [
    {
      id: 0,
      title: "Une aventure inattendue",
      message:
        "Un déséquilibre a frappé le monde : les chiffres se mélangent et les tables de multiplication sont oubliées ! Sans elles, rien ne peut fonctionner correctement.",
      image: "/images/story/desequilibre.svg",
    },
    {
      id: 1,
      title: "Ton rôle dans cette quête",
      message:
        "Toi, jeune aventurier, as été choisi pour rétablir l'équilibre en parcourant les régions magiques du monde et en maîtrisant chaque table de multiplication.",
      image: "/images/story/aventurier.svg",
    },
    {
      id: 2,
      title: "Le pouvoir des fragments",
      message:
        "Dans chaque région, tu collecteras des fragments magiques. Ces fragments détiennent le pouvoir de stabiliser une table et de débloquer la suivante.",
      image: "/images/story/carte-magique.svg",
    },
    {
      id: 3,
      title: "Prépare-toi !",
      message:
        "Prépare-toi à explorer des lieux fascinants, résoudre des défis et débloquer de nouvelles régions. Le monde compte sur toi !",
      image: "/images/regions/foret_multiplications.svg",
    },
    {
      id: 4,
      title: "Voici un objet qui te sera utile",
      message: "Je l'ajoute à ton inventaire pour t'aider dans ta quête.",
      item: "Carte",
      image: "/images/items/carte.svg",
      description:
        "Une carte pour connaître le chemin jusqu'au château de Dividix",
    },
  ];

  const handleNext = () => {
    if (step < storySteps.length - 1) {
      setStep(step + 1);
    } else {
      onStartGame();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-100 to-amber-200 p-4">
      <div className="max-w-2xl w-full bg-white/90 rounded-lg border-2 border-amber-800/30 p-8 shadow-xl transform transition-all duration-500 ease-in-out">
        <div className="text-center space-y-6">
          {/* Titre avec décoration */}
          <h1 className="text-3xl font-bold text-amber-800 relative">
            <span className="absolute left-0 right-0 top-1/2 border-b-2 border-amber-800/30 -z-10"></span>
            <span className="bg-white/90 px-4">
              ◆ {storySteps[step].title} ◆
            </span>
          </h1>

          {/* Image de l'étape */}
          <div className="relative w-64 h-64 mx-auto my-8">
            <Image
              src={storySteps[step].image}
              alt={storySteps[step].title}
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-300"
            />
          </div>

          {/* Message avec style parchemin */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-800/20 shadow-inner">
            <p className="text-lg text-amber-900 leading-relaxed">
              {storySteps[step].message}
            </p>
          </div>

          {/* Description de l'objet si présent */}
          {storySteps[step].description && (
            <div className="text-amber-800 italic">
              {storySteps[step].description}
            </div>
          )}

          {/* Bouton stylisé */}
          <button
            onClick={handleNext}
            className="mt-8 px-8 py-3 bg-amber-800 text-white rounded-lg transform transition-all duration-200 hover:scale-105 hover:bg-amber-700 active:scale-95 shadow-lg"
          >
            {step < storySteps.length - 1 ? "Suivant" : "Commencer l'aventure"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryIntroduction;
