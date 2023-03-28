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

// create an interface called ReviewAggResponse based on the following JSON
// {
//     "meta": {
//         "uuid": "0187298f-180b-962d-c8be-96cc081f2f23",
//         "errors": []
//     },
//     "response": {
//         "docs": [
//             {
//                 "$key": {
//                     "locale": "",
//                     "primary_key": "82280395-FIRSTPARTY"
//                 },
//                 "averageRating": 4.8,
//                 "entity": {
//                     "id": "nordica_enforcer_100_skis_2023"
//                 },
//                 "reviewCount": 5
//             }
//         ],
//         "count": 1
//     }
// }

export interface ReviewAggResponse {
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
    docs: {
      $key: {
        locale: string;
        primary_key: string;
      };
      averageRating: number;
      entity: {
        id: string;
      };
      reviewCount: number;
    }[];
  };
}
