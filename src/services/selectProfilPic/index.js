//select profil picture service
export const selectProfilPic = async ({imageIndex,email}) => {
    try {
        const response = await fetch("/api/selectProfilPic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageIndex, email }),
        });

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('SelectProfilPic error:', error);
        return {
            success: false,
            message: 'Profil resmi seçme işlemi sırasında bir hata oluştu.',
        };
    }
};