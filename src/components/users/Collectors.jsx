import "./Collectors.css";
import { UserCard } from "./UserCard";

export const Collectors = () => {
  return (
    <div className="collectors">
      <h1 className="collectors-header">Collectors</h1>
      <div className="collector-cards">
        <UserCard />
      </div>
    </div>
  );
};
