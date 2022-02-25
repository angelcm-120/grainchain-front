/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { shallowEqual, useSelector } from "react-redux";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { FormattedMessage } from "react-intl";
import { getMenuxUser } from '../../../../../app/modules/Network/Services'


function Menu(menu, layoutProps, eventMenu, child, parentMenu) {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const location = useLocation();

  if (menu.menu === undefined) {
    return <></>
  }
  else {


    const getMenuItemActive = (url, hasSubmenu = false) => {
      return checkIsActive(location, url)
        ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
        : "";
    };



    const menuNav = (menuItem, menu, child) => {
      menuItem.fiCreate = true;
      if (menuItem?.fcURL !== undefined && menuItem?.fiNavLink !== undefined && menuItem?.fiNavLink && menuItem.fiParentMenu === 0) {
        return <li
          key={menuItem.fiMenu}
          className={`menu-item ${getMenuItemActive(menuItem.fcURL, menuItem.fiSubmenu)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to={menuItem.fcURL}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl(menuItem.icon)} />
            </span>
            <span className="menu-text"><FormattedMessage id={menuItem.formattedMessage} /></span>
          </NavLink>
        </li>
      }
      else if (menuItem?.fcURL !== undefined && menuItem?.fiNavLink !== undefined && menuItem?.fiNavLink && menuItem.fiParentMenu > 0) {
        return <li
          key={menuItem.fiMenu}
          className={`menu-item ${getMenuItemActive(menuItem.fcURL, menuItem.fiSubmenu)} `}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to={menuItem.fcURL}>
            <i className={menuItem.icon}>
              <span />
            </i>
            <span className="menu-text"><FormattedMessage id={menuItem.formattedMessage} /></span>
          </NavLink>
        </li>
      }
      else if (menuItem?.fiSeccion !== undefined && menuItem?.fiSeccion) {
        return <li key={menuItem.fiMenu} className="menu-section ">
          <h4 className="menu-text"><FormattedMessage id={menuItem.formattedMessage} /></h4>
          <i className={menuItem.icon}></i>
        </li>
      }
      else if (menuItem.fiHref !== undefined && menuItem.fiHref === true) {
        if (child !== undefined) {
          return <li
            key={menuItem.fiMenu}
            className={`menu-item  ${getMenuItemActive(menuItem.fcURL, menuItem.fiSubmenu)}`}
            aria-haspopup="true"
          >
            <a className="menu-link" target="_blank"
              rel="noopener noreferrer"
              href={`${menuItem.fcURL}${menuItem.fiAppendSecurity !== undefined && menuItem.fiAppendSecurity ? "fis=" + user.id + (user.roles === 1 ? "&Usuario=Administrador" : "") : ""}${menuItem.fiDOC !== undefined && menuItem.fiDOC ? "&Ambiente=Productivo&DMZ=True" : ""}${menuItem.fiAppendUser !== undefined && menuItem.fiAppendUser ? user.id : ""}${menuItem.fcAppendExtension !== undefined ? menuItem.fcAppendExtension : ""}`}
            > <i className={menuItem.icon}>
                <span />
              </i>
              <span className="menu-text"><FormattedMessage id={menuItem.formattedMessage} /></span>
            </a>
          </li>
        }
      }
      else if (menuItem.fiArrow !== undefined && menuItem.fiArrow === true) {

        return (
          <li
            key={menuItem.fiMenu}
            className={`menu-item menu-item-submenu ${getMenuItemActive(menuItem.fcURL, menuItem.fiSubmenu)}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to={menuItem.fcURL}>
              {menuItem.fiArrow && <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl(menuItem.icon)} />
              </span>}
              <span className="menu-text"><FormattedMessage id={menuItem.formattedMessage} /></span>
              {menuItem.fiArrow && <i className="menu-arrow" />}
            </NavLink>
            <div className="menu-submenu ">
              {menuItem.fiArrow && <i className="menu-arrow" />}
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text"><FormattedMessage id={menuItem.formattedMessage} /></span>
                  </span>
                </li>

                {menuItem.fiSubmenu && <SubMenu fiMenu={menuItem.fiMenu} parents={menu} child={menuItem.fiSubmenu} ></SubMenu>}

              </ul>
            </div>
          </li>
        )
      }
    }

    const SubMenu = ({ fiMenu, parents, child }) => {
      if (fiMenu !== undefined && parents.length > 0) {
        if (parents.length > 0) {
          return parents.filter(menuItem => menuItem.fiParentMenu === Number.parseInt(fiMenu)).map(function (x) {
            return menuNav(x, parents, child)
          })
        }
      }
    }


    return (
      menu.menu.length > 0 && menu?.menu?.filter(menuItem => menuItem.fiParentMenu === 0).map(
        function (x) {
          return menuNav(x, menu?.menu)
        }
      ))
  }
}

export function AsideMenuListxUser({ layoutProps }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);  
  const [menu, setMenu] = useState(undefined);

  function refreshMenu() {
    getMenuxUser(user)
      .then(res => res.json())
      .then((result) => {
        if (result.httpstatus === "OK") {
          setMenu(result?.resultados[0]?.menus.sort((a, b) => (a.fiMenu > b.fiMenu) ? 1 : -1))
        }
      }
      )
  }

  useEffect(() => {
    if (menu === undefined) {
      refreshMenu();
    }
  });

  return (
    <ul className={`menu-nav ${layoutProps.ulClasses}`}>
      {menu !== undefined && <Menu menu={menu} layoutProps={layoutProps}></Menu>}
    </ul>
  );
}
