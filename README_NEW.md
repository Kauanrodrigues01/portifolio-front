# 🚀 Portfolio Kauan Rodrigues - Desenvolvedor Full Stack

Um portfólio moderno e responsivo construído com React, TypeScript e Styled Components, apresentando projetos e habilidades de desenvolvimento. Agora com **navegação multi-página** e **assistente virtual integrado**!

## ✨ Novas Funcionalidades

### 🔄 **Aplicação Multi-Página**
- ✅ **React Router** - Navegação SPA fluida
- ✅ **Header fixo** - Navegação sempre acessível
- ✅ **Página Home** - Portfolio completo
- ✅ **Página AI Assistant** - Chatbot interativo
- ✅ **URLs dinâmicas** - `/` e `/assistant`

### 🤖 **AI Assistant (Chatbot)**
- ✅ **Interface conversacional** - Chat em tempo real
- ✅ **Animações fluidas** - Mensagens com slide-in effect
- ✅ **Indicador de digitação** - Feedback visual durante resposta
- ✅ **Sugestões inteligentes** - Perguntas pré-definidas
- ✅ **Auto-resize textarea** - Input dinâmico
- ✅ **Timestamps** - Horário das mensagens
- ✅ **Estado vazio** - Welcome screen com sugestões
- ✅ **Scrolling automático** - Sempre mostra última mensagem
- ✅ **Design responsivo** - Otimizado para mobile

### 🎨 **Header de Navegação**
- ✅ **Logo animado** - Com efeito gradient
- ✅ **Active states** - Indicação da página atual
- ✅ **Blur background** - Backdrop filter moderno
- ✅ **Theme toggle integrado** - Alternador de tema
- ✅ **Mobile optimized** - Responsivo em todas as telas

### 🎯 **Tecnologias dos Badges Atualizadas**
- ✅ **Python** - Azul oficial (#3776AB)
- ✅ **JavaScript** - Amarelo JS (#F7DF1E)
- ✅ **TypeScript** - Azul TS (#3178C6)
- ✅ **React** - Azul ciano (#00D8FF)
- ✅ **Django** - Verde escuro (#092E20)
- ✅ **FastAPI** - Verde teal (#009688)
- ✅ **NestJS** - Vermelho (#E0234E)
- ✅ **PostgreSQL** - Azul oficial (#316192)
- ✅ **Redis** - Vermelho oficial (#DC382D)

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca de interface do usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **React Router DOM** - Navegação SPA
- **Styled Components** - CSS-in-JS para estilização componentizada
- **Vite** - Build tool moderna e rápida

## 📁 Nova Estrutura do Projeto

```
src/
├── components/
│   ├── Header/              # 🆕 Navegação principal
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── Hero/               # Seção principal
│   ├── Projects/           # Grid de projetos
│   ├── Contact/            # Seção de contato
│   └── SocialButton/       # Badges com novas tecnologias
├── pages/                  # 🆕 Sistema de páginas
│   ├── HomePage.tsx        # 🆕 Página principal
│   ├── AssistantPage.tsx   # 🆕 Página do chatbot
│   └── index.ts
├── contexts/               # Gerenciamento de estado
├── hooks/                  # Custom hooks
└── styles/                 # Sistema de design
```

## 🤖 Como Conectar sua API de IA

No arquivo `src/pages/AssistantPage.tsx`, substitua a função simulada pela sua API:

```typescript
const handleSendMessage = async (text?: string) => {
  // ... código do usuário ...
  
  // Substitua esta parte pela sua API
  try {
    const response = await fetch('sua-api-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText })
    });
    
    const data = await response.json();
    
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: data.response, // Ajuste conforme sua API
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiResponse]);
  } catch (error) {
    // Tratamento de erro
  } finally {
    setIsTyping(false);
  }
};
```

## 🌐 Navegação

### 📍 Rotas Disponíveis
- **`/`** - Página inicial com portfolio completo
- **`/assistant`** - Assistente virtual (chatbot)

### 🧭 Como Navegar
- Use os links no header para alternar entre páginas
- URLs são funcionais e podem ser compartilhadas
- Navegação por browser (back/forward) funciona

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portfolio-kauan-rodrigues.git

# Navegue até o diretório
cd portfolio-kauan-rodrigues

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Abra http://localhost:5173 no navegador
```

## 🎯 Funcionalidades do Chatbot

### 💬 **Interface Conversacional**
- Chat em tempo real com interface moderna
- Mensagens diferenciadas (usuário vs IA)
- Timestamps para cada mensagem
- Scrolling automático para última mensagem

### ⚡ **UX Otimizada**
- Textarea com auto-resize
- Enter para enviar, Shift+Enter para quebra de linha
- Botão de envio com estados (ativo/disabled)
- Indicador de "digitando" durante processamento

### 📱 **Mobile First**
- Layout responsivo em todas as telas
- Touch targets adequados
- Keyboard handling otimizado
- Scrolling suave em dispositivos móveis

### 🎨 **Visual Design**
- Gradientes e sombras modernas
- Animações suaves (slide-in, hover effects)
- Cores consistentes com o tema
- Tipografia otimizada para leitura

## 🔮 Próximas Melhorias

- [ ] **Histórico de conversas** - Salvar conversas localmente
- [ ] **Modo de voz** - Speech-to-text integration
- [ ] **Markdown support** - Formatação rica nas respostas
- [ ] **Typing indicators** - Mais realistas
- [ ] **Quick replies** - Botões de resposta rápida
- [ ] **File uploads** - Envio de arquivos para a IA
- [ ] **Export chat** - Exportar conversa em PDF/TXT

## 📄 Licença

Este projeto está sob a licença MIT. Desenvolvido para demonstrar habilidades de frontend moderno com foco em UX e integração de IA.

---

**Desenvolvido com ❤️ + 🤖 AI Integration**
