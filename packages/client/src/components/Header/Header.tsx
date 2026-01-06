import Button from "$client/components/Button/Button.tsx";
import { showLoginDialog } from "$client/components/LoginDialog/LoginDialog.tsx";
import { showSignupDialog } from "$client/components/SignupDialog/SignupDialog.tsx";
import { logOut } from "$client/utils/api.ts";
import { loggedUserObs } from "$client/utils/auth.ts";

import cssClasses from "./Header.module.scss";

export default function Header() {
  return (
    <header className={cssClasses.Header}>
      <section className={cssClasses.Left}>LOGO</section>
      <section className={cssClasses.Center}>
        <input type="search" name="search" id="search" placeholder="Search..." />
      </section>
      <section className={cssClasses.Right}>
        {loggedUserObs.map((user) => (
          user
            ? (<LogoutButton />)
            : (<AuthControls />)
        ))}
      </section>
    </header>
  );
}

function AuthControls() {
  return (
    <>
      <Button color="white" handleClick={showSignupDialog}>Sign up</Button>
      <Button handleClick={showLoginDialog}>Log in</Button>
    </>
  );
}

function LogoutButton() {
  const handleClick = async () => {
    if (!confirm("Are you sure you want to log out?"))
      return;

    const [success, error] = await logOut();

    if (!success) {
      console.error(error);
    }

    loggedUserObs.value = null;
  };

  return (
    <Button handleClick={handleClick}>Log out</Button>
  );
}