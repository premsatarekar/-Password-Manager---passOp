import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // To track password visibility

  // Array of images and corresponding texts
  const images = [
    { src: "/public/hacker copy.png", text: "Welcome to my hacking world" },
    { src: "/public/hacker.png", text: "Unlock your digital secrets" },
    { src: "/public/hacker.png", text: "Secure your passwords" },
    { src: "/public/hacker2.jpg", text: "I am a Hacker" },
    { src: "/public/password-favion.png", text: "Chill bro Your Password is Hacked !!!" },
  ];

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  useEffect(() => {
    // Image rotation logic
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); // Change image every 1 second
  
    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [images.length]);  // Adding images.length to the dependency array ensures that the effect only runs when the length of images changes

  
const copyText = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert(`${text} copied to clipboard!`);
  });
};

  const showPassword = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle visibility
    if (ref.current.src.includes("eye-off.svg")) {
      ref.current.src = "../../../public/eye-on.svg";
    } else {
      ref.current.src = "../../../public/eye-off.svg";
    }
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
      setForm({ site: "", username: "", password: "" }); 
    } else {
      alert("You need to write at least 3 characters for each field");
    }
  };
  
  const deletePassword = (id) => {
    console.log("Deleting password with id",id)
    let c = confirm("do you really want to delete this password ?")
    if(c){
        setPasswordArray(passwordArray.filter(item =>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item =>item.id!==id)));
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id",id)
    setForm(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item =>item.id!==id))


  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
    {/* Image Box */}
    <div className="flex flex-col items-center justify-center mb-8">
          <img
            src={images[currentImageIndex].src}
            alt="Rotating"
            className="w-32 h-32 object-cover rounded-full border border-green-500"
          />
          <p className="text-lg mt-2 text-green-800 font-semibold">
            {images[currentImageIndex].text}
          </p>
        </div>
      <div className="absolute top-0 z-[-2] h-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="md:mycontainer p-2 md:p-0">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">Op/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-[#000000] gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter User Name"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type={isPasswordVisible ? "text" : "password"} 
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="../../../public/eye-on.svg"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center item-center bg-green-500 rounded-full w-fit px-5 py-2 hover:bg-green-300 gap-2 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show </div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>

                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-white text-center py-2">
                        <div className="flex item-center justify-center">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white text-center py-2">
                        <div className="flex item-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white text-center py-2">
                        <div className="flex item-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white text-center py-2">
                        <div className="flex item-center justify-center">
                          <span className="mx-2 cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{"width":"25px","height":"25px",}}>
                            </lord-icon>
                          </span>
                          <span className="mx-2 cursor-pointer" onClick={()=>{deletePassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{"width":"25px","height":"25px",}}>
                            </lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
   