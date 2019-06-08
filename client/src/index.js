import React from 'react';
import { render } from 'react-dom';

// Css reset and global styles
import './globalSyles/_normalize.scss';


import App from '@components/App';

render(<App />, document.getElementById('root'));