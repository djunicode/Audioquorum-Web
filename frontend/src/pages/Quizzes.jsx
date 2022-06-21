import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/system';
import axios from 'axios';

const QuizBox = styled(Box)(({ theme }) => ({
  minHeight: '55px',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '7px',
  marginTop: '25px',
  paddingLeft: '42px',
  paddingRight: '42px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '4px 4px 4px 0px #00000040;'
  }
}))

const Quiz = ({ data }) => {
  let navigate = useNavigate()
  const viewTest = (id) => {
    navigate(`/viewresults`, { state: { id: id } })
  }
  return (
    <>
      {data.status === 'COMPLETED' ?
        <QuizBox onClick={() => viewTest(data._id)}>
          <Grid container spacing={1}>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
              <Typography>
                {data.name}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>
                {data.duration} mins
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>
                {data.totalQuestions} Q
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>
                Reschedule
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
              <Typography>
                due @ {data.time}
              </Typography>
            </Grid>
          </Grid>
        </QuizBox> : <QuizBox>
          <Grid container spacing={1}>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
              <Typography>
                {data.name}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>
                {data.duration} mins
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>
                {data.totalQuestions} Q
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>
                Reschedule
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
              <Typography>
                due @ {data.time}
              </Typography>
            </Grid>
          </Grid>
        </QuizBox>
      }
    </>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  paddingLeft: '23px',
  paddingRight: '23px',
  backgroundColor: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '36px',
  borderRadius: '7px',
  color: '#FFFFFF'
}))

const StyledTabs = styled(TabList)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#000000',
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '20px',
  lineHeight: '25px',
  '&.Mui-selected': {
    color: '#000000',
    fontWeight: 700,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}))

export const Quizzes = () => {

  const navigate = useNavigate()
  const [value, setValue] = useState('Assigned');
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')
  useEffect(() => {
    axios
      .get('http://audioquorum-api.herokuapp.com/api/test/view/All/', {
        headers: {
          'Authentication': token
        }
      })
      .then(response => setData(response.data.data))
  }, [])
  return (
    <Box>
      <Box sx={{ paddingX: '96px', paddingY: '10px', marginBottom: '144px' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingX: '42px' }}>
            <StyledTabs onChange={(event, newValue) => setValue(newValue)}>
              <StyledTab label="Assigned" value="Assigned" />
              <StyledTab label="Completed" value="Completed" />
            </StyledTabs>
          </Box>
          <TabPanel value="Assigned" sx={{ paddingX: '0px', paddingY: '10px' }}>
            {data && data.filter(x => x.status === "UPCOMING").map(x => <Quiz key={x._id} data={x} />)}
          </TabPanel>
          <TabPanel value="Completed" sx={{ padding: '0px', paddingY: '10px' }}>
            {data && data.filter(x => x.status === "COMPLETED").map(x => <Quiz key={x._id} data={x} />)}
          </TabPanel>
        </TabContext>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 12, backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
        <Box sx={{ padding: '47px', display: 'flex', justifyContent: 'space-between' }}>
          <StyledButton>
            Schedule Quiz
          </StyledButton>
          <StyledButton onClick={() => navigate('/add-quiz')}>
            Add Quiz
          </StyledButton>
        </Box>
      </Box>
    </Box>
  )
}