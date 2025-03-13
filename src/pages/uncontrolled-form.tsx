import { useRef, useState } from 'react';
import Title from '../components/form-title/title';
import Form from '../components/form/form';
import NameInput from '../components/input/name/name';
import schema from '../validation/validation';
import { setSubmission } from '../store/slices/forms-slice';
import { ValidationError } from 'yup';
import { useDispatch } from 'react-redux';

interface IError {
  [key: string]: string;
}

export default function UncontolledFormPage() {
  const nameRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasValue, setHasValue] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValue = nameRef?.current?.value;
    const formData = {
      name: nameValue,
    };
    setHasValue(!!nameValue);
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(
        setSubmission({
          ...formData,
        })
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        const formattedErrors = error.inner.reduce((acc, err) => {
          if (err.path) {
            return {
              ...acc,
              [err.path]: err.message,
            };
          }
          return acc;
        }, {} as IError);
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <main className="bg-gray-200 h-[100vh] flex justify-center items-center">
      <div className="flex justify-between rounded-[4%] bg-white h-[70%]">
        <div className="m-10 w-md">
          <Title />
          <Form onSubmit={handleSubmit}>
            <NameInput
              errors={errors}
              ref={nameRef}
              defaultValue=""
              hasValue={hasValue}
            />
            <button type="submit">Submit</button>
          </Form>
        </div>
        <div className="bg-blue-100 m-5 rounded-[4%] flex flex-col items-center justify-center">
          <h1 className="m-10 text-5xl">Uncontrolled form</h1>
          <img src="wind.png" className="w-120 h-120 m-20"></img>
        </div>
      </div>
    </main>
  );
}
