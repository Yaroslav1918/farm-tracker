import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form style={{ marginTop: "150px" }}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />

      <label htmlFor="name">Name:</label>
      <input id="name" name="name" type="text" />

      <label>
        Inside Worker:
        <input type="checkbox" name="isInsideWorker" />
      </label>

      <button formAction={login}>Log in</button>
      <button formAction={signup} style={{marginLeft: "20px"}}>Sign up</button>
    </form>
  );
}
