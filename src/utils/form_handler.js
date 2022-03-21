import { useState} from 'react';

export function useFieldsSetter() {
    const [ formFields, setFormValues ] = useState({})

    return [
        formFields,
        function(key, value) {
            setFormValues({
                ...formFields,
                [key]: value
            });
        }
    ]
}
