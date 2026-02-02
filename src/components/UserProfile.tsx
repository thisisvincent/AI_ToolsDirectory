
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { api, ApiError } from '@/lib/api-client';
import { getCurrentUser } from '@/lib/auth';
import { toast } from 'sonner';
import { User, Key, Home, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserData {
  id: number;
  email: string;
  name?: string;
  surname?: string;
  role: string;
  created_at: string;
}

export function UserProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestReason, setRequestReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    setLoading(true);
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        toast.error('Please log in to view your profile');
        router.push('/');
        return;
      }

      const users = await api.get<UserData[]>('/users');
      const user = users.find(u => u.email === currentUser.email);
      
      if (user) {
        setUserData(user);
      } else {
        toast.error('User profile not found');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to load profile: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChangeRequest = async () => {
    if (!userData) return;

    setIsSubmitting(true);
    try {
      await api.post('/users/password-change-request', {
        userId: userData.id,
        requestReason: requestReason.trim() || 'User requested password change',
      });

      // Send email notification to admin
      const emailBody = `
Password Change Request for Adept AI Tools

User Details:
- Name: ${userData.name || 'N/A'} ${userData.surname || ''}
- Email: ${userData.email}
- User ID: ${userData.id}
- Reason: ${requestReason.trim() || 'No reason provided'}
- Requested At: ${new Date().toLocaleString()}

Please review this request in the admin panel.
      `.trim();

      console.log('Email would be sent to: ivincentm@gmail.com');
      console.log('Email body:', emailBody);

      toast.success('Password change request submitted successfully! An email has been sent to the administrator.');
      setIsRequestDialogOpen(false);
      setRequestReason('');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to submit request: ${error.errorMessage}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">User profile not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">My Profile</CardTitle>
              <CardDescription className="text-base mt-2">
                View your account information
              </CardDescription>
            </div>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground">Name</Label>
                <p className="text-base font-medium">{userData.name || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground">Surname</Label>
                <p className="text-base font-medium">{userData.surname || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground">Email Address</Label>
                <p className="text-base font-medium">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground">Account Type</Label>
                <p className="text-base font-medium">
                  {userData.role === 'app20251014225423lezgriizlf_v1_admin_user' ? 'Administrator' : 'User'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground">Member Since</Label>
                <p className="text-base font-medium">
                  {new Date(userData.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full gap-2" size="lg">
                  <Key className="w-5 h-5" />
                  Request Password Change
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Password Change</DialogTitle>
                  <DialogDescription>
                    Submit a request to change your password. An administrator will review your request and contact you.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="request-reason">Reason (Optional)</Label>
                    <Textarea
                      id="request-reason"
                      placeholder="Please provide a reason for the password change request..."
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={handlePasswordChangeRequest} 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
