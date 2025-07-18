import React, { useEffect, useState, memo } from "react";

// Components
import Button from "../button";
import Modal from "../modal";

// MUI Icons
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicIcon from "@mui/icons-material/Mic";

// Styles
import "./voice-input.scss";

interface Props {
  setValue?: (text: any) => void;
}

const VoiceInput = memo(({setValue}: Props) => {

  const [finalText, setFinalText] = useState<string>("");
  const [liveText, setLiveText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const startListening = () => {
    setOpen(true);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setFinalText("");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";

      if (event) {
        Array.from(event.results)
          .slice(event.resultIndex)
          .forEach((result) => {
            const transcript = result[0].transcript;
            if (result.isFinal) {
              setFinalText((prev) => prev + transcript);
            } else {
              interimTranscript += transcript;
            }
          });

        setLiveText(interimTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        setOpen(false);
      }, 100);
    };

    recognition.start();
  };

  useEffect(() => {
    if (finalText) {
      setValue(finalText);
    }
  }, [finalText]);

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
        <div className="voice-input__modal">
          <MicIcon className="voice-input__modal-icon" />
          <h2 className="voice-input__modal-text">{liveText || finalText}</h2>
        </div>
      </Modal>
    </>
  );
});

export default VoiceInput;
