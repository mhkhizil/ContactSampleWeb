import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { editComment, getContactById } from "../Services/Apis/FireStoreApi";
import { StateContext } from "../Services/Context/Context";
import { motion } from "framer-motion";
import EditContactForm from "../Components/EditContactForm";
import { IoIosArrowBack } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { uploadContactImage } from "../Services/Apis/ImageUploadApi";
import { useMediaQuery } from "react-responsive";

import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';

const PersonComponent = ({ contact }) => {
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
  const nav = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const originImg = contact?.imgUrl;

  const [seenTimeCount, setSeenTimeCount] = useState(contact?.seenTime);


  // const [name, setName] = useState(contact?.name);
  // const [phone, setPhone] = useState(contact?.phone);
  // const [email, setEmail] = useState(contact?.email);
  // const [address, setAddress] = useState(contact?.address);
  // const [jobTitle, setJobTitle] = useState(contact?.jobTitle);

  const fileRef = useRef(null);
  const [progresspercent, setProgressPercent] = useState(0);
  const [inputImage, setInputImage] = useState(0);

  const [imgUrl, setImgUrl] = useState("");

  const handleImageUpload = (event) => {
    uploadContactImage(event.target.files[0], setImgUrl, setProgressPercent);

    const file = event?.target?.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setInputImage(imageURL);
    }
  };

  const { menuActive } = useContext(StateContext);

  // const token = localStorage.getItem("token");
  const username = contact?.name;

  const [editActive, setEditActive] = useState(false);

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
      className={` bg-transparent max-h-[100vh] rounded-2xl ${
        menuActive ? "" : ""
      }`}
    >
      <div className="w-full md:w-3/4 mx-auto">
        <div className=" pt-10   bg-cover">
          <div>
            <Link to={"/"}>
              <IoIosArrowBack className=" text-3xl     cursor-pointer" />
            </Link>
          </div>
          {/* Profile+Edit btn div */}
          <div className="pb-4 mr-8 border-b-2  flex items-end justify-center">
            {editActive ? (
              <div className="">
                <div
                  onClick={() => fileRef.current.click()}
                  className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem]  lg:w-[8rem] lg:h-[8rem] mb-8 bg-button rounded-full grid place-items-center cursor-pointer overflow-hidden"
                >
                  {inputImage ? (
                    <img
                      src={inputImage}
                      className="block w-full h-full"
                      alt=""
                    />
                  ) : originImg ? (
                    <img
                      src={originImg}
                      className="block w-full h-full"
                      alt=""
                    />
                  ) : (
                    <LuImagePlus className="text-button-text text-4xl" />
                  )}
                </div>
                <input
                  ref={fileRef}
                  onChange={(event) => handleImageUpload(event)}
                  type="file"
                  name=""
                  id=""
                  className="hidden"
                />
              </div>
            ) : (
              <div className=" gap-8">
                {contact?.imgUrl ? (
                  <div onClick={open} className="w-[10rem] h-[10rem] rounded-full overflow-hidden">
                    <img
                      src={contact?.imgUrl}
                      className="w-full h-full block"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="w-[10rem] h-[10rem] rounded-full bg-button grid place-items-center">
                    <h1 className="text-5xl">{username && username[0]}</h1>
                  </div>
                )}
                <h1 className=" text-center text-xl gap-5">{username}</h1>
                <div className=" my-2 flex justify-center items-center gap-5">
                  <HiPhone className="  text-xl    cursor-pointer" />
                  <MdEmail className=" text-xl    cursor-pointer" />
                </div>
              </div>
            )}
          </div>


          <Modal opened={opened} onClose={close} title="Photo">
        <img src={contact?.imgUrl} className="" alt="" />
      </Modal>


          <div className="  ">
            {/* Edit btn */}
            <div className="text-left my-4 mx-3 w-[80%]">
              <button
                onClick={() => setEditActive(!editActive)}
                className="bg-button px-4 py-2 rounded-xl  text-white font-semibold hover:shadow-xl hover:bg-[#107d70]"
              >
                {
                  editActive? (
                    <span>Back to Profile</span>

                  ): (

                    <span>Edit Profile</span>
                  )
                }
              </button>
            </div>
            {editActive ? (
              <div className="grid place-items-center">
                <EditContactForm
                contact={contact}
                imgUrl={imgUrl}
                inputImage={inputImage}
                originImg={originImg}
              />
              </div>
            ) : (
              <div className="mt-10 sm:flex sm:mx-4 rounded-xl  items-stretch justify-between px-5 py-4 md:gap-10">
                <div className="border-2 rounded-md px-6 py-4 basis-[45%]">
                  <h4 className="text-lg md:text-xl text-header">Contact details</h4>
                  <p className="text-para text-md md:text-lg mt-3">Phone number - {contact?.phone}</p>
                  {
                    contact?.email ? (

                      <p className="text-para text-md md:text-lg mt-3">Email - {contact?.email}</p>
                    ):(
                      <p className="text-para text-md md:text-lg mt-3">No email</p>

                    )
                  }
                </div>
                <div className="border-2 rounded-md px-6 py-4 basis-[50%] ">
                  <h4 className="text-lg md:text-xl text-header">Records</h4>
                  <p className="text-para text-md md:text-lg mt-3">Last update time : {contact?.updateDate}</p>
                  <p className="text-para text-md md:text-lg mt-3">Created at : {contact?.createDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonComponent;
