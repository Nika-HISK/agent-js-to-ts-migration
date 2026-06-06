#!/usr/bin/env node
/**
 * Compiles individual rule files in rules/ into a single AGENTS.md.
 * Files prefixed with _ are excluded from the build.
 * Run: node scripts/build.js
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, basename } from 'path';

const RULES_DIR = new URL('../rules', import.meta.url).pathname;
const OUTPUT_FILE = new URL('../AGENTS.md', import.meta.url).pathname;

async function getRuleFiles() {
  const files = await readdir(RULES_DIR);
  return files
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .sort();
}

function getSectionPrefix(filename) {
  return filename.split('-')[0];
}

async function build() {
  const files = await getRuleFiles();

  const header = `# JavaScript to TypeScript Migration Guide\n\n` +
    `**Version:** 1.0.0 | **Date:** ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}\n\n` +
    `Comprehensive migration guide for converting JavaScript codebases to TypeScript.\n` +
    `Contains ${files.length} rules. Auto-generated — do not edit directly.\n\n---\n\n`;

  let currentSection = '';
  const sections = [];

  for (const file of files) {
    const prefix = getSectionPrefix(file);
    const content = await readFile(join(RULES_DIR, file), 'utf8');

    // Strip frontmatter
    const stripped = content.replace(/^---[\s\S]+?---\n/, '').trim();

    if (prefix !== currentSection) {
      currentSection = prefix;
      sections.push(`\n---\n`);
    }

    sections.push(stripped);
  }

  const output = header + sections.join('\n\n');
  await writeFile(OUTPUT_FILE, output, 'utf8');
  console.log(`Built AGENTS.md from ${files.length} rule files.`);
}

build().catch(err => { console.error(err); process.exit(1); });
