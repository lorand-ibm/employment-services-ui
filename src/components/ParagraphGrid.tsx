import React from "react";
import Grid from "@material-ui/core/Grid";
import { ParagraphWidth } from "../types";

const FullParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0", zIndex: 10 }} xs={12}>
      {children}
    </Grid>
  </Grid>
);

const WideParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto", zIndex: 10 }} xs={12}>
      {children}
    </Grid>
  </Grid>
);

const NarrowParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto", zIndex: 10 }} xs={12} md={8}>
      {children}
    </Grid>
  </Grid>
);

export const NarrowLargerParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto", zIndex: 10 }} xs={12} md={9}>
      {children}
    </Grid>
  </Grid>
);

export const ParagraphGrid = ({
  className,
  paragraphWidth,
  children,
}: {
  className: string;
  paragraphWidth: ParagraphWidth;
  children: any;
}) => {
  if (paragraphWidth === "Wide") {
    return <WideParagraphGrid className={className}>{children}</WideParagraphGrid>;
  }
  if (paragraphWidth === "Full") {
    return <FullParagraphGrid className={className}>{children}</FullParagraphGrid>;
  }
  return <NarrowParagraphGrid className={className}>{children}</NarrowParagraphGrid>;
};
