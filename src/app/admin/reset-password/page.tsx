
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Key, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResetAdminPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; email?: string; password?: string; error?: string; userId?: string } | null>(null);

  const handleResetPassword = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/next_api/users/reset-admin-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          email: data.data.email,
          password: data.data.newPassword,
          userId: data.data.userId,
        });
      } else {
        setResult({
          success: false,
          error: data.errorMessage || 'Failed to reset password',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Key className="w-6 h-6" />
            Reset Admin Password
          </CardTitle>
          <CardDescription>
            Reset or create the admin user for admin@adeptaitools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleResetPassword} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Processing...' : 'Reset/Create Admin User'}
          </Button>

          {result && (
            <Alert variant={result.success ? 'default' : 'destructive'}>
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {result.success ? (
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Admin user configured successfully!</p>
                    <div className="bg-muted p-4 rounded-md space-y-2">
                      <p><strong>Email:</strong> {result.email}</p>
                      <p><strong>Password:</strong> <code className="bg-background px-2 py-1 rounded">{result.password}</code></p>
                      <p className="text-xs text-muted-foreground">User ID: {result.userId}</p>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <p className="text-sm font-medium">You can now log in with these credentials:</p>
                      <Link href="/login">
                        <Button className="w-full" variant="default">
                          Go to Login Page
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold mb-2">Error occurred:</p>
                    <p>{result.error}</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-3">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Click the button above to reset/create the admin user</li>
              <li>The system will:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Create the admin user if it doesn't exist</li>
                  <li>Reset the password if the user already exists</li>
                  <li>Set the access status to "approved"</li>
                  <li>Assign admin role permissions</li>
                </ul>
              </li>
              <li>Copy the credentials displayed above</li>
              <li>Click "Go to Login Page" and use:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li><strong>Email:</strong> admin@adeptaitools</li>
                  <li><strong>Password:</strong> Pamusha@34</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              ⚠️ Security Note
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
              This page should only be accessible during initial setup. Consider removing or protecting this endpoint in production.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
