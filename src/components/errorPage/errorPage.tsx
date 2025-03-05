interface ErrorMessageProps {
  message: string;
}
export default function ErrorPage({ message }: ErrorMessageProps) {
  return (
    <div
      className="min-h-screen justify-center flex flex-col items-center
       bg-[#bab2b5]
       bg-cover"
    >
      <div style={{ color: 'red' }}>Error: {message}</div>
    </div>
  );
}
