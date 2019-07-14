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
    this._hasHeader = this.getAttribute("hasHeader");
  }

  render() {
    const values = this._values.map(value => value);
    let firstValuePosition = 0;
    let header = '';
    if (this._hasHeader) {
      let headerValues = values[0].reduce((result, col) => { return result += `<th>${col}</th>` }, '');
      header = `<thead><tr>${headerValues}</tr></thead>`;
      firstValuePosition = 1;
    }

    let body = '';
    for (let i = firstValuePosition; i < values.length; i++) {
      const line = values[i];
      body += '<tr>';
      line.forEach(col => body += `<td>${col}</td>`)
      body += '</tr>';
    }

    this.shadowRoot.innerHTML = `
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        
        thead th {
          border-top: 1px solid lightgray;
          border-bottom: 2px solid lightgray;
          text-align: left;
        }
        
        th, td {
          padding: 5px;
          border-top: 1px solid lightgray;
        }
        
        tbody tr:hover {
          background: rgb(220, 220, 220, 0.3);
        }
        
        tbody tr:first-child td {
          border-top: none;
        }
      </style>
      <table>
        ${header}
        <tbody>
          ${body}
        </tbody>
      </table >
  `;
  }
}
window.customElements.define("table-component", TableComponent);
