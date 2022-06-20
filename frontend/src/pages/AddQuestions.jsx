import { Typography, Grid, TextField, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material'
import React, { useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AddQuestions = (props) => {
  const location = useLocation();
  const name = location.state.name
  const totalMarks = location.state.totalMarks
  const description = location.state.description
  const subject = location.state.subject
  const standard = location.state.standard
  const duration = location.state.duration
  const date = location.state.date
  const time = location.state.time
  const totalQuestions = location.state.totalQuestions

  const navigate = useNavigate()
  const [question, setQuestion] = useState(
    {
      questionNo: 0,
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      explanation: '',
      marks: ''
    }
  )

  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const optFill = (e) => {
    let name = e.target.name
    let value = e.target.value
    setQuestion({ ...question, [name]: value })
  }

  const prevQ = () => {
    if (questionIndex > 0) {
      let index = questionIndex - 1
      setQuestionIndex(index)

      const prevQuestionValues = questions[index]

      setQuestion({
        questionNo: prevQuestionValues.questionNo,
        question: prevQuestionValues.question,
        optionA: prevQuestionValues.optionA,
        optionB: prevQuestionValues.optionB,
        optionC: prevQuestionValues.optionC,
        optionD: prevQuestionValues.optionD,
        correctAnswer: prevQuestionValues.correctAnswer,
        explanation: prevQuestionValues.explanation,
        marks: prevQuestionValues.marks
      })

      console.log(question)
      console.log(questions)

    }
    else {
      setQuestionIndex(0)
    }

  }
  const nextQ = () => {
    setQuestionIndex(questionIndex + 1)
    goToNextQ(questionIndex + 1)
  }
  const goToNextQ = (index) => {
    if (questions.length > index) {
      console.log(index)
      console.log(questions.length)
      const nextQuestionValues = questions[index]
      setQuestion({
        questionNo: index,
        question: nextQuestionValues.question,
        optionA: nextQuestionValues.optionA,
        optionB: nextQuestionValues.optionB,
        optionC: nextQuestionValues.optionC,
        optionD: nextQuestionValues.optionD,
        correctAnswer: nextQuestionValues.correctAnswer,
        explanation: nextQuestionValues.explanation,
        marks: nextQuestionValues.marks
      })

    }
    else if (questions.length === index) {

      setQuestion({
        questionNo: index,
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        explanation: '',
        marks: ''
      })
    }
    else {

      setQuestions([...questions, question])
      setQuestion({
        questionNo: index,
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        explanation: '',
        marks: ''
      })
    }
  }

  const handleSubmit = () => {
    var axios = require('axios')
    if (question.question === "") {
      let data = {
        "name": `${name}`,
        "description": `${description}`,
        "subject": `${subject}`,
        "standard": `${standard}`,
        "duration": duration,
        "date": `${date}`,
        "time": `${time}`,
        "status": "UPCOMING",
        "questions": questions,
        "totalQuestions": totalQuestions,
        "totalMarks": totalMarks
      }
      let token = localStorage.getItem('token')
    console.log(data)
    let config = {
      method: 'post',
      url: 'https://audioquorum-api.herokuapp.com/api/test/create',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.status === 201) {
          navigate("/quizzes");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    else {
      setQuestions([...questions, question])
      let array = [...questions, question]
      setQuestion({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        explanation: '',
        marks: ''
      })
      setQuestionIndex(questionIndex + 1)
      let data = {
        "name": `${name}`,
        "description": `${description}`,
        "subject": `${subject}`,
        "standard": `${standard}`,
        "duration": duration,
        "date": `${date}`,
        "time": `${time}`,
        "status": "UPCOMING",
        "questions": array,
        "totalQuestions": totalQuestions,
        "totalMarks": totalMarks
      }
      let token = localStorage.getItem('token')
      console.log(data)
      let config = {
        method: 'post',
        url: 'https://audioquorum-api.herokuapp.com/api/test/create',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };
  
      axios(config)
        .then(function (response) {
          if (response.status === 201) {
            navigate("/quizzes");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
 
  

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontFamily: 'poppins' }}>Add Quiz Questions</h2>
      <Grid container sx={{ padding: '0 2% ' }}>
        <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography>Quiz Name : {name} </Typography>
          <Typography>Total Marks: {totalMarks}</Typography>
          <Typography>Q {`${questionIndex + 1}/${questions.length + 1}`}</Typography>
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }} rowGap={4}>
          <Grid item container sx={{ background: '#F0F0F080', padding: '3%' }} rowGap={4} >
            <Grid item sx={{ display: 'flex', width: '100%' }} container>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >Question:</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField name='question' id='question' value={question.question} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%' }} multiline rows={3} onChange={optFill}></TextField>
              </Grid>
            </Grid>
            <Grid item sx={{ display: 'flex', width: '100%' }} container>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >Enter Option:</Typography>
              </Grid>


              {/* Options */}
              <Grid item xs={10}>
                <Grid item sx={{ display: 'flex', width: '90%' }}>
                  <Grid container sx={{ margin: '2% 0' }} >
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >A</Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField value={question.optionA} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%' }} name='optionA' onChange={optFill}></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex', width: '90%' }}>
                  <Grid container sx={{ margin: '2% 0' }} >
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >B</Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField value={question.optionB} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%' }} name='optionB' onChange={optFill}></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex', width: '90%' }}>
                  <Grid container sx={{ margin: '2% 0' }} >
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >C</Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField value={question.optionC} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%' }} name='optionC' onChange={optFill}></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex', width: '90%' }}>
                  <Grid container sx={{ margin: '2% 0' }} >
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >D</Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField value={question.optionD} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%' }} name='optionD' onChange={optFill}></TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>


            {/* correct option */}
            <Grid item sx={{ display: 'flex', width: '100%' }} container>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >Enter Correct Option:</Typography>
              </Grid>
              <Grid item xs={9}>
                <RadioGroup>
                  <Grid container style={{ display: 'flex', margin: '0.25% 0' }} >
                    <Grid item md={1}>
                      <FormControlLabel name='correctAnswer' id='optionA' value={question.optionA} onChange={optFill} control={<Radio />} />
                    </Grid>
                    <Grid item md={11} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ display: 'flex' }}>A</Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ display: 'flex', margin: '0.25% 0' }} >
                    <Grid item md={1}>
                      <FormControlLabel name='correctAnswer' id='optionB' value={question.optionB} onChange={optFill} control={<Radio />} />
                    </Grid>
                    <Grid item md={11} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ display: 'flex' }}>B</Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ display: 'flex', margin: '0.25% 0' }} >
                    <Grid item md={1}>
                      <FormControlLabel name='correctAnswer' id='optionC' value={question.optionC} onChange={optFill} control={<Radio />} />
                    </Grid>
                    <Grid item md={11} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ display: 'flex' }}>C</Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ display: 'flex', margin: '0.25% 0' }} >
                    <Grid item md={1}>
                      <FormControlLabel name='correctAnswer' id='optionD' value={question.optionD} onChange={optFill} control={<Radio />} />
                    </Grid>
                    <Grid item md={11} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ display: 'flex' }}>D</Typography>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </Grid>
            </Grid>

            {/* explanation */}

            <Grid item sx={{ display: 'flex', width: '100%' }} container>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >Explanation:</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField name='explanation' id='explanantion' value={question.explanation} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%' }} multiline rows={2} onChange={optFill}></TextField>
              </Grid>
            </Grid>


            {/* marks */}
            <Grid item sx={{ display: 'flex', width: '100%' }} container>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '0', fontWeight: '500', fontSize: { md: '20px', sm: '18px', xs: '13px' } }} >Marks</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField name='marks' type='number' id='marks' value={question.marks} size='small' sx={{ backgroundColor: '#D5E2DF', width: '100%' }} onChange={optFill}></TextField>
              </Grid>
            </Grid>


            <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} container>
              <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button sx={{ width: '100%', margin: '2%', backgroundColor: '#30574E', color: 'white', border: '2px solid white', borderRadius: '10px', "&:hover": { border: '2px solid #30574E', color: '#30574E' }, fontSize: { md: '17px', sm: '14px', xs: '10px' } }} onClick={prevQ}><ChevronLeftIcon /> Previous</Button>
              </Grid>
              <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ width: '100%', margin: '2%', backgroundColor: '#30574E', color: 'white', border: '2px solid white', borderRadius: '10px', "&:hover": { border: '2px solid #30574E', color: '#30574E' }, fontSize: { md: '17px', sm: '14px', xs: '10px' } }} onClick={nextQ}>Next <ChevronRightIcon /></Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={1}>
            <Button sx={{ width: '100%', margin: '2%', backgroundColor: '#30574E', color: 'white', border: '2px solid white', borderRadius: '10px', "&:hover": { border: '2px solid #30574E', color: '#30574E' }, fontSize: { md: '17px', sm: '14px', xs: '10px' } }} onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
