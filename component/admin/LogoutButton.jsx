"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ className }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
}