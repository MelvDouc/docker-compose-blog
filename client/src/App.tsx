import Sidebar from "$client/components/Sidebar/Sidebar";
import AddArticlePage from "$client/pages/AddArticlePage.tsx";
import ArticlePage from "$client/pages/ArticlePage.tsx";
import HomePage from "$client/pages/HomePage.tsx";
import { Link, Route, Router } from "reactfree-jsx/extra/router";
import cssClasses from "./App.module.scss";
import Header from "$client/components/Header/Header.tsx";

export default function App(): Node {
  return (
    <div className={cssClasses.App}>
      <Header />
      <Sidebar gridArea="a">
        <section className={cssClasses.Links}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/articles/new">New article</Link></li>
          </ul>
        </section>
      </Sidebar>
      <main>
        <Router defaultComponent={(error) => (<p>{error.message ?? "!!!"}</p>)}>
          <Route path="/(home)?" component={HomePage} />
          <Route path="/articles" query={["id"]} component={ArticlePage} />
          <Route path="/articles/new" component={AddArticlePage} />
        </Router>
      </main>
      <Sidebar gridArea="b"></Sidebar>
    </div>
  ) as Node;
}