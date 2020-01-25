module.exports = {
    base: '/vuetning/',
    docsDir: 'docs',
    host: 'localhost',
    port: 7070,
    title: 'Vuetning',
    description: 'We love what we do. Let us help you do what <b>You love.</b>',
    head: [
        ['link', { rel: 'stylesheet', href: `/assets/styles/salesforce-lightning-design-system.min.css` }],

    ],
    themeConfig: {
        repo: 'marceloatg/vuetning',
        repoLabel: 'Contribute!',
        docsDir: 'docs',
        logo:'/logo.svg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Documentation', link: '/development/' },
            { text: 'Contributors', link: '/contributors/' },
            {
                text: 'Ecosystem',
                items: [
                    {
                        text: 'Social',
                        items: [
                            { text: 'GitHub', link: 'https://github.com/marceloatg/vuetning' },
                        ]
                    },
                    {
                        text: 'Help',
                        items: [
                            { text: 'Issues', link: 'https://github.com/marceloatg/vuetning/issues' },
                            { text: 'Edit Page', link: 'https://github.com/marceloatg/vuetning' },
                            { text: 'Latest Releases', link: 'https://github.com/marceloatg/vuetning/releases' },
                            { text: 'FAQ', link: 'https://github.com/marceloatg/vuetning/wiki' }
                        ]
                    },
                    {
                        text: 'Contact',
                        items: [
                            { text: 'Blue Bear', link: 'https://bluebear.app' },
                            { text: 'Email', link: 'mailto:social@bluebear.app' },
                            { text: 'Pull Request', link: 'https://github.com/marceloatg/vuetning/pulls' },
                        ]
                    }
                ]
            }
        ],
        sidebar: [
            {
                title: 'Development',
                collapsable: false,
                children: [
                    '/development/',
                    '/development/contributing',
                    '/development/whyVuetning',
                ]
            },
            {
                title: 'Components',
                collapsable: false,
                children: [
                    '/components/',
                    '/components/avatar',
                    '/components/button',
                    '/components/checkbox-button',
                ]
            },
        ]
    }
};
