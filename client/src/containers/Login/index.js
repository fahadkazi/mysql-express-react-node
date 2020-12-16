import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useStyles } from './styles'

export default function SignIn() {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    alert(JSON.stringify(data))
    axios
      .post('http://localhost:4000/api/users/login', data)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={errors.username && errors.username.type === 'required'}
            margin="normal"
            required={true}
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            inputRef={register({ required: true })}
            helperText={errors.username && errors.username.type === 'required' ? 'Required field' : ''}
          />
          <TextField
            error={errors.password && errors.password.type === 'required'}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={register({ required: true })}
            helperText={errors.password && errors.password.type === 'required' ? 'Required field' : ''}
          />
          <FormControlLabel
            control={<Checkbox inputRef={register} name="remember" color="primary" defaultValue={false} />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
