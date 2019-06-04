source ./scripts/_header.sh;

echo "--------"
echo "--------"
echo "${GREEN}Build Boilerplates...${NC}"
echo "--------"
echo "--------"
echo "${GREEN}Build Angular Boilerplate...${NC}"
yarn workspace @telements/boilerplate-angular build;
echo "--------"
echo "${GREEN}Build Vue Boilerplate...${NC}"
yarn workspace @telements/boilerplate-vue build;
echo "--------"
echo "${GREEN}Build React Boilerplate...${NC}"
yarn workspace @telements/boilerplate-react build;
echo "--------"
echo "${GREEN}Build Next Boilerplate...${NC}"
yarn workspace @telements/boilerplate-next build;
echo "--------"
echo "--------"
echo "${GREEN}Done building boilerplates!${NC}"
echo "--------"
echo "--------"
echo "${GREEN}Launch React App:${NC}"
echo "yarn workspace @telements/boilerplate-react run start"
echo "${GREEN}Launch Next App:${NC}"
echo "yarn workspace @telements/boilerplate-next run start"
echo "${GREEN}Launch Vue App:${NC}"
echo "yarn workspace @telements/boilerplate-vue run start"
echo "${GREEN}Launch Angular App:${NC}"
echo "yarn workspace @telements/boilerplate-angular run start"

