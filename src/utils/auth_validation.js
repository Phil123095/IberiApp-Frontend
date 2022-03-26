
export function useErrorChecker(inputForm, validate_type) {
    const errorsFound = {}
    if (validate_type === 'login') {
        const { email, password} = inputForm
        // name errors
        if ( !email || email === '' ) errorsFound.email = 'Email cannot be blank!'
        if ( !password || password === '' ) errorsFound.password = 'Password cannot be blank!'

    } else if (validate_type === 'register') {
        const { email, confirmEmail, password, confirmPassword} = inputForm

        // name errors
        if ( !email.includes('ie.edu') || !email.includes('iberia.es')) errorsFound.email = 'You are not authorized to register'
        if ( !email || email === '' ) errorsFound.email = 'Email cannot be blank!'

        if ( !confirmEmail || confirmEmail === '' ) errorsFound.confirmEmail = 'Please confirm your email'
        if ( email !== confirmEmail) errorsFound.confirmEmail = 'Emails must match'
        
        if ( !password || password === '' ) errorsFound.password = 'Password cannot be blank!'

        if ( !confirmPassword || confirmPassword === '' ) errorsFound.confirmPassword = 'Please confirm your password'
        console.log(password, confirmPassword)
        if ( password !== confirmPassword) errorsFound.confirmPassword = 'Passwords must match'
    }

    return errorsFound
}