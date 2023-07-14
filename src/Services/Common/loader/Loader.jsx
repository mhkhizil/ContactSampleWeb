import '../loader/loaderCss.css'
const Loader = () => {
  return (
    <div className='grid place-items-center h-[70vh]'>
      {/* <div className='text-center'>
        <span>Loading</span>
      </div> */}

      <div className="">
        <div className="loader">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="text-center mt-10 text-xl">Loading ...</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
