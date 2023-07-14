import { BiUserCircle } from "react-icons/bi";
import { deleteTrash, postContactData } from "../Services/Apis/FireStoreApi";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const TrashTableComponent = ({ trash, index }) => {
  const trashId = trash?.id;
  const contactImage = trash?.imgUrl;
  const delay = 0.1 * index
  const variant = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay } },
  };
  const miniPhone = useMediaQuery({
    query: '(min-width: 10px)'
  })

  const userName = trash?.name;

  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-[#14ae9c] text-white px-3 py-2 rounded-md text-xl ml-3 mx-3",
      cancelButton: "bg-red-500 text-white px-3 py-2 rounded-md text-xl",
    },
    buttonsStyling: false,
  });

  const handleTrashRecover = () => {
    swalWithButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes,recover!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteTrash(trashId);
          postContactData(trash);
          swalWithButtons.fire(
            "Deleted!",
            "Your contact has been recovered.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithButtons.fire(
            "Cancelled",
            "Your imaginary contact is safe :)",
            "error"
          );
        }
      });
  };
  const handleTrashDelete = () => {
    swalWithButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes,delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteTrash(trashId);
          swalWithButtons.fire(
            "Deleted!",
            "Your contact has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithButtons.fire(
            "Cancelled",
            "Your imaginary contact is safe :)",
            "error"
          );
        }
      });
  };
  return (
    <motion.tr
    initial={'closed'}
animate={'open'}
variants={variant}
     className="trashRow ">
      <td rowSpan={2} className="flex items-center justify-start gap-2">
        <div className="flex items-center justify-start gap-2">

        <div
          className="md:w-10 md:h-10 w-6 h-6  overflow-hidden "
        >
          {contactImage ? (
            <img
              src={contactImage}
              className="w-full h-full rounded-full "
              alt=""
            />
          ) : (
            <div
              className={`w-full h-full rounded-full bg-[#14ae9c] grid place-items-center`}
            >
              <h1 className="text-xl ">{userName && userName[0]}</h1>
            </div>
          )}
        </div>
        <h1 className="text-headline">{userName}</h1>
        </div>

      </td>

      {/* <td className="text-headline">{miniPhone? 'Deleted in ...': 'Deleted in Google Contacts (web).'}</td> */}
      
      <td className="text-headline">{trash?.deletionDate}</td>

      <td className="flex items-center justify-start gap-2 w-1/4">
        <div onClick={handleTrashRecover} className="recoverBtn">
          <button className="text-headline">Recover</button>
        </div>
        <div onClick={handleTrashDelete} className="recoverBtn">
          <button className="text-headline">Delete</button>
        </div>
      </td>
    </motion.tr>
  );
};

export default TrashTableComponent;
