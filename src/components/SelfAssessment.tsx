import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy, Target } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

const quizQuestions: Question[] = [
  // Alphabets
  { id: 1, question: "How many letters are in the ASL alphabet?", options: ["24", "25", "26", "28"], correctAnswer: 2, category: "Alphabets" },
  { id: 2, question: "Which letters in ASL use movement rather than a static hand shape?", options: ["A and B", "J and Z", "X and Y", "M and N"], correctAnswer: 1, category: "Alphabets" },
  { id: 3, question: "In ASL fingerspelling, which hand is typically used?", options: ["Left hand", "Both hands", "Dominant hand", "Either hand equally"], correctAnswer: 2, category: "Alphabets" },
  { id: 4, question: "What does the ASL sign for the letter 'A' look like?", options: ["Open palm facing out", "Fist with thumb on the side", "Pointing finger up", "Two fingers in a V shape"], correctAnswer: 1, category: "Alphabets" },
  { id: 5, question: "Which letter in ASL looks similar to a 'thumbs up' gesture?", options: ["A", "S", "T", "E"], correctAnswer: 0, category: "Alphabets" },

  // Numbers
  { id: 6, question: "How do you sign the number '0' in ASL?", options: ["Closed fist", "Open hand with all fingers spread", "Shape the hand like the letter O", "Point downward"], correctAnswer: 2, category: "Numbers" },
  { id: 7, question: "Which fingers are used to sign the number '3' in ASL?", options: ["Thumb, index, middle", "Index, middle, ring", "Middle, ring, pinky", "Thumb, ring, pinky"], correctAnswer: 0, category: "Numbers" },
  { id: 8, question: "How is the number '5' signed in ASL?", options: ["Closed fist", "Open hand with fingers spread", "Two fingers up", "Thumb and pinky extended"], correctAnswer: 1, category: "Numbers" },
  { id: 9, question: "What is the correct way to sign '7' in ASL?", options: ["Ring finger down, others up", "Middle finger down, others up", "Index finger down, others up", "Pinky down, others up"], correctAnswer: 0, category: "Numbers" },
  { id: 10, question: "How do you differentiate between numbers 1-5 and 6-9 in ASL?", options: ["Speed of signing", "Hand orientation changes", "Finger combinations change", "You use both hands"], correctAnswer: 2, category: "Numbers" },

  // Common Phrases
  { id: 11, question: "How do you sign 'Thank You' in ASL?", options: ["Wave your hand", "Touch chin and move hand forward", "Clap your hands", "Point upward"], correctAnswer: 1, category: "Common Phrases" },
  { id: 12, question: "What is the sign for 'Hello' in ASL?", options: ["Salute-like wave from forehead", "Thumbs up", "Clapping", "Nodding head"], correctAnswer: 0, category: "Common Phrases" },
  { id: 13, question: "How do you sign 'Please' in ASL?", options: ["Hands together like praying", "Flat hand circles on chest", "Wave hand side to side", "Point to yourself"], correctAnswer: 1, category: "Common Phrases" },
  { id: 14, question: "What is the sign for 'Sorry' in ASL?", options: ["Shrug shoulders", "Fist circles on chest", "Touch forehead", "Wave goodbye"], correctAnswer: 1, category: "Common Phrases" },
  { id: 15, question: "How do you ask 'How are you?' in ASL?", options: ["Point and shrug", "Both thumbs up, move outward with raised eyebrows", "Wave both hands", "Touch chest twice"], correctAnswer: 1, category: "Common Phrases" },

  // Emergency Signs
  { id: 16, question: "How do you sign 'Help' in ASL?", options: ["Wave hands above head", "Fist on open palm, lift both up", "Cross arms over chest", "Point to someone"], correctAnswer: 1, category: "Emergency" },
  { id: 17, question: "What is the sign for 'Danger' in ASL?", options: ["Fist moving upward past other fist", "Pointing down", "Hands shaking", "Covering eyes"], correctAnswer: 0, category: "Emergency" },
  { id: 18, question: "How do you sign 'Hospital' in ASL?", options: ["Draw a cross on upper arm", "Point to wrist", "Touch forehead", "Wave for attention"], correctAnswer: 0, category: "Emergency" },
  { id: 19, question: "What is the sign for 'Fire' in ASL?", options: ["Hands flat, pushing down", "Wiggling fingers moving upward", "Clapping rapidly", "Covering mouth"], correctAnswer: 1, category: "Emergency" },
  { id: 20, question: "How do you sign 'Police' in ASL?", options: ["Saluting", "C-shape hand near chest/badge area", "Pointing at wrist", "Hands behind back"], correctAnswer: 1, category: "Emergency" },
];

interface SelfAssessmentProps {
  onBack: () => void;
}

const SelfAssessment = ({ onBack }: SelfAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(Array(quizQuestions.length).fill(null));
    setShowResult(false);
    setIsAnswered(false);
  };

  const correctCount = answers.filter((a, i) => a === quizQuestions[i].correctAnswer).length;
  const percentage = Math.round((correctCount / quizQuestions.length) * 100);

  const getCategoryScore = (category: string) => {
    const catQuestions = quizQuestions.filter((q) => q.category === category);
    const catCorrect = catQuestions.filter((q, _) => {
      const idx = quizQuestions.indexOf(q);
      return answers[idx] === q.correctAnswer;
    }).length;
    return { correct: catCorrect, total: catQuestions.length, percentage: Math.round((catCorrect / catQuestions.length) * 100) };
  };

  if (showResult) {
    const grade = percentage >= 90 ? "Excellent" : percentage >= 70 ? "Good" : percentage >= 50 ? "Average" : "Needs Improvement";
    const gradeColor = percentage >= 90 ? "text-success" : percentage >= 70 ? "text-blue-400" : percentage >= 50 ? "text-yellow-400" : "text-destructive";
    const categoryNames = ["Alphabets", "Numbers", "Common Phrases", "Emergency"];

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto flex items-center gap-4 py-4 px-6">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-foreground text-lg">Assessment Results</h1>
              <p className="text-xs text-muted-foreground">See how well you know sign language</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8 space-y-8 max-w-2xl">
          {/* Overall Score */}
          <Card className="bg-card border-border text-center">
            <CardContent className="py-8 space-y-4">
              <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Trophy className={`h-10 w-10 ${gradeColor}`} />
              </div>
              <div>
                <p className={`text-4xl font-display font-bold ${gradeColor}`}>{percentage}%</p>
                <p className="text-muted-foreground text-sm mt-1">{correctCount} out of {quizQuestions.length} correct</p>
              </div>
              <Badge className={`text-sm ${gradeColor} border-current`} variant="outline">{grade}</Badge>
              <Progress value={percentage} className="h-3 mt-4" />
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <section className="space-y-4">
            <h2 className="text-lg font-display font-bold text-foreground">Category Breakdown</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryNames.map((cat) => {
                const score = getCategoryScore(cat);
                const color = score.percentage >= 80 ? "text-success" : score.percentage >= 50 ? "text-yellow-400" : "text-destructive";
                return (
                  <Card key={cat} className="bg-card border-border">
                    <CardContent className="py-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground text-sm">{cat}</p>
                        <span className={`font-display font-bold text-sm ${color}`}>{score.percentage}%</span>
                      </div>
                      <Progress value={score.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">{score.correct}/{score.total} correct</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Question Review */}
          <section className="space-y-4">
            <h2 className="text-lg font-display font-bold text-foreground">Question Review</h2>
            <div className="space-y-3">
              {quizQuestions.map((q, i) => {
                const isCorrect = answers[i] === q.correctAnswer;
                return (
                  <Card key={q.id} className={`bg-card border-border ${isCorrect ? "border-success/30" : "border-destructive/30"}`}>
                    <CardContent className="py-3">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground">{q.question}</p>
                          {!isCorrect && (
                            <p className="text-xs text-muted-foreground">
                              Your answer: <span className="text-destructive">{q.options[answers[i]!]}</span> · Correct: <span className="text-success">{q.options[q.correctAnswer]}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <div className="flex gap-4 pb-8">
            <Button onClick={handleRestart} className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
              <RotateCcw className="h-4 w-4 mr-2" /> Retake Test
            </Button>
            <Button onClick={onBack} variant="outline" className="flex-1">
              Back to Categories
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-4 px-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-display font-bold text-foreground text-lg">Self Assessment</h1>
            <p className="text-xs text-muted-foreground">Question {currentQuestion + 1} of {quizQuestions.length}</p>
          </div>
          <Badge variant="secondary" className="text-xs">{q.category}</Badge>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8 max-w-2xl">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{currentQuestion + 1}/{quizQuestions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-success" />
              </div>
              <Badge variant="outline" className="text-xs">{q.category}</Badge>
            </div>
            <CardTitle className="text-foreground text-lg">{q.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {q.options.map((option, i) => {
              let optionClass = "bg-secondary/50 border-border hover:border-success/40 cursor-pointer";
              if (isAnswered) {
                if (i === q.correctAnswer) {
                  optionClass = "bg-success/10 border-success/50";
                } else if (i === selectedAnswer && i !== q.correctAnswer) {
                  optionClass = "bg-destructive/10 border-destructive/50";
                } else {
                  optionClass = "bg-secondary/30 border-border opacity-50 cursor-default";
                }
              } else if (selectedAnswer === i) {
                optionClass = "bg-success/10 border-success/40";
              }

              return (
                <div
                  key={i}
                  onClick={() => handleSelectAnswer(i)}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${optionClass}`}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm font-display font-bold shrink-0 ${
                    isAnswered && i === q.correctAnswer
                      ? "bg-success text-success-foreground"
                      : isAnswered && i === selectedAnswer && i !== q.correctAnswer
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm text-foreground">{option}</span>
                  {isAnswered && i === q.correctAnswer && <CheckCircle className="h-5 w-5 text-success ml-auto" />}
                  {isAnswered && i === selectedAnswer && i !== q.correctAnswer && <XCircle className="h-5 w-5 text-destructive ml-auto" />}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Next button */}
        {isAnswered && (
          <Button onClick={handleNext} className="w-full bg-success hover:bg-success/90 text-success-foreground">
            {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "View Results"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SelfAssessment;
