import { ComplexImage } from "../types/skis";

export type FeaturedCollection = {
  name?: string;
  slug?: string;
  c_coverPhoto?: ComplexImage;
};

export type DirectoryChild = {
  name?: string;
  slug?: string;
  c_featuredCollections?: {
    name?: string;
    slug?: string;
    c_coverPhoto?: ComplexImage;
  }[];
  dm_directoryChildren?: DirectoryChild[];
};

export type Site = {
  c_primaryLogo?: ComplexImage;
  dm_directoryChildren: DirectoryChild[];
};

export type SkiWarehouseDirectory = {
  logo?: ComplexImage;
  genders?: {
    name?: string;
    slug?: string;
    featuredCollections?: FeaturedCollection[];
    productTypes?: {
      name?: string;
      slug?: string;
      categories?: {
        name?: string;
        slug?: string;
      }[];
    }[];
  }[];
};

export function transformSiteData(site: Site): SkiWarehouseDirectory {
  const genders: SkiWarehouseDirectory["genders"] = [];

  site.dm_directoryChildren.forEach((gender) => {
    const genderObj: {
      name?: string;
      slug?: string;
      featuredCollections?: FeaturedCollection[];
      productTypes?: {
        name?: string;
        slug?: string;
        categories?: {
          name?: string;
          slug?: string;
        }[];
      }[];
    } = {};

    if (gender.name && gender.slug) {
      genderObj.name = gender.name;
      genderObj.slug = gender.slug;
    }

    if (gender.c_featuredCollections) {
      genderObj.featuredCollections = gender.c_featuredCollections;
    }

    if (gender.dm_directoryChildren) {
      const productTypes: {
        name?: string;
        slug?: string;
        categories?: {
          name?: string;
          slug?: string;
        }[];
      }[] = [];

      gender.dm_directoryChildren.forEach((productType) => {
        const productTypeObj: {
          name?: string;
          slug?: string;
          categories?: {
            name?: string;
            slug?: string;
          }[];
        } = {};

        if (productType.name && productType.slug) {
          productTypeObj.name = productType.name;
          productTypeObj.slug = productType.slug;
        }

        if (productType.dm_directoryChildren) {
          const categories: {
            name?: string;
            slug?: string;
          }[] = [];

          productType.dm_directoryChildren.forEach((category) => {
            if (category.name && category.slug) {
              categories.push({
                name: category.name,
                slug: category.slug,
              });
            }
          });

          productTypeObj.categories = categories;
        }

        productTypes.push(productTypeObj);
      });

      genderObj.productTypes = productTypes;
    }

    genders.push(genderObj);
  });

  return { genders, logo: site.c_primaryLogo };
}
