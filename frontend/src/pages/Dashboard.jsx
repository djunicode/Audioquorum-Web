import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import axios from 'axios'

const Card = ({ data }) => {
  return(
    <Box sx={{width: '195px', minHeight: '190px', backgroundColor: theme.palette.secondary.main, borderRadius: '10px', boxShadow: '4px 4px 4px 0px #00000040;', paddingX: '15px', paddingTop: '23px', cursor: 'pointer'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{width: '86px', height: '86px', backgroundColor: 'white', borderRadius: '50%'}}></Box>
      </Box>
      <Box sx={{marginTop: '27px', border: '0px', borderTop: '2px', borderColor: 'black', borderStyle: 'solid', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px'}}>
        <Typography sx={{fontWeight: 400, lineHeight: '30px', fontSize: '15px'}}>
          {data.subject}
        </Typography>
      </Box>
    </Box>
  )
}

export const Dashboard = () => {
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')
  console.log(token);
  useEffect(() => {
    axios
      .get('http://audioquorum.herokuapp.com/api/test/view/All/', {
        headers: {
          'Authentication': token
        }
      })
      .then(response => setData(response.data.data))
  }, [])
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return (
    <Box sx={{paddingX: '6%', paddingY: '80px', display: 'flex', gap: '50px', flexWrap: 'wrap'}}>
      {data && data.map(test => <Card key={test._id} data={test} />)}
    </Box>
  )
}
