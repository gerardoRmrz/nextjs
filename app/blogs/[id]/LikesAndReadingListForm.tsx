"use client";
import { incrementBlogLikes, addReadingList } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useActionState, useEffect } from "react";

const LikesAndReadingListForm = ({
  isInReadingList,
  blogId,
}: {
  isInReadingList: boolean | null | undefined;
  blogId: number;
}) => {
  const [likesState, incrementLikesAction] = useActionState(
    incrementBlogLikes,
    { error: "", success: false, executed: false },
  );
  const [readingListState, addReadingListAction] = useActionState(
    addReadingList,
    { error: "", success: false, executed: false },
  );
  const { showNotification } = useNotification();

  useEffect(() => {
    if (likesState.success && likesState.executed) {
      showNotification("Like added", "success");
    } else if (!likesState.success && likesState.executed) {
      showNotification("App fail to add Like", "error");
    }
    if (readingListState.success && readingListState.executed) {
      showNotification("Blog added to reading list");
    } else if (!readingListState.success && readingListState.executed) {
      showNotification("App fail to add blog to reading list", "error");
    }
  }, [likesState, readingListState, showNotification]);

  return (
    <>
      <form>
        <input type="hidden" name="id" value={blogId}></input>
        <button
          type="submit"
          formAction={incrementLikesAction}
          className="custom-button"
        >
          Like
        </button>
        {!isInReadingList ? (
          <>
            <input type="hidden" name="id" value={blogId}></input>
            <button
              type="submit"
              formAction={addReadingListAction}
              className="custom-green-button"
              data-testID="add-to-reading-list-button"
            >
              add to reading list
            </button>
          </>
        ) : (
          <p className="inline-block text-2xl ml-5 text-green-400">Reading</p>
        )}
      </form>
    </>
  );
};

export default LikesAndReadingListForm;
