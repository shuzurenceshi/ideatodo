#!/bin/bash
# IdeaToDo - 自动同步 + Cloudflare 部署脚本

cd /root/ideatodo

export CLOUDFLARE_API_TOKEN="5ffs_M7hzOND8zoVx-eY18Gc0Wy3g1AD8xuC0XTB"
export CLOUDFLARE_ACCOUNT_ID="c1119e73537ab028455972057fa06376"

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

if [[ -n $(git status --porcelain) ]]; then
    git add -A
    git commit -m "auto: 同步更新 - $TIMESTAMP"
    git push origin main
    echo "[$TIMESTAMP] GitHub 同步成功"
    
    npm run build
    wrangler pages deploy out --project-name=ideatodo
    echo "[$TIMESTAMP] Cloudflare 部署成功"
else
    echo "[$TIMESTAMP] 无变更"
fi
