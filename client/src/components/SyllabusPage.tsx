// SyllabusPage.tsx
// This component allows the admin to upload a syllabus PDF and preview it on the page.

import { useState } from "react"; // For local state to hold uploaded file
import { useForm } from "react-hook-form"; // For form handling
import { Button } from "@/components/ui/button"; // shadcn button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn card
import { Input } from "@/components/ui/input"; // shadcn styled input

// Define form data type (TypeScript safety)
type FormData = {
  syllabus: FileList; // The syllabus file (PDF)
};

export function SyllabusPage() {
  // State to hold the uploaded PDF file URL (blob)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Initialize form using react-hook-form
  const { register, handleSubmit, reset } = useForm<FormData>();

  // Handle form submission
  const onSubmit = (data: FormData) => {
    const file = data.syllabus?.[0]; // Take the first selected file
    if (file) {
      const url = URL.createObjectURL(file); // Create a temporary URL for preview
      setPdfUrl(url); // Save URL in state
      reset(); // Clear the form input
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Card wrapper for the syllabus upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Syllabus</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Upload form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* File input (only PDFs allowed) */}
            <Input
              type="file"
              accept="application/pdf"
              {...register("syllabus", { required: true })}
            />
            {/* Submit button */}
            <Button type="submit">Upload</Button>
          </form>

          {/* Preview area */}
          <div className="mt-6">
            {pdfUrl ? (
              // If a PDF is uploaded, show preview
              <iframe
                src={pdfUrl}
                title="Syllabus Preview"
                className="w-full h-[600px] border rounded"
              />
            ) : (
              // If no PDF yet, show placeholder text
              <p className="text-gray-500">No syllabus uploaded yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
