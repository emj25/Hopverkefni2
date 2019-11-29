import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  createCardFooter(lecture) {
    const cardFooterWrapper = document.createElement('div');
    cardFooterWrapper.className = 'card__footerwrapper';
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card__footer';
    const category = document.createElement('div');
    category.className = 'card__footer__head';
    category.appendChild(document.createTextNode(lecture.category));
    cardFooter.appendChild(category);
    const title = document.createElement('div');
    title.className = 'card__footer__main';
    title.appendChild(document.createTextNode(lecture.title));
    cardFooter.appendChild(title);
    const completion = window.localStorage.getItem(lecture.slug);
    cardFooterWrapper.appendChild(cardFooter);
    if (completion === 'complete') {
      const check = document.createElement('div');
      check.className = 'card__footer__check';
      check.appendChild(document.createTextNode('✓'));
      cardFooterWrapper.appendChild(check);
    }
    return cardFooterWrapper;
  }


  createLectureCard(lecture) {
    const card = document.createElement('div');
    card.className = `card card--${lecture.category}`;
    card.href = `lecture?slug=${lecture.slug}`;
    const cardThumb = document.createElement('img');
    cardThumb.className = 'card__main';
    cardThumb.src = lecture.thumbnail;
    cardThumb.setAttribute('alt', '');
    const cardFooter = this.createCardFooter(lecture);
    const a = document.createElement('a');
    a.appendChild(cardThumb);
    a.appendChild(cardFooter);
    a.href = `fyrirlestur.html?${lecture.slug}`;
    card.appendChild(a);
    return card;
  }

  displayLectures(lectures) {
    lectures.forEach((lecture) => {
      const card = this.createLectureCard(lecture);
      this.container.appendChild(card);
    });
  }

  load() {
    const API_URL = './lectures.json?slug=html';
    empty(this.container);
    fetch(`${API_URL}`)
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then(data => this.displayLectures(data.lectures))
      .catch((error) => {
        this.displayError('Villa við að sækja gögn');
        console.error(error);
      });
  }
}
