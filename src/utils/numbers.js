export const formatter = value =>
  `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const parser = value => value.replace(/€\s?|(\.*)/g, '');
