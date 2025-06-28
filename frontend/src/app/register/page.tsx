'use client'
import UserForm from "@/components/forms/UserForm";
import { register } from "@/services/authService";
import { IRole, type IUserFormData } from '@/types/User';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter()

  const defaultInitialData: IUserFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    postalCode: '',
    street: '',
    city: '',
    state: '',
    district: '',
    number: '',
    complement: '',
    role: IRole.CLIENT,
    canViewLogs: false,
    canSchedule: false,
    status: false
  };

  

async function handleRegisterSubmit(data: IUserFormData) {
  await register(data);
  toast.success('Cadastro realizado com sucesso!');
  router.push('/login');
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 w-full">
     <UserForm mode="register" onSubmit={handleRegisterSubmit} initialData={defaultInitialData} />
    </div>
  );
}
