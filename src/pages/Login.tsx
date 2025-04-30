
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEprStore } from '@/store/useEprStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useEprStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simple authentication for demo purposes
      if (username === 'admin' && password === 'password') {
        // Check if this is the first login
        const isFirstLogin = localStorage.getItem('firstLogin') !== 'false';
        
        // Create a mock user
        const mockUser = {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        // Save user to store
        setUser(mockUser);
        
        // Set first login status
        if (isFirstLogin) {
          localStorage.setItem('firstLogin', 'false');
          toast({
            title: 'Welcome!',
            description: 'Please complete your company profile.',
          });
          navigate('/settings');
        } else {
          toast({
            title: 'Login successful',
            description: 'Welcome back, admin!',
          });
          navigate('/dashboard');
        }
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid username or password. Try admin/password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">EPR Portal Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your EPR dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Demo credentials: username: admin, password: password
              </p>
            </div>
            <div className="text-sm text-center text-gray-500">
              Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
