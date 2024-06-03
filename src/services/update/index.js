//username,email,old_email,age
export const update = async (updateData) => {
    try {
        const response = await fetch("/api/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Güncelleme hatası:', error);
        return {
            success: false,
            message: 'Güncelleme işlemi sırasında bir hata oluştu.',
        };
    }
}