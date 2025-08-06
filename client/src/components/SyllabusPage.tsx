import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

type FormData = {
  syllabus: FileList;
};

export function SyllabusPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { isAuth } = useAuth();

  const onSubmit = (data: FormData) => {
    const file = data.syllabus?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      reset();
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full rounded-none border-0 shadow-none">
        <CardHeader>
          <CardTitle>Syllabus</CardTitle>
        </CardHeader>
        <CardContent>
          {isAuth ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center gap-4 mb-6"
            >
              <Input
                type="file"
                accept="application/pdf"
                {...register("syllabus", { required: true })}
                className="w-auto"
              />
              <Button type="submit" className="w-auto">
                Upload
              </Button>
            </form>
          ) : (
            <p className="text-sm text-gray-500 mb-6">
              You must be logged in to upload. Guests can only view or download
              the syllabus.
            </p>
          )}

          {pdfUrl ? (
            <div className="space-y-4">
              <iframe
                src={pdfUrl}
                title="Syllabus Preview"
                className="w-full h-[calc(100vh-250px)] border rounded"
              />
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-sm font-medium"
              >
                Open Syllabus in New Tab
              </a>
            </div>
          ) : (
            <p className="text-gray-500">
              {isAuth
                ? "No syllabus uploaded yet."
                : "No syllabus available for viewing yet."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
