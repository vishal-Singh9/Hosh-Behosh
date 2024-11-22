import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const orders = [
    1,2,3,4,5,6,7,8,9,10
]
const OrderTable = () => {
  return (
    <div >
      <Box>
        <Card className='mt-2'>
            <CardHeader title="All Orders"
            sx={{pt:2,alignItems:"center",justifyContent:"center"}}
             />
        </Card>


        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Ingredients</TableCell>
            <TableCell align="right">Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.image}</TableCell>
              <TableCell align="right">{row.customer}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.ingredients}</TableCell>
              <TableCell align="right">{row.status}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </div>
  )
}

export default OrderTable
