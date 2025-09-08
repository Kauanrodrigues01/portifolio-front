import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { assistantApi } from "../services/assistantApi";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  isError?: boolean;
}

const PageContainer = styled.div`
  padding-top: 70px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ChatHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px 16px 0 0;
  text-align: center;
  position: relative;
`;

const ConnectionStatus = styled.div<{ $connected: boolean | null }>`
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $connected }) => {
      if ($connected === null) return "#fbbf24"; // amarelo para carregando
      return $connected ? "#10b981" : "#ef4444"; // verde para conectado, vermelho para desconectado
    }};
  }

  @media (max-width: 768px) {
    position: static;
    justify-content: center;
    margin-top: 8px;
  }
`;

const ChatTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ChatSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 400px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textMuted};
  }
`;

const MessageBubble = styled.div<{
  $sender: "user" | "ai";
  $isError?: boolean;
}>`
  max-width: 70%;
  padding: 16px 20px;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 0.95rem;
  line-height: 1.5;
  word-wrap: break-word;
  position: relative;
  animation: slideIn 0.3s ease-out;

  ${({ $sender, $isError, theme }) => {
    if ($isError) {
      return `
        align-self: flex-start;
        background: #fee2e2;
        color: #dc2626;
        border: 1px solid #fecaca;
        border-bottom-left-radius: 8px;
      `;
    }

    return $sender === "user"
      ? `
        align-self: flex-end;
        background: linear-gradient(135deg, ${theme.colors.mainRed}, ${theme.colors.mainPurple});
        color: white;
        border-bottom-right-radius: 8px;
      `
      : `
        align-self: flex-start;
        background: ${theme.colors.surface};
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.border};
        border-bottom-left-radius: 8px;
      `;
  }}

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    max-width: 85%;
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;

const MessageTime = styled.div<{ $sender: "user" | "ai" }>`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
  ${({ $sender }) =>
    $sender === "user" ? "text-align: right;" : "text-align: left;"}
`;

const InputContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0 0 16px 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const TextInput = styled.textarea`
  flex: 1;
  padding: 16px 20px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 25px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 0.95rem;
  resize: none;
  min-height: 24px;
  max-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.mainRed};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.mainRed}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`;

const SendButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.mainRed},
    ${({ theme }) => theme.colors.mainPurple}
  );
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.mainRed}30;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.mainRed}40;
  }

  &:active {
    transform: translateY(0) scale(1.02);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  max-width: 70px;
  padding: 16px 20px;
  border-radius: 20px;
  border-bottom-left-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.textMuted};
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;

  h3 {
    font-family: ${({ theme }) => theme.fonts.asap};
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 16px 0;
  }

  p {
    font-family: ${({ theme }) => theme.fonts.mavenPro};
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0 0 24px 0;
    max-width: 400px;
  }
`;

const SuggestionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
`;

const SuggestionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.mainRed};
    color: ${({ theme }) => theme.colors.mainRed};
    background: ${({ theme }) => theme.colors.mainRed}10;
  }
`;

const suggestions = [
  "Fale sobre suas tecnologias favoritas",
  "Como posso entrar em contato?",
  "Quais projetos você desenvolveu?",
  "Conte sobre sua experiência",
];

export const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Testar conexão com a API no carregamento da página
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        const connected = await assistantApi.checkHealth();
        setIsConnected(connected);
      } catch {
        setIsConnected(false);
      }
    };

    testApiConnection();
  }, []);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Tentar usar a API real
      const response = await assistantApi.askQuestion(messageText);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsConnected(true);
    } catch (error) {
      // Em caso de erro, mostrar mensagem de erro
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao processar sua pergunta.",
        sender: "ai",
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsConnected(false);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PageContainer>
      <ChatContainer>
        <ChatHeader>
          <ConnectionStatus $connected={isConnected}>
            {isConnected === null
              ? "Verificando conexão..."
              : isConnected
              ? "Conectado à API"
              : "API offline"}
          </ConnectionStatus>
          <ChatTitle>🤖 AI Assistant</ChatTitle>
          <ChatSubtitle>
            Converse comigo sobre desenvolvimento, projetos e tecnologia!
          </ChatSubtitle>
        </ChatHeader>

        <MessagesContainer>
          {messages.length === 0 ? (
            <EmptyState>
              <h3>👋 Olá! Como posso ajudar?</h3>
              <p>
                {isConnected === false
                  ? "A API está offline no momento. Tente novamente mais tarde."
                  : "Sou seu assistente virtual. Pode me perguntar qualquer coisa sobre desenvolvimento, projetos ou tecnologias que uso."}
              </p>
              <SuggestionButtons>
                {suggestions.map((suggestion, index) => (
                  <SuggestionButton
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    {suggestion}
                  </SuggestionButton>
                ))}
              </SuggestionButtons>
            </EmptyState>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id}>
                  <MessageBubble
                    $sender={message.sender}
                    $isError={message.isError}
                  >
                    {message.text}
                  </MessageBubble>
                  <MessageTime $sender={message.sender}>
                    {formatTime(message.timestamp)}
                  </MessageTime>
                </div>
              ))}
              {isTyping && (
                <TypingIndicator>
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingIndicator>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <InputWrapper>
            <TextInput
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              rows={1}
            />
            <SendButton
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                  fill="currentColor"
                />
              </svg>
            </SendButton>
          </InputWrapper>
        </InputContainer>
      </ChatContainer>
    </PageContainer>
  );
};
