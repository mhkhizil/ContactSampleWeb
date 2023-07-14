import { useEffect, useState } from "react";
// import { useLoginMutation } from "../Services/Apis/authApi"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Services/slice/userSlice";
import { toast } from "react-toastify";
import { loginApi } from "../Services/Apis/authApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { BsArrowLeftCircle } from "react-icons/bs";
import { LuHeartHandshake } from "react-icons/lu";
import { FaRegSmileBeam } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


const Login = () => {

  const {ref, inview} = useInView()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const contactData = { email, password };

  // const [login] = useLoginMutation()
  const nav = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) nav("/");
    });
  }, []);

  
  const svgVariant = {
    open: {opacity:1, x:0,transition: {delay:.2, duration:.75}},
    closed: {opacity:0, x:100,transition: {delay:.2, duration:.75}},
  }

  const loginVariant = {
    open: {opacity:1, x:0,transition: {delay:.55, duration:.75}},
    closed: {opacity:0, x:-100,transition: {delay:.55, duration:.75}},
  }
  const emailVariant = {
    open: {opacity:1, x:0,transition: {delay:.65, duration:.75}},
    closed: {opacity:0, x:-100,transition: {delay:.65, duration:.75}},
  }
  const passwordVariant = {
    open: {opacity:1, x:0,transition: {delay:.7, duration:.75}},
    closed: {opacity:0, x:-100,transition: {delay:.7, duration:.75}},
  }

  const recoverVariant = {
    open: {opacity:1, x:0,transition: {delay:.75, duration:.75}},
    closed: {opacity:0, x:-100,transition: {delay:.75, duration:.75}},
  }
  const btnVariant = {
    open: {opacity:1, x:0,transition: {delay:.8, duration:.75}},
    closed: {opacity:0, x:-100,transition: {delay:.8, duration:.75}},
  }
  const regVariant = {
    open: {opacity:1, x:0,transition: {delay:.85, duration:.75}},
    closed: {opacity:0, x:-100,transition: {delay:.85, duration:.75}},
  }

  const login = async (e) => {
    try {
      e.preventDefault();
      let res = await loginApi(email, password);
      toast.success("Signed In to your account!");
      localStorage.setItem("userEmail", res.user.email);
      nav("/");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form  onSubmit={login} className=" w-[20rem] md:w-[25rem]  shadow-lg px-8 py-6 ">
        <div className="flex flex-col my-5 p-7">
          <motion.h2
          initial={'closed'}
          animate={'open'}
          variants={loginVariant}
          className=" text-headline font-medium text-2xl">Log In</motion.h2>

          <motion.div
           initial={'closed'}
           animate={'open'}
           variants={emailVariant}
           className="my-5">
            <h4 className="text-para">Email</h4>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email"
              className="w-full py-2 px-3 focus:outline-none bg-transparent rounded bottom-2 placeholder-placeholder border border-button text-para"
            />
          </motion.div>

          <motion.div
           initial={'closed'}
           animate={'open'}
           variants={passwordVariant}
          className="my-5">
            <h4 className="text-para">Password</h4>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full py-2 px-3 focus:outline-none bg-transparent rounded bottom-2 placeholder-placeholder border border-button text-para"
            />
          </motion.div>

          <motion.div
          
          initial={'closed'}
          animate={'open'}
          variants={passwordVariant}
          className="flex justify-end my-5 items-center">
            <p className="cursor-pointer select-none text-placeholder text-xs underline">
              Recover your password?
            </p>
          </motion.div>

          <motion.button
           initial={'closed'}
           animate={'open'}
           variants={btnVariant}
          className=" w-full flex items-center justify-center bg-button px-3 py-2 text-button-text rounded">
            {<BsArrowLeftCircle className=" me-2" />} <span>Sign in</span>
          </motion.button>

          <motion.div
           initial={'closed'}
           animate={'open'}
           variants={regVariant}
          className="flex justify-between my-5 items-center">
            <p className=" text-sm select-none text-para">Not a member?</p>
            <Link to={"/register"}>
              <p className="cursor-pointer select-none text-placeholder underline text-sm">
                Register Now
              </p>
            </Link>
          </motion.div>
        </div>

        {/* <motion.div
         initial={'closed'}
         animate={'open'}
         variants={svgVariant}
        className=" flex-col justify-evenly items-center hidden md:flex md:basis-[45%] lg:basis-[50%]  bg-button p-7 rounded">
          <div>
            <h1 className=" flex items-center justify-center w-56 text-center text-2xl text-button-text">
              <span className=" mr-2 font-bold">Hello Again !!! </span>{" "}
              <FaRegSmileBeam/>
              
            </h1>
            <div className="flex items-center text-sm text-button-text">
              <p className=" mr-2">Welcome back, you've been missed</p>
              <LuHeartHandshake />
            </div>
          </div>

          <img className=" w-80 " src="img\florid-remote-workflow.gif" alt="" />
        </motion.div> */}

        
      </form>
    </div>
   
  );
};

export default Login;
