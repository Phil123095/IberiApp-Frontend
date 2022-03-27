import Form from "react-bootstrap/Form";
import { useState} from 'react';
import { useErrorChecker } from "../../utils/auth_validation";
import { useFieldsSetter } from "../../utils/form_handler";
import { useNavigate } from "react-router-dom";
import { return_loader } from "../../utils/general_utils";
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
            setIsLoading(true);
            logMeIn();
        }
    }
    function logMeIn() {
        setIsLoading(true);
        //Prevent page reload
        axios({
            method: "POST",
            url: "https://iberiapp-final-try.u0i44l2gjqioo.eu-central-1.cs.amazonlightsail.com/authenticate-user",
            data: {
                email: loginForm.email,
                password: loginForm.password
               }
        })
        .then(response => response.data)
        .then(response => verify(response))
    }

    function verify(respdata) {
        
        if (respdata.access_token) {

            setIsLoading(false);
            props.setToken(respdata.access_token)
            navigate("/dashboard")
        } else {
            setIsLoading(false)
            setErrorMessage("Incorrect credentials, please try again.")
        }
        return;
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