import Button from "$client/components/Button/Button.tsx";
import Dialog, { showDialog } from "$client/components/Dialog/Dialog.tsx";
import Form from "$client/components/Form/Form.tsx";
import { logIn } from "$client/utils/api.ts";
import type { FormErrorRecord, LoginData } from "@blog/common";
import { obs } from "reactfree-jsx";

export function showLoginDialog(): void {
  showDialog(
    <Dialog>
      <LoginForm />
    </Dialog> as HTMLDialogElement
  );
}

function LoginForm() {
  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    formErrorObs.value = null;
    const formData = new FormData(e.target as HTMLFormElement);
    const signupData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string
    };
    const [_, formErrors] = await logIn(signupData);

    if (formErrors) {
      formErrorObs.value = formErrors;
      return;
    }

    location.reload();
  };

  const formErrorObs = obs<FormErrorRecord<LoginData> | null>(null);

  return (
    <Form handleSubmit={handleSubmit}>
      {formErrorObs.value?.$all && (<div>{formErrorObs.value.$all}</div>)}
      <Form.Row>
        <Form.Label htmlFor="username" text="Username" required />
        <UsernameInput id="username" />
        {formErrorObs.value?.username && (
          <Form.Error errors={formErrorObs.value.username} />
        )}
      </Form.Row>
      <Form.Row>
        <Form.Label htmlFor="password" text="Password" required />
        <PasswordInput id="password" />
        {formErrorObs.value?.password && (
          <Form.Error errors={formErrorObs.value.password} />
        )}
      </Form.Row>
      <Form.Row>
        <Button type="submit">Log in</Button>
      </Form.Row>
    </Form>
  );
}

function UsernameInput({ id }: { id: string; }) {
  return (
    <input
      type="text"
      id={id}
      name={id}
      maxLength={20}
      required
    />
  );
}

function PasswordInput({ id }: { id: string; }) {
  return (
    <input
      type="password"
      id={id}
      name={id}
      required
    />
  );
}