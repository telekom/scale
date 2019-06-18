echo "--------"
echo "--------"
echo "${GREEN}Build Components...${NC}"
echo "--------"
echo "--------"
echo "${GREEN}Build config...${NC}"
yarn workspace @telements/config build;
echo "--------"
echo "${GREEN}Build util...${NC}"
yarn workspace @telements/util build;
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
echo "${GREEN}Build Stencil Components...${NC}"
yarn workspace @telements/components-stencil build;
echo "--------"
echo "${GREEN}Build React Components...${NC}"
yarn workspace @telements/components-react build;
echo "--------"
echo "${GREEN}Build Sketch Document...${NC}"
yarn workspace @telements/generator-sketch build;
echo "--------"
echo "--------"
echo "--------"
echo "${GREEN}Done building components!${NC}"
echo "--------"
echo "--------"
