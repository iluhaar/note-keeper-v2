const Error = ({ title, message }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <main>{message}</main>
    </div>
  );
};

export default Error;

interface Props {
  title: string;
  message: string;
}
