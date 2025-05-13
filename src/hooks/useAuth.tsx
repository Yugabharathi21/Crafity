
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  email: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("crafity-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({ 
          email: parsedUser.email,
          userId: parsedUser.userId || parsedUser.email // Use email as fallback userId
        });
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem("crafity-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate with a server
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo, any email/password combination works that matches the format
      if (!email.includes('@') || password.length < 6) {
        toast.error("Invalid credentials");
        return false;
      }
      
      const user = { email, userId: email };
      localStorage.setItem("crafity-user", JSON.stringify(user));
      setUser(user);
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      toast.error("Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validation
      if (!email.includes('@') || password.length < 6) {
        toast.error("Invalid email or password too short");
        return false;
      }
      
      // Check if user exists
      const existingUser = localStorage.getItem("crafity-user");
      if (existingUser) {
        const parsed = JSON.parse(existingUser);
        if (parsed.email === email) {
          toast.error("User with this email already exists");
          return false;
        }
      }
      
      const user = { email, userId: email };
      localStorage.setItem("crafity-user", JSON.stringify(user));
      setUser(user);
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      toast.error("Registration failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("crafity-user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
