"use client";

import NoiseFilter from "@/app/components/ui/NoiseFilter";
import { AlertCircle, Check, Medal, Timer, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { checkBadgeUnlock, getBadges, saveBadges } from "../../../utils/badges";
import { saveTestResult } from "../../../utils/localStorage";
import BackButton from "../../ui/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import DynamicIcon from "../../ui/DynamicIcon";
import Navigation from "../../ui/Navigation";
import Header from "../home/Header";

const TestMode = () => {
  const [testState, setTestState] = useState("config");
  const [testConfig, setTestConfig] = useState({
    selectedTables: [],
    timeLimit: 60,
    numberOfQuestions: 10,
  });

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [fadeIn, setFadeIn] = useState(true);
  const [newBadgesEarned, setNewBadgesEarned] = useState(null);
  const inputRef = useRef(null);

  const endTest = () => {
    const result = {
      score: Math.round((score / questionsAnswered) * 100),
      selectedTables: testConfig.selectedTables,
      timeLimit: testConfig.timeLimit,
      timeLeft: timeLeft,
      questionsAnswered,
      numberOfQuestions: testConfig.numberOfQuestions,
    };

    saveTestResult(result);

    const existingBadges = getBadges();
    const newBadges = checkBadgeUnlock(result, existingBadges);

    if (newBadges.length > 0) {
      const updatedBadges = [...existingBadges, ...newBadges.map((b) => b.id)];
      saveBadges(updatedBadges);
    }

    setTestState("completed");

    if (newBadges.length > 0) {
      setNewBadgesEarned(newBadges);
    }
  };

  const generateQuestion = () => {
    const table =
      testConfig.selectedTables[
        Math.floor(Math.random() * testConfig.selectedTables.length)
      ];
    const multiplier = Math.floor(Math.random() * 10) + 1;
    return {
      table,
      multiplier,
      answer: table * multiplier,
    };
  };

  useEffect(() => {
    if (testState === "running") {
      setTimeLeft(testConfig.timeLimit);
      setCurrentQuestion(generateQuestion());
      setQuestionsAnswered(0);
      setScore(0);
    }
  }, [testState]);

  useEffect(() => {
    let timer;
    if (testState === "running" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testState, timeLeft]);

  const checkAnswer = (e) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setFeedback({
      type: isCorrect ? "success" : "error",
      message: isCorrect
        ? "Correct !"
        : `La réponse était ${currentQuestion.answer}`,
    });
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setFadeIn(false);

      setTimeout(() => {
        const newQuestionsAnswered = questionsAnswered + 1;
        setQuestionsAnswered(newQuestionsAnswered);
        setUserAnswer("");

        if (newQuestionsAnswered >= testConfig.numberOfQuestions) {
          endTest();
        } else {
          setCurrentQuestion(generateQuestion());
          setFadeIn(true);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      }, 300);
    }, 1000);
  };

  const renderRunningTest = () => (
    <Card className="w-full max-w-xl mx-auto bg-gradient-to-r from-yellow-100 to-pink-100">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-purple-600">
          <span>Test en cours</span>
          <span className="text-xl font-mono">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all"
              style={{
                width: `${
                  (questionsAnswered / testConfig.numberOfQuestions) * 100
                }%`,
              }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Question {questionsAnswered + 1}/{testConfig.numberOfQuestions}
            </span>
            <span>
              Score: {score}/{testConfig.numberOfQuestions}
            </span>
          </div>

          <div
            className={`text-center py-8 transition-opacity duration-300 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-4xl font-bold text-purple-600">
              {currentQuestion?.table} × {currentQuestion?.multiplier} = ?
            </p>
          </div>

          {showFeedback && (
            <div
              className={`text-center p-4 rounded-lg transition-all duration-300 ${
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
                <span className="text-lg font-semibold">
                  {feedback.message}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={checkAnswer} className="space-y-4">
            <input
              ref={inputRef}
              type="number"
              inputMode="numeric"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={`w-full p-4 text-2xl text-center text-blue-600 border-2 rounded-lg transition-all duration-300
            ${
              showFeedback
                ? feedback.type === "success"
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-200 focus:border-purple-500"
            }
            focus:outline-none`}
              placeholder="Ta réponse..."
              autoFocus
              readOnly={showFeedback}
            />
            <button
              type="submit"
              disabled={!userAnswer || showFeedback}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
            >
              Valider
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  );

  const renderTestConfig = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-200 to-green-200">
        <CardHeader>
          <CardTitle className="text-purple-600">
            Configuration du test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-purple-600">
              Tables à tester
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => {
                    setTestConfig((prev) => ({
                      ...prev,
                      selectedTables: prev.selectedTables.includes(i + 1)
                        ? prev.selectedTables.filter((t) => t !== i + 1)
                        : [...prev.selectedTables, i + 1],
                    }));
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    testConfig.selectedTables.includes(i + 1)
                      ? "border-purple-600 bg-purple-50 text-purple-600"
                      : "border-gray-700 text-gray-700 hover:border-purple-300 hover:text-purple-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-purple-600">Temps limite</h3>
            <div className="flex space-x-3">
              {[30, 60, 120].map((time) => (
                <button
                  key={time}
                  onClick={() =>
                    setTestConfig((prev) => ({ ...prev, timeLimit: time }))
                  }
                  className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                    testConfig.timeLimit === time
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <Timer size={16} className="mr-2" />
                  {time} sec
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-purple-600">
              Nombre de questions
            </h3>
            <div className="flex space-x-3">
              {[10, 20, 30].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    setTestConfig((prev) => ({
                      ...prev,
                      numberOfQuestions: num,
                    }))
                  }
                  className={`px-4 py-2 rounded-lg transition-all ${
                    testConfig.numberOfQuestions === num
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  {num} questions
                </button>
              ))}
            </div>
          </div>

          {testConfig.selectedTables.length === 0 && (
            <div className="flex items-center text-amber-600 bg-amber-50 p-3 rounded-lg">
              <AlertCircle size={20} className="mr-2" />
              Sélectionnez au moins une table pour commencer
            </div>
          )}

          <button
            onClick={() => setTestState("running")}
            disabled={testConfig.selectedTables.length === 0}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg 
                  hover:bg-green-700 transition-colors disabled:bg-gray-300"
          >
            Commencer le test
          </button>
        </CardContent>
      </Card>
    </div>
  );

  const getSteps = () => {
    const steps = [{ id: "config", label: "Configuration" }];

    if (testState === "running") {
      steps.push({ id: "running", label: "Test en cours" });
    } else if (testState === "completed") {
      steps.push({ id: "completed", label: "Résultats" });
    }

    return steps;
  };

  const renderResults = () => {
    const percentage = Math.round((score / testConfig.numberOfQuestions) * 100);
    const hasPassed = percentage >= 80;

    return (
      <Card className="w-full max-w-xl mx-auto bg-gradient-to-r from-green-200 to-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-600">
            <span>Résultats</span>
            <Medal
              size={24}
              className={hasPassed ? "text-yellow-500" : "text-gray-400"}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2 text-purple-600">
                {percentage}%
              </div>
              <p
                className={`text-lg font-medium ${
                  hasPassed ? "text-green-600" : "text-amber-600"
                }`}
              >
                {hasPassed ? "Félicitations !" : "Continue tes efforts !"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="border border-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Bonnes réponses</p>
                <p className="text-2xl font-bold text-green-600">
                  {score}/{testConfig.numberOfQuestions}
                </p>
              </div>
              <div className="border border-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Temps utilisé</p>
                <p className="text-2xl font-bold text-purple-600">
                  {testConfig.timeLimit - timeLeft}s
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-purple-600">
                Tables testées
              </h3>
              <div className="flex flex-wrap gap-2">
                {testConfig.selectedTables.map((table) => (
                  <span
                    key={table}
                    className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                  >
                    Table de {table}
                  </span>
                ))}
              </div>
            </div>
            {newBadgesEarned?.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-bold text-yellow-700 mb-2">
                  Nouveaux badges débloqués !
                </h3>
                <div className="flex gap-4">
                  {newBadgesEarned.map((badge) => (
                    <div key={badge.id} className="flex items-center">
                      <DynamicIcon
                        name={badge.icon}
                        className="text-yellow-500 mr-2"
                      />
                      <span>{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setTestState("config");
                  setUserAnswer("");
                  setScore(0);
                  setQuestionsAnswered(0);
                }}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Nouveau test
              </button>
              <button
                onClick={() => {
                  setUserAnswer("");
                  setScore(0);
                  setQuestionsAnswered(0);
                  setCurrentQuestion(generateQuestion());
                  setTimeLeft(testConfig.timeLimit);
                  setFadeIn(true);
                  setTestState("running");
                }}
                className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className=" bg-gradient-to-r from-yellow-50 via-pink-100 to-blue-100 min-h-screen h-full">
      <NoiseFilter />
      <Header />
      <div className="max-w-4xl mt-8 mx-auto h-full">
        <div className="flex justify-between items-center mb-8">
          <Navigation
            steps={getSteps()}
            currentStep={testState}
            onStepClick={setTestState}
          />
          <BackButton href="/classic" />
        </div>
        {testState === "config" && renderTestConfig()}
        {testState === "running" && renderRunningTest()}
        {testState === "completed" && renderResults()}
      </div>
    </div>
  );
};

export default React.memo(TestMode);
