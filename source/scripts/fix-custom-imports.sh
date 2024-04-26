echo "Fixing custom imports"

function in_place_sed() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i "" -E "$1" "$2"
  else
    sed -i -E "$1" "$2"
  fi
}

in_place_sed 's#(\.\./)+src/models#\1models#g' ./src/config/agent.ts
in_place_sed 's#(\.\./)+src/models#\1models#g' ./src/config/extra.ts
in_place_sed 's#(\.\./)+src/models#\1models#g' ./src/config/styles.ts