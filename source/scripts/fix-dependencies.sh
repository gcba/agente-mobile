if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "fix-dependencies for ios"
    sed -i '' "s|[[:<:]]compile[[:>:]]|implementation|g" node_modules/react-native-os/android/build.gradle || true
else
    echo "fix-dependencies for android"
    sed -i "s/\<compile\>/implementation/g" node_modules/react-native-os/android/build.gradle || true
fi