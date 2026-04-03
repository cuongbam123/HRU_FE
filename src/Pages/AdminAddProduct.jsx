import React, { useState } from 'react';
import axios from 'axios';

const AdminAddProduct = () => {
    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [describe, setDescribe] = useState('');
    const [number, setNumber] = useState('');
    const [idCategory, setIdCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            alert('Vui lòng chọn ảnh sản phẩm!');
            return;
        }

        const formData = new FormData();
        formData.append('name_product', nameProduct);
        formData.append('price_product', priceProduct);
        formData.append('describe', describe);
        formData.append('number', number);
        formData.append('id_category', idCategory);
        formData.append('image', selectedImage);

        try {
            const response = await axios.post('http://localhost:3001/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Sản phẩm đã được thêm:', response.data);
            alert('Thêm sản phẩm thành công!');

            // Reset form
            setNameProduct('');
            setPriceProduct('');
            setDescribe('');
            setNumber('');
            setIdCategory('');
            setSelectedImage(null);
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            alert('Thêm sản phẩm thất bại!');
        }
    };

    return (
        <div className="admin-add-product">
            <h2>Thêm sản phẩm mới</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên sản phẩm:</label>
                    <input type="text" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} required />
                </div>
                <div>
                    <label>Giá sản phẩm:</label>
                    <input type="number" value={priceProduct} onChange={(e) => setPriceProduct(e.target.value)} required />
                </div>
                <div>
                    <label>Mô tả:</label>
                    <input type="text" value={describe} onChange={(e) => setDescribe(e.target.value)} required />
                </div>
                <div>
                    <label>Số lượng:</label>
                    <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
                </div>
                <div>
                    <label>Loại sản phẩm (id_category):</label>
                    <input type="text" value={idCategory} onChange={(e) => setIdCategory(e.target.value)} required />
                </div>
                <div>
                    <label>Ảnh sản phẩm:</label>
                    <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} required />
                </div>
                <button type="submit">Thêm sản phẩm</button>
            </form>
        </div>
    );
};

export default AdminAddProduct;
