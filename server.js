const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: ['http://localhost:5173', 'https://data-visualziation-dashboard.netlify.app'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const dataSchema = new mongoose.Schema({
    intensity: Number,
    likelihood: Number,
    relevance: Number,
    year: Number,
    country: String,
    topics: String,
    region: String,
    city: String,
});

const dataIntensitySchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    intensity: {
        type: [Number],
        default: []
    },
    likelihood: {
        type: [Number],
        default: []
    }
});


const DataModel = mongoose.model('Data', dataSchema, 'data-collection');
const DataIntensityModel = mongoose.model('IntensityData', dataIntensitySchema, 'data-intensity');


app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
});

app.get('/api/data-intensity', async (req, res) => {
    try {
        const dataIntensity = await DataIntensityModel.find();
        res.json(dataIntensity);
    } catch (error) {
        console.error('Error fetching data intensity:', error.message);
        res.status(500).json({ message: 'Failed to fetch data intensity', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
