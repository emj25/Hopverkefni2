import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  displayError(error) {
    console.error(error);
  }

  displayLectures(data) {
    console.log(data);
  }

  load() {
    const API_URL = 'https://notendur.hi.is/bog26/vefforritun/hopverkefni2/lectures.json?slug=html';
    empty(this.container);
    fetch(`${API_URL}`)
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          return null;
        }
        console.log('OK');
        console.log(res);
        return res.json();
      })
      .then(data => this.displayLectures(data))
      .catch((error) => {
        this.displayError('Villa við að sækja gögn');
        console.error(error);
      });
  }
}
