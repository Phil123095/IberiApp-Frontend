import Form from "react-bootstrap/Form";
import { useState} from 'react';
import { useErrorChecker } from "../../utils/auth_validation";
import { useFieldsSetter } from "../../utils/form_handler";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LogIn(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [ loginForm, handleInputChange ] = useFieldsSetter();

    const [ errorsCaught, setErrors ] = useState({});

    const [errorMessage, setErrorMessage] = useState('')

    function VerfiyAndLogin(event) {
        event.preventDefault()
        const newErrors = useErrorChecker(loginForm, 'login')
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            /*setIsLoading(true);*/
            logMeIn();
            }

    }

    function logMeIn() {
        setIsLoading(true);
        //Prevent page reload
        axios({
            method: "POST",
            url: "https://bd4cwt2sc9.execute-api.eu-central-1.amazonaws.com/dev/backend/authenticate-user",
            data: {
                email: loginForm.email,
                password: loginForm.password
               }
        })
        .then(response => response.data)
        .then(response => verify(response))
    }

    function verify(respdata) {
        console.log(respdata.user_exist, respdata.password_correct, respdata.access_token)
        if (respdata.access_token) {
            console.log("Reached validation")
            /*userHasAuthenticated(true);*/
            setIsLoading(false);
            props.setToken(respdata.access_token)
            navigate("/dashboard")
        } else {
            setIsLoading(false)
            setErrorMessage("Incorrect credentials, please try again.")
        }
        return;
    }

    function return_loader() {
        return (
            <svg role="status" class="inline mr-3 w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
        )
        
    }
    
    return(
        <div class="flex flex-row bg-slate-100 items-center justify-center">
            <div class="basis-1/4 h-96 p-9 border-1 border-slate-200 rounded bg-white shadow-sm my-44">
                <div class="pt-10 pb-2">
                    <h2 class="font-weight-bold text-xl text-center">Log In</h2>
                    <p>{errorMessage}</p>
                </div>
                <Form class="pb-10">
                    <Form.Group size="lg" controlId="email" class="my-4">
                        <Form.Control
                            autoFocus
                            type="email"
                            value={loginForm.email}
                            placeholder="Enter your email here"
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            isInvalid={!!errorsCaught.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errorsCaught.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group size="lg" controlId="password" class="my-4">
                        {/*<Form.Label>Password</Form.Label>*/}
                        <Form.Control
                        type="password"
                        value={loginForm.password}
                        placeholder="Enter your password here"
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        isInvalid={!!errorsCaught.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errorsCaught.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {/*<button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded" onClick={VerfiyAndLogin}>
                        Login
                    </button>*/}
                    <button type="button" class="w-full text-white bg-blue-500 hover:bg-blue-700 font-bold rounded-lg text-lg px-4 py-1.5 inline-flex justify-center items-center" onClick={VerfiyAndLogin}>
                        {isLoading === true ? return_loader(): null}
                        <h2 class="text-lg text-center">Login</h2>
                    </button>
                </Form>
            </div>
        </div>  
    );
}
export default LogIn;