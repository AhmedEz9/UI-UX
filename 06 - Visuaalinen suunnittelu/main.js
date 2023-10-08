const dialogElement = document.querySelector("dialog");
const openDialogButton = document.getElementById("open_dialog");
const closeDialogButton = document.getElementById("close_dialog");

const focusableElements = dialogElement.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

const trapFocus = (event) => {
  if (event.key === "Tab") {
    const isTabForward = !event.shiftKey && document.activeElement === lastFocusableElement;
    const isTabBackward = event.shiftKey && document.activeElement === firstFocusableElement;

    if (isTabForward) {
      event.preventDefault();
      firstFocusableElement.focus();
    } else if (isTabBackward) {
      event.preventDefault();
      lastFocusableElement.focus();
    }
  }
};

const openDialog = () => {
  if (dialogElement) {
    dialogElement.showModal();
    dialogElement.addEventListener("keydown", trapFocus);
  } else {
    console.error('Dialog element not found!');
  }
};

const closeDialog = (event) => {
  event.preventDefault();

  if (dialogElement) {
    dialogElement.close();
    dialogElement.removeEventListener("keydown", trapFocus);
    openDialogButton.focus();
  } else {
    console.error('Dialog element not found!');
  }
};

openDialogButton.addEventListener("click", openDialog);
closeDialogButton.addEventListener("click", closeDialog);

if (typeof dialogElement.showModal !== "function") {
  dialogPolyfill.registerDialog(dialogElement);
}
