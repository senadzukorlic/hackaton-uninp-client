import React, { useState, useCallback, useEffect } from "react";
import { useConversation } from "@11labs/react";
import { Mic, MicOff } from "lucide-react";
import axios from "axios";
import { useAiResponse } from "../contexts/AiResponseContext";
import { useActive } from "../contexts/ActivateContext";
const VoiceAssistant: React.FC = () => {
  const { isRunning } = useActive();
  const [connecting, setConnecting] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; isUser: string }[]>(
    []
  );
  const { aiRes, setAiRes } = useAiResponse();
  const [defaultResponse, setDefaultResponse] = useState<string>(aiRes);
  useEffect(() => {
    if (isRunning) {
      startConversation();
    } else {
      stopConversation();
    }
  }, [isRunning]);

  // Handle conversation state
  const conversation = useConversation({
    onConnect: () => {
      setConnecting(false);
      setMessage("Connected. Start speaking...");
      setTimeout(() => setMessage(""), 2000);
    },
    onDisconnect: () => {
      setMessage("Disconnected");
      setTimeout(() => setMessage(""), 2000);
    },
    onMessage: (message) => {
      if (message) {
        setMessages((prev) => [
          ...prev,
          {
            text: typeof message === "string" ? message : message.message,
            isUser: message.source,
          },
        ]);
        setMessage("");
        if (message.source == "user") {
          axios
            .post(
              "http://localhost:8080/api/chat/process",
              { prompt: message.message },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              console.log(res.data);
            });
        }
      }
    },
    onError: (error) => {
      setMessage(`Error: ${error}`);
      setConnecting(false);
    },
  });

  // Animation for the main orb

  // Handle starting the conversation
  const startConversation = useCallback(async () => {
    try {
      setConnecting(true);
      setMessage("Connecting...");
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Start the conversation with your agent
      if (aiRes) {
        setDefaultResponse(aiRes);
        console.log("MSG", aiRes);
      }
      await conversation.startSession({
        agentId: "L8vBqXv6O998VmOB2pzh", // Replace with your agent ID
        overrides: {
          agent: {
            firstMessage: `${
              defaultResponse || "Zdravo, kako mogu da ti pomognem"
            }`,
          },
        },
      });
      setMessages((prev) => [...prev]);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setMessage("Failed to start conversation");
      setConnecting(false);
    }
  }, [conversation]);

  // Handle stopping the conversation
  const stopConversation = useCallback(async () => {
    setMessage("Disconnecting...");
    setAiRes("Zdravo, kako mogu da ti pomognem?");
    await conversation.endSession();
  }, [conversation]);

  // Auto-scroll to the most recent message
  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex min-h-[100vh] justify-center mt-10 flex-col items-center  pb-8">
      {/* Messages area */}
      <div
        id="messages-container"
        className="mt-10 min min-w-[90%] max-h-[100vh] overflow-y-auto mb-8 px-4 flex flex-col space-y-3 scrollbar-hide"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex  max-w-[90%] px-4 py-3 rounded-2xl ${
              msg.isUser != "ai"
                ? "ml-auto text-right bg-purple-950  text-white rounded-tr-none"
                : "mr-auto bg-gray-800 text-white rounded-tl-none"
            }`}
          >
            {msg.text.includes("{") ? msg.text.split("{")[0] : msg.text}
          </div>
        ))}
      </div>

      {/* Status message */}
      {message && (
        <div className="text-white mb-6 text-center bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full">
          {message}
        </div>
      )}

      {/* Main orb container */}

      {/* Controls */}
      {/* <div className="flex space-x-6">
        {conversation.status !== "connected" ? (
        //   <button
        //     onClick={startConversation}
        //     disabled={connecting}
        //     className="px-6 py-3 bg-purple-600 text-white rounded-full flex items-center space-x-2 hover:bg-purple-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        //   >
        //     <Mic className="w-5 h-5" />
        //     <span>Start Listening</span>
        //   </button>
        // ) : (
        //   <button
        //     onClick={stopConversation}
        //     className="px-6 py-3 bg-purple-600 text-white rounded-full flex items-center space-x-2 hover:bg-purple-700 transition-colors"
        //   >
        //     <MicOff className="w-5 h-5" />
        //     <span>Stop Listening</span>
        //   </button>
        )}
      </div> */}

      {/* Status indicator */}
      <div className="mt-4 text-white text-sm opacity-70">
        {conversation.status === "connected"
          ? conversation.isSpeaking
            ? "Speaking..."
            : "Listening..."
          : "Ready"}
      </div>
    </div>
  );
};

export default VoiceAssistant;
