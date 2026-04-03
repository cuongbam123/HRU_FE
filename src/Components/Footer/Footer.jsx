import React from 'react';
import './Footer.css';
import facebook_icon from '../Assets/facebook_icon.png';
import youtube_icon from '../Assets/youtube_icon.png';
import zalo_icon from '../Assets/zalo_icon.png';
import tiktok_icon from '../Assets/tiktok_icon.png';
import logo from '../Assets/queen_logo.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">

        {/* Cột 1: Thông tin */}
        <div className="footer-col">
          <h3>💄 HRU COSMETICS</h3>
          <p>Chuyên cung cấp mỹ phẩm chính hãng, an toàn và hiệu quả cho làn da của bạn.</p>
          <p><strong>Địa chỉ:</strong> 123 Nguyễn Văn Linh, TP. Hồ Chí Minh</p>
          <p><strong>SĐT:</strong> 0902 451 215</p>
          <p><strong>Email:</strong> lienhe@hrucosmetics.com</p>
          <p><strong>Website:</strong> hrucosmetics.com</p>
        </div>

        {/* Cột 2: Hỗ trợ khách hàng */}
        <div className="footer-col">
          <h4>HỖ TRỢ KHÁCH HÀNG</h4>
          <ul>
            <li>Chính sách giao hàng</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo mật</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Câu hỏi thường gặp</li>
          </ul>
        </div>

        {/* Cột 3: Ưu đãi & tin tức */}
        <div className="footer-col">
          <h4>ƯU ĐÃI & TIN TỨC</h4>
          <ul>
            <li>Giảm giá 10% cho đơn đầu tiên</li>
            <li>Miễn phí vận chuyển nội thành</li>
            <li>Bí quyết chăm sóc da</li>
            <li>Tư vấn chọn mỹ phẩm phù hợp</li>
          </ul>
        </div>

        {/* Cột 4: Mạng xã hội */}
        <div className="footer-col">
          <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
          <div className="footer-social">
            <img src={facebook_icon} alt="Facebook" />
            <img src={youtube_icon} alt="YouTube" />
            <img src={zalo_icon} alt="Zalo" />
            <img src={tiktok_icon} alt="TikTok" />
          </div>
        </div>
      </div>

      <hr />
      <p className="footer-bottom">
        © 2025 HRU COSMETICS - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
