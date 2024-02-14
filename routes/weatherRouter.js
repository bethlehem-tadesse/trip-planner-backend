import express from 'express';
import axios from 'axios';
import process from 'process';
import 'dotenv/config';
import TripPackage from '../models/tripPackageModel.js';

const router = express.Router();

// Endpoint to get weather forecast for a package
router
.post('/', async (req, res) => {
  const { packageId, startDate, endDate } = req.body;

  if (!packageId || !startDate || !endDate) {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }

  try {
    // Fetch the package by ID
    const packageData = await TripPackage.findById(packageId).populate('destinations');
    if (!packageData) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const { destinations } = packageData;

    const weatherPromises = destinations.map(async (destination) => {
      const { city, country } = destination.location;
      const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: process.env.WEATHER_API, 
          q: `${city},${country}`,
          days: (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1,
        },
      });
      return { city, country, weather: response.data };
    });

    const weatherData = await Promise.all(weatherPromises);
    res.json({ weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch package data' });
  }
});

export default router;
