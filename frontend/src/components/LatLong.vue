<template>
  <form v-on:submit.prevent>
    <p>Please enter your position or allow browser detection.</p>
    <fieldset>
      <label>Latitude</label>
      <input v-model.number="latitude" step="0.00000001" type="number" />
    </fieldset>
    <fieldset>
      <label>Longitude</label>
      <input v-model.number="longitude" step="0.00000001" type="number" />
    </fieldset>
    <fieldset>
      <label>Maximum stores</label>
      <input v-model.number="limit" step="1" type="number" />
    </fieldset>
    <fieldset>
      <label>Vehicle</label>
      <select v-model="vehicle">
        <option v-bind:value="null">---</option>
        <option v-bind:value="'BIKE'">Bike</option>
        <option v-bind:value="'FOOT'">Foot</option>
        <option v-bind:value="'CAR'">Car</option>
      </select>
    </fieldset>
    <button v-on:click="findStores" class="findStoresSubmit">
      Find nearby stores
    </button>
    <button v-on:click="detectLocation" class="detectLocation">Detect my location</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LatLongPicker extends Vue {
  latitude = 51.440238;
  longitude = 5.47648;
  limit = 10;
  vehicle = null;

  findStores() {
    this.$emit('findStores', {
      latitude: this.latitude,
      longitude: this.longitude,
      limit: this.limit,
      vehicle: this.vehicle,
    });
  }

  detectLocation() {
    if (!navigator.geolocation) {
      window.alert('Geolocation is not supported in your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      error => {
        window.alert('Unable to obtain position.\n' + error.message);
      },
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
form {
  text-align: left;
  display: block;
  width: 500px;
  margin: 0 auto;

  fieldset {
    border: 0;
    padding: 5px 0 5px 0;
    margin: 0;

    label {
      display: block;
    }

    input,
    select {
      display: block;
      height: 25px;
      line-height: 25px;
      font-size: 16px;
      width: 200px;
    }
  }
}

.findStoresSubmit {
  margin: 10px 0;
  background-color: #41b883;
  border: 1px solid #35495e;
  padding: 10px 20px;
  color: #0a1d14;
  cursor: pointer;
}

.detectLocation {
  margin: 10px 5px;
  background-color: #35495e;
  border: 1px solid #41b883;
  padding: 10px 20px;
  color: #6fdfad;
  cursor: pointer;
}
</style>
