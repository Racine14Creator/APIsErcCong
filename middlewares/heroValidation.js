import Joi from "joi";

const validateHeroId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().alphanum().length(24).required(),
    });

    const { error } = schema.validate({ id: req.params.id });
    if (error) {
        return res.status(400).json({ error: "Invalid Hero ID" });
    }

    next();
};

export { validateHeroId };
