const authenticate = (req, res) => {
    if (req.name === "UnauthorizedError") {
        return res.status(401).send("Invalid authorization token");
    }
    res.json({ message: "This is the POST /test endpoint" });
};

module.exports = { authenticate };
