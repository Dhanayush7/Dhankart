import { Link } from "react-router-dom";
import "../css/NotFound.css";

function NotFound() {
  return (
    <div className="notfound">

      <div className="notfound-content">

        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <button>🏠 Back to Home</button>
        </Link>

      </div>

      <div className="notfound-image">

        <img
          src="https://illustrations.popsy.co/gray/web-error.svg"
          alt="404"
        />

      </div>

    </div>
  );
}

export default NotFound;