import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MediaUploader from "@/components/admin/MediaUploader";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-brand-blue text-white p-4 md:px-8 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Nopak Admin Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid gap-8 md:grid-cols-2">
        <section>
          <MediaUploader />
        </section>
        
        <section>
          <SettingsForm />
        </section>
      </main>
    </div>
  );
}
