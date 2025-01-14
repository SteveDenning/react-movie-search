import { v4 as uuidv4 } from "uuid";

const useCustomGenres = () => {
  return [
    {
      label: "Kids",
      value: uuidv4(),
    },
    {
      label: "Soap",
      value: uuidv4(),
    },
    {
      label: "News",
      value: uuidv4(),
    },
    {
      label: "Reality",
      value: uuidv4(),
    },
    {
      label: "Talk",
      value: uuidv4(),
    },
    {
      label: "Politics",
      value: uuidv4(),
    },
  ];
};

export default useCustomGenres;
