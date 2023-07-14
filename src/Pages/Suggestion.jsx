import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { StateContext } from "../Services/Context/Context";

import svg from '../../img/suggession.svg'
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Suggestion = () => {
  const nav = useNavigate()

  
  const isDesktop = useMediaQuery({
    query: '(min-width: 1537px)'
  })
  const laptop = useMediaQuery({
    query: '(min-width: 1280px)'
  })
  const tablet = useMediaQuery({
    query: '(min-width: 1024px)'
  })

  const phone = useMediaQuery({
    query: '(min-width: 768px)'
  })

  const smPhone = useMediaQuery({
    query: '(min-width: 640px)'
  })

  const token = localStorage.getItem('token')


 
  const { menuActive } = useContext(StateContext);

  return (
    <motion.div
    initial={tablet?{ marginLeft: "18%" }:{ marginLeft: 0 }}
    animate={menuActive ? { marginLeft: 0 } :( tablet?{ marginLeft: "18%" }:{ marginLeft: 0 })}
      transition={{ duration: 0.25 }}
      className="text-para px-8"
    >
      <div className="">
          <img src={svg}  className="w-[20rem] md:w-[22rem] lg:w-[30rem] h-auto mx-auto" alt="" />
        <h4 className="text-primary text-center font-medium text-xl md:text-2xl lg:text-3xl ">
          Good. There are no new suggestions.
        </h4>
      </div>
    </motion.div>
  );
};

export default Suggestion;
