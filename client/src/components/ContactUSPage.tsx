import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Toast } from "./Toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Must be a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactUSPage() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const onSubmit = (data: ContactFormData) => {
    setToast({
      message: "Thank you for your message! We will contact you shortly.",
      type: "success",
    });
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-green-50 to-green-100 dark:from-zinc-900 dark:to-zinc-800 rounded-lg shadow-lg transition-colors duration-500">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-green-700 dark:text-emerald-300 drop-shadow-md">
        Contact Us
      </h1>
      <div className="flex flex-col md:flex-row bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden transition">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 p-10 space-y-6"
          noValidate
        >
          <div className="relative">
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Your name"
              className={`w-full border rounded-md px-4 py-3 pl-10 bg-white dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow ${
                errors.name
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-zinc-600"
              }`}
            />
            <span className="absolute left-3 top-11 text-green-400 dark:text-emerald-400 pointer-events-none">
              👤
            </span>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 min-h-[1.25rem] max-h-[1.25rem] overflow-hidden break-words">
              {errors.name ? errors.name.message : "\u00A0"}
            </p>
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full border rounded-md px-4 py-3 pl-10 bg-white dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow ${
                errors.email
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-zinc-600"
              }`}
            />
            <span className="absolute left-3 top-11 text-green-400 dark:text-emerald-400 pointer-events-none">
              📧
            </span>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 min-h-[1.25rem] max-h-[1.25rem] overflow-hidden break-words">
              {errors.email ? errors.email.message : "\u00A0"}
            </p>
          </div>

          <div className="relative">
            <label
              htmlFor="message"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={6}
              placeholder="Write your message here..."
              className={`w-full border rounded-md px-4 py-3 resize-none pl-10 bg-white dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow ${
                errors.message
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-zinc-600"
              }`}
            />
            <span className="absolute left-3 top-11 text-green-400 dark:text-emerald-400 pointer-events-none">
              💬
            </span>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 min-h-[1.25rem] max-h-[1.25rem] overflow-hidden break-words">
              {errors.message ? errors.message.message : "\u00A0"}
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-md text-white transition shadow-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
          >
            Send Message
          </button>
        </form>

        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="https://img.freepik.com/premium-photo/woman-cooking-food-baking-kitchen-home_380164-275705.jpg?w=360"
            alt="Delicious food"
            className="h-full w-full object-cover rounded-r-lg"
          />
          <div className="absolute inset-0 bg-green-900 dark:bg-zinc-950 opacity-20 dark:opacity-40 rounded-r-lg"></div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
