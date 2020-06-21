#!/bin/sh
set -e

# setup ssh-agent and provide the GitHub deploy key
openssl aes-256-cbc -K $encrypted_2277b1c8774a_key -iv $encrypted_2277b1c8774a_iv -in ssh.enc -out ssh -d

# 对解密后的私钥添加权限
chmod 600 ssh

eval "$(ssh-agent -s)"

ssh-add ssh

rm ssh
git config --global user.name 'Travis'  
git config --global user.email 'travis@travis-ci.com' 

# commit the assets in storybook-static/ to the gh-pages branch and push to GitHub using SSH
./node_modules/.bin/gh-pages -d storybook-static/ -b gh-pages -r git@github.com:${TRAVIS_REPO_SLUG}.git
