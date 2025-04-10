
export type QuizSubject = 
  | "Computer Science" 
  | "Electrical Engineering" 
  | "Mechanical Engineering"
  | "Civil Engineering"
  | "Physics"
  | "Mathematics"
  | "Chemistry"
  | "Biology";

export type QuestionType = "Multiple Choice" | "True/False" | "Short Answer";

export interface MultipleChoiceQuestion {
  type: "Multiple Choice";
  question: string;
  options: string[];
  correctOption: number;
}

export interface TrueFalseQuestion {
  type: "True/False";
  question: string;
  answer: boolean;
  explanation: string;
}

export interface ShortAnswerQuestion {
  type: "Short Answer";
  question: string;
  suggestedAnswer: string;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | ShortAnswerQuestion;

export interface QuizGenerationParams {
  subject: QuizSubject;
  topic: string;
  questionType: QuestionType;
  numberOfQuestions: number;
}
