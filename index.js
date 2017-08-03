import { h, app } from "hyperapp";
import data from "./data.json";

// given discrete data
const pigPopluations = data["PIG POPULATIONS"];
const islands = ["HAWAII", "MAUI", "OAHU", "KAUAI", "MOLOKAI", "LANAI", "NIIHAU", "KAHOOLAWE"];
const firstYear = 2000;
const lastYear = 2005;

const byYear = (year, data) => data.filter(point => point["YEAR"] == year);
const byIsland = (island, data) => data.filter(point => point["ISLAND"] == island);
const getPopulation = (year, island) => byIsland(island, byYear(year, pigPopluations))[0]["WILD PIG POPULATION"];

const state = {
  year: firstYear
}

// using hyperapp (https://hyperapp.js.org/), a 1kb version of redux + react (stateless components)
app({
  state: state,
  view: (state, actions) => {
    let addIslandTile = name => <IslandTile island={name} population={getPopulation(state.year, name)} />;

    return (
      <div>
        <button onclick={actions.up}>{state.year}</button>
        <div class="timeline-wrapper">
          <Timeline minYear={firstYear} maxYear={lastYear} currentYear={state.year} />
        </div>
        <div class="populations">
          { islands.map(addIslandTile) }
        </div>
      </div>
    )
  },
  actions: {
    up: ({year}) => ({year: year == lastYear ? firstYear : year + 1})
  }
});

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
