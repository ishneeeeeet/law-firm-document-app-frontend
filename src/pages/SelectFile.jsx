import { useNavigate } from "react-router-dom";

const SelectFile = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/input-page");
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Please select file type
        </h1>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div onClick={handleNavigation} className="p-4 lg:w-1/3">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                SALE
              </h1>
            </div>
          </div>
          <div onClick={handleNavigation} className="p-4 lg:w-1/3">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                PURCHASE
              </h1>
            </div>
          </div>
          <div onClick={handleNavigation} className="p-4 lg:w-1/3">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                REFINANCE
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectFile;
