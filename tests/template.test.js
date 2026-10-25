const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('keeps the upstream academic-homepage structure and MIT license', () => {
  for (const file of ['_config.yml', 'index.html', '_layouts/default.html', 'assets/css/global.css', 'LICENSE']) {
    assert.equal(fs.existsSync(path.join(root, file)), true, `${file} should exist`);
  }
  assert.match(read('LICENSE'), /MIT License/);
  assert.match(read('_layouts/default.html'), /github\.com\/luost26\/academic-homepage/);
});

test('uses the owner identity and user-site base URL', () => {
  const profile = read('_data/profile.yml');
  const config = read('_config.yml');

  assert.match(profile, /primary_name: "WhiteElephant08"/);
  assert.match(profile, /github: WhiteElephant08/);
  assert.doesNotMatch(profile, /primary_name: "Your Name"|your@email\.com|your_github_id/);
  assert.match(config, /^baseurl: ""/m);
});

test('does not present template publications or news on the homepage', () => {
  const display = read('_data/display.yml');

  assert.match(display, /show_news: false/);
  assert.match(display, /show_selected_publications: false/);
});
