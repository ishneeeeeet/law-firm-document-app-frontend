import React, { useMemo, useState } from "react";
import axios from "axios"; // Import Axios

const Dealform = ({data, jobId}) => {
    console.log("formdata",data)
    const [dealData, setData] = useState(data)
    function handleChange (event, KEY) {
        console.log(event?.target?.value, "Data")
        let d = {...dealData}
        d[KEY] = event?.target?.value
        setData(d)
    }

    function updateDeal () {
        let data = {
            "jobId": jobId,
            ...dealData
          }
          const config = {
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
          };
          console.log(data)
          axios.post('https://5sx3zskz1e.execute-api.us-east-1.amazonaws.com/dev/api/updateResults',
          data, config).then((response) => {
            console.log(response.data);
            if(response?.data?.data) {
              var data = downloadBase64File('application/msword',response.data.data,'deal.doc')
              alert("Process is completed, downloading document!")
            } else {
              console.log("in progress")
              if(intervalCount == timer?.intervalCount) {
                alert("Something went wrong!")
              }
            }
          });
    }

    function downloadBase64File(contentType, base64Data, fileName) {
        const linkSource = `data:${contentType};base64,${base64Data}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    return(
        <form class="w-full max-w-2xl flex-wrap border shadow rounded-lg p-3 bg-white">
            <div class="flex flex-wrap -mx-3 mb-6 ">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Bank Address
                </label>
                <input onChange={(data)=> handleChange(data, 'bankAddress')} value={dealData.bankAddress} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="bankAddress" type="text" placeholder="Jane"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Bank Name
                </label>
                <input onChange={(data)=> handleChange(data, 'bankName')} value={dealData.bankName} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="bankName" type="text" placeholder="Doe"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Buyer Names
                </label>
                <input onChange={(data)=> handleChange(data, 'buyerNames')} value={dealData.buyerNames} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="buyerNames" type="text" placeholder="Jane"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Closing Date
                </label>
                <input onChange={(data)=> handleChange(data, 'closingDate')} value={dealData.closingDate} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="closingDate" type="text" placeholder="Doe"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Legal Block
                </label>
                <input onChange={(data)=> handleChange(data, 'legalBlock')} value={dealData.legalBlock} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="legalBlock" type="text" placeholder="legalBlock"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Legal Lot
                </label>
                <input onChange={(data)=> handleChange(data, 'legalLot')} value={dealData.legalLot} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="legalLot" type="text" placeholder="legalLot"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Owners
                    </label>
                    <input onChange={(data)=> handleChange(data, 'owners')} value={dealData.owners} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="owners" type="text" placeholder="Jane"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Property Address
                    </label>
                    <input onChange={(data)=> handleChange(data, 'propertyAddress')} value={dealData.propertyAddress} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="propertyAddress" type="text" placeholder="propertyAddress"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                    Purchase Price
                    </label>
                    <input onChange={(data)=> handleChange(data, 'purchasePrice')} value={dealData.purchasePrice} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="purchasePrice" type="text" placeholder="purchasePrice"/>
                </div>
                <div class="w-full md:w-1/2 px-3" style={{alignSelf:'flex-end'}}>
                    <button
                        type="submit"
                        onClick={(e)=> {e.preventDefault(); updateDeal()}}
                        className="flex mx-auto   text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Dealform