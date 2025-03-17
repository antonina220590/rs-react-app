type Props = {
  htmlFor: string;
  children: React.ReactNode;
};

export const Label = ({ htmlFor, children }: Props) => (
  <label
    style={{ fontFamily: 'Roboto, sans-serif' }}
    className="flex gap-1 flex-col"
    htmlFor={htmlFor}
  >
    {children}
  </label>
);
