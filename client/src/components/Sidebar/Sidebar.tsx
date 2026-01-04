import type { ComponentParentProps } from "reactfree-jsx";
import cssClasses from "./Sidebar.module.scss";

export default function Sidebar({ id, children }: ComponentParentProps & {
  id: string;
}) {
  return (
    <aside className={cssClasses.Sidebar} id={id}>
      {children}
    </aside>
  );
}
