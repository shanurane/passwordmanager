import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);
  const [pin, setPin] = useState("");
  const [yourPin, setYourPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/items`)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching passwords:", error));
  }, []);

  const handleClick = () => {
    if (pin !== "") {
      axios
        .get(`${apiUrl}/authenticate`)
        .then((response) => {
          setYourPin(response.data.message);
          if (response.data.message === pin) {
            setAuth(true);
          } else {
            setPinError("Invalid Pin");
          }
          setPin("");
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <>
      <div className="relative h-full min-h-screen w-full z-10 bg-black">
        <div className="absolute bottom-0 -z-10 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] h-full"></div>
        <div className="absolute left-0 -z-10 right-0 top-0 h-full max-w-[800px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        <div className="z-50">
          <Navbar />
        </div>
        <div className="z-5">
          {auth ? (
            <Manager />
          ) : (
            <div className="min-h-screen flex flex-col gap-1 justify-center items-center">
              {loading && <span className="text-white">Data Loading...</span>}
              <p className="text-red-600">{pinError}</p>
              <input
                type="text"
                placeholder="Enter PIN"
                className="sm:w-[40%] w-1/2 border-[1.5px] bg-white/20 text-white border-white rounded-full px-3 py-1 my-2"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError("");
                }}
              />
              <button
                onClick={handleClick}
                className="bg-zinc-500 text-white hover:bg-zinc-400 rounded-full px-3 py-1 border border-white my-3"
              >
                Done
              </button>
            </div>
          )}
          {/* <Manager /> */}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
