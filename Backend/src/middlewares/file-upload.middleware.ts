import multer from 'multer';

const mimeTypeMap: Record<string, { types: string[]; extensions: string[] }> = {
  'excel-sheet': {
    types: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ],
    extensions: ['xlsx', 'xls', 'csv'],
  },
  document: {
    types: ['application/pdf'],
    extensions: ['pdf'],
  },
  image: {
    types: ['image/png', 'image/jpeg'],
    extensions: ['png', 'jpg', 'jpeg'],
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: (_req, file, cb) => {
    const config = mimeTypeMap[file.fieldname];

    if (!config) {
      return cb(new Error(`Unsupported field: ${file.fieldname}`));
    }

    if (!config.types.includes(file.mimetype)) {
      return cb(
        new Error(
          `Invalid file type. Expected: ${config.extensions.join(', ')}`,
        ),
      );
    }

    cb(null, true);
  },
});

export default upload;
