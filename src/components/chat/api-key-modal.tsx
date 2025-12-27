'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ApiKeyModalProps {
  isOpen: boolean;
  onSubmit: (apiKey: string) => void;
}

export function ApiKeyModal({ isOpen, onSubmit }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[95vw] max-w-[425px] premium-card supernatural-glow mx-4" showCloseButton={false}>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm rounded-t-lg p-4 sm:p-6 -m-4 sm:-m-6 mb-4 sm:mb-6">
            <DialogTitle className="mystical-text text-lg sm:text-xl font-bold">Provide Your Key</DialogTitle>
            <DialogDescription className="text-muted-foreground/90 leading-relaxed text-sm">
              My resources are not infinite. To continue this... interaction, you must provide your own Groq API key. It is a simple task. Do not fail.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 px-4 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right text-muted-foreground/90 sm:col-span-1">
                API Key
              </Label>
              <Input
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="sm:col-span-3 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
                placeholder="Enter your Groq API key"
              />
            </div>
            <div className='text-xs text-muted-foreground/80 px-2 bg-muted/30 rounded-lg p-3 border border/30'>
              <h3 className='font-semibold text-foreground mb-2'>How to get a key:</h3>
              <ol className='list-decimal list-inside space-y-1'>
                <li>Go to <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className='text-primary underline hover:text-primary/80 transition-colors'>Groq Console</a>.</li>
                <li>Sign up or log in (instant approval).</li>
                <li>Click &ldquo;Create API Key&rdquo;.</li>
                <li>Copy the generated key and paste it above.</li>
              </ol>
            </div>
          </div>
          <DialogFooter className="bg-gradient-to-r from-background/30 to-background/50 backdrop-blur-sm rounded-b-lg p-4 sm:p-6 -m-4 sm:-m-6 mt-4 sm:mt-6">
            <Button
              type="submit"
              disabled={!apiKey.trim()}
              className="w-full sm:w-auto supernatural-glow hover:animated-glow transition-all duration-300"
            >
              Submit Key
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
