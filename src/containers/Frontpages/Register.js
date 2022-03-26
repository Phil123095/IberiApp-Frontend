import Form from "react-bootstrap/Form";
/*import Container from 'react-bootstrap/Container';*/
import { useErrorChecker } from "../../utils/auth_validation";
import { useFieldsSetter } from "../../utils/form_handler";
import { useNavigate } from "react-router-dom";
import { useState} from 'react';
import { return_loader } from "../../utils/general_utils";
import axios from 'axios';

function RegisterUser() {

    const [registerSuccess, setWrongLogin] = useState(null)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [goToConfirm, setConfirm] = useState(null)
    const [confCode, handleConfChange] = useState('')
    const [confError, setConfError] = useState('')

    const [ registerForm, handleInputChange ] = useFieldsSetter();
    const [ errorsCaught, setErrors ] = useState({});

    const [APIresult, setResponse] = useState('');

    function VerifyConfCode(event) {
        event.preventDefault()
        setIsLoading(true)
        if (confCode.length === 0 || confCode === '') {
            setConfError("Confirmation code cannot be blank!")
            setIsLoading(false)
        } else {
            if(confCode === '12345678') {
                setIsLoading(false)
                navigate("/login")
            } else {
                setIsLoading(false)
                setConfError("Incorrect confirmation code")}
        }
    }

    function VerifyAndRegister(event) {
        setWrongLogin(null)
        setResponse('')
        event.preventDefault()

        const newErrors = useErrorChecker(registerForm, 'register')

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            setIsLoading(true);
            RegisterMe()
        }

    }

    function RegisterMe() {
        axios({
            method: "POST",
            url: "https://iberiapp-final-try.u0i44l2gjqioo.eu-central-1.cs.amazonlightsail.com/new-user",
            data: {
                email: registerForm.email,
                password: registerForm.password
               }
        })
        .then(response => response.data.message)
        .then(response => {
            if (response === "user_created_successfully"){
                console.log(APIresult)
                setIsLoading(false)
                setConfirm(true)
            } else {
                setResponse(response)
                console.log(APIresult)
                setIsLoading(false)
                setWrongLogin(true)
            }
        });
    };
    

    function renderSignup() {
        return (
            <Form noValidate onSubmit={VerifyAndRegister}>
                <Form.Group size="lg" controlId="email" className="my-4">
                    <Form.Control
                    autoFocus
                    type="email"
                    value={registerForm.email}
                    placeholder="Enter your email here"
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    isInvalid={!!errorsCaught.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorsCaught.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group size="lg" controlId="confirmEmail" class="my-4">
                    <Form.Control
                    autoFocus
                    type="email"
                    value={registerForm.confirmEmail}
                    placeholder="Please confirm your email"
                    onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                    isInvalid={!!errorsCaught.confirmEmail}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorsCaught.confirmEmail}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group size="lg" controlId="password" class="my-4">
                    <Form.Control
                    type="password"
                    value={registerForm.password}
                    placeholder="Enter your password here"
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    isInvalid={!!errorsCaught.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorsCaught.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group size="lg" controlId="confirmPassword" class="my-4">
                    <Form.Control
                    type="password"
                    value={registerForm.confirmPassword}
                    placeholder="Please confirm your password"
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    isInvalid={!!errorsCaught.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorsCaught.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>
                <button type="button" class="w-full text-white bg-blue-500 hover:bg-blue-700 font-bold rounded-lg text-lg px-4 py-1.5 inline-flex justify-center items-center" onClick={VerifyAndRegister}>
                    {isLoading === true ? return_loader(): null}
                    <h2 class="text-lg text-center">Register</h2>
                </button>
            </Form>
        )
    }

    function renderConfirmation() {
        return (
            <Form noValidate onSubmit={VerifyConfCode}>
                <Form.Group size="lg" controlId="ConfCode" class="my-4">
                    <Form.Control
                    autoFocus
                    type="tel"
                    placeholder="Enter the confirmation code here"
                    onChange={(e) => handleConfChange(e.target.value)}
                    isInvalid={!!confError}/>
                    <Form.Control.Feedback type="invalid">
                        {confError}
                    </Form.Control.Feedback>
                </Form.Group>
                <button type="button" class="w-full text-white bg-blue-500 hover:bg-blue-700 font-bold rounded-lg text-lg px-4 py-1.5 inline-flex justify-center items-center" onClick={VerifyConfCode}>
                        {isLoading === true ? return_loader(): null}
                        <h2 class="text-lg text-center">Confirm Registration</h2>
                    </button>
                <p>We will then ask you to log in once more :)</p>
            </Form>
        )
    }

    return (
        <div class="flex flex-row bg-slate-100 items-center justify-center">
            <div class="basis-1/4 h-120 p-9 border-1 border-slate-200 rounded bg-white shadow-sm my-40">
                <div class="py-2">
                    {goToConfirm === null ? <h2 class="font-weight-bold text-xl">Create New Account</h2>: <h2 class="font-weight-bold text-xl">Verify your Email</h2>}
                    {registerSuccess === null ? <p></p> : <p>{APIresult}, please try again</p>}
                </div>
                {goToConfirm === null ? renderSignup() : renderConfirmation()}
            </div>
        </div>
    )
}

export default RegisterUser;