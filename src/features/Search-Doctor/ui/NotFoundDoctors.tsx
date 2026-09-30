import * as React from "react";
import { Loader2, RefreshCw, Stethoscope, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * DoctorsNotFound
 * Full-area state for the doctors list (empty API response or request error).
 *
 * Requires: shadcn `button`, `lucide-react`, and the `cn` helper.
 */

type DoctorsNotFoundProps = {
  type?: "empty" | "error";
  title?: string;
  message?: string;
  /** Optional reference shown under the actions (e.g. 500, "NETWORK_ERROR"). */
  errorCode?: string | number;
  /** If it returns a Promise, the button shows a loading state until it settles. */
  onRetry?: () => void | Promise<unknown>;
  onBack?: () => void;
  onContact?: () => void;
  className?: string;
};

const COPY = {
  empty: {
    title: "No doctors available right now",
    message:
      "We couldn't find any doctors to show at the moment. New doctors are added regularly, so check back soon.",
  },
  error: {
    title: "We couldn't load the doctors",
    message:
      "Something went wrong while fetching the list. Please try again in a moment.",
  },
} as const;

export default function DoctorsNotFound({
  type = "empty",
  title,
  message,
  errorCode,
  onRetry,
  onBack,
  onContact,
  className,
}: DoctorsNotFoundProps) {
  const isError = type === "error";
  const copy = COPY[type];
  const [retrying, setRetrying] = React.useState(false);

  const handleRetry = async () => {
    if (!onRetry || retrying) return;
    try {
      setRetrying(true);
      await onRetry();
    } finally {
      setRetrying(false);
    }
  };

  const Icon = isError ? TriangleAlert : Stethoscope;

  return (
    <section
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={cn(
        "mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-6 py-12 text-center",
        className
      )}
    >
      {/* Layered icon: outer ring > inner disc > icon */}
      <div
        className={cn(
          "flex size-28 items-center justify-center rounded-full",
          isError ? "bg-destructive/5" : "bg-primary/5"
        )}
      >
        <div
          className={cn(
            "flex size-20 items-center justify-center rounded-full",
            isError ? "bg-destructive/10" : "bg-primary/10"
          )}
        >
          <Icon
            className={cn("size-9", isError ? "text-destructive" : "text-primary")}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
        {title ?? copy.title}
      </h2>
      <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
        {message ?? copy.message}
      </p>

      {(onRetry || onBack) && (
        <div className="mt-8 flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
          {onBack && (
            <Button variant="outline" size="lg" onClick={onBack}>
              Back to home
            </Button>
          )}
          {onRetry && (
            <Button
              size="lg"
              variant={isError ? "destructive" : "default"}
              onClick={handleRetry}
              disabled={retrying}
              aria-busy={retrying}
            >
              {retrying ? (
                <Loader2 className="animate-spin motion-reduce:animate-none" />
              ) : (
                <RefreshCw />
              )}
              {retrying ? "Trying again…" : isError ? "Try again" : "Refresh list"}
            </Button>
          )}
        </div>
      )}

      {isError && (onContact || errorCode) && (
        <div className="mt-6 space-y-1 text-sm text-muted-foreground">
          {onContact && (
            <p>
              Still not working?{" "}
              <Button variant="link" className="h-auto p-0" onClick={onContact}>
                Contact support
              </Button>
            </p>
          )}
          {errorCode && (
            <p className="text-xs">Error reference: {errorCode}</p>
          )}
        </div>
      )}
    </section>
  );
}