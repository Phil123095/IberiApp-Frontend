import Form from "react-bootstrap/Form";
/*import Container from 'react-bootstrap/Container';*/
import { useErrorChecker } from "../../utils/auth_validation";
import { useFieldsSetter } from "../../utils/form_handler";
import { useNavigate } from "react-router-dom";
import { useState} from 'react';
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
            url: "https://lve3zx38hg.execute-api.eu-central-1.amazonaws.com/dev/backend/new-user",
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
    
    function return_loader() {
        return (
            <svg role="status" class="inline mr-3 w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
        )
        
    }

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