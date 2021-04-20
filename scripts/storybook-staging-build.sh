source ./scripts/_colors.sh;
echo "This will setup the project, build components and then Storybook"
echo "--------"
echo "${GREEN}Lerna bootstrap...${NC}"
yarn bootstrap;
echo "--------"
echo "${GREEN}Building Components...${NC}"
yarn workspace @telekom/scale-components build;
echo "--------"
echo "${GREEN}Building Vue proxy...${NC}"
yarn workspace @telekom/scale-components-vue build;
echo "--------"
echo "${GREEN}Building Storybook...${NC}"
yarn workspace @telekom/scale-storybook-vue build;
