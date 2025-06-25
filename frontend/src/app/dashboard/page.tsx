'use client'
import Image from 'next/image';
export default function DashboardHome() {

  return (
    <div className="h-full bg-white md:ml-0 p-4">
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
