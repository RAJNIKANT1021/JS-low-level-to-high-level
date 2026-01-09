import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { webcrypto } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

if (!globalThis.crypto) {
    // @ts-ignore
    globalThis.crypto = webcrypto
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getSidebar() {
    const trackDirs = [
        '01-javascript-internals',
        '02-react-internals',
        '03-deep-dives',
        '04-build-engines'
    ];

    return trackDirs.map(dir => {
        const fullPath = path.resolve(__dirname, '..', dir);

        if (!fs.existsSync(fullPath)) return null;

        const files = fs.readdirSync(fullPath)
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const name = file.replace('.md', '');
                // Convert "1-how-js-executes" to "How Js Executes"
                // Remove leading numbers and dashes (e.g. "1-", "01-")
                const cleanName = name.replace(/^\d+-/, '');
                const text = cleanName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return {
                    text: text,
                    link: `/${dir}/${name}`
                };
            });

        if (files.length === 0) return null;

        return {
            text: dir.split('-').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            items: files,
            collapsed: false
        };
    }).filter(item => item !== null);
}

export default withMermaid(defineConfig({
    title: "JS & React Architecture",
    description: "Deep-dive learning roadmap",
    ignoreDeadLinks: true,
    base: '/JS-low-level-to-high-level/',
    themeConfig: {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
        search: {
            provider: 'local'
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Roadmap', link: '/ROADMAP' },
        ],
        sidebar: getSidebar(),
        socialLinks: [
            { icon: 'github', link: 'https://github.com/RAJNIKANT1021/JS-low-level-to-high-level' }
        ]
    }
}))
