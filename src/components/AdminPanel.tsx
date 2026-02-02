
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';
import { UserPlus, Trash2, Mail, Lock, CheckCircle, XCircle, Clock, Key, Home, Edit, BookOpen, Plus, Newspaper } from 'lucide-react';
import { isAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
  name?: string;
  surname?: string;
  role: string;
  access_status: 'pending' | 'approved' | 'rejected';
  access_requested_at?: string;
  approved_by?: number;
  approved_at?: string;
  created_at: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url?: string;
  author_name: string;
  published: boolean;
  featured: boolean;
  published_at?: string;
  created_at?: string;
}

interface AINewsSource {
  id: number;
  name: string;
  url: string;
  description: string;
  thumbnail_url?: string;
  category?: string;
  badges?: string[];
  featured?: boolean;
  sort_order?: number;
  last_updated?: string;
  created_at?: string;
}

const ADMIN_ROLE = 'app20251014225423lezgriizlf_v1_admin_user';
const USER_ROLE = 'app20251014225423lezgriizlf_v1_user';

export function AdminPanel() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', userType: USER_ROLE });
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [editData, setEditData] = useState({ name: '', surname: '', email: '' });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isCreateBlogDialogOpen, setIsCreateBlogDialogOpen] = useState(false);
  const [isEditBlogDialogOpen, setIsEditBlogDialogOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image_url: '',
    author_name: 'Admin',
    published: true,
    featured: false,
  });

  const [newsSources, setNewsSources] = useState<AINewsSource[]>([]);
  const [isCreateNewsDialogOpen, setIsCreateNewsDialogOpen] = useState(false);
  const [isEditNewsDialogOpen, setIsEditNewsDialogOpen] = useState(false);
  const [selectedNewsSource, setSelectedNewsSource] = useState<AINewsSource | null>(null);
  const [newsFormData, setNewsFormData] = useState({
    name: '',
    url: '',
    description: '',
    thumbnail_url: '',
    category: '',
    badges: '',
    featured: false,
    sort_order: 0,
  });

  useEffect(() => {
    if (!isAdmin()) {
      toast.error('Access denied. Only administrators can access this page.');
      router.push('/');
      return;
    }
    loadUsers();
    loadBlogPosts();
    loadNewsSources();
  }, [router]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await api.get<User[]>('/users');
      setUsers(data);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to load users: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      await api.post('/users', {
        email: formData.email,
        name: formData.name || null,
        surname: formData.surname || null,
        password: formData.password,
        access_status: 'approved',
        role: formData.userType,
      });
      
      toast.success('User created successfully');
      setIsCreateDialogOpen(false);
      setFormData({ name: '', surname: '', email: '', password: '', userType: USER_ROLE });
      loadUsers();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to create user: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setEditData({ 
      name: user.name || '', 
      surname: user.surname || '',
      email: user.email 
    });
    setIsEditDialogOpen(true);
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    if (!editData.email) {
      toast.error('Email is required');
      return;
    }

    try {
      await api.put(`/users?id=${selectedUser.id}`, {
        name: editData.name || null,
        surname: editData.surname || null,
        email: editData.email,
      });
      
      toast.success('User updated successfully');
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      setEditData({ name: '', surname: '', email: '' });
      loadUsers();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to update user: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleUserTypeChange = async (userId: number, newRole: string) => {
    try {
      await api.put(`/users?id=${userId}`, { role: newRole });
      toast.success('User type updated successfully');
      loadUsers();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to update user type: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleApproveUser = async (userId: number) => {
    try {
      await api.post('/users/approve', { userId });
      toast.success('User access approved successfully');
      loadUsers();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to approve user: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleRejectUser = async (userId: number) => {
    if (!confirm('Are you sure you want to reject this user\'s access request?')) {
      return;
    }

    try {
      await api.put(`/users?id=${userId}`, { access_status: 'rejected' });
      toast.success('User access rejected');
      loadUsers();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to reject user: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/users?id=${userId}`);
      toast.success('User deleted successfully');
      loadUsers();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to delete user: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const openPasswordDialog = (user: User) => {
    setSelectedUser(user);
    setPasswordData({ newPassword: '', confirmPassword: '' });
    setIsPasswordDialogOpen(true);
  };

  const handleChangePassword = async () => {
    if (!selectedUser) return;

    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      await api.post('/users/change-password', {
        userId: selectedUser.id,
        newPassword: passwordData.newPassword,
      });
      
      toast.success('Password changed successfully');
      setIsPasswordDialogOpen(false);
      setSelectedUser(null);
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to change password: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const loadBlogPosts = async () => {
    try {
      const data = await api.get<BlogPost[]>('/blog');
      setBlogPosts(data);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to load blog posts: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCreateBlogPost = async () => {
    if (!blogFormData.title || !blogFormData.description || !blogFormData.content) {
      toast.error('Title, description, and content are required');
      return;
    }

    try {
      const slug = blogFormData.slug || generateSlug(blogFormData.title);
      await api.post('/blog', {
        ...blogFormData,
        slug,
      });

      toast.success('Blog post created successfully');
      setIsCreateBlogDialogOpen(false);
      setBlogFormData({
        title: '',
        slug: '',
        description: '',
        content: '',
        image_url: '',
        author_name: 'Admin',
        published: true,
        featured: false,
      });
      loadBlogPosts();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to create blog post: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const openEditBlogDialog = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setBlogFormData({
      title: post.title,
      slug: post.slug,
      description: post.description,
      content: post.content,
      image_url: post.image_url || '',
      author_name: post.author_name,
      published: post.published,
      featured: post.featured,
    });
    setIsEditBlogDialogOpen(true);
  };

  const handleEditBlogPost = async () => {
    if (!selectedBlogPost) return;

    if (!blogFormData.title || !blogFormData.description || !blogFormData.content) {
      toast.error('Title, description, and content are required');
      return;
    }

    try {
      const slug = blogFormData.slug || generateSlug(blogFormData.title);
      await api.put(`/blog?id=${selectedBlogPost.id}`, {
        ...blogFormData,
        slug,
      });

      toast.success('Blog post updated successfully');
      setIsEditBlogDialogOpen(false);
      setSelectedBlogPost(null);
      setBlogFormData({
        title: '',
        slug: '',
        description: '',
        content: '',
        image_url: '',
        author_name: 'Admin',
        published: true,
        featured: false,
      });
      loadBlogPosts();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to update blog post: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleDeleteBlogPost = async (postId: number) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/blog?id=${postId}`);
      toast.success('Blog post deleted successfully');
      loadBlogPosts();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to delete blog post: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const loadNewsSources = async () => {
    try {
      const data = await api.get<AINewsSource[]>('/ai-news-sources');
      setNewsSources(data);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to load news sources: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleCreateNewsSource = async () => {
    if (!newsFormData.name || !newsFormData.url || !newsFormData.description) {
      toast.error('Name, URL, and description are required');
      return;
    }

    try {
      const badges = newsFormData.badges
        ? newsFormData.badges.split(',').map(b => b.trim()).filter(Boolean)
        : [];

      await api.post('/ai-news-sources', {
        name: newsFormData.name,
        url: newsFormData.url,
        description: newsFormData.description,
        thumbnail_url: newsFormData.thumbnail_url || null,
        category: newsFormData.category || null,
        badges,
        featured: newsFormData.featured,
        sort_order: newsFormData.sort_order,
      });

      toast.success('News source created successfully');
      setIsCreateNewsDialogOpen(false);
      setNewsFormData({
        name: '',
        url: '',
        description: '',
        thumbnail_url: '',
        category: '',
        badges: '',
        featured: false,
        sort_order: 0,
      });
      loadNewsSources();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to create news source: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const openEditNewsDialog = (source: AINewsSource) => {
    setSelectedNewsSource(source);
    setNewsFormData({
      name: source.name,
      url: source.url,
      description: source.description,
      thumbnail_url: source.thumbnail_url || '',
      category: source.category || '',
      badges: source.badges?.join(', ') || '',
      featured: source.featured || false,
      sort_order: source.sort_order || 0,
    });
    setIsEditNewsDialogOpen(true);
  };

  const handleEditNewsSource = async () => {
    if (!selectedNewsSource) return;

    if (!newsFormData.name || !newsFormData.url || !newsFormData.description) {
      toast.error('Name, URL, and description are required');
      return;
    }

    try {
      const badges = newsFormData.badges
        ? newsFormData.badges.split(',').map(b => b.trim()).filter(Boolean)
        : [];

      await api.put(`/ai-news-sources?id=${selectedNewsSource.id}`, {
        name: newsFormData.name,
        url: newsFormData.url,
        description: newsFormData.description,
        thumbnail_url: newsFormData.thumbnail_url || null,
        category: newsFormData.category || null,
        badges,
        featured: newsFormData.featured,
        sort_order: newsFormData.sort_order,
      });

      toast.success('News source updated successfully');
      setIsEditNewsDialogOpen(false);
      setSelectedNewsSource(null);
      setNewsFormData({
        name: '',
        url: '',
        description: '',
        thumbnail_url: '',
        category: '',
        badges: '',
        featured: false,
        sort_order: 0,
      });
      loadNewsSources();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to update news source: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleDeleteNewsSource = async (sourceId: number) => {
    if (!confirm('Are you sure you want to delete this news source? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/ai-news-sources?id=${sourceId}`);
      toast.success('News source deleted successfully');
      loadNewsSources();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to delete news source: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUserTypeBadge = (role: string) => {
    return role === ADMIN_ROLE ? 'Admin' : 'User';
  };

  const pendingUsers = users.filter(u => u.access_status === 'pending');
  const approvedUsers = users.filter(u => u.access_status === 'approved');
  const rejectedUsers = users.filter(u => u.access_status === 'rejected');

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">Admin Panel</CardTitle>
              <CardDescription className="text-base mt-2">
                Manage users, blog posts, and site content
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                      Add a new user account with approved access
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="create-name">Name</Label>
                      <Input
                        id="create-name"
                        type="text"
                        placeholder="John"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-surname">Surname</Label>
                      <Input
                        id="create-surname"
                        type="text"
                        placeholder="Doe"
                        value={formData.surname}
                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="create-email"
                          type="email"
                          placeholder="user@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="create-password"
                          type="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-user-type">User Type</Label>
                      <Select
                        value={formData.userType}
                        onValueChange={(value) => setFormData({ ...formData, userType: value })}
                      >
                        <SelectTrigger id="create-user-type">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={USER_ROLE}>User</SelectItem>
                          <SelectItem value={ADMIN_ROLE}>Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleCreateUser} className="w-full">
                      Create User
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="pending">
                Pending ({pendingUsers.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({approvedUsers.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejectedUsers.length})
              </TabsTrigger>
              <TabsTrigger value="blog">
                <BookOpen className="w-4 h-4 mr-2" />
                Blog Posts ({blogPosts.length})
              </TabsTrigger>
              <TabsTrigger value="news">
                <Newspaper className="w-4 h-4 mr-2" />
                News Sources ({newsSources.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Surname</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : pendingUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          No pending access requests
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                          <TableCell>{user.surname || 'N/A'}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Select
                              value={user.role}
                              onValueChange={(value) => handleUserTypeChange(user.id, value)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={USER_ROLE}>User</SelectItem>
                                <SelectItem value={ADMIN_ROLE}>Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {user.access_requested_at 
                              ? new Date(user.access_requested_at).toLocaleDateString()
                              : 'N/A'}
                          </TableCell>
                          <TableCell>{getStatusBadge(user.access_status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(user)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleApproveUser(user.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRejectUser(user.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="approved" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Surname</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>Approved</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : approvedUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          No approved users
                        </TableCell>
                      </TableRow>
                    ) : (
                      approvedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                          <TableCell>{user.surname || 'N/A'}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Select
                              value={user.role}
                              onValueChange={(value) => handleUserTypeChange(user.id, value)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={USER_ROLE}>User</SelectItem>
                                <SelectItem value={ADMIN_ROLE}>Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {user.approved_at 
                              ? new Date(user.approved_at).toLocaleDateString()
                              : 'N/A'}
                          </TableCell>
                          <TableCell>{getStatusBadge(user.access_status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(user)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openPasswordDialog(user)}
                              >
                                <Key className="w-4 h-4 mr-1" />
                                Change Password
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Surname</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : rejectedUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          No rejected users
                        </TableCell>
                      </TableRow>
                    ) : (
                      rejectedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                          <TableCell>{user.surname || 'N/A'}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Select
                              value={user.role}
                              onValueChange={(value) => handleUserTypeChange(user.id, value)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={USER_ROLE}>User</SelectItem>
                                <SelectItem value={ADMIN_ROLE}>Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {user.access_requested_at 
                              ? new Date(user.access_requested_at).toLocaleDateString()
                              : 'N/A'}
                          </TableCell>
                          <TableCell>{getStatusBadge(user.access_status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(user)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleApproveUser(user.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="blog" className="mt-4">
              <div className="mb-4 flex justify-end">
                <Dialog open={isCreateBlogDialogOpen} onOpenChange={setIsCreateBlogDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Create Blog Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Blog Post</DialogTitle>
                      <DialogDescription>
                        Add a new blog post to the site
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="blog-title">Title *</Label>
                        <Input
                          id="blog-title"
                          placeholder="Enter blog post title"
                          value={blogFormData.title}
                          onChange={(e) => {
                            const title = e.target.value;
                            setBlogFormData({
                              ...blogFormData,
                              title,
                              slug: blogFormData.slug || generateSlug(title)
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-slug">Slug *</Label>
                        <Input
                          id="blog-slug"
                          placeholder="url-friendly-slug"
                          value={blogFormData.slug}
                          onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-description">Description *</Label>
                        <Textarea
                          id="blog-description"
                          placeholder="Brief description of the blog post"
                          value={blogFormData.description}
                          onChange={(e) => setBlogFormData({ ...blogFormData, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-content">Content *</Label>
                        <Textarea
                          id="blog-content"
                          placeholder="Full blog post content"
                          value={blogFormData.content}
                          onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                          rows={8}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-image">Image URL</Label>
                        <Input
                          id="blog-image"
                          placeholder="https://images.unsplash.com/..."
                          value={blogFormData.image_url}
                          onChange={(e) => setBlogFormData({ ...blogFormData, image_url: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-author">Author Name</Label>
                        <Input
                          id="blog-author"
                          placeholder="Admin"
                          value={blogFormData.author_name}
                          onChange={(e) => setBlogFormData({ ...blogFormData, author_name: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            id="blog-published"
                            checked={blogFormData.published}
                            onCheckedChange={(checked) => setBlogFormData({ ...blogFormData, published: checked })}
                          />
                          <Label htmlFor="blog-published">Published</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            id="blog-featured"
                            checked={blogFormData.featured}
                            onCheckedChange={(checked) => setBlogFormData({ ...blogFormData, featured: checked })}
                          />
                          <Label htmlFor="blog-featured">Featured</Label>
                        </div>
                      </div>
                      <Button onClick={handleCreateBlogPost} className="w-full">
                        Create Blog Post
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : blogPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No blog posts yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      blogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate">{post.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{post.slug}</div>
                          </TableCell>
                          <TableCell>{post.author_name}</TableCell>
                          <TableCell>
                            {post.published ? (
                              <Badge className="bg-green-500">Published</Badge>
                            ) : (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {post.featured && <Badge variant="outline">Featured</Badge>}
                          </TableCell>
                          <TableCell>
                            {post.created_at
                              ? new Date(post.created_at).toLocaleDateString()
                              : 'N/A'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditBlogDialog(post)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteBlogPost(post.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="news" className="mt-4">
              <div className="mb-4 flex justify-end">
                <Dialog open={isCreateNewsDialogOpen} onOpenChange={setIsCreateNewsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Create News Source
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New AI News Source</DialogTitle>
                      <DialogDescription>
                        Add a new AI news source to the directory
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="news-name">Name *</Label>
                        <Input
                          id="news-name"
                          placeholder="Enter news source name"
                          value={newsFormData.name}
                          onChange={(e) => setNewsFormData({ ...newsFormData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="news-url">URL *</Label>
                        <Input
                          id="news-url"
                          placeholder="https://example.com"
                          value={newsFormData.url}
                          onChange={(e) => setNewsFormData({ ...newsFormData, url: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="news-description">Description *</Label>
                        <Textarea
                          id="news-description"
                          placeholder="Brief description of the news source"
                          value={newsFormData.description}
                          onChange={(e) => setNewsFormData({ ...newsFormData, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="news-thumbnail">Thumbnail URL</Label>
                        <Input
                          id="news-thumbnail"
                          placeholder="https://example.com/image.jpg"
                          value={newsFormData.thumbnail_url}
                          onChange={(e) => setNewsFormData({ ...newsFormData, thumbnail_url: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="news-category">Category</Label>
                        <Input
                          id="news-category"
                          placeholder="e.g., Newsletter, Directory, Publication"
                          value={newsFormData.category}
                          onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="news-badges">Badges (comma-separated)</Label>
                        <Input
                          id="news-badges"
                          placeholder="Daily, Free, Newsletter"
                          value={newsFormData.badges}
                          onChange={(e) => setNewsFormData({ ...newsFormData, badges: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="news-sort-order">Sort Order</Label>
                        <Input
                          id="news-sort-order"
                          type="number"
                          placeholder="0"
                          value={newsFormData.sort_order}
                          onChange={(e) => setNewsFormData({ ...newsFormData, sort_order: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="news-featured"
                          checked={newsFormData.featured}
                          onCheckedChange={(checked) => setNewsFormData({ ...newsFormData, featured: checked })}
                        />
                        <Label htmlFor="news-featured">Featured</Label>
                      </div>
                      <Button onClick={handleCreateNewsSource} className="w-full">
                        Create News Source
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Sort Order</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : newsSources.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No news sources yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      newsSources.map((source) => (
                        <TableRow key={source.id}>
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate">{source.name}</div>
                          </TableCell>
                          <TableCell>
                            {source.category ? (
                              <Badge variant="secondary">{source.category}</Badge>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline truncate block"
                            >
                              {source.url}
                            </a>
                          </TableCell>
                          <TableCell>
                            {source.featured && <Badge variant="outline">Featured</Badge>}
                          </TableCell>
                          <TableCell>{source.sort_order || 0}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditNewsDialog(source)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteNewsSource(source.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogDescription>
              Update user information for {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                type="text"
                placeholder="John"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-surname">Surname</Label>
              <Input
                id="edit-surname"
                type="text"
                placeholder="Doe"
                value={editData.surname}
                onChange={(e) => setEditData({ ...editData, surname: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="edit-email"
                  type="email"
                  placeholder="user@example.com"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={handleEditUser} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Change password for {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={handleChangePassword} className="w-full">
              Change Password
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Post Dialog */}
      <Dialog open={isEditBlogDialogOpen} onOpenChange={setIsEditBlogDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update blog post details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-blog-title">Title *</Label>
              <Input
                id="edit-blog-title"
                placeholder="Enter blog post title"
                value={blogFormData.title}
                onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-blog-slug">Slug *</Label>
              <Input
                id="edit-blog-slug"
                placeholder="url-friendly-slug"
                value={blogFormData.slug}
                onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-blog-description">Description *</Label>
              <Textarea
                id="edit-blog-description"
                placeholder="Brief description of the blog post"
                value={blogFormData.description}
                onChange={(e) => setBlogFormData({ ...blogFormData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-blog-content">Content *</Label>
              <Textarea
                id="edit-blog-content"
                placeholder="Full blog post content"
                value={blogFormData.content}
                onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-blog-image">Image URL</Label>
              <Input
                id="edit-blog-image"
                placeholder="https://images.unsplash.com/..."
                value={blogFormData.image_url}
                onChange={(e) => setBlogFormData({ ...blogFormData, image_url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-blog-author">Author Name</Label>
              <Input
                id="edit-blog-author"
                placeholder="Admin"
                value={blogFormData.author_name}
                onChange={(e) => setBlogFormData({ ...blogFormData, author_name: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-blog-published"
                  checked={blogFormData.published}
                  onCheckedChange={(checked) => setBlogFormData({ ...blogFormData, published: checked })}
                />
                <Label htmlFor="edit-blog-published">Published</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-blog-featured"
                  checked={blogFormData.featured}
                  onCheckedChange={(checked) => setBlogFormData({ ...blogFormData, featured: checked })}
                />
                <Label htmlFor="edit-blog-featured">Featured</Label>
              </div>
            </div>
            <Button onClick={handleEditBlogPost} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit News Source Dialog */}
      <Dialog open={isEditNewsDialogOpen} onOpenChange={setIsEditNewsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit AI News Source</DialogTitle>
            <DialogDescription>
              Update news source details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-news-name">Name *</Label>
              <Input
                id="edit-news-name"
                placeholder="Enter news source name"
                value={newsFormData.name}
                onChange={(e) => setNewsFormData({ ...newsFormData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-news-url">URL *</Label>
              <Input
                id="edit-news-url"
                placeholder="https://example.com"
                value={newsFormData.url}
                onChange={(e) => setNewsFormData({ ...newsFormData, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-news-description">Description *</Label>
              <Textarea
                id="edit-news-description"
                placeholder="Brief description of the news source"
                value={newsFormData.description}
                onChange={(e) => setNewsFormData({ ...newsFormData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-news-thumbnail">Thumbnail URL</Label>
              <Input
                id="edit-news-thumbnail"
                placeholder="https://example.com/image.jpg"
                value={newsFormData.thumbnail_url}
                onChange={(e) => setNewsFormData({ ...newsFormData, thumbnail_url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-news-category">Category</Label>
              <Input
                id="edit-news-category"
                placeholder="e.g., Newsletter, Directory, Publication"
                value={newsFormData.category}
                onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-news-badges">Badges (comma-separated)</Label>
              <Input
                id="edit-news-badges"
                placeholder="Daily, Free, Newsletter"
                value={newsFormData.badges}
                onChange={(e) => setNewsFormData({ ...newsFormData, badges: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-news-sort-order">Sort Order</Label>
              <Input
                id="edit-news-sort-order"
                type="number"
                placeholder="0"
                value={newsFormData.sort_order}
                onChange={(e) => setNewsFormData({ ...newsFormData, sort_order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="edit-news-featured"
                checked={newsFormData.featured}
                onCheckedChange={(checked) => setNewsFormData({ ...newsFormData, featured: checked })}
              />
              <Label htmlFor="edit-news-featured">Featured</Label>
            </div>
            <Button onClick={handleEditNewsSource} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
