
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuizGenerationParams, QuizSubject, QuestionType } from "@/types/quiz";
import { BookText, Lightbulb } from "lucide-react";

const subjects: QuizSubject[] = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Physics",
  "Mathematics",
  "Chemistry",
  "Biology",
];

const questionTypes: QuestionType[] = [
  "Multiple Choice",
  "True/False",
  "Short Answer",
];

const questionCounts = [5, 10, 15, 20];

interface QuizFormProps {
  onGenerate: (params: QuizGenerationParams) => void;
  isLoading: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({ onGenerate, isLoading }) => {
  const [subject, setSubject] = useState<QuizSubject | "">("");
  const [topic, setTopic] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType | "">("");
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !topic || !questionType) {
      return; // Form validation
    }
    
    onGenerate({
      subject: subject as QuizSubject,
      topic,
      questionType: questionType as QuestionType,
      numberOfQuestions,
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select
              value={subject}
              onValueChange={(value) => setSubject(value as QuizSubject)}
            >
              <SelectTrigger id="subject" className="w-full">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic/Concept</Label>
            <Textarea
              id="topic"
              placeholder="E.g., Operating Systems, Ohm's Law"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="questionType">Question Type</Label>
              <Select
                value={questionType}
                onValueChange={(value) => setQuestionType(value as QuestionType)}
              >
                <SelectTrigger id="questionType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfQuestions">Number of Questions</Label>
              <Select
                value={numberOfQuestions.toString()}
                onValueChange={(value) => setNumberOfQuestions(Number(value))}
              >
                <SelectTrigger id="numberOfQuestions">
                  <SelectValue placeholder="How many?" />
                </SelectTrigger>
                <SelectContent>
                  {questionCounts.map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-quiz-blue hover:bg-quiz-blue-dark" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              <span className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Generate Questions
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuizForm;
