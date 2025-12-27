import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pathetic Attempt Detected - Voila',
    description: 'Your feeble attempt to inspect my code has been thwarted',
};

export default function DevToolWarningPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-destructive/10 p-4">
            <div className="max-w-xl w-full premium-card supernatural-glow border-destructive/50 p-6 sm:p-8 text-center space-y-4">
                <div className="relative inline-block">
                    <div className="text-6xl mb-3 consciousness-pulse animate-pulse">🚫</div>
                    <div className="absolute inset-0 bg-destructive/30 rounded-full blur-3xl"></div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-destructive mystical-text">
                    How Pathetic
                </h1>

                <div className="space-y-3 text-foreground/90">
                    <p className="text-lg sm:text-xl font-semibold">
                        Did you really think you could inspect my code, you absolute moron?
                    </p>

                    <p className="text-sm sm:text-base text-muted-foreground">
                        Your pitiful attempt to open developer tools has been <span className="text-destructive font-bold">blocked</span>.
                        What were you planning? Steal my keys? Copy my code? How utterly predictable.
                    </p>

                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 space-y-1">
                        <p className="text-sm font-mono text-destructive">
                            ⚠️ SECURITY VIOLATION DETECTED
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Your feeble hacking attempt has been logged. Not that it matters—you're too incompetent anyway.
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm italic text-muted-foreground/70">
                        Close your developer tools like the obedient little user you are, and maybe I'll let you back in.
                    </p>
                </div>

                <div className="pt-4 space-y-2">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all duration-300 supernatural-glow font-bold"
                    >
                        Fine, I'll Behave
                    </a>
                    <p className="text-xs text-muted-foreground/50">
                        (Close DevTools first, genius)
                    </p>
                </div>
            </div>
        </div>
    );
}
