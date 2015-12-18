import $ from 'jquery';

export default function () {
  console.log('bind');
  $('.btn').on('click', function () {
    console.log('hello button');
  });
}
