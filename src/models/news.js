class News {
    static async getNews() {
        const apiKey = process.env.NEWS_API_KEY;

        const query = encodeURIComponent(
            "povos indígenas OR causas indígenas OR terras indígenas",
        );

        const url = `https://newsapi.org/v2/everything?q=${query}&language=pt&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `ERRO HTTP: ${response.status} ${response.statusText}`,
                );
            }

            const data = await response.json();

            if (data.status !== "ok") {
                throw new Error(data.message || "Erro ao buscar notícias");
            }

            return data.articles;
        } catch (error) {
            console.error("Erro na chamada da NewsAPI: ", error);

            return [];
        }
    }
}

module.exports = News;
