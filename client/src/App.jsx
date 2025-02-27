import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="z-50">
        <Navbar />
      </div>

      <div className="relative h-full min-h-screen w-full z-10 bg-black">
        <div className="absolute bottom-0 -z-10 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] h-full"></div>
        <div className="absolute left-0 -z-10 right-0 top-0 h-full max-w-[800px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        <div className="z-5">
          <Manager />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
