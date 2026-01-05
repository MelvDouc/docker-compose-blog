export default function PasswordInput({ id, length = false }: {
  id: string;
  length?: boolean;
}) {
  return (
    <input
      type="password"
      id={id}
      name={id}
      required
      $init={(element) => {
        if (length) {
          element.minLength = 8;
          element.maxLength = 50;
        }
      }}
    />
  );
}