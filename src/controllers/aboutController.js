exports.about = (req, res) => {
    res.render("about", {
        title: "Sobre nós",
        currentRoute: "/about",
    });
};
