export interface ImagePosition {
  x: number;
  y: number;
}

export interface SingleImage {
  url: string;
  type: "profile" | "cover" | "post";
  owner: string;
}

export interface ImagesData {
  paths: string[];
  sort: "asc" | "desc";
}
