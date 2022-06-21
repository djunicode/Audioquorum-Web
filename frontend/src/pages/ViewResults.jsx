import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'





export const ViewResults = () => {
  var axios = require('axios');
  let navigate = useNavigate();
  let location = useLocation()
  const id = location.state.id
  const [data, setData] = useState([])
  useEffect(() => {
    console.log(id)
    let token = localStorage.getItem('token')

    var config = {
      method: 'get',
      url: 'https://audioquorum-api.herokuapp.com/api/student/viewByTest/62ac76fb29e33e3b39545064',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data);
        setData(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

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
                {data.length !== 0 ? data.map((data, index) => (
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
                )) : <TableRow
                  sx={{ backgroundColor: '#D5E2DF', "&td": { border: 0 } }}

                >
                  <TableCell colSpan={5} sx={{fontWeight:'bold'}}>
                    No student has given the test
                  </TableCell>

                </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}
