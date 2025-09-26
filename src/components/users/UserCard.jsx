import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { Link } from "react-router-dom";

export const UserCard = () => {
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((userData) => {
      setUsers(userData);
    });
  }, []);

  return (
    <>
      {users
        .filter((user) => user.id > 10)
        .sort(() => Math.random() - 0.5) // Randomize here
        .map((user) => {
          {
            return (
              <Link
                to={
                  currentUserId === user.id ? "/home" : `/collector/${user.id}`
                }
                key={user.id}
                className="user-card"
              >
                <div key={user.id}>
                  <img
                    className="user-card-img"
                    src={user.imgUrl}
                    alt={user.name}
                  />
                </div>
                <div className="user-card-name">
                  <p>{user.name}</p>
                </div>
              </Link>
            );
          }
        })}
    </>
  );
};
