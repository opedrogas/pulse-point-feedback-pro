
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Brain, Target, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface SurveyResult {
  id: number;
  question: string;
  responses: number;
  avgScore: number;
  trend: "up" | "down" | "stable";
  category: "engagement" | "satisfaction" | "communication" | "worklife" | "development";
}

interface Insight {
  id: number;
  type: "positive" | "warning" | "critical";
  category: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  actionItems: string[];
}

const EvaluationEngine = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [surveyResults] = useState<SurveyResult[]>([
    {
      id: 1,
      question: "How satisfied are you with your current work-life balance?",
      responses: 156,
      avgScore: 7.2,
      trend: "down",
      category: "worklife"
    },
    {
      id: 2,
      question: "Do you feel your contributions are valued by your team?",
      responses: 156,
      avgScore: 8.1,
      trend: "up",
      category: "engagement"
    },
    {
      id: 3,
      question: "How effective is communication within your department?",
      responses: 156,
      avgScore: 6.8,
      trend: "stable",
      category: "communication"
    },
    {
      id: 4,
      question: "Are you satisfied with your professional development opportunities?",
      responses: 156,
      avgScore: 6.5,
      trend: "down",
      category: "development"
    },
    {
      id: 5,
      question: "How likely are you to recommend this company as a great place to work?",
      responses: 156,
      avgScore: 7.8,
      trend: "up",
      category: "satisfaction"
    }
  ]);

  const generateInsights = () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const newInsights: Insight[] = [
        {
          id: 1,
          type: "critical",
          category: "Work-Life Balance",
          title: "Declining Work-Life Balance Satisfaction",
          description: "Employee satisfaction with work-life balance has dropped to 7.2/10, showing a concerning downward trend. This affects 156 employees and could impact retention.",
          impact: "high",
          actionItems: [
            "Implement flexible working hours policy",
            "Introduce mandatory break times",
            "Review workload distribution across teams",
            "Consider remote work options"
          ]
        },
        {
          id: 2,
          type: "positive",
          category: "Employee Engagement",
          title: "Strong Recognition Culture",
          description: "Employees feel highly valued with a score of 8.1/10 and positive trend. This indicates effective recognition programs and team appreciation.",
          impact: "high",
          actionItems: [
            "Continue current recognition programs",
            "Share best practices with other departments",
            "Consider expanding peer-to-peer recognition",
            "Document successful recognition strategies"
          ]
        },
        {
          id: 3,
          type: "warning",
          category: "Communication",
          title: "Moderate Communication Gaps",
          description: "Interdepartmental communication scored 6.8/10. While not critical, there's room for improvement to enhance collaboration.",
          impact: "medium",
          actionItems: [
            "Schedule weekly cross-department meetings",
            "Implement collaborative tools (Slack, Teams)",
            "Create communication guidelines",
            "Establish feedback loops between departments"
          ]
        },
        {
          id: 4,
          type: "warning",
          category: "Professional Development",
          title: "Limited Development Opportunities",
          description: "Professional development satisfaction is at 6.5/10 with a declining trend. This could affect long-term employee retention and growth.",
          impact: "medium",
          actionItems: [
            "Create individual development plans",
            "Increase training budget allocation",
            "Establish mentorship programs",
            "Offer conference and workshop attendance"
          ]
        }
      ];

      setInsights(newInsights);
      setIsAnalyzing(false);
      toast.success("AI analysis completed! Generated actionable insights.");
    }, 3000);
  };

  useEffect(() => {
    // Auto-generate insights on component mount
    generateInsights();
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "border-l-green-500 bg-green-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      case "critical":
        return "border-l-red-500 bg-red-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const getImpactBadge = (impact: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    
    return (
      <Badge className={variants[impact as keyof typeof variants]}>
        {impact.toUpperCase()} IMPACT
      </Badge>
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Evaluation Engine</h2>
          <p className="text-gray-600">Automated analysis of survey responses with actionable insights</p>
        </div>
        <Button 
          onClick={generateInsights} 
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Brain className="w-4 h-4 mr-2" />
          {isAnalyzing ? "Analyzing..." : "Re-analyze"}
        </Button>
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-medium mb-2">AI is analyzing survey responses...</h3>
            <p className="text-gray-600">Evaluating trends, identifying patterns, and generating actionable insights</p>
          </CardContent>
        </Card>
      )}

      {/* Survey Results Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Results Overview</CardTitle>
          <CardDescription>Latest survey responses and trending data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surveyResults.map((result) => (
              <div key={result.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{result.avgScore}/10</div>
                  {getTrendIcon(result.trend)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{result.question}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{result.responses} responses</span>
                  <Badge variant="outline">{result.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Generated Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Generated Insights</CardTitle>
          <CardDescription>Automated analysis with recommended actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className={`border-l-4 p-6 rounded-r-lg ${getInsightColor(insight.type)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getInsightIcon(insight.type)}
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-gray-600">{insight.category}</p>
                    </div>
                  </div>
                  {getImpactBadge(insight.impact)}
                </div>
                
                <p className="text-gray-700 mb-4">{insight.description}</p>
                
                <div>
                  <h5 className="font-medium mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Recommended Actions:
                  </h5>
                  <ul className="space-y-1">
                    {insight.actionItems.map((action, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-2 flex-shrink-0"></div>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {insights.filter(i => i.type === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive Trends</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {insights.filter(i => i.type === "positive").length}
            </div>
            <p className="text-xs text-muted-foreground">Areas performing well</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Items</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {insights.reduce((acc, insight) => acc + insight.actionItems.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total recommendations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvaluationEngine;
