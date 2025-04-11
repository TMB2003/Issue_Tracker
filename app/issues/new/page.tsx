'use client';

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValidationSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>; // Ensure the schema is inferred correctly

// Dynamically import SimpleMDE to disable SSR
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IssueForm>({
    resolver: zodResolver( createIssueSchema ), // Assuming you have a Zod schema for validatio
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitError("Failed to create issue. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">📋 Create a New Issue</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Title Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter a concise issue title"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-5 py-3 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <SimpleMDE placeholder="Provide a detailed issue description" {...field} />
              )}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <p className="text-red-600 text-center text-sm">{submitError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "🚀 Submit New Issue"}
          </button>
        </form>
      </div>
    </div>
  );
}
