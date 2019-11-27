import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  function displayError(error) {
    console.error(error);
  }

  function displayHeader(title, category) {
    const headEl = document.getElementsByClassName('header__fyrirlestur')[0];
    const cate = document.createElement('div');
    cate.classList.add('header__text__fyrirlestur');
    cate.textContent = category;
    headEl.append(cate);
    const mainHead = document.createElement('div');
    mainHead.classList.add('header__text--main__fyrirlestur');
    mainHead.textContent = title;
    headEl.append(mainHead);
  }

  function displayLecture(content) {
    for (let i = 0; i < content.length; i += 1) {
      console.log(content[i].type);
      console.log(content[i].data);
      const lectEl = document.getElementsByClassName('lecture')[0];
      const lect = document.createElement('lecture__content');
      lect.classList.add(content[i].type);
      lect.setAttribute('type', content[i].type);
      lect.textContent = content[i].data;
      lectEl.appendChild(lect);
    }
  }

  function load() {
    fetch('./lectures.json')
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then((data) => {
        let n = 0;
        const sl = new URLSearchParams(window.location.search);
        const slod = sl.toString();
        for (let i = 0; i < 13; i += 1) {
          if (slod === (data.lectures[i].slug + "=")) n = i;
        }
        displayHeader(data.lectures[n].title, data.lectures[n].category);
        displayLecture(data.lectures[n].content);
      })
      .catch((error) => {
        document.displayError('Villa við að sækja gögn');
        console.error(error);
      });
  }

  if (isLecturePage) {
    load();
  } else {
    const list = new List();
    list.load();
  }
});
