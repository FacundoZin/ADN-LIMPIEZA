export interface Category {
  _id: string;
  _type: "category";
  name: string;
}

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  shortDescription?: string;
  description: string;
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  category?: {
    _ref: string;
    _type: "reference";
  };
}

export interface CarouselImage {
  _id: string;
  _type: "carouselImage";
  title?: string;
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  showInHome?: boolean;
  showInAbout?: boolean;
}
