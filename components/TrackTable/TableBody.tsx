import { Track } from "../../lib/interfaces/Track";

interface Props {
  tracks: Track[];
}

export const TableBody: React.FC<Props> = ({ tracks }: Props) => (
  <tbody>
    {tracks.map(({ imageUrl, name, artist, album, listenedAt, url }, index) => (
      <tr key={index}>
        <td>
          <img src={imageUrl} alt={`Album artwork for ${album}`} />
        </td>
        <th scope="row">{name}</th>
        <th>{artist}</th>
        <th>{album}</th>
        <th>{listenedAt}</th>
        <th>
          <a href={url}>Last.FM</a>
        </th>
      </tr>
    ))}
  </tbody>
);
