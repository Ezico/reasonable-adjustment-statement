import Link from "next/link";
import { CheckCircle2, Mail, Clock, Shield, FileText } from "lucide-react";
import { getOrder } from "@/app/actions/orders";
import { notFound } from "next/navigation";
import { DownloadButton } from "@/components/download-button";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    notFound();
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
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-16 md:px-6">
        <div className="mx-auto max-w-lg text-center">
          {/* Success icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>

          <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
            Payment confirmed
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Thank you for your purchase. Your Reasonable Adjustment Statement is
            being prepared.
          </p>

          {/* What happens next */}
          <div className="mt-10 rounded-xl border border-border bg-card p-6 text-left">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
              What happens next
            </h2>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Statement generation
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Your information is being used to draft a professionally
                    formatted Reasonable Adjustment Statement.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Email delivery</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Your PDF will be sent to{" "}
                    <span className="font-medium text-foreground">
                      {order.email}
                    </span>{" "}
                    within 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Typical delivery
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Most statements are delivered within 2-6 hours. Check your
                    inbox (and spam folder) for an email from ClearGuide.
                  </p>
                </div>
              </div>
            </div>

            {/* Debug download button 
            /*<DownloadButton orderId={orderId} />*/}
          </div>

          {/* Order reference */}
          <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-4">
            <p className="text-xs text-muted-foreground">Order reference</p>
            <p className="mt-1 font-mono text-sm text-foreground">{orderId}</p>
          </div>

          {/* Privacy note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            Your data is encrypted and will be deleted after 30 days.
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Return to homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
