
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, isAuthenticated } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await login(email, password);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container py-16 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-white dark:bg-card border border-border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">Login to your Crafity account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background text-foreground"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background text-foreground"
                required
              />
            </div>
            <Button type="submit" variant="default" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col space-y-2 text-center">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
