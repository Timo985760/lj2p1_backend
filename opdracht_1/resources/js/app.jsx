import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function init() {
    const el = document.getElementById('app');
    const scriptEl = document.querySelector('script[data-page="app"][type="application/json"]');
    let pageData;
    if (scriptEl?.textContent) {
        pageData = JSON.parse(scriptEl.textContent);
    } else if (el?.dataset?.page) {
        pageData = JSON.parse(el.dataset.page);
    }

    createInertiaApp({
        title: (title) => `${title} - ${appName}`,
        page: pageData,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.jsx`,
                import.meta.glob('./Pages/**/*.jsx'),
            ),
        setup({ el: targetEl, App, props }) {
            const root = createRoot(targetEl || el);

            root.render(<App {...props} />);
        },
        progress: {
            color: '#4B5563',
        },
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

