'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/zodValidation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import LinearGradient from "@/components/magicui/linear-gradient";
import ShineBorder from "@/components/magicui/shine-border";

export default function SignInForm() {
  const router = useRouter();
  const [isVerfied, setIsVerified] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.email,
      password: data.password,
    });
    if (result?.error) {
      if (result.error === 'Error: Verify your account before logging in') {
        setIsVerified(false)
        setIsSubmitting(false)
        toast({
          title: 'Error',
          description: 'Verify your account before logging in',
          variant: 'destructive',
        });
      } else {
        setIsVerified(true)
        setIsSubmitting(false)
        toast({
          title: 'Login Failed',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-black/0 relative">
      <ShineBorder className="w-full max-w-sm md:max-w-md md:px-5 md:py-4 px-6 py-3 space-y-8 bg-white dark:bg-black/0 rounded-lg shadow-lg border" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-6">
            Welcome Back to SomeThink
          </h1>

        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field}  className='dark:bg-black/0 bg-slate-50'/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} className='dark:bg-black/0 bg-slate-50'/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            {isVerfied ? 'Not a member yet? ' : 'Not verified yet? '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              {isVerfied ? 'Sign up' : 'Verify'}
            </Link>
          </p>
        </div>
      </ShineBorder>
      <LinearGradient />
    </div>
  );
}