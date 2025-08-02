"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Search,
  Edit,
  Trash2,
  Plus,
  UserX,
  UserCheck,
  Ban,
  Eye,
  X,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

const overviewStats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Total Orders",
    value: "8,392",
    change: "+8.2%",
    icon: ShoppingBag,
    color: "text-green-600",
  },
  {
    title: "Revenue",
    value: "$284,592",
    change: "+15.3%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Growth Rate",
    value: "23.1%",
    change: "+2.4%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const categoryData = [
  { name: "Electronics", value: 35, color: "#8884d8" },
  { name: "Clothing", value: 25, color: "#82ca9d" },
  { name: "Home & Garden", value: 20, color: "#ffc658" },
  { name: "Sports", value: 12, color: "#ff7300" },
  { name: "Books", value: 8, color: "#00ff00" },
]

const monthlyData = [
  { month: "Jan", orders: 400, revenue: 24000 },
  { month: "Feb", orders: 300, revenue: 18000 },
  { month: "Mar", orders: 600, revenue: 36000 },
  { month: "Apr", orders: 800, revenue: 48000 },
  { month: "May", orders: 500, revenue: 30000 },
  { month: "Jun", orders: 900, revenue: 54000 },
]

// Available tags for products
const availableTags = [
  "wireless",
  "bluetooth",
  "premium",
  "gaming",
  "portable",
  "waterproof",
  "fast-charging",
  "noise-cancelling",
  "smart",
  "fitness",
  "professional",
  "compact",
  "durable",
  "lightweight",
  "high-quality",
  "ergonomic",
  "multi-functional",
  "energy-efficient",
  "stylish",
  "affordable",
]

const initialProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299,
    originalPrice: 399,
    stock: 45,
    status: "Active",
    sales: 234,
    rating: 4.8,
    reviews: 1247,
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding for all-day wear.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort padding",
      "Bluetooth 5.0 connectivity",
      "Quick charge: 5 min = 2 hours playback",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Noise Cancellation": "Active ANC",
    },
    images: [
      "/placeholder.svg?height=600&width=600&text=Headphones+Front",
      "/placeholder.svg?height=600&width=600&text=Headphones+Side",
      "/placeholder.svg?height=600&width=600&text=Headphones+Back",
      "/placeholder.svg?height=600&width=600&text=Headphones+Case",
    ],
    inStock: true,
    brand: "AudioTech",
    availability: "In Stock",
    tags: ["wireless", "bluetooth", "premium", "noise-cancelling"],
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 199,
    originalPrice: null,
    stock: 12,
    status: "Low Stock",
    sales: 189,
    rating: 4.6,
    reviews: 892,
    description: "Track your health and fitness with advanced sensors and smart features.",
    features: ["Heart rate monitoring", "GPS tracking", "Water resistant", "7-day battery life", "Sleep tracking"],
    specifications: {
      Display: "1.4 inch AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "5ATM",
      Sensors: "Heart rate, GPS, Accelerometer",
      Connectivity: "Bluetooth 5.0, WiFi",
      Compatibility: "iOS, Android",
    },
    images: [
      "/placeholder.svg?height=600&width=600&text=Watch+Front",
      "/placeholder.svg?height=600&width=600&text=Watch+Side",
    ],
    inStock: true,
    brand: "FitTech",
    availability: "Low Stock",
    tags: ["smart", "fitness", "waterproof", "portable"],
  },
  {
    id: 3,
    name: "Laptop Backpack Pro",
    category: "Accessories",
    price: 89,
    originalPrice: 120,
    stock: 0,
    status: "Out of Stock",
    sales: 156,
    rating: 4.9,
    reviews: 456,
    description: "Professional laptop backpack with multiple compartments and USB charging port.",
    features: [
      "Fits 15.6 inch laptops",
      "USB charging port",
      "Water resistant",
      "Multiple compartments",
      "Ergonomic design",
    ],
    specifications: {
      Material: "Oxford fabric",
      Dimensions: "18 x 12 x 7 inches",
      Weight: "2.2 lbs",
      "Laptop Compatibility": "Up to 15.6 inches",
      Features: "USB port, Anti-theft pocket",
    },
    images: ["/placeholder.svg?height=600&width=600&text=Backpack"],
    inStock: false,
    brand: "TravelGear",
    availability: "Out of Stock",
    tags: ["professional", "durable", "multi-functional", "portable"],
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 49,
    originalPrice: null,
    stock: 78,
    status: "Active",
    sales: 298,
    rating: 4.7,
    reviews: 234,
    description: "Fast wireless charging for all compatible devices with sleek design.",
    features: [
      "10W fast charging",
      "Universal compatibility",
      "LED indicator",
      "Non-slip surface",
      "Overcharge protection",
    ],
    specifications: {
      "Charging Power": "10W",
      Compatibility: "Qi-enabled devices",
      Input: "USB-C",
      Dimensions: "4 x 4 x 0.4 inches",
      Weight: "0.3 lbs",
    },
    images: ["/placeholder.svg?height=600&width=600&text=Charger"],
    inStock: true,
    brand: "PowerTech",
    availability: "In Stock",
    tags: ["wireless", "fast-charging", "compact", "stylish"],
  },
  {
    id: 5,
    name: "Gaming Mouse RGB",
    category: "Electronics",
    price: 79,
    originalPrice: 99,
    stock: 23,
    status: "Active",
    sales: 167,
    rating: 4.8,
    reviews: 567,
    description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
    features: ["16000 DPI sensor", "RGB lighting", "8 programmable buttons", "Ergonomic design", "Gaming software"],
    specifications: {
      DPI: "16000",
      Buttons: "8 programmable",
      Connectivity: "USB wired",
      Lighting: "RGB customizable",
      Weight: "0.25 lbs",
    },
    images: ["/placeholder.svg?height=600&width=600&text=Mouse"],
    inStock: true,
    brand: "GameTech",
    availability: "In Stock",
    tags: ["gaming", "high-quality", "ergonomic", "professional"],
  },
]

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    role: "Customer",
    joinDate: "2023-01-15",
    orders: 12,
    totalSpent: 1250,
    lastLogin: "2024-01-20",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "Active",
    role: "Premium",
    joinDate: "2023-03-22",
    orders: 28,
    totalSpent: 3400,
    lastLogin: "2024-01-19",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    status: "Suspended",
    role: "Customer",
    joinDate: "2023-06-10",
    orders: 5,
    totalSpent: 450,
    lastLogin: "2024-01-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "Blocked",
    role: "Customer",
    joinDate: "2023-08-05",
    orders: 2,
    totalSpent: 120,
    lastLogin: "2023-12-15",
  },
  {
    id: 5,
    name: "Alex Wilson",
    email: "alex.wilson@example.com",
    status: "Active",
    role: "Admin",
    joinDate: "2022-11-01",
    orders: 0,
    totalSpent: 0,
    lastLogin: "2024-01-20",
  },
]

const initialOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2024-01-20",
    status: "Processing",
    total: 299,
    items: 1,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2024-01-19",
    status: "Shipped",
    total: 199,
    items: 1,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-003",
    customer: "Mike Chen",
    email: "mike.chen@example.com",
    date: "2024-01-18",
    status: "Delivered",
    total: 89,
    items: 1,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2024-01-17",
    status: "Cancelled",
    total: 178,
    items: 2,
    paymentStatus: "Refunded",
  },
]

export default function AdminDashboard() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState(initialProducts)
  const [users, setUsers] = useState(initialUsers)
  const [orders, setOrders] = useState(initialOrders)

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [editingUser, setEditingUser] = useState<any>(null)

  // Form states
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
    description: "",
    status: "Active",
    brand: "",
    rating: "",
    reviews: "",
    features: [""],
    specifications: {} as Record<string, string>,
    images: [""],
    tags: [] as string[],
  })

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "Customer",
    status: "Active",
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Product CRUD operations
  const handleAddProduct = () => {
    setEditingProduct(null)
    setProductForm({
      name: "",
      category: "",
      price: "",
      originalPrice: "",
      stock: "",
      description: "",
      status: "Active",
      brand: "",
      rating: "",
      reviews: "",
      features: [""],
      specifications: {},
      images: [""],
      tags: [],
    })
    setShowProductModal(true)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      stock: product.stock.toString(),
      description: product.description,
      status: product.status,
      brand: product.brand,
      rating: product.rating?.toString() || "",
      reviews: product.reviews?.toString() || "",
      features: product.features || [""],
      specifications: product.specifications || {},
      images: product.images || [""],
      tags: product.tags || [],
    })
    setShowProductModal(true)
  }

  const handleSaveProduct = () => {
    const productData = {
      name: productForm.name,
      category: productForm.category,
      price: Number.parseInt(productForm.price),
      originalPrice: productForm.originalPrice ? Number.parseInt(productForm.originalPrice) : null,
      stock: Number.parseInt(productForm.stock),
      description: productForm.description,
      status: productForm.status,
      brand: productForm.brand,
      rating: productForm.rating ? Number.parseFloat(productForm.rating) : 0,
      reviews: productForm.reviews ? Number.parseInt(productForm.reviews) : 0,
      features: productForm.features.filter((f) => f.trim() !== ""),
      specifications: productForm.specifications,
      images: productForm.images.filter((img) => img.trim() !== ""),
      tags: productForm.tags,
      inStock: Number.parseInt(productForm.stock) > 0,
      availability:
        Number.parseInt(productForm.stock) === 0
          ? "Out of Stock"
          : Number.parseInt(productForm.stock) < 20
            ? "Low Stock"
            : "In Stock",
    }

    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...productData,
              }
            : p,
        ),
      )
      toast({
        title: "Product updated",
        description: "Product has been updated successfully.",
      })
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...productData,
        sales: 0,
      }
      setProducts([...products, newProduct])
      toast({
        title: "Product added",
        description: "New product has been added successfully.",
      })
    }
    setShowProductModal(false)
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId))
      toast({
        title: "Product deleted",
        description: "Product has been deleted successfully.",
      })
    }
  }

  // User management operations
  const handleAddUser = () => {
    setEditingUser(null)
    setUserForm({
      name: "",
      email: "",
      role: "Customer",
      status: "Active",
    })
    setShowUserModal(true)
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setShowUserModal(true)
  }

  const handleSaveUser = () => {
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: userForm.name,
                email: userForm.email,
                role: userForm.role,
                status: userForm.status,
              }
            : u,
        ),
      )
      toast({
        title: "User updated",
        description: "User has been updated successfully.",
      })
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        status: userForm.status,
        joinDate: new Date().toISOString().split("T")[0],
        orders: 0,
        totalSpent: 0,
        lastLogin: "Never",
      }
      setUsers([...users, newUser])
      toast({
        title: "User added",
        description: "New user has been added successfully.",
      })
    }
    setShowUserModal(false)
  }

  const handleUserAction = (userId: number, action: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    let newStatus = user.status
    let actionText = ""

    switch (action) {
      case "suspend":
        newStatus = "Suspended"
        actionText = "suspended"
        break
      case "block":
        newStatus = "Blocked"
        actionText = "blocked"
        break
      case "activate":
        newStatus = "Active"
        actionText = "activated"
        break
    }

    setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)))

    toast({
      title: `User ${actionText}`,
      description: `${user.name} has been ${actionText} successfully.`,
    })
  }

  const handleDeleteUser = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    if (confirm(`Are you sure you want to delete ${user?.name}? This action cannot be undone.`)) {
      setUsers(users.filter((u) => u.id !== userId))
      toast({
        title: "User deleted",
        description: "User has been deleted successfully.",
        variant: "destructive",
      })
    }
  }

  // Order management
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    toast({
      title: "Order updated",
      description: `Order ${orderId} status updated to ${newStatus}.`,
    })
  }

  // Helper functions for product form
  const addFeature = () => {
    setProductForm({ ...productForm, features: [...productForm.features, ""] })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...productForm.features]
    newFeatures[index] = value
    setProductForm({ ...productForm, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    const newFeatures = productForm.features.filter((_, i) => i !== index)
    setProductForm({ ...productForm, features: newFeatures })
  }

  const addImage = () => {
    setProductForm({ ...productForm, images: [...productForm.images, ""] })
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...productForm.images]
    newImages[index] = value
    setProductForm({ ...productForm, images: newImages })
  }

  const removeImage = (index: number) => {
    const newImages = productForm.images.filter((_, i) => i !== index)
    setProductForm({ ...productForm, images: newImages })
  }

  const addSpecification = () => {
    const key = prompt("Enter specification name:")
    if (key) {
      setProductForm({
        ...productForm,
        specifications: { ...productForm.specifications, [key]: "" },
      })
    }
  }

  const updateSpecification = (key: string, value: string) => {
    setProductForm({
      ...productForm,
      specifications: { ...productForm.specifications, [key]: value },
    })
  }

  const removeSpecification = (key: string) => {
    const newSpecs = { ...productForm.specifications }
    delete newSpecs[key]
    setProductForm({ ...productForm, specifications: newSpecs })
  }

  const toggleTag = (tag: string) => {
    const newTags = productForm.tags.includes(tag)
      ? productForm.tags.filter((t) => t !== tag)
      : [...productForm.tags, tag]
    setProductForm({ ...productForm, tags: newTags })
  }

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your Hawk Mart store and monitor performance</p>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-green-600">{stat.change}</p>
                        </div>
                        <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product Management</CardTitle>
                <Button onClick={handleAddProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.status === "Active"
                                  ? "default"
                                  : product.status === "Low Stock"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {product.tags?.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {product.tags && product.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <Button onClick={handleAddUser}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="w-[200px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users
                      .filter(
                        (user) =>
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "Active"
                                  ? "default"
                                  : user.status === "Suspended"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.orders}</TableCell>
                          <TableCell>${user.totalSpent}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              {user.status === "Active" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleUserAction(user.id, "suspend")}
                                  >
                                    <UserX className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, "block")}>
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              {user.status !== "Active" && (
                                <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, "activate")}>
                                  <UserCheck className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter(
                        (order) =>
                          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>${order.total}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.paymentStatus === "Paid"
                                  ? "default"
                                  : order.paymentStatus === "Refunded"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {order.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-muted-foreground">Enable maintenance mode to prevent user access</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">User Registration</h4>
                    <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Send system notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Attempts Limit</h4>
                    <p className="text-sm text-muted-foreground">Limit failed login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Product Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={productForm.category}
                    onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={productForm.status}
                    onValueChange={(value) => setProductForm({ ...productForm, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing & Inventory</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price ($) - Optional</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={productForm.rating}
                    onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviews">Number of Reviews</Label>
                  <Input
                    id="reviews"
                    type="number"
                    value={productForm.reviews}
                    onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Features</h3>
              <div className="space-y-2">
                {productForm.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Enter feature"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      disabled={productForm.features.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFeature}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(productForm.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Input value={key} disabled className="w-1/3" />
                    <Input
                      value={value}
                      onChange={(e) => updateSpecification(key, e.target.value)}
                      placeholder="Enter value"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeSpecification(key)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addSpecification}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Specification
                </Button>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Images</h3>
              <div className="space-y-2">
                {productForm.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={image}
                      onChange={(e) => updateImage(index, e.target.value)}
                      placeholder="Enter image URL"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(index)}
                      disabled={productForm.images.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addImage}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tags (for recommendations)</h3>
              <div className="grid grid-cols-4 gap-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={productForm.tags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <Label htmlFor={tag} className="text-sm cursor-pointer">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Selected tags:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {productForm.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowProductModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProduct}>{editingProduct ? "Update" : "Add"} Product</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Name</Label>
              <Input
                id="userName"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userRole">Role</Label>
              <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userStatus">Status</Label>
              <Select value={userForm.status} onValueChange={(value) => setUserForm({ ...userForm, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUserModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUser}>{editingUser ? "Update" : "Add"} User</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
