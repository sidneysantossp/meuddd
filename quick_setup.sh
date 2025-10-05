#!/bin/bash

echo "=== 快速GitHub认证设置 ==="
echo ""

# 检查参数
if [ -z "$1" ]; then
    echo "使用方法: ./quick_setup.sh <github_token>"
    echo ""
    echo "快速获取GitHub token:"
    echo "1. 访问: https://github.com/login"
    echo "2. 登录您的账户"
    echo "3. 访问: https://github.com/settings/tokens/new"
    echo "4. Token名称: meuddd-deploy"
    echo "5. 过期时间: 30天"
    echo "6. 权限: 勾选 'repo' (整个repo部分)"
    echo "7. 点击 'Generate token'"
    echo "8. 复制绿色框中的token"
    echo ""
    echo "然后运行: ./quick_setup.sh <您的token>"
    exit 1
fi

TOKEN=$1

echo "正在配置认证..."
git remote set-url origin "https://${TOKEN}@github.com/sidneysantossp/meuddd.git"

echo "正在推送代码..."
if git push -u origin master; then
    echo ""
    echo "🎉 成功！代码已推送到GitHub"
    echo ""
    echo "接下来："
    echo "1. 访问 https://vercel.com/sidneysantossp/projects"
    echo "2. 等待Vercel自动部署完成（通常2-5分钟）"
    echo "3. 验证修复："
    echo "   - https://www.meuddd.com.br/estado/acre"
    echo "   - https://www.meuddd.com.br/estado/acre/rio-branco"
    echo ""
    echo "✅ 您的网站修复将在几分钟内生效！"
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "1. Token是否正确复制"
    echo "2. Token是否有repo权限"
    echo "3. 网络连接是否正常"
    echo ""
    echo "如果问题持续，请尝试重新生成token"
fi