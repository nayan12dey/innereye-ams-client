'use client';

import { useState } from 'react';
import {
  Card,
  Button,
  Tabs,
  TextField,
  Label,
  InputGroup
} from '@heroui/react';
import {
  ShieldCheck,
  Mail,
  Lock,
  UserCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Role selection
  const [selectedRole, setSelectedRole] = useState('employee');

  // Password visibility
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const toastId = toast.loading('Logging in...');

    await signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: (ctx) => {
          toast.success('Welcome back!', {
            id: toastId,
          });

          const userRole = ctx.data?.user?.role;

          if (userRole === 'hr') {
            router.push('/dashboard/hr');
          } else {
            router.push('/dashboard/employee');
          }
        },

        onError: (ctx) => {
          toast.error(
            ctx.error?.message || 'Invalid email or password',
            {
              id: toastId,
            }
          );

          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Top Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-2xl text-slate-800"
          >
            <div className="bg-blue-600 text-white p-2.5 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <span>
              InnerEye <span className="text-blue-600">AMS</span>
            </span>
          </Link>

          <p className="text-slate-500 text-sm mt-2">
            Employee Attendance Management Portal
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 bg-white border border-slate-200 shadow-xl rounded-2xl">

          <Card.Header className="flex flex-col items-start gap-1 pb-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-xs text-slate-500">
              Sign in to access your dashboard
            </p>
          </Card.Header>

          <div className="pt-4">

            {/* Role Tabs */}
            <Tabs
              value={selectedRole}
              onValueChange={(val) => setSelectedRole(String(val))}
              className="w-full"
            >
              <Tabs.ListContainer className="w-full bg-slate-100 p-1 rounded-xl">

                <Tabs.List
                  aria-label="Role Selection"
                  className="w-full grid grid-cols-2 text-center text-sm font-medium"
                >

                  <Tabs.Tab
                    id="employee"
                    onClick={() => setSelectedRole('employee')}
                    className="py-2 cursor-pointer rounded-lg transition-all data-[selected=true]:bg-white data-[selected=true]:shadow-sm data-[selected=true]:text-blue-600"
                  >
                    Employee Login
                    <Tabs.Indicator />
                  </Tabs.Tab>

                  <Tabs.Tab
                    id="hr"
                    onClick={() => setSelectedRole('hr')}
                    className="py-2 cursor-pointer rounded-lg transition-all data-[selected=true]:bg-white data-[selected=true]:shadow-sm data-[selected=true]:text-blue-600"
                  >
                    HR Admin Portal
                    <Tabs.Indicator />
                  </Tabs.Tab>

                </Tabs.List>
              </Tabs.ListContainer>

              <form onSubmit={handleLogin} className="space-y-4 pt-5">

                {/* Email */}
                <TextField fullWidth name="email">
                  <Label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Corporate Email
                  </Label>

                  <InputGroup
                    fullWidth
                    className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
                  >
                    <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </InputGroup.Prefix>

                    <InputGroup.Input
                      type="email"
                      placeholder="name@innereye.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                    />
                  </InputGroup>
                </TextField>

                {/* Password */}
                <TextField fullWidth name="password">
                  <Label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Password
                  </Label>

                  <InputGroup
                    fullWidth
                    className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 flex items-center"
                  >
                    <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </InputGroup.Prefix>

                    <InputGroup.Input
                      type={isVisible ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                    />

                    <InputGroup.Suffix className="pr-3 flex items-center justify-center">
                      <button
                        type="button"
                        aria-label={
                          isVisible
                            ? 'Hide password'
                            : 'Show password'
                        }
                        onClick={toggleVisibility}
                        className="text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {isVisible ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </InputGroup.Suffix>
                  </InputGroup>
                </TextField>

                {/* Submit */}
                <Card.Footer className="px-0 pt-3">
                  <Button
                    type="submit"
                    color="primary"
                    isDisabled={loading}
                    className="w-full font-semibold shadow-md shadow-blue-500/20 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <UserCheck className="w-5 h-5" />

                    {loading
                      ? 'Logging in...'
                      : `Login as ${selectedRole === 'employee'
                        ? 'Employee'
                        : 'HR Admin'
                      }`}
                  </Button>
                </Card.Footer>

              </form>
            </Tabs>
          </div>
        </Card>

        {/* Register Link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{' '}

          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register New Employee
          </Link>
        </p>

      </div>
    </div>
  );
}

