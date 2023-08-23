import { List, ListItem } from "@chakra-ui/react";
import { BsFillSquareFill } from "react-icons/bs";
type OccurencesWithPercentages = Record<string, string> | null;

type WatchListLegendProps = {
  occurencesWithPercentages: OccurencesWithPercentages;
};

const WatchListLegend = ({
  occurencesWithPercentages,
}: WatchListLegendProps) => {
  return (
    <List spacing={0} fontSize="lg" color="teal.500">
      <ListItem
        color="#9E86D5"
        fontWeight={"700"}
        margin="0"
        display={"flex"}
        alignItems="center"
      >
        <BsFillSquareFill style={{ marginRight: "10px" }} />
        {occurencesWithPercentages &&
          JSON.stringify(
            occurencesWithPercentages[Object.keys(occurencesWithPercentages)[0]]
          ).slice(1, 3)}
        {" % "}
        {occurencesWithPercentages &&
          JSON.stringify(Object.keys(occurencesWithPercentages)[0]).replace(
            /['"]+/g,
            ""
          )}{" "}
      </ListItem>

      <ListItem
        color="#805AD5"
        fontWeight={"700"}
        display={"flex"}
        alignItems="center"
      >
        <BsFillSquareFill style={{ marginRight: "10px" }} />
        {occurencesWithPercentages &&
          JSON.stringify(
            occurencesWithPercentages[Object.keys(occurencesWithPercentages)[1]]
          ).slice(1, 3)}
        {" % "}
        {occurencesWithPercentages &&
          JSON.stringify(Object.keys(occurencesWithPercentages)[1]).replace(
            /['"]+/g,
            ""
          )}{" "}
      </ListItem>

      <ListItem
        color="white"
        fontWeight={"700"}
        display={"flex"}
        alignItems="center"
      >
        <BsFillSquareFill style={{ marginRight: "10px" }} />
        {occurencesWithPercentages &&
          JSON.stringify(
            occurencesWithPercentages[Object.keys(occurencesWithPercentages)[2]]
          ).slice(1, 3)}
        {" % "}
        {occurencesWithPercentages &&
          JSON.stringify(Object.keys(occurencesWithPercentages)[2]).replace(
            /['"]+/g,
            ""
          )}{" "}
      </ListItem>
      <ListItem
        color="#B171C3"
        fontWeight={"700"}
        display={"flex"}
        alignItems="center"
      >
        <BsFillSquareFill style={{ marginRight: "10px" }} />
        {occurencesWithPercentages &&
          JSON.stringify(
            occurencesWithPercentages[Object.keys(occurencesWithPercentages)[3]]
          ).slice(1, 3)}
        {" % "}
        {occurencesWithPercentages &&
          JSON.stringify(Object.keys(occurencesWithPercentages)[3]).replace(
            /['"]+/g,
            ""
          )}{" "}
      </ListItem>
    </List>
  );
};

export default WatchListLegend;
