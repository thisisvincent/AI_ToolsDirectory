
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
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';
import { UserPlus, Trash2, Mail, Lock, CheckCircle, XCircle, Clock, Key, Home, Edit } from 'lucide-react';
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

  useEffect(() => {
    if (!isAdmin()) {
      toast.error('Access denied. Only administrators can access this page.');
      router.push('/');
      return;
    }
    loadUsers();
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
              <CardTitle className="text-3xl">User Management</CardTitle>
              <CardDescription className="text-base mt-2">
                Manage user access requests and account settings
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                Pending ({pendingUsers.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({approvedUsers.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejectedUsers.length})
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
    </div>
  );
}
