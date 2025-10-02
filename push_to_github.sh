#!/bin/bash

# 脚本：推送代码到GitHub以触发重新部署

echo "=== 推送代码到GitHub ==="
echo "此脚本将帮助您推送代码到GitHub以触发Vercel重新部署"
echo ""

# 检查git状态
echo "1. 检查Git状态..."
git status

echo ""
echo "2. 显示最近的提交..."
git log --oneline -5

echo ""
echo "3. 检查远程仓库配置..."
git remote -v

echo ""
echo "=== 推送说明 ==="
echo "如果您遇到认证错误，请选择以下方法之一："
echo ""
echo "方法一：使用GitHub CLI"
echo "  1. 安装: sudo apt install gh"
echo "  2. 登录: gh auth login"
echo "  3. 推送: git push -u origin master"
echo ""
echo "方法二：使用Personal Access Token"
echo "  1. 访问: https://github.com/settings/tokens"
echo "  2. 生成token（选择repo权限）"
echo "  3. 配置: git remote set-url origin https://TOKEN@github.com/sidneysantossp/meuddd.git"
echo "  4. 推送: git push -u origin master"
echo ""
echo "方法三：使用SSH密钥"
echo "  1. 生成: ssh-keygen -t ed25519"
echo "  2. 添加: ssh-add ~/.ssh/id_ed25519"
echo "  3. 复制公钥到GitHub"
echo "  4. 推送: git push -u origin master"
echo ""

# 尝试推送
echo "4. 尝试推送代码..."
if git push -u origin master 2>&1; then
    echo ""
    echo "✅ 推送成功！"
    echo "请访问Vercel Dashboard查看部署状态："
    echo "https://vercel.com/sidneysantossp/projects"
    echo ""
    echo "部署完成后，验证以下页面："
    echo "- https://www.meuddd.com.br/estado/acre"
    echo "- https://www.meuddd.com.br/estado/acre/rio-branco"
    echo "- https://www.meuddd.com.br/estado/sao-paulo"
    echo "- https://www.meuddd.com.br/estado/rio-de-janeiro"
else
    echo ""
    echo "❌ 推送失败，请按照上述说明配置认证"
    echo "完成后，手动运行: git push -u origin master"
fi

echo ""
echo "=== 完成 ==="