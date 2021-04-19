import React, {useState, useCallback} from 'react';

function useInputs(initiaForm){
    const [form, setForm] = useState(initiaForm);

    const onChange = useCallback(e => {
        const [name, value] = e.target;
        setForm(form => ({ ...form, [name]: value}));
    }, []);
    const reset = useCallback(() => setForm(initiaForm), [initiaForm]);
    return [form, onChange, reset];
}

export default useInputs;