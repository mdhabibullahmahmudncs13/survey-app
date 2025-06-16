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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent rounded-full animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/10 to-transparent rounded-full animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Shield className="w-16 h-16 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
            <p className="text-slate-300">Access the NCC Robotics admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="admin@ncc.com"
                  className="bg-slate-800/50 border-slate-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  className="bg-slate-800/50 border-slate-600 text-white"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900/20 border border-red-600 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-slate-300 text-sm text-center">
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