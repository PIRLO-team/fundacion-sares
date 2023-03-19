// React
import { ChangeEvent, useState } from 'react';

type FormState = {
  [key: string]: string;
};

export const useForm = <T extends FormState>(initialForm: T) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
