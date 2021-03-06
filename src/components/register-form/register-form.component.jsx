import {useState, useEffect} from "react"
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import {setCurrentUser} from "../../redux/user/user.actions"
import {setCurrentMessage} from "../../redux/message/message.actions"

import "./register-form.styles.scss"

import Button from "../button/button.compontent"
import FormInput from "../form-input/form-input.component"
import RegisterFormPassword from "../register-form-password/register-form-password.component"

import {
    usernameValidator,
    passwordValidator,
    emailValidator
}
from "./register-form.validators"

import {registerFetch} from "./register-form.fetch"


const RegisterForm = ({history, setCurrentUser, setCurrentMessage}) =>{

    const [validationObject, setValidationObject] = useState({
        1: false,
        2: false,
        4: false,
        5: false,
        values : ["", "", "", "", ""]
    })
    

    const [disableButton, setDisableButton] = useState(true)

    useEffect(() => {
        if (Object.values(validationObject).includes(false)){
            setDisableButton(true)
        }
        else {
            setDisableButton(false)
        }
    }, [validationObject])

    const submit = () =>{
        const formData = new FormData();
        formData.append("username", validationObject.values[1])
        formData.append("password", validationObject.values[2])
        formData.append("email", validationObject.values[4])
        formData.append("phone", validationObject.values[5])

        registerFetch(formData, history, setCurrentUser, setCurrentMessage)
    }

   return (
        <div className={"register-page-form"}>
            <FormInput 
                name={"Username"} 
                validator={usernameValidator} 
                type={"text"}
                numOfField={1}
                setValidationObject={setValidationObject}
                validationObject={validationObject}
            />
            <RegisterFormPassword 
                validator={passwordValidator} 
                numOfField={2}
                setValidationObject={setValidationObject}
                validationObject={validationObject}
            />
            <FormInput 
                name={"Email"} 
                validator={emailValidator} 
                type={"email"}
                numOfField={4}
                setValidationObject={setValidationObject}
                validationObject={validationObject}
            />
            <FormInput 
                name={"Phone"} 
                validator={usernameValidator} 
                type={"text"}
                numOfField={5} 
                setValidationObject={setValidationObject}
                validationObject={validationObject}
            />
            <Button onClick={submit} disabled={disableButton} color={"dark"}>Submit</Button>
        </div>
    )
}


const mapDispatchToProps = dispatch =>({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCurrentMessage: (message) => dispatch(setCurrentMessage(message))
})


export default connect(null, mapDispatchToProps)(withRouter(RegisterForm));