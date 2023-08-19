settings = {
    DbHost: process.env.HOST || "localhoster",
    DbPort: process.env.PORT || "27017",
    DbName: process.env.DB_NAME || "signup"
}

module.exports = settings