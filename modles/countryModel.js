import mongoose from "mongoose";


const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: [50, "Name should not exceed 50 characters."],
            minlength: [2, "Name should be at least 2 characters long."],
        },
        capital: {
            type: String,
            required: true,
        },
        continent: {
            type: String,
            required: true,
            enum: {
                values: ["Africa", "Antarctica", "Asia", "Europe", "North America", "South America", "Australia"],
                message: "Continent should be one of the following: Africa, Antarctica, Asia, Europe, North America, South America, Australia."
            }
        },
        currency: {
            type: String,
            required: true,
        },
        languages: {
            type: [String],
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
    }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;