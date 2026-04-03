export const formatImageUrl = (imgUrl) => {
  if (!imgUrl) return "/no-image.png";

  const BASE_URL = process.env.REACT_APP_BASE_URL || "https://my-backend-gbqg.onrender.com";

  let finalUrl = imgUrl;

  // 1. Quét sạch mọi loại localhost bằng Regex siêu mạnh
  if (finalUrl.includes("localhost")) {
    finalUrl = finalUrl.replace(/http:\/\/(localhost|127\.0\.0\.1):\d+/gi, BASE_URL);
  } 
  // 2. Nếu link là đường dẫn tương đối
  else if (finalUrl.startsWith("/")) {
    finalUrl = `${BASE_URL}${finalUrl}`;
  } 
  else if (!finalUrl.startsWith("http")) {
    finalUrl = `${BASE_URL}/${finalUrl}`;
  }

  // 3. Fix lỗi chí mạng: Mã hóa các khoảng trắng trong tên ảnh
  // Biến "Screenshot 2025..." thành "Screenshot%202025..."
  return encodeURI(finalUrl);
};