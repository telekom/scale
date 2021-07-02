source ./scripts/_colors.sh;
source ./scripts/_header.sh;
echo "--------"
echo "${GREEN}Bootstrapping...${NC}"
yarn bootstrap;
echo "--------"
echo "${GREEN}Building components...${NC}"
yarn workspace @telekom/scale-components build;
echo "--------"
echo "${GREEN}Building React package...${NC}"
yarn workspace @telekom/scale-components-react build;
echo "--------"
echo "${GREEN}Building Vue package...${NC}"
yarn workspace @telekom/scale-components-vue build;
echo "--------"
echo "${GREEN}Building Angular package...${NC}"
yarn workspace @telekom/scale-components-angular build;
