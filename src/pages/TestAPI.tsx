import { useEffect, useState } from "react";
import { testGeminiAPI } from "@/lib/gemini";

const TestAPI = () => {
  const [result, setResult] = useState<{ success: boolean; message: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const testResult = await testGeminiAPI();
        setResult(testResult);
      } catch (error) {
        setResult({
          success: false,
          message: "Failed to test API",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      } finally {
        setLoading(false);
      }
    };

    checkAPI();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">API Key Test</h1>
        
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Testing API key...</p>
          </div>
        ) : result ? (
          <div className={`p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className={`font-semibold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.message}
            </p>
            {result.error && (
              <p className="mt-2 text-sm text-red-600">
                Error: {result.error}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TestAPI; 