import { h, app } from "hyperapp";
import data from "./data.json";

const pigPopluation = data["PIG POPULATIONS"];

const byYear = (year, data) => data.filter(point => point["YEAR"] == year);
const byIsland = (island, data) => data.filter(point => point["ISLAND"] == island);
const getPopulation = (year, island) => byIsland(island, byYear(year, pigPopluation))[0]["WILD PIG POPULATION"];

var state = {
  year: 2000
}

app({
  state: state,
  view: (state, actions) => {
    const addIsland = name => <IslandTile island={name} population={getPopulation(state.year, name)} />;

    return (
      <div>
        <button onclick={actions.up}>{state.year}</button>
        <div class="populations">
          {addIsland("HAWAII")}
          {addIsland("MAUI")}
          {addIsland("OAHU")}
          {addIsland("KAUAI")}
          {addIsland("MOLOKAI")}
          {addIsland("LANAI")}
          {addIsland("NIIHAU")}
          {addIsland("KAHOOLAWE")}
        </div>
      </div>
    )
  },
  actions: {
    up: ({year}) => ({year: year + 1})
  }
});

const IslandTile = ({island, population}) =>
  <div class="island-tile">
    <h3 class="island-tile__name">{ island }</h3>
    <div class="island-tile__population">{ population }</div>
  </div>
