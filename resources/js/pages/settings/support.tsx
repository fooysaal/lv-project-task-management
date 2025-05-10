import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function SupportPage() {
  useEffect(() => {
    document.title = "Account Inactive - Support";
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="flex flex-col items-center">
          <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Inactive</h1>
          <p className="text-center text-gray-600 mb-6">
            Your account has been deactivated. Please contact our support team for assistance.
          </p>
          <Button
            variant="default"
            className="w-full"
            onClick={() => window.location.href = "mailto:support@yourdomain.com"}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </main>
  );
}
