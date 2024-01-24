import React, { useState } from "react";
import { object, string, number } from "yup";
import { createReview } from "./ReviewService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import StarRatingInput from "../../utilities/components/StarRatingInput";
import { formatDateTime, timeOptions } from "../../utilities/functions/Helpers";
import { useUser } from "../user/UserProvider";
import { useLoadingSpinner } from "../../utilities/components/LoadingSpinnerProvider";

const schema = object().shape({
  id: number().nullable().optional(),
  title: string().required("Title is required"),
  rating: number()
    .min(1, "One (1) star is the minimum rating value.")
    .max(5, "Five (5) stars is the maximum rating value.")
    .required("Rating is required"),
  comment: string()
    .test(
      "is-right-size",
      "Comment must be at most 2000 characters",
      (value) => value.trim().length < 2000
    )
    .required("Comment is required"),
  postedDate: string().required("Posted date is required"),
  lastEditedDate: string().notRequired(),
  user: object().required(),
});

/**
 * The form to create or update a review.
 * @param {object} props - The props passed to the component when updating a review.
 * @returns
 */
const ReviewForm = (props) => {
  const {
    review,
    updateReview,
    toggleModal,
    setState,
    isUpdating = false,
  } = props;
  const [apiError, setApiError] = useState(false);

  const { userProfile } = useUser();
  const setIsLoading = useLoadingSpinner();
  const userSummary = {
    userId: userProfile.userId,
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    profilePictureUrl: userProfile.userMedia?.mediaUrl ?? "",
  };

  const now = new Date().toLocaleString("en-US", timeOptions);

  const {
    clearErrors,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: review?.id ?? null,
      title: review?.title ?? "",
      rating: review?.rating ?? 0,
      comment: review?.comment ?? "",
      postedDate: review?.postedDate ?? formatDateTime(now),
      lastEditedDate: review?.lastEditedDate ?? null,
      user: review?.user ?? userSummary,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (isUpdating) {
      data.lastEditedDate = formatDateTime(now);
      await updateReview(data, setApiError, setState, setIsLoading);
    } else {
      await createReview(data, setApiError, setState, setIsLoading);
    }
    !apiError && reset();
    toggleModal !== undefined && !apiError && toggleModal(false);
  };

  const handleCancel = () => {
    clearErrors();
    reset();
    toggleModal !== undefined && toggleModal(false);
  };

  return (
    <div className="bg-gray-100 containe rounded-md border-b-blue-500 border-b-2 mx_auto p-2 md:p-4">
      <div className="flex flex-col justify-center items-center">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="title" className="text-sm font-bold text-gray-500">
              Title
            </label>
            <br />
            <input
              placeholder="Your title here..."
              className={`${
                errors.title ? "rounded-sm border-2 border-red-500" : ""
              } w-full rounded px-1`}
              {...register("title")}
            />
            <p className="text-red-500 text-xs">{errors.title?.message}</p>
          </div>
          <br />
          <div className="flex flex-col space-y-2">
            <label htmlFor="rating" className="text-sm font-bold text-gray-500">
              Rating
            </label>
            <br />
            <Controller
              name="rating"
              control={control}
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <StarRatingInput value={value} onChange={onChange} />
              )}
            />
            <p className="text-red-500 text-xs">{errors.rating?.message}</p>
          </div>
          <br />
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="comment"
              className="text-sm font-bold text-gray-500"
            >
              Comment
            </label>
            <br />
            <textarea
              placeholder="Your comment here..."
              maxLength={2000}
              rows={4}
              className={`${
                errors.comment ? "rounded-sm border-2 border-red-500" : ""
              } w-full rounded px-1`}
              {...register("comment")}
            />
            <p className="text-red-500 text-xs">{errors.comment?.message}</p>
          </div>
          <br />

          <div className="flex justify-between w-full">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-2 w-1/3"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-1/3 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
