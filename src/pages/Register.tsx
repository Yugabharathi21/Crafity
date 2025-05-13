
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, isAuthenticated } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && password.length >= 6) {
      const success = await register(email, password, name);
      if (success) {
        setIsRegistered(true);
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-16 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-white dark:bg-card border border-border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">Create an Account</CardTitle>
          <CardDescription className="text-muted-foreground">Join Crafity to start shopping unique handcrafted items</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input 
                id="name"
                type="text" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background text-foreground"
                required
              />
            </div>
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
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background text-foreground"
                required
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            </div>
            <Button type="submit" variant="default" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col space-y-2 text-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
