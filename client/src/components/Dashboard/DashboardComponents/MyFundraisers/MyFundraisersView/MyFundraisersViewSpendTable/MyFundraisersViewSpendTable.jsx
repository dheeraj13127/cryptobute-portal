import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { spendCollectedAmount } from '../../../../../../redux/actions/blockchain';

const columns = [
  
    
  
    {
        id: 'description',
        label: 'Spend reason',
        minWidth: 170,


    },

    {
        id: 'recipientName',
        label: 'Recipient Name',
        minWidth: 170,


    },
    {
        id: 'value',
        label: 'Amount',
        minWidth: 170,


    },
    {
        id: 'recipientAddress',
        label: 'Recipient Wallet Address',
        minWidth: 170,


    },
    {
        id: 'spendProofs',
        label: 'Medical Proof',
        minWidth: 170,


    },

    {
        id:'spendId',
        label:'Spend',
        minWidth:170
    }


];


export default function MyFundraisersViewSpendTable({ contributorsData,cbuteContract,address }) {
    const dispatch=useDispatch()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleSpendAmount=async(spendId)=>{
        await cbuteContract.methods.spendAmount(spendId).send({
            from:address,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null, 
        })
        .then(res=>{
            const data={
                walletAddress:address,
                spendId:spendId
              }
              dispatch(spendCollectedAmount(data))
        })
        .catch(e=>{
            console.log(e)
        })
        
    }
    
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', background: "#D9D9D9" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contributorsData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, k) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={k}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === "spendProofs"&&column.id!=="spendId" && <a href={`${value}`} target="__blank" rel='no-opener' className='navigatingLink'>View</a>}
                                                    {column.id !== "spendProofs"&&column.id!=="spendId" && value}
                                                    {column.id==="spendId"&&<Button variant="contained" onClick={()=>handleSpendAmount(value)}>Spend</Button>}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={contributorsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}