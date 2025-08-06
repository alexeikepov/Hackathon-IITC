export function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-[#0f172a] text-sm text-gray-600 dark:text-gray-400 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-700 dark:text-gray-300">
            LMS-HUB — Empowering Teachers.
          </p>
          <p className="text-xs mt-1">© 2025 LMS-HUB. All rights reserved.</p>
        </div>

        <div className="flex gap-4 text-xs">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/support" className="hover:underline">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
