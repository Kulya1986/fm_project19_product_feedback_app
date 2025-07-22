"use client";
import { useState } from "react";
import FormButton from "./FormButton";
import FormSelect from "./FormSelect";
import { Controller, useForm } from "react-hook-form";
import { deleteFeedback, editFeedback } from "../_lib/actions";

function EditForm({ feedback }) {
  const { id, type, title, status, description } = feedback;
  const [selectedType, setSelectedType] = useState(type);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, formState, reset, control } = useForm({
    disabled,
  });

  const { errors, isSubmitting } = formState;

  const updateData = {
    id,
    type: selectedType,
    status: selectedStatus,
  };

  const updateFeedbackWithData = editFeedback.bind(null, updateData);

  const updateFeedback = async (formData) => {
    setDisabled(true);
    await updateFeedbackWithData(formData);
    reset();
    setDisabled(false);
  };

  const onDelete = async (id) => {
    if (confirm("Are you sure you want to delete this feedback?")) {
      setDisabled(true);
      await deleteFeedback(id);
      setDisabled(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(updateFeedback)}
    >
      <div>
        <label
          htmlFor="title"
          className="text-[13px] tracking-[-0.18px] md:text-sm text-blue-grey-700 md:tracking-[-0.19px] font-bold"
        >
          Feedback Title
        </label>
        <p className=" text-[13px] md:text-sm text-blue-grey-500 mb-4">
          Add a short, descriptive headline
        </p>
        <Controller
          control={control}
          render={({ field }) => (
            <input
              name="title"
              id="title"
              disabled={field.disabled}
              defaultValue={title}
              maxLength={100}
              {...register("title", {
                required: "Can't be empty",
                maxLength: 100,
              })}
              className="w-full bg-blue-grey-100 py-4 px-4 md:px-6 text-[13px] md:text-[15px] text-blue-grey-700 placeholder:text-[#8C92B3] rounded-[5px] outline-0 hover:outline-blue hover:outline-1 active:border-blue focus-visible:outline-blue focus-visible:outline-1 focus:outline-blue  focus:outline-1 hover:cursor-pointer disabled:pointer-events-none disabled:text-blue-grey-500"
            />
          )}
          name="title"
        />

        {errors.title && (
          <p className="text-red text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label
          id="type"
          // htmlFor="type"
          className="text-[13px] tracking-[-0.18px] md:text-sm text-blue-grey-700 md:tracking-[-0.19px] font-bold"
        >
          Category
        </label>
        <p className=" text-[13px] md:text-sm text-blue-grey-500 mb-4">
          Choose a category for your feedback
        </p>
        <FormSelect
          labeledBy={"type"}
          selectOptions={["feature", "UX", "UI", "enhancement", "bug"]}
          selectedOption={selectedType}
          handleOption={setSelectedType}
          disabled={isSubmitting || disabled}
        />
      </div>
      <div>
        <label
          // htmlFor="status"
          id="status"
          className="text-[13px] tracking-[-0.18px] md:text-sm text-blue-grey-700 md:tracking-[-0.19px] font-bold"
        >
          Update Status
        </label>
        <p className=" text-[13px] md:text-sm text-blue-grey-500 mb-4">
          Change feedback state
        </p>
        <FormSelect
          labeledBy={"status"}
          selectOptions={["suggestion", "planned", "in-progress", "live"]}
          selectedOption={selectedStatus}
          handleOption={setSelectedStatus}
          disabled={isSubmitting || disabled}
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="text-[13px] tracking-[-0.18px] md:text-sm text-blue-grey-700 md:tracking-[-0.19px] font-bold"
        >
          Feedback Detail
        </label>
        <p className=" text-[13px] md:text-sm text-blue-grey-500 mb-4">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <Controller
          control={control}
          render={({ field }) => (
            <textarea
              name="description"
              id="description"
              disabled={field.disabled}
              defaultValue={description}
              maxLength={250}
              className="w-full h-20 bg-blue-grey-100  py-4 px-4 md:px-6 text-[13px] md:text-[15px] text-blue-grey-700 placeholder:text-[#8C92B3] rounded-[5px] outline-0 hover:outline-blue hover:outline-1 active:border-blue focus-visible:outline-blue focus-visible:outline-1 focus:outline-blue  focus:outline-1 hover:cursor-pointer resize-none disabled:pointer-events-none disabled:text-blue-grey-500"
              {...register("description", {
                required: "Can't be empty",
                maxLength: 250,
              })}
            />
          )}
          name="description"
        />
        {errors.description && (
          <p className="text-red text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-4 flex-col-reverse md:flex-row justify-between md:gap-0 md:items-center pt-2">
        <FormButton
          type="red"
          onClick={(e) => {
            e.preventDefault();
            onDelete(id);
          }}
          sending={isSubmitting || disabled}
        >
          Delete
        </FormButton>
        <div className=" flex flex-col-reverse md:flex-row gap-4 justify-end md:items-center">
          <FormButton
            type="grey"
            destination="back"
            sending={isSubmitting || disabled}
          >
            Cancel
          </FormButton>
          <FormButton type="purple" sending={isSubmitting || disabled}>
            {isSubmitting ? "Saving ..." : "Save Changes"}
          </FormButton>
        </div>
      </div>
    </form>
  );
}

export default EditForm;
