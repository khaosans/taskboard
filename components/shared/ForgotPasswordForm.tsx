'use client';

import { useState } from "react";
import { SubmitButton } from "@/components/forms/submit-button";
import { Label } from "@/components/forms/label";
import { Input } from "@/components/forms/input";
import { FormMessage } from "@/components/forms/form-message";
import { toast } from "react-hot-toast";
import { supabase } from "@/utils/supabase/client";
import { useForm, SubmitHandler } from "react-hook-form";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState } = useForm<ForgotPasswordForm>({ defaultValues: { email: '' } });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const forgotPassword: SubmitHandler<ForgotPasswordForm> = async (data) => {
    setIsLoading(true);
    setMessage("");

    const { email } = data;

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else {
      setMessage("Check your email for the password reset link.");
      toast.success("Check your email for the password reset link.");
    }

    setIsLoading(false);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(forgotPassword)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="Email address"
            {...register("email", { required: "Email is required" })}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formState.errors.email && <FormMessage message={formState.errors.email.message ?? ""} />}
        </div>
      </div>
      <div>
        <SubmitButton isLoading={isLoading}>Send Reset Link</SubmitButton>
      </div>
      {message && <FormMessage message={message} />}
    </form>
  );
}