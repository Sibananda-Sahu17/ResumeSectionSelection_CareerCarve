import React from 'react';
import ResumeBuilder from './components/ResumeBuilder';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(4),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  button: {
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
    width: '80%',
    maxWidth: '20rem',
    backgroundColor: 'blueViolet',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title} align="center">
        Select your sections
      </Typography>
      <ResumeBuilder />
      <Button className={classes.button}>Save and Next</Button>
    </Container>
  );
};

export default App;



// import React from 'react';
// import ResumeBuilder from './components/ResumeBuilder';
// import { Container, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@mui/material/Button';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   title: {
//     margin: theme.spacing(4),
//     marginBottom: theme.spacing(1),
//     [theme.breakpoints.down('xs')]: {
//       fontSize: '1.5rem',
//     },
//   },
// }));

// const App = () => {
//   const classes = useStyles();

//   return (
//     <Container className={classes.container}>
//       <Typography variant="h4" className={classes.title} align="center">
//         Select your sections
//       </Typography>
//       <ResumeBuilder />
//       <Button style={{backgroundColor: 'blueViolet', margin: 22, padding: 10, width: '20vw', color: 'white'}}>Save and Next</Button>
//     </Container>
//   );
// };

// export default App;

