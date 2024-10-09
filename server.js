const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
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
const dataIntensity = new mongoose.Schema({
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

const DataInteSity = mongoose.model('IntensityData', dataIntensity, 'data-intensity');
const DataModel = mongoose.model('Data', dataSchema, 'data-collection')
app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
        console.log(data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/data-intensity', async (req, res) => {
    try {
        const data = await DataInteSity.find();
        res.json(data);
        console.log(data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
