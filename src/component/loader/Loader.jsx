import { FadeLoader } from "react-spinners";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <FadeLoader />
    </div>
  );
}

export default Loader;
