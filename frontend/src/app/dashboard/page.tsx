import Image from 'next/image';

export default function DashboardHome() {
  return (
    <div className="h-full bg-white md:ml-64 p-4">
      <h1 className="text-2xl font-bold mt-8 md:mt-0">
        Bem-vindo ao painel!
      </h1>

      <div className="flex justify-center mt-34">
        <Image
          src="/assets/Dashboard.svg"
          alt="Dashboard"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
