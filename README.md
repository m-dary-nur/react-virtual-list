# react-virtual-list
lightweight and flexible React Virtualized-listist Component Wrapper (support for React v16.8 ~ v16.13.1).

`react-virtual-list` help you virtualizing list for better performance and memory.

### Benefits:
* Zero dependency (no dependencies needed)
* Very small library [ 1.8kB minified + gzipped !](https://bundlephobia.com/result?p=@m-dary-nur/react-virtual-list)
* Keep your components as a higher-order component
* Very flexible - `react-virtual-list` just wrapped your map components and it will helps your component manage virtualizing your map list.

## Installation

use yarn:

```console
> yarn add @m-dary-nur/react-virtual-list
```
or use npm:

```console
> npm install @m-dary-nur/react-virtual-list --save
```

## Usage

The `react-virtual-list` module only exports a single file.

```js
import VListWrapper from "@m-dary-nur/react-virtual-list";
```

Your inner component uses the `react-virtual-list` props to render the visible items and set a class and style to set the overall list.

```js

const bigList = [{id: 1, name: "andi"}, {id: 2, name: "budi"}, ...., {id:99999, name: "zibi"}];

<VListWrapper 
  width="100%" // or width={100} (optional / not required)
  height="100%" // or height={500} (optional / not required) 
  items={bigList} // (required)
  itemHeight={40} // default itemHeight={50} (optional / not required) 
  itemBuffer={5} // default itemBuffer={2} (optional / not required) 
>
  {({ indexStart, items, itemStyle }) => (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
        </tr>
      <thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td>{indexStart + index + 1}</td> // its important for get numbering each item row
            <td style={itemStyle}>{item.name}</td> // add itemStyle on item row to set height offset (required)
          <tr>
        ))}
      </tbody>
    <table>
  )}
</VListWrapper>
```

**Note:** You should set `itemStyle` props for each item its require for virtualization. 

that's it ! so simple.

#### VListWrapper properties

properties are used for setup `react-virtual-list`.

Name | Type | Default | Description
--- | --- | --- | ---
`items` | Array | - | Array of your list items.
`itemHeight` | Number | 50 | (optional) Height in pixels for each row item. if not set it will set as 50 pixel height as default.
`itemBuffer` | Number | 2 | () Number of row that should be rendered before and after the visible view.
`height` | Number / String | '100%' | Number / string for set height of `VListWrapper`
`width` | Number / String | '100%' | Number / string for set width of `VListWrapper`

#### Example Usage

[Coming soon but will be here](http://m-dary-nur.github.io/react-virtual-list)

> give a star :star2: if the library help you. :relaxed:
