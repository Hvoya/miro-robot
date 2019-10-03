import ru from "./ru";
import en from "./eng";

export const messages = {
  ru,
  en
};

export const changePlurallizeRules = VueI18n => {
  VueI18n.prototype.getChoiceIndex = function (choice, choicesLength) {
    // this === VueI18n instance, so the locale property also exists here
    if (this.locale !== 'ru') {
      // proceed to the default implementation
    }

    if (choice === 0) {
      return 0;
    }

    const teen = choice > 10 && choice < 20;
    const endsWithOne = choice % 10 === 1;

    if (!teen && endsWithOne) {
      return 1;
    }

    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
      return 2;
    }

    return (choicesLength < 4) ? 2 : 3;
  }
}