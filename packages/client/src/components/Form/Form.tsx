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

Form.Row = ({ fillHeight, inline, centered, children }: ComponentParentProps & {
  fillHeight?: boolean;
  inline?: boolean;
  centered?: boolean;
}) => {
  const className = {
    [cssClasses.Row]: true,
    [cssClasses.fillHeight]: !!fillHeight,
    [cssClasses.inline]: !!inline,
    [cssClasses.centered]: !!centered,
  };

  return (
    <section className={className}>{children}</section>
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