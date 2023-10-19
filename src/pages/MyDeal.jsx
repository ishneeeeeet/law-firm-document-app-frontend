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
          console.log(response,"adter update deal");
          if(response?.data) {
            updateDb(jobId, response.data)
            var data = downloadBase64File('application/msword',response.data,'deal.doc')
            alert("Process is completed, downloading document!")
            setmodal_scroll(false)
            setOpenModal(false)
          } else {
            console.log("in progress")
            alert("Something went wrong!")
          }
        });
  }


  React.useEffect(()=> {
    finddata()
    eventService.getEvent().subscribe(data => {
      console.log('Subscribed data --', data)
      setRes(data.res.response)
      setJobId(data.res.jobId)
      setOpenModal(true)
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

  return (
    <div className="page-content">
      <Container fluid>
          <TableContainer className='pt-6 px-6 py-6'>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className='flex mx-auto mt-16 text-white  border-0 py-2 px-8 focus:outline-none  text-lg'>
                <TableRow>
                  <StyledTableCell align="center" className='text-black'>JobId</StyledTableCell>
                  <StyledTableCell className='text-black' align="right">File Number</StyledTableCell>
                  <StyledTableCell className='text-black' align="right">Deal Type</StyledTableCell>
                  <StyledTableCell className='text-black' align="right">Status</StyledTableCell>
                  <StyledTableCell className='text-black px-3 py-2' align="center">Download</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  deal && deal.length>0 ?
                    deal.map((row) => (
                      <StyledTableRow key={row.id+new Date()}>
                        <StyledTableCell align='center' component="th" scope="row">
                          {row.jobId}
                        </StyledTableCell>
                        <StyledTableCell key={row.id+new Date()} align="right">{row.no}</StyledTableCell>
                        <StyledTableCell key={row.id+new Date()} align="right">{row.file}</StyledTableCell>
                        <StyledTableCell key={row.id+new Date()} align="right">{row.status}</StyledTableCell>
                        <StyledTableCell key={row.id+new Date()} align="right"> 
                        {
                            row.fileData?
                            <button
                              onClick={()=>  row.fileData? downloadDoc(row.fileData): null} // Call uploadDocs when the button is clicked
                              className="flex mx-auto mt-1 px-3 text-white bg-indigo-500 border-0 py-2 focus:outline-none hover:bg-indigo-600 rounded text-xs pd-im"
                            >
                              Download
                            </button>
                            :
                            <button
                              className="flex mx-auto mt-1 px-3  text-white bg-gray-300 border-0 py-2 focus:outline-none hover:bg-gray-50-600 pd-im rounded text-xs"
                            >
                              Download
                            </button>
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
            style={{marginTop:100}}
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
              >close</button>
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
              style={{marginTop:100}}
              isOpen={modal_scroll}
              toggle={() => {
                tog_scroll();
              }}
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
                `<div class="flex flex-wrap -mx-3 mb-6 ">
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