import { Text } from "react-native";
import { type Region } from "../../../api/src/data/regions";

interface Props {
  region: Region;
}

const RegionCard = ({ region }: Props) => {
  return (
    <Text>{region.name}</Text>
  );
};

export default RegionCard;
