const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// For book images
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'campusswap/books',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

// For notes/PDFs
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'campusswap/notes',
      resource_type: 'raw',        // ← critical for PDFs
      format: 'pdf',               // ← force .pdf extension
      public_id: `${Date.now()}-${file.originalname.replace('.pdf', '')}`,
    };
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadPDF = multer({ storage: pdfStorage });

module.exports = { uploadImage, uploadPDF };