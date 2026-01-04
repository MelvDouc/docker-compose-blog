import type { ComponentParentProps } from "reactfree-jsx";
import cssClasses from "./Dialog.module.scss";

export default function Dialog({ children }: ComponentParentProps) {
  const onCancel = (e: Event) => {
    (e.target as HTMLDialogElement).close();
  };

  const onClose = (e: Event) => {
    (e.target as HTMLDialogElement).remove();
  };

  return (
    <dialog className={cssClasses.Dialog} on:cancel={onCancel} on:close={onClose}>
      {children}
    </dialog>
  );
}

export function showDialog(dialog: HTMLDialogElement): void {
  document.body.prepend(dialog);
  dialog.showModal();
}