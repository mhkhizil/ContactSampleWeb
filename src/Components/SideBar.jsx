import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../Services/Context/Context";
import { FaPlus } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { LuBookDown } from "react-icons/lu";
import { BiInfoCircle } from "react-icons/bi";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useLogoutMutation } from "../Services/Apis/authApi";
import { removeUser } from "../Services/slice/userSlice";
import { useDispatch } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { BsColumns } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { logOutApi } from "../Services/Apis/authApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useMediaQuery } from "react-responsive";

const SideBar = () => {
  const location = useLocation();

  const nav = useNavigate();

  // const [logout] = useLogoutMutation()

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const [modalActive, setModalActive] = useState(false);

  const signOut = (e) => {
    e.preventDefault();
    logOutApi();
    toast.success("Logout successfully.");
  };
  const phone = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const { menuActive, setMenuActive, allContacts, allTrash, allFav } =
    useContext(StateContext);
  const [contact, setContact] = useState(false);
  const [often, setOften] = useState(false);
  const [other, setOther] = useState(false);

  const [consolidate, setConsolidate] = useState(false);
  const [trash, setTrash] = useState(false);

  const contactCount = allContacts?.length;
  const tarshCount = allTrash?.length;
  const favCount = allFav?.length;

  useEffect(() => {
    if (location.pathname == "/") setContact(true);
    if (location.pathname == "/suggestion") setConsolidate(true);
    if (location.pathname == "/person") setContact(true);
    if (location.pathname == "/often") setOften(true);
    if (location.pathname == "/other") setOther(true);
  }, []);

  return (
    <motion.div
      className="absolute w-[60%] sm:w-[37%] md:w-[25%] lg:w-[18%]  top-0 left-0 shadow-xl  bg-background py-8 h-screen  z-50   lg:block"
      initial={{ x: 0 }}
      animate={menuActive ? { x: -400 } : { x: 0 }}
      transition={{ duration: 0.25 }}
      // className={` basis-[16%]`}
    >
      <div className="px-2">
        <button
          onClick={() => setModalActive(!modalActive)}
          className="flex items-center justify-center gap-3 w-full bg-button shadow px-5 py-3 rounded-full"
        >
          <FaPlus />
          <span className="text-md text-button-text font-medium">
            Add a contact
          </span>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
              height: "2rem",
              width: "5rem",
            }}
            animate={
              modalActive
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
            transition={{ duration: 0.2 }}
            className="absolute top-0   right-0 px-4 py-6 bg-button text-button-text shadow-lg rounded-sm z-50"
          >
            <GrFormClose
              onClick={() => setModalActive(false)}
              className="absolute top-0 right-0 text-2xl cursor-pointer"
            />
            <div className="">
              <Link to={"/new"}>
                <div className="flex items-center justify-start gap-5 md:gap-2 mb-3 ">
                  <FaRegUser />
                  <span>Add contact</span>
                </div>
              </Link>
              <div className="flex items-center justify-start gap-5">
                <LuUsers />
                <span>To other contact</span>
              </div>
            </div>
          </motion.div>
        </button>
      </div>

      <div className=" mt-5">
        <div className="">
          <Link to={"/"}>
            <button
              onClick={() => (
                setContact(true),
                setOften(false),
                setOther(false),
                setConsolidate(false),
                setTrash(false),
                !phone && setMenuActive(true)
              )}
              className={`flex items-center justify-start gap-8  px-6  rounded-e-full py-2 w-full ${
                contact ? "bg-button text-button-text" : "hover:bg-hover"
              }`}
            >
              <FaRegUser />
              <div className="flex items-center justify-between gap-3 flex-1">
                <p>Contact</p>
                <span>{contactCount}</span>
              </div>
            </button>
          </Link>
          <Link to={"/fav"}>
            <button
              onClick={() => (
                setContact(false),
                setOften(true),
                setOther(false),
                setConsolidate(false),
                setTrash(false),
                !phone && setMenuActive(true)
              )}
              className={`flex items-center justify-start gap-8   px-6  rounded-e-full py-2 w-full ${
                often ? "bg-button text-button-text" : "hover:bg-hover"
              }`}
            >
              <LuBookDown />
              <div className="flex items-center justify-between gap-3 flex-1">
                <p>Favorite contacts</p>
                <span>{favCount}</span>
              </div>
            </button>
          </Link>
          <Link to={"/other"}>
            <button
              onClick={() => (
                setContact(false),
                setOften(false),
                setOther(true),
                setConsolidate(false),
                setTrash(false),
                !phone && setMenuActive(true)
              )}
              className={`flex items-center justify-between gap-8   px-6  rounded-e-full py-2 w-full ${
                other ? "bg-button text-button-text " : "hover:bg-hover"
              }`}
            >
              <div className="flex items-center justify-start gap-8">
                <RxCounterClockwiseClock />
                
                <p className="flex-1">Other contacts</p>
              </div>
              {/* <BiInfoCircle /> */}
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="px-6 mb-3">Clear and manage</h4>
        <Link to={"/suggestion"}>
          <button
            onClick={() => (
              setContact(false),
              setOften(false),
              setOther(false),
              setConsolidate(true),
              setTrash(false),
              !phone && setMenuActive(true)
            )}
            className={`flex items-center justify-start gap-8    px-6  rounded-e-full py-2 w-full ${
              consolidate ? "bg-button text-button-text" : "hover:bg-hover"
            }`}
          >
            <MdOutlineAutoFixHigh />
            <p className="truncate">To consolidate and prepare</p>
          </button>
        </Link>
        <Link to={"/trash"}>
          <button
            onClick={() => (
              setContact(false),
              setOften(false),
              setOther(false),
              setConsolidate(false),
              setTrash(true),
              !phone && setMenuActive(true)
            )}
            className={`flex items-center justify-start gap-8   px-6  rounded-e-full py-2 w-full ${
              trash ? "bg-button text-button-text" : "hover:bg-hover "
            }`}
          >
            <RiDeleteBin6Line />
            <div className="flex items-center justify-between gap-3 flex-1">
              <p>Trash can</p>
              <span>{tarshCount}</span>
            </div>
          </button>
        </Link>

        {/* <button onClick={signOut} className="px-3 py-2 bg-button text-button-text rounded-md mt-5 w-full">
          Log Out
        </button> */}
      </div>

      {/* <div className="flex items-center justify-between gap-8   px-6  rounded-e-full py-2 mt-8">
        <p>Indicator</p>
        <BiPlus className="text-xl font-bold" />
      </div> */}
    </motion.div>
  );
};

export default SideBar;
