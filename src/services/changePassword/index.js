//change password service
export async function changePassword({ password, new_password, confirm_new_password, email }) {
    try {
        const response = await fetch('/api/changePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, new_password, confirm_new_password, email }),
        });

        return await response.json();
    } catch (error) {
        console.error('Şifre güncelleme hatası:', error);
        return {
            success: false,
            message: 'Güncelleme işlemi sırasında bir hata oluştu.',
        };
    }
}
