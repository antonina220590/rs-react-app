# Performance analysis

## Initial Profiling

### Sorting by population

- **Commit duration** - 25.1 ms
- **Render Duration:**
  - **CountriesList** - 5.1 ms out of 25.1ms
  - **CountryCard** - the first CountryCard has a render time of 1.1 ms due to initial render (style calculation, etc.),the subsequent CountryCards have a render time of approximately 0.1 to 0.9 ms. Although these individual times are small, the _cumulative_ effect of re-rendering all 250 CountryCard components is the primary contributor to the overall commit duration.
  - **Other** - the render time of other components (e.g. searchInput, dropDown) is approximately 0.1 ms or less.
- **Interactions** - clicking the sort button triggers a "sort" interaction. This interaction causes a state change in CountriesList (sortOrder), which in turn triggers the re-render.
- **Flame Graph** - [Flamegraph](/public/sorting1_Flamechart.jpg)
  Here we can see that CountriesList and all its child CountryCard components re-render on each sort.
- **Ranked Chart** - [RankedChart](/public/sorting1_ranckedChart.jpg)

### Filtering by region (from All to Americas)

This section details the profiling results for filtering the country list by region, specifically changing the filter from "All" to "Americas," _before_ implementing any performance optimizations (`useMemo`, `React.memo`, `useCallback`).

- **Commit duration** - ~31.5ms - This is the total time for React to process the filter change, re-render the components, and update the DOM.
- **Render Duration:**
  - **CountriesList** - ~12ms.
  - **CountryCard** - render times ranging from 0.1ms to 0.2ms.
  - **DropDownElement** - the render time of 1 ms due to change of region name.
  - **Others** - the render time of other components (e.g. searchInput) is approximately 0.1 ms or less.
- **Interactions** - Clicking an option in the `DropDownElement` triggers a "region selection" interaction, causing a state change (`selectedRegion`) in `CountriesList` and leading to the re-render.
- **Flame Graph** - [Flamegraph](/public/filtering1_Flamegraph.jpg)
- **Ranked Chart** - [RankedChart](/public/filtering1_RankedChart.jpg)

### Searching by name (search for the Island as example)

In my application searching is implemented using `filter` method, making it directly analogous to the region filtering. As my search is happening on Input change and I receive 6 commits (1 commit for each letter), I will analize only the first one.

- **Commit duration** - 9.1 ms
- **Render Duration:**
  - **CountriesList** - ~1.4ms
  - **CountryCard** - render times ranging from 0.1ms to 1.5ms. The "Why did this render?" panel confirms that the `onToggleVisited` prop is changing, forcing re-renders even when the country data itself hasn't changed. This is due to the creation of a new `handleToggleVisited` function on every render of `CountriesList` (no `useCallback`).
  - **Others** - the render time of other components (e.g. searchInput) is approximately 0.1 ms or less.
- **Interactions:** Typing into the `SearchInput` triggers "search" interactions, updating the `searchQuery` state in `CountriesList`.
- **Flame Graph** - [Flamegraph](/public/searhing1_Flamegraph.jpg)
- **Ranked Chart** - [RankedChart](/public/searching1_RanckedChart.jpg)

## After optimization profiling

- `useMemo` was used to memoize the `searchedCountries`, `filteredCountries`, and `sortedCountries` calculations in `CountriesList`.
- `useCallback` was used to memoize the `handleToggleVisited` function in `CountriesList`.
- `React.memo` was used to memoize the `CountryCard`, `SearchInput`,`SortCountries` and `DropDownElement` components.
- The application was profiled while clicking the sort button (ascending/descending population).
- All countries were set as "unvisited".

### Sorting by population

- **Commit duration** - ~7.5ms. This is a significant improvement compared to the ~25.1 ms commit duration observed _without_ memoization.
- **Render Duration:**
  - **CountriesList:** ~3.3ms.
  - **CountryCard:** The Flame Graph shows a significant reduction in `CountryCard` re-renders. Only components that actually change position due to sorting will re-render. In this particular commit we don't see any re-renders of `CountryCard`. This is because the list was likely already sorted in the desired order, so the `sortedCountries` array didn't change, and `React.memo` correctly prevented unnecessary re-renders.
  - **SortCountries (Memoized):** ~0.1ms. The component re-renders because the `sortOrder` prop changes, but its render time is very small.
- **Interactions:** Clicking the sort button triggers a "sort" interaction,updating the `sortOrder` state in `CountriesList`.
- **Flame Graph** - [Flamegraph](/public/sorting2_Flamechart.jpg)
- **Ranked Chart** - [RankedChart](/public/sorting2_Ranckedchart.jpg)

### Filtering by region (from All to Americas)

- **Commit duration** - ~3.3ms which is significantly less than it was in initial profiling (~31.5ms);
- **Render Duration:**
  - **CountriesList:** ~1.5ms.
- **CountryCard:** - In this particular commit we don't see any re-renders of `CountryCard`. This is because the list was likely already sorted in the desired order, so the `sortedCountries` array didn't change, and `React.memo` correctly prevented unnecessary re-renders.
- **DropDownElement (Memoized):** ~0.3ms
  **Interactions:** Changing the selected region in the `DropDownElement` triggers a "region selection" interaction, updating the `selectedRegion` state in `CountriesList`.
- **Flame Graph** - [Flamegraph](/public/filtering2_Flamegraph.jpg)
- **Ranked Chart** - [RankedChart](/public/filtering2_RankedChart.jpg)

### Searching by name (search for the Island as example)

As my search is happening on Input change and I receive 6 commits (1 commit for each letter), I will analize only the first one.

- **Commit duration** - ~5.3ms. Initially it was 9.1 ms.
- **Render Duration:**
  - **CountriesList:** ~3.2ms.This includes the time to run the memoized search logic (which only re-executes when `searchQuery` or the base `countries` data changes) and to render the component structure.
  - **CountryCard:** - In this particular commit we don't see any re-renders of `CountryCard`. This is because the list was likely already sorted in the desired order, so the `sortedCountries` array didn't change, and `React.memo` correctly prevented unnecessary re-renders.
  - **SearchInput2` (Memoized):** ~0.2ms.
- **Interactions:** Typing into the `SearchInput` triggers a "search" interaction, updating the `searchQuery` state in `CountriesList`.
- **Flame Graph** - [Flamegraph](/public/searching2_Flamegraph.jpg)
- **Ranked Chart** - [RankedChart](/public/searching2_Rankedchart.jpg)

### Conclusion:

The implemented optimizations (useMemo, useCallback, and React.memo) have effectively addressed the main performance bottlenecks:

- Prevented unnecessary re-renders of CountryCard components.
- Memoized expensive calculations in CountriesList.
- Optimized the handleToggleVisited function to prevent it from causing re-renders.
