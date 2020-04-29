source ./scripts/_colors.sh;
source ./scripts/_header.sh;
echo "--------"
echo "--------"
echo "${GREEN}Build Components...${NC}"
echo "--------"
echo "--------"
echo "${GREEN}Build config...${NC}"
yarn workspace @scaleds/config build;
echo "--------"
echo "${GREEN}Build Components...${NC}"
yarn workspace @scaleds/components build;
echo "--------"
echo "${GREEN}Build React wrappers...${NC}"
yarn workspace @scaleds/components-react build;
echo "--------"
echo "${GREEN}Build Docs...${NC}"
yarn workspace @scaleds/docs build;
echo "--------"
echo "${GREEN}Building Html to Sketch!${NC}"
cd packages/html-to-sketch
yarn build
yarn unlink
yarn link
echo "${GREEN}Done building Html to Sketch!${NC}"
echo "${GREEN}Building Sketch Generator!${NC}"
cd ../html-to-sketch
yarn unlink "@scaleds/html-to-sketch"
yarn link "@scaleds/html-to-sketch"
yarn build
echo "${GREEN}Done building Sketch Generator!${NC}"

# echo "${GREEN}Creating boilerplate symlinks for components${NC}"
# cd packages/components
# echo "${CYAN}Linking components${NC}"
# yarn link
# cd ../../examples/boilerplate-react
# yarn link "@scaleds/components"
# echo "${CYAN}Linked components to boilerplate-react${NC}"
# cd ../boilerplate-angular
# yarn link "@scaleds/components"
# echo "${CYAN}Linked components to boilerplate-angular${NC}"
# cd ../boilerplate-vue
# yarn link "@scaleds/components"
# echo "${CYAN}Linked components to boilerplate-vue${NC}"
# echo "${GREEN}Done creating symlinks!${NC}"

