import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { fileToBase64 } from "@/utils/toBase64";

type FormData = {
  syllabus: FileList;
};

const STORAGE_KEY = "uploaded_syllabus_base64";

export function SyllabusPage() {
  const [pdfData, setPdfData] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { isAuth } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPdfData(saved);
  }, []);

  const onSubmit = async (data: FormData) => {
    const file = data.syllabus?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setPdfData(base64);
      localStorage.setItem(STORAGE_KEY, base64);
      reset();
    }
  };

  const clearSyllabus = () => {
    setPdfData(null);
    localStorage.removeItem(STORAGE_KEY);
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
              {pdfData && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearSyllabus}
                  className="w-auto"
                >
                  Clear
                </Button>
              )}
            </form>
          ) : (
            <p className="text-sm text-gray-500 mb-6">
              You must be logged in to upload. Guests can only view or download
              the syllabus.
            </p>
          )}

          {pdfData ? (
            <div className="space-y-4">
              <iframe
                src={pdfData}
                title="Syllabus Preview"
                className="w-full h-[calc(100vh-250px)] border rounded"
              />
              <a
                href={pdfData}
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
