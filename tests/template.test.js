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

test('publishes the confirmed education details without inventing dates or degree level', () => {
  const profile = read('_data/profile.yml');

  assert.match(profile, /Northeastern University \(China\)/);
  assert.match(profile, /Faculty of Robot Science and Engineering/);
  assert.match(profile, /position: Robotics Engineering/);
  assert.doesNotMatch(profile, /Education entry pending|date: Pending/);
});

test('about section describes confirmed interests and skills without mastery claims', () => {
  const profile = read('_data/profile.yml');

  assert.match(profile, /机器人学习/);
  assert.match(profile, /YOLO/);
  assert.match(profile, /PyTorch/);
  assert.match(profile, /Python/);
  assert.match(profile, /C\+\+/);
  assert.doesNotMatch(profile, /精通|专家|proficient|expert/i);
  assert.doesNotMatch(profile, /个人主页预览/);
});

test('publishes the confirmed robotics competition awards', () => {
  const profile = read('_data/profile.yml');

  assert.match(profile, /The 19th Advanced Robotics and Simulation Technology Competition - National Third Prize/);
  assert.match(profile, /The 19th Advanced Robotics and Simulation Technology Competition - Provincial Second Prize/);
});

test('does not present template publications or news on the homepage', () => {
  const display = read('_data/display.yml');

  assert.match(display, /show_news: false/);
  assert.match(display, /show_selected_publications: false/);
});

test('shows the confirmed VLA research project without publishing exact results', () => {
  const projects = read('_data/projects.yml');
  const homepage = read('index.html');

  assert.match(projects, /Failure-Guided Continuation Learning/);
  assert.match(projects, /LIBERO/);
  assert.match(projects, /π0 \/ SmolVLA/);
  assert.match(projects, /阶段化失败分析/);
  assert.match(projects, /受控对照/);
  assert.match(projects, /研究项目 · 论文稿件/);
  assert.doesNotMatch(projects, /70\.7|44\.0|58\.7|26\.7|106\/150|66\/150|88\/150|360,?000|450次/);
  assert.match(homepage, /widgets\/project_card\.html/);
});

test('removes public template demo pages and navigation', () => {
  const navigation = read('_data/navigation.yml');
  const removed = ['showcase.html', 'blog.html', 'publications.html', 'index_layout2.html'];

  assert.doesNotMatch(navigation, /Showcase|Blog|Publications|Layout 2/);
  for (const file of removed) {
    assert.equal(fs.existsSync(path.join(root, file)), false, `${file} should not be public`);
  }
});
