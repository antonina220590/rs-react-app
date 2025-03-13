import { FieldErrors } from 'react-hook-form';
import { FormFields } from '../../interfaces/interface';

interface PropsType {
  fields: (keyof FormFields)[];
  errors?: FieldErrors<FormFields>;
}

const ErrorDisplay = ({ errors, fields }: PropsType) => {
  const errorMessages = fields
    .map((field) => {
      const error = errors?.[field];
      const errorMessage =
        typeof error === 'object' ? error.message : error || '';
      return errorMessage;
    })
    .filter((message) => message !== '');

  return (
    <div className="h-4 mt-4">
      <p className="text-xs text-red mt-3">{errorMessages[0]}</p>
    </div>
  );
};

export default ErrorDisplay;
