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

  React.useEffect(()=> {
    finddata()
  }, [])

  async function finddata() {
    const all = await db.dealItems.toArray()
    console.log(all,'all')
    setDeal(all)
  }
  const downloadDoc = () => {

  }
  return (
    <TableContainer className='m-6' >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className='flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
          <TableRow>
            <StyledTableCell>JobId</StyledTableCell>
            <StyledTableCell align="right">File Number</StyledTableCell>
            <StyledTableCell align="right">Deal Type</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Download</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            deal && deal.length>0 ?
              deal.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.jobId}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.no}</StyledTableCell>
                  <StyledTableCell align="right">{row.file}</StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right"> <button
                      onClick={downloadDoc} // Call uploadDocs when the button is clicked
                      className="flex mx-auto mt-1 px-1  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xs"
                    >
                     Download
                    </button></StyledTableCell>
                </StyledTableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}