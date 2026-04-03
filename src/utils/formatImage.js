// src/utils/formatImage.js

export const formatImageUrl = (imgUrl) => {
  if (!imgUrl) return "/no-image.png"; // Ảnh mặc định nếu lỗi

  const BASE_URL = process.env.REACT_APP_BASE_URL || "https://my-backend-gbqg.onrender.com";

  // 1. Chặn đứng localhost: Nếu trong DB vẫn còn lưu link localhost từ lúc dev
  if (imgUrl.includes("localhost:3001")) {
    return imgUrl.replace("http://localhost:3001", BASE_URL);
  }

  // 2. Nếu ảnh đã là link xịn (https://my-backend-gbqg... hoặc link ngoài mạng)
  if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
    return imgUrl;
  }

  // 3. Nếu DB lưu kiểu tương đối bắt đầu bằng "/" (VD: /uploads/anh.png)
  if (imgUrl.startsWith("/")) {
    return `${BASE_URL}${imgUrl}`;
  }

  // 4. Nếu DB lưu kiểu tương đối thiếu "/" (VD: uploads/anh.png)
  return `${BASE_URL}/${imgUrl}`;
};