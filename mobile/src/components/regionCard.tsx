import { Link } from "expo-router";
import { Pressable } from "react-native";
import { type Region } from "../../../api/src/data/regions";

interface Props {
  region: Region;
}

const RegionCard = ({ region }: Props) => {
  return (
    <Pressable>
      <Link href={`/region/${region.id}`}>{region.name}</Link>
    </Pressable>
  );
};

export default RegionCard;
