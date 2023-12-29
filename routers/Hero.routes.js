import express from "express";
import {
    getHeroes,
    getHeroById,
    updateHero,
    deleteHero,
} from "../controllers/Hero/Hero.controller.js";
import { validateHeroId } from "../middlewares/heroValidation.js";

const router = express.Router();

router.route("/").get(getHeroes);

router.route("/:id").get(validateHeroId, getHeroById).put(validateHeroId, updateHero).delete(validateHeroId, deleteHero);


export default router;
