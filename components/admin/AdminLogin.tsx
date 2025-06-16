'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, Lock, User } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email === 'admin@ncc.com' && credentials.password === 'adminXncc') {
      onLogin(true);
    } else {
      setError('Invalid credentials. Please try again.');
      onLogin(false);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-transparent rounded-full floating-animation" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-200/20 to-transparent rounded-full floating-animation" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,110,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,110,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="neon-card border-2 border-purple-200/50 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Shield className="w-16 h-16 text-purple-500 pulse-neon" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Admin Login</CardTitle>
            <p className="text-gray-600">Access the NCC Robotics admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800 flex items-center gap-2 font-medium">
                  <User className="w-4 h-4 text-blue-500 neon-glow" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="admin@ncc.com"
                  className="neon-input text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800 flex items-center gap-2 font-medium">
                  <Lock className="w-4 h-4 text-purple-500 neon-glow" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  className="neon-input text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button 
                type="submit"
                className="w-full neon-button text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 p-4 neon-bg rounded-lg border border-gray-200/50">
              <p className="text-gray-600 text-sm text-center">
                <strong>Demo Credentials:</strong><br />
                Email: admin@ncc.com<br />
                Password: adminXncc
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}