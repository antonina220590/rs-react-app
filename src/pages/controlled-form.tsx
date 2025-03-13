import { FieldValues, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Title from '../components/form-title/title';
import NameInput from '../components/input/name/name';
import schema from '../validation/validation';
import { FormFields } from '../interfaces/interface';
import Form from '../components/form/form';
import { setSubmission } from '../store/slices/forms-slice';
import { useDispatch } from 'react-redux';
import AgeInput from '../components/input/age/age';

export default function ContolledFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormFields>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const nameValue = useWatch({
    control,
    name: 'name',
  });

  const ageValue = useWatch({
    control,
    name: 'age',
  });

  const dispatch = useDispatch();

  const onSubmit = async (data: FieldValues) => {
    if (data.image && data.image[0]) {
      const file = data.image[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const submission: Record<string, string[]> = {
            ...data,
          };
          dispatch(setSubmission(submission));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="bg-gray-200 h-[100vh] flex justify-center items-center">
      <div className="flex justify-between rounded-[4%] bg-white h-[70%]">
        <div className="m-10 w-md">
          <Title />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <NameInput
              errors={errors}
              register={register}
              value={nameValue || ''}
            />
            <AgeInput
              errors={errors}
              register={register}
              value={ageValue || ''}
            />
            <button type="submit">Submit</button>
          </Form>
        </div>
        <div className="bg-blue-100 m-5 rounded-[4%] flex flex-col items-center justify-center">
          <h1 className="m-10 text-5xl">Controlled form</h1>
          <img src="robot.png" className="w-120 h-120 m-20"></img>
        </div>
      </div>
    </main>
  );
}
