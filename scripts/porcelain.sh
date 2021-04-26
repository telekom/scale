source ./scripts/_colors.sh;
source ./scripts/_header.sh;
echo "--------"
echo "${GREEN}Check for uncommitted build outputs...${NC}"
echo "--------"
if [ -z $(git status --porcelain) ];
then
    echo "${GREEN}Working copy is clean"
else
    echo "${RED}Please commit your changes"
    git status
    exit 1
fi
