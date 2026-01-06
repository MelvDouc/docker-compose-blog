import Button from "$client/components/Button/Button.tsx";
import Dialog, { showDialog } from "$client/components/Dialog/Dialog.tsx";
import Form from "$client/components/Form/Form.tsx";
import PasswordInput from "$client/components/form-elements/PasswordInput.tsx";
import UsernameInput from "$client/components/form-elements/UsernameInput";
import { logIn } from "$client/utils/api.ts";
import { loggedUserObs } from "$client/utils/auth.ts";
import type { FormErrorRecord, LoginData } from "@blog/common";
import { type Obs, obs } from "reactfree-jsx";
import { TypedEventEmitter } from "reactfree-jsx/extra";

export function showLoginDialog(): void {
  const emitter = new TypedEventEmitter<{ close: []; }>();
  const [onClose, emitClose] = emitter.createHandlers("close");

  showDialog(
    <Dialog onClose={onClose}>
      <LoginForm emitClose={emitClose} />
    </Dialog> as HTMLDialogElement
  );
}

function LoginForm({ emitClose }: {
  emitClose: VoidFunction;
}) {
  const formErrorObs = obs<LoginFormErrors>(null);
  const handleSubmit = createSubmitHandler(formErrorObs, emitClose);

  return (
    <Form handleSubmit={handleSubmit}>
      {formErrorObs.value?.$all && (<div>{formErrorObs.value.$all}</div>)}
      <Form.Row centered>
        <h2>Log in</h2>
      </Form.Row>
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
      <Form.Row inline centered>
        <Button type="submit">Log in</Button>
        <Button handleClick={emitClose} color="danger">Cancel</Button>
      </Form.Row>
    </Form>
  );
}

function createSubmitHandler(formErrorObs: Obs<LoginFormErrors>, emitClose: VoidFunction) {
  return async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    formErrorObs.value = null;
    const formData = new FormData(e.target as HTMLFormElement);
    const signupData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string
    };
    const [user, formErrors] = await logIn(signupData);

    if (formErrors) {
      formErrorObs.value = formErrors;
      return;
    }

    emitClose();
    loggedUserObs.value = user;
  };
}

type LoginFormErrors = FormErrorRecord<LoginData> | null;