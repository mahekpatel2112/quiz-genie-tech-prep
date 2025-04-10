
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
  // Create subject-specific question sets
  const questions: Record<string, string[]> = {
    "Computer Science": [
      `What is the time complexity of searching an element in a balanced binary search tree?`,
      `Which sorting algorithm has the best average-case time complexity?`,
      `What does the acronym SQL stand for in database systems?`,
      `Which data structure operates on a LIFO principle?`,
      `What is the primary purpose of an operating system?`,
      `Which protocol is primarily used for secure communication over the internet?`
    ],
    "Electrical Engineering": [
      `What is Ohm's Law?`,
      `Which component stores electrical charge in a circuit?`,
      `What is the unit of electrical resistance?`,
      `What does AC stand for in electrical systems?`,
      `Which semiconductor device is used for amplification?`,
      `What is the purpose of a transformer in electrical systems?`
    ],
    "Mechanical Engineering": [
      `What is the First Law of Thermodynamics about?`,
      `Which principle explains why airplanes can fly?`,
      `What does RPM stand for in mechanical systems?`,
      `Which material property indicates resistance to deformation?`,
      `What is the purpose of a heat exchanger?`,
      `What is the difference between stress and strain?`
    ],
    "Physics": [
      `What is Newton's Second Law of Motion?`,
      `What is the SI unit of force?`,
      `Which law of physics states that energy cannot be created or destroyed?`,
      `What phenomenon explains the bending of light when it passes from one medium to another?`,
      `What is the difference between speed and velocity?`,
      `What is quantum entanglement?`
    ],
    "Mathematics": [
      `What is the derivative of a constant?`,
      `What is the value of π (pi) to two decimal places?`,
      `What is the Pythagorean theorem?`,
      `What is a prime number?`,
      `What is the formula for calculating the area of a circle?`,
      `What is integration in calculus?`
    ]
  };
  
  // Generic questions for any subject not specified above
  const genericQuestions = [
    `What is the fundamental principle of ${topic} in ${subject}?`,
    `How does ${topic} relate to other concepts in ${subject}?`,
    `What is the most important application of ${topic} in ${subject}?`,
    `What are the key components of ${topic}?`,
    `Who is credited with developing the theory of ${topic}?`,
    `What problem does ${topic} solve in ${subject}?`
  ];
  
  // Get the appropriate question set
  const questionSet = questions[subject] || genericQuestions;
  
  // Use modulo to cycle through questions
  const questionIndex = index % questionSet.length;
  
  // For true/false questions, modify the format
  if (isTrueFalse) {
    // For known subjects, create realistic true/false questions
    if (subject === "Computer Science") {
      const trueFalseQuestions = [
        `Binary search has a worst-case time complexity of O(log n).`,
        `Java is a purely functional programming language.`,
        `HTTP is a stateless protocol.`,
        `The RAM in a computer loses its data when the power is turned off.`,
        `A linked list provides O(1) random access to elements.`,
        `IPv6 uses 128-bit addresses.`
      ];
      return trueFalseQuestions[index % trueFalseQuestions.length];
    } else if (subject === "Physics") {
      const trueFalseQuestions = [
        `The speed of light in a vacuum is constant.`,
        `Mass and weight are the same thing.`,
        `Sound can travel through a vacuum.`,
        `Energy can be created but not destroyed.`,
        `All objects fall at the same rate in a vacuum.`,
        `The electron has a positive charge.`
      ];
      return trueFalseQuestions[index % trueFalseQuestions.length];
    } else {
      // Generic true/false format
      return `True or False: ${topic} is considered a fundamental concept in ${subject}.`;
    }
  }
  
  return questionSet[questionIndex];
}

function getMockOptions(subject: string, topic: string, index: number): string[] {
  // Create specific option sets for known subjects and questions
  const optionSets: Record<string, Record<number, string[]>> = {
    "Computer Science": {
      0: [
        "O(1) - Constant time",
        "O(log n) - Logarithmic time",
        "O(n) - Linear time",
        "O(n²) - Quadratic time"
      ],
      1: [
        "Bubble sort - O(n²)",
        "Merge sort - O(n log n)",
        "Quick sort - O(n log n) average case",
        "Selection sort - O(n²)"
      ],
      2: [
        "Structured Query Language",
        "Standard Query Language",
        "System Query Logic",
        "Sequential Question Language"
      ],
      3: [
        "Queue",
        "Stack",
        "Linked List",
        "Binary Tree"
      ],
      4: [
        "Managing hardware resources",
        "Running applications",
        "Securing the computer",
        "All of the above"
      ],
      5: [
        "HTTP",
        "HTTPS",
        "FTP",
        "SMTP"
      ]
    },
    "Physics": {
      0: [
        "Force equals mass times acceleration",
        "Every action has an equal and opposite reaction",
        "Objects in motion tend to stay in motion",
        "Energy cannot be created or destroyed"
      ],
      1: [
        "Newton",
        "Joule",
        "Watt",
        "Pascal"
      ],
      2: [
        "Newton's First Law",
        "Law of Conservation of Energy",
        "Second Law of Thermodynamics",
        "Ohm's Law"
      ],
      3: [
        "Reflection",
        "Refraction",
        "Diffraction",
        "Dispersion"
      ],
      4: [
        "Speed is scalar, velocity is vector",
        "Speed includes direction, velocity doesn't",
        "They are the same thing",
        "Speed is slower than velocity"
      ],
      5: [
        "When two particles are connected regardless of distance",
        "When particles move at the speed of light",
        "When particles have the same mass",
        "When particles have the same charge"
      ]
    },
    "Mathematics": {
      0: [
        "Zero",
        "One",
        "Infinity",
        "The constant itself"
      ],
      1: [
        "3.14",
        "3.13",
        "3.15",
        "3.16"
      ],
      2: [
        "a² + b² = c² in a right triangle",
        "The sum of angles in a triangle is 180°",
        "The area of a triangle is ½bh",
        "Two triangles with the same angles are similar"
      ],
      3: [
        "A number divisible only by 1 and itself",
        "A number divisible by 2",
        "A number with exactly three factors",
        "A number that cannot be negative"
      ],
      4: [
        "πr²",
        "2πr",
        "πd",
        "r²π"
      ],
      5: [
        "Finding the area under a curve",
        "Finding the slope of a tangent line",
        "Finding the rate of change",
        "Finding the limit of a function"
      ]
    }
  };
  
  // Get the appropriate options set
  if (optionSets[subject] && optionSets[subject][index % 6]) {
    return optionSets[subject][index % 6];
  }
  
  // Generate generic options if no specific options are available
  const genericTopicOptions = [
    `The process of ${topic} application in real-world scenarios`,
    `The theoretical foundation of ${topic}`,
    `A practical approach to understanding ${topic}`,
    `The historical development of ${topic}`
  ];
  
  return genericTopicOptions;
}
