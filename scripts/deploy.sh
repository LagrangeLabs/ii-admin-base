#!/bin/sh
set -e

# setup ssh-agent and provide the GitHub deploy key
openssl aes-256-cbc -K $encrypted_e8b9f665f844_key -iv $encrypted_e8b9f665f844_iv -in ssh.enc -out ssh -d

chmod 600 ssh
eval "$(ssh-agent -s)"
ssh-add ssh

rm ssh
git config --global user.name 'Bian2017'  
git config --global user.email 'bgl_cumt_zju@163.com' 

# commit the assets in storybook-static/ to the gh-pages branch and push to GitHub using SSH
./node_modules/.bin/gh-pages -d storybook-static/ -b gh-pages -r git@github.com:${TRAVIS_REPO_SLUG}.git
