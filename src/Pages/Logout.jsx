import { motion } from "framer-motion";
import React, { useContext } from "react";
import { StateContext } from "../Services/Context/Context";
import { toast } from "react-toastify";

// import { Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SlLogout } from "react-icons/sl";
import { logOutApi } from "../Services/Apis/authApi";
import { useMediaQuery } from "react-responsive";

const Logout = () => {
  // <----responsive logout----->
  const isDesktop = useMediaQuery({
    query: "(min-width: 1537px)",
  });
  const laptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const phone = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const smPhone = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const { logoutActive, currentUser } = useContext(StateContext);

  const signOut = (e) => {
    e.preventDefault();
    logOutApi();
    toast.success("Logout successfully.");
  };

  return (
    <motion.div
      className="bg-background p-5 w-[35%] sm:w-[30%] md:w-[28%] lg:w-[16%] z-30 absolute right-3 rounded shadow top-0"
      initial={{ y: 0 }}
      animate={
        logoutActive
          ? isDesktop
            ? { y: -400 }
            : { y: 0 }
          : isDesktop
          ? { y: 0 }
          : { y: -400 }
      }
      transition={{ duration: 0.25 }}
    >
      <div>
        <div>
          <div className="flex gap-2 justify-start items-center">
            <img
              width={"50px"}
              src="https://img.freepik.com/free-icon/user_318-159711.jpg"
              alt=""
            />
            <h4 className="text-para capitalize">{currentUser?.name}</h4>            
          </div>
        </div>

        <div className="cu cursor-pointer">
          <div className="flex items-center text-xl p-2" onClick={signOut}>
            <SlLogout />
            <p className="ms-2">Log out</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Logout;
