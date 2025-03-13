import { ForwardedRef } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { ErrorType } from '../../interfaces/interface';
import classNames from 'classnames';

interface PropsType<T extends FieldValues> {
  label: string;
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
  value?: string;
  defaultValue?: string;
  hasValue?: boolean;
}

export default function InputField<T extends FieldValues>({
  label,
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
  children,
}: PropsType<T>) {
  const hasError = errors?.[id];
  return (
    <label
      style={{ fontFamily: 'Roboto, sans-serif' }}
      className="flex gap-1 flex-col"
      htmlFor={id}
    >
      {label}
      <input
        className={classNames(
          'p-3 border w-md border-input rounded-3xl border-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-1',
          {
            'border-red-500': hasError,
            'border-green-500': !hasError && (hasValue || value),
            'border-gray-400': !hasError && (!hasValue || !value),
          }
        )}
        type={type}
        // value={value}
        // defaultValue={defaultValue}
        id={`${id.toString()}${type === 'radio' ? `-${value}` : ''}`}
        placeholder={placeholder}
        {...(register
          ? register(id, { onChange: onChangeHandler })
          : { ref, defaultValue })}
      />
      {children}
    </label>
  );
}
