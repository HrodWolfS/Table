import { Check, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";

const TOTAL_QUESTIONS = 10; // Nombre total de questions par session
const PASSING_SCORE = 80; // Score minimum pour réussir (en pourcentage)

const ExerciseMode = ({ tableNumber }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [remainingMultipliers, setRemainingMultipliers] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  // Générer une nouvelle question

  const generateQuestion = () => {
    let updatedMultipliers = [...remainingMultipliers];

    if (updatedMultipliers.length === 0) {
      updatedMultipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    const randomIndex = Math.floor(Math.random() * updatedMultipliers.length);
    const multiplier = updatedMultipliers[randomIndex];
    updatedMultipliers = updatedMultipliers.filter((m) => m !== multiplier);

    setRemainingMultipliers(updatedMultipliers);

    return {
      multiplier,
      answer: tableNumber * multiplier,
    };
  };

  // Démarrer un nouvel exercice
  useEffect(() => {
    if (!exerciseComplete) {
      setCurrentQuestion(generateQuestion());
    }
  }, [tableNumber, exerciseComplete]);

  // Calculer le pourcentage de score actuel
  const calculateScorePercentage = () => {
    return Math.round((score / questionsCount) * 100) || 0;
  };

  // Vérifier la réponse
  const checkAnswer = (e) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    const newQuestionsCount = questionsCount + 1;
    const newScore = isCorrect ? score + 1 : score;

    setQuestionsCount(newQuestionsCount);
    setScore(newScore);

    setFeedback({
      message: isCorrect
        ? "Bravo ! C'est la bonne réponse !"
        : `Pas tout à fait... La réponse était ${currentQuestion.answer}`,
      type: isCorrect ? "success" : "error",
    });

    setShowFeedback(true);
    setUserAnswer("");

    // Vérifier si l'exercice est terminé
    if (newQuestionsCount >= TOTAL_QUESTIONS) {
      const finalScore = (newScore / newQuestionsCount) * 100;
      setTimeout(() => {
        setExerciseComplete(true);
      }, 2000);
    } else {
      // Passer à la question suivante après le feedback
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
      setTimeout(() => {
        setCurrentQuestion(generateQuestion());
      }, 1000);
    }
  };

  // Afficher le résultat final
  if (exerciseComplete) {
    const finalScore = calculateScorePercentage();
    const passed = finalScore >= PASSING_SCORE;

    return (
      <Card className="w-full max-w-xl mx-auto bg-gradient-to-r from-green-200 to-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Trophy
              size={64}
              className={
                passed ? "text-yellow-500 mx-auto" : "text-gray-400 mx-auto"
              }
            />
            <h2 className="text-2xl font-bold text-purple-600">
              {passed ? "Félicitations !" : "Continuez vos efforts !"}
            </h2>
            <p className="text-lg text-purple-600">
              Vous avez obtenu un score de {finalScore}%
            </p>
            <p className="text-gray-600">
              {passed
                ? "Vous maîtrisez bien cette table !"
                : "Encore un peu d'entraînement et vous y arriverez !"}
            </p>
            <button
              onClick={() => {
                setExerciseComplete(false);
                setQuestionsCount(0);
                setScore(0);
                setCurrentQuestion(generateQuestion());
                setShowFeedback(false);
              }}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Recommencer
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto bg-gradient-to-r from-yellow-100 to-pink-100">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-purple-600">
          <span>Exercice - Table de {tableNumber}</span>
          <span className="text-sm font-normal">
            Question {questionsCount + 1}/{TOTAL_QUESTIONS}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Barre de progression */}
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(questionsCount / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>

          {/* Score */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-purple-600">
              Score: {score}/{questionsCount}
            </span>
            <span className="text-purple-600">
              {calculateScorePercentage()}% (Objectif: {PASSING_SCORE}%)
            </span>
          </div>

          {/* Question */}
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-purple-600">
              {tableNumber} × {currentQuestion?.multiplier} = ?
            </p>
          </div>

          {/* Formulaire de réponse */}
          <form onSubmit={checkAnswer} className="space-y-4">
            <input
              type="number"
              inputMode="numeric"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-4 text-2xl text-center text-blue-600 border-2 border-gray-200 rounded-lg bg-transparent focus:border-purple-500 focus:outline-none"
              placeholder="Ta réponse..."
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              disabled={!userAnswer}
            >
              Vérifier
            </button>
          </form>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={`text-center p-4 rounded-lg ${
                feedback.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {feedback.type === "success" ? (
                  <Check size={20} />
                ) : (
                  <X size={20} />
                )}
                <span>{feedback.message}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseMode;
