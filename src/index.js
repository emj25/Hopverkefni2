import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  let showHTML = false;
  let showCSS = false;
  let showJavaScript = false;

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

  function displayLecture(content, slug) {
    for (let i = 0; i < content.length; i += 1) {
      if (content[i].type === 'youtube') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const lect = document.createElement('iframe');
        lect.classList.add(content[i].type);
        lect.src = content[i].data;
        lect.setAttribute('frameborder', '0');
        lect.setAttribute('allowfullscreen', '0');
        lectEl.appendChild(lect);
      }

      if (content[i].type === 'text') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const lect = document.createElement('div');
        lect.classList.add(content[i].type);
        lect.setAttribute('type', content[i].type);
        lect.innerText = content[i].data;
        console.log(content[i].data);
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
        const capt = document.createElement('div');
        capt.classList.add('figCaption');
        capt.innerText = content[i].caption;
        contain.appendChild(capt);
      }

      if (content[i].type === 'quote') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const contain = document.createElement('div');
        contain.classList.add(content[i].type);
        lectEl.append(contain);
        const lect = document.createElement('div');
        lect.classList.add(content[i].type);
        lect.innerText = content[i].data;
        contain.appendChild(lect);
        const attri = document.createElement('div');
        attri.classList.add(content[i].type);
        attri.textContent = content[i].attribute;
        contain.appendChild(attri);
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
        
        const str = content[i].data;
        console.log(str);
        lect.textContent = str;
        lectEl.appendChild(lect);
        /*
        const arr = str.split(',');
        console.log(arr);
        for (let k = 0; k < arr.length; k += 1) {
          const listItem = document.createElement('li');
          listItem.classList.add('listItem');
          listItem.textContent = arr[i];
          lect.appendChild(listItem);
        }
        */
      }

      if (content[i].type === 'code') {
        const lectEl = document.getElementsByClassName('lecture')[0];
        const lect = document.createElement('div');
        lect.classList.add(content[i].type);
        lect.setAttribute('type', content[i].type);
        lect.innerText = content[i].data;
        console.log(content[i].data);
        lectEl.appendChild(lect);
      }
    }
    const compStatus = window.localStorage.getItem(slug);
    if (compStatus === 'complete') {
      document.querySelector('.finish').classList.toggle('item--done');
    }


  }

  function endLecture(e) {
    e.target.classList.toggle('item--done');
    const sl = new URLSearchParams(window.location.search);
    let slod = sl.toString();
    slod = slod.substr(0, slod.length - 1);
    if (window.localStorage.getItem(slod) === 'complete') {
      window.localStorage.setItem(slod, 'incomplete');
    } else {
      window.localStorage.setItem(slod, 'complete');
    }
  }

  function markedLecture (slug, string) {
    window.localStorage.setItem(slug, string);
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
        let slod = sl.toString();
        slod = slod.substring(0, slod.length - 1);
        for (let i = 0; i < 13; i += 1) {
          if (slod === (data.lectures[i].slug)) n = i;
        }
        displayHeader(data.lectures[n].title, data.lectures[n].category);
        displayLecture(data.lectures[n].content, slod);
      })
      .catch((error) => {
        document.displayError('Villa við að sækja gögn');
        console.error(error);
      });
  }

  function filterCards() {
    // show All
    const hiddencards = document.querySelectorAll('.card--hidden');
    if (hiddencards) {
      hiddencards.forEach((card) => {
        card.classList.toggle('card--hidden');
      });
    }
    if (!(!showHTML && !showCSS && !showJavaScript)) {
      // hide All
      document.querySelectorAll('.card').forEach((card) => {
        card.classList.toggle('card--hidden');
      });
      // show types
      if (showHTML) {
        document.querySelectorAll('.card--html').forEach((card) => {
          card.classList.toggle('card--hidden');
        });
      }
      if (showCSS) {
        document.querySelectorAll('.card--css').forEach((card) => {
          card.classList.toggle('card--hidden');
        });
      }
      if (showJavaScript) {
        document.querySelectorAll('.card--javascript').forEach((card) => {
          card.classList.toggle('card--hidden');
        });
      }
    }
  }

  function toggleHTML(e) {
    if (showHTML) {
      showHTML = false;
    } else {
      showHTML = true;
    }
    e.target.classList.toggle('button--selected');
    filterCards();
  }

  function toggleCSS(e) {
    if (showCSS) {
      showCSS = false;
    } else {
      showCSS = true;
    }
    e.target.classList.toggle('button--selected');
    filterCards();
  }

  function toggleJavaScript(e) {
    if (showJavaScript) {
      showJavaScript = false;
    } else {
      showJavaScript = true;
    }
    e.target.classList.toggle('button--selected');
    filterCards();
  }



  if (isLecturePage) {
    load();
    const check = document.querySelector('.finish');
    check.addEventListener('click', endLecture);
  } else {
    document.querySelector('.htmlButton').addEventListener('click', toggleHTML);
    document.querySelector('.cssButton').addEventListener('click', toggleCSS);
    document.querySelector('.javascriptButton').addEventListener('click', toggleJavaScript);
    const list = new List();
    list.load();
  }
});
