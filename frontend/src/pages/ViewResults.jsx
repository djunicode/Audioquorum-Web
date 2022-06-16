import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'


const StudentBox = styled(Box)(({ theme }) => ({
  minHeight: '36px',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '5px',
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))




const data = [{ name: 'Student name', roll_no: '01', marks: '411', average: '89.33' }, { name: 'Student name', roll_no: '01', marks: '411', average: '89.33' }, { name: 'Student name', roll_no: '01', marks: '411', average: '89.33' }, { name: 'Student name', roll_no: '01', marks: '411', average: '89.33' }]
const StudentReport = () => {
  return (
    <StudentBox>
      <Grid container>
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px' }}>
            01
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px' }}>
            Student Name
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px' }}>
            01
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px' }}>
            411
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px' }}>
            89.33
          </Typography>
        </Grid>
      </Grid>
    </StudentBox>
  )
}

export const AnnualReport = () => {
  let navigate = useNavigate();
  return (
    <>
      <div style={{ display: 'flex' }}>
        <ChevronLeftIcon style={{ height: '50px', width: '50px', color: '#30574E' }} onClick={() => { navigate("/") }} />
        <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>View Results</Typography></div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 2vw', margin: '0 1%' }}>
        <Typography sx={{ marginY: '1%', textTransform: 'uppercase', fontWeight: 600, fontSize: '30px', lineHeight: '45px' }}>
          Quiz Name:
        </Typography>
        <Grid item container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>
            Date:
          </Typography>
          <Typography>
            Time:
          </Typography>
          <Typography>
            Maximum Marks:
          </Typography>
        </Grid>
        <Box sx={{ backgroundColor: '#F0F0F0', width: '100%', minHeight: '70vh', padding: '1.5%' }}>
          <TableContainer  >
            <Table sx={{ minWidth: 650, [`& .${tableCellClasses.root}`]: { borderBottom: "none" } }} aria-label="simple table" >
              <TableHead>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell align="center" >Student Name</TableCell>
                  <TableCell align="center">Roll No.</TableCell>
                  <TableCell align="center">Marks</TableCell>
                  <TableCell align="center">Average</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => (
                  <>

                    <TableRow

                      key={index}
                      sx={{ backgroundColor: '#D5E2DF', "&td": { border: 0 } }}

                    >
                      <TableCell scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.roll_no}</TableCell>
                      <TableCell align="center">{data.marks}</TableCell>
                      <TableCell align="center">{data.average}</TableCell>
                    </TableRow>
                    <TableRow sx={{ height: '10px' }} />
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}
