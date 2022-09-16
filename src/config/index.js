export const BACKEND_IMAGES_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.BACKEND_SERVER}/images/`
    : "http://localhost:5000/images/";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.BACKEND_SERVER;
