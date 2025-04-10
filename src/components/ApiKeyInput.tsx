
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [savedApiKey, setSavedApiKey] = useState<string | null>(null);

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setSavedApiKey(storedApiKey);
      onApiKeySubmit(storedApiKey);
    }
  }, [onApiKeySubmit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    // Save to localStorage
    localStorage.setItem("openai_api_key", apiKey);
    setSavedApiKey(apiKey);
    onApiKeySubmit(apiKey);
    toast.success("API key saved successfully");
  };

  const handleReset = () => {
    localStorage.removeItem("openai_api_key");
    setSavedApiKey(null);
    setApiKey("");
    toast.info("API key removed");
  };

  if (savedApiKey) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Key className="h-5 w-5 text-quiz-blue mr-2" />
              <span>OpenAI API key is saved</span>
            </div>
            <Button variant="outline" onClick={handleReset} size="sm">
              Reset API Key
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Key className="h-5 w-5 mr-2 text-quiz-blue" />
          Enter OpenAI API Key
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mb-2"
            />
            <p className="text-xs text-gray-500">
              Your API key is stored only in your browser's local storage and is never sent to our servers.
            </p>
          </div>
          <Button type="submit" className="w-full bg-quiz-blue hover:bg-quiz-blue-dark">
            Save API Key
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
