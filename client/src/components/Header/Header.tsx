import Button from "$client/components/Button/Button.tsx";
import { showLoginDialog } from "$client/components/LoginDialog/LoginDialog.tsx";
import { showSignupDialog } from "$client/components/SignupDialog/SignupDialog.tsx";

import cssClasses from "./Header.module.scss";

export default function Header() {
  return (
    <header className={cssClasses.Header}>
      <section className={cssClasses.Left}>LOGO</section>
      <section className={cssClasses.Center}>
        <input type="search" name="search" id="search" placeholder="Search..." />
      </section>
      <section className={cssClasses.Right}>
        <Button color="white" handleClick={showSignupDialog}>Sign up</Button>
        <Button handleClick={showLoginDialog}>Log in</Button>
      </section>
    </header>
  );
}