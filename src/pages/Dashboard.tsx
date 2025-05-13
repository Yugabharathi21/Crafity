
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  ShoppingBag, 
  Heart, 
  User, 
  LogOut, 
  CheckCheck, 
  MessageCircle,
  PlusCircle,
  Trash2,
  Edit,
  Star
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { 
  useAddresses, 
  useOrders, 
  useWishlist, 
  useMessages, 
  useUserProfile, 
  getUserId 
} from "@/lib/db";
import { CraftItem } from "@/components/CraftCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    isDefault: false
  });
  
  // Use our custom database hooks
  const userId = user?.userId || "";
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddresses(userId);
  const { orders, addOrder } = useOrders(userId);
  const { wishlistItems } = useWishlist(userId);
  const { messages, markAsRead, deleteMessage, addMessage } = useMessages(userId);
  const { profile, updateProfile } = useUserProfile(userId);
  
  // Mock data for wishlist items
  const wishlistProducts: CraftItem[] = [
    {
      id: 1,
      title: "Handcrafted Ceramic Mug",
      image: "/placeholder.svg",
      price: 24.99,
      category: "Ceramics",
      rating: 4.5
    },
    {
      id: 2,
      title: "Macramé Wall Hanging",
      image: "/placeholder.svg",
      price: 49.99,
      category: "Textile",
      rating: 4.8
    },
    {
      id: 3,
      title: "Wooden Jewelry Box",
      image: "/placeholder.svg",
      price: 65.00,
      category: "Woodwork",
      rating: 4.2
    }
  ];
  
  // Map wishlist items to products
  const wishlistProductsFiltered = wishlistProducts.filter(product => 
    wishlistItems.some(item => item.productId === product.id)
  );
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstName = (form.querySelector('#firstName') as HTMLInputElement).value;
    const lastName = (form.querySelector('#lastName') as HTMLInputElement).value;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    
    // Get preferences
    const orderUpdates = (form.querySelector('#orderUpdates') as HTMLInputElement).checked;
    const promotions = (form.querySelector('#promotions') as HTMLInputElement).checked;
    const newsletter = (form.querySelector('#newsletter') as HTMLInputElement).checked;
    
    if (profile) {
      updateProfile({
        firstName,
        lastName,
        email,
        preferences: {
          orderUpdates,
          promotions,
          newsletter
        }
      });
      toast.success("Profile updated successfully");
    }
  };
  
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddress);
    setShowAddAddressForm(false);
    setNewAddress({
      type: "Home",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      isDefault: false
    });
    toast.success("New address added successfully");
  };
  
  const handleSetDefaultAddress = (id: string) => {
    updateAddress(id, { isDefault: true });
    toast.success("Default address updated");
  };
  
  const handleUpdateAddress = (id: string) => {
    toast.success(`Address updated successfully`);
    // In a real app, this would open an edit form
  };
  
  const handleDeleteAddress = (id: string) => {
    deleteAddress(id);
    toast.success("Address removed successfully");
  };
  
  const handleRemoveFromWishlist = (id: number) => {
    // This would use the removeFromWishlist function in a real app
    toast.success("Item removed from wishlist");
  };
  
  const handleAddToCart = (id: number) => {
    toast.success("Item added to cart");
  };
  
  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };
  
  const handleDeleteMessage = (id: string) => {
    deleteMessage(id);
    toast.success("Message deleted");
  };
  
  const handleNewMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.querySelector('#messageSubject') as HTMLInputElement).value;
    const content = (form.querySelector('#messageContent') as HTMLTextAreaElement).value;
    
    addMessage({
      title,
      content,
      date: new Date().toISOString().split('T')[0]
    });
    
    form.reset();
    toast.success("Message sent successfully");
  };
  
  if (!user || !profile) {
    return null; // Will redirect to login in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="flex h-10 w-10 rounded-full bg-primary/10 text-primary items-center justify-center mr-3">
                    <User size={20} />
                  </span>
                  {profile.firstName} {profile.lastName}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs 
                  defaultValue={activeTab} 
                  orientation="vertical" 
                  className="w-full"
                  onValueChange={setActiveTab}
                >
                  <TabsList className="w-full h-auto flex flex-row justify-between md:flex-col md:justify-start rounded-none border-r-0 md:border-r bg-transparent gap-2 p-2">
                    <TabsTrigger
                      value="orders"
                      className="w-full data-[state=active]:bg-muted data-[state=active]:glass-dark justify-start hover-glow"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" /> Orders
                    </TabsTrigger>
                    <TabsTrigger
                      value="addresses"
                      className="w-full data-[state=active]:bg-muted data-[state=active]:glass-dark justify-start hover-glow"
                    >
                      <CheckCheck className="mr-2 h-4 w-4" /> Addresses
                    </TabsTrigger>
                    <TabsTrigger
                      value="wishlist"
                      className="w-full data-[state=active]:bg-muted data-[state=active]:glass-dark justify-start hover-glow"
                    >
                      <Heart className="mr-2 h-4 w-4" /> Wishlist
                    </TabsTrigger>
                    <TabsTrigger
                      value="profile"
                      className="w-full data-[state=active]:bg-muted data-[state=active]:glass-dark justify-start hover-glow"
                    >
                      <User className="mr-2 h-4 w-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="messages"
                      className="w-full data-[state=active]:bg-muted data-[state=active]:glass-dark justify-start hover-glow"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" /> Messages
                    </TabsTrigger>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
              <TabsContent value="orders" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id} className="hover:glass-dark">
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>{order.items}</TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="link" onClick={() => toast.info("Order details coming soon")}>
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                        <Button variant="link" onClick={() => navigate("/shop")}>
                          Continue Shopping
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="addresses" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>My Addresses</span>
                      <Button 
                        size="sm"
                        className="glass-button"
                        onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                      >
                        {showAddAddressForm ? "Cancel" : (
                          <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Address
                          </>
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {showAddAddressForm && (
                      <Card className="mb-6 border-dashed glass-card">
                        <CardHeader>
                          <CardTitle className="text-base">Add New Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleAddAddress} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="addressType">Address Type</Label>
                              <select
                                id="addressType"
                                className="w-full p-2 rounded-md glass-input"
                                value={newAddress.type}
                                onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                                required
                              >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="street">Street Address</Label>
                              <Input
                                id="street"
                                className="glass-input"
                                value={newAddress.street}
                                onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  className="glass-input"
                                  value={newAddress.city}
                                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                  id="state"
                                  className="glass-input"
                                  value={newAddress.state}
                                  onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input
                                  id="zip"
                                  className="glass-input"
                                  value={newAddress.zip}
                                  onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                  id="country"
                                  className="glass-input"
                                  value={newAddress.country}
                                  onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                                  required
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <input 
                                type="checkbox"
                                id="isDefault"
                                checked={newAddress.isDefault}
                                onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                                className="rounded"
                              />
                              <Label htmlFor="isDefault" className="text-sm font-normal">
                                Set as default address
                              </Label>
                            </div>
                            <div className="flex justify-end">
                              <Button type="submit" className="glass-button">Add Address</Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <Card key={address.id} className={`glass-card ${address.isDefault ? "border-primary" : ""}`}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex justify-between items-center">
                              <span>
                                {address.type}
                                {address.isDefault && (
                                  <span className="ml-2 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                                    Default
                                  </span>
                                )}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p>{address.country}</p>
                            <div className="flex gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="glass-button"
                                onClick={() => handleUpdateAddress(address.id)}
                              >
                                <Edit className="mr-1 h-3 w-3" /> Edit
                              </Button>
                              {!address.isDefault && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="glass-button"
                                    onClick={() => handleSetDefaultAddress(address.id)}
                                  >
                                    Set as Default
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/20"
                                    onClick={() => handleDeleteAddress(address.id)}
                                  >
                                    <Trash2 className="mr-1 h-3 w-3" /> Remove
                                  </Button>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {addresses.length === 0 && !showAddAddressForm && (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">You don't have any saved addresses yet.</p>
                        <Button 
                          onClick={() => setShowAddAddressForm(true)}
                          className="glass-button"
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Your First Address
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wishlist" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {wishlistProductsFiltered.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlistProductsFiltered.map(item => (
                          <Card key={item.id} className="overflow-hidden glass-card hover-glow">
                            <div className="flex">
                              <div className="h-32 w-32 bg-muted flex items-center justify-center">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="h-24 w-24 object-cover"
                                />
                              </div>
                              <div className="flex-1 p-4">
                                <h3 className="text-base font-medium">{item.title}</h3>
                                <p className="text-lg font-semibold mt-1">${item.price.toFixed(2)}</p>
                                <p className="text-sm text-green-500">In stock</p>
                                <div className="flex gap-2 mt-2">
                                  <Button 
                                    size="sm"
                                    className="glass-button"
                                    onClick={() => handleAddToCart(item.id)}
                                  >
                                    Add to Cart
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">Your wishlist is empty.</p>
                        <Button variant="link" onClick={() => navigate("/shop")}>
                          Explore Products
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="profile" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            className="glass-input"
                            defaultValue={profile.firstName}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            className="glass-input"
                            defaultValue={profile.lastName}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          className="glass-input"
                          defaultValue={profile.email}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          className="glass-input"
                          placeholder="Enter your current password"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            className="glass-input"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="glass-input"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="preferences">Email Preferences</Label>
                        <div className="space-y-1 pt-1 bg-white/5 p-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="orderUpdates" 
                              className="rounded"
                              defaultChecked={profile.preferences.orderUpdates}
                            />
                            <Label htmlFor="orderUpdates" className="text-sm font-normal">Order updates</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="promotions" 
                              className="rounded"
                              defaultChecked={profile.preferences.promotions}
                            />
                            <Label htmlFor="promotions" className="text-sm font-normal">Promotions and discounts</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="newsletter" 
                              className="rounded"
                              defaultChecked={profile.preferences.newsletter}
                            />
                            <Label htmlFor="newsletter" className="text-sm font-normal">Newsletter</Label>
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit" className="glass-button">Update Profile</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>My Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messages.map(message => (
                        <Card 
                          key={message.id} 
                          className={`transition-all hover:border-primary glass-card hover-glow ${!message.read ? 'bg-primary/5 border-primary/50' : ''}`}
                          onClick={() => handleMarkAsRead(message.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-base flex items-center">
                                {message.title}
                                {!message.read && (
                                  <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
                                )}
                              </CardTitle>
                              <span className="text-xs text-muted-foreground">{message.date}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{message.content}</p>
                            <div className="flex justify-end mt-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteMessage(message.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {messages.length === 0 && (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">You don't have any messages.</p>
                        </div>
                      )}
                      
                      <div className="pt-6">
                        <h3 className="text-lg font-medium mb-4">Contact Us</h3>
                        <form onSubmit={handleNewMessage} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="messageSubject">Subject</Label>
                            <Input id="messageSubject" className="glass-input" placeholder="Enter subject" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="messageContent">Message</Label>
                            <Textarea id="messageContent" className="glass-input" placeholder="Type your message here" rows={4} required />
                          </div>
                          <Button type="submit" className="glass-button">Send Message</Button>
                        </form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
