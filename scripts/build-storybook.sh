source ./scripts/_colors.sh;
echo "--------"
echo "${GREEN}Bootstrapping...${NC}"
yarn bootstrap;
echo "--------"
echo "${GREEN}Building components...${NC}"
yarn workspace @telekom/scale-components build:staging;
echo "--------"
echo "${GREEN}Building Storybook...${NC}"
yarn workspace @telekom/scale-storybook-vue build;
