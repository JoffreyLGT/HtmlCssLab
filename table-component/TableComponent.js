class TableComponent extends HTMLElement {
  get values() {
    return this._values;
  }

  set values(val) {
    this._values = val;
    this.render();
  }

  // Called when the element is constructed
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._values = [];
  }

  render() {
    const values = this._values.map(value => value);
    let header = values[0].reduce((result, col) => { return result += `<th>${col}</th>` }, '');
    let body = '';
    for (let i = 1; i < values.length; i++) {
      const line = values[i];
      body += '<tr>';
      line.forEach(col => body += `<td>${col}</td>`)
      body += '</tr>';
    }
    this.shadowRoot.innerHTML = `
      <table>
      <thead>
        <tr>
          ${header}
        </tr>
      </thead >
        <tbody>
          ${body}
        </tbody>
      </table >
  `;
  }
}
window.customElements.define("table-component", TableComponent);
