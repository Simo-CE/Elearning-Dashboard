# abort on errors
set -e

#cd ../
#cd ../
#cd data
#cd src
OUTPUT=$(ls -1)
echo "${OUTPUT}"

echo "Again LS = "

OUTPUT2=$(ls ../)
echo "${OUTPUT2}"
OUTPUT3=$(ls ../../)
echo "${OUTPUT3}"
OUTPUT4=$(ls ../../../)
echo "${OUTPUT4}"

#cd sites/safetyreact.safetytracker.be
#cd ~
#echo "the dirname is : ${pwd}"
#BASEDIR=$(dirname $0)
#echo "Script location: ${BASEDIR}"
#rm -r .node_modules
#rm -rf .node_modules
#rm -rf package-lock.json
# rm -r ./safetyreact.safetytracker.be/node_modules
# #find . -type d -iname 'session' -delete
# rm -rf ./safetyreact.safetytracker.be/package-lock.json
#rm -rf node_modules
echo "Start Install Packages"
npm ci
#npm run build
#npm install
echo "Start Building Packages"
# build
npm run build

# chmod 777 build

# chmod 777 build/*

# navigate into the build output directory
#cd build

echo "Copy Build Files and Paste in Root"
chmod -R o+rwx build/
#mv build/* ./#safetyreact.safetytracker.be/
# cp -R build/*
# echo "Content Copied"

# cd ~/safetyreact.safetytracker.be/
# OUTPUT=$(ls -1)
# echo "${OUTPUT}"

#cp -R build/* ~/../clients/04fae13315624f2f922bc24192d30a56/sites/safetyreact.safetytracker.be/
cp -R build/* .

#cp -r build/* ../

echo "Done"
