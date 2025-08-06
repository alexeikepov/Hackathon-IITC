export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-semibold text-foreground">
            LMS-HUB — Empowering Teachers
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LMS-HUB. All rights reserved.
          </p>
        </div>

        <div className="flex gap-6 text-xs text-muted-foreground">
          <a
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a
            href="/support"
            className="hover:text-foreground transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
