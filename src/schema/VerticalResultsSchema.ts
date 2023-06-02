import { z } from "zod";

const ThumbnailSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

const ImageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  thumbnails: z.array(ThumbnailSchema),
});

const IconSchema = z.object({
  c_icon: z.object({
    image: ImageSchema,
  }),
  name: z.string(),
});

const KeySchema = z.object({
  locale: z.string(),
  primary_key: z.string(),
});

const SpecSchema = z.object({
  name: z.string(),
  value: z.string(),
});

const PhotoGallerySchema = z.object({
  image: ImageSchema,
});

const DataSchema = z.object({
  id: z.string(),
  type: z.string(),
  $key: KeySchema,
  c_abilityLevel: z.array(IconSchema).optional(),
  c_price: z.string().optional(),
  c_brand: z.string().optional(),
  c_specs: z.array(SpecSchema).optional(),
  c_terrain: z.array(IconSchema).optional(),
  c_turningRadius: z.string().optional(),
  name: z.string(),
  photoGallery: z.array(PhotoGallerySchema),
  slug: z.string(),
  uid: z.string(),
});

const ResultSchema = z.object({
  data: DataSchema,
  highlightedFields: z.record(z.unknown()),
});

export const VerticalResultsSchema = z
  .object({
    response: z.object({
      results: z.array(ResultSchema),
    }),
  })
  .nonstrict();
