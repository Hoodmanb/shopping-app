"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Package,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Download,
  Trash2,
  Check,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const recentOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 299,
    items: ["Premium Wireless Headphones"],
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-16",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "•••• 4242",
  },
  {
    id: "ORD-002",
    date: "2024-01-12",
    status: "Shipped",
    total: 199,
    items: ["Smart Fitness Watch"],
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2024-01-22",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "•••• 4242",
    trackingSteps: [
      { status: "Order Placed", date: "2024-01-12", completed: true },
      { status: "Processing", date: "2024-01-13", completed: true },
      { status: "Shipped", date: "2024-01-14", completed: true },
      { status: "Out for Delivery", date: "", completed: false },
      { status: "Delivered", date: "", completed: false },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-01-10",
    status: "Processing",
    total: 89,
    items: ["Laptop Backpack Pro"],
    trackingNumber: "TRK456789123",
    estimatedDelivery: "2024-01-25",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "•••• 8888",
    trackingSteps: [
      { status: "Order Placed", date: "2024-01-10", completed: true },
      { status: "Processing", date: "2024-01-11", completed: true },
      { status: "Shipped", date: "", completed: false },
      { status: "Out for Delivery", date: "", completed: false },
      { status: "Delivered", date: "", completed: false },
    ],
  },
  {
    id: "ORD-004",
    date: "2024-01-08",
    status: "Delivered",
    total: 178,
    items: ["Wireless Charging Pad", "Phone Case"],
    trackingNumber: "TRK789123456",
    estimatedDelivery: "2024-01-10",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "•••• 4242",
  },
  {
    id: "ORD-005",
    date: "2024-01-05",
    status: "Delivered",
    total: 129,
    items: ["Bluetooth Speaker"],
    trackingNumber: "TRK321654987",
    estimatedDelivery: "2024-01-07",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "•••• 8888",
  },
]

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    bio: "Passionate about technology and great products. Love shopping at Hawk Mart!",
    dateOfBirth: "1990-01-15",
    gender: "male",
    avatar: "/placeholder.svg?height=96&width=96&text=User",
  })

  const [settings, setSettings] = useState({
    notifications: {
      emailMarketing: true,
      emailOrders: true,
      emailSecurity: true,
      pushMarketing: false,
      pushOrders: true,
      pushSecurity: true,
      smsOrders: false,
      smsMarketing: false,
    },
    privacy: {
      profileVisibility: "public",
      dataCollection: true,
      analytics: true,
      personalization: true,
      thirdPartySharing: false,
    },
    security: {
      twoFactorEnabled: false,
      loginAlerts: true,
      sessionTimeout: "30",
      trustedDevices: [
        {
          id: "1",
          name: "iPhone 15 Pro",
          lastUsed: "2024-01-20",
          location: "New York, NY",
        },
        {
          id: "2",
          name: "MacBook Pro",
          lastUsed: "2024-01-19",
          location: "New York, NY",
        },
      ],
    },
    preferences: {
      language: "en",
      currency: "USD",
      timezone: "America/New_York",
      emailFrequency: "weekly",
    },
    addresses: [
      {
        id: "1",
        type: "home",
        name: "Home Address",
        street: "123 Main Street, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
      },
      {
        id: "2",
        type: "work",
        name: "Work Address",
        street: "456 Business Ave, Suite 200",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "United States",
        isDefault: false,
      },
    ],
    paymentMethods: [
      {
        id: "1",
        type: "visa",
        last4: "4242",
        expiryMonth: "12",
        expiryYear: "2027",
        isDefault: true,
      },
      {
        id: "2",
        type: "mastercard",
        last4: "8888",
        expiryMonth: "06",
        expiryYear: "2026",
        isDefault: false,
      },
    ],
  })

  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [orderModalType, setOrderModalType] = useState<"tracking" | "details">("details")

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsEditing(false)
    setIsLoading(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")

    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    })
  }

  const enable2FA = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, twoFactorEnabled: true },
    }))
    setIsLoading(false)
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure with 2FA.",
    })
  }

  const removeDevice = (deviceId: string) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        trustedDevices: prev.security.trustedDevices.filter((device) => device.id !== deviceId),
      },
    }))
    toast({
      title: "Device removed",
      description: "The device has been removed from your trusted devices.",
    })
  }

  const updateNotification = (field: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }))
  }

  const updatePrivacy = (field: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [field]: value },
    }))
  }

  const updateSecurity = (field: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [field]: value },
    }))
  }

  const updatePreference = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value },
    }))
  }

  const setDefaultAddress = (addressId: string) => {
    setSettings((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    }))
  }

  const setDefaultPayment = (paymentId: string) => {
    setSettings((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((payment) => ({
        ...payment,
        isDefault: payment.id === paymentId,
      })),
    }))
  }

  const exportData = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    toast({
      title: "Data export started",
      description: "You'll receive an email with your data within 24 hours.",
    })
  }

  const deleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsLoading(false)
      toast({
        title: "Account deletion requested",
        description: "Your account will be deleted within 30 days. You can cancel this request by contacting support.",
        variant: "destructive",
      })
    }
  }

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order)
    setOrderModalType(order.status === "Delivered" ? "details" : "tracking")
    setShowOrderModal(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-6 mb-8"
      >
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userInfo.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-2xl">
              {userInfo.firstName[0]}
              {userInfo.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            {userInfo.firstName} {userInfo.lastName}
          </h1>
          <p className="text-muted-foreground">Member since January 2023</p>
          <Badge variant="secondary" className="mt-2">
            Premium Member
          </Badge>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger value="profile" className="flex items-center justify-center space-x-1 text-xs sm:text-sm">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center justify-center space-x-1 text-xs sm:text-sm">
              <Package className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center justify-center space-x-1 text-xs sm:text-sm"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="sm:hidden">Notify</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center justify-center space-x-1 text-xs sm:text-sm">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center justify-center space-x-1 text-xs sm:text-sm">
              <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center justify-center space-x-1 text-xs sm:text-sm">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Settings</span>
              <span className="sm:hidden">Prefs</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="firstName"
                          value={userInfo.firstName}
                          onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={userInfo.dateOfBirth}
                        onChange={(e) => setUserInfo({ ...userInfo, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={userInfo.gender}
                        onValueChange={(value) => setUserInfo({ ...userInfo, gender: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="address"
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={userInfo.bio}
                      onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-6"
                    >
                      <h4 className="font-semibold mb-4">Change Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="current-password"
                              type={showPassword ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Button
                            onClick={changePassword}
                            disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                          >
                            {isLoading ? "Changing..." : "Change Password"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleOrderClick(order)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="font-semibold">Order #{order.id}</h4>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "default"
                                  : order.status === "Shipped"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">${order.total}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {order.status === "Delivered" ? "View Details" : "Track Order"}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Order Updates</h4>
                        <p className="text-sm text-muted-foreground">Get notified about your order status</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailOrders}
                        onCheckedChange={(checked) => updateNotification("emailOrders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing & Promotions</h4>
                        <p className="text-sm text-muted-foreground">Receive deals and promotional offers</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailMarketing}
                        onCheckedChange={(checked) => updateNotification("emailMarketing", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Security Alerts</h4>
                        <p className="text-sm text-muted-foreground">Important security notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailSecurity}
                        onCheckedChange={(checked) => updateNotification("emailSecurity", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Push Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Order Updates</h4>
                        <p className="text-sm text-muted-foreground">Push notifications for order status</p>
                      </div>
                      <Switch
                        checked={settings.notifications.pushOrders}
                        onCheckedChange={(checked) => updateNotification("pushOrders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing & Promotions</h4>
                        <p className="text-sm text-muted-foreground">Push notifications for deals</p>
                      </div>
                      <Switch
                        checked={settings.notifications.pushMarketing}
                        onCheckedChange={(checked) => updateNotification("pushMarketing", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Security Alerts</h4>
                        <p className="text-sm text-muted-foreground">Critical security push notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.pushSecurity}
                        onCheckedChange={(checked) => updateNotification("pushSecurity", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>SMS Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Order Updates</h4>
                        <p className="text-sm text-muted-foreground">SMS updates for order status</p>
                      </div>
                      <Switch
                        checked={settings.notifications.smsOrders}
                        onCheckedChange={(checked) => updateNotification("smsOrders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing Messages</h4>
                        <p className="text-sm text-muted-foreground">SMS promotions and deals</p>
                      </div>
                      <Switch
                        checked={settings.notifications.smsMarketing}
                        onCheckedChange={(checked) => updateNotification("smsMarketing", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select
                        value={settings.privacy.profileVisibility}
                        onValueChange={(value) => updatePrivacy("profileVisibility", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Data Collection</h4>
                          <p className="text-sm text-muted-foreground">
                            Allow us to collect usage data to improve our services
                          </p>
                        </div>
                        <Switch
                          checked={settings.privacy.dataCollection}
                          onCheckedChange={(checked) => updatePrivacy("dataCollection", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Analytics</h4>
                          <p className="text-sm text-muted-foreground">Help us understand how you use our platform</p>
                        </div>
                        <Switch
                          checked={settings.privacy.analytics}
                          onCheckedChange={(checked) => updatePrivacy("analytics", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Personalization</h4>
                          <p className="text-sm text-muted-foreground">Use your data to personalize your experience</p>
                        </div>
                        <Switch
                          checked={settings.privacy.personalization}
                          onCheckedChange={(checked) => updatePrivacy("personalization", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Third-party Sharing</h4>
                          <p className="text-sm text-muted-foreground">Share anonymized data with trusted partners</p>
                        </div>
                        <Switch
                          checked={settings.privacy.thirdPartySharing}
                          onCheckedChange={(checked) => updatePrivacy("thirdPartySharing", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Export Your Data</h4>
                        <p className="text-sm text-muted-foreground">Download a copy of your account data</p>
                      </div>
                      <Button variant="outline" onClick={exportData} disabled={isLoading}>
                        <Download className="mr-2 h-4 w-4" />
                        {isLoading ? "Exporting..." : "Export Data"}
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-destructive">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" onClick={deleteAccount} disabled={isLoading}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">2FA Status</h4>
                        <p className="text-sm text-muted-foreground">
                          {settings.security.twoFactorEnabled
                            ? "Two-factor authentication is enabled"
                            : "Add an extra layer of security to your account"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {settings.security.twoFactorEnabled ? (
                          <Badge variant="default" className="bg-green-500">
                            <Check className="mr-1 h-3 w-3" />
                            Enabled
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <X className="mr-1 h-3 w-3" />
                            Disabled
                          </Badge>
                        )}
                      </div>
                    </div>
                    {!settings.security.twoFactorEnabled && (
                      <Button onClick={enable2FA} disabled={isLoading}>
                        <Key className="mr-2 h-4 w-4" />
                        {isLoading ? "Enabling..." : "Enable 2FA"}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Login Alerts</h4>
                        <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                      </div>
                      <Switch
                        checked={settings.security.loginAlerts}
                        onCheckedChange={(checked) => updateSecurity("loginAlerts", checked)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Session Timeout</Label>
                      <Select
                        value={settings.security.sessionTimeout}
                        onValueChange={(value) => updateSecurity("sessionTimeout", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="240">4 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trusted Devices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings.security.trustedDevices.map((device) => (
                        <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">{device.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Last used: {device.lastUsed} • {device.location}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => removeDevice(device.id)}>
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select
                          value={settings.preferences.language}
                          onValueChange={(value) => updatePreference("language", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="it">Italiano</SelectItem>
                            <SelectItem value="pt">Português</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <Select
                          value={settings.preferences.currency}
                          onValueChange={(value) => updatePreference("currency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="JPY">JPY (¥)</SelectItem>
                            <SelectItem value="CAD">CAD (C$)</SelectItem>
                            <SelectItem value="AUD">AUD (A$)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select
                          value={settings.preferences.timezone}
                          onValueChange={(value) => updatePreference("timezone", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                            <SelectItem value="Europe/London">GMT</SelectItem>
                            <SelectItem value="Europe/Paris">CET</SelectItem>
                            <SelectItem value="Asia/Tokyo">JST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Email Frequency</Label>
                        <Select
                          value={settings.preferences.emailFrequency}
                          onValueChange={(value) => updatePreference("emailFrequency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Theme</h4>
                        <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Addresses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings.addresses.map((address) => (
                        <div key={address.id} className="flex items-start justify-between p-4 border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <h4 className="font-medium">
                                {address.name}
                                {address.isDefault && (
                                  <Badge variant="secondary" className="ml-2">
                                    Default
                                  </Badge>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {address.street}
                                <br />
                                {address.city}, {address.state} {address.zipCode}
                                <br />
                                {address.country}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!address.isDefault && (
                              <Button variant="outline" size="sm" onClick={() => setDefaultAddress(address.id)}>
                                Set Default
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full bg-transparent">
                        <MapPin className="mr-2 h-4 w-4" />
                        Add Address
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings.paymentMethods.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">
                                {payment.type.toUpperCase()} •••• {payment.last4}
                                {payment.isDefault && (
                                  <Badge variant="secondary" className="ml-2">
                                    Default
                                  </Badge>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Expires {payment.expiryMonth}/{payment.expiryYear}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!payment.isDefault && (
                              <Button variant="outline" size="sm" onClick={() => setDefaultPayment(payment.id)}>
                                Set Default
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full bg-transparent">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Order Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {orderModalType === "tracking" ? "Track Order" : "Order Details"} #{selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-medium">${selectedOrder.total}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedOrder.status === "Delivered"
                        ? "default"
                        : selectedOrder.status === "Shipped"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tracking Number</p>
                  <p className="font-medium">{selectedOrder.trackingNumber}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-3">Items Ordered</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{item}</span>
                      <span className="text-sm text-muted-foreground">Qty: 1</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Steps (for non-delivered orders) */}
              {orderModalType === "tracking" && selectedOrder.trackingSteps && (
                <div>
                  <h4 className="font-semibold mb-4">Order Progress</h4>
                  <div className="space-y-4">
                    {selectedOrder.trackingSteps.map((step: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            step.completed ? "bg-primary border-primary" : "border-muted-foreground"
                          }`}
                        >
                          {step.completed && <Check className="w-2 h-2 text-primary-foreground m-0.5" />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.status}
                          </p>
                          {step.date && <p className="text-sm text-muted-foreground">{step.date}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}
                    </p>
                  </div>
                </div>
              )}

              {/* Order Details (for delivered orders) */}
              {orderModalType === "details" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p className="text-muted-foreground">{selectedOrder.shippingAddress}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Payment Method</h4>
                    <p className="text-muted-foreground">Card ending in {selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Information</h4>
                    <p className="text-muted-foreground">Delivered on {selectedOrder.estimatedDelivery}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                {orderModalType === "tracking" ? (
                  <>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Cancel Order
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Reorder Items
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Download Invoice
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
