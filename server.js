import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import path from "path"

import express from "express";
import mongoose from "mongoose";

import heroRoutes from "./routers/Hero.routes.js";
import { check, validationResult } from "express-validator"

import multer from 'multer';
import cloudinary from 'cloudinary';
import Hero from "./models/models.js";

const app = express();
const PORT = process.env.PORT || 4500;
const MONGO = process.env.MONGO;

app.use(express.json());
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        console.log(file);
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage: storage
});


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'duetomqjz',
    api_key: process.env.CLOUDINARY_API_KEY || "678377753892168",
    api_secret: process.env.CLOUDINARY_API_SECRET || "9YOIvJmJPV23Ji17dCM3on1-RUI",
});

// Use your routes here
app.use("/heroes", heroRoutes);

app.post("/heroes", [
    check('name', "Name is required")
        .isLength({ min: 3, max: 20 }, "Name must have at least 3 characteres up 20..."),
    check("title", "Title is require")
        .isLength({ min: 5, max: 35 }, "Title must have 5 characteres up 35")
], upload.single('image'), (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.json(errors)
    } else {
        const { name, title, paragraph } = req.body
        const image = req.file.filename
        const newHero = new Hero({
            name, title, paragraph, image
        })
        newHero.save()
            .then(doc => res.json(doc))
            .catch(error => console.log(error))
    }
})

const Server = async () => {
    try {
        await mongoose.connect(MONGO);
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server run on PORT http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

Server();
