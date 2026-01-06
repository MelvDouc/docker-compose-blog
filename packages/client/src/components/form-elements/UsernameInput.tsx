export default function UsernameInput({ id, pattern = false }: {
  id: string;
  pattern?: boolean;
}) {
  return (
    <input
      type="text"
      id={id}
      name={id}
      maxLength={20}
      required
      $init={(element) => {
        pattern && (element.pattern = "[\-a-zA-Z0-9]+");
      }}
    />
  );
}