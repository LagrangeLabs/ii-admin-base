#!/bin/sh
set -e

# setup ssh-agent and provide the GitHub deploy key
openssl aes-256-cbc -K $encrypted_fc7f0aafbcdc_key -iv $encrypted_fc7f0aafbcdc_iv -in config/travis/deploy.enc -out config/travis/deploy -d

# 对解密后的私钥添加权限
chmod 600 config/travis/deploy

eval "$(ssh-agent -s)"

ssh-add config/travis/deploy

# 删除解密后的密钥
rm config/travis/deploy

git config --global user.name 'Travis'  
git config --global user.email 'travis@travis-ci.com' 

# commit the assets in storybook-static/ to the gh-pages branch and push to GitHub using SSH
./node_modules/.bin/gh-pages -d storybook-static/ -b gh-pages -r git@github.com:${TRAVIS_REPO_SLUG}.git
