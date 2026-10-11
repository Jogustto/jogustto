function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

async function loadLanguage(lang) {
  try {
    const response = await fetch(`./frontend/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo locales/${lang}.json`);
    }
    const translations = await response.json();

    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = getNestedValue(translations, key);
      if (translation) {
        element.textContent = translation;
      }
    });

    document.getElementById("btn-pt").classList.toggle("active", lang === "pt");
    document.getElementById("btn-en").classList.toggle("active", lang === "en");

    localStorage.setItem("preferred_lang", lang);
  } catch (error) {
    console.error("Erro na internacionalização (i18n):", error);
  }
}

document
  .getElementById("btn-pt")
  .addEventListener("click", () => loadLanguage("pt"));
document
  .getElementById("btn-en")
  .addEventListener("click", () => loadLanguage("en"));

document.addEventListener("DOMContentLoaded", () => {
  const savedLang =
    localStorage.getItem("preferred_lang") ||
    (navigator.language.startsWith("pt") ? "pt" : "en");

  loadLanguage(savedLang);
});
