const main = async (argumentJson) => {
  const requestURL = argumentJson["requestUrl"];
  const searchParams = new URLSearchParams();
  requestURL
    .split("?")[1]
    .split("&")
    .forEach((pair) => {
      const [key, value] = pair.split("=");
      searchParams.append(key, value);
    });
  const entityId = searchParams.get("entityId");

  if (entityId === null) {
    return {
      statusCode: 400,
      body: "Entity ID is required",
      Headers: {},
    };
  }

  // use Promise.all to fetch reviews for yext for 1, 2, 3, 4, 5 stars
  const reviewsByRating = await Promise.all(
    [5, 4, 3, 2, 1].map((rating) =>
      fetchReviewsFromYext(entityId, undefined, undefined, {
        rating,
      })
    )
  );

  // total reviews for each star rating
  const totalReviewsByRating = reviewsByRating.map((review) => review.count);
  console.log(`totalReviewsByRating: ${totalReviewsByRating}`);

  // sum totalReviewsByRating
  const ratingsSum = [5, 4, 3, 2, 1].reduce((acc, rating, index) => {
    acc += rating * totalReviewsByRating[index];
    return acc;
  }, 0);

  console.log(`ratingsSum: ${ratingsSum}`);

  const totalReviews = reviewsByRating.reduce(
    (acc, review) => acc + review.count,
    0
  );
  console.log(`totalReviews: ${totalReviews}`);

  const averageRating = ratingsSum / totalReviews;
  console.log(`averageReview: ${averageRating}`);

  // return the average review and the reviews for each star rating, the total number of reviews, and the total number of reviews for each star rating
  return {
    statusCode: 200,
    body: JSON.stringify({
      averageRating,
      // reviews,
      totalReviews,
      totalReviewsByRating,
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
