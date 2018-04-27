import ShallowRenderer from "react-test-renderer/shallow";
import React from "react";

import VirtualList from "../VirtualList";

const items = Array.apply(null, { length: 1000 }).map(Number.call, Number);

const childrenFunction = jest.fn();
childrenFunction.mockReturnValue(null);

describe("higher-order component that only renders visible items", () => {
  it("is a class (function)", () => {
    expect(typeof VirtualList).toBe("function");
  });

  it("calls the children function", () => {
    const renderer = ShallowRenderer.createRenderer();

    renderer.render(
      <VirtualList items={items} itemHeight={100}>
        {childrenFunction}
      </VirtualList>
    );

    const result = renderer.getRenderOutput();

    expect(childrenFunction).toBeCalled();
  });

  it("provides an object with items array and style object", () => {
    const renderer = ShallowRenderer.createRenderer();

    renderer.render(
      <VirtualList items={items} itemHeight={100}>
        {childrenFunction}
      </VirtualList>
    );

    const result = renderer.getRenderOutput();

    expect(childrenFunction).toBeCalledWith(
      expect.objectContaining({
        items: expect.any(Array),
        style: expect.any(Object)
      })
    );
  });

  it("uses initialState options", () => {
    const container = {
      clientHeight: 500,
      offsetTop: 0
    };

    const initialState = {
      firstItemIndex: 0,
      lastItemIndex: 4,
      style: {
        height: 500,
        paddingTop: 0
      }
    };

    const renderer = ShallowRenderer.createRenderer();

    renderer.render(
      <VirtualList
        items={items}
        itemHeight={100}
        container={container}
        initialState={initialState}
      >
        {childrenFunction}
      </VirtualList>
    );

    const result = renderer.getRenderOutput();

    expect(childrenFunction).toBeCalledWith(
      expect.objectContaining({
        items: items.slice(0, 5)
      })
    );
  });

  it("allows custom mapVirtualToProps", () => {
    const container = {
      clientHeight: 500,
      offsetTop: 0
    };

    const options = {
      container,
      initialState: {
        firstItemIndex: 0,
        lastItemIndex: 4
      }
    };

    const mapVirtualToProps = jest.fn();

    const renderer = ShallowRenderer.createRenderer();

    renderer.render(
      <VirtualList
        items={items}
        itemHeight={100}
        mapVirtualToProps={mapVirtualToProps}
      >
        {childrenFunction}
      </VirtualList>
    );

    const result = renderer.getRenderOutput();

    expect(mapVirtualToProps).toBeCalled();
  });
});
