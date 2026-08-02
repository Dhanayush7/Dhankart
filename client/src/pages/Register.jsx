import "../css/Auth.css";

function Register() {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;