import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from '../models/db';
import { Col,Container, Form, Input, Label, Row, Card, CardHeader, CardBody, Button, Modal} from "reactstrap";
import { eventService } from '../event';
import { colors } from '@mui/material';
import Dealform from '../components/Dealform';
import FormDeal from '../components/FormDeal';
import axios from "axios"; // Import Axios
import { updateDb } from "../models/db";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function MyDeal() {

  const [deal, setDeal] = React.useState([])
  const [isOpen, setOpenModal] = React.useState(false);
  const [ res, setRes] = React.useState({})
  const [ jobId, setJobId] = React.useState({})
  const [modal_scroll, setmodal_scroll] = React.useState(false);
  const [dealData, setData] = React.useState({})
  const [no, setFileno] = React.useState('')
  const [month, setmonth] = React.useState('')

  console.log("formdata dealdata***",dealData)
  function handleChange (event, KEY) {
      console.log(event?.target?.value, "Data", KEY)
      let d = {...dealData}
      d[KEY] = event?.target?.value
      setData(d)
  }

  function updateDeal () {
    try {
      console.log(dealData, 'inside udpateddel')
      let body = {...dealData}
      delete body.filePaths
        let data = {
            "jobId": jobId,
            ...body
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
            console.log(response,"adter update deal");
            if(response?.data) {
              updateDb(jobId, response.data, response.parameters)
              var data = downloadBase64File('application/msword',response.data,'deal.doc')
              alert("Process is completed, downloading document!")
              setmodal_scroll(false)
              setOpenModal(false)
            } else {
              console.log("in progress")
              setmodal_scroll(false)
              setOpenModal(false)
              alert("Something went wrong!")
            }
          })
          .then(data => {
              console.log("inside data")
          })
          .catch( error => {
              console.log("inside eroor")
              console.log("inside exception")
              setmodal_scroll(false)
              setOpenModal(false)
              alert("Something went wrong, Please try after some time!")
          });
    } catch(e) {
      console.log("inside exception")
      setmodal_scroll(false)
      setOpenModal(false)
      alert("Something went wrong, Please try after some time!")
    }
  }


  React.useEffect(()=> {
    finddata()
    eventService.getEvent().subscribe(data => {
      console.log('Subscribed data --', data)
      setRes(data.res.response)
      setJobId(data.res.jobId)
      // setOpenModal(true)
      finddata()
    })
  }, [])


function downloadBase64File(contentType, base64Data, fileName) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

function downloadFile() {
  var data = downloadBase64File('application/msword',res.data,'deal.doc')
  setOpenModal(false)
}
  async function finddata() {
    const all = await db.dealItems.toArray()
    console.log(all,'all')
    all.reverse()
    setDeal(all)
  }
  const downloadDoc = (data) => {
    var data = downloadBase64File('application/msword',data,'deal.doc')
  }

  function downloadBase64File(contentType, base64Data, fileName) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

function downloadAndUpdate() {
  setData(res.parameters)
  setmodal_scroll(true)
}

function update(data) {
  console.log(data.params)
  setData(data.params)
  // setRes(data.res.response)
  setJobId(data.jobId)
  setmodal_scroll(true)
}

// function handleChange(event) {
//   console.log(event.target.value,'value')
//   setFileno(event?.target?.value)
// }
// function handleChangeMonth(event) {
//   console.log(event.target.value,'value')
//   setmonth(event?.target?.value)
// }
  return (
    <div className="page-content">
      <Container fluid>
          <TableContainer className='pt-6 px-6 py-6'>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className='flex mx-auto mt-16 text-white  border-0 py-2 px-8 focus:outline-none  text-lg'>
                <TableRow>
                  <StyledTableCell align="center" className='text-black'>Job Id</StyledTableCell>
                  <StyledTableCell className='text-black' align="center">File Number</StyledTableCell>
                  <StyledTableCell className='text-black' align="center">Deal Type</StyledTableCell>
                  <StyledTableCell className='text-black' align="center">Status</StyledTableCell>
                  <StyledTableCell className='text-black px-3 py-2' align="center">Download</StyledTableCell>
                  <StyledTableCell className='text-black px-3 py-2' align="center">Update</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  deal && deal.length>0 ?
                    deal.map((row, index) => (
                      <StyledTableRow key={JSON.stringify(row.id+index)}>
                        <StyledTableCell align='center' component="th" scope="row">
                          {row.jobId}
                        </StyledTableCell>
                        <StyledTableCell key={JSON.stringify(row.id+index)} align="center">{row.no}</StyledTableCell>
                        <StyledTableCell key={JSON.stringify(row.id+index)} align="center">{row.file}</StyledTableCell>
                        <StyledTableCell key={JSON.stringify(row.id+index)} align="center">{row.status}</StyledTableCell>
                        <StyledTableCell key={JSON.stringify(row.id+index)} align="center"> 
                        {
                            row.fileData?
                               // Call uploadDocs when the button is clicked
                              <Button  onClick={()=>  row.fileData? downloadDoc(row.fileData): null} type="button" color="info">Download</Button>
                            :
                            <Button
                              color="light"
                              className='disabled'
                            >
                              Download
                            </Button>
                            }  
                          </StyledTableCell>
                          <StyledTableCell key={JSON.stringify(row.id+index)} align="center"> 
                            {
                              row.fileData?
                                // Call uploadDocs when the button is clicked
                                <Button  onClick={()=>  row.fileData? update(row): null} type="button" color="warning">Update</Button>
                              :
                              <Button
                                color="light"
                                className='disabled'
                              >
                                Update
                              </Button>
                              }  
                          </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : <div role="status">
                    <p className='text-lg mt-2'>Data not found.</p>
                </div>}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            isOpen={isOpen}
            toggle={() => {
              setOpenModal(!isOpen);
            }}
            backdrop={"static"}
            id="staticBackdrop"
          >
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                File update and download
              </h5>
              <button
                style={{margin:0}}
                type="button"
                className='close-btn'
                onClick={() => {
                  setOpenModal(false);
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Process is completed, Please download the file. 
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light btn-sec"
                onClick={() => {
                  downloadAndUpdate()
                }}
              >
                Download & Update
              </button>
              <button   onClick={() => {
                  downloadFile()
                }} type="button" className="btn btn-primary">
                 Download
              </button>
            </div>
          </Modal>

          <Modal
              isOpen={modal_scroll}
              // scrollable={true}
            >
              <div className="modal-header">
                <h5 className="modal-title mt-0">Update Details</h5>
                {/* <button
                  style={{margin:0}}
                  type="button"
                  onClick={() => setmodal_scroll(false)}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button> */}
              </div>
              <div className="modal-body">
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

               <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <Label htmlFor="example-text-input" className="form-label"> File number</Label>
                      <Input value={dealData.fileNumber} id="fileno"  onChange={(data)=> handleChange(data, 'fileNumber')} className="form-control" type="text" defaultValue=""  />
                    </div>
                  </div>
               <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label htmlFor="example-text-input" className="form-label"> Month</Label>
                    <Input value={dealData.signingMonth} id="month"  onChange={(data)=> handleChange(data, 'signingMonth')} className="form-control" type="text" defaultValue=""  />
                  </div>
                </div>
                {/* <div>
                    <Button onClick={(e)=> {e.preventDefault();updateDeal()}}
                        color="primary" type="submit" className="w-md">
                        Submit
                    </Button>
                </div> */}
               </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setmodal_scroll(false)}
                >
                  Close
                </button>
                <button  onClick={()=> updateDeal()} style={{marginLeft:10}} type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </Modal>
        </Container>
    </div>
  );
}
