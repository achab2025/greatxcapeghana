
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockIcon, UserIcon, ShieldIcon, KeyIcon } from "lucide-react";

const Login = () => {
  // User credentials state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("user");
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start animation when component mounts
    setIsAnimating(true);
  }, []);

  const handleLogin = (e: React.FormEvent, role: string) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication - in a real app, this would validate against a backend
    setTimeout(() => {
      let isAuthenticated = false;
      
      if (role === "user" && username === "user" && password === "user") {
        isAuthenticated = true;
        localStorage.setItem("userRole", "user");
      } else if (role === "admin" && username === "admin" && password === "admin") {
        isAuthenticated = true;
        localStorage.setItem("userRole", "admin");
      }
      
      if (isAuthenticated) {
        // Store authentication state
        localStorage.setItem("isAuthenticated", "true");
        
        toast({
          title: "Login successful",
          description: `Welcome to Great Xcape Ghana Ltd. management system as ${role}.`
        });
        
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: `Invalid ${role} credentials. Try ${role}/${role}`
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleTabChange = (value: string) => {
    // Reset form when changing tabs
    setUsername("");
    setPassword("");
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#303307] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#303307] to-[#45491a] opacity-80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNDU0OTFhIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMzMwIiBjeT0iNDU1IiByPSIyNDAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMTExOCIgY3k9IjI5MSIgcj0iMTcwIi8+PC9nPjwvc3ZnPg==')] bg-cover opacity-10 mix-blend-overlay animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          ></div>
        ))}
      </div>
      
      <div className={`w-full max-w-md z-10 transition-all duration-1000 transform ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Card className="shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-white animate-fade-down">Great Xcape Ghana Ltd.</CardTitle>
            <CardDescription className="text-gray-200">Hotel Management System</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-white/10">
                <TabsTrigger value="user" className="data-[state=active]:bg-[#4a5213]">
                  <UserIcon size={16} className="mr-2" />
                  User Login
                </TabsTrigger>
                <TabsTrigger value="admin" className="data-[state=active]:bg-[#4a5213]">
                  <ShieldIcon size={16} className="mr-2" />
                  Admin Login
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="user">
                <form onSubmit={(e) => handleLogin(e, "user")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-200">Username</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <UserIcon size={16} />
                      </div>
                      <Input
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-200">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <KeyIcon size={16} />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#4a5213] to-[#5e6a13] hover:from-[#5e6a13] hover:to-[#4a5213] transition-all duration-300 shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login as User"}
                  </Button>
                  
                  <div className="text-sm text-center text-gray-300 mt-4 animate-pulse">
                    <p>User credentials: user / user</p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username" className="text-gray-200">Admin Username</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <ShieldIcon size={16} />
                      </div>
                      <Input
                        id="admin-username"
                        placeholder="Admin Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-gray-200">Admin Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <LockIcon size={16} />
                      </div>
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#5e6a13] to-[#4a5213] hover:from-[#4a5213] hover:to-[#5e6a13] transition-all duration-300 shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login as Admin"}
                  </Button>
                  
                  <div className="text-sm text-center text-gray-300 mt-4 animate-pulse">
                    <p>Admin credentials: admin / admin</p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
