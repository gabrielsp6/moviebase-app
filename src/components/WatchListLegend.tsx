import { List, ListItem } from "@chakra-ui/react";
import { BsFillSquareFill } from "react-icons/bs";
type OccurencesWithPercentages = Record<string, string> | null;

type WatchListLegendProps = {
  occurencesWithPercentages: OccurencesWithPercentages;
};

const legendColors = ["#9E86D5", "#805AD5", "white", "#B171C3"];

const WatchListLegend = ({ occurencesWithPercentages }: WatchListLegendProps) => {

  return (
    <List spacing={0} fontSize="lg" color="teal.500">
      {occurencesWithPercentages &&
        Object.entries(occurencesWithPercentages).map(([key, value], index) => (
          <ListItem
            key={index}
            color={legendColors[index]}
            fontWeight="700"
            display="flex"
            alignItems="center"
          >
            <BsFillSquareFill style={{ marginRight: "10px" }} />
            {`${value} % ${key}`} 
          </ListItem>
        ))}
    </List>
  );
};


export default WatchListLegend;