import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { sendLoginData } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const jwt = await userCred.user.getIdToken();
      await sendLoginData(jwt);
      //console.log("ENTRO 3");
      // Assert the type of response.data to inform TypeScript
      //const data = response.data as { sessionID: string };
      //localStorage.setItem("sessionID", data.sessionID);
      localStorage.setItem("jwt", jwt);
      navigate("/dashboard");
    } catch (err) {
      alert("Error al iniciar sesion:");
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      onSubmit={handleLogin}
    ></LoginForm>
  );
}
