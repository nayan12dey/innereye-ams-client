'use client';

import { useState } from 'react';
import { Card, Button, TextField, Label, InputGroup, Select, ListBox } from '@heroui/react';
import { ShieldCheck, User, Mail, Lock, IdCard, Calendar, UserPlus, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    employeeId: '',
    department: 'Engineering'
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registering Employee:', { ...formData, role: 'Employee' });
    
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        
        {/* Top Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-slate-800">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span>InnerEye <span className="text-blue-600">AMS</span></span>
          </Link>
          <p className="text-slate-500 text-sm mt-1">Onboard New Employee Account</p>
        </div>

        {/* Register Card */}
        <Card className="p-6 md:p-8 bg-white border border-slate-200 shadow-xl rounded-2xl">
          <Card.Header className="flex flex-col items-start gap-1 pb-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Employee Registration</h2>
            <p className="text-xs text-slate-500">Create your employee account to access the portal</p>
          </Card.Header>

          <form onSubmit={handleRegister} className="space-y-4 pt-5">
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Full Name */}
              <TextField fullWidth name="fullName">
                <Label className="text-xs font-semibold text-slate-700 mb-1 block">Full Name</Label>
                <InputGroup fullWidth className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input 
                    type="text"
                    name="fullName"
                    placeholder="Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                  />
                </InputGroup>
              </TextField>

              {/* Corporate Email */}
              <TextField fullWidth name="email">
                <Label className="text-xs font-semibold text-slate-700 mb-1 block">Corporate Email</Label>
                <InputGroup fullWidth className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input 
                    type="email"
                    name="email"
                    placeholder="rahul@innereye.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                  />
                </InputGroup>
              </TextField>

              {/* Employee ID */}
              <TextField fullWidth name="employeeId">
                <Label className="text-xs font-semibold text-slate-700 mb-1 block">Employee ID</Label>
                <InputGroup fullWidth className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                    <IdCard className="w-4 h-4 text-slate-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input 
                    type="text"
                    name="employeeId"
                    placeholder="IECS-1042"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                  />
                </InputGroup>
              </TextField>

              {/* Password */}
              <TextField fullWidth name="password">
                <Label className="text-xs font-semibold text-slate-700 mb-1 block">Password</Label>
                <InputGroup fullWidth className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 flex items-center">
                  <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input 
                    type={isVisible ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                  />
                  <InputGroup.Suffix className="pr-3 flex items-center justify-center">
                    <button
                      type="button"
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      onClick={toggleVisibility}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>
            </div>

            {/* Department Select (Full Width) */}
            <div className="pt-1">
              <Select 
                className="w-full" 
                placeholder="Select Department"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (selected) setFormData({ ...formData, department: String(selected) });
                }}
              >
                <Label className="text-xs font-semibold text-slate-700 mb-1 block">Department</Label>
                <Select.Trigger className="w-full px-3 py-2 border border-slate-200 rounded-xl flex justify-between items-center bg-white text-sm">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-white border border-slate-200 shadow-lg rounded-xl p-1 z-50">
                  <ListBox>
                    <ListBox.Item id="Engineering" textValue="Engineering" className="px-3 py-2 hover:bg-slate-100 rounded-lg cursor-pointer text-sm">
                      Engineering
                    </ListBox.Item>
                    <ListBox.Item id="Human Resources" textValue="Human Resources" className="px-3 py-2 hover:bg-slate-100 rounded-lg cursor-pointer text-sm">
                      Human Resources
                    </ListBox.Item>
                    <ListBox.Item id="Marketing" textValue="Marketing" className="px-3 py-2 hover:bg-slate-100 rounded-lg cursor-pointer text-sm">
                      Marketing
                    </ListBox.Item>
                    <ListBox.Item id="Finance" textValue="Finance" className="px-3 py-2 hover:bg-slate-100 rounded-lg cursor-pointer text-sm">
                      Finance
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Annual Leave Info Box */}
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3 text-xs text-blue-800 my-2">
              <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <span className="font-bold">Default Paid Leave Balance:</span> Newly registered employees automatically receive 18 days annual leave quota.
              </div>
            </div>

            {/* Submit Button */}
            <Card.Footer className="px-0 pt-2">
              <Button 
                type="submit" 
                color="primary" 
                className="w-full font-semibold shadow-md shadow-blue-500/20 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-2"
                size="lg"
              >
                <UserPlus className="w-5 h-5" />
                Register Account
              </Button>
            </Card.Footer>

          </form>
        </Card>

        {/* Bottom Link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}