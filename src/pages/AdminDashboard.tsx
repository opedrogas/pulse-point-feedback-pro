import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, FileText, TrendingUp, Award, Plus, Eye, Send, Bot } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import AIAssistant from "@/components/AIAssistant";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [surveys] = useState([
    {
      id: 1,
      title: "Weekly Team Pulse Check",
      type: "AI Generated",
      status: "active",
      responses: 156,
      target: 180,
      created: "2024-01-08",
      deadline: "2024-01-15"
    },
    {
      id: 2,
      title: "Work-Life Balance Survey",
      type: "AI Generated", 
      status: "completed",
      responses: 180,
      target: 180,
      created: "2024-01-01",
      deadline: "2024-01-07"
    },
    {
      id: 3,
      title: "Communication Effectiveness",
      type: "AI Generated",
      status: "draft",
      responses: 0,
      target: 180,
      created: "2024-01-08",
      deadline: "2024-01-22"
    }
  ]);

  const [raffleData] = useState({
    currentMonth: "January 2024",
    totalEntries: 892,
    topParticipants: [
      { name: "Sarah Johnson", entries: 15, department: "Engineering" },
      { name: "Mike Chen", entries: 14, department: "Marketing" },
      { name: "Emma Wilson", entries: 13, department: "HR" },
      { name: "David Rodriguez", entries: 12, department: "Sales" },
      { name: "Lisa Thompson", entries: 11, department: "Operations" }
    ],
    previousWinner: {
      name: "Alex Morgan",
      department: "Design",
      month: "December 2023",
      entries: 12
    }
  });

  const [showAIModal, setShowAIModal] = useState(false);

  const engagementData = [
    { week: "Week 1", engagement: 78, responses: 145 },
    { week: "Week 2", engagement: 82, responses: 162 },
    { week: "Week 3", engagement: 85, responses: 156 },
    { week: "Week 4", engagement: 88, responses: 171 }
  ];

  const departmentData = [
    { name: "Engineering", engagement: 92, responses: 45 },
    { name: "Marketing", engagement: 85, responses: 38 },
    { name: "Sales", engagement: 78, responses: 42 },
    { name: "HR", engagement: 90, responses: 25 },
    { name: "Operations", engagement: 83, responses: 30 }
  ];

  const handleCreateSurvey = () => {
    toast.success("AI is generating a new survey based on recent trends...");
  };

  const handleDrawRaffle = () => {
    toast.success("Monthly raffle drawn! Winner will be announced shortly.");
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800", 
      draft: "bg-yellow-100 text-yellow-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.draft}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organization Dashboard</h1>
            <p className="text-gray-600 mt-1">TechCorp Industries - 1,250 employees</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => setShowAIModal(true)} 
              variant="outline"
              className="bg-white/50 hover:bg-white/70 border-purple-200"
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button onClick={handleCreateSurvey} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Generate Survey
            </Button>
            <Link to="/employees">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Users className="w-4 h-4 mr-2" />
                Manage Employees
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">+12 new this month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Surveys</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">1 pending distribution</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">+3% from last month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Raffle Entries</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">This month's total</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
                <CardDescription>Weekly engagement scores and response rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="engagement" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="responses" stroke="#06B6D4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Engagement</CardTitle>
                <CardDescription>Engagement scores by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="engagement" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Surveys and Raffle */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Surveys */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Current Surveys</CardTitle>
                <CardDescription>AI-generated surveys and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {surveys.map((survey) => (
                    <div key={survey.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{survey.title}</h4>
                          {getStatusBadge(survey.status)}
                          <Badge variant="outline" className="text-xs">
                            {survey.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Responses: {survey.responses}/{survey.target}</span>
                          <span>Deadline: {survey.deadline}</span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                            style={{ width: `${(survey.responses / survey.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {survey.status === "draft" && (
                          <Button variant="ghost" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/analytics" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    View Detailed Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Monthly Raffle */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Raffle</CardTitle>
                <CardDescription>{raffleData.currentMonth}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{raffleData.totalEntries}</div>
                    <p className="text-sm text-gray-600">Total Entries</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Top Participants</h4>
                    <div className="space-y-2">
                      {raffleData.topParticipants.slice(0, 3).map((participant, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{participant.name}</span>
                          <Badge variant="outline">{participant.entries} entries</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Last Winner</h4>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{raffleData.previousWinner.name}</p>
                      <p>{raffleData.previousWinner.department} • {raffleData.previousWinner.month}</p>
                      <p>{raffleData.previousWinner.entries} entries</p>
                    </div>
                  </div>

                  <Button onClick={handleDrawRaffle} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    <Award className="w-4 h-4 mr-2" />
                    Draw This Month
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Assistant Modal */}
        <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-purple-600" />
                <span>AI Survey Assistant</span>
              </DialogTitle>
            </DialogHeader>
            <div className="h-[600px] overflow-hidden">
              <AIAssistant />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
