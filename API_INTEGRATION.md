# 🤖 API Integration - Assistant RAG

## 📋 Como Usar a API

A aplicação está configurada para se conectar automaticamente com a API RAG em `http://localhost:8000`.

### 🚀 Configuração da API

1. **Certifique-se de que sua API está rodando em `http://localhost:8000`**
2. **O endpoint deve estar disponível em:** `POST /api/rag/ask-question`

### 📤 Formato da Requisição

```bash
curl -X POST "http://localhost:8000/api/rag/ask-question" \
  -H "Content-Type: application/json" \
  -d '{"question": "Sua pergunta aqui"}'
```

### 📥 Formato da Resposta Esperada

```json
{
  "answer": "Resposta da IA aqui",
  "sources": ["fonte1", "fonte2"] // opcional
}
```

### 🔧 Funcionalidades Implementadas

- ✅ **Conexão automática** com a API
- ✅ **Indicador de status** de conexão (verde/vermelho/amarelo)
- ✅ **Tratamento de erros** com mensagens informativas
- ✅ **Fallback gracioso** quando a API está offline
- ✅ **Interface responsiva** para mobile e desktop
- ✅ **Animações de digitação** para melhor UX

### 🎯 Status de Conexão

- 🟡 **Amarelo**: Verificando conexão...
- 🟢 **Verde**: Conectado à API
- 🔴 **Vermelho**: API offline - Verifique se está rodando em localhost:8000

### 🛠️ Desenvolvimento

Para testar localmente:

```bash
# 1. Inicie sua API RAG em localhost:8000
# 2. Inicie o frontend
npm run dev

# 3. Acesse http://localhost:5173/assistant
```

### 📱 Como Funciona

1. **Ao carregar a página**: Testa automaticamente a conexão com a API
2. **Ao enviar mensagem**: Faz POST para `/api/rag/ask-question`
3. **Em caso de erro**: Mostra mensagem de erro em vermelho
4. **Resposta bem-sucedida**: Exibe a resposta da IA

### 🔍 Debugging

Se a API não estiver funcionando, verifique:

- [ ] A API está rodando em `http://localhost:8000`
- [ ] O endpoint `/api/rag/ask-question` está disponível
- [ ] CORS está configurado para aceitar `http://localhost:5173`
- [ ] O formato da resposta JSON está correto

### 💡 Notas Técnicas

- **Timeout**: 30 segundos por requisição
- **Método HTTP**: POST
- **Content-Type**: application/json
- **CORS**: Necessário para localhost:5173
- **Autenticação**: Não requerida (endpoint público)
