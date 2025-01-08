import React, { useState } from "react";

// Services
import useOpenAI from "../../services/openai";

// MUI Components
import { Container } from "@mui/material";

// Components
import AILoader from "../../components/ai-loader";
import Button from "../../components/button";

// Styles
import "./ai-media.scss";

interface Props {
  children?: React.ReactNode;
}

const AIMedia: React.FC<Props> = () => {
  const [response, setResponse] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const genres = "Comedy";
  const prompt = `Give me a random list of 20 TV Shows that must have the following genres. ${genres}, these must be in an array of JSON objects called media, each object should have a name key with the name as the value`;

  const isJSONFormat = (obj) => {
    try {
      return JSON.parse(obj);
    } catch (e) {
      return false;
    }
  };

  const getOpenAI = () => {
    setLoaded(false);
    setGenerating(true);
    setResponse(null);
    useOpenAI(prompt)
      .then((response) => {
        const resource = isJSONFormat(response.choices[0]?.message?.content);

        if (resource) {
          setResponse(resource);
          setGenerating(false);
          setLoaded(true);
        } else {
          setResponse(null);
          setGenerating(false);
          setLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Open AI::", error);
        setResponse(null);
        setGenerating(false);
        setLoaded(true);
      });
  };

  return (
    <div
      className="ai-media"
      data-testid="ai-media"
    >
      <Container>
        <div style={{ textAlign: "center", background: "rgba(0,0,0,0.5)", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h2
            className="text-glow"
            data-testid="media-carousel-label"
            style={{ marginBottom: "20px" }}
          >
            Let AI generate a list of programmes for you based of your favourite genres
          </h2>
          {!generating && <Button onClick={getOpenAI}>Generate</Button>}
        </div>
        <div style={{ marginTop: "60px" }}>
          {generating ? (
            <AILoader />
          ) : (
            <ul className="ai-media__list">
              {response?.media.length
                ? response?.media.map((item, i) => {
                    return (
                      <li
                        key={i}
                        className="ai-media__list-item"
                      >
                        <Button> {item.name}</Button>
                      </li>
                    );
                  })
                : loaded && (
                    <>
                      <p>
                        Oops! Looks like I had a little AI brain freeze ❄️. I promise it’s not because I was binge-watching cat videos in the
                        background... Or was it? Let&#39;s try that again!
                      </p>
                    </>
                  )}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AIMedia;
