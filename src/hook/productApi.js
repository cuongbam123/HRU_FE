import axios from 'axios';

const API_URL = 'https://my-backend-gbqg.onrender.com/api/products';

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
        return null;
    }
};
