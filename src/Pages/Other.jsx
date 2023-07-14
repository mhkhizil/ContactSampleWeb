import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../Services/Context/Context";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
const Other = () => {
  const token = localStorage.getItem("token");
  const { menuActive } = useContext(StateContext);
  const nav = useNavigate();

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

    // useEffect(() => {
    //     if (!token) nav("/login");
    //   }, []);
  return (
    <motion.div
    initial={tablet?{ marginLeft: "18%" }:{ marginLeft: 0 }}
    animate={menuActive ? { marginLeft: 0 } :( tablet?{ marginLeft: "18%" }:{ marginLeft: 0 })}
      transition={{ duration: 0.25 }}
      className={` px-8  `}>

        <div className="w-full h-[80vh] grid place-items-center">
            <h2 className="text-xl md:text-2xl">This feature isn't available right now.</h2>
        </div>
      
    </motion.div>
  )
}

export default Other
