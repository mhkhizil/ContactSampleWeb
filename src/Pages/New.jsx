import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../Services/Context/Context";
import {  postContactData } from "../Services/Apis/FireStoreApi";
import moment from "moment/moment";
import { getUniqueID } from "../Services/Common/Uuid/UniqueId";
import {LuImagePlus} from 'react-icons/lu'
import { uploadContactImage } from "../Services/Apis/ImageUploadApi";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";





const New = () => {
  const nav = useNavigate();
  const { menuActive, currentUser } = useContext(StateContext);

  const [progresspercent, setProgressPercent] = useState(0);

  

  // const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem('userEmail')


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");

const fileRef = useRef()


  const [inputImage, setInputImage] = useState(0);

  const [imgUrl, setImgUrl] = useState("")

  const userName = currentUser?.name

  const seenTime = 0
  



 const id = getUniqueID()


  const getTime = () => moment().format('llll')
  const contactData = { email, name, phone,  address, jobTitle,imgUrl,seenTime, createDate: getTime(), updateDate: getTime(),contactId:id,userName,userEmail };


  

  const handleCreateContact= (e) => {
    e.preventDefault();
    postContactData(contactData)
    nav('/')
    toast.success('Contact created.')
    
  }

  const handleImageUpload = (event) => {
    uploadContactImage(event.target.files[0], setImgUrl, setProgressPercent);

    const file = event?.target?.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setInputImage(imageURL);
    }
  };

  const BtnDisable = inputImage==0 ? false: (imgUrl? false:true )


  const tablet = useMediaQuery({
    query: "(min-width: 1024px)",
  });

 

 

  // useEffect(() => {
  //   if (!token) nav("/login");
  // }, []);
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
      className={`bg-transparent  pt-8 px-8 grid place-items-center ${menuActive ? "" : ""}`}
    >
      <form onSubmit={handleCreateContact} action="" className=" w-[20rem] md:w-[25rem] bg-background shadow-2xl rounded-lg px-8 py-6">
        <div onClick={() => fileRef.current.click()} className="w-[8rem] h-[8rem] overflow-hidden mb-8 bg-button rounded-full grid place-items-center cursor-pointer" >
        {inputImage? (
                  <img src={inputImage} className="block w-full h-full" alt="" />
                    
                ): (

                    <LuImagePlus className="text-button-text text-4xl" />
                )}
        </div>
        <input ref={fileRef} onChange={handleImageUpload} type="file" name="" id="" className="hidden" />
        <div className="">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
            required
          />
        </div>
        <div className="my-5">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Phone"
            required

            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2 "
          />
        </div>
        <div className="">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            // required
            placeholder="Email"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
          />
        </div>
        <div className="my-5">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            // required
            placeholder="Address"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
          />
        </div>
        <div className="my-5">
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            type="text"
            placeholder="Job title"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
          />
        </div>
        <div className="">
          <button disabled={BtnDisable} className="bg-button px-3 py-2 text-button-text rounded-md disabled:cursor-wait">
          {
                BtnDisable? (<span>Loading...</span>): (<span>Add contact</span>)
            }
          </button>
        </div>
      </form>

      
      
    </motion.div>
  );
};

export default New;
