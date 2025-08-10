import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="text-lg text-gray-700">
        Welcome to the admin panel. Here you can manage and update your site content through the navigation menu above.
      </p>
    </div>
  );
}
