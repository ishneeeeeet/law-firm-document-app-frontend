import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

const InputPage = () => {
  const [title, setTitle] = useState(null);
  const [tax, setTax] = useState(null);
  const [contract, setContract] = useState(null);
  const [letter, setLetter] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleFile = (event, fileType) => {
    const file = event.target.files[0];
    if (fileType === "title") setTitle(file);
    if (fileType === "tax") setTax(file);
    if (fileType === "contract") setContract(file);
    if (fileType === "letter") setLetter(file);
  };

  useEffect(() => {
    console.log(title);
    console.log(tax);
    console.log(contract);
    console.log(letter);
  }, [title, tax, contract, letter]);

  const uploadDocs = async () => {
    setLoader(true)
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("tax", tax);
      formData.append("contract", contract);
      formData.append("letter", letter);

      const response = await axios.post(
        "https://5sx3zskz1e.execute-api.us-east-1.amazonaws.com/dev/api/createJob",
        formData
      );
     
        setLoader(false)
      

      console.log("Response:", response.data); // Log the response data
    } catch (error) {
      setLoader(false)
      console.error("Error:", error);
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
            Upload your title, tax, contract, and mortgage instructions
          </p>
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="title">Title</label>
          <input
            type="file"
            onChange={(e) => handleFile(e, "title")}
            name="title"
          />
          <label htmlFor="tax">Tax</label>
          <input
            type="file"
            onChange={(e) => handleFile(e, "tax")}
            name="tax"
          />
          <label htmlFor="contract">Contract</label>
          <input
            type="file"
            onChange={(e) => handleFile(e, "contract")}
            name="contract"
          />
          <label htmlFor="letter">Conveyancing Letter</label>
          <input
            type="file"
            onChange={(e) => handleFile(e, "letter")}
            name="letter"
          />
        </div>
        {loader ? (
          <button
            className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Please wait
          </button>
        ) : (
          <button
            onClick={uploadDocs} // Call uploadDocs when the button is clicked
            className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Derive Document
          </button>
        )}
      </div>
    </section>
  );
};

export default InputPage;
