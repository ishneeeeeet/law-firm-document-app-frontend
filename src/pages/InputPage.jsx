import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import timer from '../../config.json'
import SelectComponent from "../components/SelectComponent";
import Dealform from "../components/Dealform";
import { db } from '../models/db';

const InputPage = () => {
  const [title, setTitle] = useState(null);
  const [tax, setTax] = useState(null);
  const [contract, setContract] = useState(null);
  const [letter, setLetter] = useState(null);
  const [loader, setLoader] = useState(false);
  const [jobId, setJobId] = useState('1696769593369-311394879')
  const [file, setFile] = useState('')
  const [no, setFileno] = useState('')
  const [formData, setFormdata] = useState(null)

  const handleFile = (event, fileType) => {
    console.log(event,fileType)
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

  let interval;
  let intervalCount = 0;
  const uploadDocs = async () => {
    setLoader(true)
    try {
      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("tax", tax);
      formdata.append("contract", contract);
      formdata.append("mortgage", letter);
      formdata.append("fileno", no);
      formdata.append("dealtype",file)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
     
      // axios.post('https://5sx3zskz1e.execute-api.us-east-1.amazonaws.com/dev/api/createJob', formdata, config).then((response) => {
      //   console.log(response.data.jobId);
      //   if(response.data.jobId)
      //     setJobId(response?.data?.jobId)
      //     let status = 'in-progress'
      //     db.dealItems.add({ jobId,no, file,status})
      //     interval = setInterval(function () {
      //       getJobData()
      //       console.log("inside the interval")
      //       intervalCount++
      //     }, timer.timerTime);
      //     console.log(timer.timerTime)
      //     var data = downloadBase64File('application/msword',response.data,'deal.doc')
      //   // interval = setInterval(function () {
      //   //   getJobData()
      //   //   console.log("inside the interval")
      //   // }, timer.timerTime);
      // });
      let status = 'in-progress'
      db.dealItems.add({ jobId,no, file,status})
      interval = setInterval(function () {
        getJobData()
        console.log("inside the interval")
        intervalCount++
      }, timer.timerTime);
      console.log(timer.timerTime)
      console.log("file",file, no)
    } catch (error) {
      setLoader(false)
      console.error("Error:", error);
      alert("Something went wrong!")
    }
  };

  function downloadBase64File(contentType, base64Data, fileName) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

 async function getJobData() {
  let data = {
    "jobId": jobId
  }
  const config = {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };
  console.log(data)
  axios.post('https://5sx3zskz1e.execute-api.us-east-1.amazonaws.com/dev/api/getResults',
  data, config).then((response) => {
    console.log(response.data);
    // clearInterval(interval);
    if(response?.data?.data) {
      setFormdata(response?.data?.parameters)
      setLoader(false)
      var data = downloadBase64File('application/msword',response.data.data,'deal.doc')
      clearInterval(interval);
      alert("Process is completed, downloading document!")
    } else {
      console.log("in progress")
      if(intervalCount == timer?.intervalCount) {
        alert("Something went wrong!")
      }
    }
  });
 }



 const changeEvent = (value)=> {
  console.log(value)
  setFile(value)
};

function handleChange(event) {
  setFileno(event?.target?.value)
}

  return (
    <section className="text-gray-600 body-font">
      <h1 class="mt-10 mb-4 text-indigo-500 center text-4xl flex items-center justify-center font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl">Upload</h1>
      <p class=" text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 flex items-center justify-center dark:text-gray-400">Please Upload your documents.</p>
      <p class="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 flex items-center justify-center dark:text-gray-400">Upload your title, tax, contract, and mortgage instructions.</p>
      <div class="flex justify-center mt-10 px-8">
       <form class="max-w-2xl">
       <div class="flex flex-wrap border shadow rounded-lg p-3 bg-white">
       
          <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">Upload Documents</h2>
          <div class="flex flex-col gap-2 w-full border-gray-400">
          <div className="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="text-gray-600 dark:text-gray-400" for="grid-first-name">
                   Deal Type
            </label>
            <SelectComponent fileChange={changeEvent} options={["Sale", "Purchase", "Refinance"]} />
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="text-gray-600 dark:text-gray-400" for="grid-first-name">
                   File number
                </label>
                <input onChange={(data)=> handleChange(data, 'bankAddress')} value={no} class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" id="fileno" type="text" placeholder=" "/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
          </div>
            <div>
                <label class="text-gray-600 dark:text-gray-400">Title
                </label>
                <input
                  class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  type="file"
                  onChange={(e) => handleFile(e, "title")}
                  name="title"
                />
           </div>
          <div>
              <label class="text-gray-600 dark:text-gray-400">Tax</label>
              <input
                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="file"
                onChange={(e) => handleFile(e, "tax")}
                name="tax"
              />
          </div>
          <div>
              <label class="text-gray-600 dark:text-gray-400">Contract</label>
              <input
                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="file"
                onChange={(e) => handleFile(e, "contract")}
                name="contract"
              />
          </div>
          <div>
              <label class="text-gray-600 dark:text-gray-400">Conveyancing Letter</label>
              <input
                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="file"
                onChange={(e) => handleFile(e, "letter")}
                name="contract"
              />
          </div>
       </div>
       </div>
       </form>
       </div>
        {loader ? (
          <button
            className="flex mx-auto mt-10 px-2 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Please wait
          </button>
        ) : (
          <button
            onClick={uploadDocs} // Call uploadDocs when the button is clicked
            className="flex mx-auto mt-10 px-2 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Derive Document
          </button>
        )}
        {
           formData!== null ? (
            <div class="flex justify-center mt-10 px-8 mb-4">
               <Dealform jobId={jobId} data={formData}/>
               <br/>
               <br/>
            </div>
          ) : null
        }
    </section>
  );
};

export default InputPage;
