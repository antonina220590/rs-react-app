import { Control, UseFormRegister } from 'react-hook-form';
import ErrorDisplay from '../../error/error';
import { ErrorType, FormFields } from '../../../interfaces/interface';
import InputField from '../input';
import { ForwardedRef, useRef } from 'react';
import { GenderButton } from './gender-button';
import { Label } from '../../label/label';

enum gender {
  M = 'male',
  F = 'female',
}

interface Props {
  register?: UseFormRegister<FormFields>;
  errors?: ErrorType;
  value?: string;
  control?: Control<FormFields> | undefined;
  hasValue?: boolean;
  defaultChecked?: boolean;
}

const GenderInput = ({
  register,
  errors,
  value,
  // hasValue,
}: Props & { ref?: ForwardedRef<HTMLInputElement> }) => {
  const id = 'gender';
  const radioRef = useRef<HTMLInputElement>(null);
  const genderValue = document.querySelector(
    'input[name="gender"]:checked'
  ) as HTMLInputElement | null;
  console.log(genderValue?.value === gender.M);
  return (
    <div>
      <div className="space-y-1 flex gap-5">
        <Label htmlFor={'gender'}>Gender</Label>

        <div className="flex gap-4">
          <GenderButton
            htmlFor={`${id}-${gender.M}`}
            {...(errors ? { errors } : {})}
            isSelected={genderValue?.value === gender.M}
          >
            <InputField
              id={id}
              type={'radio'}
              register={register}
              ref={radioRef}
              errors={errors}
              value={gender.M || value}
              // defaultChecked={value}
              // hasValue={hasValue}
              defaultChecked={genderValue?.value === gender.M}
            />
            <span className="w-4 h-4 inline-flex items-center">M</span>
          </GenderButton>
          <GenderButton
            htmlFor={`${id}-${gender.F}`}
            isSelected={genderValue?.value === gender.F}
          >
            <InputField
              id={id}
              type={'radio'}
              register={register}
              ref={radioRef}
              errors={errors}
              value={gender.F || value}
              defaultChecked={genderValue?.value === gender.M}
              // hasValue={hasValue}
            />
            <span className="w-4 h-4 inline-flex items-center">F</span>
          </GenderButton>
        </div>
      </div>
      <ErrorDisplay errors={errors} fields={[id]} />
    </div>
  );
};

export default GenderInput;
