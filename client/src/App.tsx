import Sidebar from "$client/components/Sidebar/Sidebar";
import AddArticlePage from "$client/pages/AddArticlePage.tsx";
import ArticlePage from "$client/pages/ArticlePage.tsx";
import HomePage from "$client/pages/HomePage.tsx";
import { Route, Router } from "reactfree-jsx/extra/router";
import cssClasses from "./App.module.scss";

export default function App(): Node {
  return (
    <div className={cssClasses.App}>
      <Sidebar />
      <main>
        <Router defaultComponent={(error) => (<p>{error.message ?? "!!!"}</p>)}>
          <Route path="/(home)?" component={HomePage} />
          <Route path="/articles" query={["id"]} component={ArticlePage} />
          <Route path="/articles/new" component={AddArticlePage} />
        </Router>
      </main>
    </div>
  ) as Node;
}