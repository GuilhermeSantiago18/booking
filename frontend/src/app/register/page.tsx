'use client'
import UserForm from "@/components/forms/UserForm";
import { register } from "@/services/authService";
import type { IUserFormData } from '@/types/User';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter()

async function handleRegisterSubmit(data: IUserFormData) {
  const response = await register(data);
  toast.success('Cadastro realizado com sucesso!');
  router.push('/login');
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 w-full">
     <UserForm mode="register" onSubmit={handleRegisterSubmit} />
    </div>
  );
}
