import { BiMenu } from "react-icons/bi";
import { GrCircleQuestion } from "react-icons/gr";
import { TbSettings } from "react-icons/tb";
import { TbGridDots } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";
import { MdSearch } from "react-icons/md";

import user from "../../img/user.png";
import { useContext } from "react";
import { StateContext } from "../Services/Context/Context";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const nav = useNavigate();

  const { menuActive, setMenuActive, searchContact, setSearchContact,logoutActive,setLogoutActive, currentUser } =
    useContext(StateContext);


  return (
    <div className="flex justify-between items-center  gap-10 px-6 pt-2">
      <div className="flex items-center justify-start gap-3 basis-[20%] lg:basis-[18%]">
        <button
          onClick={() => setMenuActive(!menuActive)}
          className="p-3 hover:bg-[#3a4855] duration-200 rounded-full"
        >
          <BiMenu className="text-2xl" />
        </button>
        <div className="flex justify-start items-center gap-2">
          <img src={user} alt="" className="w-[2.5rem]" />
          <p className="text-xl">Friends</p>
        </div>
      </div>
      <div className="flex items-center justify-start flex-1">
        <div className="bg-[#2a343e] border border-[#3f4851] rounded-full px-3 py-3 basis-[60%] md:flex items-center justify-start gap-5   hidden ">
          <button>
            <MdSearch className="text-xl" />
          </button>
          <input
            type="text"
            value={searchContact}
            onChange={(event) => (
              setSearchContact(event.target.value), nav("/")
            )}
            placeholder="Search"
            className="focus:outline-none bg-transparent flex-1"
          />
        </div>
        
      </div>
      <div className=" items-center justify-start gap-3  flex">
      {/* <div className="flex items-center justify-start gap-6 px-5 text-white">
          <GrCircleQuestion className="text-2xl text-white " />
          <TbSettings className="text-2xl" />
        </div> */}
        {/* <div className="flex items-center gap-5 ">
          <TbGridDots className="text-xl" />
          <button onClick={()=>setLogoutActive(!logoutActive)} className="p-3 hover:bg-gray-300 hover:rounded-full">
          <BiUserCircle className="text-4xl"  />
          </button>
        </div> */}
          <button className="flex items-center justify-start gap-2">
          <BiUserCircle  onClick={()=>setLogoutActive(!logoutActive)} className="text-4xl"  />
          <h2 className="text-para capitalize">{currentUser?.name}</h2>

          </button>
      </div>
    </div>
  );
};

export default NavBar;
