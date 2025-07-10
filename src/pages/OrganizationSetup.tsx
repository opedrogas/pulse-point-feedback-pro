
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowLeft, Building2, Users, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const OrganizationSetup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: "",
    industry: "",
    size: "",
    description: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.organizationName || !formData.industry || !formData.size) {
        toast.error("Please fill in all organization details");
        return;
      }
    }
    
    if (step === 2) {
      if (!formData.adminName || !formData.adminEmail || !formData.adminPassword) {
        toast.error("Please fill in all admin details");
        return;
      }
      
      if (formData.adminPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    toast.success("Organization setup complete! Welcome to PulsePoint Pro.");
    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="backdrop-blur-sm bg-white/80 border-white/20">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="w-6 h-6 text-purple-600" />
                <CardTitle>Organization Details</CardTitle>
              </div>
              <CardDescription>
                Tell us about your organization to customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name *</Label>
                <Input
                  id="orgName"
                  placeholder="TechCorp Industries"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  className="bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Company Size *</Label>
                <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1,000 employees</SelectItem>
                    <SelectItem value="1000+">1,000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your organization..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-white/50"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="backdrop-blur-sm bg-white/80 border-white/20">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-6 h-6 text-purple-600" />
                <CardTitle>Admin Account</CardTitle>
              </div>
              <CardDescription>
                Create your administrator account to manage the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminName">Full Name *</Label>
                <Input
                  id="adminName"
                  placeholder="John Doe"
                  value={formData.adminName}
                  onChange={(e) => handleInputChange("adminName", e.target.value)}
                  className="bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Email Address *</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@techcorp.com"
                  value={formData.adminEmail}
                  onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                  className="bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password *</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.adminPassword}
                  onChange={(e) => handleInputChange("adminPassword", e.target.value)}
                  className="bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="bg-white/50"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="backdrop-blur-sm bg-white/80 border-white/20">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <CardTitle>Setup Complete!</CardTitle>
              </div>
              <CardDescription>
                Review your organization setup before launching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Organization Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Organization:</p>
                    <p className="font-medium">{formData.organizationName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Industry:</p>
                    <p className="font-medium">{formData.industry}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Size:</p>
                    <p className="font-medium">{formData.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Admin:</p>
                    <p className="font-medium">{formData.adminName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">What happens next?</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <p>Your organization dashboard will be created</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <p>AI will begin generating personalized surveys</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <p>You can start adding employees and setting up your first surveys</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <p>Monthly raffle system will be activated</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Organization Setup
            </h1>
          </div>
          <p className="text-gray-600">Get started with PulsePoint Pro in just a few steps</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNumber <= step 
                    ? "bg-purple-600 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    stepNumber < step ? "bg-purple-600" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              Step {step} of 3
            </span>
          </div>
        </div>

        {/* Form */}
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {step === 3 ? "Launch Organization" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSetup;
