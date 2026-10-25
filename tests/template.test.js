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
  assert.match(profile, /College of Robot Science and Engineering/);
  assert.match(profile, /position: Robotics Engineering/);
  assert.match(profile, /date: Pending/);
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
