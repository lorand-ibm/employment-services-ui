import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Navigation, Button } from "hds-react/components";
import axios from "axios";

import { drupalUrl, getAppName } from "./config";
import { Lang } from "./types";

const findSubmenu = (m: any, id: any) => {
  const subs: any = [];
  m.data.data.map((item: any) => {
    if (item.attributes.parent === "menu_link_content:" + id) {
      subs.push({
        name: item.attributes.title,
        link: item.attributes.link.uri,
        items: findSubmenu(m, item.attributes.link.uri),
        weight: item.attributes.weight,
      });
    }
    return subs;
  });
  const subs2 = orderBy(subs, ["weight"], ["asc"]);
  return subs2;
};

export const makeMenu = (menuRes: any) => {
  const menu: any = [];
  if (!!!menuRes || !!!menuRes.data) {
    console.log("no menus");
    return menu;
  }
  menuRes.data.data.map((item: any, index: number) => {
    if (!item.attributes.parent) {
      menu.push({
        name: item.attributes.title,
        link: item.attributes.link.uri,
        items: findSubmenu(menuRes, item.id),
        weight: item.attributes.weight,
      });
    }
    return menu;
  });
  const menu2 = orderBy(menu, ["weight"], ["asc"]);
  return menu2;
};

const useStyles = makeStyles((theme) => ({
  navi: {
    zIndex: 10000,
    fontFamily: "HelsinkiGrotesk",
    fontSize: 16,
  },
  navButton: {
    backgroundColor: "transparent !important",
    color: "var(--color-bus) !important",
    borderColor: "var(--color-bus) !important",
  },
}));

interface NavProps {
  lang: Lang;
  changeLang: (lang: Lang) => void;
}

function Nav(props: NavProps) {
  const { lang, changeLang } = props;

  const [menu, setMenu] = useState(null);
  const classes = useStyles(props);
  const menuData = drupalUrl + "/apijson/menu_link_content/menu_link_content/?filter[menu_name]=main-" + lang;

  const eServiceTexts: { text: string; link: string } =
    lang === "sv"
      ? {
          text: "E-Tjänster",
          link: "https://asiointi.mol.fi/omaasiointi/?kieli=sv",
        }
      : lang === "fi"
      ? {
          text: "Oma asiointi",
          link: "https://asiointi.mol.fi/omaasiointi/",
        }
      : {
          text: "E-Services",
          link: "https://asiointi.mol.fi/omaasiointi/",
        };

  useEffect(() => {
    const getMenu = async () => {
      const res = await axios.get(menuData);
      const menu = makeMenu(res);
      setMenu(menu);
    };
    getMenu();
  }, [lang]);

  const getNavi = (menu: any, lang: string) => {
    let nav: any = [];
    if (!!!menu) {
      return <></>;
    }

    menu.map((item: any, index: number) => {
      let subs: any = [];
      item.items.map((sub: any, i: number) => {
        subs.push(
          <Navigation.Item
            key={i}
            as="a"
            href={"/" + lang + "/" + sub.link.substr(10)}
            label={sub.name}
            onClick={function noRefCheck() {}}
          />
        );
        return subs;
      });
      nav.push(
        <Navigation.Dropdown label={item.name} key={index}>
          {subs}
        </Navigation.Dropdown>
      );
      return nav;
    });
    return nav;
  };

  if (!menu) {
    return <></>;
  }

  return (
    <Navigation
      className={classes.navi}
      logoLanguage={lang === "sv" ? "sv" : "fi"}
      menuToggleAriaLabel="Menu"
      skipTo="#content"
      skipToContentLabel="Skip to main content"
      theme={{
        "--header-divider-color": "white",
      }}
      title={getAppName(lang)}
      titleAriaLabel="Helsinki: Työllisyyspalvelut"
      titleUrl={`/${lang}`}
    >
      <Navigation.Actions>
        <Navigation.LanguageSelector label={lang.toUpperCase()}>
          <Navigation.Item
            href="#"
            label="Suomeksi"
            onClick={(e: any) => {
              e.preventDefault();
              changeLang("fi");
            }}
          />
          <Navigation.Item
            href="#"
            label="På svenska"
            onClick={(e: any) => {
              e.preventDefault();
              changeLang("sv");
            }}
          />
          <Navigation.Item
            href="#"
            label="In English"
            onClick={(e: any) => {
              e.preventDefault();
              changeLang("en");
            }}
          />
        </Navigation.LanguageSelector>
      </Navigation.Actions>
      <Navigation.Row>
        {getNavi(menu, lang)}
        <div style={{ marginLeft: "auto" }}>
          <Button
            className={classes.navButton}
            size="small"
            variant="secondary"
            onClick={() => {
              window.location.href = eServiceTexts.link;
            }}
          >
            {eServiceTexts.text}
          </Button>
        </div>
      </Navigation.Row>
    </Navigation>
  );
}

export default Nav;
