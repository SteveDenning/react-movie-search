const useDefineMediaType = (resource: any) => {
  return Object.prototype.hasOwnProperty.call(resource, "gender")
    ? "person"
    : Object.prototype.hasOwnProperty.call(resource, "title")
    ? "movie"
    : "tv";
};

export default useDefineMediaType;
