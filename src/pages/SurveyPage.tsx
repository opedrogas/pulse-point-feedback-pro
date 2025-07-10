
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Clock, Star } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SurveyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});

  const survey = {
    id: parseInt(id || "1"),
    title: "Weekly Team Pulse Check",
    description: "Help us understand how you're feeling about team collaboration and workplace dynamics",
    estimatedTime: 5,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "How would you rate your overall satisfaction with team collaboration this week?",
        options: [
          "Very satisfied",
          "Satisfied", 
          "Neutral",
          "Dissatisfied",
          "Very dissatisfied"
        ],
        required: true
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "How effectively are you able to communicate with your immediate team members?",
        options: [
          "Extremely effectively",
          "Very effectively",
          "Moderately effectively", 
          "Slightly effectively",
          "Not effectively at all"
        ],
        required: true
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "How would you rate the support you receive from your supervisor?",
        options: [
          "Excellent",
          "Good",
          "Fair",
          "Poor",
          "Very poor"
        ],
        required: true
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "How manageable is your current workload?",
        options: [
          "Very manageable",
          "Manageable",
          "Somewhat manageable",
          "Difficult to manage",
          "Overwhelming"
        ],
        required: true
      },
      {
        id: 5,
        type: "text",
        question: "What is one thing that would improve your work experience this week?",
        placeholder: "Share your thoughts...",
        required: false
      }
    ]
  };

  const currentQuestionData = survey.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / survey.questions.length) * 100;

  const handleResponseChange = (questionId: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < survey.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    toast.success("Survey submitted successfully! +1 raffle entry earned.");
    setTimeout(() => {
      navigate("/employee");
    }, 1500);
  };

  const isCurrentQuestionAnswered = () => {
    return responses[currentQuestionData.id] && responses[currentQuestionData.id].trim() !== "";
  };

  const canProceed = () => {
    if (!currentQuestionData.required) return true;
    return isCurrentQuestionAnswered();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/employee" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <Card className="backdrop-blur-sm bg-white/80 border-white/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{survey.title}</CardTitle>
                  <CardDescription className="mt-2">{survey.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{survey.estimatedTime} min</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Question {currentQuestion + 1} of {survey.questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {currentQuestionData.question}
            </CardTitle>
            {currentQuestionData.required && (
              <div className="flex items-center space-x-1 text-sm text-red-600">
                <Star className="w-3 h-3 fill-current" />
                <span>Required</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestionData.type === "multiple-choice" && (
              <RadioGroup 
                value={responses[currentQuestionData.id] || ""} 
                onValueChange={(value) => handleResponseChange(currentQuestionData.id, value)}
              >
                {currentQuestionData.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData.type === "text" && (
              <Textarea
                placeholder={currentQuestionData.placeholder}
                value={responses[currentQuestionData.id] || ""}
                onChange={(e) => handleResponseChange(currentQuestionData.id, e.target.value)}
                className="min-h-24 bg-white/50"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card className="backdrop-blur-sm bg-white/80 border-white/20">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {currentQuestion === survey.questions.length - 1 ? "Submit Survey" : "Next"}
                {currentQuestion < survey.questions.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
            
            {!canProceed() && currentQuestionData.required && (
              <p className="text-sm text-red-600 mt-2 text-center">
                Please answer this required question to continue
              </p>
            )}
          </CardContent>
        </Card>

        {/* Survey Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-white/50 rounded-lg px-4 py-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Complete this survey to earn 1 raffle entry</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
