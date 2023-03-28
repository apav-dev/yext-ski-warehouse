import * as React from "react";
import { ReviewProfile } from "../types/reviews";
import { v4 as uuid } from "uuid";
import { Stars } from "./Stars";
import { twMerge } from "tailwind-merge";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { fetchReviewsFromYext } from "../utils/api/fetchReviewsForEntity";
import { useQuery } from "@tanstack/react-query";

type ReviewProps = {
  entityId: string;
  reviewsCount: number;
};

const fetchReviewsForEntity = async (entityId: string) => {
  const response = await fetch("reviews?entityId=" + entityId);
  const data = await response.json();
  return data;
};

export const Reviews = ({ entityId, reviewsCount }: ReviewProps) => {
  const [reviews, setReviews] = useState<ReviewProfile[]>([]);

  const reviewsResponse = useQuery({
    queryKey: ["reviewsForEntity", entityId],
    queryFn: () => fetchReviewsForEntity(entityId),
  });

  useEffect(() => {
    console.log(reviewsResponse);
  }, [reviewsResponse]);

  useEffect(() => {
    fetchReviewsFromYext(entityId)
      .then((reviewResponse) => {
        setReviews(reviewResponse.docs || []);
      })
      .catch((e) => {
        console.error(
          `Failed to fetch reviews for entity ${entityId}. Error: ${e}`
        );
      });
  }, [entityId]);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return reviews.length > 0 ? (
    <div className="col-span-2 mt-16 sm:mt-24">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <h2 className="text-lg font-medium text-gray-900">
              Customer Reviews
            </h2>

            <div className="mt-3 flex items-center">
              <div>
                <div className="flex items-center">
                  <Stars rating={5} />
                </div>
                <p className="sr-only">{5} out of 5 stars</p>
              </div>
              {reviewsCount && (
                <p className="ml-2 text-sm text-gray-900">
                  Based on {reviewsCount} reviews
                </p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Review data</h3>

              <dl className="space-y-3">
                {/* TODO: replace with reviews by score*/}
                {[4, 1, 0, 0, 0]?.map((count, i) => (
                  <div key={uuid()} className="flex items-center text-sm">
                    <dt className="flex flex-1 items-center">
                      <p className="w-3 font-medium text-gray-900">
                        {5 - i}
                        <span className="sr-only"> star reviews</span>
                      </p>
                      <div
                        aria-hidden="true"
                        className="ml-1 flex flex-1 items-center"
                      >
                        <StarIcon
                          className={twMerge(
                            count > 0 ? "text-yellow-400" : "text-gray-300",
                            "h-4 w-4 flex-shrink-0"
                          )}
                          aria-hidden="true"
                          key={uuid()}
                        />

                        <div className="relative ml-3 flex-1">
                          <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                          {count > 0 ? (
                            <div
                              className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                              style={{
                                width: `calc(${count} / ${reviewsCount} * 100%)`,
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </dt>
                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                      {count > 0 ? Math.round((count / reviewsCount) * 100) : 0}
                      %
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* 
          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            <a
              href="#"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Write a review
            </a>
          </div> */}
          </div>

          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 className="sr-only">Recent reviews</h3>
            <div className="flow-root">
              <div className="-my-12 divide-y divide-gray-200">
                {/* <div className="flex justify-end">
                <SortingDropdown<{ key: string; value: string }>
                  customCssClasses={{ menu: "py-12" }}
                  options={reviewSortConfig}
                  onSortChange={handleDropdownChange}
                />
              </div> */}
                {reviews.map((review) => (
                  <div key={uuid()} className="py-12">
                    <div className="flex items-center">
                      <div className="">
                        <div className="flex items-center">
                          <h4 className="text-sm font-bold text-gray-900">
                            {review.authorName}
                          </h4>
                          <p className="pl-4 text-xs font-normal">
                            {formatDate(review.reviewDate)}
                          </p>
                        </div>
                        <div className="mt-1 -ml-1 flex items-center">
                          <Stars aria-hidden="true" rating={review.rating} />
                        </div>
                        <p className="sr-only">
                          {review.rating} out of 5 stars
                        </p>
                      </div>
                    </div>

                    <div
                      className="mt-4 space-y-6 text-base italic text-gray-600"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
