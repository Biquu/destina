// Register service
export const register = async (formData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: 'Kayıt işlemi sırasında bir hata oluştu.',
      };
    }
  };