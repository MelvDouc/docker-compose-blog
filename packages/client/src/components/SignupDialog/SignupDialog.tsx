import Button from "$client/components/Button/Button.tsx";
import Dialog, { showDialog } from "$client/components/Dialog/Dialog.tsx";
import Form from "$client/components/Form/Form.tsx";
import PasswordInput from "$client/components/form-elements/PasswordInput.tsx";
import UsernameInput from "$client/components/form-elements/UsernameInput";
import { signUp } from "$client/utils/api.ts";
import type { FormErrorRecord, SignupData } from "@blog/common";
import { type Obs, obs } from "reactfree-jsx";
import { TypedEventEmitter } from "reactfree-jsx/extra";

export function showSignupDialog(): void {
  const emitter = new TypedEventEmitter<{ close: []; }>();
  const [onClose, emitClose] = emitter.createHandlers("close");

  showDialog(
    <Dialog onClose={onClose}>
      <SignupForm emitClose={emitClose} />
    </Dialog> as HTMLDialogElement
  );
}

function SignupForm({ emitClose }: {
  emitClose: VoidFunction;
}) {
  const formErrorObs = obs<SignupFormErrors>(null);
  const handleSubmit = createSubmitHandler(formErrorObs);

  return (
    <Form handleSubmit={handleSubmit}>
      {formErrorObs.value?.$all && (<div>{formErrorObs.value.$all}</div>)}
      <Form.Row centered>
        <h2>Sign up</h2>
      </Form.Row>
      <Form.Row>
        <Form.Label htmlFor="username" text="Username" required />
        <UsernameInput id="username" pattern />
        {formErrorObs.value?.username && (
          <Form.Error errors={formErrorObs.value.username} />
        )}
      </Form.Row>
      <Form.Row>
        <Form.Label htmlFor="password1" text="Password" required />
        <PasswordInput id="password1" length />
        {formErrorObs.value?.password1 && (
          <Form.Error errors={formErrorObs.value.password1} />
        )}
      </Form.Row>
      <Form.Row>
        <Form.Label htmlFor="password2" text="Confirm password" required />
        <PasswordInput id="password2" length />
        {formErrorObs.value?.password2 && (
          <Form.Error errors={formErrorObs.value.password2} />
        )}
      </Form.Row>
      <Form.Row inline centered>
        <Button type="submit">Log in</Button>
        <Button handleClick={emitClose} color="danger">Cancel</Button>
      </Form.Row>
    </Form>
  );
}

function createSubmitHandler(formErrorObs: Obs<SignupFormErrors>) {
  return async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    formErrorObs.value = null;
    const formData = new FormData(e.target as HTMLFormElement);
    const signupData = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password1: formData.get("password1") as string,
      password2: formData.get("password2") as string
    };
    const [_, formErrors] = await signUp(signupData);

    if (formErrors) {
      formErrorObs.value = formErrors;
      return;
    }

    location.reload();
  };
}

type SignupFormErrors = FormErrorRecord<SignupData> | null;