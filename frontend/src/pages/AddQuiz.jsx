import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, useNavigate } from 'react-router-dom';

export const AddQuiz = () => {
  const fields=[{fname:'Name',reqfname:'name'},{fname:'Description',reqfname:'description'},{fname:'Subject',reqfname:'subject'},{fname:'Standard',reqfname:'standard'},{fname:'Duration',reqfname:'duration'},{fname:'Total Marks',reqfname:'totalMarks'},{fname:'Total Questions',reqfname:'totalQuestions'}]
  let currentDate= new Date()
  if(currentDate.getMonth()+1<10){
    currentDate=currentDate.getFullYear()+'-0'+(currentDate.getMonth()+1)+'-'+currentDate.getDate()
  }
  else{
    currentDate=currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate()
  }
  const [data,setData]=useState({
    name:'',
    description:'',
    subject:'',
    standard:'',
    duration:0,
    date:'',
    time:'',
    totalQuestions:0,
    totalMarks:0,
  })
  let navigate = useNavigate();
const detailFill=(e)=>{
    let name = `${e.target.name}`
    let value = e.target.value
    if(name==='time'){
      let testTime=value+':'+'00'
      setData({ ...data, [name]: testTime})
    }
    else{
      setData({ ...data, [name]: value})
    }
}
  return (
    <>
      <div style={{ display: 'flex' }}>
        <ChevronLeftIcon style={{ height: '50px', width: '50px', color: '#30574E' }} onClick={() => { navigate("/") }} />
        <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>Add Quiz</Typography></div>
      <Typography sx={{ margin: '4.3vh 3vw 3vh 3vw', fontWeight: '600', fontSize: '24px' }}>Please Enter the details:</Typography>
      <Box sx={{ backgroundColor: 'rgba(240, 240, 240, 0.5)', margin: '3vh 3vw', padding: '3vh 1vw 1vh 3.5vw', display: 'flex', alignItems: 'flex-end' }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'column' }}>
          {
            fields.map((field,index) => {
              if(field.fname==='Duration'||field.fname==='Total Marks'||field.fname==='Total Questions'){
                return <Grid key={index} item sx={{ display: 'flex', width: '100%' }}>
                <Grid container sx={{ margin: '0', padding: '0' }}>
                  <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '13px', xs: '11px' } }} >{field.fname}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField type='number' name={field.reqfname} onChange={detailFill} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%', margin: '1.75%' }}></TextField>
                  </Grid>
                </Grid>
              </Grid>
              }
              else{
              return <Grid key={index} item sx={{ display: 'flex', width: '100%' }}>
                <Grid container sx={{ margin: '0', padding: '0' }}>
                  <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '13px', xs: '11px' } }} >{field.fname}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField name={field.reqfname} onChange={detailFill} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%', margin: '1.75%' }}></TextField>
                  </Grid>
                </Grid>
              </Grid>
              }
            })
          }
          <Grid item sx={{ display: 'flex', width: '100%' }}>
            <Grid container sx={{ margin: '0', padding: '0' }}>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '13px', xs: '11px' } }} >Date</Typography>
              </Grid>
              <Grid item xs={9}>
              <TextField InputProps={{inputProps: { min: currentDate} }} type="date" name="date" onChange={detailFill} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%', margin: '1.75%' }}></TextField>   
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ display: 'flex', width: '100%' }}>
            <Grid container sx={{ margin: '0', padding: '0' }}>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '13px', xs: '11px' } }} >Time</Typography>
              </Grid>
              <Grid item xs={9}>
              <TextField  type="time" name="time"  onChange={detailFill} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%', margin: '1.75%' }}></TextField>   
              </Grid>
            </Grid>
          </Grid>
          <Button sx={{ margin: '2%',backgroundColor: '#30574E',color: 'white',border: '2px solid white', borderRadius: '10px', "&:hover": { border: '2px solid #30574E', color: '#30574E' }, fontSize: { md: '22px', sm: '15px', xs: '12px' }, width: '25%' }}><Link to={'/add-questions'} style={{ textDecoration: 'none', color: 'white' }} state={{name:data.name,description:data.description,subject:data.subject,standard:data.standard,duration:data.duration,date:data.date,time:data.time,totalMarks:data.totalMarks,totalQuestions:data.totalQuestions}}  >Schedule Test</Link></Button>
        </Grid>
      </Box>
    </>
  )
}
