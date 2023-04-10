import config from "../../publications.json";

const DEFAULT_CONFIG = {
  author: {
    name: "An Author",
    company: "An Author's Company",
  },
  title: "Publications repository",
  subtitle: "That Teaches Nice Things",

  description: "A nice publications repository.",
  keywords: ["a nice repository", "for people", "to store", "research papers"],
  productionBaseUrl: "/",
};

export default function getCourseConfig() {
  return Object.assign({}, DEFAULT_CONFIG, config);
}
