<template>
  <div>
    <div v-show="stores.length === 0">
      No stores found.
    </div>
    <div v-show="stores.length !== 0">
      <div>{{ stores.length }} stores found</div>
      <ag-grid-vue
        style="width: 100%; max-width: 1350px; height: 500px; margin: 0 auto"
        class="ag-theme-alpine"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="stores"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AgGridVue } from 'ag-grid-vue';

@Component({
  components: {
    AgGridVue,
  },
})
export default class StoreViewer extends Vue {
  @Prop({ default: [] }) private stores: [];

  gridOptions: { [key: string]: unknown } = {};
  gridApi: any;
  gridColumnApi: any;

  defaultColDef = {
    resizable: true,
    cellStyle: () => {
      return { 'text-align': 'left' };
    },
  };

  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  }

  columnDefs = [
    {
      field: 'addressName',
      width: '250px',
    },
    {
      field: 'distance',
      width: '150px',
      cellRenderer: (params: { node: { data: Record<string, unknown> } }) => {
        return `${params.node.data?.distance} meters`;
      },
    },
    {
      field: 'travelInfo.distance',
      cellRenderer: (params: { node: { data: Record<string, unknown> } }) => {
        const travelInfo = params.node.data?.travelInfo as any;
        if (!travelInfo) return '<em>Choose vehicle</em>';
        return `${travelInfo.distance} meters`;
      },
    },
    {
      field: 'travelInfo',
      cellRenderer: (params: { node: { data: Record<string, unknown> } }) => {
        const travelInfo = params.node.data?.travelInfo as any;
        if (!travelInfo) return '<em>Choose vehicle</em>';

        return `${Math.ceil(travelInfo?.duration / 60) || '?'} minutes using ${
          travelInfo?.vehicle
        }`;
      },
    },
    {
      field: 'location',
      cellRenderer: (params: { node: { data: Record<string, unknown> } }) => {
        const { latitude, longitude } = params.node.data;
        const mapsUrl = `https://www.google.com/maps/search/(${latitude},${longitude})`;
        return `<a href="${mapsUrl}" target="_blank" rel="noopener">(${latitude}, ${longitude})</a>`;
      },
    },
    { field: 'todayOpen', width: '150px' },
    { field: 'todayClose', width: '150px' },
  ];

  constructor() {
    super();
    this.stores = [];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
