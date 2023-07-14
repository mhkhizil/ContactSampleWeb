import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTrashData } from "../Services/Apis/FireStoreApi";
import { motion } from "framer-motion";
import TrashTableComponent from "../Components/TrashTableComponent";
import { StateContext } from "../Services/Context/Context";
import { useMediaQuery } from "react-responsive";

const TrashTable = () => {

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
  const [allTrash, setAllTrash] = useState([]);
  const nav = useNavigate();

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  const { menuActive } = useContext(StateContext);

  useMemo(() => {
    getAllTrashData(setAllTrash, userEmail);
  }, []);


  return (
    <motion.div
    initial={tablet?{ marginLeft: "18%" }:{ marginLeft: 0 }}
    animate={menuActive ? { marginLeft: 0 } :( tablet?{ marginLeft: "18%" }:{ marginLeft: 0 })}
      transition={{ duration: 0.25 }}
      className={`flex-1 md:px-8   max-h-[80vh] overflow-y-auto`}
    >
      <table className="table-auto w-full px-5 font-medium">
        <thead className="text-headline">
            <tr>
                <td rowSpan={2} className="w-1/2 text-headline">Name</td>
                {/* <td className="w-1/3 text-headline">Why is in the trash?</td> */}
                <td className="w-1/2 text-headline">date of deletion</td>
                <td></td>
            </tr>
        </thead>
        <tbody className="">
        {/* <tr className="">
            <td className="">
              <p className="my-3 w-full text-headline">Trash ({allTrash?.length})</p>
            </td>
          </tr> */}
            {allTrash.length>0?(allTrash?.map((trash, index) => <TrashTableComponent key={trash.id} trash={trash} index={index}/>)):(
              <tr className="w-full h-[60vh] grid place-items-center">
                <td className="text-para text-xl md:text-2xl">
                  No trash contact.
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default TrashTable;
