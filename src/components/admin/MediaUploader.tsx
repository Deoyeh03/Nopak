"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2, Loader2 } from "lucide-react";

const CATEGORIES = ["General", "Swimming Pools", "Wendy Houses", "Renovations", "Tree Felling", "Plumbing"];

export default function MediaUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("General");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccess(false);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(10);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("caption", caption);

    try {
      // Simulate progress for UI
      const interval = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 500);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      setSuccess(true);
      setFile(null);
      setCaption("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <UploadCloud className="mr-2 text-brand-blue" /> Upload New Media
      </h2>

      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Caption (Optional)</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Modern Infinity Pool in Sandton"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="relative">
          <button
            type="submit"
            disabled={!file || isUploading}
            className={`w-full py-3 font-bold rounded-lg transition-colors flex items-center justify-center ${
              success 
                ? "bg-green-500 text-white" 
                : "bg-brand-blue text-white hover:bg-brand-blue/90 disabled:opacity-50"
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" /> Uploaded Successfully
              </>
            ) : (
              "Upload and Publish"
            )}
          </button>

          {isUploading && (
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-gold transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
