/**
 * Fetch data for prerendering
 * This script fetches sponsors, events, and images data and injects it into HTML files
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, '..', 'dist');
const API_BASE_URL = process.env.API_BASE_URL || 'https://geelong-stars.pages.dev';

/**
 * Fetch data from API with error handling
 */
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      console.warn(`Failed to fetch ${endpoint}: ${response.statusText}`);
      return null;
    }
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.warn(`Error fetching ${endpoint}:`, error.message);
    return null;
  }
}

/**
 * Fetch all data needed for prerendering
 */
async function fetchAllData() {
  console.log('Fetching data for prerendering...');

  const [sponsors, events, images] = await Promise.all([
    fetchData('/api/sponsors?activeOnly=true'),
    fetchData('/api/events?activeOnly=true'),
    fetchData('/api/images'),
  ]);

  const data = {};
  if (sponsors) data.sponsors = sponsors;
  if (events) data.events = events;
  if (images) data.images = images;

  console.log(`Fetched: ${sponsors?.length || 0} sponsors, ${events?.length || 0} events, ${images?.length || 0} images`);

  return data;
}

/**
 * Inject preloaded data into HTML file
 */
function injectDataIntoHTML(htmlPath, data) {
  try {
    let html = readFileSync(htmlPath, 'utf-8');

    // Check if data is already injected
    if (html.includes('window.__PRELOADED_DATA__')) {
      return; // Skip if already injected
    }

    // Create the script tag with preloaded data
    const dataScript = `
    <script>
      window.__PRELOADED_DATA__ = ${JSON.stringify(data)};
    </script>`;

    // Inject before closing </head> tag
    html = html.replace('</head>', `  ${dataScript}\n  </head>`);

    writeFileSync(htmlPath, html, 'utf-8');
    console.log(`✓ Injected data into ${htmlPath}`);
  } catch (error) {
    console.warn(`Failed to inject data into ${htmlPath}:`, error.message);
  }
}

/**
 * Recursively find all HTML files in a directory
 */
function findHTMLFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findHTMLFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Main function
 */
async function main() {
  try {
    // Fetch all data
    const data = await fetchAllData();

    if (Object.keys(data).length === 0) {
      console.warn('Warning: No data fetched. HTML files will be generated without preloaded data.');
      console.warn('This is okay - the app will fetch data client-side.');
      return; // Exit gracefully - not a critical error
    }

    // Find all HTML files in dist
    const htmlFiles = findHTMLFiles(DIST_DIR);
    console.log(`Found ${htmlFiles.length} HTML files to process`);

    // Inject data into each HTML file
    htmlFiles.forEach(file => injectDataIntoHTML(file, data));

    console.log('✓ Prerender data injection complete!');
  } catch (error) {
    console.error('Error during prerender data injection:', error);
    // Don't exit with error - let the build continue
    // The app will work fine, just without preloaded data
  }
}

main();
