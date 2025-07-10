
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Users, Target, Lightbulb, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("3months");
  const [selectedSurvey, setSelectedSurvey] = useState("all");

  // Sample data for analytics
  const engagementTrends = [
    { month: "Oct", overall: 78, teamWork: 82, communication: 75, workLife: 80, growth: 76 },
    { month: "Nov", overall: 82, teamWork: 85, communication: 78, workLife: 83, growth: 81 },
    { month: "Dec", overall: 85, teamWork: 88, communication: 82, workLife: 86, growth: 84 },
    { month: "Jan", overall: 88, teamWork: 90, communication: 85, workLife: 89, growth: 87 }
  ];

  const departmentEngagement = [
    { department: "Engineering", engagement: 92, responses: 45, change: "+5%" },
    { department: "Marketing", engagement: 85, responses: 38, change: "+2%" },
    { department: "Sales", engagement: 78, responses: 42, change: "-1%" },
    { department: "HR", engagement: 90, responses: 25, change: "+3%" },
    { department: "Operations", engagement: 83, responses: 30, change: "+1%" },
    { department: "Design", engagement: 88, responses: 20, change: "+4%" }
  ];

  const sentimentDistribution = [
    { name: "Very Positive", value: 35, color: "#10B981" },
    { name: "Positive", value: 40, color: "#34D399" },
    { name: "Neutral", value: 18, color: "#F59E0B" },
    { name: "Negative", value: 5, color: "#EF4444" },
    { name: "Very Negative", value: 2, color: "#DC2626" }
  ];

  const topConcerns = [
    { category: "Work-Life Balance", score: 72, trend: "down", responses: 156 },
    { category: "Career Development", score: 78, trend: "up", responses: 142 },
    { category: "Communication", score: 85, trend: "up", responses: 167 },
    { category: "Recognition", score: 75, trend: "neutral", responses: 134 },
    { category: "Workload", score: 70, trend: "down", responses: 189 }
  ];

  const aiInsights = [
    {
      id: 1,
      type: "opportunity",
      title: "Improve Work-Life Balance Support",
      description: "Engineering team shows 15% lower work-life balance scores. Consider flexible work arrangements.",
      impact: "High",
      actionable: true
    },
    {
      id: 2,
      type: "strength", 
      title: "Strong Team Collaboration",
      description: "Team collaboration scores increased 8% this quarter across all departments.",
      impact: "Medium",
      actionable: false
    },
    {
      id: 3,
      type: "alert",
      title: "Communication Gap in Sales",
      description: "Sales team reports 20% lower communication effectiveness. Manager training recommended.",
      impact: "High",
      actionable: true
    },
    {
      id: 4,
      type: "trend",
      title: "Rising Engagement Momentum",
      description: "Overall engagement shows consistent upward trend for 4 consecutive months.",
      impact: "Medium",
      actionable: false
    }
  ];

  const radarData = [
    { subject: "Communication", A: 85, fullMark: 100 },
    { subject: "Collaboration", A: 90, fullMark: 100 },
    { subject: "Work-Life Balance", A: 72, fullMark: 100 },
    { subject: "Recognition", A: 75, fullMark: 100 },
    { subject: "Growth", A: 87, fullMark: 100 },
    { subject: "Leadership", A: 82, fullMark: 100 }
  ];

  const handleExportReport = () => {
    toast.success("Analytics report exported successfully");
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Target className="w-5 h-5 text-blue-600" />;
      case "strength":
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "trend":
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-blue-200 bg-blue-50";
      case "strength":
        return "border-green-200 bg-green-50";
      case "alert":
        return "border-red-200 bg-red-50";
      case "trend":
        return "border-purple-200 bg-purple-50";
      default:
        return "border-yellow-200 bg-yellow-50";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
            <p className="text-gray-600 mt-1">AI-powered analysis of employee engagement and feedback</p>
          </div>
          <div className="flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportReport} variant="outline">
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88%</div>
              <p className="text-xs text-green-600">+3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">1,175 of 1,250 employees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.8</div>
              <p className="text-xs text-green-600">+0.3 from last quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Action Items</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">AI-generated recommendations</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engagement Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>Overall and category-specific engagement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="overall" stroke="#8B5CF6" strokeWidth={3} />
                  <Line type="monotone" dataKey="teamWork" stroke="#06B6D4" strokeWidth={2} />
                  <Line type="monotone" dataKey="communication" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="workLife" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sentiment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
              <CardDescription>Overall sentiment from recent surveys</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {sentimentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Engagement scores by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentEngagement} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="department" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Dimensions</CardTitle>
              <CardDescription>Comprehensive view of all engagement areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Engagement" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Insights */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Actionable recommendations based on survey data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div 
                    key={insight.id} 
                    className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {insight.impact} Impact
                          </Badge>
                          {insight.actionable && (
                            <Badge className="text-xs bg-purple-100 text-purple-800">
                              Actionable
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Concerns */}
          <Card>
            <CardHeader>
              <CardTitle>Key Focus Areas</CardTitle>
              <CardDescription>Areas needing attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topConcerns.map((concern, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{concern.category}</span>
                        {getTrendIcon(concern.trend)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${concern.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{concern.score}%</span>
                      </div>
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

export default AnalyticsPage;
