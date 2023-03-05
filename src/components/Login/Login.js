import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

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

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [emailState, dispatchEmail] = useReducer(emailReducer,
      {value: '', isValid: null})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,
      {value: '', isValid: null})
  const authContext = useContext(AuthContext)

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

  const emailRef = useRef()
  const passwordRef = useRef()
  const submitHandler = (event) => {
    event.preventDefault()
    if (formIsValid) {
      authContext.onLogin(emailState.value, passwordState.value)
    } else if (!emailState.isValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus()
    }
  }

  return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <Input state={emailState}
                 ref={emailRef}
                 id={"email"}
                 type={'email'}
                 label={'E-Mail'}
                 onChange={emailChangeHandler}
                 onBlur={validateEmailHandler}/>
          <Input state={passwordState}
                 ref={passwordRef}
                 id={"password"}
                 type={"password"}
                 label={"Password"}
                 onChange={passwordChangeHandler}
                 onBlur={validatePasswordHandler}/>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn}>
              Login
            </Button>
          </div>
        </form>
      </Card>
  )
}

export default Login
