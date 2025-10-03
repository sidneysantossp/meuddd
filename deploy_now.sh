#!/bin/bash

echo "🚀 一键部署脚本 - Meu DDD"
echo "================================"
echo ""

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 发现未提交的更改，正在提交..."
    git add .
    git commit -m "Auto-commit: Deploy fixes - $(date)"
fi

echo "📊 当前Git状态："
git log --oneline -3
echo ""

echo "🔗 远程仓库："
git remote -v
echo ""

echo "⚠️  需要GitHub认证"
echo ""
echo "请选择认证方式："
echo "1) Personal Access Token (推荐)"
echo "2) SSH密钥"
echo "3) GitHub CLI"
echo ""
read -p "请输入选择 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📋 Personal Access Token 设置："
        echo "1. 访问: https://github.com/settings/tokens/new"
        echo "2. Token名称: meuddd-deploy"
        echo "3. 权限: 勾选 repo"
        echo "4. 生成并复制token"
        echo ""
        read -p "请粘贴您的GitHub token: " token
        
        if [ -n "$token" ]; then
            git remote set-url origin "https://${token}@github.com/sidneysantossp/meuddd.git"
            echo "✅ Token配置完成"
        else
            echo "❌ 未提供token"
            exit 1
        fi
        ;;
    2)
        echo ""
        echo "🔑 SSH密钥设置："
        echo "1. 生成密钥: ssh-keygen -t ed25519"
        echo "2. 添加到ssh-agent: ssh-add ~/.ssh/id_ed25519"
        echo "3. 复制公钥到GitHub"
        echo "4. 修改远程URL: git remote set-url origin git@github.com:sidneysantossp/meuddd.git"
        echo ""
        echo "请手动完成上述步骤后重试"
        exit 1
        ;;
    3)
        echo ""
        echo "📱 GitHub CLI设置："
        echo "1. 安装: sudo apt install gh"
        echo "2. 登录: gh auth login"
        echo ""
        echo "请手动完成上述步骤后重试"
        exit 1
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🚀 正在推送代码..."
if git push -u origin master; then
    echo ""
    echo "🎉 成功！代码已推送到GitHub"
    echo ""
    echo "📋 接下来："
    echo "1. 访问: https://vercel.com/sidneysantossp/projects"
    echo "2. 等待部署完成 (2-5分钟)"
    echo "3. 验证修复："
    echo "   - https://www.meuddd.com.br/estado/acre"
    echo "   - https://www.meuddd.com.br/estado/acre/rio-branco"
    echo ""
    echo "✅ 您的网站修复即将生效！"
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "1. Token是否正确"
    echo "2. 网络连接"
    echo "3. GitHub权限"
fi