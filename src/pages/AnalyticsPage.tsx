
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Award, 
  Download, 
  Calendar,
  Brain,
  MessageSquare
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import EvaluationEngine from "@/components/EvaluationEngine";
import { toast } from "sonner";

const AnalyticsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("3months");

  // Sample data for charts
  const engagementTrend = [
    { month: "Sep", score: 78, responses: 145 },
    { month: "Oct", score: 82, responses: 162 },
    { month: "Nov", score: 79, responses: 156 },
    { month: "Dec", score: 85, responses: 171 },
    { month: "Jan", score: 88, responses: 180 }
  ];

  const departmentEngagement = [
    { department: "Engineering", score: 92, employees: 45, satisfaction: 89 },
    { department: "Marketing", score: 85, employees: 38, satisfaction: 87 },
    { department: "Sales", score: 78, employees: 42, satisfaction: 75 },
    { department: "HR", score: 90, employees: 25, satisfaction: 92 },
    { department: "Operations", score: 83, employees: 30, satisfaction: 81 }
  ];

  const surveyParticipation = [
    { name: "Completed", value: 78, color: "#10B981" },
    { name: "Partial", value: 15, color: "#F59E0B" },
    { name: "Not Started", value: 7, color: "#EF4444" }
  ];

  const sentimentAnalysis = [
    { category: "Communication", current: 75, target: 85 },
    { category: "Work-Life Balance", current: 68, target: 80 },
    { category: "Career Development", current: 72, target: 85 },
    { category: "Recognition", current: 88, target: 90 },
    { category: "Management", current: 79, target: 85 },
    { category: "Company Culture", current: 85, target: 90 }
  ];

  const weeklyTrends = [
    { week: "Week 1", engagement: 82, mood: 75, productivity: 78 },
    { week: "Week 2", engagement: 85, mood: 78, productivity: 82 },
    { week: "Week 3", engagement: 83, mood: 76, productivity: 80 },
    { week: "Week 4", engagement: 88, mood: 82, productivity: 85 }
  ];

  const handleExportReport = () => {
    toast.success("Analytics report exported successfully!");
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
            <p className="text-gray-600 mt-1">AI-powered insights and comprehensive employee engagement analysis</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">88%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <p className="text-xs text-muted-foreground">1,128 of 1,200 employees</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "94%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8.2/10</div>
              <p className="text-xs text-muted-foreground">Above industry avg (7.5)</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "82%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Raffle Participation</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">1,456</div>
              <p className="text-xs text-muted-foreground">Total entries this month</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "73%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="evaluation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="evaluation" className="flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              AI Evaluation
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Departments
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Sentiment
            </TabsTrigger>
          </TabsList>

          {/* AI Evaluation Tab */}
          <TabsContent value="evaluation">
            <EvaluationEngine />
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trend</CardTitle>
                  <CardDescription>Monthly engagement scores and response rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={engagementTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} />
                      <Line type="monotone" dataKey="responses" stroke="#06B6D4" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Survey Participation</CardTitle>
                  <CardDescription>Response completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={surveyParticipation}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {surveyParticipation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance Metrics</CardTitle>
                <CardDescription>Engagement, mood, and productivity trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="engagement" stroke="#8B5CF6" strokeWidth={2} name="Engagement" />
                    <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={2} name="Mood" />
                    <Line type="monotone" dataKey="productivity" stroke="#F59E0B" strokeWidth={2} name="Productivity" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Engagement and satisfaction by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentEngagement}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8B5CF6" name="Engagement Score" />
                    <Bar dataKey="satisfaction" fill="#06B6D4" name="Satisfaction Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentEngagement.map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.department}</CardTitle>
                    <CardDescription>{dept.employees} employees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Engagement</span>
                          <span className="text-sm text-gray-600">{dept.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${dept.score}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Satisfaction</span>
                          <span className="text-sm text-gray-600">{dept.satisfaction}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${dept.satisfaction}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sentiment Tab */}
          <TabsContent value="sentiment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis Radar</CardTitle>
                <CardDescription>Current performance vs targets across key areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={sentimentAnalysis}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="#06B6D4"
                      fill="#06B6D4"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sentimentAnalysis.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Current</span>
                        <span className="font-bold">{item.current}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${item.current}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Target: {item.target}%</span>
                        <span className={item.current >= item.target ? "text-green-600" : "text-orange-600"}>
                          {item.current >= item.target ? "✓ Met" : `${item.target - item.current}% gap`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
