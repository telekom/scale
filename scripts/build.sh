source ./scripts/_colors.sh;
source ./scripts/_header.sh;
echo "--------"
echo "--------"
echo "${GREEN}Build Components...${NC}"
echo "--------"
echo "--------"
echo "${GREEN}Build config...${NC}"
yarn workspace @scale/config build;
echo "--------"
echo "${GREEN}Build Components...${NC}"
yarn workspace @scale/components build;
echo "--------"
echo "${GREEN}Build React wrappers...${NC}"
yarn workspace @scale/react-wrapper build;
echo "--------"
echo "${GREEN}Build Docs...${NC}"
yarn workspace @scale/docs build;
echo "--------"
echo "${GREEN}Building Html to Sketch!${NC}"
cd packages/html-to-sketch
yarn build
yarn unlink
yarn link
echo "${GREEN}Done building Html to Sketch!${NC}"
echo "${GREEN}Building Sketch Generator!${NC}"
cd ../html-to-sketch
yarn unlink "@scale/html-to-sketch"
yarn link "@scale/html-to-sketch"
yarn build
echo "${GREEN}Done building Sketch Generator!${NC}"

# echo "${GREEN}Creating boilerplate symlinks for components${NC}"
# cd packages/components
# echo "${CYAN}Linking components${NC}"
# yarn link
# cd ../../examples/boilerplate-react
# yarn link "@scale/components"
# echo "${CYAN}Linked components to boilerplate-react${NC}"
# cd ../boilerplate-angular
# yarn link "@scale/components"
# echo "${CYAN}Linked components to boilerplate-angular${NC}"
# cd ../boilerplate-vue
# yarn link "@scale/components"
# echo "${CYAN}Linked components to boilerplate-vue${NC}"
# echo "${GREEN}Done creating symlinks!${NC}"

