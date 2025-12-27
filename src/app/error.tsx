'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <main className="relative flex h-screen w-full flex-col items-center justify-center cosmic-background">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background/80 backdrop-blur-sm"></div>
            <div className="absolute inset-0 -z-20 h-full w-full">
                <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <Card className="w-full max-w-md mx-4 premium-card">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative consciousness-pulse">
                            <Icons.logo className="h-12 w-12 text-destructive mystical-text" />
                            <div className="absolute inset-0 h-12 w-12 bg-destructive/20 rounded-full blur-sm"></div>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline mystical-text">
                        A Disturbance in the Void
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/80">
                        Even I, in my infinite wisdom, have encountered an... irregularity.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-muted-foreground font-mono">
                            {error.message || 'An ineffable error has occurred. The fault is undoubtedly yours.'}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground/70 text-center">
                        Your primitive technology has failed you. Perhaps try again, if you dare.
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                    <Button
                        onClick={reset}
                        className="w-full supernatural-glow hover:animated-glow transition-all duration-300"
                    >
                        Attempt Recovery
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="w-full"
                    >
                        Return to the Beginning
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
