import classNames from 'classnames';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ErrorType } from '../../interfaces/interface';
import { ForwardedRef } from 'react';

interface PropsType<T extends FieldValues> {
  id: Path<T>;
  type: string;
  placeholder?: string;
  register?: UseFormRegister<T>;
  ref?: ForwardedRef<HTMLInputElement>;
  error?: string;
  errors?: ErrorType;
  children?: React.ReactNode;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  value?: string | number | undefined;
  defaultValue?: string;
  hasValue?: boolean;
  name?: string;

  defaultChecked?: boolean;
}

export default function InputField<T extends FieldValues>({
  id,
  type,
  placeholder,
  onChangeHandler,
  defaultValue,
  hasValue,
  register,
  value,
  ref,
  errors,
}: PropsType<T>) {
  const hasError = errors?.[id];
  return (
    <input
      className={classNames(
        'p-3 border w-md border-input rounded-3xl border-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-1',
        {
          'border-red-500': hasError,
          'border-green-500': !hasError && (hasValue || value),
          'border-gray-400': !hasError && (!hasValue || !value),
        },
        {
          'absolute opacity-0 w-0 h-0 p-0 m-0': type === 'radio',
        }
      )}
      type={type}
      {...(!register ? { name: id } : {})}
      id={`${id.toString()}${type === 'radio' ? `-${value}` : ''}`}
      {...(value ? { value } : { value })}
      placeholder={placeholder}
      {...(register
        ? register(id, { onChange: onChangeHandler })
        : { ref, defaultValue })}
    />
  );
}
