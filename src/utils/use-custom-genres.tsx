const useCustomGenres = () => {
  return [
    {
      label: "Kids",
      value: crypto.randomUUID(),
    },
    {
      label: "Soap",
      value: crypto.randomUUID(),
    },
    {
      label: "News",
      value: crypto.randomUUID(),
    },
    {
      label: "Reality",
      value: crypto.randomUUID(),
    },
    {
      label: "Talk",
      value: crypto.randomUUID(),
    },
    {
      label: "Politics",
      value: crypto.randomUUID(),
    },
  ];
};

export default useCustomGenres;
