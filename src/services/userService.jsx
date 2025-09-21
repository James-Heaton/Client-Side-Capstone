export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((res) =>
    res.json()
  );
};

export const getUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};

export const getUserSynths = () => {
  return fetch(
    "http://localhost:8088/userSynths?_expand=user&_expand=synth"
  ).then((res) => res.json());
};

export const editUser = (user) => {
  return fetch(`http://localhost:8088/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};
