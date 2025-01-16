import * as React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const variants = [
  "h1",
  "h3",
  "body1",
  "caption",
] as readonly TypographyProps["variant"][];

const dummyData = [
  "Heading 1 Example",
  "Heading 3 Example",
  "Body Text Example",
  "Caption Text Example",
];

function TypographyDemo(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <div>
   
      <Typography component="div" variant="body2" style={{ height: '100px' }}>
      {loading ? (
        <Skeleton  />
      ) : (
        <>
        {"Caption text, usually "}
        <br />
        {"for small notes or footers.++++"}
      </>
      )}
    </Typography>
    </div>
  );
}

export default function About() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <TypographyDemo loading />
          </div>
          <div className="col">
            <TypographyDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
