import { useEffect, useState } from "react";
import { registerApi } from "../Services/Apis/authApi";
// import { registerApi, useRegisterMutation } from "../Services/Apis/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUniqueID } from "../Services/Common/Uuid/UniqueId";
import { postUserData } from "../Services/Apis/FireStoreApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { motion } from "framer-motion";
import { LuHeartHandshake } from "react-icons/lu";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const contactData = { name, email, password, password_confirmation };

  const nav = useNavigate();

  const svgVariant = {
    open: {opacity:1, y:0,transition: {delay:.2, duration:.75}},
    closed: {opacity:0, y:-100,transition: {delay:.2, duration:.75}},
  }
  const headerVariant = {
    open: {opacity:1, y:0,transition: {delay:.7, duration:.75}},
    closed: {opacity:0, y:100,transition: {delay:.7, duration:.75}},
  }
  const nameVariant = {
    open: {opacity:1, y:0,transition: {delay:.75, duration:.75}},
    closed: {opacity:0, y:100,transition: {delay:.75, duration:.75}},
  }
  const emailVariant = {
    open: {opacity:1, y:0,transition: {delay:.8, duration:.75}},
    closed: {opacity:0, y:100,transition: {delay:.8, duration:.75}},
  }
  const passwordVariant = {
    open: {opacity:1, y:0,transition: {delay:.85, duration:.75}},
    closed: {opacity:0, y:100,transition: {delay:.85, duration:.75}},
  }
  const comPasswordVariant = {
    open: {opacity:1, y:0,transition: {delay:.9, duration:.75}},
    closed: {opacity:0, y:100,transition: {delay:.9, duration:.75}},
  }
  const loginVariant = {
    open: {opacity:1, y:0,transition: {delay:.95, duration:.75}},
    closed: {opacity:0, y:100,transition: {delay:.95, duration:.75}},
  }
  const btnVariant = {
    open: {opacity:1, y:0,transition: {delay:.98, duration:.75}},
    closed: {opacity:0, y:100,transition: {delay:.98, duration:.75}},}


  const register = async (e) => {
    try {
      e.preventDefault();
      let res = await registerApi(email, password);
      const obj = {
        name: name,
        email: email,
        userId: getUniqueID(),
      };
      postUserData(obj);

      nav("/");
      localStorage.setItem("userEmail", res.user.email);
      toast.success("Account Created successfully");
    } catch (err) {
      toast.error("Can't create account.Try again.");
      return err;
    }
  };

  return (
    <div className="bg-background shadow-lg w-full h-screen grid place-items-center">
      <form
        onSubmit={register}
        action=""
        className=" w-[20rem] md:w-[25rem] mx-auto bg-background shadow-xl px-6 py-8 rounded"
      >
        {/* <motion.div
          initial={'closed'}
          animate={'open'}
          variants={svgVariant}
          className="flex flex-col justify-center items-center bg-cyan-400 rounded">
            <h1 className=" w-full text-center text-lg">
              Welcome to{" "}
              <span className="text-lg text-white">Contact Demo</span>
            </h1>
            <img
              className=" w-80 "
              src="src/assets/juicy-hands-holding-gadgets-with-social-media.gif"
              alt=""
            />
            <div className="flex items-center text-sm text-cyan-50">
              <p className=" mr-2">Become one of us</p>
              <LuHeartHandshake />
            </div>
          </motion.div> */}
        <div className="my-5 pb-8 pt-5">
          <motion.div
          initial={'closed'}
          animate={'open'}
          variants={nameVariant}
          className="">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
            />
          </motion.div>
          <motion.div
          initial={'closed'}
          animate={'open'}
          variants={emailVariant}
          className="my-5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
            />
          </motion.div>
          <motion.div
          initial={'closed'}
          animate={'open'}
          variants={passwordVariant}
          className="">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
            />
          </motion.div>
          <motion.div
          initial={'closed'}
          animate={'open'}
          variants={comPasswordVariant}
          className="mt-5">
            <input
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
            />
          </motion.div>
          <motion.div
          initial={'closed'}
          animate={'open'}
          variants={btnVariant}
          className="">
            <button className="bg-button px-3 py-2 text-button-text rounded-md mt-5">
              Register
            </button>
          </motion.div>
          <motion.div
          initial={'closed'}
          animate={'open'}
          variants={loginVariant}
          className="mt-4">
            <p className="mt-5">
              Already have an account.{" "}
              <span
                onClick={() => nav("/login")}
                className="text-blue-500 cursor-pointer"
              >
                sign in
              </span>{" "}
            </p>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default Register;
