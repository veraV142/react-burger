import { useState } from "react";

export const useFormState = (inputValues:any) => {
    const [values, setValues] = useState(inputValues);
    const handleChange = (event:any) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
  }

  export default useFormState;