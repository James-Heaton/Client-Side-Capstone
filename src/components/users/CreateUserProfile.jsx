import { CreateUserForm } from "../forms/UserForm";

export const CreateUserProfile = () => {
  return (
    <div className="edit-user">
      <h1 className="edit-header">Edit Profile</h1>
      <div className="edit-user-form">
              <CreateUserForm />
      </div>

    </div>
  );
};
