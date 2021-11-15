import dva from 'dva';
import './index.css';
import * as application from './application';

// 初始化应用
window.application = application;
console.log(application)

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/products').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
