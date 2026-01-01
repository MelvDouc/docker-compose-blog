import { Link } from "reactfree-jsx/extra/router";
import cssClasses from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <aside className={cssClasses.Sidebar}>
      <section className={cssClasses.Links}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/articles/new">New article</Link></li>
        </ul>
      </section>
    </aside>
  );
}
