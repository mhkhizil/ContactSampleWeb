import { useContext, useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillMinusSquare } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsColumns } from "react-icons/bs";

import { StateContext } from "../Services/Context/Context";
import { motion } from "framer-motion";
import {
  getAllContactData,
} from "../Services/Apis/FireStoreApi";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.min.css";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import OftenComponent from "../Components/OftenComponent";

const Often = () => {
  
  const tablet = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  

  // const nameBgColors = ['bg-[#482ff7]','bg-[#9c1de7]','bg-[#f3558e]','bg-[#f3f169]','bg-[#a7ff83]','bg-[#28c7fa]','bg-[#ea7dc7]']

  const [allContacts, setAllContacts] = useState([]);

  const nav = useNavigate();


  const userEmail = localStorage.getItem("userEmail");

  const { menuActive, searchContact } = useContext(StateContext);

  const [checkedAmount, setCheckedAmount] = useState(0);
  const [minusClick, setMinusClick] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalActive2, setModalActive2] = useState(false);


  useEffect(() => {
    getAllContactData(setAllContacts, userEmail);
  }, []);

  const {allFav} = useContext(StateContext)


  

  const splitArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const splitData = splitArray(allFav, 6);

  const renderBullet = (index, className) => 
  {
    return '<span class="' + className + '">' + (index+1) + '</span>';


  }

  return (
    <motion.div
      initial={tablet ? { marginLeft: "18%" } : { marginLeft: 0 }}
      animate={
        menuActive
          ? { marginLeft: 0 }
          : tablet
          ? { marginLeft: "18%" }
          : { marginLeft: 0 }
      }
      transition={{ duration: 0.25 }}
      className={`flex-1 lg:px-8 px-1 pt-8 relative`}
    >
      <div className=" w-full sm:px-5 max-h-[60vh] font-medium relative">
        <div
          className={
            checkedAmount <= 0 ? "flex items-center justify-between" : ""
          }
        >
          {checkedAmount <= 0 ? (
            <div className="border-b-[1px] w-full flex items-center justify-between pb-2">
              <div className="text-start basis-[30%] sm:basis-[33%] md:basis-[30%] lg:basis-1/4  text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">
                Name
              </div>
              <div className="text-start basis-1/5 text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">
                Email
              </div>
              <div className="text-start  basis-1/5 text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">
                ph no
              </div>
              <div className="text-start basis text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">
                job
              </div>
              <div className="inline-block md:hidden">
                
              </div>

              <div
                // colSpan={menuActive ? 1 : 2}
                className="text-end relative font-primary hidden md:block"
              >
                <div className="flex items-center justify-end gap-4">
                  {/* <AiFillPrinter className="text-xl" />
                  <FiDownload className="text-xl" />
                  <FiUpload className="text-xl" /> */}
                  <HiOutlineDotsVertical
                    onClick={() => setModalActive2(!modalActive2)}
                    className="text-xl cursor-pointer"
                  />
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0,
                      height: "2rem",
                      width: "5rem",
                    }}
                    animate={
                      modalActive2
                        ? {
                            opacity: 1,
                            scale: 1,
                            height: "6rem",
                            width: "15rem",
                          }
                        : {
                            opacity: 0,
                            scale: 0,
                            height: "2rem",
                            width: "5rem",
                          }
                    }
                    divansition={{ duration: 0.2 }}
                    className="absolute top-[3rem]   right-0 px-4 py-6 bg-button text-button-text shadow-lg rounded-sm z-50"
                  >
                    <div className="">
                      <div className="flex items-center justify-start gap-5">
                        <FiUpload />
                        <span>Display pixel density</span>
                      </div>
                      <div className="flex items-center justify-start gap-5">
                        <BsColumns />
                        <span>Change column order</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-b-[1px] pb-2">
              <div className="text-start w-3/5 sm:w-2/5 text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">
                <div className="flex items-center justify-start gap-3">
                  <button>
                    <AiFillMinusSquare
                      onClick={() => setMinusClick(!minusClick)}
                      className="text-2xl"
                    />
                  </button>
                  <BsFillCaretDownFill className="text-md" />
                  <span>{checkedAmount} selected</span>
                </div>
              </div>
              <div className="w-1/5   text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"></div>
              <div className=" w-1/5  text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"></div>
              <div className=" w-1/5  text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"></div>
              {/* <th className=" w-1/5 "></th> */}

              <div
                colSpan={menuActive ? 1 : 2}
                className="text-end relative hidden md:block  text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"
              >
               
                <div className=""></div>
              </div>
            </div>
          )}
        </div>

        
          <div className="w-full h-[70vh] overflow-y-auto">
            {allFav.length > 0 ? (
              
              allFav?.map((contact,index) => (
                <OftenComponent key={index} contact={contact}/>
              ))
            ) : (
              <div>
                <div className="grid place-items-center w-full h-[70vh]">
                  <h1 className="text-para text-xl md:text-2xl">No favorites contacts here.</h1>
                </div>
              </div>
            )}
          </div>



      </div>
        <div className="swiper-pagination"></div>
    </motion.div>
  );
};

export default Often;