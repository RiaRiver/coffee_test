import './src/sass/style.scss';
import { MainPage } from './src/pages';
import { Element } from './src/utils';

const app = new Element('div', '', { id: 'app' });
app.getElement().append(new MainPage().getElement());

document.body.append(app.getElement());
