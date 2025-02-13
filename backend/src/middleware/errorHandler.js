import multer from 'multer';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ success: 0, message: err.message });
    } else {
        res.status(500).json({ success: 0, message: 'Error interno del servidor' });
    }
}; 