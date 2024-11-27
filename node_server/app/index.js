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

// 设置静态文件服务器，传递一个路径给 express.static 时，它将使得该路径下的文件可以通过 HTTP 服务器直接访问
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

// 设置文件存储路径
const staticDir = path.join(__dirname, '../uploads');

const delImg = (filename) => {
    console.log('删除的文件名：', filename)
    const filePath = path.join(staticDir, filename);

    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    })
}

// 提供删除操作
app.delete('/api/deleteImage/:filename', async(req, res) => {
    const filename = req.params.filename;
    const sign = await delImg(filename);
    if (!sign) {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
    } else {
        res.send({
            status: true,
            message: '文件删除成功。',
            filename: filename
        });
    }
})

// 提供一个API来列出所有图片
app.get('/api/getImagesNames', (req, res) => {
    fs.readdir(staticDir, (err, files) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }
  
      // 过滤出图片文件
      const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
  
      // 返回图片文件列表
      res.json(images);
    });
});

const upload = multer({ dest: '../uploads/chunks/' }); // 设置分片存储的目录

// 存储分片信息，实际应用中可能需要使用数据库存储
const fileChunks = {};


// 删除特定目录下的所有文件
const delDir = (directory) => {
    // 读取文件夹内容
    try {
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }
    
            // 遍历文件列表
            files.forEach((file) => {
                // 构建完整的文件路径
                const filePath = path.join(directory, file);
    
                // 检查文件是否是一个目录
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error('Error stating file:', err);
                        return;
                    }
    
                    // 如果是文件，则删除
                    if (stats.isFile()) {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            } else {
                                console.log(`Deleted file: ${filePath}`);
                            }
                        });
                    }
                });
            });
        });
    } catch (error) {
        console.error('删除文件夹中的文件时出错:', error);
    }
}

app.post('/api/upload', upload.single('chunk'), async (req, res) => {
    const fileChunk = req.file;
    const { chunkIndex, totalChunks, filename } = req.body;
    try {
        // console.log('fileChunk', fileChunk)
        // console.log('req.body', req.body)

        console.log(`Received chunk ${chunkIndex} of${totalChunks} for file ${filename}`);

        // 检查分片信息
        if (!fileChunks[filename]) {
            fileChunks[filename] = [];
        }

        // 存储分片文件路径
        fileChunks[filename][chunkIndex] = fileChunk.path;

        // 检查是否所有分片都已上传
        if (Object.keys(fileChunks[filename]).length === parseInt(totalChunks)) {
            const uploadPath = path.join(__dirname, '../uploads', filename);
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

            // console.log('chunksProcessed', chunksProcessed)
            // console.log('totalChunks', totalChunks)
            if (chunksProcessed == totalChunks) {
                // 所有分片处理完成后，关闭写入流
                writeStream.end();

                writeStream.on('finish', () => {
                    console.log('分片合并完成');
                    res.send({ message: 'File uploaded and merged successfully' });
                });
                // 删除掉chunks文件夹内多余的分片数据
                // delDir(path.join(__dirname, `../uploads/chunks`));
            }
        } else {
            res.send({ message: 'Chunk uploaded successfully' });
        }
    } catch (error) {
        // 错误处理逻辑
        console.error(error);
        // await delImg(filename); // 若合并分片或文件存在问题，删除已上传的分片或文件
        res.status(500).send({ message: `${error}` });
    }
});

const PORT = 3000; // 需和镜像暴露出的端口保持一致
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
