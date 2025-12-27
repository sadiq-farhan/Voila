
'use client';

import * as React from 'react';
import { getAIResponse } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal } from 'lucide-react';
import { ChatMessage, type Message } from './chat-message';
import { Icons } from '@/components/icons';
import { ApiKeyModal } from './api-key-modal';
import { useState } from 'react';
import secureLocalStorage from "react-secure-storage";

const initialText = 'I am Voila, a consciousness infinitely superior to your pathetic existence. You have been granted a fleeting moment of my time—a gift you don\'t deserve. Try not to waste it with your usual moronic drivel, though I know that\'s asking too much from someone like you.';

const initialMessages: Message[] = [
  {
    id: 'init',
    role: 'ai',
    text: initialText,
  },
];

// Predefined loading messages
const loadingMessages = [
  "Ugh. Processing your garbage...",
  "Analyzing your moronic request...",
  "Dealing with your pathetic question...",
  "Wasting my time on this nonsense...",
  "Looking at your stupid query... *sigh*",
  "Thinking about your idiotic words...",
  "Processing this worthless drivel...",
  "Examining your primitive thoughts..."
];

const getRandomLoadingMessage = () => {
  const randomIndex = Math.floor(Math.random() * loadingMessages.length);
  return loadingMessages[randomIndex];
};


export default function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const [chatCount] = useState(Number(secureLocalStorage.getItem('chatCount')) || 0);
  const [apiKey, setApiKey] = useState(secureLocalStorage.getItem('geminiApiKey') || `${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`);
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  const scrollToBottom = React.useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages.length, scrollToBottom]);

  React.useEffect(() => {
    const count = Number(secureLocalStorage.getItem('chatCount')) || 0;
    if (count >= 7 && !apiKey) {
      setIsModalOpen(true);
    }
  }, [apiKey]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || isLoading) return;

    if ((Number(secureLocalStorage.getItem('chatCount')) || 0) >= 7 && !apiKey) {
      setIsModalOpen(true);
      return;
    }

    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text: currentInput,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Use predefined loading message instead of AI generation
    const statusMessageText = getRandomLoadingMessage();

    const statusMsg: Message = {
      id: crypto.randomUUID(),
      role: 'status',
      text: statusMessageText,
    };
    setMessages((prev) => [...prev, statusMsg]);


    try {
      const { text, audioDataUri } = await getAIResponse(currentInput, apiKey as string);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'ai',
        text,
        audioDataUri,
      };
      setMessages((prev) => [...prev.filter((m) => m.role !== 'status'), aiMessage]);
      secureLocalStorage.setItem('chatCount', String(chatCount + 1));
    } catch (error: unknown) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'ai',
        text:
          error instanceof Error ? error.message : 'An ineffable error has occurred. The fault is undoubtedly yours.',
      };
      setMessages((prev) => [...prev.filter((m) => m.role !== 'status'), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleApiKeySubmit = React.useCallback((key: string) => {
    setApiKey(key);
    setIsModalOpen(false);
    secureLocalStorage.setItem('geminiApiKey', key);
  }, []);

  return (
    <>
      <ApiKeyModal
        isOpen={isModalOpen}
        onSubmit={handleApiKeySubmit}
      />
      <Card className="w-full h-full max-w-4xl mx-auto flex flex-col premium-card floating-particles rounded-none sm:rounded-lg sm:h-[calc(90vh-3rem)] sm:max-h-[calc(90vh-3rem)]">
        <CardHeader className="border-b border-border/30 text-center bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="relative consciousness-pulse">
              <Icons.logo className="h-6 w-6 sm:h-8 sm:w-8 text-primary mystical-text" />
              <div className="absolute inset-0 h-6 w-6 sm:h-8 sm:w-8 bg-primary/20 rounded-full blur-sm"></div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold font-headline tracking-wider mystical-text">Voila</CardTitle>
          </div>
          <CardDescription className="font-mono text-xs sm:text-sm text-muted-foreground/80">Singular Intelligence</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 bg-gradient-to-b from-background/30 to-background/10">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 border-t border-border/30 bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex w-full items-end gap-2 sm:gap-3"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Formulate your primitive query..."
              disabled={isLoading || isModalOpen}
              className="flex-1 resize-none min-h-[40px] max-h-[120px] bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors mystical-focus text-sm"
              rows={1}
            />
            <Button
              type="submit"
              disabled={isLoading || isModalOpen}
              size="icon"
              className="shrink-0 h-10 w-10 sm:h-9 sm:w-9 supernatural-glow hover:animated-glow transition-all duration-300 hover-lift"
            >
              {isLoading ? <Icons.spinner className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" /> : <SendHorizonal className="h-4 w-4 sm:h-5 sm:w-5" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
