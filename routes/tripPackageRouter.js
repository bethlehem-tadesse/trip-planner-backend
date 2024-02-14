import express from 'express';
import TripPackage from '../models/tripPackageModel.js';

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const tripPackages = await TripPackage.find();
            res.status(200).json(tripPackages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router
    .route('/')
    .post(async (req, res) => {
        try {
            const newTripPackage = new TripPackage(req.body);
            const savedTripPackage = await newTripPackage.save();
            res.status(201).json(savedTripPackage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

export default router;