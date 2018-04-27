import defaultMapVirtualToProps from "../defaultMapVirtualToProps";

const defaultProps = {
  items: [1, 2, 3, 4, 5],
  itemHeight: 100
};

const defaultState = {
  firstItemIndex: 0,
  lastItemIndex: 4
};

describe("function to convert state and props into virtual props", () => {
  it("is a function", () => {
    expect(typeof defaultMapVirtualToProps).toBe("function");
  });

  it("returns object with items prop", () => {
    const props = defaultMapVirtualToProps(defaultProps, defaultState);

    expect(props).toBeDefined();
    expect(props.items).toBeDefined();
  });

  it("returns object with style prop", () => {
    const props = defaultMapVirtualToProps(defaultProps, defaultState);

    expect(props).toBeDefined();
    expect(props.style).toBeDefined();
    expect(props.style.height).toBeDefined();
    expect(props.style.paddingTop).toBeDefined();
  });

  it("calculates items properly", () => {
    const props = defaultMapVirtualToProps(defaultProps, defaultState);

    expect(props.items).toHaveLength(5);
  });

  it("calculates style properly", () => {
    const props = defaultMapVirtualToProps(defaultProps, defaultState);

    expect(props.style.height).toBe(500);
    expect(props.style.paddingTop).toBe(0);
  });
});
