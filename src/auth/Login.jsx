import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../services/userService";
import { useToast, Toast } from "../components/hooks/Toast";

export const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const handleLogin = (event) => {
    event.preventDefault();

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];

        if (user.password === password) {
          localStorage.setItem("user", JSON.stringify({ id: user.id }));
          localStorage.setItem("fromLogin", "true");
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          showToast("Invalid email or password.", "error");
        }
      } else {
        showToast("Invalid email or password.", "error");
      }
    });
  };

  return (
    <div className="new-landing-whole">
      <div className="new-landing">
        <h1 className="new-header">Welcome to SynthFolio</h1>
        <div className="new-catchphrase">
          <p>A place to collect, create, & love</p> <p>Synthesizers</p>
        </div>
        <div className="line"></div>
      </div>
      <section className="login-forms">
        <form className="new-form-login" onSubmit={handleLogin}>
          <h2 className="login-header">Log In</h2>
          <fieldset>
            <div className="new-form-group">
              <div>Email</div>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
                placeholder="youremail@email.com"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="new-form-group">
              <div>Password</div>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-control"
                placeholder="password"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="new-form-group">
              <button className="login-btn btn-info" type="submit">
                Log in
              </button>
            </div>
          </fieldset>
        </form>
        <div className="sign-up-section">
          New here?
          <button
            className="new-sign-up-btn"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </section>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} customClass="login-toast"/>
      )}
    </div>
  );
};
