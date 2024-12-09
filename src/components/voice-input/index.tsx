import React, { useState } from "react";

// Components
import Button from "../../components/button";
import Modal from "../../components/modal";

// MUI Icons
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicIcon from "@mui/icons-material/Mic";

interface Props {
  setInputText?: (prev) => void;
}

const VoiceInput: React.FC<Props> = () => {
  const [inputText, setInputText] = useState(""); // Final text
  const [liveText, setLiveText] = useState(""); // Live (interim) text
  const [isListening, setIsListening] = useState(false);
  const [open, setOpen] = useState(false);

  const startListening = () => {
    setOpen(true);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Set language
    recognition.interimResults = true; // Enable live (interim) results
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          // Finalized text
          setInputText((prev) => prev + transcript);
        } else {
          // Interim text
          interimTranscript += transcript;
        }
      }
      setLiveText(interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        setOpen(false);
        setInputText("");
      }, 3000);
    };

    recognition.start();
  };

  return (
    <>
      <Button
        variant="icon"
        testId="voice-input"
        className="voice-input"
        onClick={startListening}
      >
        {isListening ? <MicNoneIcon /> : <MicIcon />}
      </Button>
      <Modal
        id="voice-input"
        open={open}
        handleClose={() => setOpen(false)}
      >
        <div style={{ textAlign: "center" }}>
          <MicIcon sx={{ fontSize: 100 }} />
          <h2>{liveText || inputText}</h2>
        </div>
      </Modal>
    </>
  );
};

export default VoiceInput;
