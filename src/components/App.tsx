import LoginForm from "./LoginForm";
import { useAuth } from "../hooks/useAuth";
import "./App.css";

function App() {
  const { user, logoutUser } = useAuth();

  return (
    <>
      {user ? (
        <div>
          <h1>User Authorized</h1>
          <button onClick={() => logoutUser()}>Log out</button>
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default App;
