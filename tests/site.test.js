const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function loadContent() {
  const context = { window: {} };
  vm.runInNewContext(read('assets/js/content.js'), context);
  return context.window.SITE_CONTENT;
}

test('root contains the dependency-free site files', () => {
  const required = [
    'index.html',
    'assets/css/site.css',
    'assets/js/content.js',
    'assets/js/app.js',
    'LICENSE',
  ];

  for (const file of required) {
    assert.equal(fs.existsSync(path.join(root, file)), true, `${file} should exist`);
  }
});

test('HTML exposes semantic landmarks and all primary sections', () => {
  const html = read('index.html');

  assert.match(html, /<header\b/);
  assert.match(html, /<nav\b[^>]*aria-label="主导航"/);
  assert.match(html, /<main\b/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="github-guide"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /assets\/css\/site\.css/);
  assert.match(html, /assets\/js\/content\.js/);
  assert.match(html, /assets\/js\/app\.js/);
});

test('content model contains editable profile, work, and guide data', () => {
  const content = loadContent();

  assert.equal(content.profile.handle, 'WhiteElephant08');
  assert.ok(content.profile.introduction.length > 20);
  assert.ok(Array.isArray(content.focus));
  assert.ok(Array.isArray(content.projects));
  assert.ok(Array.isArray(content.githubGuide.topics));
  assert.ok(content.githubGuide.topics.length >= 8);
  assert.doesNotMatch(
    `${content.profile.role} ${content.profile.introduction}`,
    /精通|专家|expert|mastery/i,
  );
});

test('application script publishes the PersonalSite interface', () => {
  const script = read('assets/js/app.js');

  assert.match(script, /window\.PersonalSite\s*=/);
  assert.match(script, /renderSite/);
  assert.match(script, /setTheme/);
  assert.match(script, /showSection/);
});
