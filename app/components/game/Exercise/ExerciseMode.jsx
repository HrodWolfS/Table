"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";

const ExerciseMode = ({ quest, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(quest.objectives.timeLimit);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isExerciseComplete, setIsExerciseComplete] = useState(false);
  const [exerciseTimeSpent, setExerciseTimeSpent] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const generateQuestion = useCallback(() => {
    const table =
      quest.objectives.table ||
      quest.objectives.tables[
        Math.floor(Math.random() * quest.objectives.tables.length)
      ];
    const multiplicand = Math.floor(Math.random() * 10) + 1;

    if (quest.type === "reverse") {
      setCurrentQuestion({
        text: ` ${table} × ? = ${table * multiplicand}`,
        answer: multiplicand.toString(),
      });
    } else {
      setCurrentQuestion({
        text: `${table} × ${multiplicand} = ?`,
        answer: (table * multiplicand).toString(),
      });
    }
    setIsAnswerSubmitted(false);
    setFeedback(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [quest.objectives.table, quest.objectives.tables, quest.type]);

  const initializeExercise = useCallback(() => {
    setStartTime(Date.now());
    setCorrectAnswers(0);
    setQuestionsAnswered(0);
    setUserAnswer("");
    setFeedback(null);
    setIsExerciseComplete(false);
    setTimeLeft(quest.objectives.timeLimit);
    setExerciseTimeSpent(0);
    generateQuestion();
  }, [generateQuestion, quest.objectives.timeLimit]);

  useEffect(() => {
    initializeExercise();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [initializeExercise]);

  useEffect(() => {
    if (quest.objectives.timeLimit && !isExerciseComplete) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [quest.objectives.timeLimit, isExerciseComplete]);

  useEffect(() => {
    if (!isExerciseComplete && startTime) {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        setExerciseTimeSpent(Math.floor((currentTime - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isExerciseComplete, startTime]);

  const finishExercise = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const finalScore = Math.round(
      (correctAnswers / quest.objectives.questionsCount) * 100
    );

    console.log(
      "Score final:",
      finalScore,
      "Bonnes réponses:",
      correctAnswers,
      "Questions totales:",
      quest.objectives.questionsCount,
      "Score requis:",
      quest.difficulty.requiredScore
    );

    setIsExerciseComplete(true);

    if (finalScore < quest.difficulty.requiredScore) {
      setFeedback({
        type: "error",
        message: `Score insuffisant (${finalScore}%). Minimum requis: ${quest.difficulty.requiredScore}%. Cliquez sur "Recommencer" pour réessayer.`,
      });
      return;
    }

    onComplete(finalScore, exerciseTimeSpent, correctAnswers);
  }, [
    correctAnswers,
    quest.objectives.questionsCount,
    quest.difficulty.requiredScore,
    exerciseTimeSpent,
    onComplete,
  ]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Ne permet que les chiffres
    if (value === "" || /^\d+$/.test(value)) {
      setUserAnswer(value);
    }
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isAnswerSubmitted) return;

      const isCorrect = userAnswer === currentQuestion.answer;
      setIsAnswerSubmitted(true);

      // Mettre à jour le nombre de bonnes réponses
      let newCorrectAnswers = correctAnswers;
      if (isCorrect) {
        newCorrectAnswers = correctAnswers + 1;
        setCorrectAnswers(newCorrectAnswers);
        setFeedback({
          type: "success",
          message: "Correct !",
        });
      } else {
        setFeedback({
          type: "error",
          message: `Incorrect. La bonne réponse était ${currentQuestion.answer}`,
        });
      }

      // Ne pas incrémenter si on a déjà atteint le nombre total de questions
      if (questionsAnswered < quest.objectives.questionsCount - 1) {
        setQuestionsAnswered((prev) => prev + 1);
      }

      setTimeout(() => {
        setUserAnswer("");
        // Si c'était la dernière question, on utilise le nombre final de bonnes réponses
        if (questionsAnswered >= quest.objectives.questionsCount - 1) {
          const finalScore = Math.round(
            (newCorrectAnswers / quest.objectives.questionsCount) * 100
          );

          setIsExerciseComplete(true);

          if (finalScore < quest.difficulty.requiredScore) {
            setFeedback({
              type: "error",
              message: `Score insuffisant (${finalScore}%). Minimum requis: ${quest.difficulty.requiredScore}%.`,
            });
            return;
          }

          onComplete(finalScore, exerciseTimeSpent, newCorrectAnswers);
        } else {
          generateQuestion();
        }
      }, 1500);
    },
    [
      currentQuestion,
      userAnswer,
      isAnswerSubmitted,
      questionsAnswered,
      correctAnswers,
      quest.objectives.questionsCount,
      quest.difficulty.requiredScore,
      exerciseTimeSpent,
      generateQuestion,
      onComplete,
    ]
  );

  useEffect(() => {
    if (!isExerciseComplete && !isAnswerSubmitted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExerciseComplete, isAnswerSubmitted, currentQuestion]);

  const currentScore = Math.round(
    (correctAnswers / quest.objectives.questionsCount) * 100
  );

  return (
    <div className=" bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
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
            {currentScore}%
          </div>
          {timeLeft && (
            <div className="text-red-500">
              <span className="font-bold">Temps : </span>
              {timeLeft}s
            </div>
          )}
        </div>

        <div className="bg-white/10 rounded-lg p-8 text-center border border-white/20">
          {!isExerciseComplete ? (
            <>
              <h2 className="text-4xl font-bold text-white mb-8">
                {currentQuestion?.text}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    value={userAnswer}
                    onChange={handleInputChange}
                    className={`bg-white/10 text-white text-2xl text-center w-32 p-4 rounded-lg mb-6 focus:outline-none focus:ring-2 ${
                      feedback
                        ? feedback.type === "success"
                          ? "focus:ring-green-500"
                          : "focus:ring-red-500"
                        : "focus:ring-blue-500"
                    }`}
                    autoFocus
                    disabled={isAnswerSubmitted}
                  />
                  {feedback && (
                    <div className="absolute -right-12 top-4">
                      {feedback.type === "success" ? (
                        <CheckCircleIcon className="w-8 h-8 text-green-500" />
                      ) : (
                        <XCircleIcon className="w-8 h-8 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isAnswerSubmitted || !userAnswer}
                  className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                    isAnswerSubmitted || !userAnswer
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Valider
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div
                className={`text-xl font-semibold ${
                  feedback.type === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {feedback.message}
              </div>
              {feedback.type === "error" && (
                <button
                  onClick={initializeExercise}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 mt-2 rounded-full font-semibold transition-colors"
                >
                  Recommencer
                </button>
              )}
            </div>
          )}
          {feedback && !isExerciseComplete && (
            <div
              className={`mt-4 font-semibold ${
                feedback.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {feedback.message}
            </div>
          )}
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
