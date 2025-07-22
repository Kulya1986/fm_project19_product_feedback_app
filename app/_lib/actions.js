"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { redirect, RedirectType } from "next/navigation";

export async function addComment(formData) {
  const feedbackId = Number(formData.feedbackId);

  const newComment = {
    feedbackId: feedbackId,
    authorId: formData.authorId,
    content: formData.content,
  };

  const { data, error } = await supabase.from("comments").insert([newComment]);

  if (error) throw new Error(error.message);

  revalidatePath(`/feedback/${feedbackId}`);
}

export async function addReply(replyData, formData) {
  //   await new Promise((res) => setTimeout(res, 2000));

  const feedbackId = replyData.feedbackId;

  const newReply = {
    ...replyData,
    content: formData.content,
    authorId: "b075af20-5627-44d0-b96c-3c20d842ed34",
  };

  const { data, error } = await supabase.from("comments").insert([newReply]);

  if (error) throw new Error(error.message);

  revalidatePath(`/feedback/${feedbackId}`);
  redirect(`/feedback/${feedbackId}`, RedirectType.replace);
}

export async function addFeedback(createData, formData) {
  const newFeedback = {
    ...createData,
    ...formData,
  };

  const { data, error } = await supabase.from("feedback").insert([newFeedback]);

  if (error) throw new Error("Could not add your feedback. Try later");
  revalidatePath("/");
  redirect("/");
}

export async function editFeedback(updateData, formData) {
  const updatedFeedback = {
    title: formData.title,
    type:
      updateData.type === "UX" || updateData.type === "UI"
        ? updateData.type
        : updateData.type.toLowerCase(),
    status: updateData.status.toLowerCase(),
    description: formData.description,
  };

  const { data, error } = await supabase
    .from("feedback")
    .update(updatedFeedback)
    .eq("id", updateData.id);

  if (error) throw new Error("Could not update your feedback. Try later");

  revalidatePath("/");
  revalidatePath(`/feedback/${updateData.id}`);
  revalidatePath(`/feedback/edit/${updateData.id}`);
  revalidatePath("/roadmap");

  redirect(`/feedback/${updateData.id}`, RedirectType.replace);
}

export async function deleteFeedback(id) {
  //   await new Promise((res) => setTimeout(res, 2000));
  const { data, error } = await supabase.from("feedback").delete().eq("id", id);

  if (error) throw new Error("Could not update your feedback. Try later");

  revalidatePath("/");
  revalidatePath("/roadmap");

  redirect(`/`, RedirectType.replace);
}

export async function addVote(voteData) {
  const feedback = voteData.feedbackId;

  const newVote = {
    feedbackId: voteData.feedbackId,
    userId: voteData.userId,
  };

  const feedbackUpdateData = { votes: voteData.votes + 1 };
  const { data, error } = await supabase.from("votes").insert([newVote]);
  const { data1, error1 } = await supabase
    .from("feedback")
    .update(feedbackUpdateData)
    .eq("id", feedback);

  if (error || error1) throw new Error("Could not send your vote. Try later");

  revalidatePath("/");
  revalidatePath("/roadmap");
  revalidatePath(`/feedback/${feedback}`);

  //   redirect(`/`, RedirectType.replace);
}
