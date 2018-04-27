import React, { PureComponent } from 'react';

import VirtualList from '../src/VirtualList';

const makeItems = (count) => {
  const items = [];

  for (let i = 0; i < count; i++) {
    items[i] = makeItem(i);
  }

  return items;
};

const makeItem = (i) => ({
  id: i,
  title: `Media heading #${i+1}`,
  text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.',
});

class Demo extends PureComponent {
  constructor() {
    super();

    const defaultItemCount = 100000;

    const items = makeItems(defaultItemCount);

    const state = {
      itemHeight: 100,
      itemCount: defaultItemCount,
      items: items,
      container: window,
      containerHeight: 250,
      itemBuffer: 0,
    };

    this.state = state;
  };

  update = (e) => {
    console.log('update', e, this.refs);

    const itemCount = parseInt(this.refs.itemCount.value, 10);

    let items = this.state.items;

    // Don't want to recreate items unless itemCount changes!
    if (this.state.itemCount !== itemCount) {
      items = makeItems(itemCount);
    }

    const contained = this.refs.contained.checked;

    const state = {
      itemHeight: parseInt(this.refs.itemHeight.value, 10),
      itemCount: itemCount,
      items: items,
      container: contained ? this.refs.container : window,
      containerHeight: parseInt(this.refs.containerHeight.value, 10),
      itemBuffer: parseInt(this.refs.itemBuffer.value, 10),
    };

    this.setState(state);
  };

  render() {
    const contained = this.state.container !== window;

    return (
      <div>
        <div role="form" className="form-horizontal">
          <div className="form-group">
            <label className="col-xs-6 col-sm-2" htmlFor="contained">Contained</label>
            <div className="col-xs-6 col-sm-4">
              <input onChange={this.update} className="form-control" type="checkbox" checked ={contained} id="contained" ref="contained" />
            </div>
            <label className="col-xs-6 col-sm-2" htmlFor="containerHeight">Container Height</label>
            <div className="col-xs-6 col-sm-4">
              <input onChange={this.update} className="form-control" type="number" min="0" max="10000" value={this.state.containerHeight} id="containerHeight" ref="containerHeight" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-6 col-sm-2" htmlFor="itemHeight">Item Height</label>
            <div className="col-xs-6 col-sm-4">
              <input onChange={this.update} className="form-control" type="number" min="0" value={this.state.itemHeight} id="itemHeight" ref="itemHeight" />
            </div>
            <label className="col-xs-6 col-sm-2" htmlFor="itemCount">Item Count</label>
            <div className="col-xs-6 col-sm-4">
              <input onChange={this.update} className="form-control" type="number" min="0" value={this.state.itemCount} id="itemCount" ref="itemCount" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-6 col-sm-2" htmlFor="scrollDelay">Item Buffer</label>
            <div className="col-xs-6 col-sm-4">
              <input onChange={this.update} className="form-control" type="number" min="0" value={this.state.itemBuffer} id="itemBuffer" ref="itemBuffer" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12" ref="container" style={contained ? { overflow: 'scroll', height: this.state.containerHeight } : {}}>
            <VirtualList
              items={this.state.items}
              itemBuffer={this.state.itemBuffer}
              itemHeight={this.state.itemHeight}
              container={this.state.container}>
              {virtual => {
                return (
                  <ul className="media-list list-group" style={virtual.style}>
                    {virtual.items.map((item) => (
                      <li key={item.id} className="list-group-item" style={{height: this.state.itemHeight }}>
                        <div className="media-left">
                          <img className="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2ODc1IiB5PSIzMiIgc3R5bGU9ImZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjY0eDY0PC90ZXh0PjwvZz48L3N2Zz4=" />
                        </div>
                        <div className="media-body">
                          <h4 className="media-heading">{item.title}</h4>
                          <p>{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              }}
            </VirtualList>
          </div>
        </div>
      </div>
    );
  };
}

export default Demo;
