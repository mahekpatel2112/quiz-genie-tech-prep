
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/types/quiz";
import { Copy, FileDown, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface QuizResultsProps {
  questions: Question[];
  onClear: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ questions, onClear }) => {
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

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-quiz-blue-dark">Generated Questions</h2>
        <div className="flex gap-2">
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
          <Button
            variant="outline"
            onClick={onClear}
            className="flex items-center text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={index} className="question-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                {index + 1}. {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === "Multiple Choice" && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`option-item ${
                        optionIndex === question.correctOption ? "option-correct" : ""
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
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "True/False" && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className={`option-item w-full ${question.answer ? "option-correct" : ""}`}>
                      <div className="flex items-center">
                        <span>True</span>
                        {question.answer && <CheckCircle className="ml-auto h-5 w-5 text-quiz-blue" />}
                      </div>
                    </div>
                    
                    <div className={`option-item w-full ${!question.answer ? "option-correct" : ""}`}>
                      <div className="flex items-center">
                        <span>False</span>
                        {!question.answer && <CheckCircle className="ml-auto h-5 w-5 text-quiz-blue" />}
                      </div>
                    </div>
                  </div>
                  
                  <div className="explanation-box">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                </div>
              )}

              {question.type === "Short Answer" && (
                <div className="explanation-box">
                  <strong>Suggested Answer:</strong> {question.suggestedAnswer}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizResults;
