import { Helmet } from "react-helmet-async";
const Metadata = ({
  title,
  desc,
  canonical,
}: {
  title: string;
  desc: string;
  canonical: string;
}) => (
  <Helmet>
    <title>{title} | Music Player</title>
    <meta name="description" content={desc} />
    <link rel="canonical" href={`/${canonical}`} />
  </Helmet>
);
export default Metadata;
