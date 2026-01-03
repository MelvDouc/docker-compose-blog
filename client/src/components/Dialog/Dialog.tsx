import type { ComponentParentProps } from "reactfree-jsx";
import cssClasses from "./AuthDialog.module.scss";

export default function Dialog({ children }: ComponentParentProps) {
  return (
    <dialog className={cssClasses.Dialog}>
      {children}
    </dialog>
  );
}

export function showDialog(dialog: HTMLDialogElement): void {
  document.body.prepend(dialog);
  dialog.showModal();
}