# 部署指南 - 解决404错误问题

## 问题诊断

### 症状
- 访问 `https://www.meuddd.com.br/estado/acre` 返回404错误
- 其他州/城市页面也出现类似问题

### 根本原因
构建脚本 `vercel-build.sh` 中的数据库文件路径错误：
- 错误路径：`dev.db`
- 正确路径：`db/custom.db`

## 解决方案

### 1. 已完成的修复
- ✅ 修复了构建脚本中的数据库路径问题
- ✅ 确认数据库包含所有27个巴西州和692个城市
- ✅ 本地测试所有页面返回200状态码

### 2. 部署步骤

#### 方法一：使用GitHub CLI（推荐）
```bash
# 安装GitHub CLI（如果尚未安装）
# Ubuntu/Debian:
sudo apt update
sudo apt install gh

# 登录GitHub
gh auth login

# 推送代码
git push -u origin master
```

#### 方法二：使用Personal Access Token
1. 访问 https://github.com/settings/tokens
2. 生成新的Personal Access Token（选择repo权限）
3. 配置Git：
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/sidneysantossp/meuddd.git
git push -u origin master
```

#### 方法三：使用SSH密钥
```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加到ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 添加公钥到GitHub账户
# 复制 ~/.ssh/id_ed25519.pub 的内容到 GitHub Settings > SSH and GPG keys

# 测试连接
ssh -T git@github.com

# 推送代码
git push -u origin master
```

### 3. 验证部署

部署完成后，验证以下页面：
- `https://www.meuddd.com.br/estado/acre` - Acre州页面
- `https://www.meuddd.com.br/estado/acre/rio-branco` - Rio Branco市页面
- `https://www.meuddd.com.br/estado/sao-paulo` - São Paulo州页面
- `https://www.meuddd.com.br/estado/rio-de-janeiro` - Rio de Janeiro州页面

### 4. 监控部署状态

1. 访问 Vercel Dashboard
2. 检查部署日志
3. 确认所有页面返回200状态码

## 技术细节

### 数据库信息
- **文件位置**: `db/custom.db`
- **状态数量**: 27个巴西州
- **城市数量**: 692个城市
- **DDD代码数量**: 65个

### 构建脚本
- **文件**: `vercel-build.sh`
- **功能**: 
  - 生成Prisma客户端
  - 验证数据库存在性
  - 推送数据库schema
  - 执行数据种子
  - 构建Next.js应用

### API端点
- **状态列表**: `/api/ddd/states`
- **DDD验证**: `/api/ddd/validate`
- **语音搜索**: `/api/ddd/voice-search`

## 故障排除

### 如果部署仍然失败
1. 检查Vercel环境变量
2. 确认`DATABASE_URL`设置正确
3. 验证构建脚本执行权限
4. 检查Prisma schema兼容性

### 如果页面仍然返回404
1. 清除浏览器缓存
2. 检查DNS解析
3. 验证CDN缓存
4. 检查路由配置

## 联系信息

如果问题仍然存在，请检查：
- Vercel部署日志
- GitHub Actions状态
- 域名配置

---

**最后更新**: 2025-09-30
**状态**: 等待GitHub推送以触发重新部署