import { ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <div className="w-[80%] flex ">
      <form className="rounded-[4%] flex flex-col gap-9" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}
