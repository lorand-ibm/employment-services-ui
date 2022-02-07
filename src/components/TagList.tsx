import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(() => ({
  tags: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "-32px",
  },
  tag: {
    backgroundColor: "#ffdbeb",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "12px",
    paddingLeft: "12px",
    marginRight: "12px",
    marginBottom: "8px",
    width: "auto",
  },
}));

export interface TagListProps {
  tags: Array<string>;
}

function TagList(props: TagListProps): JSX.Element {
  const classes = useStyles(props);
  const { tags } = props;
  
  return (
    <>
      {tags.length !== 0 && 
        <List className={classes.tags}>
        {Object.values(tags).map((tag: any, i: number) => (
          <ListItem className={classes.tag}>
            { tag }
          </ListItem>
        ))}
      </List>
      }
    </>
  );
}

export default TagList;
