import { Question, QuizGenerationParams } from "@/types/quiz";

// This is a mock service that would be replaced with actual API calls in a production app
export const generateQuizQuestions = async (params: QuizGenerationParams): Promise<Question[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock questions based on the params
  const questions: Question[] = [];
  
  for (let i = 0; i < params.numberOfQuestions; i++) {
    if (params.questionType === "Multiple Choice") {
      questions.push({
        type: "Multiple Choice",
        question: getMockQuestion(params.subject, params.topic, i),
        options: getMockOptions(params.subject, params.topic, i),
        correctOption: Math.floor(Math.random() * 4) // Random correct answer 0-3
      });
    } else if (params.questionType === "True/False") {
      questions.push({
        type: "True/False",
        question: getMockQuestion(params.subject, params.topic, i, true),
        answer: Math.random() > 0.5, // Random true/false
        explanation: `This is an explanation for question ${i + 1} about ${params.topic} in ${params.subject}.`
      });
    } else if (params.questionType === "Short Answer") {
      questions.push({
        type: "Short Answer",
        question: getMockQuestion(params.subject, params.topic, i),
        suggestedAnswer: `This is a suggested answer for question ${i + 1} about ${params.topic} in ${params.subject}.`
      });
    }
  }
  
  return questions;
};

// Helper functions to generate mock content
function getMockQuestion(subject: string, topic: string, index: number, isTrueFalse: boolean = false): string {
  const computerScienceQuestions = [
    "What is the time complexity of a binary search algorithm?",
    "Explain the concept of polymorphism in object-oriented programming.",
    "What is the difference between a stack and a queue data structure?",
    "How does virtual memory work in operating systems?",
    "What is the purpose of a hash table?",
    "Define the concept of recursion in programming."
  ];
  
  const physicsQuestions = [
    "What is Newton's third law of motion?",
    "Explain the concept of quantum entanglement.",
    "How does a transistor work?",
    "What is the difference between velocity and acceleration?",
    "Explain the Heisenberg Uncertainty Principle.",
    "What is the significance of Planck's constant?"
  ];
  
  const questionsMap: Record<string, string[]> = {
    "Computer Science": computerScienceQuestions,
    "Physics": physicsQuestions,
    // Add more subjects as needed
  };
  
  // If we have predefined questions for this subject, use them
  if (questionsMap[subject]?.length > 0) {
    const questionPool = questionsMap[subject];
    return questionPool[index % questionPool.length];
  }
  
  // Otherwise generate a generic question
  if (isTrueFalse) {
    return `True or False: ${topic} is a fundamental concept in ${subject} that relates to problem-solving approaches.`;
  }
  
  const questionFormats = [
    `What is the primary purpose of ${topic} in ${subject}?`,
    `How does ${topic} relate to other concepts in ${subject}?`,
    `Explain the fundamental principles of ${topic} as applied in ${subject}.`,
    `What are the key components of ${topic} in ${subject}?`,
    `What is the historical significance of ${topic} in the field of ${subject}?`,
    `How would you define ${topic} in the context of ${subject}?`
  ];
  
  return questionFormats[index % questionFormats.length];
}

function getMockOptions(subject: string, topic: string, index: number): string[] {
  if (subject === "Computer Science" && topic.toLowerCase().includes("complexity")) {
    return [
      "O(1) - Constant time",
      "O(log n) - Logarithmic time",
      "O(n) - Linear time",
      "O(n²) - Quadratic time"
    ];
  }
  
  // Generic options
  return [
    `Option 1 related to ${topic}`,
    `Option 2 related to ${topic}`,
    `Option 3 related to ${topic}`,
    `Option 4 related to ${topic}`
  ];
}
