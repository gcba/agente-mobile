if [ -z "$2" ]
then
    echo "No config file specified, using default"
    cp ./scripts/presets/$1/config/agent/default.ts ./src/config/agent.ts || echo "Config file not found"
    cp ./scripts/presets/$1/config/extra/default.ts ./src/config/extra.ts || echo "Extra file not found"
    config_file="./scripts/presets/$1/config/app/default.txt"
else
    echo "Using config file $2"
    cp ./scripts/presets/$1/config/agent/$2.ts ./src/config/agent.ts || echo "Config file not found"
    cp ./scripts/presets/$1/config/extra/$2.ts ./src/config/extra.ts || echo "Extra file not found"
    config_file="./scripts/presets/$1/config/app/$2.txt"
fi

cp ./scripts/presets/$1/config/styles.ts ./src/config/styles.ts || echo "Styles file not found"

file="./app.json"

name=$(grep "name=" "$config_file" | cut -d'=' -f2)
identifier=$(grep "identifier=" "$config_file" | cut -d'=' -f2)


jq --arg name "$name" '.expo.name = $name' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
jq --arg identifier "$identifier" '.expo.ios.bundleIdentifier = $identifier' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
jq --arg identifier "$identifier" '.expo.android.package = $identifier' "$file" > "$file.tmp" && mv "$file.tmp" "$file"


if [ "$1" = "rockid" ]
then
    jq '.expo.splash.backgroundColor = "#000000"' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    jq '.expo.android.adaptiveIcon.backgroundColor = "#000000"' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
else 
    jq '.expo.splash.backgroundColor = "#f3f6f9"' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    jq '.expo.android.adaptiveIcon.backgroundColor = "#f3f6f9"' "$file" > "$file.tmp" && mv "$file.tmp" "$file"

fi

echo "Copying assets"
cp ./scripts/presets/$1/assets/icon.png ./src/assets/icon.png || echo "Icon file not found"
cp ./scripts/presets/$1/assets/splash.png ./src/assets/splash.png || echo "Splash file not found"
cp ./scripts/presets/$1/assets/logo.png ./src/assets/logo.png || echo "Logo file not found"
cp ./scripts/presets/$1/assets/small-logo.png ./src/assets/small-logo.png || echo "Small logo file not found"
cp ./scripts/presets/$1/assets/adaptive-icon.png ./src/assets/adaptive-icon.png || echo "Adaptive icon file not found"
rm -rf ./src/assets/introduction || echo "Introduction folder not found for deletion"
cp -r ./scripts/presets/$1/assets/introduction ./src/assets || echo "Introduction folder not found for copy"
rm -rf ./src/assets/steps || echo "Did folder not found for deletion"
cp -r ./scripts/presets/$1/assets/steps ./src/assets || echo "Steps folder not found for copy"

echo "Prebuilding expo"
expo prebuild --no-install

echo "Adding uri scheme"
npx uri-scheme add didcomm

sh ./scripts/fix-custom-imports.sh
