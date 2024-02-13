import express from 'express';
import Destination from '../models/destinationModel.js';

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const destinations = await Destination.find();
            res.status(200).json(destinations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router
    .route('/')
    .post(async (req, res) => {
        try {
            const newDestination = new Destination(req.body);
            const savedDestination = await newDestination.save();
            res.status(201).json(savedDestination);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

export default router;