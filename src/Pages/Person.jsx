import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editComment, getContactById } from "../Services/Apis/FireStoreApi";
import { StateContext } from "../Services/Context/Context";
import { motion } from "framer-motion";
import EditContactForm from "../Components/EditContactForm";
import { LuImagePlus } from "react-icons/lu";
import { uploadContactImage } from "../Services/Apis/ImageUploadApi";
import { useMediaQuery } from "react-responsive";
import PersonComponent from "../Components/PersonComponent";
import Loader from "../Services/Common/loader/Loader";

const Person = () => {
  const [contact, setContact] = useState();
  const { id } = useParams();


  useMemo(() => {
    getContactById(setContact, id);
  }, []);


  
 
  return (
    <div className="pb-8">
      {
        contact? (<PersonComponent key={id} contact={contact} />): (<Loader/>)
      }
    </div>
  );
};

export default Person;
