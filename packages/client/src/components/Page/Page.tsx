import type { ComponentParentProps } from "reactfree-jsx";
import cssClasses from "./Page.module.scss";

export default function Page({ title, children }: ComponentParentProps & {
  title: string;
}) {
  document.title = `${title} | Blog`;

  return (
    <div className={cssClasses.Page}>{children}</div>
  );
}