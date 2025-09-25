import { EditUserForm } from "../forms/UserForm";

export const EditUserProfile = () => {
  return (
    <div className="edit-user">
      <h1 className="edit-header">Edit Profile</h1>
      <div className="edit-user-form">
              <EditUserForm />
      </div>

    </div>
  );
};
