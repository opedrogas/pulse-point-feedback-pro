
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Award, TrendingUp, Clock, CheckCircle, Play } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const EmployeeDashboard = () => {
  const [availableSurveys] = useState([
    {
      id: 1,
      title: "Weekly Team Pulse Check",
      description: "Quick 5-minute survey about team dynamics and collaboration",
      estimatedTime: 5,
      questions: 5,
      deadline: "2024-01-15",
      priority: "high"
    },
    {
      id: 2,
      title: "Communication Effectiveness",
      description: "Evaluate communication channels and feedback processes",
      estimatedTime: 8,
      questions: 7,
      deadline: "2024-01-22",
      priority: "medium"
    },
    {
      id: 3,
      title: "Workplace Wellness Check",
      description: "Share feedback about work-life balance and wellness programs",
      estimatedTime: 6,
      questions: 6,
      deadline: "2024-01-18",
      priority: "low"
    }
  ]);

  const [personalStats] = useState({
    surveysCompleted: 12,
    raffleEntries: 12,
    engagementScore: 85,
    streak: 4,
    rank: 23,
    totalEmployees: 1250
  });

  const [raffleInfo] = useState({
    currentMonth: "January 2024",
    myEntries: 12,
    totalEntries: 892,
    rank: 23,
    previousWin: null,
    nextDraw: "2024-01-31"
  });

  const engagementHistory = [
    { month: "Sep", score: 78 },
    { month: "Oct", score: 82 },
    { month: "Nov", score: 79 },
    { month: "Dec", score: 85 },
    { month: "Jan", score: 85 }
  ];

  const categoryBreakdown = [
    { name: "Team Collaboration", value: 90, color: "#8B5CF6" },
    { name: "Work-Life Balance", value: 85, color: "#06B6D4" },
    { name: "Communication", value: 80, color: "#10B981" },
    { name: "Growth & Development", value: 88, color: "#F59E0B" }
  ];

  const handleStartSurvey = (surveyId: number) => {
    toast.success("Starting survey...");
    // Navigate to survey page
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    
    return (
      <Badge className={variants[priority as keyof typeof variants] || variants.low}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </Badge>
    );
  };

  return (
    <DashboardLayout userRole="employee">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, John! You have {availableSurveys.length} surveys waiting.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{personalStats.raffleEntries}</div>
            <p className="text-sm text-gray-600">Raffle Entries</p>
          </div>
        </div>

        {/* Personal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Surveys Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{personalStats.surveysCompleted}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{personalStats.engagementScore}%</div>
              <p className="text-xs text-muted-foreground">Above average</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{personalStats.streak}</div>
              <p className="text-xs text-muted-foreground">Weeks in a row</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{personalStats.rank}</div>
              <p className="text-xs text-muted-foreground">of {personalStats.totalEmployees}</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Surveys and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Surveys */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Available Surveys</CardTitle>
              <CardDescription>Complete surveys to earn raffle entries and improve engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableSurveys.map((survey) => (
                  <div key={survey.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{survey.title}</h4>
                          {getPriorityBadge(survey.priority)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{survey.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {survey.estimatedTime} min
                          </span>
                          <span>{survey.questions} questions</span>
                          <span>Due: {survey.deadline}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Link to={`/survey/${survey.id}`}>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            onClick={() => handleStartSurvey(survey.id)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {availableSurveys.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys available</h3>
                  <p className="text-gray-600">Check back later for new AI-generated surveys</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Raffle Status */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Raffle</CardTitle>
              <CardDescription>{raffleInfo.currentMonth}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{raffleInfo.myEntries}</div>
                  <p className="text-sm text-gray-600">My Entries</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Your Position</span>
                    <span>#{raffleInfo.rank}</span>
                  </div>
                  <Progress value={(raffleInfo.myEntries / 20) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {raffleInfo.myEntries} of 20 max entries
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Entries:</span>
                    <span className="font-medium">{raffleInfo.totalEntries.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Draw:</span>
                    <span className="font-medium">{raffleInfo.nextDraw}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Odds:</span>
                    <span className="font-medium text-purple-600">
                      1 in {Math.round(raffleInfo.totalEntries / raffleInfo.myEntries)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-600 text-center">
                    Complete more surveys to increase your chances!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement History</CardTitle>
              <CardDescription>Your engagement score over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={engagementHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Breakdown</CardTitle>
              <CardDescription>Your scores by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-gray-600">{category.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${category.value}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
