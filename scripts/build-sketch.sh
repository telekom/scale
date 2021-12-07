source ./scripts/_colors.sh;
echo "--------"
echo "${GREEN}Bootstrapping...${NC}"
yarn bootstrap;
echo "--------"
echo "${GREEN}Building components...${NC}"
yarn workspace @telekom/scale-components build;
echo "--------"
echo "${GREEN}Setting up Sketch Compilation...${NC}"
yarn workspace @telekom/scale-generator-sketch build;
yarn workspace @telekom/scale-html-to-sketch build;
echo "--------"
echo "${GREEN}Spinning up sketch template server and building .sketch file...${NC}"
yarn workspace @telekom/scale-generator-sketch build-scale
echo "--------"
echo "${GREEN}Done...${NC}"
