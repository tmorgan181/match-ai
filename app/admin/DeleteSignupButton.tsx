"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteSignupButton({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function remove() {
    const confirmed = window.confirm("Delete this notification signup?");
    if (!confirmed) return;

    setDeleting(true);
    await fetch(`/api/admin/notify/${id}`, { method: "DELETE" });
    setDeleting(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={deleting}
      className="px-2.5 py-1 rounded-full text-xs font-medium border bg-red-950/40 text-red-300 border-red-800 hover:border-red-600 transition-colors disabled:opacity-50"
    >
      Delete
    </button>
  );
}
