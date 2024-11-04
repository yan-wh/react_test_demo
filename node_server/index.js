const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer'); // 引入 multer 模块，用于处理 multipart/form-data 类型的表单数据，通常用于文件上传
const mysql = require('mysql');

const app = express();
const upload = multer({ dest: 'uploads/' }); // 创建 multer 实例，设置文件上传的临时存储目录为 'uploads/'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yh123456',
  database: 'file_upload'
});

// ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

connection.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/upload', upload.single('file'), (req, res) => { // 设置处理 POST 请求的路由，使用 upload.single() 中间件处理文件上传，'file' 是表单中文件的字段名
  const { filename, chunkIndex, totalChunks } = req.body;
  const chunk = req.file.buffer;

  const query = 'INSERT INTO file_chunks (filename, chunk_index, chunk_data) VALUES (?, ?, ?)';
  connection.query(query, [filename, chunkIndex, chunk], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (chunkIndex + 1 === parseInt(totalChunks)) {
      // 所有分片上传完成，可以进行文件合并操作
      // 这里简化处理，实际应用中需要根据业务需求进行文件合并
      res.send('文件上传完成');
    } else {
      res.send('分片上传成功');
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
