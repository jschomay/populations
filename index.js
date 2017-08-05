import { h, app } from "hyperapp";
import data from "./data.json";

// given discrete data
const pigPopluations = data["PIG POPULATIONS"];
const islands = ["HAWAII", "MAUI", "OAHU", "KAUAI", "MOLOKAI", "LANAI", "NIIHAU", "KAHOOLAWE"];
const firstYear = 2000;
const lastYear = 2005;
const speedChangeAmount = 0.5;
const minSpeed = 0.5;
const maxSpeed = 5;

const byYear = (year, data) => data.filter(point => point["YEAR"] == year);
const byIsland = (island, data) => data.filter(point => point["ISLAND"] == island);
const getPopulation = (year, island) => byIsland(island, byYear(year, pigPopluations))[0]["WILD PIG POPULATION"];

// helpers
const range = (min, max) => Array.apply(null, Array(max - min)).map((_, i) => i + min);
const getParam = param => {
  let value = location.search.slice(1).split("&").filter((s) => s.split("=")[0] == param )[0];
  return value && value.split("=")[1];
}
const validYear = (year) => {
  let y = parseInt(year);
  return y >= firstYear && y <= lastYear ? y : undefined;
}
const validSpeed = (year) => {
  let y = parseFloat(year);
  return y >= minSpeed && y <= maxSpeed ? y : undefined;
}

// app
// using hyperapp (https://hyperapp.js.org/), a 1kb version of redux + react (stateless components)
const state = {
  currentYear: validYear(getParam("year")) || firstYear,
  playing: getParam("pause") ? false : true,
  speed: validSpeed(getParam("speed")) || 2,
  lastFrameTimeStamp: performance.now()
}

app({
  state: state,
  view: ({currentYear, playing, speed}, actions) => {
    let addIslandTile = name => <IslandTile island={name} population={getPopulation(currentYear, name)} />;

    return (
      <div>
        <div class="play-controls-wrapper">
          <PlayControls
            playing={playing}
            speed={speed}
            toggle={actions.togglePlay}
            slower={() => actions.changeSpeed(1)}
            faster={() => actions.changeSpeed(-1)}
          />
        </div>
        <div class="timeline-wrapper">
          <Timeline minYear={firstYear} maxYear={lastYear} currentYear={currentYear} />
        </div>
        <div class="populations">
          { islands.map(addIslandTile) }
        </div>
        <footer>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></footer>
      </div>
    )
  },
  actions: {
    tick: ({playing, currentYear, lastFrameTimeStamp, speed}, actions, currentTimeStamp) => {
      if (playing) requestAnimationFrame(actions.tick);

      if(currentTimeStamp - lastFrameTimeStamp > (1000 * speed)) {
        return {
          currentYear: currentYear == lastYear ? firstYear : currentYear + 1,
          lastFrameTimeStamp: currentTimeStamp
        }
      } else {
        return {}
      }
    },

    togglePlay: ({playing}, actions) => {
      if (!playing) requestAnimationFrame(actions.tick);
      return { playing: !playing }
    },

    changeSpeed: ({speed}, actions, direction = 1) => {
      return { speed: Math.min(maxSpeed, Math.max(minSpeed, speed + (speedChangeAmount * direction))) }
    }
  },
  events: {
    init: (state, actions) => actions.tick()
  }
});


// components

const PlayControls = ({playing, speed, slower, toggle, faster}) => {
  let modifier = playing ? "play-controls__toggle--pause" : "play-controls__toggle--play"

  return (
    <div class="play-controls">
      <div class="play-controls__buttons">
        <div onclick={slower} class="u-pushable play-controls__speed">-</div>
        <div onclick={toggle} class={"u-pushable play-controls__toggle " + modifier}></div>
        <div onclick={faster} class="u-pushable play-controls__speed">+</div>
      </div>
      <div class="play-controls__yps">({speed} seconds/year)</div>
    </div>
  )
}

const Timeline = ({minYear, maxYear, currentYear}) => {
  let years = range(minYear, maxYear + 1);

  return (
    <div class="timeline">
      <div class="timeline__indicator-wrapper">
        <div class="timeline__indicator" style={{marginLeft: 100 * (currentYear - minYear) / (maxYear - minYear) + "%"}}></div>
      </div>
      <div class="timeline__legend">
        { years.map((year, i) => <span class="timeline__year" style={{marginLeft: 100 * i / (years.length - 1) + "%"}}>{year}</span>) }
      </div>
    </div>
    )
}

const IslandTile = ({island, population}) => {
  let thousands = Math.floor(population / 1000);
  let remainder = (population % 1000) / 1000;
  let pigEl = percent =>
        <div class="island-tile__pig-wrapper">
          <div class="island-tile__pig" style={{width: (percent * 100) + "%"}}></div>
        </div>

  return (
    <div class="island-tile">
      <h3 class="island-tile__name">
        { island }
        <span class="island-tile__population">({population})</span>
      </h3>
      <div class="island-tile__pigs">
        {range(0, thousands).map(i => pigEl(1))}
        {pigEl(remainder)}
      </div>
    </div>
    )
}

