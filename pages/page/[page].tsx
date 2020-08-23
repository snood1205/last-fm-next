import { TrackTable } from "../../components/TrackTable";
import { useRouter } from "next/router";

const PageIndex: React.FC = () => {
  const { query } = useRouter();
  return <TrackTable query={query} />;
};

export default PageIndex;
