import { redirect } from "next/navigation";

export default function AdminPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || `${apiUrl.replace(/\/api\/?$/, "")}/admin/`;
  redirect(adminUrl);
}
