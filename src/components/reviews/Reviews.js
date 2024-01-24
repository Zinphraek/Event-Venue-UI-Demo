import React, { useEffect, useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { getReviews } from "./ReviewService";
import Modal from "../../utilities/components/Modal";
import { useUserRefresh } from "../user/UserProvider";
import KeycloakService from "../config/KeycloakService";
import StarRating from "../../utilities/components/StarRating";
import LocalizedModal from "../../utilities/components/LocalizedModal";
import RateReviewSummary from "../../utilities/components/RateReviewSummary";
import { EntitiesListResponseModel } from "../../utilities/models/EntitiesListResponseModel";
import { ToastContainer } from "react-toastify";

/**
 * The Reviews page component.
 * @returns - The reviews page.
 */
const Reviews = () => {
  const [reviewsData, setReviewsData] = useState(EntitiesListResponseModel);
  const [showLoggingDialog, setShowLoggingDialog] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const setFetchUserFlag = useUserRefresh();

  const singIn = async () => {
    await KeycloakService.doLogin(setFetchUserFlag);
  };

  const handleShowReviewForm = () => {
    if (KeycloakService.isLoggedIn()) {
      setShowReviewForm(true);
    } else {
      setShowLoggingDialog(true);
    }
  };

  const reviewSum = reviewsData.content?.reduce(
    (total, review) => total + review.rating,
    0
  );
  let averageRating = reviewSum ? reviewSum / reviewsData.content?.length : 0;
  averageRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5

  const oneStarRating = (
    (reviewsData.content?.filter((review) => review.rating === 1).length *
      100) /
    reviewsData.content?.length
  ).toFixed(2);
  const twoStarRating = (
    (reviewsData.content?.filter((review) => review.rating === 2).length *
      100) /
    reviewsData.content?.length
  ).toFixed(2);
  const threeStarRating = (
    (reviewsData.content?.filter((review) => review.rating === 3).length *
      100) /
    reviewsData.content?.length
  ).toFixed(2);
  const fourStarRating = (
    (reviewsData.content?.filter((review) => review.rating === 4).length *
      100) /
    reviewsData.content?.length
  ).toFixed(2);
  const fiveStarRating = (
    (reviewsData.content?.filter((review) => review.rating === 5).length *
      100) /
    reviewsData.content?.length
  ).toFixed(2);

  useEffect(() => {
    getReviews(setReviewsData, {});
  }, [refresh]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="w-full p-2 md:p-4">
        {/*Section Title*/}
        <div className="grid grid-cols-1 justify-items-stretch lg:grid-cols-3 p-2 lg:p-6">
          <div className="flex flex-col space-y-3 mx-6 p-4">
            <h1 className="text-2xl font-bold text-black">Customer Reviews</h1>
            <div className="flex flex-row items-center gap-2 text-sm text-gray-500">
              <StarRating rating={averageRating} />
              <span className="text-black">{`Based on ${reviewsData.content.length} reviews`}</span>
            </div>
            <div className="my-3">
              <div className="flex flex-col space-y-2 my-4">
                <RateReviewSummary
                  rating={5}
                  percentage={
                    fiveStarRating === undefined || isNaN(fiveStarRating)
                      ? 0
                      : fiveStarRating
                  }
                />
                <RateReviewSummary
                  rating={4}
                  percentage={
                    fourStarRating === undefined || isNaN(fourStarRating)
                      ? 0
                      : fourStarRating
                  }
                />
                <RateReviewSummary
                  rating={3}
                  percentage={
                    threeStarRating === undefined || isNaN(threeStarRating)
                      ? 0
                      : threeStarRating
                  }
                />
                <RateReviewSummary
                  rating={2}
                  percentage={
                    twoStarRating === undefined || isNaN(twoStarRating)
                      ? 0
                      : twoStarRating
                  }
                />
                <RateReviewSummary
                  rating={1}
                  percentage={
                    oneStarRating === undefined || isNaN(oneStarRating)
                      ? 0
                      : oneStarRating
                  }
                />
              </div>
            </div>
            <br />
            <div className="flex flex-col space-y-2 my-4">
              <h2 className="text-xl font-semibold text-black">
                Share your thoughts
              </h2>
              <p className="text-gray-700">
                If you have a minute, we'd love to hear from you!
              </p>
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 hover:border-white text-white border-1 border-gray-500 font-bold py-2 px-3 rounded w-full md:w-2/5 lg:w-full"
                onClick={handleShowReviewForm}
              >
                Write a Review
              </button>
              <Modal isOpen={showLoggingDialog} onClose={setShowLoggingDialog}>
                <LocalizedModal
                  actionHandler={singIn}
                  actionText="Sign In"
                  cancelText="Go back"
                  message="Have something to say? Sign in or register first."
                  setOpen={setShowLoggingDialog}
                  title="Sign In"
                />
              </Modal>
            </div>
            <div>
              {showReviewForm && (
                <ReviewForm
                  setState={setRefresh}
                  toggleModal={setShowReviewForm}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-3 place-items-start p-4 md:ml-10 md:pl-4 md:col-span-2">
            <div className="flex flex-col justify-items-stretch w-full space-y-2 mr-0">
              {/*--The reviews--*/}
              {reviewsData.content
                ?.sort(
                  (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
                )
                .map((review, index) => (
                  <div
                    key={`review-${review.id}`}
                    className={`w-full ${
                      index !== 0 ? "border-t-1 border-gray-300" : ""
                    }`}
                  >
                    <Review key={`review-${review.id}`} review={review} />
                  </div>
                ))}
              {reviewsData.content?.length === 0 && (
                <div>
                  <h2 className="text-gray-700 text-xl font-bold">
                    No reviews to display yet. Be the first to write one.
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Reviews;
