import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { toast } from "sonner";
import { useState as useStateOriginal, useEffect } from "react";

// Dashboard overview component
const DashboardOverview = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        // Fetch orders from Supabase
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user_metadata?.full_name || user?.email}!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading orders...</p>
            ) : orders.length > 0 ? (
              <div className="space-y-2">
                {orders.slice(0, 3).map((order: any) => (
                  <div key={order.id} className="flex justify-between text-sm border-b pb-2">
                    <span>#{order.id.substring(0, 8)}</span>
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                    <span className="font-medium">${order.total_amount?.toFixed(2) || '0.00'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent orders</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <p><span className="font-medium">Member since:</span> {new Date(user?.created_at || '').toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              View Orders
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Update Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          isMobileSidebarOpen={isMobileSidebarOpen} 
          setMobileSidebarOpen={setMobileSidebarOpen} 
        />
        
        {/* Content */}
        <main className="flex-1">
          <div className="sticky top-0 z-20 lg:hidden">
            <div className="h-16 border-b flex items-center px-4 bg-background">
              <Button variant="ghost" size="icon" onClick={() => setMobileSidebarOpen(true)}>
                <Menu size={20} />
              </Button>
              <span className="ml-2 font-serif font-bold text-lg">Crafity Dashboard</span>
            </div>
          </div>
          
          <div className="container py-6 max-w-7xl">
            <Routes>
              <Route index element={<DashboardOverview />} />
              {/* Add more routes as you create them */}
              {/* <Route path="/profile" element={<ProfilePage />} /> */}
              {/* <Route path="/orders" element={<OrdersPage />} /> */}
              {/* <Route path="/wishlist" element={<WishlistPage />} /> */}
              {/* <Route path="/addresses" element={<AddressesPage />} /> */}
              {/* <Route path="/settings" element={<SettingsPage />} /> */}
              {/* Fallback for undefined routes */}
              <Route path="*" element={<DashboardOverview />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
