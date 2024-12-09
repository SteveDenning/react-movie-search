import React, { useState } from "react";

// Components
import Button from "../../components/button";

// MUI Icons
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicIcon from "@mui/icons-material/Mic";

const VoiceInput: React.FC = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = "en-US"; // Set language as needed
    recognition.interimResults = false; // Only capture final results
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Button
      variant="icon"
      testId="voice-input"
      className="voice-input"
      onClick={handleVoiceInput}
    >
      {isListening ? <MicNoneIcon /> : <MicIcon />}
    </Button>
  );
};

export default VoiceInput;
