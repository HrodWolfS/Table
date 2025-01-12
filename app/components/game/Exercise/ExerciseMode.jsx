"use client";

import { useEffect, useState } from "react";

const ExerciseMode = ({ quest, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(quest.objectives.timeLimit);

  useEffect(() => {
    setStartTime(Date.now());
    generateQuestion();
    if (quest.objectives.timeLimit) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleExerciseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  const generateQuestion = () => {
    const table =
      quest.objectives.table ||
      quest.objectives.tables[
        Math.floor(Math.random() * quest.objectives.tables.length)
      ];
    const multiplicand = Math.floor(Math.random() * 10) + 1;

    if (quest.type === "reverse") {
      setCurrentQuestion({
        text: `? × ${multiplicand} = ${table * multiplicand}`,
        answer: table.toString(),
      });
    } else {
      setCurrentQuestion({
        text: `${table} × ${multiplicand} = ?`,
        answer: (table * multiplicand).toString(),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer === currentQuestion.answer) {
      setScore(score + 10);
    }

    setQuestionsAnswered(questionsAnswered + 1);
    setUserAnswer("");

    if (questionsAnswered + 1 >= quest.objectives.questionsCount) {
      handleExerciseComplete();
    } else {
      generateQuestion();
    }
  };

  const handleExerciseComplete = () => {
    const timeSpent = (Date.now() - startTime) / 1000;
    const finalScore = Math.round(
      (score / (quest.objectives.questionsCount * 10)) * 100
    );
    onComplete(finalScore, timeSpent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-full font-semibold transition-colors"
          >
            Abandonner
          </button>
          <div className="text-white">
            <span className="font-bold">Score : </span>
            {Math.round((score / (quest.objectives.questionsCount * 10)) * 100)}
            %
          </div>
          {timeLeft && (
            <div className="text-white">
              <span className="font-bold">Temps : </span>
              {timeLeft}s
            </div>
          )}
        </div>

        <div className="bg-white/10 rounded-lg p-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            {currentQuestion?.text}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="bg-white/10 text-white text-2xl text-center w-32 p-4 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Valider
            </button>
          </form>
          <div className="mt-8 text-gray-300">
            Question {questionsAnswered + 1} sur{" "}
            {quest.objectives.questionsCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseMode;
