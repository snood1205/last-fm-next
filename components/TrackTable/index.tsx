import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { PaginationQuery } from "../../lib/interfaces/PaginationQuery";
import { Track } from "../../lib/interfaces/Track";
import { parsePaginationOptions } from "../../lib/functions/parsePaginationOptions";
import { Navigation } from "../Navigation/index";
import { ParsedUrlQuery } from "querystring";

interface Props {
  query: ParsedUrlQuery;
}

interface Response {
  tracks: Track[];
  maximumPage: number;
}

const parsePaginationQuery = ({ per_page, page }: ParsedUrlQuery): PaginationQuery => ({
  per_page: per_page as string,
  page: page as string,
});

export const TrackTable: React.FC<Props> = ({ query }: Props) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [maximumPage, setMaximumPage] = useState<number>(1);
  const paginationQuery = parsePaginationQuery(query);
  const { page } = paginationQuery;
  const paginationOptions = parsePaginationOptions({ paginationQuery });

  useEffect(() => {
    axios.get<Response>(`/api/tracks/${page}`).then(({ data: { tracks, maximumPage } }) => {
      setTracks(tracks);
      setMaximumPage(maximumPage);
    });
  }, [maximumPage]);

  return (
    <>
      <Navigation paginationOptions={paginationOptions} maximumPage={maximumPage} />
      <div className="tracks">
        <Table striped>
          <TableHeader />
          <TableBody tracks={tracks} />
        </Table>
      </div>
    </>
  );
};
