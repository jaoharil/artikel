'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios'; // ✅ pakai 'api' bukan 'axios'

const loginSchema = z.object({
  username: z.string().min(1, 'Please enter your username'),
  password: z.string().min(1, 'Please enter your password'),
});

const registerSchema = z.object({
  username: z.string().min(1, 'Username field cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['User', 'Admin'], { required_error: 'Please select a role' }),
});

type FormData = z.infer<typeof loginSchema> & Partial<z.infer<typeof registerSchema>>;

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(type === 'login' ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const now = new Date().toISOString(); // generate waktu ISO string sekarang

      const payload = {
        username: data.username,
        password: data.password,
        ...(type === 'register' && {
          role: data.role,
          createdAt: now,
          updatedAt: now,
        }),
      };

      console.log('Payload yang dikirim:', payload);

      const res = await api.post(type === 'login' ? '/auth/login' : '/auth/register', payload);

      // Simpan token dan user
      localStorage.setItem('token', res.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: data.username,
          role: type === 'register' ? data.role : 'User',
        })
      );

      // Redirect sesuai role
      const userRole = (type === 'register' ? data.role : 'User')?.toLowerCase();
      if (userRole === 'admin') {
        window.location.href = '/admin/articles';
      } else {
        window.location.href = '/articles';
      }
    } catch (err: any) {
      console.error('Error saat login/register:', err.response?.data);

      const errorMessage = err.response?.data?.error;

      if (errorMessage?.includes('Unique constraint failed')) {
        alert('Username sudah digunakan. Silakan pilih username lain.');
      } else {
        alert(errorMessage || 'Terjadi kesalahan saat login/register');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-left">
      <div className="flex justify-center mb-6">
        <img src="/logo.png" alt="Logo" className="h-6" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="text-sm font-medium">Username</label>
          <Input placeholder="Input username" {...register('username')} />
          {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <Input type={showPassword ? 'text' : 'password'} placeholder="Input password" {...register('password')} className="pr-10" />
            <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        {/* Role (hanya saat register) */}
        {type === 'register' && (
          <div>
            <label className="text-sm font-medium">Role</label>
            <select {...register('role')} className="w-full mt-1 border rounded-md px-3 py-2 text-sm">
              <option value="">Select Role</option>
              <option value="User">User</option> {/* Capital U */}
              <option value="Admin">Admin</option> {/* Capital A */}
            </select>
            {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
          </div>
        )}

        {/* Submit */}
        <Button type="submit" className="w-full bg-[#2563EB] hover:bg-[#3b82f6]" disabled={loading}>
          {type === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 underline">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 underline">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
