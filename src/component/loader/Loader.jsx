import { FadeLoader } from "react-spinners";
import "./loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <FadeLoader />
    </div>
  );
}

export default Loader;
