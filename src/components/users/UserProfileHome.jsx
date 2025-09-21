import { UserHomeInfo } from "./UserInfo";
import { UserHomeSynths } from "./UserSynths";

export const Home = () => {
  return (
    <>
      {UserHomeInfo()}
      {UserHomeSynths()}
    </>
  );
};
