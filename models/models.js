import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    paragraph: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
