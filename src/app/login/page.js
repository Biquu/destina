"use client";

import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "@/context";
import { loginFormControls } from "@/utils";
import { imageAssets } from "@/utils";
import { login } from "@/services/login";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import "../styles/main.css";

const initialFormData = {
  email: "",
  password: "", 
};

const LoginPage = () => {
  
  const [formData, setFormData] = useState(initialFormData);
  const {isAuthenticated, setIsAuthenticated, user, setUser} =
    useContext(GlobalContext);

  const router = useRouter();

  console.log(user, isAuthenticated, formData);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleLogin() {
    const response = await login(formData);
    console.log(response,"response");
    if (response.success) {
      console.log("Login successful");
      setIsAuthenticated(true);
      setUser(response?.finalData?.user);
      Cookies.set("token", response?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(response.finalData.user));
      router.push("/home");
    }else {
      console.log("Login failed");
      setIsAuthenticated(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData);
    console.log(response);
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  useEffect(() => { 
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="main-page">
      <div className="header">
        <div className="logo-container">
          <Image src={imageAssets.Logo} alt="Logo" />
        </div>
        <div className="flag-container">
          <div className="turkiye-text">Türkiye</div>
          <Image src={imageAssets.Flag} alt="Flag" />
        </div>
      </div>
      <div className="flex flex-col justify-center min-h-[90vh]">
        <div className="centered-container">
          <div className="mascot-container">
            <Image src={imageAssets.Bear3} alt="Bear" className="bear" />
          </div>
          <div className="form-container w-[350px]">
            <h1 class="flex justify-center text-dark-blue text-xl font-normal mb-2">
              Oturum Aç
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {loginFormControls.map((control) => (
                <div key={control.id}>
                  <div className="w-full relative  content-center">
                    {control.id === "password" && (
                      <span className="absolute w-7 content-center text-blue/50 text-sm mt-1 right-0 mr-[45px]">
                        Parolamı Unuttum
                      </span>
                    )}
                    <input
                      type={control.type}
                      name={control.id}
                      value={formData[control.id]}
                      onChange={handleChange}
                      placeholder={control.placeholder}
                      required
                      className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
                    />
                  </div>
                </div>
              ))}
              <button type="submit" className="w-full" onClick={handleLogin} disabled={!isValidForm}>
                GİRİŞ YAP
              </button>
            </form>
            <div className="flex text-center mt-4">
              <hr className="w-full mt-3 border-blue" />
              <span className="ml-3 mr-3 text-blue">VEYA</span>
              <hr className="w-full mt-3 border-blue" />
            </div>
            <button
              className="mt-4  w-full"
              type="button"
              onClick={handleRegisterClick}
            >
              HESAP OLUŞTUR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;