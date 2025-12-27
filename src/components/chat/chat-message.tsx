
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrainCircuit, Pause, Play, User } from 'lucide-react';
import * as React from 'react';

export interface Message {
  id: string;
  role: 'user' | 'ai' | 'status';
  text: string;
  audioDataUri?: string;
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessageComponent({ message }: ChatMessageProps) {
  const { role, text, audioDataUri } = message;
  const isUser = role === 'user';
  const isStatus = role === 'status';

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (audioDataUri && audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed.", e);
        setIsPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, audioDataUri]);

  const togglePlayback = React.useCallback(() => {
    if (!audioDataUri) return;
    setIsPlaying(prev => !prev);
  }, [audioDataUri]);

  if (isStatus) {
    return (
      <div className="flex items-start gap-3 animate-pulse">
        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border border-border/30 bg-background/50 backdrop-blur-sm shrink-0">
          <AvatarFallback className="bg-transparent">
            <BrainCircuit className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground/80 italic leading-relaxed pt-1">
            {text}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-end gap-2 sm:gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border border-border/30 shrink-0 bg-background/50 backdrop-blur-sm">
        <AvatarFallback className={cn(
          isUser ? 'bg-primary/20 text-primary' : 'bg-transparent text-muted-foreground'
        )}>
          {isUser ? <User className="h-3 w-3 sm:h-4 sm:w-4" /> : <BrainCircuit className="h-3 w-3 sm:h-4 sm:w-4" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'group relative flex-1 space-y-2 rounded-xl px-3 py-2 sm:px-4 sm:py-3 max-w-[85%] transition-all duration-300 shadow-sm',
          isUser
            ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary-foreground border border-primary/30 backdrop-blur-sm'
            : 'bg-gradient-to-r from-muted/50 to-muted/30 border border-border/30 backdrop-blur-sm hover:border-border/50'
        )}
      >
        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
        {!isUser && audioDataUri && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 h-6 w-6 sm:h-7 sm:w-7 rounded-full text-muted-foreground bg-background/80 backdrop-blur-sm border border-border/30 hover:border-primary/50 hover:text-primary transition-all duration-300"
              onClick={togglePlayback}
            >
              {isPlaying ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
              <span className="sr-only">Play/Pause</span>
            </Button>
            <audio
              ref={audioRef}
              src={audioDataUri}
              className="hidden"
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export const ChatMessage = React.memo(ChatMessageComponent, (prevProps, nextProps) => {
  return prevProps.message.id === nextProps.message.id &&
    prevProps.message.text === nextProps.message.text &&
    prevProps.message.audioDataUri === nextProps.message.audioDataUri;
});

ChatMessage.displayName = 'ChatMessage';
