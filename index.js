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

const state = {
  currentYear: firstYear,
  playing: true,
  speed: 2,
  lastFrameTimeStamp: performance.now()
}

// using hyperapp (https://hyperapp.js.org/), a 1kb version of redux + react (stateless components)
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
  let range = (min, max) => Array.apply(null, Array(max - min + 1)).map((_, i) => i + min);
  let years = range(minYear, maxYear);

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

const IslandTile = ({island, population}) =>
  <div class="island-tile">
    <h3 class="island-tile__name">{ island }</h3>
    <div class="island-tile__population">{ population }</div>
  </div>
