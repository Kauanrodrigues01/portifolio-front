# 🤖 API Integration - Assistant RAG

## 📋 Como Usar a API

A aplicação está configurada para se conectar automaticamente com a API RAG em `http://localhost:8000`.

### 🚀 Configuração da API

### 🔧 Variáveis de Ambiente

A aplicação suporta configuração flexível da URL da API através de variáveis de ambiente:

```bash
# .env (desenvolvimento local)
VITE_API_BASE_URL=http://localhost:8000

# Docker (production/staging)
API_BASE_URL=http://your-api-server.com:8000
```

### 📋 Prioridade de Configuração

1. **Parâmetro direto** no construtor (para testes)
2. **VITE_API_BASE_URL** (variável de ambiente Vite)
3. **Fallback padrão**: `http://localhost:8000`

### 🐳 Docker Configuration

No `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=development  
  - VITE_API_BASE_URL=${API_BASE_URL:-http://localhost:8000}
```

Para usar:

```bash
# Desenvolvimento local
API_BASE_URL=http://localhost:8000 docker-compose up

# Produção
API_BASE_URL=https://api.meudominio.com docker-compose up

# Container Docker para Docker
API_BASE_URL=http://host.docker.internal:8000 docker-compose up
```

1. **Certifique-se de que sua API está rodando**
2. **Configure a variável de ambiente `VITE_API_BASE_URL`**
3. **O endpoint deve estar disponível em:** `POST /api/rag/ask-question`

### 📤 Formato da Requisição

```bash
# Desenvolvimento local
curl -X POST "http://localhost:8000/api/rag/ask-question" \
  -H "Content-Type: application/json" \
  -d '{"question": "Sua pergunta aqui"}'

# Produção (substitua pela sua URL)
curl -X POST "${VITE_API_BASE_URL}/api/rag/ask-question" \
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
# 1. Configure a variável de ambiente (opcional, padrão é localhost:8000)
echo "VITE_API_BASE_URL=http://localhost:8000" > .env

# 2. Inicie sua API RAG na URL configurada
# 3. Inicie o frontend
npm run dev

# 4. Acesse http://localhost:5173/assistant
```

### 🐳 Docker Development

```bash
# 1. Configure a URL da API para Docker
export API_BASE_URL=http://host.docker.internal:8000

# 2. Suba os containers
docker-compose up

# 3. Acesse http://localhost:5173/assistant
```

### 🚀 Production Deploy

```bash
# 1. Configure a variável para produção
export API_BASE_URL=https://api.meudominio.com

# 2. Build e deploy
docker-compose -f docker-compose.prod.yml up
```

### 📱 Como Funciona

1. **Ao carregar a página**: Testa automaticamente a conexão com a API
2. **Ao enviar mensagem**: Faz POST para `/api/rag/ask-question`
3. **Em caso de erro**: Mostra mensagem de erro em vermelho
4. **Resposta bem-sucedida**: Exibe a resposta da IA

### 🔍 Debugging

Se a API não estiver funcionando, verifique:

- [ ] A variável `VITE_API_BASE_URL` está configurada corretamente
- [ ] A API está rodando na URL configurada
- [ ] O endpoint `/api/rag/ask-question` está disponível
- [ ] CORS está configurado para aceitar requisições do frontend
- [ ] O formato da resposta JSON está correto

**Para verificar a URL sendo usada**, abra o console do navegador e veja as requisições na aba Network.

### 💡 Notas Técnicas

- **Timeout**: 30 segundos por requisição
- **Método HTTP**: POST
- **Content-Type**: application/json
- **CORS**: Necessário para localhost:5173
- **Autenticação**: Não requerida (endpoint público)
