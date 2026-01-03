import cssClasses from "./Header.module.scss";

export default function Header() {
  return (
    <header className={cssClasses.Header}>
      <section className={cssClasses.Left}></section>
      <section className={cssClasses.Center}></section>
      <section className={cssClasses.Right}>
        <p>Lorem ipsum dolor sit amet.</p>
      </section>
    </header>
  );
}