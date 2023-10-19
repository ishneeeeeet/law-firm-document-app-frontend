import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import timer from '../../config.json'
import Dealform from "../components/Dealform";
import { db, updateDb } from '../models/db';
import Breadcrumbs from "../components/Breadcrumb";
import { Col,Container, Form, Input, Label, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { eventService } from "../event";


const InputPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [tax, setTax] = useState(null);
  const [contract, setContract] = useState(null);
  const [letter, setLetter] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [jobId, setJobId] = useState('')
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
    if (fileType === "template") setTemplate(file);
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
      // formdata.append("template",template)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
     
      axios.post('https://5sx3zskz1e.execute-api.us-east-1.amazonaws.com/dev/api/createJob', formdata, config).then((response) => {
        console.log("c]jobId",response);
        if(response.jobId)
          setJobId(response?.jobId)
          navigate("/Mydeal")
          let status = 'in-progress'
          let jobId = response?.jobId
          db.dealItems.add({ jobId,no, file,status})
          interval = setInterval(function () {
            getJobData(response?.jobId)
            console.log("inside the interval")
            intervalCount++
          }, timer.timerTime);
          console.log(timer.timerTime)
      });
      //   navigate("/Mydeal")
      // let status = 'in-progress'
      // db.dealItems.add({ jobId,no, file,status})
      // interval = setInterval(function () {
      //   getJobData(jobId)
      //   console.log("inside the interval")
      //   intervalCount++
      // }, timer.timerTime);
      // console.log(timer.timerTime)
      console.log("file",file, no)
    } catch (error) {
      setLoader(false)
      console.error("Error:", error);
      alert("Something went wrong!")
    }
  };



 async function getJobData(_jobId) {
  let data = {
    "jobId": _jobId
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
    console.log(response);
    // clearInterval(interval);
    if(response?.data) {
      setFormdata(response?.parameters)
      setLoader(false)
      clearInterval(interval);
      /** updating the data */
      updateDb(_jobId, response.data)
      let msg = {
        response, jobId: _jobId
      }
      eventService.sendEvent(msg);
      // alert("Process is completed, downloading document!")
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
  console.log(event.target.value,'value')
  setFileno(event?.target?.value)
}

const handleDealChange = (e) => {
  console.log(e.target.value)
  e.preventDefault();
  setFile(e.target.value)
};

  return (
    <div className="page-content">
    <Container fluid>
    {/* Render Breadcrumbs */}
    <Breadcrumbs title="Your title, tax, contract, and mortgage instructions" breadcrumbItem="Upload Documents" />

    <Row>
      <Col xs={12}>
        {/* import TextualInputs */}
        <Card>
                <CardHeader className="justify-content-between d-flex align-items-center">
                    {/* <h4 className="card-title">Fill all the fileds</h4> */}
                    <Link to="//reactstrap.github.io/components/form/" target="_blank" rel="noreferrer" className="btn btn-sm btn-soft-secondary">Fill all the fileds <i className="mdi mdi-arrow-right align-middle"></i></Link>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xl={6}>
                            <div>
                                <Row className="mb-3">
                                    <Label className="col-md-2 col-form-label"> Deal Type</Label>
                                    <Col md={10}>
                                        <Input type="select" onChange={handleDealChange} className="form-select" defaultValue="">
                                            <option value="">Select</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Purchase">Purchase</option>
                                            <option value="Refinance">Refinance</option>
                                            <option value="Refinance">Custom</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Label htmlFor="example-text-input" className="col-md-2 col-form-label"> File number</Label>
                                    <Col md={10}>
                                        <Input value={no} id="fileno"  onChange={(data)=> handleChange(data, 'bankAddress')} className="form-control" type="text" defaultValue=""  />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <div className="col-xl-6">
                            <Row className="mb-3 mt-3 mt-xl-0">
                              <Label htmlFor="formFile" className="form-label">
                                  Title
                                </Label>
                               <Input name="title" className="form-control" type="file" id="title" onChange={(e) => handleFile(e, "title")}/>
                            </Row>
                            <Row className="mb-3 mt-3 mt-xl-0">
                              <Label htmlFor="formFile" className="form-label">
                                Tax
                              </Label> 
                              <Input className="form-control"
                                  type="file"
                                  onChange={(e) => handleFile(e, "tax")}
                                  name="tax"
                                />
                            </Row>
                            <Row className="mb-3">
                              <Label htmlFor="formFile" className="form-label">
                                  Contract
                                </Label> 
                              <Input className="form-control"
                                  type="file"
                                  onChange={(e) => handleFile(e, "contract")}
                                  name="contract"
                                />
                            </Row>
                            <Row className="mb-3">
                              <Label htmlFor="formFile" className="form-label">
                                 Conveyancing Letter
                                </Label> 
                              <Input className="form-control"
                                  type="file"
                                  onChange={(e) => handleFile(e, "letter")}
                                  name="letter"
                                />
                            </Row>
                             <Row className="mb-3">
                                  <Label htmlFor="formFile" className="form-label">
                                    Template
                                    </Label> 
                                  <Input className="form-control"
                                      type="file"
                                      onChange={(e) => handleFile(e, "template")}
                                      name="template"
                                    />
                                </Row>
                        </div>
                        <div className="mt-4">
                        {loader ? (
                        <Button color="primary" type="submit" className="w-md">
                          Please wait
                        </Button>)
                        :
                        (<Button onClick={uploadDocs} color="primary" type="submit" className="w-md">
                           Derive Document
                        </Button>
                        )}
                      </div>
                    </Row>
                </CardBody>
            </Card>
      </Col>
        {   
          formData!== null ? (
              <Dealform jobId={jobId} data={formData}/>
        ) : null 
        }
    </Row>
  </Container>
</div>
);
};

export default InputPage;
