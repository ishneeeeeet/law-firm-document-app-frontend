import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const InputPage = () => {
  const navigate = useNavigate();

  const handleNavigation = async () => {
    // Create FormData object to send files
    const formData = new FormData();
    formData.append(
      "title",
      document.querySelector('input[type="file"][name="title"]').files[0]
    );
    formData.append(
      "tax",
      document.querySelector('input[type="file"][name="tax"]').files[0]
    );
    formData.append(
      "contract",
      document.querySelector('input[type="file"][name="contract"]').files[0]
    );
    formData.append(
      "mortgage",
      document.querySelector('input[type="file"][name="mortgage"]').files[0]
    );

    try {
      // Send POST request to the API
      await axios.post(
        "https://5sx3zskz1e.execute-api.us-east-1.amazonaws.com/dev/api/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>", // Set the content type to multipart/form-data
          },
        }
      );

      // After successful upload, navigate to "/document"
      navigate("/document");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            Upload
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Please Upload your documents
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Upload your title, tax, contract and mortgage instructions
          </p>
        </div>
        <div className="flex flex-wrap">
          <input type="file" name="title" />
          <input type="file" name="tax" />
          <input type="file" name="contract" />
          <input type="file" name="mortgage" />
        </div>
        <button
          onClick={handleNavigation}
          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Derive Document
        </button>
      </div>
    </section>
  );
};

export default InputPage;
