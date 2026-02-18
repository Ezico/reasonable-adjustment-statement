"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Loader2 } from "lucide-react";
import { IntakeForm } from "@/components/intake-form";
import { createOrder } from "@/app/actions/orders";
import type { IntakeFormData } from "@/lib/types";
import { toast } from "sonner";

export default function GetStartedPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleComplete = async (data: IntakeFormData, email: string) => {
    setSubmitting(true);
    try {
      const orderId = await createOrder({
        email,
        intakeData: data,
        outputFormat: "personal_letter",
      });
      router.push(`/checkout/${orderId}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium text-foreground">
          Saving your details...
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          You{"'"}ll be redirected to secure checkout shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          ClearGuide
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-primary" />
          Encrypted &amp; GDPR-compliant
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <IntakeForm onComplete={handleComplete} />
      </main>
    </div>
  );
}
