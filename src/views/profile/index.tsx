import React, { useState } from "react";

// Services
import useOpenAI from "../../services/openai";
import { Container } from "@mui/material";
import Button from "../../components/button";

// Styles
import "./profile.scss";

interface Props {
  children?: React.ReactNode;
}

// import pageUnderConstruction from "../../assets/images/under-construction.jpg";

const Profile: React.FC<Props> = () => {
  const [AIresponse, setAIresponse] = useState(null);
  const [generating, setGenerating] = useState(false);

  const genres = "Action";
  const prompt = `Give me a random list of 10 TV Shows that must have the following genres. ${genres}, these must be in an array of JSON objects called films, each object should have a name key with the name as the value`;

  const getOpenAI = () => {
    setGenerating(true);
    setAIresponse(null);
    useOpenAI(prompt).then((response) => {
      const isJSON = (obj) => {
        try {
          JSON.parse(obj);
          return JSON.parse(obj);
        } catch (e) {
          return false;
        }
      };
      setAIresponse(isJSON(response.choices[0].message.content));
      setGenerating(false);
    });
  };
  return (
    <div
      className="profile"
      data-testid="profile"
    >
      <Container>
        <Button onClick={getOpenAI}>Give me a list of 10 films that begin with the letter A</Button>
        <div>
          {generating ? (
            <p>Generating...</p>
          ) : (
            <ul>
              {AIresponse?.films.map((item, i) => {
                return <li key={i}>{item.name}</li>;
              })}
            </ul>
          )}
        </div>
      </Container>
      {/* <img
        style={{ width: "100%" }}
        src={pageUnderConstruction}
        alt="Under Construction image"
      /> */}
    </div>
  );
};

export default Profile;
