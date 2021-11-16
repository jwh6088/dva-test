import dva from 'dva';
import './index.css';
import * as application from './application';

// 公共model
import authorize from './models/application/authorize';

// 初始化应用
window.application = application;

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/products').default);
app.model(authorize);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
