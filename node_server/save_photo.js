// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// app.post('/api/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('没有上传文件。');
//   }

//   res.send({
//     message: '文件上传成功。',
//     filename: req.file.filename
//   });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`服务器运行在 http://localhost:${PORT}`);
// });




const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/chunks/' }); // 设置分片存储的目录

// 存储分片信息，实际应用中可能需要使用数据库存储
const fileChunks = {};

app.post('/api/upload', upload.single('chunk'), async (req, res) => {
    try {
        const fileChunk = req.file;
        const { chunkIndex, totalChunks, filename } = req.body;

        console.log(`Received chunk ${chunkIndex} of${totalChunks} for file ${filename}`);

        // 检查分片信息
        if (!fileChunks[filename]) {
            fileChunks[filename] = [];
        }

        // 存储分片文件路径
        fileChunks[filename][chunkIndex] = fileChunk.path;

        // 检查是否所有分片都已上传
        if (Object.keys(fileChunks[filename]).length === parseInt(totalChunks)) {
            const uploadPath = path.join(__dirname, 'uploads', filename);
            const writeStream = fs.createWriteStream(uploadPath);

            // 使用 Promise 来确保分片合并的顺序执行
            let chunksProcessed = 0;
            const processChunks = (index) => {
                return new Promise((resolve, reject) => {
                    if (index >= totalChunks) {
                        return resolve();
                    }
                    const chunkFilePath = fileChunks[filename][index];
                    const readStream = fs.createReadStream(chunkFilePath);
                    readStream.on('end', () => {
                        fs.unlink(chunkFilePath, (err) => {
                            if (err) console.error(err);
                        });
                        chunksProcessed++;
                        resolve();
                    });
                    readStream.on('error', reject);
                    readStream.pipe(writeStream, { end: false });
                });
            };

            // 顺序处理每个分片
            for (let i = 0; i < totalChunks; i++) {
                await processChunks(i);
            }

            if (chunksProcessed === totalChunks) {
                // 所有分片处理完成后，关闭写入流
                writeStream.end();

                writeStream.on('finish', () => {
                    console.log('分片合并完成');
                    res.send({ message: 'File uploaded and merged successfully' });
                });
            }
        } else {
            res.send({ message: 'Chunk uploaded successfully' });
        }
    } catch (error) {
        // 错误处理逻辑
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
