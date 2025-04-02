
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { LockIcon, UserIcon } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication - in a real app, this would validate against a backend
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        // Store authentication state
        localStorage.setItem("isAuthenticated", "true");
        
        toast({
          title: "Login successful",
          description: "Welcome to Great Xcape Ghana Ltd. management system."
        });
        
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password. Try admin/admin"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#303307] animate-gradient-xy">
      <div className="absolute inset-0 bg-gradient-to-br from-[#303307] to-[#45491a] opacity-80"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNDU0OTFhIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMzMwIiBjeT0iNDU1IiByPSIyNDAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMTExOCIgY3k9IjI5MSIgcj0iMTcwIi8+PC9nPjwvc3ZnPg==')] bg-cover opacity-10 mix-blend-overlay animate-pulse"></div>
      </div>
      <div className="w-full max-w-md z-10 animate-fade-in">
        <Card className="shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-white animate-fade-down">Great Xcape Ghana Ltd.</CardTitle>
            <CardDescription className="text-gray-200">Hotel Management System</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                    <LockIcon size={16} />
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
                className="w-full bg-gradient-to-r from-[#4a5213] to-[#5e6a13] hover:from-[#5e6a13] hover:to-[#4a5213] transition-all duration-300 shadow-lg animate-pulse"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              <div className="text-sm text-center text-gray-300 mt-4 animate-pulse">
                <p>Default credentials: admin / admin</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
