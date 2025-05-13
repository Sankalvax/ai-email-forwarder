import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import HeroList from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Mail24Regular, DocumentData24Regular, Production24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { title } = props;
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems = [
    {
      icon: <Mail24Regular />,
      primaryText: "Forward Email",
    },
    {
      icon: <DocumentData24Regular />,
      primaryText: "Extract Data",
    },
    {
      icon: <Production24Regular />,
      primaryText: "process Data",
    },
  ];

  return (
    <div className={styles.root}>
      <Header logo="assets/sankalvax.png" title={title} message="SankalvaX" />
      <HeroList message="Forward any email with attachments to our AI app, and it will instantly extract, process, and act on the data." items={listItems} />
      <TextInsertion insertText={insertText} />
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
