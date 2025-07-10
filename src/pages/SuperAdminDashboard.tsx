
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, TrendingUp, Plus, Settings, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const SuperAdminDashboard = () => {
  const [organizations, setOrganizations] = useState([
    {
      id: 1,
      name: "TechCorp Industries",
      employees: 1250,
      status: "active",
      plan: "Enterprise",
      engagement: 85,
      surveys: 45
    },
    {
      id: 2,
      name: "Healthcare Plus",
      employees: 890,
      status: "active",
      plan: "Professional",
      engagement: 78,
      surveys: 32
    },
    {
      id: 3,
      name: "EduTech Solutions",
      employees: 456,
      status: "active",
      plan: "Standard",
      engagement: 92,
      surveys: 28
    },
    {
      id: 4,
      name: "GreenEnergy Co",
      employees: 234,
      status: "trial",
      plan: "Trial",
      engagement: 67,
      surveys: 12
    }
  ]);

  const [isAddOrgDialogOpen, setIsAddOrgDialogOpen] = useState(false);
  const [newOrganization, setNewOrganization] = useState({
    name: "",
    adminName: "",
    adminEmail: "",
    plan: "",
    employees: ""
  });

  const platformStats = [
    { name: "Jan", organizations: 12, users: 2340 },
    { name: "Feb", organizations: 15, users: 2890 },
    { name: "Mar", organizations: 18, users: 3200 },
    { name: "Apr", organizations: 22, users: 3800 },
    { name: "May", organizations: 28, users: 4500 },
    { name: "Jun", organizations: 32, users: 5200 }
  ];

  const planDistribution = [
    { name: "Enterprise", value: 35, color: "#8B5CF6" },
    { name: "Professional", value: 40, color: "#06B6D4" },
    { name: "Standard", value: 20, color: "#10B981" },
    { name: "Trial", value: 5, color: "#F59E0B" }
  ];

  const plans = ["Trial", "Standard", "Professional", "Enterprise"];

  const handleAddOrganization = () => {
    if (!newOrganization.name || !newOrganization.adminName || !newOrganization.adminEmail || !newOrganization.plan) {
      toast.error("Please fill in all required fields");
      return;
    }

    const organization = {
      id: organizations.length + 1,
      name: newOrganization.name,
      employees: parseInt(newOrganization.employees) || 0,
      status: "active",
      plan: newOrganization.plan,
      engagement: 75,
      surveys: 0
    };

    setOrganizations(prev => [...prev, organization]);
    setNewOrganization({ name: "", adminName: "", adminEmail: "", plan: "", employees: "" });
    setIsAddOrgDialogOpen(false);
    toast.success(`Organization "${organization.name}" created successfully!`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      trial: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.active}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <DashboardLayout userRole="super-admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Platform-wide overview and management</p>
          </div>
          <Dialog open={isAddOrgDialogOpen} onOpenChange={setIsAddOrgDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Organization</DialogTitle>
                <DialogDescription>
                  Create a new organization and set up their admin account
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name *</Label>
                  <Input
                    id="orgName"
                    value={newOrganization.name}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Acme Corporation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminName">Admin Full Name *</Label>
                  <Input
                    id="adminName"
                    value={newOrganization.adminName}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, adminName: e.target.value }))}
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email *</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={newOrganization.adminEmail}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, adminEmail: e.target.value }))}
                    placeholder="admin@acme.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Subscription Plan *</Label>
                  <Select value={newOrganization.plan} onValueChange={(value) => setNewOrganization(prev => ({ ...prev, plan: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map(plan => (
                        <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Expected Employee Count</Label>
                  <Input
                    id="employees"
                    type="number"
                    value={newOrganization.employees}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, employees: e.target.value }))}
                    placeholder="100"
                  />
                </div>
                <Button onClick={handleAddOrganization} className="w-full">
                  Create Organization
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organizations.length}</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {organizations.reduce((acc, org) => acc + org.employees, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(organizations.reduce((acc, org) => acc + org.engagement, 0) / organizations.length)}%
              </div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trials</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {organizations.filter(org => org.status === "trial").length}
              </div>
              <p className="text-xs text-muted-foreground">2 converting this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Organizations and users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="organizations" fill="#8B5CF6" name="Organizations" />
                  <Bar dataKey="users" fill="#06B6D4" name="Users" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Distribution</CardTitle>
              <CardDescription>Organizations by subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Organizations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Organizations ({organizations.length})</CardTitle>
            <CardDescription>Manage all organizations on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Organization</th>
                    <th className="text-left p-2">Employees</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Plan</th>
                    <th className="text-left p-2">Engagement</th>
                    <th className="text-left p-2">Surveys</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((org) => (
                    <tr key={org.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{org.name}</td>
                      <td className="p-2">{org.employees.toLocaleString()}</td>
                      <td className="p-2">{getStatusBadge(org.status)}</td>
                      <td className="p-2">
                        <Badge variant="outline">{org.plan}</Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                              style={{ width: `${org.engagement}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{org.engagement}%</span>
                        </div>
                      </td>
                      <td className="p-2">{org.surveys}</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
