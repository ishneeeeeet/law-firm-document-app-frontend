import React, { useMemo, useState } from "react";
import axios from "axios"; // Import Axios
import { updateDb } from "../models/db";
import { Col,Container, Form, Input, Label, Row, Card, CardHeader, CardBody, Button } from "reactstrap";

const FormDeal = ({data, jobId}) => {
    console.log("formdata",data)
    const [dealData, setData] = useState(data)

    console.log("formdata dealdata***",dealData)
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
              updateDb(jobId, response.data.data)
              var data = downloadBase64File('application/msword',response.data.data,'deal.doc')
              alert("Process is completed, downloading document!")
            } else {
              console.log("in progress")
              alert("Something went wrong!")
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
       <form>
            <div class="flex flex-wrap -mx-3 mb-6 ">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label className="form-label"  for="grid-first-name">
                    Bank Address
                </Label>
                <input onChange={(data)=> handleChange(data, 'bankAddress')} value={dealData.bankAddress} className="form-control" id="bankAddress" type="text" placeholder="Jane"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                <Label className="form-label"  for="grid-last-name">
                    Bank Name
                </Label>
                <input onChange={(data)=> handleChange(data, 'bankName')} value={dealData.bankName} className="form-control" id="bankName" type="text" placeholder="Doe"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label className="form-label"  for="grid-first-name">
                Buyer Names
                </Label>
                <input onChange={(data)=> handleChange(data, 'buyerNames')} value={dealData.buyerNames} className="form-control" id="buyerNames" type="text" placeholder="Jane"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                <Label className="form-label"  for="grid-last-name">
                Closing Date
                </Label>
                <input onChange={(data)=> handleChange(data, 'closingDate')} value={dealData.closingDate} className="form-control" id="closingDate" type="text" placeholder="Doe"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label className="form-label"  for="grid-first-name">
                Legal Block
                </Label>
                <input onChange={(data)=> handleChange(data, 'legalBlock')} value={dealData.legalBlock} className="form-control" id="legalBlock" type="text" placeholder="legalBlock"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                <Label className="form-label"  for="grid-last-name">
                    Legal Lot
                </Label>
                <input onChange={(data)=> handleChange(data, 'legalLot')} value={dealData.legalLot} className="form-control" id="legalLot" type="text" placeholder="legalLot"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label className="form-label"  for="grid-first-name">
                    Owners
                    </Label>
                    <input onChange={(data)=> handleChange(data, 'owners')} value={dealData.owners} className="form-control" id="owners" type="text" placeholder="Jane"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <Label className="form-label"  for="grid-last-name">
                    Property Address
                    </Label>
                    <input onChange={(data)=> handleChange(data, 'propertyAddress')} value={dealData.propertyAddress} className="form-control" id="propertyAddress" type="text" placeholder="propertyAddress"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label className="form-label"  for="grid-zip">
                    Purchase Price
                    </Label>
                    <input onChange={(data)=> handleChange(data, 'purchasePrice')} value={dealData.purchasePrice} className="form-control" id="purchasePrice" type="text" placeholder="purchasePrice"/>
                </div>
            </div>
            {/* <div>
                <Button onClick={(e)=> {e.preventDefault();updateDeal()}}
                    color="primary" type="submit" className="w-md">
                    Submit
                </Button>
            </div> */}
        </form>
    )
}

export default FormDeal