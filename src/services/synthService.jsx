export const getSynths = () => {
  return fetch("http://localhost:8088/synths").then((res) => res.json());
};

export const getSynthById = (synthId) => {
  return fetch(`http://localhost:8088/synths/${synthId}`).then((res) =>
    res.json()
  );
};
