import { redirect } from "next/navigation";

export default function AdminPage() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api" : "");
  const adminUrl =
    process.env.NEXT_PUBLIC_ADMIN_URL ||
    (apiUrl ? `${apiUrl.replace(/\/api\/?$/, "")}/admin/` : null);

  if (!adminUrl) {
    return <p className="p-6 text-sm text-muted-foreground">Django Admin is not configured. Set NEXT_PUBLIC_ADMIN_URL in the frontend environment.</p>;
  }

  redirect(adminUrl);
}
