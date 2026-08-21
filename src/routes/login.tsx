import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { ChiefMark } from "@/components/quiz/chief-mark";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="flex w-full max-w-sm flex-col items-center space-y-4 text-center">
        <ChiefMark className="mb-2" />
        <h1 className="font-display text-3xl font-semibold tracking-tight text-cream">
          Sign in
        </h1>
        <p className="text-sm text-muted">Staff access only. The quiz itself is open.</p>
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
            >
              Continue with {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-subtle">Sign-in is disabled.</p>
        )}
      </div>
    </main>
  );
}
