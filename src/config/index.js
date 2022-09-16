export const FRONTEND_URL =
  "https://social-media-application-client.vercel.app";

export const BACKEND_SERVER =
  "https://social-media-application-back.herokuapp.com";

export const BACKEND_IMAGES_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `${BACKEND_SERVER}/images/`
    : "http://localhost:5000/images/";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? BACKEND_SERVER
    : "http://localhost:5000";
