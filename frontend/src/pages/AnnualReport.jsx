import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import axios from 'axios'

const StudentBox = styled(Box)(({theme}) => ({
  minHeight: '36px',
  backgroundColor: theme.palette.secondary.main, 
  borderRadius: '5px',
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // cursor: 'pointer',
  // '&:hover': {
  //   boxShadow: '4px 4px 4px 0px #00000040;'
  // }
}))

const StudentReport = () => {
  return (
    <StudentBox>
      <Grid container>
        <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography sx={{fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px'}}>
            01
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography sx={{fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px'}}>
            Student Name
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography sx={{fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px'}}>
            01
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography sx={{fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px'}}>
            411
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography sx={{fontSize: '20px', lineHeight: '30px', fontWeight: 400, marginY: '3px'}}>
            89.33
          </Typography>
        </Grid>
      </Grid>
    </StudentBox>
  )
}

export const AnnualReport = () => {
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')
  console.log(token);
  useEffect(() => {
    axios
      .get('http://audioquorum.herokuapp.com/api/student/viewAnnualReport/', {
        headers: {
          'Authentication': token
        }
      })
      .then(response => setData(response.data))
  }, [])
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return (
    <Box sx={{paddingX: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography sx={{marginY: '24px', textTransform: 'uppercase', fontWeight: 600, fontSize: '30px', lineHeight: '45px'}}>
        Annual Report
      </Typography>
      <Box sx={{backgroundColor: '#F0F0F0', paddingX: '50px', paddingY: '35px', width: '100%', minHeight: '60vh', marginBottom: '70px'}}>
        <Grid container>
          <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography sx={{fontSize: '24px', lineHeight: '36px', fontWeight: 500}}>
              Sr. No.
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography sx={{fontSize: '24px', lineHeight: '36px', fontWeight: 500}}>
              Student Name
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography sx={{fontSize: '24px', lineHeight: '36px', fontWeight: 500}}>
              Roll No.
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography sx={{fontSize: '24px', lineHeight: '36px', fontWeight: 500}}>
              Total Marks
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography sx={{fontSize: '24px', lineHeight: '36px', fontWeight: 500}}>
              Percentage
            </Typography>
          </Grid>
        </Grid>
        <StudentReport />
        <StudentReport />
        <StudentReport />
        <StudentReport />
        <StudentReport />
      </Box>
    </Box>
  )
}
