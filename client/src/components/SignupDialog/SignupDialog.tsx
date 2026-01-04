import Button from "$client/components/Button/Button.tsx";
import Dialog, { showDialog } from "$client/components/Dialog/Dialog.tsx";
import Form from "$client/components/Form/Form.tsx";
import { signUp } from "$client/utils/api.ts";
import type { FormErrorRecord, SignupData } from "$common/common-types.mts";
import { obs } from "reactfree-jsx";

export function showSignupDialog(): void {
  showDialog(
    <Dialog>
      <SignupForm />
    </Dialog> as HTMLDialogElement
  );
}

function SignupForm() {
  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
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

  const formErrorObs = obs<FormErrorRecord<SignupData> | null>(null);

  return (
    <Form handleSubmit={handleSubmit}>
      <Form.Row>
        <Form.Label htmlFor="email" text="Email address" required />
        <input type="email" id="email" name="email" required />
        {formErrorObs.value?.email && (
          <Form.Error errors={formErrorObs.value.email} />
        )}
      </Form.Row>
      <Form.Row>
        <Form.Label htmlFor="username" text="Username" required />
        <UsernameInput id="username" />
        {formErrorObs.value?.username && (
          <Form.Error errors={formErrorObs.value.username} />
        )}
      </Form.Row>
      <Form.Row>
        <Form.Label htmlFor="password1" text="Password" required />
        <PasswordInput id="password1" />
        {formErrorObs.value?.password1 && (
          <Form.Error errors={formErrorObs.value.password1} />
        )}
      </Form.Row>
      <Form.Row>
        <Form.Label htmlFor="password2" text="Confirm password" required />
        <PasswordInput id="password2" />
        {formErrorObs.value?.password2 && (
          <Form.Error errors={formErrorObs.value.password2} />
        )}
      </Form.Row>
      <Form.Row>
        <Button type="submit">Sign up</Button>
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
      pattern="[\-a-zA-Z0-9]+"
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
      $init={(element) => element.minLength = 8}
      maxLength={50}
      required
    />
  );
}