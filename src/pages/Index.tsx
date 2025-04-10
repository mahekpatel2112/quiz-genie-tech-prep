
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuizGenerationParams, Question } from "@/types/quiz";
import { generateQuizQuestions } from "@/services/quizService";
import QuizForm from "@/components/QuizForm";
import QuizResults from "@/components/QuizResults";
import { BookOpen, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuestions = async (params: QuizGenerationParams) => {
    try {
      setIsLoading(true);
      const generatedQuestions = await generateQuizQuestions(params);
      setQuestions(generatedQuestions);
      toast.success(`Successfully generated ${params.numberOfQuestions} questions!`);
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearResults = () => {
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-quiz-gray-light py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-quiz-blue rounded-full p-4">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-quiz-blue-dark mb-4">
            Quiz Question Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instantly generate multiple-choice or short-answer questions from any technical subject using AI.
          </p>
        </header>

        <div className="mb-10">
          <QuizForm onGenerate={handleGenerateQuestions} isLoading={isLoading} />
        </div>

        {questions.length > 0 && (
          <div className="mb-10 animate-fade-in">
            <QuizResults questions={questions} onClear={handleClearResults} />
          </div>
        )}

        {questions.length === 0 && !isLoading && (
          <Card className="border-dashed border-2 bg-white/50">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <Lightbulb className="h-16 w-16 text-quiz-blue mb-4" />
              <h3 className="text-xl font-medium mb-2">Ready to create your quiz?</h3>
              <p className="text-gray-500">
                Select a subject, specify a topic, and choose your question type to get started.
              </p>
            </CardContent>
          </Card>
        )}

        <footer className="text-center text-sm text-gray-500 mt-10 pb-6">
          <p>© 2025 Quiz Question Generator for Technical Subjects. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
