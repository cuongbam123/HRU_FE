// src/utils/formatImage.js

export const formatImageUrl = (imgUrl) => {
  if (!imgUrl) return "/no-image.png";

  const BASE_URL = process.env.REACT_APP_BASE_URL || "https://my-backend-gbqg.onrender.com";

  // 🔥 Dùng Regex để chém đẹp mọi link localhost (http hay https, port nào cũng dọn hết)
  if (imgUrl.includes("localhost")) {
    return imgUrl.replace(/^https?:\/\/localhost:\d+/, BASE_URL);
  }

  // Nếu link đã chuẩn (http/https)
  if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
    return imgUrl;
  }

  // Nếu link lưu kiểu tương đối có dấu / ở đầu
  if (imgUrl.startsWith("/")) {
    return `${BASE_URL}${imgUrl}`;
  }

  // Nếu link lưu kiểu tương đối thiếu dấu /
  return `${BASE_URL}/${imgUrl}`;
};