import InputField from '../input';
import ErrorDisplay from '../../error/error';
import { UseFormRegister } from 'react-hook-form';
import { ForwardedRef } from 'react';
import { ErrorType, FormFields } from '../../../interfaces/interface';

interface Props {
  register?: UseFormRegister<FormFields>;
  errors?: ErrorType;
  value?: string;
  defaultValue?: string;
  hasValue?: boolean;
}

const NameInput = ({
  register,
  errors,
  ref,
  value,
  defaultValue,
  hasValue,
}: Props & { ref?: ForwardedRef<HTMLInputElement> }) => {
  const id = 'name';
  return (
    <div>
      <div className="space-y-1">
        <InputField
          label="Name"
          id={id}
          autoComplete={id}
          type={'text'}
          register={register}
          ref={ref}
          errors={errors}
          value={value}
          defaultValue={defaultValue}
          hasValue={hasValue}
        />
      </div>

      <ErrorDisplay errors={errors} fields={[id]} />
    </div>
  );
};

export default NameInput;
