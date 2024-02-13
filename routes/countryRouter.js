import express from 'express';
import Country from '../models/countryModel.js';

const router = express.Router();


router
  .route('/')
  .get(async (req, res) => {
    try {
      const countries = await Country.find();
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router
  .route('/')
  .post(async (req, res) => {
    try {
      const newCountry = new Country(req.body);
      const savedCountry = await newCountry.save();
      res.status(201).json(savedCountry);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });  

export default router;