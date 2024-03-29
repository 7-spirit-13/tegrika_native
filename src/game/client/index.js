
import React from 'react';
import ReactDOM from 'react-dom';
import Bridge from '@vkontakte/vk-bridge';

import { Events } from './core/Constants';
import { cs } from './core/Utils';
import panels from './panels/';

import Core from './core/Core';

import './styles/index.scss';

function Root() {
  const [state, setState] = React.useState({
    panel: "preload",
    panel_props: {}
  });

  React.useEffect(() => {
    return Core.Event.addEventListener(Events.OPEN_PANEL, (panel, panel_props) => {
      setState({ ...state, panel, panel_props: {...state.panel_props, [panel]: panel_props} });
    });
  }, [state.panel]);

  React.useLayoutEffect(() => {
    Bridge.send("VKWebAppInit");
  });

  const panel = panels.find(v => v.name == state.panel);
  return (
    <>
      { 
        <div key={panel.name} className={cs("panel", state.panel == panel.name ? "active" : "inactive")}>
          {React.createElement(panel.component, state.panel_props[panel.name])}
        </div>
      }
    </>
  );
}

export default Root;