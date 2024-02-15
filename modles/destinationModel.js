import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: [50, "Name should not exceed 50 characters."],
            minlength: [15, "Name should be at least 15 characters long."],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: [500, "Description should not exceed 500 characters."],
        },
        location: {
            city: String,
            country: String,
            coordinates: {
                type: [Number],
                index: "2dsphere",
            },
        },
        tags: {
            type: [String],
            required: true,
            validate: [
                (tags) => tags.length >= 3 && tags.length <= 10,
                "Tags must be between 3 and 10 characters long.",
            ],
        },
        image_url: {
            type: String,
            required: true,
        },  
    }
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;