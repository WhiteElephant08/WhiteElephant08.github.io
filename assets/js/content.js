window.SITE_CONTENT = {
  profile: {
    handle: "WhiteElephant08",
    role: "正在建立自己的研究与创作档案",
    introduction: "这里会记录我正在关注的问题、做过的实践，以及能够公开分享的项目、数据资源和学习过程。",
    github: "https://github.com/WhiteElephant08",
    avatar: "https://avatars.githubusercontent.com/u/206431951?v=4"
  },
  focus: [
    { title: "研究与问题", text: "记录真正投入过时间的问题，并逐步补充背景和成果。" },
    { title: "数据与材料", text: "整理数据来源、处理方法、说明文档和可复现入口。" },
    { title: "工具与实践", text: "把正在使用和学习的工具放回具体任务中说明。" }
  ],
  projects: [
    { status: "待补充", title: "代表项目", text: "这里将放入一个能够说明目标、过程和结果的项目。" },
    { status: "待补充", title: "数据资源", text: "这里将记录数据集说明、存储入口和处理脚本。" },
    { status: "持续更新", title: "学习记录", text: "这里将沉淀 GitHub、编程工具和研究方法的实践笔记。" }
  ],
  githubGuide: {
    workflow: ["本地文件", "Commit", "Push", "GitHub 仓库", "GitHub Pages"],
    topics: [
      { name: "Repository", summary: "一个项目的文件、说明和历史记录。", detail: "仓库不是普通网盘文件夹。除了当前文件，它还保存每次提交形成的历史，因此适合代码、文档、配置和可复现材料。一个独立目标通常对应一个仓库。" },
      { name: "README", summary: "别人进入仓库时首先看到的项目说明书。", detail: "README 应回答这个项目解决什么问题、如何使用、文件如何组织、数据从哪里来以及结果如何验证。哪怕仓库只有数据说明，也值得写清楚 README。" },
      { name: "Commit", summary: "一次有说明、可以回到过去的保存点。", detail: "Commit 是版本历史的基本单位。先选择要保存的修改，再写清楚这次为什么改，最后提交。适合在一个小目标完成并验证后创建，而不是把所有工作塞进一次提交。" },
      { name: "Branch", summary: "从主线分出的独立修改路线。", detail: "main 通常代表稳定版本。做新页面、实验或较大修改时，可以新建短期分支；确认没有问题后再合并回 main。个人仓库的小文字修改也可以直接在 main 完成。" },
      { name: "Fetch / Pull", summary: "检查并取得 GitHub 上的新变化。", detail: "Fetch 只检查远程仓库出现了哪些新提交，不立即改变当前文件；Pull 会取得这些提交并尝试合并到本地。多人协作或换电脑工作时，修改前先 Fetch/Pull。" },
      { name: "Push", summary: "把电脑上的提交上传到 GitHub。", detail: "Push 上传的是已经创建的 Commit，不是任意未保存文件。先 Commit，再 Push。上传成功后，远程仓库和本地仓库才会拥有相同的提交历史。" },
      { name: "Merge / Pull Request", summary: "检查一组修改并把它合回主线。", detail: "Merge 是把两条分支历史合到一起。Pull Request 是 GitHub 上用于展示差异、讨论和检查的合并请求；个人项目也可以用它给重大修改留下一份清楚记录。" },
      { name: "Issue", summary: "记录问题、任务、想法和讨论。", detail: "Issue 适合记录待办、错误、需求和讨论。它不是代码文件，但可以关联提交和 Pull Request，让以后的人知道为什么做这项修改以及什么时候完成。" },
      { name: "Release / Tag", summary: "标记一个稳定、可引用的版本。", detail: "Tag 给某个提交一个固定版本名称，例如 v1.0.0；Release 在 Tag 基础上增加面向使用者的说明和附件。需要让别人下载、引用或复现实验时再使用。" },
      { name: "GitHub Pages", summary: "把仓库里的静态网页公开发布。", detail: "GitHub Pages 可以把 HTML、CSS、JavaScript 直接变成网站。用户名.github.io 这个特殊仓库会发布为个人主页，更新 main 分支后网站会自动重新部署。" },
      { name: ".gitignore", summary: "规定哪些本地文件不应进入仓库。", detail: ".gitignore 用于排除缓存、虚拟环境、密钥、临时结果和过大的生成文件。它不会删除已经提交过的文件，所以敏感信息必须在首次提交前就排除。" },
      { name: "Packages / Data", summary: "依赖由语言工具管理，大型数据通常存放在专门平台。", detail: "GitHub 记录 package.json、requirements.txt 或 environment.yml 等依赖清单；真正的依赖由 npm、pip、Conda 等工具安装。大型数据应放到数据平台或网盘，仓库保留说明、校验信息和处理脚本。" }
    ],
    desktopSteps: [
      "Fetch origin：开始工作前检查 GitHub 是否有新提交。",
      "New branch：较大改动先从 main 创建一个短期分支。",
      "修改文件：只处理当前目标，不把无关文件混进来。",
      "Changes：检查 GitHub Desktop 列出的每一项差异。",
      "Commit：填写能说明目的的摘要，然后创建保存点。",
      "Push origin：把本地 Commit 上传到 GitHub。",
      "Preview / Pull Request：检查网页或差异，确认后再合并。",
      "Delete branch：合并完成后删除已经结束的短期分支。"
    ],
    packageNote: "GitHub 负责保存依赖清单和版本历史；npm、pip、Conda 才负责下载和安装软件包。不要把整个 node_modules 或虚拟环境上传。",
    dataNote: "GitHub 适合保存数据说明、少量样例、处理脚本与校验值。大型数据集继续放网盘、Hugging Face、Zenodo 等位置，并在 README 中提供稳定入口。"
  }
};
