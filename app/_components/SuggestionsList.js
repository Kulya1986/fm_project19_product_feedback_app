import { getFeedbackFilteredSorted, getUserVotes } from "../_lib/data-service";
import NoSuggestions from "./NoSuggestions";
import FeedbackItem from "./FeedbackItem";

export default async function SuggestionsList({ typeFilter, sortOrder }) {
  const status = "suggestion";
  const type = typeFilter === "all" ? null : typeFilter;

  const sortby = {
    column: sortOrder.split(" ")[1],
    direction: sortOrder.split(" ")[0] === "most" ? "desc" : "asc",
  };

  const { data: suggestions, count } = await getFeedbackFilteredSorted({
    status,
    type,
    sortby,
  });

  const roughVotes = await getUserVotes("b075af20-5627-44d0-b96c-3c20d842ed34");
  const votes = roughVotes.map((item) => item.feedbackId);

  return (
    <div className="grid gap-4 px-6 pb-14 md:px-0  md:pb-0lg:gap-5">
      {count === 0 ? (
        <NoSuggestions />
      ) : (
        suggestions.map((item) => (
          <FeedbackItem
            feedback={item}
            key={item.id}
            voted={votes.includes(item.id)}
          />
        ))
      )}
    </div>
  );
}
