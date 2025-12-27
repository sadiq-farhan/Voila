import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <main className="relative flex h-screen w-full flex-col items-center justify-center cosmic-background">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background/80 backdrop-blur-sm"></div>
            <div className="absolute inset-0 -z-20 h-full w-full">
                <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="w-full h-full sm:h-auto sm:max-w-4xl sm:mx-4">
                <Card className="w-full h-full max-w-4xl mx-auto flex flex-col premium-card floating-particles rounded-none sm:rounded-lg sm:h-[calc(90vh-3rem)] sm:max-h-[calc(90vh-3rem)]">
                    <CardHeader className="border-b border-border/30 text-center bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" />
                            <Skeleton className="h-6 w-32 sm:h-8 sm:w-40" />
                        </div>
                        <Skeleton className="h-4 w-48 mx-auto mt-2" />
                    </CardHeader>

                    <CardContent className="flex-1 overflow-hidden p-0 bg-gradient-to-b from-background/30 to-background/10">
                        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
                            {/* Loading message skeleton */}
                            <div className="flex gap-3">
                                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <div className="p-3 sm:p-4 border-t border-border/30 bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm">
                        <div className="flex w-full items-end gap-2 sm:gap-3">
                            <Skeleton className="flex-1 h-10" />
                            <Skeleton className="h-10 w-10 sm:h-9 sm:w-9" />
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}
