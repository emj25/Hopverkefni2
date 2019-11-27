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
      if (content[i].type === 'youtube') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const lect = document.createElement('a');
        lect.href = content[i].data;
        lect.classList.add(content[i].type);
        lect.setAttribute('type', content[i].type);
        lect.textContent = "Myndband";
        lectEl.appendChild(lect);
      }

      if (content[i].type === 'text') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const lect = document.createElement('div');
        lect.classList.add(content[i].type);
        lect.setAttribute('type', content[i].type);
        lect.textContent = content[i].data;
        lectEl.appendChild(lect);
      }
      
      if (content[i].type === 'image') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const contain = document.createElement('div');
        contain.classList.add('figure');
        lectEl.appendChild(contain);
        const lect = document.createElement('img');
        lect.classList.add(content[i].type);
        lect.setAttribute('src', content[i].data);
        contain.appendChild(lect);
        const capt = document.createElement('figcaption');
        capt.textContent = content[i].caption;
        contain.appendChild(capt);
      }

      if (content[i].type === 'quote') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const contain = document.createElement('div');
        contain.classList.add('quote');
        lectEl.append(contain);
        const lect = document.createElement('div');
        lect.classList.add(content[i].type);
        lect.textContent = content[i].data;
        contain.appendChild(lect);
        /*
        const att = document.createElement('div');
        att.textContent = content[i].attribute;
        contain.textContent(att);
        */
      }

      if (content[i].type === 'heading') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const lect = document.createElement('div');
        lect.classList.add(content[i].type);
        lect.setAttribute('type', content[i].type);
        lect.textContent = content[i].data;
        lectEl.appendChild(lect);
      }

      if (content[i].type === 'list') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const lect = document.createElement('ul');
        lect.classList.add(content[i].type);
        lect.setAttribute('type', content[i].type);
        lect.textContent = content[i].data;
        lectEl.appendChild(lect);
      }

      if (content[i].type === 'code') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const lect = document.createElement('div');
        lect.classList.add(content[i].type);
        lect.setAttribute('type', content[i].type);
        lect.textContent = content[i].data;
        lectEl.appendChild(lect);
      }
    }
  }

  function endLecture(e) {
    e.target.parentNode.classList.toggle('item--done');
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
    const check = document.querySelector('.finish');
    check.addEventListener('click', endLecture);
  } else {
    const list = new List();
    list.load();
  }
});
