"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Save } from "lucide-react";

export default function SettingsForm() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successKey, setSuccessKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
      } catch (error) {
        console.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    setSavingKey(key);
    setSuccessKey(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: settings[key] }),
      });
      
      if (res.ok) {
        setSuccessKey(key);
        setTimeout(() => setSuccessKey(null), 3000);
      }
    } catch (error) {
      console.error("Failed to save setting");
    } finally {
      setSavingKey(null);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-brand-blue" /></div>;
  }

  const fields = [
    { key: "hero_title", label: "Hero Headline (HTML allowed)", type: "textarea" },
    { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
    { key: "contact_phone", label: "Contact Phone Number (Include Country Code)", type: "text" },
    { key: "whatsapp_message", label: "Pre-filled WhatsApp Message", type: "textarea" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Save className="mr-2 text-brand-blue" /> Site Content Settings
      </h2>

      <div className="space-y-8">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{field.label}</label>
            <div className="flex gap-4 items-start">
              {field.type === "textarea" ? (
                <textarea
                  value={settings[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={3}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              ) : (
                <input
                  type={field.type}
                  value={settings[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              )}
              <button
                onClick={() => handleSave(field.key)}
                disabled={savingKey === field.key}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors flex items-center min-w-[120px] justify-center"
              >
                {savingKey === field.key ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : successKey === field.key ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
