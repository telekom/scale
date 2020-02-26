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
# echo "${GREEN}Creating boilerplate symlinks for components${NC}"
# cd packages/components
# echo "${CYAN}Linking components${NC}"
# yarn link
# cd ../../examples/boilerplate-react
# yarn link "@telements/components"
# echo "${CYAN}Linked components to boilerplate-react${NC}"
# cd ../boilerplate-angular
# yarn link "@telements/components"
# echo "${CYAN}Linked components to boilerplate-angular${NC}"
# cd ../boilerplate-vue
# yarn link "@telements/components"
# echo "${CYAN}Linked components to boilerplate-vue${NC}"
# echo "${GREEN}Done creating symlinks!${NC}"

