import mongoose from "mongoose";
import Destination from "./destinationModel.js";
import Country from "./countryModel.js";

const tripPackageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: [50, "Name should not exceed 50 characters."],
            minlength: [15, "Name should be at least 3 characters long."]
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: [500, "Description should not exceed 500 characters."],
        },
        destinations: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: Destination,
            required: true,
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Country,
        },
        duration: {
            type: Number,
            required: [true, "Duration is required."],
            min: 1,
            max: 365, // Assuming a year has 365 days
        },
        price: {
            type: Number,
            required: [true, "Price is required."],
        }
    }
);

tripPackageSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'destinations',
        select: '-__v'
    }).populate({
        path: 'country',
        select: '-__v'
    });
    next();
});

const TripPackage = mongoose.model("TripPackage", tripPackageSchema);

export default TripPackage;