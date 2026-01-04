import type { ComponentChild } from "reactfree-jsx";
import cssClasses from "./Button.module.scss";

export default function Button({ color = "primary", type = "button", handleClick, children }: {
  color?: "primary" | "white" | "danger";
  type?: JSX.IntrinsicElements["button"]["type"];
  handleClick?: JSX.IntrinsicElements["button"]["on:click"];
  children: ComponentChild;
}) {
  const className = {
    [cssClasses.Button]: true,
    [cssClasses[color]]: true
  };

  return (
    <button className={className} type={type} on:click={handleClick}>{children}</button>
  );
}