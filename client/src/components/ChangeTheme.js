import React from "react";
import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import ThemeItem from "./ThemeItem";


// const THEMES = [
//   { primaryColor: "deepskyblue", secondaryColor: "coral" },
//   { primaryColor: "orchid", secondaryColor: "mediumseagreen" },
// ];
export default function ChangeTheme({ theme, setTheme }) {

  // const [themes, setThemes] = useState([]);
  // console.log(themes)
  // useEffect(() => {
  //   fetch("/api/themes")
  //     .then((res) => res.json())
  //     .then((themes) => setThemes(themes));
  // }, []);
  // console.log(themes)


  const [themes, getThemes] = useResource(() => ({
    url: "/themes",
    method: "get",
  }));
  console.log(themes)


  const { data, isLoading } = themes;


  useEffect(getThemes, []);


  function isActive(t) {
    return (
      t.primaryColor === theme.primaryColor &&
      t.secondaryColor === theme.secondaryColor
    );
  }
  return (
    <div>
      {isLoading && " Loading themes..."}
      Change theme:
      {data &&
        data.map((t, i) => (
          <ThemeItem
            key={"theme-" + i}
            theme={t}
            active={isActive(t)}
            onClick={() => setTheme(t)}
          />
        ))}{" "}
    </div>
  );
}



