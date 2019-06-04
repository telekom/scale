source ./scripts/_header.sh;

echo "--------"
echo "--------"
echo "${GREEN}Build Components...${NC}"
echo "--------"
echo "--------"
echo "${GREEN}Build styles...${NC}"
yarn workspace @telements/styles build;
echo "--------"
echo "${GREEN}Build HTML Components...${NC}"
yarn workspace @telements/components-html build;
echo "--------"
echo "${GREEN}Build Web Components...${NC}"
yarn workspace @telements/components-web build;
echo "--------"
echo "${GREEN}Build React Components...${NC}"
yarn workspace @telements/components-react build;
echo "--------"
echo "--------"
echo "--------"
echo "${GREEN}Done building components!${NC}"
echo "--------"
echo "--------"
