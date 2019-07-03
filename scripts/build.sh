source ./scripts/_colors.sh;
source ./scripts/_header.sh;
echo "--------"
echo "--------"
echo "${GREEN}Build Components...${NC}"
echo "--------"
echo "--------"
echo "${GREEN}Build config...${NC}"
yarn workspace @telements/config build;
echo "--------"
echo "${GREEN}Build Components...${NC}"
yarn workspace @telements/components build;
echo "--------"
echo "${GREEN}Build Sketch Document...${NC}"
yarn workspace @telements/generator-sketch build;
echo "--------"
echo "--------"
echo "--------"
echo "${GREEN}Done building components!${NC}"
echo "--------"
echo "--------"

