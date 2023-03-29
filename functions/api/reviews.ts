const main = async (argumentJson) => {
  const requestURL = argumentJson["requestUrl"];
  const params = new URLSearchParams(requestURL.split("?")[1]);
  const entityId = params.get("entityId");

  if (entityId === null) {
    return {
      statusCode: 400,
      body: "Entity ID is required",
    };
  }

  // fetch reviews for yext
  const reviews = await fetchReviewsFromYext(entityId);

  // use Promise.all to fetch reviews for yext for 1, 2, 3, 4, 5 stars
  const reviewsByRating = await Promise.all(
    [5, 4, 3, 2, 1].map((rating) =>
      fetchReviewsFromYext(entityId, undefined, undefined, {
        rating,
      })
    )
  );

  const ratingsSum = reviewsByRating.reduce(
    (acc, review) => acc + review.count * review.docs[0].rating,
    0
  );

  const totalReviews = reviewsByRating.reduce(
    (acc, review) => acc + review.count,
    0
  );

  // return the average review and the reviews for each star rating, the total number of reviews, and the total number of reviews for each star rating
  return {
    statusCode: 200,
    body: JSON.stringify({
      averageReview: ratingsSum / totalReviews,
      reviews,
      totalReviews,
      totalReviewsByRating: reviewsByRating.map((review) => review.count),
    }),
    Headers: {},
  };
};

const reviewsPath =
  "https://cdn.yextapis.com/v2/accounts/me/content/fetchReviewsForEntity";
const fetchReviewsFromYext = async (
  entityId: string,
  pageToken?: string,
  limit?: number,
  params?: Record<string, string | number>
): Promise<{
  count: number;
  docs: ReviewProfile[];
  nextPageToken?: string;
}> => {
  let requestString = `${reviewsPath}?api_key=1316c9fafd65fd4518e69100166461a7&v=20221114&entity.id=${entityId}`;
  if (pageToken) {
    requestString += `&pageToken=${pageToken}`;
  }
  if (limit) {
    requestString += `&limit=${limit}`;
  }
  if (params) {
    Object.keys(params).forEach((key) => {
      requestString += `&${key}=${params[key]}`;
    });
  }

  try {
    const resp = await fetch(requestString);
    const reviewsResponse = await resp.json();
    return reviewsResponse.response;
  } catch (e) {
    return Promise.reject(e);
  }
};

interface ReviewProfile {
  authorName: string;
  content: string;
  entity: {
    id: string;
  };
  rating: number;
  reviewDate: string;
}

export default main;
