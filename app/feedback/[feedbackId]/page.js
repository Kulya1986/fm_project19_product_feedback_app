import CommentForm from "@/app/_components/CommentForm";
import CommentsList from "@/app/_components/CommentsList";
import FeedbackItem from "@/app/_components/FeedbackItem";
import FormButton from "@/app/_components/FormButton";
import NavigationLink from "@/app/_components/NavigationLink";
import { getFeedback, getUserVotes } from "@/app/_lib/data-service";

export const revalidate = 60;

export default async function Page({ params, searchParams }) {
  const { feedbackId } = await params;
  const urlParams = await searchParams;
  const replyTo = urlParams?.replyTo ?? null;
  const data = await getFeedback(feedbackId);
  const feedback = data[0];
  const roughVotes = await getUserVotes("b075af20-5627-44d0-b96c-3c20d842ed34");
  const votes = roughVotes.map((item) => item.feedbackId);

  return (
    <div className="m-6 md:m-0 lg:max-w-[730px] lg:mx-auto flex flex-col gap-6 grow">
      <div className="flex flex-row justify-between items-center ">
        <NavigationLink type="link">Go back</NavigationLink>
        <FormButton type="blue" destination={`/feedback/edit/${feedbackId}`}>
          Edit Feedback
        </FormButton>
      </div>
      <FeedbackItem
        feedback={feedback}
        voted={votes.includes(feedback.id)}
        detailsPage={true}
      />
      <CommentsList feedbackId={Number(feedbackId)} replyTo={Number(replyTo)} />
      <CommentForm feedbackId={Number(feedbackId)} />
    </div>
  );
}
