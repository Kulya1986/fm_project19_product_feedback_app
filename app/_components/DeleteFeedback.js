import { useTransition } from "react";
import FormButton from "./FormButton";

export default function DeleteFeedback({ id }) {
  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return <FormButton type="red">Delete</FormButton>;
}
DeleteFeedback;
