echo "--------"
echo "Checking for uncommitted build outputs..."
if [ -z "$(git status --porcelain)" ];
then
    echo "Working copy is clean"
else
    echo "Please commit your changes"
    git status
    exit 1
fi
