import { ReviewProfile } from "../../types/reviews";
import { fetch } from "@yext/pages/util";

const reviewsPath =
  "https://cdn.yextapis.com/v2/accounts/me/content/fetchReviewsForEntity";

// TODO: check typing
export const fetchReviewsFromYext = async (
  entityId: string,
  pageToken?: string,
  limit?: number,
  params?: Record<string, string>
): Promise<{
  count: number;
  docs: ReviewProfile[];
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
