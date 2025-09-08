const API_BASE_URL = "https://rag-api.kauan.space";

interface ApiResponse {
  answer: string;
  sources?: string[];
}

export class AssistantApiService {
  private baseUrl = API_BASE_URL;

  async askQuestion(question: string): Promise<string> {
    try {
      console.log(
        `Fazendo requisição para: ${this.baseUrl}/api/rag/ask-question`
      );
      console.log(`Pergunta: ${question}`);

      const response = await fetch(`${this.baseUrl}/api/rag/ask-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      console.log(`Status da resposta: ${response.status}`);

      if (!response.ok) {
        throw new Error(
          `Erro na API: ${response.status} - ${response.statusText}`
        );
      }

      const data: ApiResponse = await response.json();
      console.log("Resposta da API:", data);

      return data.answer || "Não consegui gerar uma resposta.";
    } catch (error) {
      console.error("Erro na API:", error);
      throw new Error(
        error instanceof Error ? error.message : "Erro ao conectar com a API"
      );
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      console.log(`Verificando saúde da API: ${this.baseUrl}/health`);
      const response = await fetch(`${this.baseUrl}/health`);
      console.log(`Health check status: ${response.status}`);
      return response.ok;
    } catch (error) {
      console.error("Erro no health check:", error);
      return false;
    }
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}

export const assistantApi = new AssistantApiService();
