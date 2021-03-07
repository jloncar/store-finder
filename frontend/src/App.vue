<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <HelloWorld />
    <LatLong @findStores="findStores" />
    <StoreViewer :stores="stores" />
  </div>
</template>

<script lang="ts">
declare let process: any;
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import LatLong from './components/LatLong.vue';
import StoreViewer from './components/StoreViewer.vue';

export interface QueryParams {
  latitude?: number;
  longitude?: number;
  limit?: number;
  vehicle?: string | null;
}

@Component({
  components: {
    HelloWorld,
    LatLong,
    StoreViewer,
  },
})
export default class App extends Vue {
  stores = [];

  findStores({ latitude, longitude, limit, vehicle }: QueryParams) {
    const query = `
    query getStores($latitude: Float, $longitude: Float, $limit: Int, $vehicle: Vehicle) {
      stores(latitude: $latitude, longitude: $longitude, limit: $limit, vehicle: $vehicle) {
        addressName
        distance
        travelInfo {
          vehicle
          distance
          duration
        }
        latitude
        longitude
        todayOpen
        todayClose
      }
    }`;
    fetch(process.env.VUE_APP_BACKEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { latitude, longitude, limit, vehicle },
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.errors) {
          alert(
            data.errors.reduce((errorString: string, error: { message: string }) => {
              errorString += error.message;
              return errorString;
            }, ''),
          );
          return;
        }
        this.stores = data.data.stores;
      });
  }
}
</script>

<style lang="scss">
@import '../node_modules/ag-grid-community/dist/styles/ag-grid.css';
@import '../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
