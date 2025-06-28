import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalons } from '../../../Redux/Salon/action';
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
}));

const SalonTable = () => {
    const dispatch = useDispatch()
    const { salon } = useSelector(store => store);

    useEffect(() => {
        dispatch(fetchSalons())
    }, [dispatch])

    // Verificar si los datos están cargando o vacíos
    if (!salon.salons || salon.salons.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">No hay salones disponibles</p>
            </div>
        );
    }

    return (
        <>
            <h1 className="pb-5 font-bold text-xl">All Listed Salons</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Owner</StyledTableCell>
                            <StyledTableCell align="right">City</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salon.salons.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    <div className="flex gap-1 flex-wrap">
                                        <img 
                                            className="w-20 rounded-md" 
                                            src={item.images?.[0] || '/placeholder-image.jpg'} 
                                            alt={item.name || 'Salon'} 
                                        />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>{item.name || 'N/A'}</StyledTableCell>
                                <StyledTableCell>{item.address || 'N/A'}</StyledTableCell>
                                <StyledTableCell>
                                    <div className='space-y-2'>
                                        <p><strong>name:</strong> {item.owner?.fullName || 'N/A'}</p>
                                        <p><strong>email:</strong> {item.owner?.email || 'N/A'}</p>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {item.city || 'N/A'}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default SalonTable