import classNames from 'classnames';
import { ErrorType } from '../../../interfaces/interface';
import { useRef } from 'react';

type Props = {
  htmlFor: string;
  children: React.ReactNode;
  errors?: ErrorType;
  isSelected?: boolean;
};

export const GenderButton = ({
  errors,
  htmlFor,
  children,
  isSelected,
}: Props) => {
  const isError = errors && errors['gender'];
  const buttonRef = useRef<HTMLLabelElement>(null);
  console.log('isSelected для', htmlFor, ':', isSelected);
  return (
    <label
      ref={buttonRef}
      className={classNames(
        'inline-flex items-center justify-center w-10 h-10 cursor-pointer border border-input rounded-md border-gray-400',
        {
          'border border-red-600': isError,
          'bg-blue-200': isSelected,
        }
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
