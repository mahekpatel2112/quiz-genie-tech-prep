
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Question } from "@/types/quiz";
import { Copy, FileDown, Trash2, CheckCircle, XCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface QuizResultsProps {
  questions: Question[];
  onClear: () => void;
  submitted: boolean;
  score?: number;
  onSubmit: (answeredQuestions: Question[]) => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  questions, 
  onClear, 
  submitted,
  score,
  onSubmit
}) => {
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>(questions);
  
  // Update state when questions prop changes
  useEffect(() => {
    setAnsweredQuestions(questions);
  }, [questions]);

  const copyToClipboard = () => {
    const formattedText = questions
      .map((q, index) => {
        let questionText = `${index + 1}. ${q.question}\n`;
        
        if (q.type === "Multiple Choice") {
          questionText += q.options
            .map((option, i) => {
              const marker = String.fromCharCode(97 + i); // a, b, c, d
              return `  ${marker}) ${option} ${i === q.correctOption ? "(Correct)" : ""}`;
            })
            .join("\n");
        } else if (q.type === "True/False") {
          questionText += `  Answer: ${q.answer ? "True" : "False"}\n`;
          questionText += `  Explanation: ${q.explanation}`;
        } else if (q.type === "Short Answer") {
          questionText += `  Suggested Answer: ${q.suggestedAnswer}`;
        }
        
        return questionText;
      })
      .join("\n\n");
    
    navigator.clipboard.writeText(formattedText);
    toast.success("Questions copied to clipboard!");
  };

  const downloadAsPDF = () => {
    // This is a mock function for now
    toast.info("PDF download functionality would be implemented here");
    // In a real implementation, we would use a library like jsPDF
  };

  const handleMultipleChoiceSelect = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...answeredQuestions];
    const question = updatedQuestions[questionIndex] as any;
    question.userAnswer = optionIndex;
    setAnsweredQuestions(updatedQuestions);
  };

  const handleTrueFalseSelect = (questionIndex: number, value: boolean) => {
    const updatedQuestions = [...answeredQuestions];
    const question = updatedQuestions[questionIndex] as any;
    question.userAnswer = value;
    setAnsweredQuestions(updatedQuestions);
  };

  const handleShortAnswerChange = (questionIndex: number, value: string) => {
    const updatedQuestions = [...answeredQuestions];
    const question = updatedQuestions[questionIndex] as any;
    question.userAnswer = value;
    setAnsweredQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = () => {
    const unansweredCount = answeredQuestions.filter(q => 
      q.userAnswer === undefined && 
      (q.type === "Multiple Choice" || q.type === "True/False")
    ).length;

    if (unansweredCount > 0) {
      toast.warning(`You have ${unansweredCount} unanswered questions. Please complete all questions.`);
      return;
    }

    onSubmit(answeredQuestions);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-quiz-blue-dark">
          {submitted ? 'Quiz Results' : 'Quiz Questions'}
          {submitted && score !== undefined && (
            <Badge className="ml-2 bg-quiz-blue">
              Score: {score}%
            </Badge>
          )}
        </h2>
        <div className="flex gap-2">
          {submitted && (
            <>
              <Button
                variant="outline"
                onClick={copyToClipboard}
                className="flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
              <Button
                variant="outline"
                onClick={downloadAsPDF}
                className="flex items-center"
              >
                <FileDown className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </>
          )}
          <Button
            variant="outline"
            onClick={onClear}
            className="flex items-center text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {submitted ? 'Clear' : 'Cancel'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {answeredQuestions.map((question, index) => (
          <Card key={index} className="question-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                {index + 1}. {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === "Multiple Choice" && (
                <div className="space-y-2">
                  {!submitted ? (
                    <RadioGroup 
                      value={question.userAnswer?.toString()} 
                      onValueChange={(value) => handleMultipleChoiceSelect(index, parseInt(value))}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="option-item flex items-center space-x-2">
                          <RadioGroupItem 
                            value={optionIndex.toString()} 
                            id={`q${index}-option-${optionIndex}`} 
                          />
                          <Label htmlFor={`q${index}-option-${optionIndex}`} className="flex-grow cursor-pointer">
                            <span className="inline-block w-6 text-center">
                              {String.fromCharCode(97 + optionIndex)}. {/* a, b, c, d */}
                            </span>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`option-item ${
                          optionIndex === question.correctOption ? "option-correct" : ""
                        } ${
                          question.userAnswer !== undefined && 
                          question.userAnswer === optionIndex && 
                          question.userAnswer !== question.correctOption 
                            ? "bg-red-100 border-red-300" 
                            : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="inline-block w-6 text-center">
                            {String.fromCharCode(97 + optionIndex)}. {/* a, b, c, d */}
                          </span>
                          {option}
                          {optionIndex === question.correctOption && (
                            <CheckCircle className="ml-auto h-5 w-5 text-quiz-blue" />
                          )}
                          {question.userAnswer !== undefined && 
                           question.userAnswer === optionIndex && 
                           question.userAnswer !== question.correctOption && (
                            <XCircle className="ml-auto h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {question.type === "True/False" && (
                <div className="space-y-3">
                  {!submitted ? (
                    <RadioGroup 
                      value={question.userAnswer !== undefined ? question.userAnswer.toString() : undefined}
                      onValueChange={(value) => handleTrueFalseSelect(index, value === 'true')}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id={`q${index}-true`} />
                        <Label htmlFor={`q${index}-true`}>True</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id={`q${index}-false`} />
                        <Label htmlFor={`q${index}-false`}>False</Label>
                      </div>
                    </RadioGroup>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`option-item w-full ${question.answer ? "option-correct" : ""} ${
                          question.userAnswer === true && !question.answer ? "bg-red-100 border-red-300" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <span>True</span>
                          {question.answer && <CheckCircle className="ml-auto h-5 w-5 text-quiz-blue" />}
                          {question.userAnswer === true && !question.answer && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
                        </div>
                      </div>
                      
                      <div 
                        className={`option-item w-full ${!question.answer ? "option-correct" : ""} ${
                          question.userAnswer === false && question.answer ? "bg-red-100 border-red-300" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <span>False</span>
                          {!question.answer && <CheckCircle className="ml-auto h-5 w-5 text-quiz-blue" />}
                          {question.userAnswer === false && question.answer && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {submitted && (
                    <div className="explanation-box">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              )}

              {question.type === "Short Answer" && (
                <>
                  {!submitted ? (
                    <Textarea
                      placeholder="Enter your answer here..."
                      value={question.userAnswer || ''}
                      onChange={(e) => handleShortAnswerChange(index, e.target.value)}
                      className="min-h-20"
                    />
                  ) : (
                    <div>
                      {question.userAnswer && (
                        <div className="explanation-box mb-2">
                          <strong>Your Answer:</strong> {question.userAnswer}
                        </div>
                      )}
                      <div className="explanation-box">
                        <strong>Suggested Answer:</strong> {question.suggestedAnswer}
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {!submitted && (
        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleSubmitQuiz}
            className="bg-quiz-blue hover:bg-quiz-blue-dark px-6"
            size="lg"
          >
            <Send className="h-5 w-5 mr-2" />
            Submit Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizResults;
