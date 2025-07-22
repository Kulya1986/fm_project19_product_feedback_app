"use client";
import { addComment } from "@/app/_lib/actions";
import FormButton from "./FormButton";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

export default function CommentForm({ feedbackId }) {
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, watch, formState, reset, control } = useForm({
    disabled,
  });
  const { errors, isSubmitting } = formState;
  const commentLength = watch("content");

  const createComment = async (formData) => {
    setDisabled(true);
    await addComment(formData);
    reset();
    setDisabled(false);
  };

  return (
    <div className=" flex flex-col px-6 md:px-8 py-6 rounded-card-corner bg-white">
      <h3 className="pb-6 text-blue-grey-700 ">Add Comment</h3>
      <form className="grow" onSubmit={handleSubmit(createComment)}>
        <input
          type="hidden"
          name="feedbackId"
          value={feedbackId}
          {...register("feedbackId")}
        />
        <input
          name="authorId"
          type="hidden"
          value={"450626be-b63b-4d9e-a6d7-30c0dbecef46"}
          {...register("authorId")}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <textarea
              name="content"
              disabled={field.disabled}
              placeholder="Type your comment here"
              maxLength={250}
              className="w-full h-20 bg-blue-grey-100  py-4 px-4 md:px-6 text-[13px] md:text-[15px] text-blue-grey-700 placeholder:text-[#8C92B3] rounded-[5px] hover:outline-blue hover:outline-1 active:border-blue focus-visible:outline-blue focus-visible:outline-1 focus:outline-blue  focus: outline-1 hover:cursor-pointer disabled:pointer-events-none disabled:text-blue-grey-500 resize-none"
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
        <div className="flex flex-row justify-between items-center mt-4">
          <p className="text-[13px] md:text-[15px] text-blue-grey-500">{`${
            commentLength?.length ? 250 - commentLength?.length : 250
          } Characters left`}</p>
          <FormButton type="purple" sending={isSubmitting || disabled}>
            {isSubmitting || disabled ? "Posting..." : "Post Comment"}
          </FormButton>
        </div>
      </form>
    </div>
  );
}
