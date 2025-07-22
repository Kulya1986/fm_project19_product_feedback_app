"use client";

import FormButton from "@/app/_components/FormButton";
import FormSelect from "@/app/_components/FormSelect";
import NavigationLink from "@/app/_components/NavigationLink";
import { addFeedback } from "@/app/_lib/actions";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Page() {
  const [disabled, setDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("feature");
  const { register, handleSubmit, formState, reset, control } = useForm({
    disabled,
  });

  const { errors, isSubmitting } = formState;

  const createData = {
    authorId: "450626be-b63b-4d9e-a6d7-30c0dbecef46",
    type: selectedOption,
  };

  const addFeedbackWithData = addFeedback.bind(null, createData);

  const createFeedback = async (formData) => {
    setDisabled(true);
    await addFeedbackWithData(formData);
    reset();
    setDisabled(false);
  };

  return (
    <div className="w-auto mx-6 mt-8 mb-20 md:w-[540px] md:mx-auto flex flex-col lg:mt-3">
      <div className="flex flex-row justify-between items-center mb-[55px] md:mb-[68px]">
        <NavigationLink type="link">Go back</NavigationLink>
      </div>
      <div className="bg-white rounded-card-corner px-6 pb-6 pt-[44px] md:px-[42px] md:pt-[52px] md:pb-10 relative">
        <Image
          src={"/icons/icon-new-feedback.svg"}
          alt="Add feedback"
          width={56}
          height={56}
          className="absolute -translate-y-[64px] md:-translate-y-[80px] w-10 h-10 md:w-14 md:h-14"
        />
        <h1 className="text-blue-grey-700  mb-6 md:mb-10">
          Create New Feedback
        </h1>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(createFeedback)}
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
                  maxLength={100}
                  {...register("title", {
                    required: "Can't be empty",
                    maxLength: 100,
                  })}
                  className="w-full bg-blue-grey-100  py-4 px-4 md:px-6 text-[13px] md:text-[15px] text-blue-grey-700 placeholder:text-[#8C92B3] rounded-[5px] outline-0 hover:outline-blue hover:outline-1 active:border-blue focus-visible:outline-blue focus-visible:outline-1 focus:outline-blue  focus:outline-1 hover:cursor-pointer disabled:pointer-events-none disabled:text-blue-grey-500"
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
              className="text-[13px] tracking-[-0.18px] md:text-sm text-blue-grey-700 md:tracking-[-0.19px] font-bold"
            >
              Category
            </label>
            <p className="text-[13px] md:text-sm text-blue-grey-500 mb-4">
              Choose a category for your feedback
            </p>
            <FormSelect
              labeledBy={"type"}
              selectOptions={["feature", "UX", "UI", "enhancement", "bug"]}
              selectedOption={selectedOption}
              handleOption={setSelectedOption}
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
            <p className="text-[13px] md:text-sm text-blue-grey-500 mb-4">
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <Controller
              control={control}
              render={({ field }) => (
                <textarea
                  name="description"
                  id="description"
                  disabled={field.disabled}
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
          <div className="pt-2 flex flex-col-reverse md:flex-row gap-4 justify-end md:items-center">
            <FormButton
              type="grey"
              destination="back"
              sending={isSubmitting || disabled}
            >
              Cancel
            </FormButton>
            <FormButton type="purple" sending={isSubmitting || disabled}>
              {isSubmitting || disabled ? "Adding ..." : "Add Feedback"}
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
}
