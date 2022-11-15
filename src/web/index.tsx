import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from '@pages/App';
import './index.css';
import * as buffer from 'buffer';

if (typeof (window as any).Buffer === 'undefined') {
  (window as any).Buffer = buffer.Buffer;
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
