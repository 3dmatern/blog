const articles = [
    {
        _id: "1",
        title: "Очки спасли карьеру знаменитого футболиста, а затем круто изменили его жизнь. И это не кликбейт, а настоящая история",
        shortTitle: "Очки спасли карьеру знаменитого футболиста",
        shortContent:
            "Все, кто давно смотрит футбол и застал времена выступления Эдгара Давидса за «Аякс» или «Ювентус», наверняка помнят, каким классным опорником он был в свое время.",
        content:
            "Как все начиналось? Будущая звезда сборной Нидерландов и европейского футбола появилась на свет в Суринаме. Позже родители Эдгара решили перебраться в Европу и смогли устроиться в Амстердаме. В нидерландской столице Давидс и стал постигать азы футбола. Родители Эдгара были постоянно в делах, нужно было трудиться, вырывать свое место под европейским солнцем. А мальчик как мог занимал себя самостоятельно. Сначала гонял мяч на улице, а потом попал в молодежную команду «Аякса». И пусть Эдгар на фоне своих ровесников был более щуплым, желания показать, на что способен, у него было выше крыши. Давидса не сбивал с пути даже тот нюанс, что несколько тренеров молодежки «Аякса» хотели выставить его за дверь. Парень продолжал упорно тренироваться и укреплять свое тело физическими нагрузками. Внимание на Давидса обратил тренер Луи ван Гал, который тогда работал с «Аяксом». Коуч оценил пасы игрока и рвение, с которым тот стелился в подкатах и боролся за мяч. Неудивительно, что полузащитник при ван Гале достаточно быстро оказался в первой команде и стал попадать в ее стартовый состав. При этом Эдгар стал не просто футболистом основы, а одним из лидеров коллектива. Вместе с «Аяксом» Давидс завоевал немало титулов в Нидерландах, выиграл Лигу чемпионов, Кубок УЕФА, Суперкубок УЕФА и Межконтинентальный кубок. За манеру игры Эдгара в разные годы называли Питбулем, Хищником или Пираньей. Уж очень яростно полузащитник рубился, выходя на поле, и не церемонился с соперниками.",
        author_id: "1",
        created_at: 1,
        updated_at: 864000,
    },
];

if (!localStorage.getItem("articles")) {
    localStorage.setItem("articles", JSON.stringify(articles));
}

const create = (payload) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const articles = JSON.parse(localStorage.getItem("articles"));
            const newArticle = {
                _id: String(articles.length + 1),
                created_at: Date.now(),
                ...payload,
            };
            articles.push(newArticle);
            localStorage.setItem("articles", JSON.stringify(articles));
            resolve(newArticle);
        }, 200);
    });

const get = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("articles")));
        }, 200);
    });

const update = (id, payload) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const articles = JSON.parse(localStorage.getItem("articles"));
            const articleIndex = articles.findIndex((a) => a._id === id);
            articles[articleIndex] = {
                ...articles[articleIndex],
                ...payload,
                updated_at: Date.now(),
            };
            localStorage.setItem("articles", JSON.stringify(articles));
            resolve(articles[articleIndex]);
        }, 200);
    });

const remove = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const articles = JSON.parse(localStorage.getItem("articles"));
            const newArticles = articles.filter((a) => a._id !== id);
            localStorage.setItem("articles", JSON.stringify(newArticles));
            resolve(null);
        }, 200);
    });

const getByIdArticle = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("articles")).find(
                    (article) => article._id === id
                )
            );
        }, 200);
    });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    create,
    get,
    update,
    remove,
    getByIdArticle,
};
