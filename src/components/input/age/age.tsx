import { UseFormRegister } from 'react-hook-form';
import ErrorDisplay from '../../error/error';
import { ErrorType, FormFields } from '../../../interfaces/interface';
import InputField from '../input';
import { ForwardedRef } from 'react';
import { Label } from '../../label/label';

interface Props {
  register?: UseFormRegister<FormFields>;
  errors?: ErrorType;
  value?: string | number | undefined;
  defaultValue?: string;
  hasValue?: boolean;
}

const AgeInput = ({
  register,
  errors,
  ref,
  value,
  defaultValue,
  hasValue,
}: Props & { ref?: ForwardedRef<HTMLInputElement> }) => {
  const id = 'age';
  return (
    <div>
      <div className="space-y-1">
        <Label htmlFor={'age'}> Age </Label>
        <InputField
          id={id}
          autoComplete={id}
          type={'number'}
          register={register}
          ref={ref}
          errors={errors}
          value={value?.toString()}
          defaultValue={defaultValue}
          hasValue={hasValue}
        />
      </div>

      <ErrorDisplay errors={errors} fields={[id]} />
    </div>
  );
};

export default AgeInput;
