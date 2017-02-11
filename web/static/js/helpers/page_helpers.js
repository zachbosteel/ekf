function getTexts(obj, static_page) {
  const initial_texts = static_page.texts;
  const texts = {};
  for (let text of initial_texts) {
    texts[text.label] = text.body;
  }
  obj.setState({ texts });
}

export default getTexts