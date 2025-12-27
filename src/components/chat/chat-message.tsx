'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BrainCircuit, User } from 'lucide-react';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export interface Message {
  id: string;
  role: 'user' | 'ai' | 'status';
  text: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = React.memo(function ChatMessage({ message }: ChatMessageProps) {
  const { role, text } = message;
  const isUser = role === 'user';
  const isStatus = role === 'status';

  if (isStatus) {
    return (
      <div className="flex gap-2 sm:gap-3 items-start">
        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 supernatural-glow">
          <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-primary border border-primary/30 text-xs sm:text-sm font-semibold">
            <BrainCircuit className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="inline-block bg-gradient-to-br from-card/95 to-card/80 text-card-foreground border border-border/50 backdrop-blur-sm rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base">
            <p className="text-muted-foreground/80 italic animate-pulse">{text}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    // User messages - aligned to the right
    return (
      <div className="flex gap-2 sm:gap-3 items-start justify-end">
        <div className="max-w-[85%] sm:max-w-[80%]">
          <div className="bg-primary text-primary-foreground rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base shadow-lg supernatural-glow">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 supernatural-glow">
          <AvatarFallback className="bg-primary/20 text-primary border border-primary/30 text-xs sm:text-sm font-semibold">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  // AI messages - aligned to the left
  return (
    <div className="flex gap-2 sm:gap-3 items-start">
      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 supernatural-glow">
        <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-primary border border-primary/30 text-xs sm:text-sm font-semibold">
          <BrainCircuit className="h-4 w-4 sm:h-5 sm:w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 max-w-[85%] sm:max-w-[80%]">
        <div className="bg-gradient-to-br from-card/95 to-card/80 text-card-foreground border border-border/50 backdrop-blur-sm hover:border-primary/30 rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base shadow-lg transition-all duration-300">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code: ({ inline, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className="bg-background/50 rounded-lg p-3 sm:p-4 overflow-x-auto my-2 border border-border/30">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-background/50 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-border/30" {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              h1: ({ children }) => <h1 className="text-xl sm:text-2xl font-bold mb-3 mt-4 first:mt-0">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg sm:text-xl font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base sm:text-lg font-semibold mb-2 mt-2 first:mt-0">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
              li: ({ children }) => <li className="ml-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary/50 pl-4 italic my-2 text-muted-foreground">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-2">
                  <table className="min-w-full border border-border/30 rounded-lg">{children}</table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => <tr className="border-b border-border/30 last:border-0">{children}</tr>,
              th: ({ children }) => <th className="px-3 py-2 text-left font-semibold text-xs sm:text-sm">{children}</th>,
              td: ({ children }) => <td className="px-3 py-2 text-xs sm:text-sm">{children}</td>,
              a: ({ children, href }) => (
                <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.text === nextProps.message.text &&
    prevProps.message.role === nextProps.message.role
  );
});
