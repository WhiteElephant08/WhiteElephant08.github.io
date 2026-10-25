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
  assert.match(profile, /B\.Eng\. Candidate in Robotics Engineering/);
  assert.match(profile, /date: 2024 — 2028/);
  assert.doesNotMatch(profile, /Education entry pending|date: Pending/);
});

test('about section follows a concise academic profile structure', () => {
  const profile = read('_data/profile.yml');

  assert.match(profile, /Robotics Engineering undergraduate/);
  assert.match(profile, /robot learning/);
  assert.match(profile, /vision-language-action models/);
  assert.match(profile, /execution feedback to improve robot policies/);
  assert.match(profile, /PyTorch/);
  assert.match(profile, /Python/);
  assert.match(profile, /C\+\+/);
  assert.doesNotMatch(profile, /神经网络/);
  assert.doesNotMatch(profile, /我是|我希望|完整研究链路|我目前|现阶段|当前工作|开展过|仍在持续提升/);
  assert.doesNotMatch(profile, /精通|专家|proficient|expert/i);
  assert.doesNotMatch(profile, /个人主页预览/);
});

test('publishes the confirmed robotics competition awards', () => {
  const profile = read('_data/profile.yml');

  assert.match(profile, /The 19th Advanced Robotics and Simulation Technology Competition/);
  assert.match(profile, /details: National Third Prize · Provincial Second Prize/);
});

test('does not present template publications or news on the homepage', () => {
  const display = read('_data/display.yml');

  assert.match(display, /show_news: false/);
  assert.match(display, /show_selected_publications: false/);
});

test('shows the confirmed VLA research project without publishing exact results', () => {
  const projects = read('_data/projects.yml');
  const homepage = read('index.html');
  const projectWidget = read('_includes/widgets/project_card.html');

  assert.match(projects, /Failure-Guided Continuation Learning/);
  assert.match(projects, /LIBERO/);
  assert.match(projects, /π0 \/ SmolVLA/);
  assert.match(projects, /阶段化失败分析/);
  assert.match(projects, /受控对照/);
  assert.match(projects, /研究项目 · 论文稿件/);
  assert.doesNotMatch(projects, /70\.7|44\.0|58\.7|26\.7|106\/150|66\/150|88\/150|360,?000|450次/);
  assert.match(homepage, /widgets\/home_tabs\.html/);
  assert.match(projects, /image: \/assets\/images\/projects\/vla-main-task-success\.png/);
  assert.equal(fs.existsSync(path.join(root, 'assets/images/projects/vla-main-task-success.png')), true);
  assert.match(projectWidget, /academic-project-figure/);
});

test('uses accessible hash-linked tabs for the main homepage sections', () => {
  const homepage = read('_includes/widgets/home_tabs.html');
  const script = read('assets/js/common.js');

  for (const section of ['about', 'education', 'research', 'projects']) {
    assert.match(homepage, new RegExp(`data-tab="${section}"`));
    assert.match(homepage, new RegExp(`data-tab-panel="${section}"`));
  }
  assert.match(homepage, /role="tablist"/);
  assert.match(homepage, /role="tabpanel"/);
  assert.match(homepage, /widgets\/project_card\.html/);
  assert.match(script, /window\.location\.hash/);
  assert.match(script, /ArrowLeft/);
  assert.match(script, /ArrowRight/);
});

test('publishes the DPTC planning-budget project with scoped development results', () => {
  const projects = read('_data/projects.yml');

  assert.match(projects, /DPTC: Adaptive Compute Allocation/);
  assert.match(projects, /冻结视觉世界模型/);
  assert.match(projects, /受控配对评价工具/);
  assert.match(projects, /64场开发实验/);
  assert.match(projects, /54\.4%/);
  assert.match(projects, /73\.3%/);
  assert.doesNotMatch(projects, /执行1、3或5步|同状态反事实分支|局部轨迹|固定策略退化|反事实数据不足|35\/64/);
  assert.doesNotMatch(projects, /普遍|显著优于|state-of-the-art|SOTA/i);
});

test('removes public template demo pages and navigation', () => {
  const navigation = read('_data/navigation.yml');
  const removed = ['showcase.html', 'blog.html', 'publications.html', 'index_layout2.html'];

  assert.doesNotMatch(navigation, /Showcase|Blog|Publications|Layout 2/);
  for (const file of removed) {
    assert.equal(fs.existsSync(path.join(root, file)), false, `${file} should not be public`);
  }
});
