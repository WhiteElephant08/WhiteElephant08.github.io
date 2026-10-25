# WhiteElephant08.github.io

这是 `WhiteElephant08` 的个人 GitHub Pages 主页框架。第一版先建立稳定的视觉、栏目和编辑方式，所有尚未确认的经历都明确标记为“待补充”，不会使用无法验证的能力描述。

网站采用静态 HTML、CSS 和 JavaScript，不需要安装 Ruby、Jekyll、Node.js 或数据库。直接打开 `index.html` 即可阅读，使用本地服务器预览时交互更接近 GitHub Pages。

## 文件结构

```text
index.html             页面结构与无 JavaScript 时的基础内容
assets/css/site.css    颜色、排版、响应式布局
assets/js/content.js   个人介绍、关注方向、项目和 GitHub 教程内容
assets/js/app.js       渲染、主题、导航和教程展开交互
tests/site.test.js     结构与内容完整性检查
LICENSE                上游 Minimal Light 的 CC0 许可证
```

## 编辑个人内容

日常更新主要编辑 `assets/js/content.js`：

- `profile`：用户名、定位、个人介绍、头像和 GitHub 链接。
- `focus`：目前关注或正在学习的问题。
- `projects`：项目、数据资源和学习记录。
- `githubGuide`：GitHub 使用手册。

在经历尚未确认时，继续使用“待补充”“持续更新”“正在学习”等表述。不要先写“精通”“专家”或无法提供来源的成绩数字。

修改视觉时编辑 `assets/css/site.css`；修改页面结构时编辑 `index.html`；修改主题切换或教程展开行为时编辑 `assets/js/app.js`。

## GitHub Desktop 工作流

1. 在 GitHub Desktop 中选择仓库。
2. 点击 **Fetch origin** 检查远程变化。
3. 较大修改使用 **Current branch → New branch** 创建短期分支。
4. 修改文件后，在 **Changes** 中逐项检查差异。
5. 在左下角填写本次修改目的，点击 **Commit to ...**。
6. 点击 **Push origin** 上传提交。
7. 重要修改可以创建 Pull Request，确认后合并回 `main`。

只改一两句话时可以直接在 `main` 提交；新栏目、视觉重做和实验性功能优先使用分支。

## 发布 GitHub Pages

1. 在 GitHub 创建公开仓库 `WhiteElephant08.github.io`。
2. 将本地仓库的远程地址改为新仓库地址。
3. 把完成版本合并到 `main` 并 Push。
4. 打开仓库 **Settings → Pages**。
5. 在 **Build and deployment** 中选择 **Deploy from a branch**。
6. 选择 `main` 和根目录 `/ (root)`，保存。
7. 等待部署完成后访问 `https://whiteelephant08.github.io`。

仓库根目录包含 `.nojekyll`，GitHub Pages 会把这些静态文件直接发布，不运行 Jekyll。

## 更新网站

每次更新都遵循“修改 → 检查 → Commit → Push”。Push 到用于 Pages 的 `main` 分支后，GitHub 会自动重新部署网站。

提交信息应说明目的，例如：

```text
docs: add verified education details
feat: add dataset resource section
fix: prevent mobile navigation overflow
```

提交前运行：

```powershell
node --test tests/site.test.js
node --check assets/js/content.js
node --check assets/js/app.js
```

## 回退修改

Git 的每个 Commit 都是保存点。在 GitHub Desktop 中打开 **History**，找到需要撤销的提交，右键选择 **Revert changes in commit**，GitHub Desktop 会创建一个新的反向提交，不会粗暴删除后续历史。

如果只是还没有 Commit 的本地修改，可以在 **Changes** 中右键对应文件并选择 **Discard changes**。这个动作无法通过 Git 恢复，操作前必须确认文件确实不要了。

## 来源与许可证

本项目以 [yaoyao-liu/minimal-light](https://github.com/yaoyao-liu/minimal-light) 的静态 HTML 版本为起点，重新设计了页面结构、视觉系统和交互教程。上游项目采用 CC0 1.0 Universal，许可证全文保留在 `LICENSE`。

后续加入的个人文字、照片和项目材料仍分别受其原作者权利约束，不应因为代码仓库使用 CC0 就默认可以重新使用个人身份材料。
