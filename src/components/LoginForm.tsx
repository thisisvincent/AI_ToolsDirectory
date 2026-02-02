
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the login API endpoint
      const result = await api.post('/auth/login', { email, password });
      
      if (result.success) {
        // Store auth state in localStorage
        const authState = {
          isAuthenticated: true,
          currentUser: result.user,
        };
        localStorage.setItem('ai_tools_auth', JSON.stringify(authState));
        
        toast.success('Login successful!');
        router.push('/directory');
        router.refresh();
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.errorMessage);
      } else {
        toast.error('An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccessRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.surname.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/users', {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        access_status: 'pending',
      });
      
      toast.success('Access request submitted successfully! An email has been sent to the administrator at ivincentm@gmail.com. Please wait for admin approval.');
      setFormData({ name: '', surname: '', email: '', password: '' });
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to submit request: ${error.errorMessage}`);
      } else {
        toast.error('Failed to submit request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center text-base">
          Enter your credentials to access Adept AI Tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 h-12"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                Sign In
              </span>
            )}
          </Button>
        </form>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full h-12 text-base font-semibold mt-3"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Request Access
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request Access</DialogTitle>
              <DialogDescription>
                Fill in your details to request access to Adept AI Tools. An email will be sent to the administrator (ivincentm@gmail.com) for review.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAccessRequest} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="request-name">Name</Label>
                <Input
                  id="request-name"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-surname">Surname</Label>
                <Input
                  id="request-surname"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.surname}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-email">Email</Label>
                <Input
                  id="request-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-password">Password</Label>
                <Input
                  id="request-password"
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
