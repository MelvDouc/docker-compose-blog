import type { ComponentParentProps } from "reactfree-jsx";
import cssClasses from "./Form.module.scss";

export default function Form({ method = "GET", handleSubmit, children }: ComponentParentProps & {
  method?: "GET" | "POST" | "DIALOG";
  handleSubmit: (e: SubmitEvent) => unknown;
}): HTMLFormElement {
  return (
    <form className={cssClasses.Form} method={method} on:submit={handleSubmit}>
      {children}
    </form>
  ) as HTMLFormElement;
}

Form.Row = ({ children }: ComponentParentProps) => {
  return (
    <section className={cssClasses.Row}>{children}</section>
  );
};

Form.Label = ({ htmlFor, text, required = false }: {
  htmlFor: string;
  text: string;
  required?: boolean;
}) => {
  const className = {
    [cssClasses.Label]: true,
    [cssClasses.required]: required,
  };

  return (
    <label htmlFor={htmlFor} className={className}>{text}</label>
  );
};

Form.Error = ({ errors }: { errors: string[]; }) => {
  return (
    <ul className={cssClasses.Error}>
      {errors.map((error) => (
        <li>{error}</li>
      ))}
    </ul>
  );
};