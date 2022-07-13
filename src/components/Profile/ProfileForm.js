import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
const ProfileForm = () => {
  const key = process.env.REACT_APP_API_KEY;
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {});
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          ref={newPasswordRef}
          minLength="7"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
