import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Manager = () => {
  const ref = useRef();
  const showRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordsArray, setPasswordsArray] = useState([]);
  const [toggle, setToggle] = useState(null);

  useEffect(() => {
    axios
      .get("https://passwordmanager-c127.onrender.com/items")
      .then((response) => setPasswordsArray(response.data))
      .catch((error) => console.error("Error fetching passwords:", error));
  }, []);

  // const copyText = (text) => {
  //   toast("Copied To Clipboard!", { theme: "dark" });
  //   navigator.clipboard.writeText(text);
  // };

  const savePassword = () => {
    if (form.site && form.username && form.password) {
      axios
        .post("https://passwordmanager-c127.onrender.com/items", form)
        .then((response) => {
          setPasswordsArray([...passwordsArray, response.data]);
          toast("Password Saved!", { theme: "dark" });
        })
        .catch((error) => toast("Error saving password!", { theme: "dark" }));
    } else {
      toast("Password Not Saved!", { theme: "dark" });
    }
  };

  const deletePassword = (id) => {
    if (confirm("Do you really want to delete")) {
      axios
        .delete(`https://passwordmanager-c127.onrender.com/items/${id}`)
        .then(() => {
          setPasswordsArray(passwordsArray.filter((item) => item._id !== id));
          toast("Password Deleted!", { theme: "dark" });
        })
        .catch((error) => toast("Error deleting password!", { theme: "dark" }));
    }
  };

  const editPassword = (id) => {
    const selectedPassword = passwordsArray.find((i) => i._id === id);
    setForm(selectedPassword);
    if (id) {
      axios
        .delete(`https://passwordmanager-c127.onrender.com/items/${id}`)
        .catch((error) => toast("Error Editing password!", { theme: "dark" }));
    }
    setPasswordsArray(passwordsArray.filter((item) => item._id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (id) => {
    setToggle(toggle === id ? null : id);
  };
  return (
    <div className="flex justify-center w-full">
      <ToastContainer theme="dark" />
      <div className="flex-row w-full md:w-[70%] m-2 md:m-12 items-center text-center">
        <div className="font-bold text-2xl">
          <span className="text-blue-600">&lt;PassMan/&gt;</span>
        </div>
        <div className="text-white">Password Manager</div>
        <div className="flex flex-col w-full items-center">
          <input
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter Website URL"
            className="w-full border border-blue-600 rounded-full px-3 py-1 my-2"
          />
          <input
            type="text"
            value={form.username}
            onChange={handleChange}
            name="username"
            placeholder="Enter Username"
            className="w-full border border-blue-600 rounded-full px-3 py-1 my-2"
          />
          <input
            type="password"
            ref={showRef}
            value={form.password}
            onChange={handleChange}
            name="password"
            placeholder="Enter Password"
            className="w-full border border-blue-600 rounded-full px-3 py-1 my-2"
          />
          <button
            onClick={savePassword}
            className="bg-violet-100 hover:bg-violet-200 rounded-full px-3 py-1 border border-violet-700 my-3"
          >
            Add Data
          </button>
        </div>
        <div className="font-bold text-xl py-2 text-white">Passwords</div>
        {passwordsArray.length === 0 && (
          <div className="text-white">No Passwords to show</div>
        )}
        {Array.isArray(passwordsArray) && passwordsArray.length > 0 && (
          <div>
            {passwordsArray.map((item) => (
              <div
                key={item._id}
                className="border bg-white/20 flex rounded-lg m-2 justify-between"
              >
                <div className="w-1/2 p-2 flex flex-col text-start text-white">
                  <span>
                    <a href={item.site}>URL : {item.site}</a>
                  </span>
                  <span>Username : {item.username}</span>
                  <span>Password : {item.password}</span>
                </div>
                <div className="w-[40%] p-3 flex flex-col gap-2">
                  <button
                    onClick={() => editPassword(item._id)}
                    className="border rounded-lg p-1 hover:bg-white/25"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePassword(item._id)}
                    className="border rounded-lg p-1 hover:bg-white/25"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
