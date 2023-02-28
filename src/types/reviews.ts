export interface ReviewProfile {
  authorName: string;
  content: string;
  entity: {
    id: string;
  };
  rating: number;
  reviewDate: string;
}

export type ReviewStreamsResponse = {
  meta: {
    uuid: string;
    errors: {
      code: number;
      type: string;
      message: string;
    }[];
  };
  response: {
    count: number;
    docs: ReviewProfile[];
  };
};
