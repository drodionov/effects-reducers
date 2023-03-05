import React, {useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  return eventHandler(state, action, (val) => {
    return val.includes('@')
  })
}

const passwordReducer = (state, action) => {
  return eventHandler(state, action, (val) => {
    return val.trim().length > 6
  })
}

const eventHandler = (state, action, validator) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: validator(action.val)}
  } else if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: validator(state.value)}
  } else {
    return {value: '', isValid: null}
  }
}

const Login = props => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [emailState, dispatchEmail] = useReducer(emailReducer,
      {value: '', isValid: null})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,
      {value: '', isValid: null})

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Let's set the form state")
      setFormIsValid(emailState.isValid && passwordState.isValid)
    }, 500)

    return () => {
      console.log("Let's remove the timer")
      clearTimeout(timeout)
    }
  }, [emailState.isValid, passwordState.isValid])

  const emailChangeHandler = event => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
  }

  const passwordChangeHandler = event => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})
  }

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  }

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogin(emailState.isValid, passwordState.isValid)
  }

  return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
              className={`${classes.control} ${
                  emailState.isValid === false ? classes.invalid : ''
              }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
                type="email"
                id="email"
                value={emailState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
            />
          </div>
          <div
              className={`${classes.control} ${
                  passwordState.isValid === false ? classes.invalid : ''
              }`}
          >
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={passwordState.value}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn}
                    disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </Card>
  )
}

export default Login
