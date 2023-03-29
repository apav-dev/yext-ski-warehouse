import * as React from "react";
import { v4 as uuid } from "uuid";
import { Stars } from "../Stars";
import { twMerge } from "tailwind-merge";
import { StarIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@yext/pages/util";
import ReviewSubmissionForm from "./ReviewSubmissionForm";
import { useState } from "react";
import { ComplexImageType } from "@yext/pages/components";
import { Pagination } from "@yext/search-ui-react";
import ReviewSortDropdown from "./ReviewSortDropdown";

type ReviewProps = {
  entityId: string;
  entityName?: string;
  entityImage?: ComplexImageType;
};

type EntityReviewAggregate = {
  averageRating: number;
  reviews: {
    count: number;
    docs: {
      $key: {
        locale: string;
        primaryKey: string;
      };
      authorName: string;
      content: string;
      rating: number;
      reviewDate: string;
      entity: {
        id: string;
      };
    }[];
  };
  totalReviews: number;
  totalReviewsByRating: number[];
};

export type ReviewSort =
  | "reviewDateDesc"
  | "reviewDateAsc"
  | "ratingDesc"
  | "ratingAsc";

const fetchReviewsForEntity = async (
  entityId: string,
  sort?: ReviewSort
): Promise<EntityReviewAggregate> => {
  let requestUrl = "/reviews?entityId=" + entityId;
  if (sort) {
    requestUrl += "&sort=" + sort;
  }
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
};

export const Reviews = ({ entityId, entityName, entityImage }: ReviewProps) => {
  const [showReviewSubmissionForm, setShowReviewSubmissionForm] =
    useState(false);
  const [sort, setSort] = useState<ReviewSort>("reviewDateDesc");

  const reviewsResponse = useQuery({
    queryKey: ["reviewsForEntity", entityId, sort],
    queryFn: () => fetchReviewsForEntity(entityId, sort),
    retry: 0,
  });

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
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
                  <Stars rating={reviewsResponse.data?.averageRating || 0} />
                </div>
                <p className="sr-only">{5} out of 5 stars</p>
              </div>
              {reviewsResponse.data?.totalReviews && (
                <p className="ml-2 text-sm text-gray-900">
                  Based on {reviewsResponse.data?.totalReviews || 0} reviews
                </p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Review data</h3>

              <dl className="space-y-3">
                {(
                  reviewsResponse.data?.totalReviewsByRating || [0, 0, 0, 0, 0]
                ).map((count, i) => (
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
                                width: `calc(${count} / ${reviewsResponse.data?.totalReviews} * 100%)`,
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </dt>
                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                      {count > 0
                        ? Math.round(
                            (count / reviewsResponse.data?.totalReviews) * 100
                          )
                        : 0}
                      %
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">
                Share your thoughts
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                If you’ve used this product, share your thoughts with other
                customers
              </p>

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                onClick={() => setShowReviewSubmissionForm(true)}
              >
                Write a review
              </button>
            </div>
            <ReviewSubmissionForm
              entityId={entityId}
              open={showReviewSubmissionForm}
              setOpen={setShowReviewSubmissionForm}
              entityName={entityName}
              entityImage={entityImage}
            />
          </div>

          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            {(reviewsResponse.data?.totalReviews || 0) > 0 ? (
              <>
                <h3 className="sr-only">Recent reviews</h3>
                <div className="flow-root">
                  <div className="my-12 divide-y divide-gray-200">
                    <div className="flex justify-end">
                      <ReviewSortDropdown
                        selectedSort={sort}
                        setSelectedSort={(s) => setSort(s)}
                      />
                    </div>
                    {reviewsResponse.data?.reviews.docs.map((review) => (
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
                              <Stars
                                aria-hidden="true"
                                rating={review.rating}
                              />
                            </div>
                            <p className="sr-only">
                              {review.rating} out of 5 stars
                            </p>
                          </div>
                        </div>

                        <div
                          className="mt-4 space-y-6 text-base italic text-gray-600"
                          // TODO: remove dangerouslySetInnerHTML
                          dangerouslySetInnerHTML={{ __html: review.content }}
                        />
                      </div>
                    ))}
                    <Pagination />
                  </div>
                </div>
              </>
            ) : (
              // <div className="pt-16">
              <p className="text-center w-full text-lg font-medium pt-16">
                Be the first to review this product!
              </p>
              // </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
