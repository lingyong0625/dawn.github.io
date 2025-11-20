const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

const dataFilePath = path.join(__dirname, 'data.json');
const referenceFilePath = path.join(__dirname, 'reference.json');
const chartFilePath = path.join(__dirname, 'chart.json');

// 初始化 data.json
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), 'utf8');
    console.log('✅ 已创建 data.json 文件');
}
// 初始化 reference.json
if (!fs.existsSync(referenceFilePath)) {
    fs.writeFileSync(referenceFilePath, JSON.stringify({}, null, 2), 'utf8');
    console.log('✅ 已创建 reference.json 文件');
}

app.post('/api/saveData', (req, res) => {
    try {
        const records = req.body;

        // 直接保存到 data.json
        fs.writeFileSync(dataFilePath, JSON.stringify(records, null, 2), 'utf8');

        console.log(`✅ 数据已保存到 data.json (共 ${records.length} 条记录)`);
        res.json({
            success: true,
            message: `数据已保存到 data.json (共 ${records.length} 条记录)`,
        });
    } catch (error) {
        console.error('❌ 保存错误:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/loadData', (req, res) => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('加载错误:', error);
        res.json([]);
    }
});

app.post('/api/saveReferenceData', (req, res) => {
    try {
        const records = req.body;

        // 直接保存到 reference.json
        fs.writeFileSync(referenceFilePath, JSON.stringify(records, null, 2), 'utf8');

        console.log(`✅ 数据已保存到 reference.json`);
        res.json({
            success: true,
            message: `数据已保存到 reference.json`,
        });
    } catch (error) {
        console.error('❌ 保存错误:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/saveChartData', (req, res) => {
    try {
        const records = req.body;

        // 直接保存到 chart.json
        fs.writeFileSync(chartFilePath, JSON.stringify(records, null, 2), 'utf8');

        console.log(`✅ 数据已保存到 chart.json`);
        res.json({
            success: true,
            message: `数据已保存到 chart.json`,
        });
    } catch (error) {
        console.error('❌ 保存错误:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/getChartData', (req, res) => {
    try {
        const data = fs.readFileSync(chartFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('加载错误:', error);
        res.json({});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📁 数据保存位置: ${dataFilePath}`);
});
