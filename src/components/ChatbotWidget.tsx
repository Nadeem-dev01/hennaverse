"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No reader');

      let assistantMessageContent = '';
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Vercel AI SDK streams text in a specific format usually, 
        // e.g., '0:"Hello"\n'. But if we used toTextStreamResponse(), 
        // it just streams the raw text. Let's append the raw text.
        const chunk = decoder.decode(value, { stream: true });
        
        // Vercel AI SDK toTextStreamResponse streams raw text without the protocol 0:""
        // Wait, toTextStreamResponse DOES stream raw text!
        assistantMessageContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          updated[lastIndex] = { ...updated[lastIndex], content: assistantMessageContent };
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-surface border border-border shadow-2xl rounded-2xl w-80 sm:w-96 overflow-hidden flex flex-col mb-4 max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-purple text-white p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-base leading-tight">Mehndi Assistant</h3>
                  <p className="text-xs opacity-80">Ask about designs, categories, or tips</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-background/50 min-h-[300px]">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted opacity-70">
                  <Bot className="w-12 h-12 mb-3" />
                  <p className="text-sm">Hi! I can help you find specific mehndi designs or henna advice. What are you looking for?</p>
                </div>
              ) : (
                messages.map(m => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        m.role === 'user'
                          ? 'bg-purple text-white rounded-tr-sm'
                          : 'bg-surface border border-border text-foreground shadow-sm rounded-tl-sm'
                      }`}
                    >
                      {m.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none break-words
                                        prose-a:text-gold prose-a:font-semibold hover:prose-a:underline">
                          <ReactMarkdown
                            components={{
                              a: ({ node, ...props }) => {
                                if (props.href?.startsWith('/')) {
                                  return (
                                    <Link href={props.href} {...props} onClick={() => setIsOpen(false)}>
                                      {props.children}
                                    </Link>
                                  );
                                }
                                return <a target="_blank" rel="noopener noreferrer" {...props} />;
                              }
                            }}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm">{m.content}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-border shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-purple/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-surface border-t border-border flex items-center gap-2">
              <input
                className="flex-1 bg-background rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple/50 transition-shadow"
                value={input}
                placeholder="Ask something..."
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-purple text-white p-2.5 rounded-full hover:bg-purple/90 transition-colors disabled:opacity-50 flex-shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-purple text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
