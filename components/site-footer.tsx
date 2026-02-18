import { Shield } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <p className="text-sm font-semibold text-foreground">ClearGuide</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          Your data is encrypted, never shared, and deleted after 30 days.
        </div>
        <p className="text-xs text-muted-foreground">
          Grounded in the UK Equality Act 2010. This service does not
          constitute legal advice.
        </p>
      </div>
    </footer>
  )
}
