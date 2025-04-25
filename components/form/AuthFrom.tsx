'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from '@/lib/axios';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

interface AuthFormProps {
  type: 'login' | 'register';
  role: 'user' | 'admin';
}

export default function AuthForm({ type, role }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await axios.post(`/${role}/${type}`, data);
      window.location.href = `/${role === 'admin' ? 'admin/articles' : 'articles'}`;
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm w-full">
      <Input placeholder="Email" {...register('email')} />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>
      <Input type="password" placeholder="Password" {...register('password')} />
      <p className="text-red-500 text-sm">{errors.password?.message}</p>
      <Button type="submit" disabled={loading}>
        {type === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  );
}
