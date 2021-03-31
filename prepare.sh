# this builds :latest tag
docker build -t "xops/fleekchat" .
# this assigns :latest to proper semver tag
docker tag "xops/fleekchat" "xops/fleekchat:$1"
