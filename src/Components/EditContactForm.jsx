import moment from "moment";
import { useEffect, useState } from "react";
import { editComment } from "../Services/Apis/FireStoreApi";
import { useNavigate } from "react-router-dom";


const EditContactForm = ({contact,imgUrl, inputImage,originImg}) => {

    const BtnDisable = inputImage==0 ? false: (imgUrl? false:true )


    





    const [name, setName] = useState(contact?.name);
    const [phone, setPhone] = useState(contact?.phone);
    const [email, setEmail] = useState(contact?.email);
    const [address, setAddress] = useState(contact?.address);
    const [jobTitle, setJobTitle] = useState(contact?.jobTitle);
  const getTime = () => moment().format('llll')

  const nav = useNavigate()



  const [updateData, setUpdateData] = useState({ ...contact,name, phone, email, address, jobTitle,imgUrl, updateDate:getTime()})

 


  useEffect(() => {
    // setUpdateData({ ...contact,name, phone, email, address, jobTitle,imgUrl, updateDate:getTime()})
    if(imgUrl){
      setUpdateData({ ...contact,name, phone, email, address, jobTitle,imgUrl, updateDate:getTime()})
    }
    else{
      setUpdateData({ ...contact,name, phone, email, address, jobTitle,imgUrl:originImg, updateDate:getTime()})
    }

  }, [imgUrl])

  useEffect(() => {
    setUpdateData({ ...contact,name, phone, email, address, jobTitle,imgUrl:originImg, updateDate:getTime()})
  }, [name, phone, email, address, jobTitle])



// const updateData = { ...contact,name, phone, email, address, jobTitle, updateDate:getTime()}

const contactId = contact?.id  






    const handleEditContact = (e) => {
        e.preventDefault()
         editComment(contactId, updateData)
        nav('/')
      }
  return (
    <form onSubmit={handleEditContact} action="" className=" w-[20rem] md:w-[25rem] mb-10 mt-4 bg-background px-8 py-6 shadow-xl rounded-lg">
        
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
            placeholder="Email"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
          />
        </div>
        <div className="my-5">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
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
          <button disabled={BtnDisable} type="submit" className={`bg-button px-3 py-2 text-button-text rounded-md disabled:cursor-wait disabled:opacity-70 `}>
            {
                BtnDisable? (<span>Loading...</span>): (<span>Update contact</span>)
            }
            
            
            
          </button>

        </div>
      </form>


   
  )
}

export default EditContactForm
