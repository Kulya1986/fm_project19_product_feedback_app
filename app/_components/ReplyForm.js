"use client";

import { Controller, useForm } from "react-hook-form";
import FormButton from "./FormButton";
import { addReply } from "@/app/_lib/actions";
import { useState } from "react";

export default function ReplyForm({
  parentCommentId,
  feedbackId,
  receiverId,
  shift,
}) {
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, formState, reset, control } = useForm({
    disabled,
  });
  const { errors, isSubmitting } = formState;
  const replyData = {
    parentCommentId,
    feedbackId,
    receiverId,
  };

  const addReplyWithData = addReply.bind(null, replyData);

  const createReply = async (formData) => {
    setDisabled(true);
    await addReplyWithData(formData);
    reset();
    setDisabled(false);
  };

  return (
    <form
      className={`flex flex-row gap-4 items-start mt-6 ${
        shift ? " md:pl-[74px]" : ""
      }`}
      onSubmit={handleSubmit(createReply)}
    >
      <div className="flex flex-col grow">
        <Controller
          control={control}
          render={({ field }) => (
            <textarea
              name="content"
              disabled={field.disabled}
              placeholder="Type your reply here"
              maxLength={250}
              className="grow h-20 bg-blue-grey-100 py-4 px-4 md:px-6 text-[13px] md:text-[15px] text-blue-grey-700 placeholder:text-[#8C92B3] rounded-[5px] hover:outline-blue hover:outline-1 active:border-blue focus-visible:outline-blue focus-visible:outline-1 focus:outline-blue  focus: outline-1 hover:cursor-pointer resize-none disabled:pointer-events-none disabled:text-blue-grey-500"
              {...register("content", {
                required: "Can't be empty",
                maxLength: 250,
              })}
            />
          )}
          name="content"
        />
        {errors.content && (
          <p className="text-red text-sm">{errors.content.message}</p>
        )}
      </div>

      <FormButton type="purple" sending={isSubmitting || disabled}>
        {isSubmitting || disabled ? "Posting..." : "Post Reply"}
      </FormButton>
    </form>
  );
}
