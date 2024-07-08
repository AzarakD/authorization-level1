import { FormEvent, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import styles from "./LoginForm.module.scss";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { authUser } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await authUser(email, password, isRegister);

    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Authorization</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ marginRight: 15 }}>
            Log in
          </button>
          <button type="submit" onClick={() => setIsRegister(true)}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
