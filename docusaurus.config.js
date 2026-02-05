// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Notes CDA",
  tagline: "Programming is cool",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  url: "https://kimptgr.github.io",
  baseUrl: "/coding-notebook",
  organizationName: "kimptgr",
  projectName: "Coding Notebook",

  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/kimptgr/coding-notebook/tree/main",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/k1m.png",
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Coding notebook",
        logo: {
          alt: "Coding notebook",
          src: "img/k1m.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "primarySidebar",
            position: "left",
            label: "Docs",
          },
          { to: "/docs/category/java", label: "Java", position: "left" },
          { to: "/docs/raccourcis/ide", label: "R&Co", position: "left" },
          {
            href: "https://github.com/kimptgr/coding-notebook",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Java",
                to: "/docs/category/java",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My coding notebook, Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
