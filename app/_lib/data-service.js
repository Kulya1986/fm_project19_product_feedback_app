import { supabase } from "./supabase";
import { notFound } from "next/navigation";

/////////////
// GET

export async function getFeedback(id) {
  const { data, error } = await supabase
    .from("feedback")
    .select(
      "*, comments(content, authorId, author:users!authorId(id, nickname, user_name, avatar))"
    )
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Feedback could not be loaded");
  }

  return data;
}

export async function getFeedbackAll() {
  const {
    data: feedback,
    error,
    count,
  } = await supabase.from("feedback").select("*", { count: "exact" });

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    throw new Error("Feedback could not be loaded");
  }

  return { feedback, count };
}

export async function getFeedbackFilteredSorted({ status, type, sortby }) {
  let query = supabase.from("feedback_with_comments_count").select("*", {
    count: "exact",
  });

  if (status) query = query.eq("status", status);
  if (type) query = query.eq("type", type);

  if (sortby?.column) {
    if (sortby.column === "comments") {
      query = query.order("comments_count", {
        ascending: sortby.direction === "asc",
      });
    } else
      query = query.order(sortby.column, {
        ascending: sortby.direction === "asc",
      });
  } else {
    query = query.order("created_at", { ascending: false });
  }
  const { data, error, count } = await query;

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    throw new Error("Feedback could not be loaded");
  }

  return { data, count };
}

//Get feedback comments

export async function getComments(id) {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*, author:users!authorId(nickname, user_name, avatar)")
    .eq("feedbackId", id);

  if (error) {
    console.error(error);
    throw new Error("Comments could not be loaded");
  }

  return comments;
}

//Get replies to the comment

export async function getReplies(id) {
  const { data: replies, error } = await supabase
    .from("comments")
    .select(
      "*, author:users!authorId(nickname, user_name, avatar), receiver:users!receiverId(nickname, user_name) "
    )
    .eq("parentCommentId", id);

  if (error) {
    console.error(error);
    throw new Error("Replies could not be loaded");
  }

  return replies;
}

//Get comment by id

export async function getComment(id) {
  const { data: comment, error } = await supabase
    .from("comments")
    .select(
      "*, author:users!authorId(nickname, user_name, avatar), receiver:users!receiverId(nickname, user_name) "
    )
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Comment could not be loaded");
  }

  return comment;
}

export async function getUserVotes(id) {
  const { data, error } = await supabase
    .from("votes")
    .select("feedbackId")
    .eq("userId", id);

  if (error) {
    throw new Error("Could not get votes for user");
  }

  return data;
}
