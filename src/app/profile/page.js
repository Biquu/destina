'use client';


import React from 'react';
import '../../styles/profile.css';

const ProfilePage = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profil</h1>
            </div>
            <div className="profile-content">
                <div className="profile-left">
                    <div className=" relative">
                        <img  src="/images/profilepic.png" alt="Profile"/>
                        <img className="w-10 absolute right-0 -50" src="/images/edit.png" alt="Edit" /> {/* Edit ikonu */}

                    </div>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <img src="/images/compliment.png" alt="Thumbs Up" />
                            <span>85</span>
                        </div>
                        <div className="stat-item">
                            <img src="/images/elo.png" alt="Star" />
                            <span>91%</span>
                        </div>
                        <div className="stat-item">
                            <img src="/images/wins.png" alt="Trophy" />
                            <span>52</span>
                        </div>
                    </div>
                    <p className="profile-description">
                        Bu bölümde, diğer kullanıcılar tarafından aldığınız övgüleri, başarılı oyun oranınızı ve toplam kazandığınız oyun sayısını görebilirsiniz.
                    </p>
                </div>
                <div className="profile-right">
                    <h2>Kişisel Bilgiler</h2>
                    <div className="detail-item">
                        <label>Rumuz:</label>
                        <input type="text" defaultValue="Joe" />
                    </div>
                    <div className="detail-item">
                        <label>E-Posta:</label>
                        <input type="email" defaultValue="joe2002@gmail.com" />
                    </div>
                    <div className="detail-item">
                        <label>Yaş:</label>
                        <input type="number" defaultValue="22" />
                    </div>
                    <div className="detail-item">
                        <label>Cinsiyet:</label>
                        <input type="text" defaultValue="Erkek" />
                    </div>
                    <div className="profile-actions">
                        <button className="btn cancel">İPTAL</button>
                        <button className="btn save">KAYDET</button>
                    </div>
                    <p className="hello-world">Profil bilgilerinizi kaydederek, bilgilerinizin güncelleneceğini ve Destina'nın Gizlilik Politikası ve Kullanım Koşulları çerçevesinde işleneceğini kabul etmiş olursunuz.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
