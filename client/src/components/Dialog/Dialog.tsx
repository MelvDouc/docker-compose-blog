import type { ComponentParentProps } from "reactfree-jsx";
import cssClasses from "./Dialog.module.scss";

export default function Dialog({ onClose, children }: ComponentParentProps & {
  onClose?: (subscription: () => unknown) => void;
}) {
  const $init = (element: HTMLDialogElement) => {
    onClose && onClose(() => element.close());
    element.onclose = () => element.remove();
  };

  return (
    <dialog className={cssClasses.Dialog} $init={$init}>
      {children}
    </dialog>
  );
}

export function showDialog(dialog: HTMLDialogElement): void {
  document.body.prepend(dialog);
  dialog.showModal();
}