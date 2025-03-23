# Performance analysis

## Initial Profiling

### Sorting by population

- **Commit duration** - 25.1 ms
- **Render Duration:**
  - **CountriesList** - 5.1 ms out of 25.1ms
  - **CountryCard** - the first CountryCard has a render time of 1.1 ms due to initial render (style calculation, etc.),the subsequent CountryCards have a render time of approximately 0.1 to 0.9 ms. Although these individual times are small, the *cumulative* effect of re-rendering all 250 CountryCard components is the primary contributor to the overall commit duration.
  - **Other** - the render time of other components (e.g. searchInput, dropDown) is approximately 0.1 ms or less.
- **Interactions** - clicking the sort button triggers a "sort" interaction. This interaction causes a state change in CountriesList (sortOrder), which in turn triggers the re-render.
- **Flame Graph** - [Flamegraph](/public/sorting1_Flamechart.jpg)
  Here we can see that CountriesList and all its child CountryCard components re-render on each sort.
- **Ranked Chart** - [RankedChart](/public/sorting1_ranckedChart.jpg)


### Filtering by region (from All to Americas)

- **Commit duration** - ~31.5ms - This is the total time for React to process the filter change, re-render the components, and update the DOM.
- **Render Duration:**
  - **CountriesList** - ~12ms.
  - **CountryCard** - render times ranging from 0.1ms to 0.2ms.
  - **DropDownElement** - the render time of 1 ms due to change of region name.
  - **Others** - the render time of other components (e.g. searchInput) is approximately 0.1 ms or less.
- **Interactions** - Clicking an option in the `DropDownElement` triggers a "region selection" interaction, causing a state change (`selectedRegion`) in `CountriesList` and leading to the re-render.
- **Flame Graph** - [Flamegraph](/public/filtering1_Flamegraph.jpg)
- **Ranked Chart** - [RankedChart]()