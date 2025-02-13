import { useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../config/api';

const useImgurUpload = () => {
	const [loading, setLoading] = useState(false);

	const uploadImage = async (imageBase64) => {
		setLoading(true);

		try {
			// Convertir la imagen base64 a un Blob
			const fetchResponse = await fetch(imageBase64);
			const blob = await fetchResponse.blob();

			const formData = new FormData();
			formData.append('imagen', blob, 'image.jpg');

			const response = await fetch(`${API_BASE_URL}${ENDPOINTS.UPLOAD_IMAGE}`, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (data.success) {
				setLoading(false);
				return { success: true, imageLink: data.imgur_url };
			} else {
				throw new Error(data.message || 'Error al subir la imagen a Imgur');
			}
		} catch (error) {
			setLoading(false);
			return { success: false, error: error.message };
		}
	};

	return {
		uploadImage,
		loading,
	};
};

export { useImgurUpload };
