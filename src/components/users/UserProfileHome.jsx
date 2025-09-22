import { UserHomeInfo } from "./UserInfo";
import { UserHomeSynths } from "./UserSynths";

export const Home = () => {
  return (
    <div className="user-profile">
      {UserHomeInfo()}
      {UserHomeSynths()}
    </div>
  );
};
