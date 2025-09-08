interface ApiResponse {
  answer: string;
  sources?: string[];
  error?: string;
}

interface ApiError {
  message: string;
  status?: number;
}

export class AssistantApiService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  async askQuestion(question: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/rag/ask-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError({
          message: errorData.message || `Erro HTTP: ${response.status}`,
          status: response.status,
        });
      }

      const data: ApiResponse = await response.json();
      
      if (data.error) {
        throw new ApiError({
          message: data.error,
        });
      }

      return data.answer || 'Desculpe, não consegui gerar uma resposta para sua pergunta.';
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Erro de rede ou outros erros
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError({
          message: 'Não foi possível conectar com o servidor. Verifique se a API está rodando em http://localhost:8000',
        });
      }

      throw new ApiError({
        message: 'Erro inesperado ao processar sua pergunta. Tente novamente.',
      });
    }
  }

  // Método para testar conectividade com a API
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Instância singleton do serviço
export const assistantApi = new AssistantApiService();

// Classe de erro customizada
class ApiError extends Error {
  status?: number;

  constructor({ message, status }: { message: string; status?: number }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
