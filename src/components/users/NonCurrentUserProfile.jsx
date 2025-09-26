import { UserInfo } from "./UserInfo";
import { UserSynths } from "./UserSynths";

export const NonCurrentUserProfile = () => {
  return (
    <div className="user-profile">
      {UserInfo()}
      {UserSynths()}
    </div>
  );
};
