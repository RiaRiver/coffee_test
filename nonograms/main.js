import './src/sass/style.scss';
import { MainPage } from './src/pages';

const root = document.getElementById('app').append(new MainPage().getElement());
