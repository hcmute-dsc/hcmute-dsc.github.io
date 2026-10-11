/* eslint-disable global-require */

import { sortBy } from '@site/src/utils/jsUtils';
import { Project } from '@site/src/shared/dto/Project';

// prettier-ignore
const PROJECTS: Project[] = [
  {
    title: 'ClubDay',
    description: '4 mini games for club events, up to 5 players per round with a realtime leaderboard right after: quick math, AI-graded speed drawing, memory sequence and odd-color tile. One Node.js process (Fastify + React 19), players join by QR code.',
    preview: require('./showcase/clubday.png'),
    website: 'https://club-day.hcmute-dsc.io.vn',
    source: 'https://github.com/hcmute-dsc/ClubDay2026',
    tags: ['club', 'opensource', 'product', 'ai', 'favorite'],
  },
  {
    title: 'Study Jam',
    description: 'Web application for running Study Jam sessions, with a Next.js + Ant Design UI and a Spring Boot RESTful API (PostgreSQL, Liquibase). Public as a reference project for club members.',
    preview: null,
    website: null,
    source: 'https://github.com/hcmute-dsc/study-jam-ui',
    tags: ['club', 'opensource'],
  },
  {
    title: 'Web CV Boots AI',
    description: 'Enhance your CV with Gemini: suggests well-structured layouts and crafts compelling sentences to build a professional resume.',
    preview: null,
    website: null,
    source: 'https://github.com/hcmute-dsc/Web-CV-boots-AI-fe',
    tags: ['club', 'opensource', 'ai'],
  },
  {
    title: 'AI CheckFace',
    description: 'Analyzes human emotions from faces, generates thoughtful responses with Gemini AI and speaks them with FPT text-to-speech.',
    preview: null,
    website: null,
    source: 'https://github.com/hcmute-dsc/AI-CheckFace-Gemini-apiFPT',
    tags: ['club', 'opensource', 'ai'],
  },
  {
    title: 'MergeMail',
    description: 'Desktop app for sending bulk emails through Gmail from a Word (.docx) template and a CSV recipient list, keeping the original formatting.',
    preview: null,
    website: null,
    source: 'https://github.com/hcmute-dsc/Tool-merge-mail',
    tags: ['club', 'opensource'],
  },
  {
    title: 'HCMUTE DSC Website',
    description: 'The official website of HCMUTE Developer Student Club (this site), with tutorials, blog and showcase, built with Docusaurus.',
    preview: null,
    website: 'https://hcmute-dsc.io.vn',
    source: 'https://github.com/hcmute-dsc/hcmute-dsc.github.io',
    tags: ['club', 'opensource'],
  },
  {
    title: 'Youth Quiz',
    description: 'A quiz game website where questions are about information technology, information tranformation, and general knowledge about student organizations, made with MEAN stack.',
    // preview: require('./showcase/apexfp.png'),
    preview: null,
    website: 'https://youth-quiz.vercel.app/',
    // source: 'https://github.com/TienNHM/youth-quiz',
    source: null,
    tags: ['product', 'favorite'],
  },
  {
    title: 'Virtual Mouse',
    description: 'A virtual mouse application for Windows, made with Python and Mediapipe.',
    // preview: require('./showcase/avana-wallet.png'),
    preview: null,
    website: 'https://tiennhm.github.io/VirtualMouse/',
    // source: 'https://github.com/TienNHM/VirtualMouse',
    source: null,
    tags: ['product', 'favorite'],
  },
  {
    title: 'welcome-bot-discord',
    description: 'A Discord bot for welcoming new members to a server.',
    preview: null,
    website: null,
    source: 'https://github.com/TienNHM/welcome-bot-discord',
    tags: ['opensource'],
  },
  {
    title: 'root-me-ctf',
    description: 'My solutions for root-me.org challenges.',
    preview: null,
    website: null,
    source: 'https://github.com/TienNHM/root-me-ctf',
    tags: ['opensource'],
  },
];

function sortProjects() {
  let result = PROJECTS;
  // Sort by site name
  result = sortBy(result, (project) => project.title.toLowerCase());
  
  // Sort by favorite tag, favorites first
  result = sortBy(result, (project) => !project.tags.includes('favorite'));
  return result;
}

export const sortedProjects = sortProjects();
