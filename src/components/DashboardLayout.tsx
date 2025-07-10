
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Shield, 
  Sparkles,
  Award,
  FileText,
  Home
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "super-admin" | "admin" | "employee";
}

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: "Dashboard", href: `/${userRole === "super-admin" ? "super-admin" : userRole}` }
    ];

    switch (userRole) {
      case "super-admin":
        return [
          ...baseItems,
          { icon: Building2, label: "Organizations", href: "/super-admin" },
          { icon: Users, label: "Platform Users", href: "/super-admin" },
          { icon: BarChart3, label: "Analytics", href: "/super-admin" },
          { icon: Settings, label: "Settings", href: "/super-admin" }
        ];
      case "admin":
        return [
          ...baseItems,
          { icon: Users, label: "Employees", href: "/employees" },
          { icon: FileText, label: "Surveys", href: "/admin" },
          { icon: BarChart3, label: "Analytics", href: "/analytics" },
          { icon: Award, label: "Raffle", href: "/admin" },
          { icon: Settings, label: "Settings", href: "/admin" }
        ];
      case "employee":
        return [
          ...baseItems,
          { icon: FileText, label: "Surveys", href: "/employee" },
          { icon: BarChart3, label: "My Stats", href: "/employee" },
          { icon: Award, label: "Raffle Status", href: "/employee" }
        ];
      default:
        return baseItems;
    }
  };

  const getRoleInfo = () => {
    switch (userRole) {
      case "super-admin":
        return {
          title: "Super Administrator",
          org: "Platform Management",
          color: "bg-red-100 text-red-800"
        };
      case "admin":
        return {
          title: "Organization Admin", 
          org: "TechCorp Industries",
          color: "bg-blue-100 text-blue-800"
        };
      case "employee":
        return {
          title: "Employee",
          org: "TechCorp Industries",
          color: "bg-green-100 text-green-800"
        };
      default:
        return {
          title: "User",
          org: "Unknown",
          color: "bg-gray-100 text-gray-800"
        };
    }
  };

  const roleInfo = getRoleInfo();
  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PulsePoint Pro
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                {userRole === "super-admin" ? (
                  <Shield className="w-6 h-6 text-white" />
                ) : userRole === "admin" ? (
                  <Building2 className="w-6 h-6 text-white" />
                ) : (
                  <Users className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <Badge className={roleInfo.color}>
                  {roleInfo.title}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{roleInfo.org}</p>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="h-16 bg-white/80 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-4 ml-auto">
            <Badge variant="outline" className="hidden sm:block">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
