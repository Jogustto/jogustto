const News = require("../models/news");

exports.index = async (req, res) => {
    const news = await News.getNews();

    res.render("home", {
        title: "Página Inicial",
        currentRoute: "/",
        news: news,
    });
};
