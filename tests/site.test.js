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

test('homepage provides a profile image with an explicit fallback path', () => {
  const html = read('index.html');
  const script = read('assets/js/app.js');

  assert.match(html, /id="profile-image"/);
  assert.match(html, /id="avatar-fallback"/);
  assert.match(script, /activateAvatarFallback/);
  assert.match(script, /addEventListener\("error"/);
});

test('landmarks remain in the expected reading order', () => {
  const html = read('index.html');
  const orderedIds = ['about', 'work', 'github-guide', 'contact'];
  let previous = -1;

  for (const id of orderedIds) {
    const position = html.indexOf(`id="${id}"`);
    assert.ok(position > previous, `${id} should follow the previous section`);
    previous = position;
  }
});

test('theme control exposes state to assistive technology', () => {
  const html = read('index.html');
  const script = read('assets/js/app.js');

  assert.match(html, /id="theme-toggle"[^>]*aria-pressed="false"/);
  assert.match(script, /setAttribute\("aria-pressed"/);
});

test('unverified work is visibly marked as provisional', () => {
  const content = loadContent();

  assert.ok(content.projects.length >= 3);
  assert.ok(content.projects.every((project) => ['待补充', '持续更新'].includes(project.status)));
});

test('GitHub guide covers the everyday concepts requested by the owner', () => {
  const content = loadContent();
  const names = content.githubGuide.topics.map((topic) => topic.name);
  const required = [
    'Repository', 'README', 'Commit', 'Branch', 'Fetch / Pull', 'Push',
    'Merge / Pull Request', 'Issue', 'Release / Tag', 'GitHub Pages',
    '.gitignore', 'Packages / Data',
  ];

  for (const name of required) {
    assert.ok(names.includes(name), `${name} should be documented`);
  }
  assert.ok(content.githubGuide.topics.every((topic) => topic.detail.length > 35));
});

test('guide explains the full local-to-Pages workflow and Desktop routine', () => {
  const guide = loadContent().githubGuide;

  assert.deepEqual(
    Array.from(guide.workflow),
    ['本地文件', 'Commit', 'Push', 'GitHub 仓库', 'GitHub Pages'],
  );
  assert.ok(guide.desktopSteps.length >= 7);
  assert.match(guide.packageNote, /npm|pip|Conda/);
  assert.match(guide.dataNote, /网盘|Hugging Face|Zenodo/);
});

test('guide items are rendered as accessible disclosure controls', () => {
  const script = read('assets/js/app.js');

  assert.match(script, /toggleGuideItem/);
  assert.match(script, /aria-expanded/);
  assert.match(script, /guide-toggle/);
  assert.match(script, /guide-panel/);
});

test('README documents editing, publishing, updating, and rollback', () => {
  const readme = read('README.md');
  const headings = ['编辑个人内容', '发布 GitHub Pages', '更新网站', '回退修改', '来源与许可证'];

  for (const heading of headings) {
    assert.match(readme, new RegExp(`^## ${heading}$`, 'm'));
  }
  assert.match(readme, /GitHub Desktop/);
  assert.match(readme, /WhiteElephant08\.github\.io/);
});

test('site declares a local favicon that exists', () => {
  const html = read('index.html');

  assert.match(html, /rel="icon"[^>]*href="assets\/img\/favicon\.svg"/);
  assert.equal(fs.existsSync(path.join(root, 'assets/img/favicon.svg')), true);
});
