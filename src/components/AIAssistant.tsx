
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Lightbulb, Users, TrendingUp, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI Assistant. I can help you create engaging surveys, analyze employee feedback, and provide actionable insights. What would you like to work on today?",
      timestamp: new Date().toISOString()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestionQuestions = [
    {
      icon: Users,
      title: "Team Pulse Check",
      description: "Create a survey to gauge current team morale and satisfaction",
      prompt: "Create a survey to check team morale and job satisfaction"
    },
    {
      icon: TrendingUp,
      title: "Performance Feedback",
      description: "Generate questions about work performance and development",
      prompt: "Generate performance and professional development survey questions"
    },
    {
      icon: Lightbulb,
      title: "Innovation Ideas",
      description: "Survey for collecting employee suggestions and ideas",
      prompt: "Create questions to collect innovative ideas from employees"
    },
    {
      icon: MessageSquare,
      title: "Communication Survey",
      description: "Assess internal communication effectiveness",
      prompt: "Create a survey about internal communication and collaboration"
    }
  ];

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: messageToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your request, I'll create a comprehensive survey focusing on employee engagement. Here are 5 recommended questions:\n\n1. How satisfied are you with your current work-life balance?\n2. Do you feel your contributions are valued by your team?\n3. How likely are you to recommend this company as a great place to work?\n4. What resources would help you perform better in your role?\n5. How effectively does your manager support your professional growth?",
        
        "I've analyzed recent survey trends and identified key areas for improvement:\n\n• Communication gaps between departments\n• Need for better work-life balance initiatives\n• Desire for more professional development opportunities\n\nRecommended actions:\n1. Implement weekly cross-department meetings\n2. Introduce flexible working hours\n3. Create a mentorship program",
        
        "Great idea! Here's a survey designed to capture innovative thinking:\n\n1. What process could we improve to save time or resources?\n2. If you could change one thing about our workplace, what would it be?\n3. What tools or technologies could enhance your productivity?\n4. How can we better recognize outstanding performance?\n5. What new service or product should we consider offering?",
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: randomResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      toast.success("AI suggestions generated!");
    }, 2000);
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-purple-600" />
          <span>AI Survey Assistant</span>
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions for creating engaging surveys and analyzing results
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Suggestion Cards */}
        <div className="grid grid-cols-2 gap-2">
          {suggestionQuestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-3 flex flex-col items-start space-y-1 text-left"
              onClick={() => handleSuggestionClick(suggestion.prompt)}
            >
              <div className="flex items-center space-x-2">
                <suggestion.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{suggestion.title}</span>
              </div>
              <p className="text-xs text-gray-600">{suggestion.description}</p>
            </Button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 border rounded-lg p-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-white border shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.type === "user" ? "text-purple-100" : "text-gray-500"
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask AI to create surveys or analyze feedback..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
          />
          <Button 
            onClick={() => handleSendMessage()} 
            disabled={isLoading || !inputMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
