
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white/20 to-gray-100/20 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-100/20 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNDU0OTFhIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMzMwIiBjeT0iNDU1IiByPSIyNDAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMTExOCIgY3k9IjI5MSIgcj0iMTcwIi8+PC9nPjwvc3ZnPg==')] bg-cover opacity-10 mix-blend-overlay animate-pulse"></div>
      </div>
      
      {/* Floating particles with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-olive/20 animate-float"
            style={{
              width: `${Math.random() * 25 + 5}px`,
              height: `${Math.random() * 25 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
              filter: `blur(${Math.random() * 2}px)`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full mix-blend-overlay animate-pulse-soft" 
             style={{ animationDelay: '1s', filter: 'blur(50px)' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/5 rounded-full mix-blend-overlay animate-pulse-soft" 
             style={{ animationDelay: '2s', filter: 'blur(60px)' }}></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-olive-light/5 rounded-full mix-blend-overlay animate-pulse-soft" 
             style={{ animationDelay: '0s', filter: 'blur(40px)' }}></div>
      </div>
      
      <div className={`w-full max-w-md z-10 transition-all duration-1000 transform ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Card className="shadow-2xl backdrop-blur-md bg-white/50 border border-white/30 animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-olive-dark animate-fade-down">Great Xcape Ghana Ltd.</CardTitle>
            <CardDescription className="text-olive-dark/80">Hotel Management System</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-olive/10 backdrop-blur-sm">
                <TabsTrigger 
                  value="user" 
                  className="data-[state=active]:bg-olive data-[state=active]:text-white transition-all duration-300"
                >
                  <UserIcon size={16} className="mr-2" />
                  User Login
                </TabsTrigger>
                <TabsTrigger 
                  value="admin" 
                  className="data-[state=active]:bg-olive data-[state=active]:text-white transition-all duration-300"
                >
                  <ShieldIcon size={16} className="mr-2" />
                  Admin Login
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="user" className="animate-fade-in">
                <form onSubmit={(e) => handleLogin(e, "user")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-olive-dark font-medium">Username</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-olive-dark/60">
                        <UserIcon size={16} />
                      </div>
                      <Input
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 bg-white/50 border-olive/20 text-olive-dark placeholder:text-olive/50 focus:border-olive focus:ring-1 focus:ring-olive transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-olive-dark font-medium">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-olive-dark/60">
                        <KeyIcon size={16} />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-white/50 border-olive/20 text-olive-dark placeholder:text-olive/50 focus:border-olive focus:ring-1 focus:ring-olive transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-olive to-olive-light hover:from-olive-light hover:to-olive transition-all duration-500 shadow-lg transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : "Login as User"}
                  </Button>
                  
                  <div className="text-sm text-center text-olive-dark/70 mt-4 animate-pulse">
                    <p>User credentials: user / user</p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="admin" className="animate-fade-in">
                <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username" className="text-olive-dark font-medium">Admin Username</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-olive-dark/60">
                        <ShieldIcon size={16} />
                      </div>
                      <Input
                        id="admin-username"
                        placeholder="Admin Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 bg-white/50 border-olive/20 text-olive-dark placeholder:text-olive/50 focus:border-olive focus:ring-1 focus:ring-olive transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-olive-dark font-medium">Admin Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-olive-dark/60">
                        <LockIcon size={16} />
                      </div>
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-white/50 border-olive/20 text-olive-dark placeholder:text-olive/50 focus:border-olive focus:ring-1 focus:ring-olive transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-olive-dark to-olive hover:from-olive hover:to-olive-dark transition-all duration-500 shadow-lg transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : "Login as Admin"}
                  </Button>
                  
                  <div className="text-sm text-center text-olive-dark/70 mt-4 animate-pulse">
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
