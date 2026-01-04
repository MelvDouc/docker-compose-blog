import type { ComponentParentProps } from "reactfree-jsx";
import cssClasses from "./Sidebar.module.scss";

export default function Sidebar({ gridArea, children }: ComponentParentProps & {
  gridArea: string;
}) {
  return (
    <aside className={cssClasses.Sidebar} style={{ gridArea }}>
      {children}
    </aside>
  );
}
